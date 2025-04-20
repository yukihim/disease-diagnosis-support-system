# Use the official Python image as the base
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file first to leverage Docker cache
COPY requirements.txt /app/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# --- Copy ONLY the necessary files/folders ---
COPY main.py /app/
COPY saved_model2/ /app/saved_model2/
# Create the Dataset directory and copy the specific JSON file into it
COPY Dataset/release_evidences.json /app/Dataset/release_evidences.json
# --- End specific copies ---

# Expose the port the app runs on (using 5002 to avoid conflict with backend)
EXPOSE 5002

# Set the command to run the Flask app using gunicorn
# Ensure your Flask app instance in main.py is named 'app'
CMD ["gunicorn", "-b", "0.0.0.0:5002", "main:app"]