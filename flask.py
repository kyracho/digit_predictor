from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf

app = Flask(__name__)

# Load the model
model = tf.keras.models.load_model('mnist_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    image = np.array(data['image']).reshape(1, 28, 28, 1)
    prediction = model.predict(image)
    digit = np.argmax(prediction, axis=1)[0]
    return jsonify({'digit': int(digit)})

if __name__ == '__main__':
    app.run(debug=True)
