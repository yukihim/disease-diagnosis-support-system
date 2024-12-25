class Username_unfound(Exception):
    def __init__(self):
        self.message = 'Username not found'
        super().__init__(self.message)

class WrongPassword(Exception):
    def __init__(self):
        self.message = 'Password not matched'
        super().__init__(self.message)

