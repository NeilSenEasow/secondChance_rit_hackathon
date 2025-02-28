# Second-Hand Goods Marketplace

## Overview
The Second-Hand Goods Marketplace is a web-based platform for buying and selling used goods. This project allows users to register, log in, list products, and communicate with potential buyers or sellers.

## Technology Stack
- **Frontend**: React.js (with Vite), Tailwind CSS
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (using Mongoose ORM)
- **Authentication**: JWT for secure user login
- **File Storage**: Cloudinary for image uploads

## Prerequisites
Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (either locally or using a cloud service like MongoDB Atlas)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/second-hand-goods-marketplace.git
cd second-hand-goods-marketplace
```

### 2. Set Up the Backend

#### 2.1. Navigate to the Backend Directory
```bash
cd server
```

#### 2.2. Install Dependencies
```bash
npm install
```

#### 2.3. Start the Backend Server
```bash
npm run dev
```
The server should start on `http://localhost:5000`.

### 3. Set Up the Frontend

#### 3.1. Navigate to the Frontend Directory
```bash
cd ..
```

#### 3.2. Install Dependencies
```bash
npm install
```

#### 3.3. Start the Frontend Development Server
```bash
npm run dev
```
The frontend should be accessible at `http://localhost:5173`.

## Usage
- **Register**: Create a new account by navigating to the registration page.
- **Login**: Use your credentials to log in.
- **Add Products**: Once logged in, you can add products to the marketplace.
- **View Products**: Browse through the available products and view details.
- **Chat**: Communicate with other users regarding product inquiries.

## Testing
You can test the API endpoints using tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

## Troubleshooting
- Ensure MongoDB is running and accessible.
- Check for any errors in the console for both the frontend and backend.
- Make sure to install all dependencies correctly.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the contributors and the open-source community for their support.
