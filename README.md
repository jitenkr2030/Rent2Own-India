# 🏠 Rent2Own India

Transform rent into ownership — transparently, gradually, and safely.

## 📋 Overview

Rent2Own India is a comprehensive platform that revolutionizes the Indian housing market by enabling home seekers to convert their monthly rent payments into equity ownership. Our platform bridges the gap between renting and owning, making homeownership accessible to millions of Indians.

## ✨ Key Features

### 🏠 For Home Seekers
- **Smart Onboarding**: Mobile/email signup with Aadhaar/PAN based KYC
- **AI-Powered Affordability Engine**: Personalized scoring and monthly payment simulation
- **Property Discovery**: Verified Rent2Own-eligible homes with advanced filtering
- **Equity Dashboard**: Track your ownership journey with real-time progress
- **Seamless Payments**: Single monthly payment with auto-debit (UPI/NACH)
- **Digital Agreements**: Paperless onboarding with eSign capabilities

### 💰 For Investors
- **Portfolio Dashboard**: Complete overview of investments and returns
- **Risk Analytics**: AI-driven default prediction and asset health scoring
- **Liquidity Options**: Secondary market trading and flexible exit strategies
- **Performance Tracking**: IRR analytics and yield monitoring

### 🏗️ For Builders
- **Property Management**: Streamlined inventory onboarding and pricing control
- **Buyer Management**: Application tracking and occupancy monitoring
- **Compliance Tools**: RERA-aligned reporting and standardized agreements
- **Marketing Solutions**: Reduced customer acquisition costs

### 🛠️ For Administrators
- **Control Panel**: End-to-end operational oversight
- **Compliance Engine**: Automated legal and regulatory compliance
- **Analytics Dashboard**: Platform-wide insights and reporting

## 🚀 Technology Stack

### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Icons**: Lucide React
- **State Management**: Zustand + TanStack Query

### Backend
- **API**: Next.js API Routes
- **Database**: SQLite with Prisma ORM
- **Authentication**: Secure session-based auth with bcrypt
- **Validation**: Zod schemas
- **File Upload**: Ready for integration

### Development Tools
- **Package Manager**: Bun
- **Linting**: ESLint with Next.js rules
- **Type Checking**: TypeScript strict mode

## 📁 Project Structure

```
rent2own-india/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API endpoints
│   │   │   ├── auth/          # Authentication routes
│   │   │   ├── properties/    # Property management
│   │   │   └── calculator/    # Affordability calculator
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── db.ts              # Prisma client
│   │   └── utils.ts           # Utility functions
│   └── hooks/                 # Custom React hooks
├── prisma/
│   └── schema.prisma          # Database schema
├── scripts/
│   └── seed.ts                # Database seeding
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🗄️ Database Schema

Our comprehensive database includes:

### Core Models
- **Users**: Multi-type user system (Home Seeker, Investor, Builder, Admin)
- **Properties**: Detailed property listings with specifications
- **Payments**: Transaction tracking with equity/rent split
- **Applications**: Property application and approval workflow
- **Documents**: KYC and property documentation

### Specialized Models
- **EquityAccumulation**: Track ownership progress
- **PropertyInvestment**: Investor funding and returns
- **UserSessions**: Secure session management
- **HomeSeekerProfile**: Detailed buyer profiling
- **InvestorProfile**: Investment preferences and history
- **BuilderProfile**: Builder verification and track record

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ or Bun
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitenkr2030/Rent2Own-India.git
   cd Rent2Own-India
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Initialize database**
   ```bash
   bun run db:push
   ```

5. **Seed sample data**
   ```bash
   bunx tsx scripts/seed.ts
   ```

6. **Start development server**
   ```bash
   bun run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 Sample Data

The platform comes pre-seeded with:

- **3 User Types**: Home seekers, investors, and builders
- **Sample Properties**: Properties across Bangalore with different configurations
- **Payment History**: 6 months of payment data with equity accumulation
- **Applications**: Sample property applications and approvals

### Test Accounts
- **Home Seeker**: `priya.sharma@example.com` / `password123`
- **Investor**: `rahul.verma@example.com` / `password123`
- **Builder**: `builder@premiumconstructions.com` / `password123`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Properties
- `GET /api/properties` - List properties with filtering
- `POST /api/properties` - Create new property (builder)

### Calculator
- `POST /api/calculator/affordability` - Calculate affordability score

## 🎯 Core Features Deep Dive

### Affordability Engine
Our AI-powered affordability calculator evaluates:
- **Income Analysis**: Monthly income vs expenses ratio
- **Credit Assessment**: Credit score impact on eligibility
- **FOIR Compliance**: Fixed Obligation to Income Ratio (50% standard)
- **Down Payment**: Capability assessment and recommendations
- **Loan Eligibility**: Maximum loan amount and EMI calculations

### Equity Accumulation
- **Transparent Tracking**: Real-time equity buildup visualization
- **Ownership Percentage**: Clear path to 100% ownership
- **Payment Breakdown**: Rent vs equity component analysis
- **Early Buyout Options**: Flexible ownership acceleration

### Property Discovery
- **Smart Filters**: City, budget, BHK, tenure, property type
- **Verified Listings**: RERA-approved and legally clear properties
- **Virtual Tours**: Immersive property exploration
- **Builder Ratings**: Trust and transparency metrics

## 🔒 Security Features

- **Secure Authentication**: bcrypt password hashing
- **Session Management**: Secure token-based sessions
- **Input Validation**: Comprehensive Zod schema validation
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **XSS Protection**: Built-in Next.js security headers

## 📱 Responsive Design

- **Mobile-First**: Optimized for all device sizes
- **Progressive Enhancement**: Core functionality on all devices
- **Touch-Friendly**: 44px minimum touch targets
- **Accessible**: WCAG 2.1 compliance with semantic HTML

## 🧪 Testing

### Linting
```bash
bun run lint
```

### Database Operations
```bash
bun run db:push      # Push schema changes
bun run db:generate   # Generate Prisma client
bun run db:reset      # Reset database (development only)
```

## 🚀 Deployment

### Production Build
```bash
bun run build
```

### Environment Variables
```env
DATABASE_URL="file:./db/custom.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Prisma Team**: For the excellent ORM
- **shadcn/ui**: For the beautiful component library
- **Tailwind CSS**: For the utility-first CSS framework

## 📞 Contact

- **Website**: [Rent2Own India](https://rent2own.in)
- **Email**: support@rent2own.in
- **Phone**: +91 80XXXXXX90
- **Address**: Bangalore, India

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Core platform functionality
- ✅ User authentication and profiles
- ✅ Property discovery and listings
- ✅ Affordability calculator
- ✅ Basic payment tracking

### Phase 2 (Upcoming)
- 🔄 Payment gateway integration
- 🔄 Document upload and verification
- 🔄 Advanced analytics dashboards
- 🔄 Mobile applications
- 🔄 AI recommendation engine

### Phase 3 (Future)
- 📋 Tokenized equity (fractional ownership)
- 📋 Employer-assisted Rent2Own programs
- 📋 Credit score building integration
- 📋 Government housing scheme integration
- 📋 Blockchain-based title transfers

---

🏠 **Rent2Own India** - Making homeownership a reality, one monthly payment at a time!

*"Transform your rent from an expense into an investment in your future."*