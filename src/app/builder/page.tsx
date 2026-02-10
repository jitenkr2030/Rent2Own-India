'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building, 
  Plus, 
  Users, 
  TrendingUp,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  IndianRupee,
  Calendar,
  MapPin,
  Home,
  BarChart3,
  FileText,
  Settings
} from 'lucide-react'

interface BuilderProperty {
  id: string
  title: string
  address: string
  city: string
  status: string
  totalPrice: number
  rent2OwnPrice: number
  monthlyPayment: number
  bhk: number
  carpetArea: number
  applications: number
  occupiedUnits: number
  totalUnits: number
  possessionDate: string
  createdAt: string
}

interface BuilderStats {
  totalProperties: number
  activeListings: number
  totalApplications: number
  approvedApplications: number
  monthlyRevenue: number
  totalRevenue: number
  averageOccupancy: number
  completionRate: number
}

export default function BuilderPortal() {
  const [properties, setProperties] = useState<BuilderProperty[]>([])
  const [stats, setStats] = useState<BuilderStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchBuilderData()
  }, [])

  const fetchBuilderData = async () => {
    try {
      setLoading(true)
      
      // Mock data
      const mockProperties: BuilderProperty[] = [
        {
          id: '1',
          title: 'Premium 2BHK Apartment in Whitefield',
          address: 'Premium Residency, Whitefield Main Road',
          city: 'Bangalore',
          status: 'AVAILABLE',
          totalPrice: 7500000,
          rent2OwnPrice: 7200000,
          monthlyPayment: 35000,
          bhk: 2,
          carpetArea: 1050,
          applications: 15,
          occupiedUnits: 8,
          totalUnits: 20,
          possessionDate: '2024-06-01',
          createdAt: '2023-12-01'
        },
        {
          id: '2',
          title: 'Spacious 3BHK in Koramangala',
          address: 'Luxury Heights, Koramangala 6th Block',
          city: 'Bangalore',
          status: 'AVAILABLE',
          totalPrice: 12000000,
          rent2OwnPrice: 11500000,
          monthlyPayment: 55000,
          bhk: 3,
          carpetArea: 1650,
          applications: 8,
          occupiedUnits: 3,
          totalUnits: 15,
          possessionDate: '2024-08-01',
          createdAt: '2024-01-15'
        },
        {
          id: '3',
          title: 'Modern 1BHK in HSR Layout',
          address: 'Urban Homes, HSR Layout 2nd Sector',
          city: 'Bangalore',
          status: 'OCCUPIED',
          totalPrice: 4500000,
          rent2OwnPrice: 4300000,
          monthlyPayment: 22000,
          bhk: 1,
          carpetArea: 650,
          applications: 25,
          occupiedUnits: 30,
          totalUnits: 30,
          possessionDate: '2024-05-01',
          createdAt: '2023-10-01'
        }
      ]

      const mockStats: BuilderStats = {
        totalProperties: 3,
        activeListings: 2,
        totalApplications: 48,
        approvedApplications: 41,
        monthlyRevenue: 540000,
        totalRevenue: 3240000,
        averageOccupancy: 85,
        completionRate: 100
      }

      setProperties(mockProperties)
      setStats(mockStats)
    } catch (error) {
      console.error('Error fetching builder data:', error)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'bg-green-100 text-green-800'
      case 'OCCUPIED': return 'bg-blue-100 text-blue-800'
      case 'UNDER_CONSTRUCTION': return 'bg-yellow-100 text-yellow-800'
      case 'MAINTENANCE': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your builder portal...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Properties Found</h3>
          <p className="text-gray-500">Add your first property to get started</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Builder Portal</h1>
              <p className="text-gray-600 mt-1">Manage your properties and track performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Property
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
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeListings} active listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-green-600">
                {stats.approvedApplications} approved
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                From Rent2Own payments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageOccupancy}%</div>
              <p className="text-xs text-muted-foreground">
                Across all properties
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Performance Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {stats.approvedApplications}
                      </div>
                      <div className="text-sm text-gray-600">Approved Applications</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(stats.totalRevenue)}
                      </div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Completion Rate</span>
                      <span className="font-semibold">{stats.completionRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Average Occupancy</span>
                      <span className="font-semibold">{stats.averageOccupancy}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Active Listings</span>
                      <span className="font-semibold">{stats.activeListings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New application received</p>
                        <p className="text-xs text-gray-500">Premium 2BHK Apartment - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Payment completed</p>
                        <p className="text-xs text-gray-500">Modern 1BHK - 5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Property listed</p>
                        <p className="text-xs text-gray-500">Spacious 3BHK - 1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Properties</CardTitle>
                <CardDescription>Manage your property listings and track occupancy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{property.title}</h3>
                          <p className="text-gray-600 text-sm">{property.address}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="w-4 h-4 mr-1" />
                              {property.city}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Home className="w-4 h-4 mr-1" />
                              {property.bhk} BHK • {property.carpetArea} sqft
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(property.status)}>
                          {property.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Total Price</div>
                          <div className="font-semibold">{formatCurrency(property.totalPrice)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Rent2Own Price</div>
                          <div className="font-semibold text-green-600">{formatCurrency(property.rent2OwnPrice)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Monthly Payment</div>
                          <div className="font-semibold">{formatCurrency(property.monthlyPayment)}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Applications</div>
                          <div className="font-semibold">{property.applications}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Occupancy</span>
                          <span>{property.occupiedUnits}/{property.totalUnits} units</span>
                        </div>
                        <Progress 
                          value={(property.occupiedUnits / property.totalUnits) * 100} 
                          className="h-2" 
                        />
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-500">
                          Listed on {formatDate(property.createdAt)}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Applications</CardTitle>
                <CardDescription>Review and manage applications from potential home seekers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Application Management</h3>
                  <p className="text-gray-500 mb-4">Review applications, approve candidates, and manage the onboarding process</p>
                  <Button>View All Applications</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Track your revenue streams and growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-medium">Rent2Own Revenue</span>
                      <span className="font-semibold">{formatCurrency(stats.monthlyRevenue * 12)}/year</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                      <span className="font-medium">Processing Fees</span>
                      <span className="font-semibold">{formatCurrency(stats.totalRevenue * 0.02)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                      <span className="font-medium">Other Revenue</span>
                      <span className="font-semibold">{formatCurrency(stats.totalRevenue * 0.01)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Occupancy Trends</CardTitle>
                  <CardDescription>Property occupancy over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: 'Oct 2023', occupancy: 75 },
                      { month: 'Nov 2023', occupancy: 78 },
                      { month: 'Dec 2023', occupancy: 82 },
                      { month: 'Jan 2024', occupancy: 85 },
                      { month: 'Feb 2024', occupancy: 85 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{item.month}</span>
                        <div className="flex items-center space-x-4">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${item.occupancy}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-12 text-right">
                            {item.occupancy}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}