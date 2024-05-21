# CoderHouse Backend Node.js Course Project

Welcome to my e-commerce API project developed for the CoderHouse Backend Node.js course. This project demonstrates a comprehensive backend application using Node.js, Express, and various other technologies and libraries.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Frontend Integration](#frontend-integration)

## Demo
You can check out the live demo of the project [here](https://backend-coderhouse-api.onrender.com).

## Features
- **RESTful API**: CRUD operations for managing eCommerce data.
- **File Upload**: Upload images using Multer.
- **WebSockets**: Real-time updates with WebSocket.
- **Authentication**: GitHub authentication with Passport.js.
- **Email Notifications**: Send emails using Nodemailer.
- **Error Handling**: Centralized error handling.
- **Logging**: Advanced logging with Winston.
- **Templating**: Handlebars for the frontend.
- **DTOs**: Data Transfer Objects for data handling.
- **Middlewares**: Custom middlewares for various functionalities.
- **API Documentation**: Documented with Swagger.
- **Testing**: Endpoint testing with Chai and Supertest.

## Technologies Used
- **Node.js**
- **Express**
- **Multer**: For file uploads.
- **WebSocket**: For real-time communication.
- **Handlebars**: For frontend templating.
- **Passport.js**: For GitHub authentication.
- **Nodemailer**: For sending emails.
- **Winston**: For logging.
- **MongoDB**: Database.
- **Mongoose**: ODM for MongoDB.
- **Swagger**: API documentation.
- **Chai**: Assertion library.
- **Supertest**: HTTP assertions.

## Project Structure
```
/src
│
├── /controllers        # Controllers for handling requests
│
├── /DAO                # Data Access Objects
│   ├── mongo           # MongoDB specific data access
│       ├── models      # Mongoose models representing data schema
│
├── /docs               # Documentation
│   ├── Carts           # Documentation related to Carts API
│   └── Products        # Documentation related to Products API
│
├── /dto                # Data Transfer Objects for data handling
│
├── /middlewares        # Custom middlewares for request processing
│
├── /public             # Static files accessible to the client
│   ├── assets          # Assets like images and stylesheets
│   ├── fileUpload      # Directory for uploaded files
│   └── js              # Client-side JavaScript files
│
├── /routes             # Route definitions for the API endpoints
│
├── /services           # Business logic
│   ├── errors          # Custom error handling logic
│
├── /utils              # Utility functions and helper modules
│
├── /views              # Handlebars views for frontend rendering
│   ├── layouts         # Layout templates for Handlebars views
│
├── app.js              # Main application file where the Express app is created and configured
└── dirname             # Directory name utility or specific configurations       
```


## Installation
To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/CordeiroM17/Backend_node_coderhouse.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd Backend_node_coderhouse
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the root directory and add the necessary environment variables as described in `config.js`. You have two examples `env.production` for production mode and `env.development` for development mode
    
    ```bash
    PERSISTENCE='MONGO'
    PORT=
    MONGO_URL=''
    GITHUB_PASSPORT_CLIENT_ID=''
    GITHUB_PASSPORT_CLIENT_SECRET=''
    GITHUB_PASSPORT_CALLBACK_URL=''
    API_URL=''
    GOOGLE_EMAIL=''
    GOOGLE_PASS=''
    ```

5. **Start application in development mode**:
    ```bash
    npm run dev
    ```

6. **Start application in production mode**:
    ```bash
    npm start
    ```

## Usage
You can use tools like Postman or cURL to interact with the API. Here are some example endpoints:

### API Endpoints
- **GET /api/products**: Retrieve a list of products.
- **POST /api/products**: Add a new product.
- **PUT /api/products/:id**: Update a product by ID.
- **DELETE /api/products/:id**: Delete a product by ID.
- **POST /api/upload**: Upload an image file.
- **GET /auth/github**: Initiate GitHub authentication.
- **POST /api/send-email**: Send an email.


## API Documentation
The API is documented using Swagger. You can access the Swagger UI to explore the API documentation.

1. **Swagger UI**:
   Open your browser and navigate to: http://localhost:3000/apidocs


## Testing
The project includes endpoint tests using Chai and Supertest. To run the tests, use the following command:

```bash
npm run test
```

## Frontend Integration
The frontend is developed using Handlebars for templating. To integrate with the backend API, ensure your API endpoints are correctly called from the frontend templates.

Explore the project, try out the features, and feel free to contribute or provide feedback!

Happy Coding! 😊