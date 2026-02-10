'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Users, 
  Building, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings,
  FileText,
  Database,
  Activity,
  DollarSign,
  Eye,
  Ban,
  CheckSquare,
  Calendar,
  MapPin,
  BarChart3,
  Download,
  RefreshCw,
  Clock
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalProperties: number
  totalInvestors: number
  totalBuilders: number
  totalRevenue: number
  monthlyRevenue: number
  activeApplications: number
  completedApplications: number
  pendingKyc: number
  systemHealth: number
}

interface RecentActivity {
  id: string
  type: 'user' | 'property' | 'payment' | 'kyc'
  action: string
  details: string
  timestamp: string
  status: 'success' | 'pending' | 'error'
}

export default function AdminPanel() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [activities, setActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      setLoading(true)
      
      // Mock data
      const mockStats: AdminStats = {
        totalUsers: 1250,
        totalProperties: 45,
        totalInvestors: 180,
        totalBuilders: 25,
        totalRevenue: 8750000,
        monthlyRevenue: 1250000,
        activeApplications: 85,
        completedApplications: 320,
        pendingKyc: 15,
        systemHealth: 98
      }

      const mockActivities: RecentActivity[] = [
        {
          id: '1',
          type: 'user',
          action: 'New Registration',
          details: 'Priya Sharma registered as Home Seeker',
          timestamp: '2024-01-15T10:30:00Z',
          status: 'success'
        },
        {
          id: '2',
          type: 'property',
          action: 'Property Listed',
          details: 'New 3BHK property listed in Koramangala',
          timestamp: '2024-01-15T09:15:00Z',
          status: 'success'
        },
        {
          id: '3',
          type: 'kyc',
          action: 'KYC Pending',
          details: 'Rahul Verma KYC documents pending verification',
          timestamp: '2024-01-15T08:45:00Z',
          status: 'pending'
        },
        {
          id: '4',
          type: 'payment',
          action: 'Payment Processed',
          details: 'Payment of ₹35,000 processed for Property #1',
          timestamp: '2024-01-15T07:30:00Z',
          status: 'success'
        },
        {
          id: '5',
          type: 'user',
          action: 'Login Attempt Failed',
          details: 'Multiple failed login attempts detected',
          timestamp: '2024-01-15T06:15:00Z',
          status: 'error'
        }
      ]

      setStats(mockStats)
      setActivities(mockActivities)
    } catch (error) {
      console.error('Error fetching admin data:', error)
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="w-4 h-4" />
      case 'property': return <Building className="w-4 h-4" />
      case 'payment': return <DollarSign className="w-4 h-4" />
      case 'kyc': return <FileText className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Access Denied</h3>
          <p className="text-gray-500">You don't have permission to access this panel</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Admin Control Panel</h1>
              <p className="text-gray-600 mt-1">Manage the entire Rent2Own platform</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
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
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalInvestors} investors, {stats.totalBuilders} builders
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-xs text-muted-foreground">
                Active listings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.monthlyRevenue)}</div>
              <p className="text-xs text-green-600">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.systemHealth}%</div>
              <p className="text-xs text-muted-foreground">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Platform Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Platform Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {stats.activeApplications}
                      </div>
                      <div className="text-sm text-gray-600">Active Applications</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {stats.completedApplications}
                      </div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Pending KYC</span>
                      <Badge variant="outline" className="text-yellow-600">
                        {stats.pendingKyc} pending
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Total Revenue</span>
                      <span className="font-semibold">{formatCurrency(stats.totalRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Growth</span>
                      <span className="font-semibold text-green-600">+15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.details}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(activity.status)} variant="outline">
                            {activity.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatDateTime(activity.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users, roles, and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stats.totalUsers - stats.totalInvestors - stats.totalBuilders}</div>
                    <div className="text-sm text-gray-600">Home Seekers</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stats.totalInvestors}</div>
                    <div className="text-sm text-gray-600">Investors</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <Building className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stats.totalBuilders}</div>
                    <div className="text-sm text-gray-600">Builders</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Manage user accounts, roles, and permissions</p>
                  <Button>Manage Users</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Property Management</CardTitle>
                <CardDescription>Oversee all property listings and compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Property Oversight</h3>
                  <p className="text-gray-500 mb-4">Monitor property listings, compliance, and performance</p>
                  <div className="flex space-x-4 justify-center">
                    <Button variant="outline">View All Properties</Button>
                    <Button variant="outline">Compliance Reports</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Management</CardTitle>
                <CardDescription>Review and approve property applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stats.activeApplications}</div>
                    <div className="text-sm text-gray-600">Pending Review</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stats.completedApplications}</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Review and process property applications</p>
                  <Button>Review Applications</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="w-5 h-5 mr-2" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">System Health</span>
                      <span className="text-sm font-semibold">{stats.systemHealth}%</span>
                    </div>
                    <Progress value={stats.systemHealth} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Database</span>
                      <Badge variant="outline" className="text-green-600">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">API Server</span>
                      <Badge variant="outline" className="text-green-600">Operational</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Payment Gateway</span>
                      <Badge variant="outline" className="text-green-600">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Alerts & Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="text-sm font-medium">High KYC Pending Count</p>
                        <p className="text-xs text-gray-600">15 KYC applications pending verification</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">Monthly Report Ready</p>
                        <p className="text-xs text-gray-600">January 2024 performance report is ready</p>
                      </div>
                    </div>
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