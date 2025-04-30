from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from . import app
import datetime

# --- Mock Data ---
mock_user_calendar_events = {
    "user123abc": {
        "2025-04-21": [
            {"time": "09:00", "event": ["Team Meeting - Cardiology Dept.", "Project Update - Cardiology"]},
            {"time": "11:30", "event": ["Patient Consultation - Room 301"]},
        ],
        "2025-04-28": [
            {"time": "08:00", "event": ["Morning Rounds", "Patient Checkup - Room 202", "Patient Nguyen"],},
            {"time": "10:30", "event": ["Review X-Rays - Radiology"]},
        ],
        "2025-04-29": [ # Add some data for another date
            {"time": "14:00", "event": ["Follow-up - Patient Tran"]},
        ]
    },
    "user456def": {
        "2025-04-22": [
            {"time": "10:00", "event": ["Training Session - New EHR Features"]},
        ],
        "2025-04-28": [
            {"time": "15:00", "event": ["Admin Paperwork"]}
        ]
    }
}

# 7.4.2 Events Calendar API
# Modified to return events for the date specified in the query parameter 'date=YYYY-MM-DD'.
# Defaults to today if 'date' parameter is missing or invalid.
@app.route('/calendar_events', methods=['GET'])
@jwt_required()
def get_calendar_events():
    """
    Retrieves calendar events for the logged-in user for a specific date.
    Date is obtained from the 'date' query parameter (YYYY-MM-DD). Defaults to today.
    UserID is obtained from the JWT token.
    """
    try:
        # Get user identity (userID) from JWT token
        jwt_payload = get_jwt()
        logged_in_user_id = jwt_payload.get('userID') or get_jwt_identity()

        if not logged_in_user_id:
            return jsonify({"message": "User ID not found in token."}), 401

        # Get date from query parameter, default to today
        date_str = request.args.get('date') # Get 'date' query parameter
        target_date = None

        if date_str:
            try:
                # Validate date format
                target_date = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
            except ValueError:
                # Invalid date format, default to today
                print(f"Invalid date format received: {date_str}. Defaulting to today.")
                target_date = datetime.date.today()
                date_str = target_date.strftime("%Y-%m-%d") # Update date_str to today's date string
        else:
            # No date parameter provided, use today
            target_date = datetime.date.today()
            date_str = target_date.strftime("%Y-%m-%d") # Use today's date string

        # Retrieve events for the specific user and target date from the mock data
        user_events = mock_user_calendar_events.get(logged_in_user_id, {})
        events_for_date = user_events.get(date_str, []) # Get events for the target date string

        # Get current time for the response (indicates when data was fetched)
        current_time_str = datetime.datetime.now().strftime("%H:%M:%S")

        return jsonify({
            "time": current_time_str,
            "event": events_for_date # Return events for the requested/defaulted date
        }), 200

    except Exception as e:
        user_id_for_log = logged_in_user_id if 'logged_in_user_id' in locals() else "unknown"
        print(f"Error retrieving calendar events for user {user_id_for_log} on date {date_str if 'date_str' in locals() else 'unknown'}: {e}")
        return jsonify({"message": "An error occurred while retrieving calendar events."}), 500