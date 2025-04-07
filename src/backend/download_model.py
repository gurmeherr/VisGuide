import os
import requests
from tqdm import tqdm

def download_file(url, filename):
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    
    with open(filename, 'wb') as file, tqdm(
        desc=filename,
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as pbar:
        for data in response.iter_content(chunk_size=1024):
            size = file.write(data)
            pbar.update(size)

def main():
    # Create directories if they don't exist
    os.makedirs('models', exist_ok=True)
    
    # Model files to download
    model_url = 'https://github.com/ultralytics/assets/releases/download/v0.0.0/yolov8n.onnx'
    model_path = os.path.join('models', 'yolov8n.onnx')
    
    if not os.path.exists(model_path):
        print(f'Downloading YOLOv8n ONNX model...')
        download_file(model_url, model_path)
    else:
        print(f'Model already exists at {model_path}')

if __name__ == '__main__':
    main() 