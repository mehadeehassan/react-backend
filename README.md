# React Shops — Backend

The backend API server for the React Shops e-commerce application, built with Node.js, Express, and MySQL (via Sequelize ORM).

## 🚀 Tech Stack

- **Node.js** — JavaScript runtime
- **Express 5** — Web framework for building the REST API
- **MySQL** — Relational database
- **Sequelize** — ORM for MySQL
- **JSON Web Token (jsonwebtoken)** — Authentication & authorization
- **express-validator** — Request validation
- **Multer** — File upload handling
- **Multer Storage Cloudinary** — Direct file uploads to Cloudinary
- **Cloudinary** — Image/media hosting and management
- **body-parser** — Request body parsing
- **cors** — Cross-origin resource sharing
- **dotenv** — Environment variable management

### Dev Tools
- **ESLint** with `eslint-config-prettier`, `eslint-plugin-jsx-a11y`, `eslint-plugin-unused-imports`
- **node --watch** — Auto-restart on file changes during development (no nodemon needed)

## 📦 Installation

Clone the repository and install dependencies:

```bash
npm install
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
NODE_ENV=development

# MySQL Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=react_shops
DB_USER=root
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend
CLIENT_URL=http://localhost:5173
```

## 🛠️ Usage

### Start the development server
```bash
npm run dev
```
Uses Node's built-in `--watch` flag to auto-restart on file changes.

### Start the production server
```bash
npm start
```

## 📁 Project Structure (suggested)

```
backend/
├── config/
│   ├── database.js       # Sequelize connection setup
│   └── cloudinary.js     # Cloudinary config
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── upload.js          # Multer + Cloudinary storage
│   └── validateRequest.js
├── models/
│   ├── index.js
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── OrderItem.js
│   └── Category.js
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│   └── userRoutes.js
├── validators/
│   ├── authValidator.js
│   └── productValidator.js
├── utils/
│   ├── generateToken.js
│   └── apiResponse.js
├── .env
├── app.js
├── package.json
└── README.md
```

## 🔌 API Endpoints (suggested)

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get a single product |
| POST | `/api/products` | Create a product with image upload (admin) |
| PUT | `/api/products/:id` | Update a product (admin) |
| DELETE | `/api/products/:id` | Delete a product (admin) |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders (admin) |
| GET | `/api/orders/my-orders` | Get logged-in user's orders |
| POST | `/api/orders` | Create a new order |
| PUT | `/api/orders/:id` | Update order status (admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get logged-in user profile |
| PUT | `/api/users/profile` | Update profile |
| GET | `/api/users` | Get all users (admin) |

## ✨ Features (suggested)

- JWT-based authentication & authorization
- Role-based access control (user/admin)
- Request validation with express-validator
- Product CRUD operations with Sequelize models & associations
- Image uploads to Cloudinary via Multer
- Order management
- Centralized error handling
- CORS-enabled for frontend integration

## 🗄️ Database

This project uses **MySQL** with **Sequelize** as the ORM. Make sure MySQL is installed and running, and that the database specified in `DB_NAME` exists before starting the server. Sequelize can auto-sync models or use migrations depending on your setup.

## 📝 License

ISC

## 🤝 Contributing

Issues and pull requests are welcome.