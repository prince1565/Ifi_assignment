# 💻 IFI Assignment – Full Stack EMI Product App

This is a **Full Stack MERN-style project** that demonstrates how to manage product variants (color, storage) and EMI plans with backend integration and frontend interactivity.  
The project includes a **Node.js + Express backend** with a **MongoDB database**, and a **React.js frontend** to display products, choose variants, select EMI plans, and proceed to checkout using a modal/cart UI.

---

## 🚀 Tech Stack Used

### 🖥️ Frontend:
- React.js (Vite setup)
- Tailwind CSS
- Axios for API requests
- React Router DOM

### ⚙️ Backend:
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- CORS + dotenv
- Nodemon for development

---

## ⚙️ Setup and Run Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/prince1565/Ifi_assignment.git
cd Ifi_assignment

2️⃣ Setup Backend

cd backend
npm install

Create a .env file inside /backend:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ifi_assignment


Seed initial data
node seed.js

npm run dev

3️⃣ Setup Frontend

cd ../frontend
npm install
npm run dev


Frontend will start at http://localhost:5173
Backend runs on http://localhost:5000



🧾 API Endpoints and Example Responses
1️⃣ Fetch Product by Slug

Endpoint: GET /api/products/:slug

Example Request:  GET /api/products/iphone-15
 
Example Response:

{
  "name": "iPhone 15",
  "slug": "iphone-15",
  "price": 79999,
  "mrp": 89999,
  "selectedStorage": {
    "label": "128GB",
    "price": 79999
  },
  "selectedColor": {
    "name": "Blue",
    "hex": "#1E90FF"
  },
  "emiPlans": [
    {
      "tenure": 6,
      "monthlyAmount": 13500,
      "interestRate": "10%"
    },
    {
      "tenure": 12,
      "monthlyAmount": 6900,
      "interestRate": "12%"
    }
  ]
}


Get All Products
Endpoint:  GET /api/products

Example Response:

[
  {
    "_id": "6767b4b...",
    "name": "iPhone 15",
    "slug": "iphone-15",
    "price": 79999
  },
  {
    "_id": "6767b4c...",
    "name": "Samsung S24",
    "slug": "samsung-s24",
    "price": 69999
  }
]



🧱 Database Schema

Product Model (Mongoose)

{
  name: String,
  slug: String,
  price: Number,
  mrp: Number,
  image: String,
  storages: [
    {
      label: String,
      price: Number,
      image: String
    }
  ],
  colors: [
    {
      name: String,
      hex: String,
      image: String
    }
  ],
  emiPlans: [
    {
      tenure: Number,
      monthlyAmount: Number,
      interestRate: String
    }
  ]
}


🌱 Seed Data Example

[
  {
    name: "iPhone 15",
    slug: "iphone-15",
    price: 79999,
    mrp: 89999,
    image: "/images/iphone15.png",
    storages: [
      { label: "128GB", price: 79999 },
      { label: "256GB", price: 89999 }
    ],
    colors: [
      { name: "Blue", hex: "#1E90FF" },
      { name: "Black", hex: "#000000" }
    ],
    emiPlans: [
      { tenure: 6, monthlyAmount: 13500, interestRate: "10%" },
      { tenure: 12, monthlyAmount: 6900, interestRate: "12%" }
    ]
  }
]



🛒 Frontend Features

Dynamic product variant switching (color & storage)

EMI plan selection

Checkout modal/cart preview

Responsive UI with Tailwind CSS

API integrated with backend using Axios



✅ Example Checkout Modal

When user clicks “Proceed with this plan”,
a modal displays selected:

Color & Storage

EMI plan duration & amount

“Confirm Purchase” button



🏁 Summary

✅ Fully functional backend API
✅ React frontend with real-time variant updates
✅ Integrated database schema and seed data
✅ Clean modular structure for easy understanding and deployment


