from werkzeug.security import generate_password_hash, check_password_hash
from .Exception import *

current_user = []

demo_user_name = [
    {
        'username':'doctor',
        'password': generate_password_hash('test'),
        'role':'doctor'
    },
    {
        'username':'nurse',
        'password': generate_password_hash('test'),
        'role':'nurse'
    },
    {
        'username':'receptionist',
        'password': generate_password_hash('test'),
        'role':'receptionist'
    },
    {
        'username':'admin',
        'password': generate_password_hash('test'),
        'role':'admin'
    },
    {
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

def get_password(username):
    for i in demo_user_name:
        if i['username'] == username:
            return i['password'], i['role']
    else:
        raise Username_unfound()


def check_password(username,password):
    try:
        system_password,role = get_password(username)

        if check_password_hash(system_password,password):
            return True, role
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




