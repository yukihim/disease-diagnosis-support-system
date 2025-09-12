### Disease Diagnosis Support System

A multi-service web application that helps clinicians triage patients, order tests, and generate preliminary disease predictions from symptoms. The system includes:

- **Backend (Flask)**: Role-based REST APIs with JWT authentication, PostgreSQL, and mock/test data seeding.
- **AI Service (Flask + ML + Gemini)**: Maps free-text symptoms to evidence codes using Google Gemini, prepares model features, and predicts diseases using a trained model.
- **Frontend (React)**: Role-specific UIs for doctor, receptionist, nurse, and paraclinical workflows.
- **PostgreSQL**: Application database with initialization scripts and Dockerized persistence.


### Features

- **Authentication & Roles**: JWT-based auth; roles include `doctor`, `receptionist`, `nurse`, `paraclinical`, `admin`.
- **Doctor**:
  - Incoming patients, today’s appointments, patients sent for tests
  - Diagnosis workflow: patient info, vital signs, test results
  - Order tests, set procedures, prescriptions, and follow-up dates
  - Inpatient monitoring: device measurements, event list, add notes
- **Receptionist**:
  - Emergency, appointment, and past-appointment lists
  - Find patient by SSN or HIC, edit demographics, view follow-up info
- **Paraclinical & Nurse**: Supportive endpoints and UI components for tests and nursing workflows
- **AI-assisted prediction**:
  - Endpoint `POST /predict` accepting age, sex, and symptoms[]
  - Uses Gemini to map text → evidence codes, then ML model to predict disease


### Repository Structure

- `backend/` — Flask app, blueprints (`authentication`, `doctor`, `receptionist`, `paraclinical`, `nurse`, `device_managing`), DB models, Dockerfile, compose (dev)
- `ai/` — AI microservice with trained artifacts in `saved_model2/`, evidence data in `ai/Dataset/`
- `frontend/` — React app (Create React App)
- `tests/` — API tests for authentication, doctor, nurse, paraclinical, receptionist
- `docker-compose.yml` — Multi-service orchestration (backend, ai, frontend, postgres)


### Services and Ports

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001 (container runs on 5000; mapped to host 5001)
- **AI Service**: http://localhost:5002
- **PostgreSQL**: localhost:5555 → container 5432


### Quick Start (Docker)

Prerequisites: Docker and Docker Compose.

1) Set environment for AI service (recommended via env file or shell):

```bash
export GEMINI_API_KEY="<your_google_generative_ai_api_key>"
export GEMINI_MODEL="gemini-2.0-flash" # or gemini-1.5-flash-latest
```

2) Start all services from the repository root:

```bash
docker-compose up --build
```

3) Open the apps:

- Frontend: http://localhost:3000
- Backend API base: http://localhost:5001
- AI service: http://localhost:5002

Notes:

- The compose file mounts volumes so code edits hot-reload in containers.
- PostgreSQL data is persisted via a named volume.
- The AI service requires valid environment variables; if missing, it will exit on startup.


### Local Development (without Docker)

You can run individual services locally. A running PostgreSQL instance is required for the backend.

- **Backend**
  - Python 3.10 recommended
  - From `backend/`:
    ```bash
    python -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    # Ensure backend/config.py has a valid SQLALCHEMY_DATABASE_URI
    # Start the app (dev):
    python run.py  # runs on :5000
    # or production style:
    gunicorn -b 0.0.0.0:5000 run:app
    ```
  - API base will be `http://localhost:5000` in this mode (update `frontend/src/config.js` if not using Docker).

- **AI Service**
  - From `ai/`:
    ```bash
    python -m venv .venv && source .venv/bin/activate
    pip install -r requirements.txt
    export GEMINI_API_KEY="<your_key>"
    export GEMINI_MODEL="gemini-2.0-flash"
    # Development
    python main.py  # runs on :5002
    # or production style
    gunicorn -b 0.0.0.0:5002 main:app
    ```

- **Frontend**
  - Node 20 recommended
  - From `frontend/`:
    ```bash
    npm install
    npm start  # http://localhost:3000
    ```
  - API base URL is configured in `frontend/src/config.js` (default `http://localhost:5001`).


### Configuration

- **Backend**
  - `backend/config.py` (`Config`):
    - `JWT_SECRET_KEY`: Replace in production
    - `SQLALCHEMY_DATABASE_URI`: Default points to the Dockerized Postgres service
    - `TEST_DATA = True`: Auto-seed mock/test data on startup
  - CORS allows `http://localhost:3000` by default.

- **AI Service**
  - Requires these environment variables:
    - `GEMINI_API_KEY`: Google Generative AI key
    - `GEMINI_MODEL`: e.g., `gemini-2.0-flash` or `gemini-1.5-flash-latest`
  - Loads model artifacts from `ai/saved_model2/` and evidence data from `ai/Dataset/release_evidences.json`.

- **Frontend**
  - `frontend/src/config.js` sets `API_BASE_URL` (default `http://localhost:5001`).


### Authentication and Test Accounts

Use these credentials (from test data) to sign in:

- **doctor** / `test`
- **receptionist1** / `test`
- **nurse** / `test`
- **paraclinical** / `test`
- **admin** / `test`


### API Overview

Base URL (Docker): `http://localhost:5001`

- **Auth**
  - `POST /authentication/login` → `{ username, password }` → `{ access_token }`
  - `POST /authentication/logout` with `Authorization: Bearer <token>`

- **Doctor (examples)**
  - `GET /doctor/landing_page/incoming_patient`
  - `GET /doctor/landing_page/todays_appointment`
  - `GET /doctor/landing_page/patient_sent_for_test`
  - `GET /doctor/diagnosis/patient_information/<sessionID>`
  - `GET /doctor/diagnosis/vital_signs/<sessionID>`
  - `GET /doctor/diagnosis/test_results/<sessionID>`
  - `POST /doctor/send_for_test/test_list/<sessionID>`
  - `POST /doctor/finalize_diagnosis/set_final_diagnosis/<sessionID>`
  - `POST /doctor/prescription_and_procedure/set_prescription/<sessionID>`
  - `POST /doctor/prescription_and_procedure/set_procedure/<sessionID>`
  - `POST /doctor/prescription_and_procedure/set_follow_up/<sessionID>`
  - `GET /doctor/inpatient_monitoring/medical_device_measurement/<inpatientID>`
  - `GET /doctor/inpatient_monitoring/event_list/<inpatientID>`
  - `POST /doctor/inpatient_monitoring/add_event_note/<inpatientID>`

- **Receptionist (examples)**
  - `GET /receptionist/landing_page/emergency`
  - `GET /receptionist/landing_page/appointment`
  - `GET /receptionist/landing_page/todays_past_appointment`
  - `GET /receptionist/landing_page/available_doctor`
  - `POST /receptionist/find_patient/ssn`
  - `POST /receptionist/find_patient/hic`
  - `GET /receptionist/finalize_check_in/patient_information/<patientID>`
  - `POST /receptionist/finalize_check_in/patient_information/<patientID>/edit`
  - `GET /receptionist/finalize_check_in/patient_information/<patientID>/follow_up`

- **AI Service**
  - `POST http://localhost:5002/predict`
    - Body: `{ age: number, sex: "Male"|"Female", symptoms: string[] }`
    - Returns predicted disease, class probabilities, and processed evidence codes


### Example Requests

Login to get a JWT:

```bash
curl -X POST http://localhost:5001/authentication/login \
  -H "Content-Type: application/json" \
  -d '{"username":"doctor","password":"test"}'
```

AI prediction (requires GEMINI_API_KEY running service at :5002):

```bash
curl -X POST http://localhost:5002/predict \
  -H "Content-Type: application/json" \
  -d '{
    "age": 42,
    "sex": "Male",
    "symptoms": ["fever", "dry cough", "left chest pain", "pain intensity 6"]
  }'
```


### Running Tests

Ensure the backend is running on `http://localhost:5001` (Docker or local).

Run all tests via discovery from the repo root:

```bash
python -m unittest discover -s tests -p 'test_*.py' -v
```

Or run a specific suite, for example authentication:

```bash
python -m unittest tests/test_authentication.py -v
```

Note: The helper `tests/run_all_test.py` contains OS-specific paths; prefer `unittest discover` as shown above.


### Data and Seeding

- With `TEST_DATA = True` in `backend/config.py`, the backend seeds mock data on startup.
- PostgreSQL container is initialized from `backend/init_db/` on first run.


### Security and Production Notes

- **Change secrets**: Replace `JWT_SECRET_KEY` and remove any hard-coded API keys.
- **Environment management**: Use env files or secrets providers; avoid committing keys.
- **CORS**: Adjust allowed origins beyond `http://localhost:3000` for production.
- **AI costs**: The Gemini API incurs usage costs; ensure quotas and monitoring.


### License

Specify your project license here.


### Acknowledgements

- Google Generative AI (Gemini) for symptom-to-evidence mapping
- scikit-learn/XGBoost for the ML model
- 


