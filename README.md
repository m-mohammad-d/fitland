
# 🏋️‍♀️ FitLand – Sportswear E-commerce Platform

FitLand is a modern, full-featured e-commerce web application for selling sportswear online. It supports user authentication, dynamic product filtering, advanced cart functionality, order placement with custom delivery options, and wallet-based payments — all built with cutting-edge technologies like Next.js, GraphQL, Prisma, and TailwindCSS.

---

## ✨ Features

- 🛍️ Product catalog with images, size, color, category, stock, and price
- 🔍 Advanced product filtering
- 🧾 Discount code support
- 🛒 Smart cart (guest & authenticated mode)
- 🧑‍💼 Authentication system (Sign up / Sign in)
- 🚚 Delivery scheduling with selectable time ranges
- 💳 Multiple payment methods including wallet
- 🏦 User wallet with real-time balance tracking
- 📬 Order confirmation and history
- 🌍 Address selection with Leaflet map and geosearch
- 📊 Dashboard with charts (admin side)
- 📧 Email notifications via Nodemailer

---

## 🧱 Tech Stack

| Layer         | Tools/Libs                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| **Frontend**  | Next.js, React 19, TailwindCSS, Radix UI, Swiper, Framer Motion            |
| **Forms**     | React Hook Form, Zod, @hookform/resolvers                                  |
| **State**     | Zustand                                                                    |
| **Routing**   | nuqs (for URL query state)                                                 |
| **Backend**   | GraphQL (Apollo Server), Prisma, PostgreSQL                                |
| **Auth**      | JWT, bcryptjs                                                              |
| **File Upload** | Cloudinary                                                              |
| **Maps**      | Leaflet + Leaflet GeoSearch                                                |
| **Charts**    | Chart.js, react-chartjs-2                                                  |
| **Email**     | Nodemailer                                                                 |


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/m-mohammad-d/fitland.git
cd fitland
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file based on `.env.example` and fill in your:

* Database connection string
* JWT secrets
* Cloudinary credentials
* Email credentials (for Nodemailer)

```bash
cp .env.example .env
```

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start the Development Server

```bash
npm run dev
```

---



## 📜 License

This project is licensed under the MIT License.

---

## 💬 Contributing

PRs are welcome! Please open an issue first to discuss what you’d like to change.

---


> Built with ❤️ by Mohammad

