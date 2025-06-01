'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/hooks/useAuth';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye,
  Plus,
  Settings
} from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,345',
    change: '+12.5%',
    icon: DollarSign,
    color: 'text-green-600',
  },
  {
    title: 'Orders',
    value: '156',
    change: '+8.2%',
    icon: ShoppingCart,
    color: 'text-blue-600',
  },
  {
    title: 'Products',
    value: '24',
    change: '+2',
    icon: Package,
    color: 'text-purple-600',
  },
  {
    title: 'Customers',
    value: '89',
    change: '+15.3%',
    icon: Users,
    color: 'text-orange-600',
  },
];

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'Sarah Johnson',
    amount: '$89.99',
    status: 'completed',
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    customer: 'Mike Chen',
    amount: '$24.99',
    status: 'processing',
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customer: 'Emily Davis',
    amount: '$156.50',
    status: 'shipped',
    date: '2024-01-14',
  },
];

const quickActions = [
  {
    title: 'Add Product',
    description: 'Add a new artwork to your catalog',
    href: '/admin/products/new',
    icon: Plus,
  },
  {
    title: 'View Orders',
    description: 'Manage customer orders',
    href: '/admin/orders',
    icon: Eye,
  },
  {
    title: 'Settings',
    description: 'Configure store settings',
    href: '/admin/settings',
    icon: Settings,
  },
];

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold rustic-text-brown mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="rustic-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold rustic-text-brown">
                        {stat.value}
                      </p>
                      <p className={`text-sm ${stat.color} flex items-center mt-1`}>
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <Card className="rustic-card">
              <CardHeader>
                <CardTitle className="rustic-text-brown">Recent Orders</CardTitle>
                <CardDescription>
                  Latest customer orders and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <p className="font-medium rustic-text-brown">
                          {order.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.customer}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium rustic-text-gold">
                          {order.amount}
                        </p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="rustic-card">
              <CardHeader>
                <CardTitle className="rustic-text-brown">Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks and shortcuts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={action.title}
                      variant="outline"
                      className="w-full justify-start h-auto p-4"
                      asChild
                    >
                      <Link href={action.href}>
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 mt-0.5 text-primary" />
                          <div className="text-left">
                            <p className="font-medium">{action.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Commission Requests */}
            <Card className="rustic-card mt-6">
              <CardHeader>
                <CardTitle className="rustic-text-brown">Commission Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-2xl font-bold rustic-text-gold mb-2">3</p>
                  <p className="text-sm text-muted-foreground">Pending requests</p>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/admin/commissions">Review Requests</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
