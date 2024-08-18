from flask import Flask, render_template, request, jsonify

# Initialize the Flask application
app = Flask(__name__)


# Define a route for the homepage
@app.route('/')
def home():
    return render_template('index.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
