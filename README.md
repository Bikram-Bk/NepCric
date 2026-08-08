# 🏏 NepCric — Premium Cricket Store

A modern, fully client-side cricket e-commerce storefront built for Nepal's cricket community. Browse, filter, and purchase premium cricket gear from top international brands — all within a fast, responsive, and beautifully designed interface.

## Features

- 🛒 Full shopping cart with quantity controls and order summary
- ❤️ Wishlist for saving favourite products
- 🔐 Mock authentication system (login, register, forgot password)
- 📦 Order placement, order history, and detailed order tracking
- 👤 User profile management
- 🔍 Product filtering by category, brand, price range, and rating
- 💳 Multi-step checkout flow with NPR pricing, VAT (13%), and shipping logic
- 🎠 Image carousels, flash sale banners, testimonials, and journal sections on the homepage
- 📱 Fully responsive layout with mobile-friendly navigation
- 🔔 Toast notifications for cart, wishlist, and auth actions
- 💾 Persistent state via `localStorage` (cart, wishlist, orders, session)

## Get Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Demo Credentials

The app uses a mock authentication system with the following built-in accounts:

| Role  | Email               | Password    |
|-------|---------------------|-------------|
| User  | john@example.com    | password123 |
| Admin | admin@example.com   | admin123    |

> You can also register a new account directly from the Register page.

## Project Structure

```text
cricketpro-store/
├── public/
│   └── images/              # Product images (bats, balls, gear, etc.)
├── src/
│   ├── components/
│   │   ├── cart/            # CartItem, CartSummary, EmptyCart
│   │   ├── checkout/        # Checkout step components
│   │   ├── common/          # ProtectedRoute, ScrollToTop
│   │   ├── home/            # Hero, FlashSale, CategoryGrid, Testimonials, etc.
│   │   ├── layout/          # Navbar, Footer
│   │   ├── orders/          # Order list and detail components
│   │   ├── product/         # ProductCard, ProductReviews, ReviewForm, RatingStars
│   │   ├── profile/         # Profile form components
│   │   ├── ui/              # Base UI primitives (Button, Card, Dialog, Sheet, etc.)
│   │   └── wishlist/        # Wishlist item components
│   ├── context/
│   │   ├── AuthContext.jsx  # Auth context definition
│   │   ├── AuthProvider.jsx # Auth state management
│   │   ├── CartContext.jsx  # Cart context definition
│   │   ├── CartProvider.jsx # Cart state + localStorage sync
│   │   ├── WishlistContext.jsx
│   │   └── WishlistProvider.jsx
│   ├── data/
│   │   ├── brands.js        # Brand list (Kookaburra, SG, SS, Gray-Nicolls, etc.)
│   │   ├── categories.js    # Product categories (Bats, Balls, Gear, Footwear, etc.)
│   │   └── products.js      # Static product catalog (25 products)
│   ├── layouts/
│   │   ├── MainLayout.jsx   # Primary layout with Navbar + Footer
│   │   └── AuthLayout.jsx   # Minimal layout for auth pages
│   ├── lib/
│   │   └── utils.js         # Tailwind class merging utility (cn)
│   ├── pages/
│   │   ├── public/
│   │   │   ├── Home/        # Landing page with all homepage sections
│   │   │   ├── Shop/        # Product listing with filters + pagination
│   │   │   ├── Product/     # Product detail page with specs + reviews
│   │   │   ├── Auth/        # Login, Register, ForgotPassword, ResetSuccess
│   │   │   ├── About/       # About page
│   │   │   ├── Contact/     # Contact form page
│   │   │   ├── FAQ/         # Frequently asked questions
│   │   │   ├── Help/        # Help & support
│   │   │   ├── Privacy/     # Privacy policy
│   │   │   ├── Shipping/    # Shipping information
│   │   │   ├── Terms/       # Terms & conditions
│   │   │   └── NotFound/    # 404 page
│   │   └── protected/       # Requires authentication
│   │       ├── Cart/        # Shopping cart
│   │       ├── Wishlist/    # Saved items
│   │       ├── Checkout/    # Checkout + OrderSuccess
│   │       ├── Orders/      # Order history + Order detail
│   │       └── Profile/     # User profile editor
│   ├── routes/
│   │   └── index.jsx        # React Router DOM v7 route definitions
│   ├── services/
│   │   ├── authService.js   # Mock login, register, logout, profile update
│   │   ├── cartService.js   # Cart CRUD via localStorage
│   │   ├── orderService.js  # Order placement and retrieval
│   │   ├── profileService.js# Profile read and update
│   │   ├── reviewService.js # Product review submission and fetching
│   │   └── wishlistService.js # Wishlist CRUD via localStorage
│   ├── utils/
│   │   ├── constants.js     # App-wide constants (APP_NAME, currency, tax, shipping)
│   │   ├── formatters.js    # Price, date, and string formatting helpers
│   │   ├── storage.js       # Typed localStorage wrapper
│   │   └── validators.js    # Form validation helpers
│   ├── App.jsx              # Root component with provider tree
│   ├── main.jsx             # React DOM entry point
│   └── index.css            # Global styles + Tailwind base
├── index.html
├── vite.config.js
├── components.json          # shadcn/ui configuration
└── package.json
```

## Technology Stack

| Technology             | Version  | Purpose                              |
|------------------------|----------|--------------------------------------|
| React                  | 19.2.8   | UI library                           |
| Vite                   | 8.2.0    | Build tool and dev server            |
| React Router DOM       | 7.18.2   | Client-side routing                  |
| Tailwind CSS           | 4.3.3    | Utility-first CSS framework          |
| shadcn/ui              | 4.16.1   | Accessible component primitives      |
| @base-ui/react         | 1.7.0    | Headless UI components               |
| Embla Carousel         | 8.6.0    | Touch-friendly carousel              |
| Lucide React           | 1.28.0   | Icon library                         |
| React Icons            | 5.7.0    | Extended icon set                    |
| React Hot Toast        | 2.6.0    | Toast notifications                  |
| Geist Variable Font    | 5.3.0    | Typography                           |
| clsx + tailwind-merge  | latest   | Conditional class merging            |

## Routing Overview

### Public Routes

| Path                | Page               |
|---------------------|--------------------|
| `/`                 | Home               |
| `/shop`             | Shop               |
| `/product/:id`      | Product Detail     |
| `/about`            | About              |
| `/contact`          | Contact            |
| `/faq`              | FAQ                |
| `/help`             | Help               |
| `/privacy`          | Privacy Policy     |
| `/shipping`         | Shipping Info      |
| `/terms`            | Terms & Conditions |
| `/login`            | Login              |
| `/register`         | Register           |
| `/forgot-password`  | Forgot Password    |
| `/reset-success`    | Reset Success      |
| `*`                 | 404 Not Found      |

### Protected Routes (login required)

| Path                | Page             |
|---------------------|------------------|
| `/cart`             | Shopping Cart    |
| `/wishlist`         | Wishlist         |
| `/profile`          | User Profile     |
| `/checkout`         | Checkout         |
| `/checkout/success` | Order Success    |
| `/orders`           | Order History    |
| `/orders/:id`       | Order Details    |

## Business Logic

- **Currency**: Nepalese Rupee (NPR / रू)
- **VAT**: 13% applied at checkout
- **Shipping**: रू999 flat rate — free on orders over रू25,000
- **Product Catalog**: 25 products across 5 categories from 5 brands
- **Categories**: Bats · Balls · Protective Gear · Footwear · Accessories
- **Brands**: Kookaburra · Gray-Nicolls · SS · SG · New Balance

## Environment Variables

No environment variables are required. All data is mocked client-side and persisted in `localStorage`.

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and submit a pull request with a clear description of your changes.

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
```

## License & Contact

- **License**: Not yet specified. Add a `LICENSE` file before publishing or distributing.
- **Contact**: Open an issue for questions, bug reports, or feature requests.
