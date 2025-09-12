from .base_model import BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
class Users(BaseModel):
	__tablename__ = 'users'

	##############################
	##                          ##
	##           Data           ##
	##                          ##
	##############################

	user_name = Column(String, nullable=False)
	password = Column(String, nullable=False)
	name = Column(String, nullable=False)
	date_of_birth = Column(DateTime, nullable=False)
	phone = Column(String, nullable=False)
	gender = Column(String, nullable=False)
	street = Column(String, nullable=False)
	district = Column(String, nullable=False)
	city = Column(String, nullable=False)
	department = Column(String, nullable=False)
	specialization = Column(String, nullable=True)
	role = Column(String, nullable=False)

	is_active = Column(String, nullable=False, default='true')
	is_verified = Column(String, nullable=False, default='false')
	is_deleted = Column(String, nullable=False, default='false')
	created_at = Column(DateTime, nullable=False, default=BaseModel.get_current_time())
	# updated_at = Column(DateTime, nullable=False, default=BaseModel.get_current_time(), onupdate=BaseModel.get_current_time())

	##############################
	##                          ##
	##       Relationship       ##
	##                          ##
	##############################
	have_session = relationship("HaveSession", back_populates="user",foreign_keys="HaveSession.user_id")
	nurse_have_session = relationship("HaveSession", back_populates="nurse",foreign_keys="HaveSession.nurse_id")
	tests = relationship("Tests", back_populates="paraclinical_technician")
	inpatient_session = relationship("Inpatient_session", back_populates="doctor")
	appointments = relationship("Appointments", back_populates="doctor")
	vital_signs = relationship("Vital_signs", back_populates="record_by_user")

	##############################
	##                          ##
	##         Function         ##
	##                          ##
	##############################
	def get_password(user_name: str):
		"""
			This function is used to find the user by the user_name and return the password of the user (if found)
		:param
			user_name: user_name that inputted by user
		:return:
			password (if found the user_name): hashed_password of the user
			password (if not found the user_name): None
		"""
		user = Users.query.filter_by(user_name=user_name).first()
		if user:
			return user.password, user.role, user.id
		else:
			return None, None, None






