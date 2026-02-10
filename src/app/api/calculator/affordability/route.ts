import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const affordabilitySchema = z.object({
  monthlyIncome: z.number().min(0),
  monthlyExpenses: z.number().min(0),
  existingEMIs: z.number().min(0),
  creditScore: z.number().min(300).max(900).optional(),
  downPayment: z.number().min(0),
  loanTenure: z.number().min(1).max(30),
  interestRate: z.number().min(0).max(20).optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = affordabilitySchema.parse(body)

    // Constants for affordability calculation
    const FOIR_RATIO = 0.5 // Fixed Obligation to Income Ratio (50%)
    const INTEREST_RATE = data.interestRate || 8.5 // Default 8.5%
    const PROCESSING_FEE_RATE = 0.02 // 2% processing fee
    const MIN_CREDIT_SCORE = 650

    // Calculate monthly disposable income
    const monthlyDisposableIncome = data.monthlyIncome - data.monthlyExpenses - data.existingEMIs
    const maxEMI = data.monthlyIncome * FOIR_RATIO

    // Determine eligible EMI (minimum of max EMI and disposable income)
    const eligibleEMI = Math.min(maxEMI, monthlyDisposableIncome)

    // Calculate loan amount using EMI formula
    // EMI = P * r * (1 + r)^n / ((1 + r)^n - 1)
    // where P = loan amount, r = monthly interest rate, n = tenure in months
    const monthlyRate = INTEREST_RATE / 12 / 100
    const tenureMonths = data.loanTenure * 12
    
    let maxLoanAmount = 0
    if (monthlyRate > 0) {
      const rPowerN = Math.pow(1 + monthlyRate, tenureMonths)
      maxLoanAmount = (eligibleEMI * (rPowerN - 1)) / (monthlyRate * rPowerN)
    }

    // Calculate affordability score (0-100)
    let affordabilityScore = 0
    const incomeToEMIRatio = eligibleEMI / data.monthlyIncome
    
    if (data.creditScore && data.creditScore >= MIN_CREDIT_SCORE) {
      affordabilityScore += 30
    } else if (!data.creditScore) {
      affordabilityScore += 15 // Neutral if no credit score provided
    }

    // Income stability (higher income = better score)
    if (data.monthlyIncome >= 100000) {
      affordabilityScore += 25
    } else if (data.monthlyIncome >= 50000) {
      affordabilityScore += 20
    } else if (data.monthlyIncome >= 30000) {
      affordabilityScore += 15
    } else {
      affordabilityScore += 10
    }

    // FOIR compliance
    if (incomeToEMIRatio <= 0.3) {
      affordabilityScore += 25
    } else if (incomeToEMIRatio <= 0.4) {
      affordabilityScore += 20
    } else if (incomeToEMIRatio <= 0.5) {
      affordabilityScore += 15
    } else {
      affordabilityScore += 5
    }

    // Down payment capability
    const downPaymentRatio = data.downPayment / (maxLoanAmount + data.downPayment)
    if (downPaymentRatio >= 0.2) {
      affordabilityScore += 20
    } else if (downPaymentRatio >= 0.15) {
      affordabilityScore += 15
    } else if (downPaymentRatio >= 0.1) {
      affordabilityScore += 10
    } else {
      affordabilityScore += 5
    }

    // Determine affordability category
    let category = 'LOW'
    let recommendation = ''
    
    if (affordabilityScore >= 80) {
      category = 'EXCELLENT'
      recommendation = 'You are eligible for premium properties with best interest rates.'
    } else if (affordabilityScore >= 60) {
      category = 'GOOD'
      recommendation = 'You have good affordability and can explore a wide range of properties.'
    } else if (affordabilityScore >= 40) {
      category = 'MODERATE'
      recommendation = 'Consider properties within your budget or increase your down payment.'
    } else {
      category = 'LOW'
      recommendation = 'Focus on increasing income or reducing expenses to improve affordability.'
    }

    // Calculate maximum property price
    const maxPropertyPrice = maxLoanAmount + data.downPayment
    const processingFee = maxLoanAmount * PROCESSING_FEE_RATE

    // Generate monthly payment schedule for Rent2Own
    const rentComponent = maxPropertyPrice * 0.003 // 0.3% of property value as rent
    const equityComponent = eligibleEMI - rentComponent

    return NextResponse.json({
      affordabilityScore: Math.round(affordabilityScore),
      category,
      recommendation,
      financials: {
        monthlyIncome: data.monthlyIncome,
        monthlyExpenses: data.monthlyExpenses,
        existingEMIs: data.existingEMIs,
        disposableIncome: monthlyDisposableIncome,
        eligibleEMI: Math.round(eligibleEMI),
        maxLoanAmount: Math.round(maxLoanAmount),
        maxPropertyPrice: Math.round(maxPropertyPrice),
        downPayment: data.downPayment,
        processingFee: Math.round(processingFee),
        interestRate: INTEREST_RATE
      },
      rent2OwnBreakdown: {
        totalMonthlyPayment: Math.round(eligibleEMI),
        rentComponent: Math.round(rentComponent),
        equityComponent: Math.round(equityComponent),
        equityPercentage: Math.round((equityComponent / eligibleEMI) * 100)
      },
      suggestedProperties: {
        minBudget: Math.round(maxPropertyPrice * 0.7),
        maxBudget: Math.round(maxPropertyPrice),
        preferredCities: ['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad']
      }
    })
  } catch (error) {
    console.error('Affordability calculation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}