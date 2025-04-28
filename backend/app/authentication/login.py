from werkzeug.security import generate_password_hash, check_password_hash
from .Exception import *

current_user = []

demo_user_name = [
    {
        'userID':'user123abc',
        'username':'doctor',
        'password': generate_password_hash('test'),
        'role':'doctor'
    },
    {
        'userID':'user456def',
        'username':'nurse',
        'password': generate_password_hash('test'),
        'role':'nurse'
    },
    {
        'userID':'user789def',
        'username':'receptionist1',
        'password': generate_password_hash('test'),
        'role':'receptionist'
    },
    {
        'userID':'user999def',
        'username':'admin',
        'password': generate_password_hash('test'),
        'role':'admin'
    },
    {
        'userID':'user888def',
        'username':'paraclinical'
        ,'password': generate_password_hash('test'),
        'role':'paraclinical'
    }
]




def get_role(username):
    for i in demo_user_name:
        if i['username'] == username:
            return i['role']
    else:
        raise Username_unfound()

def get_password_role_id(username):
    for i in demo_user_name:
        if i['username'] == username:
            return i['password'], i['role'], i['userID'] # Return userID
    else:
        raise Username_unfound()


# Modify to return userID
def check_password(username,password):
    try:
        # Call the modified function
        system_password, role, user_id = get_password_role_id(username)

        if check_password_hash(system_password,password):
            return True, role, user_id # Return userID
        else:
            raise WrongPassword()
    except Username_unfound as e:
        raise e
    except WrongPassword as e:
        raise e
    except Exception as e:
        #logging the error for debugging
        import logging
        logging.error(str(e))
        raise e
