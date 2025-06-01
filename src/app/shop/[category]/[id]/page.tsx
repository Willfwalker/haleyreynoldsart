'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore } from '@/store/useStore';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Star,
  Plus,
  Minus
} from 'lucide-react';
import { toast } from 'sonner';

// Mock product data - in a real app, this would be fetched from Firebase
const getProduct = (id: string) => {
  const products = {
    '1': {
      id: '1',
      name: 'Rustic Barn Painting',
      description: 'A beautiful hand-painted rustic barn scene that captures the essence of countryside living. This original artwork features warm earth tones and intricate details that bring the pastoral beauty of rural life into your home.',
      price: 89.99,
      category: 'paintings' as const,
      images: [
        '/placeholder-painting.jpg',
        '/placeholder-painting-2.jpg',
      ],
      inventory: 5,
      featured: true,
      active: true,
      tags: ['rustic', 'barn', 'landscape', 'original'],
      dimensions: '16" x 20"',
      materials: 'Acrylic on canvas',
      details: [
        'Original hand-painted artwork',
        'Ready to hang with included hardware',
        'Signed by the artist',
        'Certificate of authenticity included',
      ],
    },
    '2': {
      id: '2',
      name: 'Vintage Flower Stickers',
      description: 'A delightful set of 12 vintage-style flower stickers perfect for decorating journals, laptops, or any surface that needs a touch of rustic charm.',
      price: 12.99,
      category: 'stickers' as const,
      images: ['/placeholder-stickers.jpg'],
      inventory: 25,
      featured: true,
      active: true,
      tags: ['vintage', 'flowers', 'decorative', 'waterproof'],
      dimensions: '2" - 4" each',
      materials: 'Waterproof vinyl',
      details: [
        'Set of 12 unique designs',
        'Waterproof and fade-resistant',
        'Easy to apply and remove',
        'Perfect for indoor and outdoor use',
      ],
    },
    '3': {
      id: '3',
      name: 'Leather Bookmark Set',
      description: 'Handcrafted leather bookmarks featuring rustic designs burned into genuine leather. Perfect for book lovers who appreciate artisanal craftsmanship.',
      price: 24.99,
      category: 'bookmarks' as const,
      images: ['/placeholder-bookmarks.jpg'],
      inventory: 15,
      featured: false,
      active: true,
      tags: ['leather', 'handcrafted', 'reading', 'gift'],
      dimensions: '6" x 2"',
      materials: 'Genuine leather with burned designs',
      details: [
        'Set of 3 unique designs',
        'Handcrafted from genuine leather',
        'Burned designs for durability',
        'Comes with gift packaging',
      ],
    },
  };

  return products[id as keyof typeof products] || null;
};

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProduct(params.id as string);

  if (!product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold rustic-text-brown mb-4">
              Product Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Button className="rustic-button-primary" asChild>
              <Link href="/shop">Back to Shop</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.inventory) {
      setQuantity(newQuantity);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-muted-foreground">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li>/</li>
            <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
            <li>/</li>
            <li><Link href={`/shop/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link></li>
            <li>/</li>
            <li className="text-foreground">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden rustic-card">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                {product.featured && (
                  <Badge className="bg-primary">Featured</Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold rustic-text-brown mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold rustic-text-gold">
                  {formatPrice(product.price)}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">(24 reviews)</span>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Product Details */}
            <Card className="rustic-card">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Dimensions:</span>
                    <p className="text-muted-foreground">{product.dimensions}</p>
                  </div>
                  <div>
                    <span className="font-medium">Materials:</span>
                    <p className="text-muted-foreground">{product.materials}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Label htmlFor="quantity">Quantity:</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center"
                    min="1"
                    max={product.inventory}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.inventory}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.inventory} in stock
                </span>
              </div>

              <div className="flex space-x-4">
                <Button
                  className="flex-1 rustic-button-primary"
                  onClick={handleAddToCart}
                  disabled={product.inventory === 0}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center space-x-3 text-sm">
                <Truck className="h-4 w-4 text-primary" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <RotateCcw className="h-4 w-4 text-primary" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-16">
          <Card className="rustic-card">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold rustic-text-brown mb-4">
                Product Details
              </h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
