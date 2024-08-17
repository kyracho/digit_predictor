from flask import Flask, render_template

# Initialize the Flask application
app = Flask(__name__)

# Define a route for the homepage
@app.route('/')
def home():
    return render_template('index.html')

# You can define more routes here
# @app.route('/another-page')
# def another_page():
#     return "This is another page"

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
