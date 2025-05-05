! pip install pyrealsense2 opencv-python numpy pyttsx3 ultralytics pywin32
import os
import cv2
import time
import threading
import numpy as np
import pyrealsense2 as rs
import pyttsx3
import pythoncom
from ultralytics import YOLO
from openai import OpenAI

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    default_headers={
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Blind Navigation Assistant",
        "Authorization": "Bearer sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
)

model = YOLO("best.pt")  # Load model

class SpeechQueue:
    def __init__(self):
        self.queue = []
        self.lock = threading.Lock()
        self.cooldown = 3
        self.last_spoken = 0

    def add(self, text):
        with self.lock:
            if time.time() - self.last_spoken > self.cooldown:
                self.queue.append(text)

    def process(self):
        while True:
            if self.queue:
                text = self.queue.pop(0)
                try:
                    pythoncom.CoInitialize()
                    engine = pyttsx3.init(driverName='sapi5')
                    engine.say(text)
                    engine.runAndWait()
                    engine.stop()
                    self.last_spoken = time.time()
                except Exception as e:
                    print(f"Speech Error: {e}")
                finally:
                    pythoncom.CoUninitialize()
            time.sleep(0.1)

speech_queue = SpeechQueue()
threading.Thread(target=speech_queue.process, daemon=True).start()

DISTANCE_TIERS = {
    "immediate": (0.0, 1.5),
    "close": (1.5, 3.0),
    "nearby": (3.0, 5.0)
}

context_prompt = """You are a critical navigation assistant for blind users. ALWAYS respond with guidance, never 'ignore'.
Prioritize safety with these rules:
1. For center obstacles <1m: Urgent stop command
2. For center obstacles 1-3m: Clear directional move 
3. Side obstacles <2m: Warn to keep opposite side
4. Include distance in steps (1 step=0.5m)
5. Use emergency keywords for <1m obstacles

Examples:
- "EMERGENCY! Chair 2 steps ahead, STOP"
- "Person 4 steps left, move right"
- "Table 6 steps center, turn left"
- "Wall nearby, keep right"
Respond ONLY with the guidance."""

def get_position(cx, w):
    ratio = cx / w
    if ratio < 0.25: return "far left"
    elif ratio < 0.45: return "left"
    elif ratio < 0.55: return "center"
    elif ratio < 0.75: return "right"
    else: return "far right"

pipeline = rs.pipeline()
config = rs.config()
config.enable_stream(rs.stream.depth, 848, 480, rs.format.z16, 30)
config.enable_stream(rs.stream.color, 1280, 720, rs.format.rgb8, 30)
pipeline.start(config)
align_to = rs.stream.color
align = rs.align(align_to)

try:
    while True:
        frames = pipeline.wait_for_frames()
        aligned_frames = align.process(frames)
        depth_frame = aligned_frames.get_depth_frame()
        color_frame = aligned_frames.get_color_frame()

        if not depth_frame or not color_frame:
            continue

        depth_image = np.asanyarray(depth_frame.get_data())
        color_image = np.asanyarray(color_frame.get_data())
        results = model(color_image)[0]
        h, w = depth_image.shape

        for result in results.boxes:
            x1, y1, x2, y2 = map(int, result.xyxy[0].tolist())
            cls = int(result.cls[0].item())
            cx = int((x1 + x2) / 2)
            cy = int((y1 + y2) / 2)
            cx = np.clip(cx, 0, w-1)
            cy = np.clip(cy, 0, h-1)

            distance = depth_frame.get_distance(cx, cy)
            if distance <= 0:
                continue

            class_name = model.names[cls]
            position = get_position(cx, w)
            label = f"{class_name} | {distance:.2f}m"
            cv2.rectangle(color_image, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(color_image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            try:
                response = client.chat.completions.create(
                    model="deepseek/deepseek-v3-base:free",
                    messages=[
                        {
                            "role": "system",
                            "content": f"{context_prompt}\nCurrent status: {distance:.1f}m {position}"
                        },
                        {
                            "role": "user",
                            "content": f"{class_name} detected at {distance:.1f}m {position}"
                        }
                    ],
                    temperature=0.5,
                    max_tokens=30
                )
                guidance = response.choices[0].message.content.strip()
                print(f"LLM Response: {guidance}")
                if guidance.lower() != "ignore":
                    speech_queue.add(guidance)
            except Exception as e:
                print(f"API Error: {e}")
                steps = max(1, int(distance / 0.5))
                direction = "right" if "left" in position else "left"
                fallback = f"{class_name} {steps} steps {position}, keep {direction}"
                speech_queue.add(fallback)

        cv2.imshow('Color Image', color_image)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

finally:
    pipeline.stop()
    cv2.destroyAllWindows()
