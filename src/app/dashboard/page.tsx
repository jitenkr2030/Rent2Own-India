'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Home, 
  TrendingUp, 
  Calendar, 
  IndianRupee,
  Target,
  PiggyBank,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  Calculator,
  Download,
  Bell,
  Settings,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Building,
  User
} from 'lucide-react'

interface EquityData {
  id: string
  propertyId: string
  propertyTitle: string
  propertyAddress: string
  totalEquity: number
  monthlyEquity: number
  ownershipPercentage: number
  remainingBalance: number
  lastUpdated: string
  property: {
    totalPrice: number
    rent2OwnPrice: number
    monthlyPayment: number
    tenure: number
    possessionDate: string
    builder: {
      companyName: string
    }
  }
}

interface Payment {
  id: string
  amount: number
  paymentType: string
  status: string
  dueDate: string
  paidAt?: string
  equityComponent: number
  rentComponent: number
  lateFee: number
}

interface MonthlyBreakdown {
  month: string
  equityPayment: number
  rentPayment: number
  totalPayment: number
  cumulativeEquity: number
  ownershipPercentage: number
}

export default function DashboardPage() {
  const [equityData, setEquityData] = useState<EquityData | null>(null)
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      // Mock data for now - in real app, this would come from API
      const mockEquityData: EquityData = {
        id: '1',
        propertyId: '1',
        propertyTitle: 'Premium 2BHK Apartment in Whitefield',
        propertyAddress: 'Premium Residency, Whitefield Main Road, Bangalore',
        totalEquity: 147000,
        monthlyEquity: 24500,
        ownershipPercentage: 2.04,
        remainingBalance: 7053000,
        lastUpdated: '2024-01-15',
        property: {
          totalPrice: 7500000,
          rent2OwnPrice: 7200000,
          monthlyPayment: 35000,
          tenure: 12,
          possessionDate: '2024-06-01',
          builder: {
            companyName: 'Premium Constructions Pvt Ltd'
          }
        }
      }

      const mockPayments: Payment[] = [
        {
          id: '1',
          amount: 35000,
          paymentType: 'RENT',
          status: 'COMPLETED',
          dueDate: '2024-01-01',
          paidAt: '2024-01-01',
          equityComponent: 24500,
          rentComponent: 10500,
          lateFee: 0
        },
        {
          id: '2',
          amount: 35000,
          paymentType: 'RENT',
          status: 'COMPLETED',
          dueDate: '2023-12-01',
          paidAt: '2023-12-01',
          equityComponent: 24500,
          rentComponent: 10500,
          lateFee: 0
        },
        {
          id: '3',
          amount: 35000,
          paymentType: 'RENT',
          status: 'PENDING',
          dueDate: '2024-02-01',
          equityComponent: 24500,
          rentComponent: 10500,
          lateFee: 0
        }
      ]

      setEquityData(mockEquityData)
      setPayments(mockPayments)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const generateMonthlyBreakdown = (): MonthlyBreakdown[] => {
    if (!equityData) return []
    
    const breakdown: MonthlyBreakdown[] = []
    let cumulativeEquity = 0
    
    for (let i = 0; i < 12; i++) {
      const date = new Date()
      date.setMonth(date.getMonth() - (11 - i))
      
      cumulativeEquity += equityData.monthlyEquity
      const ownershipPercentage = (cumulativeEquity / equityData.property.rent2OwnPrice) * 100
      
      breakdown.push({
        month: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        equityPayment: equityData.monthlyEquity,
        rentPayment: equityData.property.monthlyPayment - equityData.monthlyEquity,
        totalPayment: equityData.property.monthlyPayment,
        cumulativeEquity,
        ownershipPercentage
      })
    }
    
    return breakdown
  }

  const getNextPaymentDate = () => {
    const nextPayment = payments.find(p => p.status === 'PENDING')
    return nextPayment ? formatDate(nextPayment.dueDate) : 'No upcoming payments'
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'OVERDUE': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!equityData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Property</h3>
          <p className="text-gray-500 mb-4">You don't have any active Rent2Own properties</p>
          <Button>Browse Properties</Button>
        </div>
      </div>
    )
  }

  const monthlyBreakdown = generateMonthlyBreakdown()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Equity Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your journey to homeownership</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(equityData.totalEquity)}</div>
              <p className="text-xs text-muted-foreground">
                +{formatCurrency(equityData.monthlyEquity)} this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ownership</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{equityData.ownershipPercentage.toFixed(2)}%</div>
              <p className="text-xs text-muted-foreground">
                of {formatCurrency(equityData.property.rent2OwnPrice)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(equityData.property.monthlyPayment)}</div>
              <p className="text-xs text-muted-foreground">
                Next: {getNextPaymentDate()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(equityData.remainingBalance)}</div>
              <p className="text-xs text-muted-foreground">
                {equityData.property.tenure} years remaining
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="property">Property</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Property Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{equityData.propertyTitle}</h3>
                    <p className="text-gray-600 text-sm">{equityData.propertyAddress}</p>
                    <div className="flex items-center mt-2">
                      <Building className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-sm text-gray-600">{equityData.property.builder.companyName}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-gray-500">Total Price</div>
                      <div className="font-semibold">{formatCurrency(equityData.property.totalPrice)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Rent2Own Price</div>
                      <div className="font-semibold text-green-600">{formatCurrency(equityData.property.rent2OwnPrice)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Possession Date</div>
                      <div className="font-semibold">{formatDate(equityData.property.possessionDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Tenure</div>
                      <div className="font-semibold">{equityData.property.tenure} years</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ownership Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Ownership Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Current Ownership</span>
                      <span className="font-semibold">{equityData.ownershipPercentage.toFixed(2)}%</span>
                    </div>
                    <Progress value={equityData.ownershipPercentage} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {equityData.totalEquity > 0 ? Math.floor(equityData.totalEquity / equityData.monthlyEquity) : 0}
                      </div>
                      <div className="text-sm text-gray-600">Payments Made</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.ceil((equityData.property.rent2OwnPrice - equityData.totalEquity) / equityData.monthlyEquity)}
                      </div>
                      <div className="text-sm text-gray-600">Payments Remaining</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Equity Component</span>
                      <span className="font-semibold text-green-600">+{formatCurrency(equityData.monthlyEquity)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Rent Component</span>
                      <span className="font-semibold text-orange-600">{formatCurrency(equityData.property.monthlyPayment - equityData.monthlyEquity)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t font-semibold">
                      <span>Total Monthly Payment</span>
                      <span>{formatCurrency(equityData.property.monthlyPayment)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Receipt className="w-5 h-5 mr-2" />
                    Payment History
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Statement
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          {payment.status === 'COMPLETED' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : payment.status === 'PENDING' ? (
                            <Clock className="w-5 h-5 text-yellow-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">{formatCurrency(payment.amount)}</div>
                          <div className="text-sm text-gray-500">
                            Due: {formatDate(payment.dueDate)}
                            {payment.paidAt && ` • Paid: ${formatDate(payment.paidAt)}`}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getPaymentStatusColor(payment.status)}>
                          {payment.status}
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">
                          Equity: {formatCurrency(payment.equityComponent)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Equity Growth</CardTitle>
                  <CardDescription>Your equity accumulation over the last 12 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyBreakdown.slice(-6).map((month, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{month.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${(month.cumulativeEquity / equityData.property.rent2OwnPrice) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-20 text-right">
                            {formatCurrency(month.cumulativeEquity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Breakdown</CardTitle>
                  <CardDescription>How your monthly payment is distributed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                          Equity Component
                        </span>
                        <span className="font-semibold">{formatCurrency(equityData.monthlyEquity)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                          Rent Component
                        </span>
                        <span className="font-semibold">{formatCurrency(equityData.property.monthlyPayment - equityData.monthlyEquity)}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {((equityData.monthlyEquity / equityData.property.monthlyPayment) * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Goes to building your equity
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="property" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Information</CardTitle>
                <CardDescription>Detailed information about your Rent2Own property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Property Title</label>
                      <p className="font-semibold">{equityData.propertyTitle}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Address</label>
                      <p className="text-sm">{equityData.propertyAddress}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Builder</label>
                      <p className="font-semibold">{equityData.property.builder.companyName}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Total Market Value</label>
                      <p className="font-semibold">{formatCurrency(equityData.property.totalPrice)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Rent2Own Price</label>
                      <p className="font-semibold text-green-600">{formatCurrency(equityData.property.rent2OwnPrice)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Possession Date</label>
                      <p className="font-semibold">{formatDate(equityData.property.possessionDate)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold mb-2">Need Help?</h4>
                      <p className="text-sm text-gray-600">Contact our support team for any questions about your property</p>
                    </div>
                    <Button>Contact Support</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}