'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import { Palette, Clock, DollarSign, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const commissionTypes = [
  { value: 'painting', label: 'Custom Painting', price: 'Starting at $150' },
  { value: 'sticker-set', label: 'Custom Sticker Set', price: 'Starting at $50' },
  { value: 'bookmark-set', label: 'Custom Bookmark Set', price: 'Starting at $75' },
  { value: 'mixed', label: 'Mixed Media Piece', price: 'Starting at $200' },
];

const timelineOptions = [
  { value: '2-weeks', label: '2 weeks' },
  { value: '1-month', label: '1 month' },
  { value: '2-months', label: '2 months' },
  { value: '3-months', label: '3+ months' },
  { value: 'flexible', label: 'Flexible' },
];

const budgetRanges = [
  { value: '50-100', label: '$50 - $100' },
  { value: '100-250', label: '$100 - $250' },
  { value: '250-500', label: '$250 - $500' },
  { value: '500-1000', label: '$500 - $1,000' },
  { value: '1000+', label: '$1,000+' },
];

export default function CommissionsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commissionType: '',
    description: '',
    budget: '',
    timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/commissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Commission request submitted! We\'ll get back to you within 24 hours.');

        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          commissionType: '',
          description: '',
          budget: '',
          timeline: '',
        });
      } else {
        toast.error(result.error || 'Failed to submit commission request. Please try again.');
      }
    } catch {
      toast.error('Failed to submit commission request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold rustic-text-brown mb-4">
            Custom Commissions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Work directly with Haley to create a unique piece of art that perfectly captures your vision.
            From custom paintings to personalized sticker sets, let&apos;s bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Commission Form */}
          <div className="lg:col-span-2">
            <Card className="rustic-card">
              <CardHeader>
                <CardTitle className="rustic-text-brown">Commission Request</CardTitle>
                <CardDescription>
                  Tell us about your vision and we&apos;ll work together to create something beautiful.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>

                  {/* Commission Details */}
                  <div className="space-y-2">
                    <Label htmlFor="commissionType">Commission Type *</Label>
                    <Select value={formData.commissionType} onValueChange={(value) => handleInputChange('commissionType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select commission type" />
                      </SelectTrigger>
                      <SelectContent>
                        {commissionTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex justify-between items-center w-full">
                              <span>{type.label}</span>
                              <span className="text-sm text-muted-foreground ml-4">{type.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your vision in detail. Include style preferences, colors, themes, size requirements, and any specific elements you'd like included..."
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range *</Label>
                      <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range.value} value={range.value}>
                              {range.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Preferred Timeline *</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          {timelineOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rustic-button-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Commission Request'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Process Overview */}
            <Card className="rustic-card">
              <CardHeader>
                <CardTitle className="rustic-text-brown">Commission Process</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">1. Consultation</h4>
                    <p className="text-sm text-muted-foreground">We&apos;ll discuss your vision and requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">2. Quote & Agreement</h4>
                    <p className="text-sm text-muted-foreground">Receive a detailed quote and timeline</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Palette className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">3. Creation</h4>
                    <p className="text-sm text-muted-foreground">Your artwork is carefully crafted</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">4. Delivery</h4>
                    <p className="text-sm text-muted-foreground">Receive your finished piece</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pricing Guide */}
            <Card className="rustic-card">
              <CardHeader>
                <CardTitle className="rustic-text-brown">Starting Prices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {commissionTypes.map((type) => (
                  <div key={type.value} className="flex justify-between items-center">
                    <span className="text-sm">{type.label}</span>
                    <span className="text-sm font-medium rustic-text-gold">{type.price}</span>
                  </div>
                ))}
                <div className="pt-2 border-t rustic-border">
                  <p className="text-xs text-muted-foreground">
                    Final pricing depends on size, complexity, and materials. Rush orders may incur additional fees.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="rustic-card">
              <CardHeader>
                <CardTitle className="rustic-text-brown">Questions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about the commission process? We&apos;re here to help!
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:commissions@haleyreynolds.com">
                    Email Us
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
