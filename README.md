# Deliveroo - Parcel Delivery Platform
Deliveroo is a full-stack web application designed to streamline parcel delivery management. 
It features distinct dashboards for users and administrators, real-time tracking, JWT authentication, and a responsive UI. 
Built with FastAPI (Python) for the backend and React (Vite) for the frontend.
___________________________________________________________________________________________________________________________________

# Table of Contents
___________________________________________________________________________________________________________________________________

1. Project Structure

2. Features

3. Tech Stack

4. Getting Started

    -Prerequisites

    -Backend Setup

    -Frontend Setup

5. Usage

    -User Flow

    -Admin Flow

6. API Documentation

7. Database Schema

8. Environment Variables

9. Testing

10. Deployment

11. Contributing

12. License

13. Acknowledgments

_________________________________________________________________________________________________________________________________

# Project Structure
_________________________________________________________________________________________________________________________________

## Backend (/Backend)
    Built with FastAPI following MVC-like architecture:
```
Backend/
├── app/                         # Core application logic
│   ├── auth/                    # JWT authentication handlers
│   ├── database/                # Database connection & CRUD operations
│   ├── models/                  # SQLAlchemy ORM models (Parcel, User, etc.)
│   ├── routes/                  # API endpoints (users.py, parcels.py)
│   ├── schemas/                 # Pydantic request/response models
│   ├── __init__.py              # Package initialization
│   └── seed.py                  # Database seeding script (sample data)
├── alembic/                     # Database migration scripts
├── main.py                      # FastAPI app entry point
├── requirements.txt             # Python dependencies
└── .env                         # Environment variables
```
________________________________________________________________________________________________________________________________

## Frontend (/frontend)
    Built with React + Vite and structured by feature:

```text
frontend/
├── src/
│   ├── assets/                  # Static files (images, fonts)
│   ├── components/              # Reusable UI components (Navbar, Card)
│   ├── contexts/                # React contexts (AuthContext)
│   ├── hooks/                   # Custom hooks (useParcels, useAuth)
│   ├── pages/                   # Route-based components (Dashboard, Login)
│   ├── services/                # API service layer (api.js)
│   ├── App.jsx                  # Root component
│   └── main.jsx                 # Entry point
├── public/                      # Static HTML/favicon
├── package.json                 # Frontend dependencies
└── vite.config.js               # Vite configuration
```
_______________________________________________________________________________________________________________________________

# Features
## Core Functionality
```
Feature	            User	    Admin	    Description
_______________________________________________________________________________________________________________________________
Authentication	     ✅	        ✅	        JWT-based login/registration with role-based access control.
_______________________________________________________________________________________________________________________________
Parcel Creation	     ✅	        ❌	        Users can create parcels with auto-calculated pricing (weight/destination).
_______________________________________________________________________________________________________________________________
Parcel Tracking	     ✅	        ✅	        Real-time status updates with map visualization (Leaflet.js).
_______________________________________________________________________________________________________________________________
Admin Dashboard	     ❌	        ✅	        View/edit all parcels, filter by status, bulk actions.
_______________________________________________________________________________________________________________________________
Profile Management	 ✅	        ✅	        Upload profile pictures, view delivery statistics.
_______________________________________________________________________________________________________________________________
```
# Technical Highlights
- Dynamic Pricing: Algorithm calculates cost based on weight (kg) and destination zones.

- Real-Time Updates: Admin status changes reflect instantly on user dashboards.

- Responsive Design: Mobile-first UI with Tailwind CSS.

# Tech Stack

## Frontend
```
Tool	                                        Purpose
__________________________________________________________________________

React 18	                                Component-based UI
__________________________________________________________________________

Vite	                                    Fast development/build tool
__________________________________________________________________________

Tailwind CSS	                            Utility-first styling
__________________________________________________________________________

React Router	                            Client-side routing
__________________________________________________________________________

Axios	                                    HTTP requests to backend
__________________________________________________________________________

Leaflet.js	                                Interactive maps for tracking
__________________________________________________________________________

Framer Motion	                            Animations
__________________________________________________________________________
```

## Backend
```
Tool	                                         Purpose
__________________________________________________________________________

FastAPI	                                       REST API framework
__________________________________________________________________________

SQLAlchemy (ORM)	                           Database interactions
__________________________________________________________________________

Alembic	                                       Database migrations
__________________________________________________________________________

PostgreSQL/SQLite	                           Database (configurable)
__________________________________________________________________________

JWT	                                           Secure authentication
__________________________________________________________________________

Pydantic	                                   Data validation
__________________________________________________________________________
```
_______________________________________________________________________________________________________________________________________

# Getting Started

## Prerequisites

- Python 3.10+ (Backend)

- Node.js 18+ (Frontend)

- PostgreSQL (or SQLite for development)

## Backend Setup

1. Clone the repository:

    - git clone https://github.com/yourusername/Deliveroo.git
    - cd Deliveroo/Backend

2. Set up a virtual environment:
    - python -m venv venv
    - source venv/bin/activate  # Linux/Mac
    - venv\Scripts\activate     # Windows

3. Install dependencies:

    - pip install -r requirements.txt

4. Configure environment:
 - Duplicate .env.example to .env and update:

    - SQLALCHEMY_DATABASE_URL="postgresql://user:password@localhost:5432/deliveroo"
    - SECRET_KEY="your_jwt_secret_key"

5. Run migrations:

    - alembic upgrade head

6. Seed the database (optional):

    - python app/seed.py

7. Start the server:

    - uvicorn main:app --reload
        → Access docs at: http://localhost:8000/docs

## Frontend Setup
1. Navigate to the frontend folder:

        - cd ../frontend

2. Install dependencies:

    - npm install

3. Start the development server:

    - npm run dev
        → App runs at: http://localhost:5173

___________________________________________________________________________________________________________________________________________________________________

# Usage

## User Flow
1. Register → Login → Dashboard

2. Create Parcel:

    - Enter weight (kg) and select destination.
    - Price auto-calculates (e.g., $5/kg + $10/zone).

3. Track Parcel:

    - View status (Pending, In Transit, Delivered).
    - See location on map (simulated coordinates).

4. Admin Flow
    1. Login with admin credentials (admin@deliveroo.com).
    2. Manage Parcels:
        - Filter by status (/parcels?status=In+Transit).
        - Update status via dropdown.

    3. View Analytics:
        - Total parcels delivered this month.

_____________________________________________________________________________________________________________________________________________

# API Documentation

## Explore endpoints interactively:

    - Swagger UI: http://localhost:8000/docs
    - Redoc: http://localhost:8000/redoc

## Key Endpoints:
```
Method	        Endpoint	             Description	                    Auth Required
_________________________________________________________________________________________________
POST	       /users/register	        Register new user	                    No
_________________________________________________________________________________________________

POST	       /users/login	            Login (returns JWT)                     No
_________________________________________________________________________________________________

GET	           /parcels/user/{id}	    Get all parcels for a user	            Yes (User)
_________________________________________________________________________________________________

PUT	           /parcels/{id}/status	    Update status (Admin only)	            Yes (Admin)
_________________________________________________________________________________________________
```

## Database Schema

    - Users: id, email, hashed_password, role (user/admin)
    - Parcels: id, user_id, weight, status, destination, price

# Deployment
## Backend (FastAPI)
    - Use gunicorn for production:
        - gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
        - Set environment variables for production (disable --reload).

## Frontend (Vite)
    - Build optimized assets:
        - npm run build
    - Deploy to Vercel, Netlify, or static hosting.

# Contributing

1. Fork the repository.

2. Create a branch: 
    - git checkout -b feature/your-feature.

3. Commit changes: 
    - git commit -m "Add amazing feature".

4. Push: 
    - git push origin feature/your-feature.

5. Open a Pull Request.

# License

MIT License. See LICENSE.

# Acknowledgments
    - FastAPI for the lightning-fast backend.
    - Leaflet.js for interactive maps.
    - Tailwind CSS for effortless styling.

# Deliveroo © 2024 - Modern Parcel Delivery Management.
