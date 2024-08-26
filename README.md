
<div style="display: flex;">
  <div style="flex: 1; padding-right: 20px;">
    <p>Welcome to my digit predictor! It is a toy aplication that uses a convolutional neural network (CNN) model for machine learning on the cloud. 

**Here is how it works:**

A user draws a digit on the canvas.
The drawn digit is converted to a format just like the MNIST dataset (28x28 grayscale image). The preprocessed image is fed into the model (described below), 
which infers the data and computes the probability distribution over the possible digits. The digit with the maximum probability is displayed, along with 
the highest probability, fetched from a PostgreSQL database. The database resets daily at 12:00AM EST. 
You will see that it's very easy to get a prediction with a 100 percent probability.

The keras model has a convolutional layer with 32 filters and relu activation, a second convolutional layer with 64 filters and relu activation, a maxpooling layer, a flatten layer, a dense layer with 128 neurons and relu activation, a dropout layer with a .5 dropout rate, and an output layer. The optimizer is AdaDelta, which automatically adjusts the learning rate based on past gradient information, and the loss function is categorical cross entropy. The model is around 98.5% accurate on MNIST test data.</p>
  </div>
  <div style="flex-shrink: 0;">
    <img width="350" alt="Screenshot 2024-08-26 at 10 53 59 AM" src="https://github.com/user-attachments/assets/fd70b903-4e12-41be-9722-3c69a197c704">
  </div>
</div>
