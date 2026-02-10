'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Building,
  Users,
  ArrowUp,
  ArrowDown,
  IndianRupee,
  Percent,
  Activity,
  BarChart3,
  Download,
  Filter
} from 'lucide-react'

interface Investment {
  id: string
  propertyId: string
  propertyTitle: string
  propertyAddress: string
  investmentAmount: number
  equityPercentage: number
  expectedReturns: number
  currentReturns: number
  status: string
  createdAt: string
  property: {
    totalPrice: number
    rent2OwnPrice: number
    monthlyPayment: number
    city: string
    builder: {
      companyName: string
    }
  }
}

interface PortfolioMetrics {
  totalInvestment: number
  currentValue: number
  totalReturns: number
  irr: number
  monthlyCashFlow: number
  activeProperties: number
  averageYield: number
  riskScore: number
}

export default function InvestorDashboard() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [metrics, setMetrics] = useState<PortfolioMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchInvestorData()
  }, [])

  const fetchInvestorData = async () => {
    try {
      setLoading(true)
      
      // Mock data for now
      const mockInvestments: Investment[] = [
        {
          id: '1',
          propertyId: '1',
          propertyTitle: 'Premium 2BHK Apartment in Whitefield',
          propertyAddress: 'Whitefield, Bangalore',
          investmentAmount: 1000000,
          equityPercentage: 15,
          expectedReturns: 12,
          currentReturns: 10.5,
          status: 'ACTIVE',
          createdAt: '2023-06-01',
          property: {
            totalPrice: 7500000,
            rent2OwnPrice: 7200000,
            monthlyPayment: 35000,
            city: 'Bangalore',
            builder: {
              companyName: 'Premium Constructions Pvt Ltd'
            }
          }
        },
        {
          id: '2',
          propertyId: '2',
          propertyTitle: 'Spacious 3BHK in Koramangala',
          propertyAddress: 'Koramangala, Bangalore',
          investmentAmount: 1500000,
          equityPercentage: 20,
          expectedReturns: 14,
          currentReturns: 13.2,
          status: 'ACTIVE',
          createdAt: '2023-08-01',
          property: {
            totalPrice: 12000000,
            rent2OwnPrice: 11500000,
            monthlyPayment: 55000,
            city: 'Bangalore',
            builder: {
              companyName: 'Premium Constructions Pvt Ltd'
            }
          }
        }
      ]

      const mockMetrics: PortfolioMetrics = {
        totalInvestment: 2500000,
        currentValue: 2750000,
        totalReturns: 250000,
        irr: 13.8,
        monthlyCashFlow: 45000,
        activeProperties: 2,
        averageYield: 12.8,
        riskScore: 35
      }

      setInvestments(mockInvestments)
      setMetrics(mockMetrics)
    } catch (error) {
      console.error('Error fetching investor data:', error)
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

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-600 bg-green-100'
    if (score <= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getRiskLabel = (score: number) => {
    if (score <= 30) return 'Low Risk'
    if (score <= 60) return 'Medium Risk'
    return 'High Risk'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'COMPLETED': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your investment dashboard...</p>
        </div>
      </div>
    )
  }

  if (!metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Investment Data</h3>
          <p className="text-gray-500">Start investing to see your portfolio analytics</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Investor Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your real estate investment portfolio</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Portfolio Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.totalInvestment)}</div>
              <p className="text-xs text-muted-foreground">
                Across {metrics.activeProperties} properties
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.currentValue)}</div>
              <p className="text-xs text-green-600 flex items-center">
                <ArrowUp className="w-3 h-3 mr-1" />
                +{formatCurrency(metrics.totalReturns)} returns
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IRR</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.irr.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">
                Annualized return
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Cash Flow</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(metrics.monthlyCashFlow)}</div>
              <p className="text-xs text-muted-foreground">
                Passive income
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Portfolio Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Portfolio Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {metrics.averageYield.toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Average Yield</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {((metrics.totalReturns / metrics.totalInvestment) * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Total Returns</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Score</span>
                      <Badge className={getRiskColor(metrics.riskScore)}>
                        {getRiskLabel(metrics.riskScore)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Properties</span>
                      <span className="font-semibold">{metrics.activeProperties}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Investment Period</span>
                      <span className="font-semibold">18 months</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Risk Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Overall Risk</span>
                      <span className="text-sm font-semibold">{metrics.riskScore}/100</span>
                    </div>
                    <Progress value={metrics.riskScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Market Risk</span>
                      <Badge variant="outline" className="text-yellow-600">Medium</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Default Risk</span>
                      <Badge variant="outline" className="text-green-600">Low</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Liquidity Risk</span>
                      <Badge variant="outline" className="text-yellow-600">Medium</Badge>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="text-sm font-semibold text-blue-800">Recommendation</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      Your portfolio shows balanced risk-return profile. Consider diversifying across different cities to reduce concentration risk.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Investments</CardTitle>
                <CardDescription>Track performance of individual property investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{investment.propertyTitle}</h3>
                          <p className="text-gray-600 text-sm">{investment.propertyAddress}</p>
                          <div className="flex items-center mt-2">
                            <Building className="w-4 h-4 mr-1 text-gray-500" />
                            <span className="text-sm text-gray-600">{investment.property.builder.companyName}</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(investment.status)}>
                          {investment.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Investment</div>
                          <div className="font-semibold">{formatCurrency(investment.investmentAmount)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Equity %</div>
                          <div className="font-semibold">{investment.equityPercentage}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Expected IRR</div>
                          <div className="font-semibold text-green-600">{investment.expectedReturns}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Current IRR</div>
                          <div className="font-semibold text-blue-600">{investment.currentReturns}%</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Invested on {formatDate(investment.createdAt)}
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
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
                  <CardTitle>Return Distribution</CardTitle>
                  <CardDescription>Breakdown of your investment returns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <span className="font-medium">Rental Income</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(metrics.monthlyCashFlow * 12)}/year</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <span className="font-medium">Capital Appreciation</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(metrics.totalReturns * 0.6)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                        <span className="font-medium">Equity Growth</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(metrics.totalReturns * 0.4)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Investment Timeline</CardTitle>
                  <CardDescription>Your investment growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Jan 2024', value: metrics.totalInvestment * 0.8 },
                      { month: 'Mar 2024', value: metrics.totalInvestment * 0.9 },
                      { month: 'Jun 2024', value: metrics.totalInvestment * 1.05 },
                      { month: 'Sep 2024', value: metrics.totalInvestment * 1.1 },
                      { month: 'Dec 2024', value: metrics.currentValue }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{item.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(item.value / metrics.currentValue) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-24 text-right">
                            {formatCurrency(item.value)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Opportunities</CardTitle>
                <CardDescription>New Rent2Own properties available for investment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">New Opportunities Coming Soon</h3>
                  <p className="text-gray-500 mb-4">We're curating the best investment opportunities for you</p>
                  <Button>Get Notified</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}