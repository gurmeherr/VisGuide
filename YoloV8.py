!git clone https://github.com/ultralytics/yolov8
%cd yolov8
!pip install -r requirements.txt

# Upload custom dataset ZIP file
from google.colab import files
uploaded = files.upload()

# Unzip the dataset
!unzip visguide-obstacles.v3i.yolov8pytorch.zip -d /content/

# Confirm files are unzipped and ready
!ls /content

# Train YOLOv8 with custom dataset
!python train.py --img 800 --batch 16 --epochs 200 --data /content/data.yaml --weights yolov8m.pt --name visguide_model

# Display training results (loss curves, mAP)
from IPython.display import Image
Image(filename='runs/train/visguide_model/results.png', width=800)

# Download the trained model weights
from google.colab import files
files.download('/content/yolov8/runs/train/visguide_model/weights/best.pt')
