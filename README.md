# Project Overview
Learnify is a quiz application that based on website, in which the application will have student and instructor role, and student can join to a class by ID that given by the their instructor. Student also can submit quiz that created by instructor on their class. This web application also support realtime functionality.

# Technology Used
- ReactJS
- NodeJS
- Express
- MongoDB
- SCSS
- Socket io

# Main Features For Instructor
- Create Quiz
- Edit Quiz
- Delete Quiz
- Delete Class
- Restrict Class To Be Joined
- Lock Quiz
- View Submission
- Create Class
- View Student Grade
- Send Broadcast To Class
- Rename Class
- Remove Student From Class

# Main Features For Student
- Join Class
- Submit Quiz
- View Grade

# General Features
- Login
- Register
- Verify Account Via Email
- Forget Password
- Login With Google / Facebook
- Realtime Notification
- Change Password
- Edit Profile

# How To Clone
1. First of all, you need to clone this repository to your local machine by running `git clone https://github.com/stanleyclaudius/learnify.git` command
2. After that, you can go to the client folder by running `cd client` command and run the `npm install` command
3. Don't forget to run `npm install` command too on the root folder of the project to install the backend part dependencies
4. After that, you can create a new `.env` file at config folder, and paste all content at `.env.example` file to the `.env` file that just created by you, and fill up everything.
5. Lastly, you can run the application by running `npm run dev` command at the terminal that pointing to the root folder of this project

# Closing Word
Thank you for visiiting this repository. Feel free to post an issue if you found one or more bug.