import { useMutation } from '@tanstack/react-query'
import { dashboard } from '@/lib/api/dashboard/dashboard'
import { useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { Car, Activity, CarFront, Users } from 'lucide-react'

export function DashboardForm() {
  const dashboardMutation = useMutation({
    mutationFn: () => dashboard(),
  })

  useEffect(() => {
    dashboardMutation.mutate() // automatically triggers on mount
  }, [])
  const navigate = useNavigate()
  const location = useLocation()
  const stats = [
    {
      title: 'Total Cars',
      value: dashboardMutation.data?.status?.total_cars || '0',
      icon: Car,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      title: 'Available Cars',
      value: dashboardMutation.data?.status?.available_cars || '0',
      icon: Activity,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      title: 'Active Drivers',
      value: dashboardMutation.data?.status?.active_drivers || '0',
      icon: Users,
      color: 'bg-purple-500',
      change: '+23%',
    },
    {
      title: 'Total Drivers',
      value: dashboardMutation.data?.status?.total_drivers || '0',
      icon: CarFront,
      color: 'bg-orange-500',
      change: '+15%',
    },
  ]

  if (dashboardMutation.isLoading) return <div>Loading...</div>
  if (dashboardMutation.isError) return <div>Error!</div>
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Car Manager Dashboard
          </h1>
          <p className="text-slate-600">
            Manage your fleet and track performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-slate-600 mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recently Added Cars Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Recently Added Cars
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Track and manage your vehicle inventory
                </p>
              </div>
              <button
                onClick={() => navigate({ to: '/admin/cars' })}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                View All
              </button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Mileage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dashboardMutation.data?.recent_cars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                        <Car className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {car.make}
                        </p>
                        <p className="text-sm text-slate-500">{car.model}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-700">{car.year}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          car.color === 'Silver'
                            ? 'bg-slate-400'
                            : car.color === 'Black'
                              ? 'bg-slate-900'
                              : car.color === 'White'
                                ? 'bg-slate-100 border border-slate-300'
                                : car.color === 'Blue'
                                  ? 'bg-blue-500'
                                  : 'bg-slate-500'
                        }`}
                      ></div>
                      <span className="text-slate-700">{car.color}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-700">
                      {car.mileage?.toLocaleString()} mi
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${car.is_available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {car.is_available ? 'Available' : 'Not Available'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      onClick={() =>
                        navigate({
                          to: `/admin/cars/${car.id}`,
                          state: {
                            backgroundPath: location.pathname + location.search,
                          },
                        })
                      }
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
