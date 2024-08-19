import os
import psycopg2
from flask import Flask, render_template, request, jsonify
from decimal import Decimal


# Initialize the Flask application
app = Flask(__name__)

# Connect to database
DATABASE_URL = os.getenv('DATABASE_URL', 'postgres://u991akeevc4a0h:pcf0b36db9cae231cd6db2f31dab20b0f04c901657fd7b8df06b18f5098fa417b@cbec45869p4jbu.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d8i8or84v733sh')
print(f"Connecting to database at {DATABASE_URL}")
try:
    conn = psycopg2.connect(DATABASE_URL)
    print("Database connection established.")
except Exception as e:
    print(f"Failed to connect to the database: {e}")

# Define a route for the homepage
@app.route('/')
def home():
    return render_template('index.html')

# Define a route for the
@app.route('/submit-number', methods=['POST'])
def submit_number():
    try:
        # Get the score from the POST request
        data = request.json
        print(f"Received data: {data}")
        current_score = data.get('current_score')
        # Convert current_score to Decimal
        current_score = Decimal(current_score)

        # if current_score is None:
        #     print("No score provided in the request.")
        #     return jsonify({"error": "No score provided"}), 400

        # Create a cursor to execute SQL commands
        cursor = conn.cursor()
        print("Cursor created.")

        # Get the current value from the database
        cursor.execute("SELECT value FROM score_table WHERE id = 1;")
        max_score = cursor.fetchone()[0]
        print(f"Current value from database: {max_score}")

        # Compare score with the current value
        if current_score > max_score:
            cursor.execute("UPDATE score_table SET value = %s WHERE id = 1;", (current_score,))
            conn.commit()
            message = f"Today's high probability:  {current_score}"
            print(f"Database updated with new score: {current_score}")
        else:
            message = f"Today's high probability: {max_score}"
            print(f"Received score ({current_score}) is not higher than current max score({max_score})")

        cursor.close()
        print("Cursor closed.")
        return jsonify({"message": message, "current_score": current_score, "max_score": max_score})

    except Exception as e:
        print(f"Error during request processing: {e}")
        return jsonify({"error": "An error occurred during database operation"}), 500


# Run the app
if __name__ == '__main__':
    app.run(debug=True)
