import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const processPaymentSchema = z.object({
  paymentId: z.string(),
  status: z.enum(['COMPLETED', 'FAILED', 'REFUNDED']),
  transactionId: z.string().optional(),
  failureReason: z.string().optional(),
  paidAt: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentId, status, transactionId, failureReason, paidAt } = processPaymentSchema.parse(body)

    // Get the payment
    const payment = await db.payment.findUnique({
      where: { id: paymentId },
      include: {
        user: true,
        property: true
      }
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    // Update payment status
    const updatedPayment = await db.payment.update({
      where: { id: paymentId },
      data: {
        status,
        transactionId: transactionId || payment.transactionId,
        paidAt: paidAt ? new Date(paidAt) : (status === 'COMPLETED' ? new Date() : null)
      }
    })

    // If payment is completed, update equity accumulation
    if (status === 'COMPLETED' && payment.equityComponent > 0 && payment.propertyId) {
      const existingEquity = await db.equityAccumulation.findUnique({
        where: {
          userId_propertyId: {
            userId: payment.userId,
            propertyId: payment.propertyId
          }
        }
      })

      if (existingEquity) {
        await db.equityAccumulation.update({
          where: {
            userId_propertyId: {
              userId: payment.userId,
              propertyId: payment.propertyId
            }
          },
          data: {
            totalEquity: existingEquity.totalEquity + payment.equityComponent,
            remainingBalance: existingEquity.remainingBalance - payment.equityComponent,
            lastUpdated: new Date()
          }
        })

        // Recalculate ownership percentage
        const updatedEquity = await db.equityAccumulation.findUnique({
          where: {
            userId_propertyId: {
              userId: payment.userId,
              propertyId: payment.propertyId
            }
          }
        })

        if (updatedEquity && payment.property) {
          const ownershipPercentage = (updatedEquity.totalEquity / payment.property.rent2OwnPrice) * 100
          await db.equityAccumulation.update({
            where: {
              userId_propertyId: {
                userId: payment.userId,
                propertyId: payment.propertyId
              }
            },
            data: {
              ownershipPercentage
            }
          })
        }
      }
    }

    // Send notification (in real app, this would send email/SMS)
    console.log(`Payment ${status}: ${paymentId} for user ${payment.userId}`)

    return NextResponse.json({
      message: `Payment ${status.toLowerCase()} successfully`,
      payment: updatedPayment
    })
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}