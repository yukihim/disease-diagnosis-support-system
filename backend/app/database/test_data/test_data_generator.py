"""
Author: nhoxtin15
Model Description:
    
Date Created: 19/04/2025
Last Updated: 19/04/2025
"""


list_function = []



def create_test_data():
    """
    Create test data for all modules.

    Returns:
        bool: True if test data creation is successful, False otherwise.
    """
    try:
        for function in list_function:
            function()
        return True
    except Exception as e:
        print(f"Error creating test data: {e}")
        import traceback
        traceback.print_exc()
        return False