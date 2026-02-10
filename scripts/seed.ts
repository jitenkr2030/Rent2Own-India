import { db } from '../src/lib/db'
import bcrypt from 'bcryptjs'

async function seed() {
  try {
    console.log('🌱 Starting database seeding...')

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10)

    // Home seeker user
    const homeSeeker = await db.user.create({
      data: {
        email: 'priya.sharma@example.com',
        password: hashedPassword,
        name: 'Priya Sharma',
        mobile: '+919876543210',
        userType: 'HOME_SEEKER',
        profileComplete: true,
        kycStatus: 'VERIFIED',
        homeSeekerProfile: {
          create: {
            dateOfBirth: new Date('1990-05-15'),
            employmentType: 'SALARIED',
            companyName: 'Tech Corp India',
            monthlyIncome: 85000,
            workExperience: 5,
            familySize: 3,
            maritalStatus: 'MARRIED',
            currentCity: 'Bangalore',
            currentAddress: 'Whitefield, Bangalore',
            affordabilityScore: 75,
            maxMonthlyPayment: 35000,
            preferredCities: JSON.stringify(['Bangalore', 'Mumbai']),
            preferredBhk: '2',
            preferredBudget: 7500000
          }
        }
      }
    })

    // Investor user
    const investor = await db.user.create({
      data: {
        email: 'rahul.verma@example.com',
        password: hashedPassword,
        name: 'Rahul Verma',
        mobile: '+919876543211',
        userType: 'INVESTOR',
        profileComplete: true,
        kycStatus: 'VERIFIED',
        investorProfile: {
          create: {
            investorType: 'INDIVIDUAL',
            totalInvestment: 5000000,
            riskProfile: 'MODERATE',
            investmentHorizon: 7,
            expectedReturns: 12
          }
        }
      }
    })

    // Builder user
    const builder = await db.user.create({
      data: {
        email: 'builder@premiumconstructions.com',
        password: hashedPassword,
        name: 'Premium Constructions',
        mobile: '+919876543212',
        userType: 'BUILDER',
        profileComplete: true,
        kycStatus: 'VERIFIED',
        builderProfile: {
          create: {
            companyName: 'Premium Constructions Pvt Ltd',
            companyType: 'DEVELOPER',
            reraRegistration: 'RERA/2021/001',
            establishedYear: 2010,
            totalProjects: 25,
            completedProjects: 20,
            website: 'www.premiumconstructions.com',
            headquarters: 'Bangalore',
            contactPerson: 'Amit Kumar',
            contactEmail: 'amit@premiumconstructions.com',
            contactMobile: '+919876543213'
          }
        }
      }
    })

    console.log('✅ Users created')

    // Create sample properties
    const builderId = builder.id
    
    const properties = [
      {
        builderId,
        title: 'Premium 2BHK Apartment in Whitefield',
        description: 'Modern 2BHK apartment with premium amenities in the heart of Whitefield',
        propertyType: 'APARTMENT',
        bhk: 2,
        bathrooms: 2,
        balconies: 2,
        carpetArea: 1050,
        builtUpArea: 1250,
        superBuiltUpArea: 1450,
        totalPrice: 7500000,
        rent2OwnPrice: 7200000,
        monthlyPayment: 35000,
        tenure: 12,
        appreciationCap: 8.5,
        address: 'Premium Residency, Whitefield Main Road',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560066',
        locality: 'Whitefield',
        latitude: 12.9698,
        longitude: 77.7499,
        possessionDate: new Date('2024-06-01'),
        reraApproved: true,
        reraNumber: 'RERA/2023/045',
        legalClear: true,
        status: 'AVAILABLE',
        amenities: JSON.stringify([
          'Swimming Pool',
          'Gym',
          'Club House',
          'Children Play Area',
          '24/7 Security',
          'Power Backup',
          'Rain Water Harvesting',
          'Landscaped Gardens'
        ]),
        images: JSON.stringify([
          '/images/property1-living.jpg',
          '/images/property1-bedroom.jpg',
          '/images/property1-kitchen.jpg'
        ])
      },
      {
        builderId,
        title: 'Spacious 3BHK in Koramangala',
        description: 'Luxurious 3BHK apartment in prime location of Koramangala',
        propertyType: 'APARTMENT',
        bhk: 3,
        bathrooms: 3,
        balconies: 3,
        carpetArea: 1650,
        builtUpArea: 1950,
        superBuiltUpArea: 2200,
        totalPrice: 12000000,
        rent2OwnPrice: 11500000,
        monthlyPayment: 55000,
        tenure: 15,
        appreciationCap: 10,
        address: 'Luxury Heights, Koramangala 6th Block',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560095',
        locality: 'Koramangala',
        latitude: 12.9279,
        longitude: 77.6271,
        possessionDate: new Date('2024-08-01'),
        reraApproved: true,
        reraNumber: 'RERA/2023/046',
        legalClear: true,
        status: 'AVAILABLE',
        amenities: JSON.stringify([
          'Swimming Pool',
          'Gym',
          'Club House',
          'Tennis Court',
          '24/7 Security',
          'Power Backup',
          'Sauna',
          'Jogging Track'
        ]),
        images: JSON.stringify([
          '/images/property2-living.jpg',
          '/images/property2-master-bedroom.jpg',
          '/images/property2-view.jpg'
        ])
      },
      {
        builderId,
        title: 'Modern 1BHK in HSR Layout',
        description: 'Compact and modern 1BHK perfect for young professionals',
        propertyType: 'APARTMENT',
        bhk: 1,
        bathrooms: 1,
        balconies: 1,
        carpetArea: 650,
        builtUpArea: 750,
        superBuiltUpArea: 850,
        totalPrice: 4500000,
        rent2OwnPrice: 4300000,
        monthlyPayment: 22000,
        tenure: 10,
        appreciationCap: 7.5,
        address: 'Urban Homes, HSR Layout 2nd Sector',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560102',
        locality: 'HSR Layout',
        latitude: 12.9145,
        longitude: 77.6374,
        possessionDate: new Date('2024-05-01'),
        reraApproved: true,
        reraNumber: 'RERA/2023/047',
        legalClear: true,
        status: 'AVAILABLE',
        amenities: JSON.stringify([
          'Gym',
          'Club House',
          '24/7 Security',
          'Power Backup',
          'Landscaped Gardens',
          'Car Parking'
        ]),
        images: JSON.stringify([
          '/images/property3-studio.jpg',
          '/images/property3-kitchen.jpg',
          '/images/property3-bathroom.jpg'
        ])
      }
    ]

    const createdProperties = []
    for (const propertyData of properties) {
      const property = await db.property.create({ data: propertyData })
      createdProperties.push(property)
    }

    console.log('✅ Properties created')

    // Create sample property application
    await db.propertyApplication.create({
      data: {
        userId: homeSeeker.id,
        propertyId: createdProperties[0].id,
        status: 'APPROVED',
        appliedAt: new Date(),
        reviewedAt: new Date(),
        approvalTerms: JSON.stringify({
          monthlyPayment: 35000,
          tenure: 12,
          downPayment: 300000,
          processingFee: 144000
        })
      }
    })

    console.log('✅ Property application created')

    // Create sample payments
    const payments = []
    const currentDate = new Date()
    
    for (let i = 0; i < 6; i++) {
      const paymentDate = new Date(currentDate)
      paymentDate.setMonth(currentDate.getMonth() - (5 - i))
      
      payments.push({
        userId: homeSeeker.id,
        propertyId: createdProperties[0].id,
        amount: 35000,
        paymentType: 'RENT',
        paymentMethod: 'UPI',
        transactionId: `TXN${Date.now()}${i}`,
        status: 'COMPLETED',
        dueDate: paymentDate,
        paidAt: paymentDate,
        equityComponent: 24500, // 70% goes to equity
        rentComponent: 10500   // 30% is rent
      })
    }

    for (const paymentData of payments) {
      await db.payment.create({ data: paymentData })
    }

    console.log('✅ Payments created')

    // Create equity accumulation record
    await db.equityAccumulation.create({
      data: {
        userId: homeSeeker.id,
        propertyId: createdProperties[0].id,
        totalEquity: 147000, // 6 months * 24500
        monthlyEquity: 24500,
        ownershipPercentage: 2.04, // 147000 / 7200000 * 100
        remainingBalance: 7053000 // 7200000 - 147000
      }
    })

    console.log('✅ Equity accumulation created')

    console.log('🎉 Database seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

seed()