"""
Author: nhoxtin15
Model Description:
    
Date Created: 03/05/2025
Last Updated: 03/05/2025
"""

def set_prescription(session, medicines):
    """
    Set prescription for a session.

    Args:
        session (Session): The session object to set the prescription for.
        medicines (list): List of medicine IDs to be prescribed.
        morning (int): Number of doses in the morning.
        noon (int): Number of doses at noon.
        evening (int): Number of doses in the evening.
        night (int): Number of doses at night.
        duration (int): Duration of the prescription in days.
    """
    from ....database.models import MedicinesIsPrescribedInSession, Medicines
    # Check if the session is valid
    if not session:
        raise ValueError("Invalid session provided.")

    # Check if the medicines list is valid
    if not medicines or not isinstance(medicines, list):
        raise ValueError("Invalid medicines list provided.")
    from ....database import db
    # Iterate through the medicines and set the prescription
    for medicine in medicines:
        # Create a new MedicinesIsPrescribedInSession object
        prescription = MedicinesIsPrescribedInSession(
            medicine_id=medicine['medicine'],
            morning=medicine['morning'],
            noon=medicine['noon'],
            evening=medicine['afternoon'],
            night=medicine['evening'],
            duration=medicine['duration'],
            note=medicine['note'],
            session_id=session,
        )

        # Add the prescription to the session
        
        db.session.add(prescription)
    db.session.commit()


