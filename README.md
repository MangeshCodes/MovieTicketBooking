# QuickShow 🎬 - Movie Ticket Booking System

A premium, full-stack movie ticket booking web application built using the **MERN** stack, integrated with event-driven background workflows and premium payment integrations. The platform offers a seamless browsing, booking, and booking management experience for users, alongside a detailed administration system.

---

## 🌟 Key Features

### 👤 User-Facing Features
- **Dynamic Movie Catalog**: Browse trending movies, view summaries, ratings, cast information, and language preferences.
- **Interactive Seat Booking**: Real-time interactive seat grid displaying available and occupied seats.
- **Instant Booking Status**: Check-out with Stripe for card processing, with immediate confirmation.
- **User Authentication**: Secure user login, signup, and profile options powered by **Clerk**.
- **User Favorites**: Mark favorite movies to persist in your personalized collection.
- **My Bookings Dashboard**: View all current and historical bookings, including payment states.
- **Trailer Previews**: Seamlessly watch movie trailers directly on the platform.

### 👑 Admin Management
- **Interactive Dashboard**: Track metrics including total registered users, shows added, total tickets booked, and total revenue generated.
- **TMDB Smart Import**: Seamless show creation—admins simply input a TMDB Movie ID, and the server fetches all metadata (title, overview, poster, backdrop, genres, cast credits) automatically from the **TMDB API**.
- **Telemetry & Show Lists**: View active shows, schedules, pricing, and occupant details.

### ⚙️ Asynchronous Background Tasks (Event-Driven)
Powered by **Inngest** background runners:
- **Automatic Seat Release**: If a user initiates booking but fails to complete the Stripe payment within 10 minutes, the occupied seats are auto-released, and the pending booking is cancelled.
- **Clerk Webhook Syncing**: Listens to Clerk events (`user.created`, `user.updated`, `user.deleted`) to maintain user profiles in the MongoDB database automatically.
- **Show Notifications**: Broadcasts a newsletter-style email notification to all users when a new movie show is registered.
- **Show Reminders**: Runs a recurring cron job every 8 hours that checks upcoming bookings starting in the next 8 hours and emails personalized reminder warnings to attendees.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, React Router DOM, React Hot Toast, Lucide React, React Player |
| **Backend** | Node.js, Express.js, Inngest SDK, Stripe SDK, Clerk Express SDK, Nodemailer |
| **Database** | MongoDB & Mongoose |
| **Integrations & APIs** | Clerk (Auth), Stripe (Payments), TMDB (Movie Info), Brevo/SMTP (Emails) |

---

## 📁 Project Structure

```text
MovieTicketBooking/
├── client/                     # Frontend React SPA
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── assets/             # Images, logos, and SVGs
│   │   ├── components/         # Reusable UI components (Hero, Navbar, DateSelect, etc.)
│   │   ├── context/            # React Context API for global state management
│   │   ├── lib/                # Client utility modules
│   │   ├── pages/              # Client views (Home, Movies, SeatLayout, admin dashboards)
│   │   ├── App.jsx             # Main routing setup
│   │   └── main.jsx            # React root mount
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API & Worker Server
│   ├── configs/                # DB connections and Nodemailer SMTP configurations
│   ├── controllers/            # Controller handlers (Admin, Bookings, Shows, Webhooks)
│   ├── inngest/                # Inngest client and background function declarations
│   ├── middleware/             # Express middlewares (Admin auth guard, Clerk checkers)
│   ├── models/                 # Mongoose schemas (Booking, Movie, Show, User)
│   ├── routes/                 # Express Router endpoint mappings
│   ├── server.js               # Express application entry point
│   └── package.json
```

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** (v18.x or higher)
- **MongoDB** instance (Local or Atlas URI)
- Accounts with **Clerk**, **Stripe**, and **TheMovieDB (TMDB)**.

### 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/MangeshCodes/MovieTicketBooking.git
   cd MovieTicketBooking
   ```

2. **Configure Backend Settings**
   - Navigate to the server folder:
     ```bash
     cd server
     ```
   - Create a `.env` file based on `.env.example`:
     ```env
     MONGODB_URI=mongodb+srv://your_username:password@cluster.mongodb.net
     TMDB_API_KEY=your_tmdb_api_key
     CLERK_PUBLISHABLE_KEY=pk_test_...
     CLERK_SECRET_KEY=sk_test_...
     STRIPE_SECRET_KEY=sk_test_...
     STRIPE_WEBHOOK_SECRET=whsec_...
     SMTP_USER=your_smtp_username
     SMTP_PASS=your_smtp_password
     SENDER_EMAIL=noreply@yourdomain.com
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

3. **Configure Frontend Settings**
   - Navigate to the client folder:
     ```bash
     cd ../client
     ```
   - Create a `.env` file:
     ```env
     VITE_BACKEND_URL=http://localhost:3000
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
     VITE_CURRENCY='$'
     ```
   - Install dependencies:
     ```bash
     npm install
     ```

---

## 🏃 Running Locally

To run the application locally, you will need to start three distinct processes: the server, the client, and the Inngest Dev Server (for debugging background events).

### 1. Start the API Server
In the `server/` directory:
```bash
npm run server
```
*Runs by default at `http://localhost:3000` using nodemon.*

### 2. Start the Frontend Application
In the `client/` directory:
```bash
npm run dev
```
*Runs by default at `http://localhost:5173` via Vite.*

### 3. Start the Inngest Dev Server
To test background functions locally, spin up the Inngest Dev Server:
```bash
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest
```
*Open `http://localhost:8288` to trigger, inspect, and trace background functions.*

---

## 🔑 Key API Endpoints

### 🎬 Shows (`/api/show`)
- `GET /` - Fetches now playing movies directly from TMDB.
- `POST /add` - Registers a new show, including validation and automatic movie metadata aggregation.
- `GET /all` - Retrieves unique upcoming shows listed.
- `GET /:movieId` - Retrieves schedule dates and times for a specific movie.

### 🎫 Bookings (`/api/booking`)
- `POST /create` - Initiates a ticket booking session, checks seat availability, registers a Mongoose Booking document, and creates a Stripe checkout session.
- `GET /seats/:showId` - Fetches occupied seat configurations for a specific show.

### 🔐 Users (`/api/user`)
- `GET /bookings` - Retrieves current bookings for the logged-in user.
- `POST /favorite` - Adds or removes a movie from the user's favorite wishlist.
- `GET /favorites` - Retrieves detailed metadata for all user favorites.

---

## 🛡️ License

This project is licensed under the ISC License.
