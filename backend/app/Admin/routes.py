from flask import request, jsonify

from flask_jwt_extended import jwt_required


from . import app


# Mock data store (replace with actual database interactions)
mock_users = {
    "user123abc": {
        "userId": "user123abc",
        "username": "drquan",
        "role": "doctor",
        "room": "301",
        "department": "Lao - Ngoai",
        "email": "quan.doctor@hospital.com"
    },
    "user456def": {
        "userId": "user456def",
        "username": "nursemai",
        "role": "nurse",
        "room": "205",
        "department": "Noi Tong Hop",
        "email": "mai.nurse@hospital.com"
    },
    "admin001": {
        "userId": "admin001",
        "username": "admin",
        "role": "admin",
        "room": None,
        "department": None,
        "email": "admin@hospital.com"
    }
}

mock_user_logs = {
    "user123abc": [
        {"date": "2025-04-25", "time": "10:00:00", "action": "Logged in"},
        {"date": "2025-04-25", "time": "14:30:00", "action": "Updated"},
        {"date": "2025-04-26", "time": "09:15:00", "action": "Logged out"}
    ],
    "user456def": [
        {"date": "2025-04-26", "time": "08:00:00", "action": "Logged in"},
        {"date": "2025-04-26", "time": "11:00:00", "action": "Updated"}
    ]
}

# 7.4.8.1 Landing Page: Get Users List
@app.route('/landing_page/user_management_table', methods=['GET'])
@jwt_required()
def get_users_list():
    """
    Retrieves a list of users for the admin user management table.
    """
    try:
        # In a real application, you would query the database here.
        # Returning mock data for now.
        users_list = [
            {"userId": data["userId"], "username": data["username"], "role": data["role"], "room": data.get("room"), "department": data.get("department")}
            for data in mock_users.values()
        ]
        return jsonify({"users": users_list}), 200
    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred while retrieving users list."}), 500 # Use 500 for server errors

# 7.4.8.2 Landing Page: Add New User
@app.route('/landing_page/add_new_user', methods=['POST'])
@jwt_required()
def add_new_user():
    """
    Adds a new user to the system.
    """
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        role = data.get('role')
        room = data.get('room')
        dept = data.get('dept')

        if not all([username, password, email, role]): # Basic validation
             return jsonify({"message": "Missing required fields (username, password, email, role)"}), 400

        # Check for conflicts (username or email) - Mock implementation
        for user in mock_users.values():
            if user['username'] == username or user['email'] == email:
                return jsonify({"message": "Conflict: Username or email already exists"}), 409

        # In a real application, hash the password and save to DB
        new_user_id = f"user{len(mock_users) + 1}" # Simple mock ID generation
        mock_users[new_user_id] = {
            "userId": new_user_id,
            "username": username,
            "role": role,
            "room": room,
            "department": dept,
            "email": email
            # DO NOT store plain password, hash it in real app
        }
        mock_user_logs[new_user_id] = [] # Initialize logs for new user

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred while adding the user."}), 500

# 7.4.8.3 User Management Page: Get User Account's Log
@app.route('/user_mangement/<string:userId>/accounts_log', methods=['GET'])
@jwt_required()
def get_user_account_log(userId):
    """
    Retrieves the activity log for a specific user.
    """
    try:
        if userId not in mock_users:
            return jsonify({"message": "User not found"}), 404

        # In a real application, query the database for user logs.
        logs = mock_user_logs.get(userId, []) # Get logs or empty list if none exist

        # The doc says "Array of User Object", but the description says "log (date, time, action)"
        # Assuming it meant Array of Log Objects for the specified user.
        return jsonify({"logs": logs}), 200 # Changed response field name to 'logs' for clarity

    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred while retrieving user logs."}), 500

# 7.4.8.4 User Management Page: Update User Password
@app.route('/user_mangement/<string:userId>/password', methods=['POST']) # Doc says POST, could also be PUT/PATCH
@jwt_required()
def update_user_password(userId):
    """
    Updates the password for a specific user.
    """
    try:
        if userId not in mock_users:
            return jsonify({"message": "User not found"}), 404

        data = request.get_json()
        new_password = data.get('newPassword')

        if not new_password:
            return jsonify({"message": "Missing 'newPassword' field"}), 400

        # In a real application, hash the new_password and update the user's record in the database.
        # For mock purposes, we don't store/update the password itself.
        print(f"Password for user {userId} would be updated to '{new_password}' (hashed in real app).")

        return jsonify({"message": "Password updated successfully"}), 200

    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred while updating the password."}), 500

# 7.4.8.5 User Management Page: Delete User
@app.route('/user_mangement/<string:userId>', methods=['DELETE'])
@jwt_required()
def delete_user(userId):
    """
    Deletes a specific user from the system.
    """
    try:
        if userId not in mock_users:
            return jsonify({"message": "User not found"}), 404

        # In a real application, delete the user from the database.
        del mock_users[userId]
        if userId in mock_user_logs:
            del mock_user_logs[userId] # Also remove logs

        return jsonify({"message": "User deleted successfully"}), 200

    except Exception as e:
        # Log the exception e
        return jsonify({"message": "An error occurred while deleting the user."}), 500
    
