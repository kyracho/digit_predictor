## Digit Predictor Application

Hi, welcome. This is my toy application that uses a convolutional neural network (CNN) model for machine learning on the cloud. 

**How it works:**

A user draws a digit on the canvas.
The drawn digit is converted to a format just like the MNIST dataset (28x28 grayscale image). The preprocessed image is fed into the model (described below), 
which infers the data and computes the probability distribution over the possible digits. The predicted digit is displayed with 
the confidence score, along with the daily high score fetched from a PostgreSQL database. The database resets daily at 12:00AM EST.

The keras model has a convolutional layer with 32 filters and relu activation, a second convolutional layer with 64 filters and relu activation, a maxpooling layer, a flatten layer, a dense layer with 128 neurons and relu activation, a dropout layer with a .5 dropout rate, and an output layer. The optimizer is AdaDelta, which automatically adjusts the learning rate based on past gradient information, and the loss function is categorical cross entropy. The model is around 98.5% accurate on MNIST test data.
  

<img width="612" alt="Screenshot 2024-11-02 at 4 49 16 AM" src="https://github.com/user-attachments/assets/c34b7396-e205-4826-9730-831c33d2115d">


## Tech Stack
- **Backend**: Flask, Python
- **Frontend**: HTML, CSS, JavaScript (Canvas for drawing)
- **Model**: Convolutional Neural Network (TensorFlow/Keras)
- **Database**: PostgreSQL
- **Deployment**: Heroku

## Features
- Handwritten digit prediction using a CNN model.
- A simple web-based interface where users can draw digits in the browser.
- **PostgreSQL** database to store model inputs and prediction logs.
- Flask REST API for communicating between the frontend and the CNN model.
- Deployed on Heroku for easy access and scalability.
