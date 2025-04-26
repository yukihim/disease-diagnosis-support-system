from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from . import app # Import the blueprint 'app' defined in Events_Calendar/__init__.py
import datetime

# --- Mock Data ---
# Dictionary where keys are dates ("YYYY-MM-DD") and values are lists of events for that day.
mock_calendar_events = {
    "2025-04-21": [
        {"time": "09:00", "description": "Team Meeting - Cardiology Dept."},
        {"time": "11:30", "description": "Patient Consultation - Room 301"},
        {"time": "14:00", "description": "Surgery - OR 2"},
        {"time": "16:00", "description": "Shift Handover"}
    ],
    "2025-04-22": [
        {"time": "10:00", "description": "Training Session - New EHR Features"},
        {"time": "13:00", "description": "Lunch Seminar - Pharma Rep"}
    ],
    "2025-04-26": [ # Today's date based on user context
        {"time": "08:00", "description": "Morning Rounds"},
        {"time": "10:30", "description": "Review X-Rays - Radiology"},
        {"time": "15:00", "description": "Admin Paperwork"}
    ]
    # Add more dates and events as needed
}

# 7.4.2 Events Calendar API
@app.route('/calendar_events', methods=['GET']) # Doc table says GET, curl says POST. Using GET as per table.
@jwt_required()
def get_calendar_events():
    """
    Retrieves calendar events for a specific day based on query parameters.
    """
    try:
        # Extract query parameters
        day = request.args.get('day')
        month = request.args.get('month')
        year = request.args.get('year')

        # Validate parameters
        if not all([day, month, year]):
            return jsonify({"message": "Missing required query parameters: day, month, year"}), 400

        # Construct date string (ensure leading zeros for day/month if needed)
        try:
            # Validate date components and format
            date_str = f"{int(year):04d}-{int(month):02d}-{int(day):02d}"
            # Optional: Further validation if the date itself is valid
            datetime.date(int(year), int(month), int(day))
        except ValueError:
             return jsonify({"message": "Invalid date parameters provided."}), 400

        # In a real application, query the database for events on 'date_str' for the logged-in user
        # user_identity = get_jwt_identity() # Get user info if events are user-specific

        events_for_day = mock_calendar_events.get(date_str, []) # Get events or empty list if date not found

        # Get current time for the response (as per documentation)
        current_time_str = datetime.datetime.now().strftime("%H:%M:%S")

        return jsonify({
            "time": current_time_str,
            "events": events_for_day
        }), 200

    except Exception as e:
        # Log the exception e for debugging
        print(f"Error retrieving calendar events: {e}")
        return jsonify({"message": "An error occurred while retrieving calendar events."}), 500