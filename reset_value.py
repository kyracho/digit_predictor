import os
import psycopg2

# Connect to the Heroku PostgreSQL database using the DATABASE_URL environment variable
DATABASE_URL = os.getenv('postgres://u991akeevc4a0h:pcf0b36db9cae231cd6db2f31dab20b0f04c901657fd7b8df06b18f5098fa417b@cbec45869p4jbu.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d8i8or84v733sh')

try:
    # Establish the connection
    conn = psycopg2.connect(DATABASE_URL)
    cursor = conn.cursor()

    # Reset the value of id=1 to 0
    cursor.execute("UPDATE score_table SET value = 0 WHERE id = 1;")
    
    # Commit the transaction
    conn.commit()

    # Close the cursor and connection
    cursor.close()
    conn.close()

    print("Value reset successfully.")

except Exception as e:
    print(f"Error: {e}")
