
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)




def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


