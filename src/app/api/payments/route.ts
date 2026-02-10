import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const paymentSchema = z.object({
  userId: z.string(),
  propertyId: z.string(),
  amount: z.number().positive(),
  paymentType: z.enum(['RENT', 'EQUITY', 'MAINTENANCE', 'DEPOSIT', 'PROCESSING_FEE']),
  paymentMethod: z.enum(['UPI', 'NACH', 'CARD', 'CASH', 'CHEQUE']),
  transactionId: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const propertyId = searchParams.get('propertyId')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (userId) where.userId = userId
    if (propertyId) where.propertyId = propertyId
    if (status) where.status = status

    const [payments, total] = await Promise.all([
      db.payment.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          property: {
            select: {
              id: true,
              title: true,
              address: true
            }
          }
        },
        orderBy: {
          dueDate: 'desc'
        },
        skip,
        take: limit
      }),
      db.payment.count({ where })
    ])

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Payments fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = paymentSchema.parse(body)

    // Calculate equity and rent components (70% equity, 30% rent for Rent2Own)
    let equityComponent = 0
    let rentComponent = 0

    if (validatedData.paymentType === 'RENT') {
      equityComponent = validatedData.amount * 0.7
      rentComponent = validatedData.amount * 0.3
    } else if (validatedData.paymentType === 'EQUITY') {
      equityComponent = validatedData.amount
    }

    // Create payment record
    const payment = await db.payment.create({
      data: {
        userId: validatedData.userId,
        propertyId: validatedData.propertyId,
        amount: validatedData.amount,
        paymentType: validatedData.paymentType,
        paymentMethod: validatedData.paymentMethod,
        transactionId: validatedData.transactionId,
        status: 'PENDING',
        dueDate: new Date(),
        equityComponent,
        rentComponent
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        property: {
          select: {
            id: true,
            title: true,
            address: true
          }
        }
      }
    })

    // Update equity accumulation if this is an equity-building payment
    if (equityComponent > 0 && validatedData.propertyId) {
      const existingEquity = await db.equityAccumulation.findUnique({
        where: {
          userId_propertyId: {
            userId: validatedData.userId,
            propertyId: validatedData.propertyId
          }
        }
      })

      if (existingEquity) {
        await db.equityAccumulation.update({
          where: {
            userId_propertyId: {
              userId: validatedData.userId,
              propertyId: validatedData.propertyId
            }
          },
          data: {
            totalEquity: existingEquity.totalEquity + equityComponent,
            ownershipPercentage: ((existingEquity.totalEquity + equityComponent) / existingEquity.remainingBalance) * 100,
            remainingBalance: existingEquity.remainingBalance - equityComponent,
            lastUpdated: new Date()
          }
        })
      }
    }

    return NextResponse.json({
      message: 'Payment created successfully',
      payment
    })
  } catch (error) {
    console.error('Payment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}