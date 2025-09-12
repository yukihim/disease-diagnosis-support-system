"""
Author: nhoxtin15
Model Description:
    
Date Created: 03/05/2025
Last Updated: 03/05/2025
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.models.base_model import BaseModel

def set_procedure(session_id, procedures: str):
    """
    Set the procedure model dynamically based on the procedure name.
    """
    from ....database import db
    from ....database.models import ProceduresIsPerformedInSession
    
    for procedure in procedures:
        procedure_model = ProceduresIsPerformedInSession(
            session_id=session_id,
            procedure_id=procedure['procedureId']
        )
        db.session.add(procedure_model)
    db.session.commit()
    return True