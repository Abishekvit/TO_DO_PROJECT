# TO_DO_PROJECT

A full-featured **To-Do App** built with **Node.js**, **Express**, **Passport**, and **MongoDB**, offering user signup/login, list and task management, and a clean EJS-based UI.

---

## ✨ Features

- 🔐 **Authentication**: User signup, login, and logout with `passport-local-mongoose`. User side validations using Bootstrap , Client side by Joi.
- 📋 **List & Task Management**: Create multiple lists, each containing tasks.
- ✏️ **Easy Updation & Deletion**: Update task names, delete tasks/lists with a single click.
- 🌓 **Light & Dark Mode**: Switch between light and dark themes for better usability.
- 🚫 **Protected Routes**: Middleware ensures only logged-in users can access lists and tasks.
- 🔒 **Restricted Access**: Already logged-in users cannot access signup/login pages.
- 📌 **Special List Handling**: `"General Routine"` list cannot be deleted.
- 💬 **Flash Messages**: Success and error notifications for better user feedback.
- 🎨 **Clean UI**: EJS templates with basic styling.

---

## 📂 Project Structure

## 📂 Project Structure

├── app.js # Main Express setup & route mounting
├── middleware.js # isLoggedIn and isLoggedOut route guards
├── models/
│ └── user.js # Mongoose User schema with passport-local plugin
├── routes/
│ ├── user.js # Auth routes (signup, login, logout)
│ ├── list.js # CRUD routes for lists (and nested tasks)
│ └── task.js # Nested task routes inside lists
├── utils/
│ ├── wrapAsync.js # Async wrapper for error handling
│ ├── ExpressError.js # Custom error class
│ └── schema.js # Joi validation
├── views/ # EJS view templates
├── public/ # Static assets (CSS, images, JS)
├── package.json
└── .env # Environment config (not committed)

##👤 Author
Developed by Abishek
Feel free to raise issues or suggest improvements in the repo!