'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  HomeIcon, 
  Users, 
  Building, 
  TrendingUp, 
  Shield, 
  Calculator,
  FileText,
  CreditCard,
  BarChart3,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Search,
  Filter,
  Heart,
  Eye,
  User
} from 'lucide-react'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home-seeker')

  const features = {
    'home-seeker': [
      {
        icon: <User className="w-6 h-6" />,
        title: 'User Onboarding & Profile',
        description: 'Mobile/email signup with Aadhaar/PAN KYC',
        details: ['Verify eligibility', 'Personalized affordability score', 'Compliant onboarding']
      },
      {
        icon: <Calculator className="w-6 h-6" />,
        title: 'Affordability Engine',
        description: 'AI-based affordability scoring',
        details: ['Monthly payment simulation', 'Tenure selection', 'Price appreciation preview']
      },
      {
        icon: <Search className="w-6 h-6" />,
        title: 'Property Discovery',
        description: 'Rent2Own-eligible homes only',
        details: ['Smart filters', 'Verified properties', 'Virtual tours']
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Equity Dashboard',
        description: 'Track your ownership journey',
        details: ['Monthly equity view', 'Ownership progress', 'Buyout options']
      },
      {
        icon: <CreditCard className="w-6 h-6" />,
        title: 'Smart Payments',
        description: 'Single monthly payment with auto-debit',
        details: ['UPI/NACH support', 'Payment reminders', 'Grace periods']
      },
      {
        icon: <FileText className="w-6 h-6" />,
        title: 'Digital Agreements',
        description: 'Paperless onboarding',
        details: ['eSign agreements', 'Legal transparency', 'Easy audits']
      }
    ],
    'investor': [
      {
        icon: <BarChart3 className="w-6 h-6" />,
        title: 'Investor Dashboard',
        description: 'Complete portfolio overview',
        details: ['Cash flow tracking', 'IRR analytics', 'Performance scores']
      },
      {
        icon: <Shield className="w-6 h-6" />,
        title: 'Risk Analytics',
        description: 'Proactive risk management',
        details: ['Payment insights', 'Default alerts', 'Asset health']
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: 'Liquidity Options',
        description: 'Flexible exit strategies',
        details: ['Secondary sales', 'Exit windows', 'Re-onboarding']
      }
    ],
    'builder': [
      {
        icon: <Building className="w-6 h-6" />,
        title: 'Builder Portal',
        description: 'Streamlined property management',
        details: ['Inventory onboarding', 'Pricing control', 'Occupancy tracking']
      },
      {
        icon: <FileText className="w-6 h-6" />,
        title: 'Compliance Tools',
        description: 'RERA-aligned reporting',
        details: ['Standardized agreements', 'Payment reconciliation', 'Audit ready']
      }
    ]
  }

  const sampleProperties = [
    {
      id: 1,
      title: 'Premium 2BHK in Whitefield',
      location: 'Whitefield, Bangalore',
      price: '₹75L',
      monthlyPayment: '₹35,000',
      tenure: '12 years',
      image: '/api/placeholder/400/300',
      equityProgress: 15,
      featured: true
    },
    {
      id: 2,
      title: 'Spacious 3BHK in Koramangala',
      location: 'Koramangala, Bangalore',
      price: '₹1.2Cr',
      monthlyPayment: '₹55,000',
      tenure: '15 years',
      image: '/api/placeholder/400/300',
      equityProgress: 8,
      featured: false
    },
    {
      id: 3,
      title: 'Modern 1BHK in HSR Layout',
      location: 'HSR Layout, Bangalore',
      price: '₹45L',
      monthlyPayment: '₹22,000',
      tenure: '10 years',
      image: '/api/placeholder/400/300',
      equityProgress: 22,
      featured: false
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'IT Professional',
      content: 'Rent2Own made my dream of owning a home in Bangalore a reality. The equity dashboard keeps me motivated!',
      rating: 5
    },
    {
      name: 'Rahul Verma',
      role: 'Investor',
      content: 'Excellent returns and complete transparency. The risk analytics give me confidence in my investments.',
      rating: 5
    },
    {
      name: 'Anjali Nair',
      role: 'First-time HomeIconowner',
      content: 'The affordability calculator helped me choose the perfect home. No more paying dead rent!',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HomeIcon className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">Rent2Own India</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" asChild>
                <a href="/properties">Properties</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/dashboard">Dashboard</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/investor">Investors</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/builder">Builders</a>
              </Button>
              <Button variant="ghost">How it Works</Button>
              <Button variant="ghost">About Us</Button>
              <Button variant="ghost">Contact</Button>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">
            🏠 Transform Rent into Ownership
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Own Your Dream HomeIcon
            <span className="block text-orange-600">One Monthly Payment at a Time</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Stop paying dead rent. Start building equity with India's most transparent Rent2Own platform. 
            Verified properties, AI-powered affordability scoring, and complete ownership tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              Check Eligibility
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/properties">Browse Properties</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">500+</div>
              <div className="text-gray-600">Properties Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">₹250Cr+</div>
              <div className="text-gray-600">Property Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">1,200+</div>
              <div className="text-gray-600">Happy HomeIconowners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive solutions for everyone in the Rent2Own ecosystem
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="home-seeker" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                HomeIcon Seeker
              </TabsTrigger>
              <TabsTrigger value="investor" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Investor
              </TabsTrigger>
              <TabsTrigger value="builder" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                Builder
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home-seeker" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features['home-seeker'].map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="investor" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features['investor'].map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="builder" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features['builder'].map((feature, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {feature.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Sample Properties */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked Rent2Own homes with verified legal clearance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                    <HomeIcon className="w-16 h-16 text-orange-600" />
                  </div>
                  {property.featured && (
                    <Badge className="absolute top-4 left-4 bg-orange-600">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur-sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Total Price</div>
                      <div className="font-semibold">{property.price}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Monthly Payment</div>
                      <div className="font-semibold text-orange-600">{property.monthlyPayment}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Equity Progress</span>
                      <span>{property.equityProgress}%</span>
                    </div>
                    <Progress value={property.equityProgress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{property.tenure} tenure</Badge>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <a href="/properties" className="flex items-center">
                View All Properties
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our happy homeowners and investors
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-orange-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Own Your Dream HomeIcon?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Indians who are turning their rent into ownership. 
            Check your eligibility in 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">
              Check Eligibility Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <HomeIcon className="w-6 h-6 text-orange-500" />
                <span className="text-xl font-bold text-white">Rent2Own India</span>
              </div>
              <p className="text-sm">
                Transforming rent into ownership with transparency and trust.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">About Us</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">How it Works</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">Careers</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">Blog</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">Help Center</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">Contact Us</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">Privacy Policy</Button></li>
                <li><Button variant="link" className="text-gray-300 hover:text-white p-0">Terms of Service</Button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 80XXXXXX90
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@rent2own.in
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  Bangalore, India
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Rent2Own India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}