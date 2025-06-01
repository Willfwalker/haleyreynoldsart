import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { CheckCircle, Mail, Package, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="mb-8">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold rustic-text-brown mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase! Your order has been successfully placed.
            </p>
          </div>

          <Card className="rustic-card mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm">Confirmation email sent</span>
                </div>
                
                <div className="flex items-center justify-center space-x-3">
                  <Package className="h-5 w-5 text-primary" />
                  <span className="text-sm">Order will be processed within 1-2 business days</span>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold rustic-text-brown mb-4">What&apos;s Next?</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• You&apos;ll receive a confirmation email with your order details</p>
                    <p>• We&apos;ll send you tracking information once your order ships</p>
                    <p>• Your artwork will be carefully packaged for safe delivery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button size="lg" className="rustic-button-primary" asChild>
              <Link href="/shop">
                Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Questions about your order?{' '}
                <Link href="/contact" className="text-primary hover:text-primary/80">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
