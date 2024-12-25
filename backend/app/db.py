from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Fetch the database URL from environment variables
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql+psycopg2://flask:jans-ancd=123@db:5432/ProductionDatabase')

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for the models
Base = declarative_base()

# Dependency to get a new session
def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()