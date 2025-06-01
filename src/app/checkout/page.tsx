'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore } from '@/store/useStore';
import { useAuth } from '@/hooks/useAuth';
import { Lock, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

const states = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    email: user?.email || '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });

  const [billingAddress, setBillingAddress] = useState({
    name: user?.name || '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'US',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const shipping = cart.total > 50 ? 0 : 8.99;
  const tax = cart.total * 0.08;
  const finalTotal = cart.total + shipping + tax;

  const handleShippingChange = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field: string, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // In a real app, this would integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment processing
      
      toast.success('Order placed successfully! You will receive a confirmation email shortly.');
      clearCart();
      
      // Redirect to success page
      window.location.href = '/order-success';
    } catch {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            <h1 className="text-2xl font-bold rustic-text-brown mb-4">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before proceeding to checkout.
            </p>
            <Button className="rustic-button-primary" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold rustic-text-brown mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card className="rustic-card">
                <CardHeader>
                  <CardTitle className="rustic-text-brown">Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shipping-name">Full Name *</Label>
                      <Input
                        id="shipping-name"
                        value={shippingAddress.name}
                        onChange={(e) => handleShippingChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-email">Email *</Label>
                      <Input
                        id="shipping-email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => handleShippingChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipping-line1">Address Line 1 *</Label>
                    <Input
                      id="shipping-line1"
                      value={shippingAddress.line1}
                      onChange={(e) => handleShippingChange('line1', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shipping-line2">Address Line 2</Label>
                    <Input
                      id="shipping-line2"
                      value={shippingAddress.line2}
                      onChange={(e) => handleShippingChange('line2', e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shipping-city">City *</Label>
                      <Input
                        id="shipping-city"
                        value={shippingAddress.city}
                        onChange={(e) => handleShippingChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-state">State *</Label>
                      <Select value={shippingAddress.state} onValueChange={(value) => handleShippingChange('state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-postal">ZIP Code *</Label>
                      <Input
                        id="shipping-postal"
                        value={shippingAddress.postalCode}
                        onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="rustic-card">
                <CardHeader>
                  <CardTitle className="rustic-text-brown">Billing Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="same-as-shipping"
                      checked={sameAsShipping}
                      onCheckedChange={(checked) => setSameAsShipping(checked === true)}
                    />
                    <Label htmlFor="same-as-shipping">Same as shipping address</Label>
                  </div>

                  {!sameAsShipping && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="billing-name">Full Name *</Label>
                        <Input
                          id="billing-name"
                          value={billingAddress.name}
                          onChange={(e) => handleBillingChange('name', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billing-line1">Address Line 1 *</Label>
                        <Input
                          id="billing-line1"
                          value={billingAddress.line1}
                          onChange={(e) => handleBillingChange('line1', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="billing-line2">Address Line 2</Label>
                        <Input
                          id="billing-line2"
                          value={billingAddress.line2}
                          onChange={(e) => handleBillingChange('line2', e.target.value)}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billing-city">City *</Label>
                          <Input
                            id="billing-city"
                            value={billingAddress.city}
                            onChange={(e) => handleBillingChange('city', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-state">State *</Label>
                          <Select value={billingAddress.state} onValueChange={(value) => handleBillingChange('state', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {states.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-postal">ZIP Code *</Label>
                          <Input
                            id="billing-postal"
                            value={billingAddress.postalCode}
                            onChange={(e) => handleBillingChange('postalCode', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="rustic-card">
                <CardHeader>
                  <CardTitle className="rustic-text-brown flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-md text-center">
                    <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Secure payment processing powered by Stripe
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      In a real implementation, Stripe Elements would be integrated here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="rustic-card sticky top-4">
                <CardHeader>
                  <CardTitle className="rustic-text-brown">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-2">
                    {cart.items.map((item) => (
                      <div key={item.productId} className="flex justify-between text-sm">
                        <span>{item.product.name} × {item.quantity}</span>
                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(cart.total)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          formatPrice(shipping)
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="rustic-text-gold">{formatPrice(finalTotal)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rustic-button-primary"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : `Place Order - ${formatPrice(finalTotal)}`}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    By placing your order, you agree to our Terms of Service and Privacy Policy
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
