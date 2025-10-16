# Maglo Finance Dashboard

A modern, responsive finance dashboard built with Next.js 14, featuring real-time financial data visualization and user authentication.

## Features

- 🔐 **Authentication**: Sign in/Sign up with form validation
- 📊 **Financial Summary**: Total balance, expenses, and savings overview
- 📈 **Working Capital Chart**: Interactive charts showing income vs expenses
- 💳 **Wallet Cards**: Display and manage payment cards
- 💰 **Recent Transactions**: View and track recent financial activity
- 📅 **Scheduled Transfers**: Monitor upcoming scheduled payments
- 🎨 **Modern UI**: Clean, responsive design with TailwindCSS
- ⚡ **Real-time Data**: React Query for efficient data fetching
- 🔔 **Toast Notifications**: User feedback for all actions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Deployment**: Netlify

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maglo-case
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://0.0.0.0:5737/api
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard pages
│   ├── signin/            # Authentication pages
│   ├── signup/
│   └── layout.tsx         # Root layout
├── components/             # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   └── ui/               # UI components
├── context/              # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Utility functions
└── types/               # TypeScript type definitions
```

## API Integration

The app integrates with the following API endpoints:

- `/financial/summary` - Financial overview data
- `/financial/working-capital` - Working capital chart data
- `/financial/wallet` - Wallet cards information
- `/financial/transactions/recent` - Recent transactions
- `/financial/transfers/scheduled` - Scheduled transfers
- `/users/login` - User authentication
- `/users/register` - User registration

## Deployment

### Netlify

The project is configured for Netlify deployment with `netlify.toml`:

```bash
# Build command
npm run build

# Publish directory
.next
```

### Environment Variables

Set the following environment variables in your deployment platform:

- `NEXT_PUBLIC_API_URL`: Your API base URL

## Features in Detail

### Authentication
- Form validation with Zod schemas
- Loading states and error handling
- Automatic redirects based on auth state
- Secure token management

### Dashboard
- Real-time financial data visualization
- Interactive charts with Recharts
- Responsive grid layouts
- Skeleton loading states
- Error boundaries with user-friendly messages

### Data Management
- React Query for efficient data fetching
- Automatic background refetching
- Optimistic updates
- Error handling and retry logic

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
