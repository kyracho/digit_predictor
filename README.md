## Digit Predictor App

Hi, welcome. This is a toy aplication that uses a convolutional neural network (CNN) model for machine learning on the cloud. 

**How it works:**

A user draws a digit on the canvas.
The drawn digit is converted to a format just like the MNIST dataset (28x28 grayscale image). The preprocessed image is fed into the model (described below), 
which infers the data and computes the probability distribution over the possible digits. The predicted digit is displayed with 
the confidence score, along with the daily high score fetched from a PostgreSQL database. The database resets daily at 12:00AM EST.

The keras model has a convolutional layer with 32 filters and relu activation, a second convolutional layer with 64 filters and relu activation, a maxpooling layer, a flatten layer, a dense layer with 128 neurons and relu activation, a dropout layer with a .5 dropout rate, and an output layer. The optimizer is AdaDelta, which automatically adjusts the learning rate based on past gradient information, and the loss function is categorical cross entropy. The model is around 98.5% accurate on MNIST test data.
  
 <img width="350" alt="Screenshot 2024-08-26 at 10 53 59 AM" src="https://github.com/user-attachments/assets/fd70b903-4e12-41be-9722-3c69a197c704">

---
## If you want to recreate my app, here are the steps that roughly describe the process. 

### Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App Locally](#running-the-app-locally)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)

---

## Tech Stack
- **Backend**: Flask, Python
- **Frontend**: HTML, CSS, JavaScript (Canvas for drawing)
- **Model**: Convolutional Neural Network (TensorFlow/Keras)
- **Database**: PostgreSQL
- **Deployment**: Heroku

---

## Features
- Handwritten digit prediction using a CNN model.
- A simple web-based interface where users can draw digits in the browser.
- **PostgreSQL** database to store model inputs and prediction logs.
- Flask REST API for communicating between the frontend and the CNN model.
- Deployed on Heroku for easy access and scalability.

---

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- [Python 3.7+](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kyracho/digit-predictor-app.git
   cd digit-predictor-app
   ```

2. **Set Up a Virtual Environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**:
   Install the necessary Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure PostgreSQL**:
   - Set up a local PostgreSQL database and note down the database URL (e.g., `postgresql://username:password@localhost/dbname`).
   - Add the database URL to your environment variables:
     ```bash
     export DATABASE_URL="postgresql://username:password@localhost/dbname"
     ```

5. **Migrate the Database**:
   Run migrations to create the necessary tables:
   ```bash
   flask db upgrade
   ```

---

### Running the App Locally

1. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```bash
   FLASK_APP=app.py
   FLASK_ENV=development
   DATABASE_URL=postgresql://username:password@localhost/dbname
   ```

2. **Run the Application**:
   Start the Flask development server:
   ```bash
   flask run
   ```

3. **Access the App**:
   Open a browser and go to `http://localhost:5000`. You should see the Digit Predictor interface where you can draw a digit and get predictions from the CNN model.

---

## Deployment

This app is deployed on **Heroku**. To deploy your own version:

1. **Set Up a Heroku Account**:
   Sign up for a [Heroku account](https://signup.heroku.com/).

2. **Create a Heroku App**:
   ```bash
   heroku create
   ```

3. **Configure PostgreSQL**:
   Add the PostgreSQL addon to your Heroku app:
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Push to Heroku**:
   Push your code to Heroku's remote repository:
   ```bash
   git push heroku main
   ```

5. **Run Migrations on Heroku**:
   ```bash
   heroku run flask db upgrade
   ```

6. **Access Your Deployed App**:
   Once the deployment process is complete, you can access the app by visiting the Heroku-provided URL.

---

## Usage

- Navigate to the app’s URL.
- Draw a digit (0-9) on the canvas using your mouse.
- Click "Predict" to get a real-time prediction from the CNN model.
- The app will display the predicted digit and the confidence score.

---

## Contributing

Contributions are welcome! Feel free to fork the repository and create a pull request, or open an issue if you encounter any problems.
