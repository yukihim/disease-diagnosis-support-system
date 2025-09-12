"""
Author: nhoxtin15
Model Description:
    This module is used to store test data for the User model
    
Date Created: 31/03/2025
Last Updated: 31/03/2025
"""

from ..models import Users
import os

base_dir = os.path.dirname(__file__)

file_path = os.path.join(base_dir, 'csv', 'users.csv')
from werkzeug.security import generate_password_hash

def create_user():
    from ... import db
    import pandas as pd
    # to list of dict
    df = pd.read_csv(file_path)
    list_test_data = df.to_dict(orient='records')
    for user in list_test_data:
        for key, value in user.items():
            if pd.isna(value):
                user[key] = None

        # Check if the user already exists
        existing_user = Users.query.filter_by(user_name=user["user_name"]).first()
        if existing_user:
            # If the user already exists, skip creating it
            continue
        new_user = Users(
            user_name=user["user_name"],
            password=generate_password_hash(user["password"]),
            name=user["name"],
            date_of_birth=user["date_of_birth"],
            phone=user["phone"],
            gender=user["gender"],
            street=user["street"],
            district=user["district"],
            city=user["city"],
            department=user["department"],
            role=user["role"],
            is_active=user["is_active"],
            is_verified=user["is_verified"],
            is_deleted=user["is_deleted"],
            created_at=user["created_at"],
            specialization=user["specialization"],
        )

        db.session.add(new_user)
    db.session.commit()
    return True


def create_test_data():
    try:
        create_user()

    except Exception as e:
        import logging
        logging.getLogger(__name__).error("Error creating test data")
        logging.getLogger(__name__).error(e)
        return False

from .test_data_generator import list_function

list_function.append(create_test_data)
