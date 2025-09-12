"""
Author: nhoxtin15
Model Description:
    This module is used to store exceptions for the authentication module
Date Created: 31/03/2025
Last Updated: 31/03/2025
"""
class Username_unfound(Exception):
    def __init__(self):
        self.message = 'Username not found'
        super().__init__(self.message)

class WrongPassword(Exception):
    def __init__(self):
        self.message = 'Password not matched'
        super().__init__(self.message)
