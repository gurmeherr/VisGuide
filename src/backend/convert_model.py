import os
import subprocess
import tensorflow as tf
import tensorflow_hub as hub

def convert_model():
    # Create output directory
    output_dir = 'public/models/yolov3'
    os.makedirs(output_dir, exist_ok=True)
    
    print("Loading YOLOv3 model from TensorFlow Hub...")
    model = hub.load("https://tfhub.dev/tensorflow/yolov3/1")
    
    print("Saving model in SavedModel format...")
    tf.saved_model.save(model, output_dir)
    
    print("Converting to TensorFlow.js format...")
    subprocess.run([
        'tensorflowjs_converter',
        '--input_format=tf_saved_model',
        '--output_format=tfjs_graph_model',
        '--signature_name=serving_default',
        output_dir,
        os.path.join(output_dir, 'web_model')
    ])
    
    print("Model conversion complete!")

if __name__ == "__main__":
    convert_model() 