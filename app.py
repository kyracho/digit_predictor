from flask import Flask, request, render_template
import numpy as np
import tensorflow as tf

app = Flask(__name__)

model = tf.keras.models.load_model('model/digit_model.h5')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Assuming you get image data from form and preprocess it
    img = preprocess_image(request.files['image'])
    prediction = model.predict(img)
    return render_template('index.html', prediction=prediction)

def preprocess_image(image):
    # Preprocess image as needed for your model
    return np.array(image).reshape((1, 28, 28, 1))  # Example for a 28x28 image

if __name__ == "__main__":
    app.run(debug=True)
