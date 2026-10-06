# Contact Management System API

A RESTful API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** for managing personal and professional contacts with CRUD operations.

---

## 📌 Features

- **Create Contact**: Store new contact details with field validation.
- **Get All Contacts**: Retrieve a list of all stored contacts.
- **Get Contact by ID**: Fetch specific contact by `contactId` or MongoDB `_id`.
- **Update Contact**: Modify details of an existing contact.
- **Delete Contact**: Remove a contact from the database.
- **Data Validation**:
  - `contactId`: String, Unique, Required
  - `name`: String, Required
  - `phone`: String, Required, Must be exactly 10 digits
  - `email`: String, Unique, Required, Must be a valid email format

---

## 🛠 Project Structure

```
contact-management-system/
├── config/
│   └── db.js                 # MongoDB connection using Mongoose
├── controllers/
│   └── contactController.js  # Controller logic for CRUD operations
├── models/
│   └── Contact.js            # Mongoose schema and model definition
├── routes/
│   └── contactRoutes.js     # Express routes definition
├── .env                      # Environment variables
├── .env.example              # Example environment setup
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies and scripts
├── server.js                 # Express server entry point
└── README.md                 # Project documentation
```

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Balamurugan-T326/contact-management-system.git
   cd contact-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (or copy from `.env.example`):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/contact_management
   ```

4. **Run the Application**
   - **Production mode:**
     ```bash
     npm start
     ```
   - **Development mode (with Nodemon auto-reload):**
     ```bash
     npm run dev
     ```

Server will run on `http://localhost:5000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/contacts` | Add a new contact record |
| `GET` | `/contacts` | Fetch all contact records |
| `GET` | `/contacts/:id` | Fetch a contact by `contactId` or MongoDB `_id` |
| `PUT` | `/contacts/:id` | Update contact details by `contactId` or `_id` |
| `DELETE` | `/contacts/:id` | Delete a contact record by `contactId` or `_id` |

---

## 📝 Example Requests & Responses

### 1. Add New Contact (`POST /contacts`)
**Request Body:**
```json
{
  "contactId": "CNT101",
  "name": "Balamurugan T",
  "phone": "9876543210",
  "email": "balamurugan@example.com"
}
```

**Response (`201 Created`):**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "contactId": "CNT101",
    "name": "Balamurugan T",
    "phone": "9876543210",
    "email": "balamurugan@example.com",
    "_id": "670321a0845bc2f11c7890ab",
    "createdAt": "2026-10-06T23:20:00.000Z",
    "updatedAt": "2026-10-06T23:20:00.000Z"
  }
}
```

---

### 2. Fetch All Contacts (`GET /contacts`)
**Response (`200 OK`):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "670321a0845bc2f11c7890ab",
      "contactId": "CNT101",
      "name": "Balamurugan T",
      "phone": "9876543210",
      "email": "balamurugan@example.com",
      "createdAt": "2026-10-06T23:20:00.000Z",
      "updatedAt": "2026-10-06T23:20:00.000Z"
    }
  ]
}
```

---

### 3. Fetch Contact by ID (`GET /contacts/:id`)
**URL:** `GET http://localhost:5000/contacts/CNT101`

**Response (`200 OK`):**
```json
{
  "success": true,
  "data": {
    "_id": "670321a0845bc2f11c7890ab",
    "contactId": "CNT101",
    "name": "Balamurugan T",
    "phone": "9876543210",
    "email": "balamurugan@example.com",
    "createdAt": "2026-10-06T23:20:00.000Z",
    "updatedAt": "2026-10-06T23:20:00.000Z"
  }
}
```

---

### 4. Update Contact (`PUT /contacts/:id`)
**URL:** `PUT http://localhost:5000/contacts/CNT101`

**Request Body:**
```json
{
  "phone": "9998887770"
}
```

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "_id": "670321a0845bc2f11c7890ab",
    "contactId": "CNT101",
    "name": "Balamurugan T",
    "phone": "9998887770",
    "email": "balamurugan@example.com",
    "updatedAt": "2026-10-06T23:25:00.000Z"
  }
}
```

---

### 5. Delete Contact (`DELETE /contacts/:id`)
**URL:** `DELETE http://localhost:5000/contacts/CNT101`

**Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

---

### ⚠️ Validation Error Example (`400 Bad Request`)
If invalid data is provided (e.g. invalid phone number format or invalid email):

**Request Body:**
```json
{
  "contactId": "CNT102",
  "name": "John Doe",
  "phone": "12345",
  "email": "invalid-email"
}
```

**Response (`400 Bad Request`):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "12345 is not a valid 10-digit phone number!",
    "invalid-email is not a valid email address!"
  ]
}
```

---

## 🧪 Testing with Postman / Thunder Client

Import the endpoints listed above into **Postman** or **Thunder Client** using `http://localhost:5000/contacts`.
