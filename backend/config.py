
class Config:
    JWT_SECRET_KEY = 'your_jwt_secret_key'
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://flask:jans-ancd=123@db_test:5432/ProductionDatabase'
    TEST_DATA = True