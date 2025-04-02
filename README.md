**Blog Application using React and Django**

This is a FullStack Blog Application built using React for the frontend and Django for the backend, with SqlLite as the database.



**Features**

=> User authentication (Login/Signup)

=> Create, edit, and delete blog posts

=> View all blog posts with comments

=> Responsive UI with React

**Prerequisites**

Ensure you have the following installed:

Python (>= 3.x)

Node.js (>= 16.x)

Git

**Installation**

**1. Clone the Repository**
git clone (https://github.com/Rajendra939098/Blog_Application-using-React-and-Django-/)
cd Blog_Application-using-React-and-Django

**2. Setup Backend (Django)**
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt

**Apply Migrations and Run Server**
python manage.py migrate
python manage.py runserver

Backend will be running at http://127.0.0.1:8000

**3. Setup Frontend (React)**
cd frontend
npm install

**Start Frontend Server**
npm start
Frontend will be available at http://localhost:3000

Note: Ensure that both frontend server and backend server will run parallelly.

