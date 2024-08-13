from flask import Flask, request, jsonify, render_template
import numpy as np
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model = tf.keras.models.load_model('mnist_model.h5')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    try:
        image = np.array(data['image']).reshape(1, 28, 28, 1)
        prediction = model.predict(image)
        digit = np.argmax(prediction, axis=1)[0]
        return jsonify({'digit': int(digit)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
