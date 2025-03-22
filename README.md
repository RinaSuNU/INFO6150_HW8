# INFO6150_HW8
## User Management API
This project provides Secure RESTful APIs built with Node.js, Express, and MongoDB. The API supports operations such as user creation, updating, deletion, image uploads, and retrieval of all users. Swagger is used for documentation, and Postman is available for testing.
## Features
<pre>Create User: Add a new user with a full name, email, and password(using bcrypt for hashing).

Update User: Modify an existing user's full name and password.

Delete User: Remove a user by their email.

Retrieve All Users: Get a list of all registered users.

Upload Image: Associate an image (JPEG/PNG/GIF) with a user's account.

Swagger Documentation: Provides interactive API documentation at /api-docs.

Postman Testing: Test all endpoints using Postman and provide a collection file (exported from Postman) with sample requests for all endpoints.
</pre>
## Requirements
Node.js: Version 16 or higher.<br>

MongoDB: Installed and running locally or remotely
## Installation
<pre>1. Clone the repository
2. Install dependencies: 
>npm install
3. Configure MongoDB:
//start MongoDB
>mongosh
4. Run the program:
>node server.js
5. Access Swagger Documentation:
Visit http://localhost:8888/api-docs in your browser.</pre>

## Postman Testing
<pre>A Postman collection is provided for testing all API endpoints:
- Import the UserManagementAPI.postman_collection.json file into Postman.

- Adjust the base URL to http://localhost:8888.

- Use the preconfigured requests to test each endpoint.</pre>
