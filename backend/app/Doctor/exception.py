"""
Author: nhoxtin15
Model Description:
    
Date Created: 14/04/2025
Last Updated: 14/04/2025
"""

class PermissionDenied(Exception):
    """Exception raised when a user does not have permission for an action."""
    def __init__(self, message="Permission denied."):
        self.message = message
        super().__init__(self.message)

