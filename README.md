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

Note: Ensure that both frontend server and backend server will run parallel.

**Output:**

**1.Home Page before login**
![image](https://github.com/user-attachments/assets/09ce3648-7bf6-431e-9286-b36f4b3c2ad0)

-> The above page is having only access for viewing the Blogs.

If you want full access on Blogs then Signup and login:

**2. Signup**
![image](https://github.com/user-attachments/assets/e73342ee-5959-419a-97fe-d04400d1d1be)

-> Enter the Details and click on the signup, your account will be created successfully

Now Login with same credentials which you created Now, else it will display Invalid Credential.

**3.Login**
![image](https://github.com/user-attachments/assets/83bda9b8-6653-4147-8fbb-b6d90733d200)

After entering correct details. it will display success message and it will redirect to Home page.

**4. Home page after login**
![image](https://github.com/user-attachments/assets/9e647fe8-2017-459b-8ee6-5654c06059f4)

Now you will see Create Blog option on Navbar. you can create a blog now by clicking on that button.

**5. Create-Blog page**
![image](https://github.com/user-attachments/assets/7cfcc591-0609-4ede-bd02-3f42c6b615a2)

After entering title and content, it will display success message and it navigate to home page.

**6. Blog detail page**
![image](https://github.com/user-attachments/assets/f2ae9293-a1d9-445e-985f-f9ba3c6eb376)

This page will displays full information about Blog and those who created this blog that particular user can access to delete or edit the Blog.

After click on edit Blog

**7. Edit Blog page**
![image](https://github.com/user-attachments/assets/59df8ab1-a549-4e5d-93e6-01a2df489989)

After editing information it will display the success message and it will navigate to Blog Detail page.

**8.Delete Blog**
![image](https://github.com/user-attachments/assets/7a9ea169-f96f-4598-a62a-00c6ba3513b6)

If you delete on a Delete Blog, it will ask for a conformation that, are sure you want delete this blog, if you click on yes it will delete and it will redirect to homepage. else if you click on No it will remains in that page.

**9. Pagination**

I also added pagination to Bloglist. In each page there is 6 blogs.

![image](https://github.com/user-attachments/assets/7b671bfd-47f3-4d4f-909e-29fe4269b844)

![image](https://github.com/user-attachments/assets/46ca4661-d401-40f4-aa59-3fa0973c3c72)

![image](https://github.com/user-attachments/assets/171e5b99-d8c0-4ba1-86b3-73e6cbda180d)












