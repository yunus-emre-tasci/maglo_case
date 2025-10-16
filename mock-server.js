const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5737;

app.use(cors());
app.use(express.json());

// Mock data based on the API documentation
const mockData = {
    financialSummary: {
        success: true,
        message: "Financial summary retrieved successfully.",
        data: {
            totalBalance: {
                amount: 125750.5,
                currency: "TRY",
                change: {
                    percentage: 12.5,
                    trend: "up"
                }
            },
            totalExpense: {
                amount: 45320.75,
                currency: "TRY",
                change: {
                    percentage: -8.3,
                    trend: "down"
                }
            },
            totalSavings: {
                amount: 80429.75,
                currency: "TRY",
                change: {
                    percentage: 15.2,
                    trend: "up"
                }
            },
            lastUpdated: "2025-01-06T10:30:00.000Z"
        }
    },
    workingCapital: {
        success: true,
        message: "Working capital data retrieved successfully.",
        data: {
            period: "last6Months",
            currency: "TRY",
            data: [{
                    month: "Temmuz",
                    income: 65000,
                    expense: 42000,
                    net: 23000
                },
                {
                    month: "Ağustos",
                    income: 68000,
                    expense: 45000,
                    net: 23000
                },
                {
                    month: "Eylül",
                    income: 72000,
                    expense: 48000,
                    net: 24000
                },
                {
                    month: "Ekim",
                    income: 75000,
                    expense: 50000,
                    net: 25000
                },
                {
                    month: "Kasım",
                    income: 78000,
                    expense: 52000,
                    net: 26000
                },
                {
                    month: "Aralık",
                    income: 80000,
                    expense: 55000,
                    net: 25000
                }
            ],
            summary: {
                totalIncome: 438000,
                totalExpense: 292000,
                netBalance: 146000
            }
        }
    },
    wallet: {
        success: true,
        message: "Wallet cards retrieved successfully.",
        data: {
            cards: [{
                    id: "card_001",
                    name: "Maglo Gold Card",
                    type: "credit",
                    cardNumber: "5495 7381 3759 2321",
                    bank: "Maglo | Universal Bank",
                    network: "Visa",
                    expiryMonth: 12,
                    expiryYear: 2027,
                    color: "#1e40af",
                    isDefault: true
                },
                {
                    id: "card_002",
                    name: "Maglo Silver Card",
                    type: "debit",
                    cardNumber: "4532 1234 5678 9012",
                    bank: "Maglo | Universal Bank",
                    network: "Visa",
                    expiryMonth: 8,
                    expiryYear: 2026,
                    color: "#6b7280",
                    isDefault: false
                }
            ]
        }
    },
    recentTransactions: {
        success: true,
        message: "Recent transactions retrieved successfully.",
        data: {
            transactions: [{
                    id: "trx_001",
                    name: "iPhone 13 Pro MAX",
                    business: "Apple Inc.",
                    amount: -420.84,
                    currency: "TRY",
                    status: "completed"
                },
                {
                    id: "trx_002",
                    name: "Netflix Subscription",
                    business: "Netflix",
                    amount: -100,
                    currency: "TRY",
                    status: "completed"
                },
                {
                    id: "trx_003",
                    name: "Figma Subscription",
                    business: "Figma Inc.",
                    amount: -244.2,
                    currency: "TRY",
                    status: "completed"
                },
                {
                    id: "trx_004",
                    name: "Monthly Salary",
                    business: "Tech Corp Ltd.",
                    amount: 45000,
                    currency: "TRY",
                    status: "completed"
                }
            ],
            summary: {
                totalIncome: 45000,
                totalExpense: 765.04,
                count: 4
            }
        }
    },
    scheduledTransfers: {
        success: true,
        message: "Scheduled transfers retrieved successfully.",
        data: {
            transfers: [{
                    id: "sch_001",
                    name: "Saleh Ahmed",
                    date: "2025-01-15T11:00:00Z",
                    amount: -435,
                    currency: "USD",
                    status: "scheduled"
                },
                {
                    id: "sch_002",
                    name: "Rent Payment",
                    date: "2025-01-20T09:00:00Z",
                    amount: -2500,
                    currency: "TRY",
                    status: "scheduled"
                }
            ],
            summary: {
                totalScheduledAmount: -2935,
                count: 2
            }
        }
    }
};

// Auth endpoints
app.post('/api/users/register', (req, res) => {
    const {
        fullName,
        email,
        password
    } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Full name, email and password are required."
        });
    }

    // Simulate successful registration
    res.json({
        success: true,
        message: "User registered successfully.",
        data: {
            id: "60d0fe4f5311236168a109ca",
            fullName,
            email
        }
    });
});

app.post('/api/users/login', (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required."
        });
    }

    // Simulate successful login
    res.json({
        success: true,
        message: "Login successful.",
        data: {
            user: {
                id: "60d0fe4f5311236168a109ca",
                fullName: "John Doe",
                email: email
            },
            accessToken: "mock-jwt-token-" + Date.now()
        }
    });
});

app.post('/api/users/logout', (req, res) => {
    res.json({
        success: true,
        message: "Logged out successfully."
    });
});

app.get('/api/users/profile', (req, res) => {
    res.json({
        success: true,
        data: {
            id: "60d0fe4f5311236168a109ca",
            fullName: "John Doe",
            email: "user@example.com",
            role: "user",
            isActive: true
        }
    });
});

// Financial endpoints
app.get('/api/financial/summary', (req, res) => {
    res.json(mockData.financialSummary);
});

app.get('/api/financial/working-capital', (req, res) => {
    res.json(mockData.workingCapital);
});

app.get('/api/financial/wallet', (req, res) => {
    res.json(mockData.wallet);
});

app.get('/api/financial/transactions/recent', (req, res) => {
    res.json(mockData.recentTransactions);
});

app.get('/api/financial/transfers/scheduled', (req, res) => {
    res.json(mockData.scheduledTransfers);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mock API server running on http://0.0.0.0:${PORT}`);
    console.log(`Available endpoints:`);
    console.log(`- POST /api/users/register`);
    console.log(`- POST /api/users/login`);
    console.log(`- POST /api/users/logout`);
    console.log(`- GET /api/users/profile`);
    console.log(`- GET /api/financial/summary`);
    console.log(`- GET /api/financial/working-capital`);
    console.log(`- GET /api/financial/wallet`);
    console.log(`- GET /api/financial/transactions/recent`);
    console.log(`- GET /api/financial/transfers/scheduled`);
});
