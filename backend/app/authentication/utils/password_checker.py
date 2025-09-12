"""
Author: nhoxtin15
Model Description:
    This module is responsible for the login process.
Date Created: 27/03/2023
Last Updated: 27/03/2023
"""
from werkzeug.security import check_password_hash
from ..exception import *
from ...database.models import Users


def get_password_and_role(username: str):
    """
        Get password of the user

        :param:
            username: username of the user
        :return:
            password: password of the user
            role: role of the user
        :raise:
            Username_unfound: if the username is not found

    """
    password, role, id = Users.get_password(username)
    if password is None or role is None:
        raise Username_unfound()
    return password, role, id


def check_password_and_get_role(username, password):
    """
        Check if the password is correct and get the role of the user

        :param:
            username: username of the user
            password: password of the user
        :return:
            True, role: if the password is correct
        :raise:
            WrongPassword: if the password is incorrect
            Username_unfound: if the username is not
    """
    system_password, role, id = get_password_and_role(username)

    if check_password_hash(system_password, password):
        return role,id
    else:
        raise WrongPassword()

