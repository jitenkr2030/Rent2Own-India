import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  mobile: z.string().optional(),
  userType: z.enum(['HOME_SEEKER', 'INVESTOR', 'BUILDER']).default('HOME_SEEKER')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { email: validatedData.email },
          ...(validatedData.mobile ? [{ mobile: validatedData.mobile }] : [])
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email or mobile already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        mobile: validatedData.mobile,
        userType: validatedData.userType
      },
      select: {
        id: true,
        email: true,
        name: true,
        mobile: true,
        userType: true,
        profileComplete: true,
        kycStatus: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      message: 'User registered successfully',
      user
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}