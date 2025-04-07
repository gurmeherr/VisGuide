import cv2
import numpy as np
import time
from ultralytics import YOLO

# COCO class labels
COCO_CLASSES = [
    'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat',
    'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog',
    'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella',
    'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite',
    'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket', 'bottle',
    'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich',
    'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch',
    'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote',
    'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book',
    'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]

def preprocess_image(frame, target_size=(640, 640)):
    # Get original image dimensions
    height, width = frame.shape[:2]
    
    # Calculate scaling factor to maintain aspect ratio
    scale = min(target_size[0] / width, target_size[1] / height)
    new_width = int(width * scale)
    new_height = int(height * scale)
    
    # Resize image
    resized = cv2.resize(frame, (new_width, new_height))
    
    # Create square image with padding
    square_img = np.zeros((target_size[0], target_size[1], 3), dtype=np.uint8)
    x_offset = (target_size[0] - new_width) // 2
    y_offset = (target_size[1] - new_height) // 2
    square_img[y_offset:y_offset+new_height, x_offset:x_offset+new_width] = resized
    
    # Convert to blob for DNN
    blob = cv2.dnn.blobFromImage(square_img, 1/255.0, target_size, swapRB=True)
    
    return blob, scale, (x_offset, y_offset)

def main():
    print("Loading YOLOv8n model...")
    model = YOLO('yolov8n.pt')  # load the official YOLOv8n model
    print("Model loaded successfully!")

    # Open camera
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open camera")
        return

    # Set camera resolution
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 640)

    confidence_threshold = 0.5
    iou_threshold = 0.45

    print("Starting detection... Press 'q' to quit")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame")
            break

        # Run inference
        start_time = time.time()
        results = model(frame)
        inference_time = time.time() - start_time
        
        # Process and visualize results
        for result in results:
            boxes = result.boxes
            for box in boxes:
                # Get box coordinates, confidence and class
                x1, y1, x2, y2 = box.xyxy[0]
                confidence = box.conf[0]
                class_id = int(box.cls[0])
                
                # Convert coordinates to integers
                x1, y1, x2, y2 = map(int, [x1, y1, x2, y2])
                
                # Draw box and label
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                label = f"{model.names[class_id]}: {confidence:.2f}"
                cv2.putText(frame, label, (x1, y1-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        # Draw FPS
        fps = 1.0 / inference_time
        cv2.putText(frame, f"FPS: {fps:.1f}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        # Show frame
        cv2.imshow('YOLOv8n Object Detection', frame)
        
        # Break loop on 'q' press
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main() 