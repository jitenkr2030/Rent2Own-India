'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { 
  Search, 
  Filter, 
  MapPin, 
  Home, 
  Bath, 
  Square, 
  Calendar,
  Heart,
  Eye,
  IndianRupee,
  BedDouble,
  Car,
  Dumbbell,
  Trees,
  Shield,
  Star
} from 'lucide-react'

interface Property {
  id: string
  title: string
  description: string
  address: string
  city: string
  locality: string
  propertyType: string
  bhk: number
  bathrooms: number
  balconies: number
  carpetArea: number
  totalPrice: number
  rent2OwnPrice: number
  monthlyPayment: number
  tenure: number
  appreciationCap: number
  possessionDate: string
  reraApproved: boolean
  amenities: string[]
  images: string[]
  builder: {
    companyName: string
    reraRegistration: string
  }
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedBhk, setSelectedBhk] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [priceRange, setPriceRange] = useState([0, 20000000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const cities = ['Bangalore', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai']
  const bhkOptions = ['1', '2', '3', '4', '5+']
  const propertyTypes = ['APARTMENT', 'VILLA', 'TOWNHOUSE', 'PENTHOUSE', 'STUDIO']
  const amenities = [
    { id: 'swimming', label: 'Swimming Pool', icon: Dumbbell },
    { id: 'gym', label: 'Gym', icon: Dumbbell },
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'garden', label: 'Garden', icon: Trees },
    { id: 'security', label: '24/7 Security', icon: Shield },
  ]

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCity) params.append('city', selectedCity)
      if (selectedBhk) params.append('bhk', selectedBhk)
      if (selectedType) params.append('propertyType', selectedType)
      if (priceRange[0] > 0) params.append('minBudget', priceRange[0].toString())
      if (priceRange[1] < 20000000) params.append('maxBudget', priceRange[1].toString())

      const response = await fetch(`/api/properties?${params.toString()}`)
      const data = await response.json()
      setProperties(data.properties || [])
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [selectedCity, selectedBhk, selectedType, priceRange])

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesAmenities = selectedAmenities.length === 0 || 
                           selectedAmenities.every(amenity => 
                             property.amenities.includes(amenity)
                           )
    
    return matchesSearch && matchesAmenities
  })

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(0)}L`
    }
    return `₹${price.toLocaleString()}`
  }

  const getPropertyTypeLabel = (type: string) => {
    const labels: { [key: string]: string } = {
      'APARTMENT': 'Apartment',
      'VILLA': 'Villa',
      'TOWNHOUSE': 'Townhouse',
      'PENTHOUSE': 'Penthouse',
      'STUDIO': 'Studio'
    }
    return labels[type] || type
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by location, property name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:w-auto w-full"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Cities</SelectItem>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BHK</label>
                  <Select value={selectedBhk} onValueChange={setSelectedBhk}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select BHK" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any BHK</SelectItem>
                      {bhkOptions.map(bhk => (
                        <SelectItem key={bhk} value={bhk}>{bhk} BHK</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type}>
                          {getPropertyTypeLabel(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20000000}
                    min={0}
                    step={100000}
                    className="mt-6"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
                <div className="flex flex-wrap gap-4">
                  {amenities.map(amenity => {
                    const Icon = amenity.icon
                    return (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity.id}
                          checked={selectedAmenities.includes(amenity.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAmenities([...selectedAmenities, amenity.id])
                            } else {
                              setSelectedAmenities(selectedAmenities.filter(a => a !== amenity.id))
                            }
                          }}
                        />
                        <label htmlFor={amenity.id} className="flex items-center space-x-1 text-sm">
                          <Icon className="w-4 h-4" />
                          <span>{amenity.label}</span>
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button onClick={() => {
                  setSelectedCity('')
                  setSelectedBhk('')
                  setSelectedType('')
                  setPriceRange([0, 20000000])
                  setSelectedAmenities([])
                }} variant="outline">
                  Clear Filters
                </Button>
                <Button onClick={fetchProperties}>
                  Apply Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Rent2Own Properties</h1>
          <p className="text-gray-600 mt-2">
            {filteredProperties.length} properties found
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                  <Home className="w-16 h-16 text-orange-600" />
                </div>
                
                {property.reraApproved && (
                  <Badge className="absolute top-4 left-4 bg-green-600">
                    RERA Approved
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
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.locality}, {property.city}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {property.builder.companyName}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div className="flex items-center">
                    <BedDouble className="w-4 h-4 mr-1" />
                    {property.bhk} BHK
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    {property.carpetArea} sqft
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Total Price</div>
                    <div className="font-semibold">{formatPrice(property.totalPrice)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Monthly Payment</div>
                    <div className="font-semibold text-orange-600">{formatPrice(property.monthlyPayment)}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Rent2Own Price</span>
                    <span>{formatPrice(property.rent2OwnPrice)}</span>
                  </div>
                  <Progress 
                    value={(property.rent2OwnPrice / property.totalPrice) * 100} 
                    className="h-2" 
                  />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{property.tenure} years</Badge>
                  <Badge variant="outline">{getPropertyTypeLabel(property.propertyType)}</Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Calculate EMI
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <Home className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No properties found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  )
}