import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const propertyQuerySchema = z.object({
  city: z.string().optional(),
  minBudget: z.string().optional(),
  maxBudget: z.string().optional(),
  bhk: z.string().optional(),
  propertyType: z.string().optional(),
  page: z.string().default('1'),
  limit: z.string().default('10')
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = propertyQuerySchema.parse(Object.fromEntries(searchParams))
    
    const page = parseInt(query.page)
    const limit = parseInt(query.limit)
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      status: 'AVAILABLE'
    }

    if (query.city) {
      where.city = {
        contains: query.city,
        mode: 'insensitive'
      }
    }

    if (query.minBudget || query.maxBudget) {
      where.rent2OwnPrice = {}
      if (query.minBudget) {
        where.rent2OwnPrice.gte = parseFloat(query.minBudget)
      }
      if (query.maxBudget) {
        where.rent2OwnPrice.lte = parseFloat(query.maxBudget)
      }
    }

    if (query.bhk) {
      where.bhk = parseInt(query.bhk)
    }

    if (query.propertyType) {
      where.propertyType = query.propertyType
    }

    // Get properties
    const [properties, total] = await Promise.all([
      db.property.findMany({
        where,
        include: {
          builder: {
            select: {
              companyName: true,
              reraRegistration: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      db.property.count({ where })
    ])

    return NextResponse.json({
      properties,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Properties fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // For now, we'll create a sample property
    // In production, this would need proper authentication and validation
    const property = await db.property.create({
      data: {
        builderId: body.builderId,
        title: body.title,
        description: body.description,
        propertyType: body.propertyType || 'APARTMENT',
        bhk: body.bhk,
        bathrooms: body.bathrooms,
        carpetArea: body.carpetArea,
        totalPrice: body.totalPrice,
        rent2OwnPrice: body.rent2OwnPrice,
        monthlyPayment: body.monthlyPayment,
        tenure: body.tenure,
        address: body.address,
        city: body.city,
        state: body.state,
        pincode: body.pincode,
        locality: body.locality,
        amenities: JSON.stringify(body.amenities || []),
        images: JSON.stringify(body.images || [])
      },
      include: {
        builder: {
          select: {
            companyName: true,
            reraRegistration: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Property created successfully',
      property
    })
  } catch (error) {
    console.error('Property creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}