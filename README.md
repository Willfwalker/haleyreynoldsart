# Haley Reynolds Art - E-commerce Website

A complete e-commerce website for artist Haley Reynolds, featuring a rustic aesthetic with browns and golds. Built with Next.js 15, React 19, and TypeScript.

## Features

### 🎨 **Core Functionality**
- **Product Catalog**: Browse stickers, bookmarks, and paintings by category
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Firebase-powered login/register system
- **Secure Checkout**: Stripe integration for payment processing
- **Custom Commissions**: Request form and management system
- **Admin Dashboard**: Product and order management (coming soon)

### 🎯 **Design & UX**
- **Rustic Aesthetic**: Warm color palette with browns, golds, and earth tones
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Professional Layout**: Clean, artistic design showcasing artwork effectively
- **Intuitive Navigation**: Easy-to-use interface with smooth interactions

### 🛠 **Technical Stack**
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **Payments**: Stripe for secure payment processing
- **Email**: Nodemailer for order confirmations and inquiries
- **State Management**: Zustand for cart and UI state
- **Deployment**: Configured for Vercel deployment

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase project
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rustic_vibe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**

   Copy `.env.local` and update with your credentials:
   ```bash
   cp .env.local .env.local.example
   ```

   Update the following variables:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # Admin Configuration
   ADMIN_EMAIL=admin@haleyreynolds.com
   ```

4. **Firebase Setup**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Enable Storage
   - Add your domain to authorized domains

5. **Stripe Setup**
   - Create a Stripe account at [stripe.com](https://stripe.com)
   - Get your publishable and secret keys
   - Set up webhooks for order processing

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── cart/              # Shopping cart page
│   ├── checkout/          # Checkout process
│   ├── commissions/       # Commission request page
│   ├── contact/           # Contact page
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── shop/              # Product catalog
│   └── order-success/     # Order confirmation
├── components/            # Reusable components
│   ├── cart/              # Cart-related components
│   ├── layout/            # Layout components (Header, Footer)
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries (Firebase, Stripe)
├── store/                 # Zustand state management
└── types/                 # TypeScript type definitions
```

## Key Pages

- **Homepage** (`/`): Hero section, featured products, categories
- **Shop** (`/shop`): Product catalog with filtering and search
- **Product Details** (`/shop/[category]/[id]`): Individual product pages
- **Cart** (`/cart`): Shopping cart management
- **Checkout** (`/checkout`): Secure payment process
- **Commissions** (`/commissions`): Custom artwork requests
- **About** (`/about`): Artist biography and story
- **Contact** (`/contact`): Contact form and information

## Customization

### Colors
The green color palette is defined in `src/app/globals.css`:
- Primary: Light green (`oklch(0.85 0.08 145)`) - #A8dcab
- Secondary: Medium green (`oklch(0.72 0.06 140)`) - #8cb88e
- Background: Warm cream (`oklch(0.97 0.02 85)`)
- Accent: Soft green (`oklch(0.80 0.06 142)`)

### Adding Products
Products are currently stored as mock data in `/shop/page.tsx`. In production, these would be managed through:
1. Firebase Firestore collections
2. Admin dashboard (to be implemented)
3. Image uploads to Firebase Storage

### Email Templates
Email functionality uses Nodemailer. Templates can be customized in the email service files.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform:
- Firebase configuration
- Stripe keys (use live keys for production)
- Email credentials
- Admin settings

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support:
- Email: hello@haleyreynolds.com
- Create an issue in this repository

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
