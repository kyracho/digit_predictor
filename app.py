from flask import Flask, request, jsonify, render_template
import numpy as np
import tensorflow as tf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the model
model = tf.keras.models.load_model('mnist_model.h5')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    print("Received data:", data)  # Debugging: Print incoming data
    
    try:
        image = np.array(data['image']).reshape(28, 28, 1)
        image = np.expand_dims(image, axis=0)  # Add batch dimension
        prediction = model.predict(image)
        digit = np.argmax(prediction, axis=1)[0]
        return jsonify({'digit': int(digit)})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
