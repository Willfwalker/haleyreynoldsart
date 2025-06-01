'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';
import { useCartStore } from '@/store/useStore';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';

// Mock product data - in a real app, this would come from Firebase
const products = [
  {
    id: '1',
    name: 'Rustic Barn Painting',
    description: 'A beautiful hand-painted rustic barn scene',
    price: 89.99,
    category: 'paintings' as const,
    images: ['/placeholder-painting.jpg'],
    inventory: 5,
    featured: true,
    active: true,
    tags: ['rustic', 'barn', 'landscape'],
  },
  {
    id: '2',
    name: 'Vintage Flower Stickers',
    description: 'Set of 12 vintage-style flower stickers',
    price: 12.99,
    category: 'stickers' as const,
    images: ['/placeholder-stickers.jpg'],
    inventory: 25,
    featured: true,
    active: true,
    tags: ['vintage', 'flowers', 'decorative'],
  },
  {
    id: '3',
    name: 'Leather Bookmark Set',
    description: 'Handcrafted leather bookmarks with rustic designs',
    price: 24.99,
    category: 'bookmarks' as const,
    images: ['/placeholder-bookmarks.jpg'],
    inventory: 15,
    featured: false,
    active: true,
    tags: ['leather', 'handcrafted', 'reading'],
  },
  {
    id: '4',
    name: 'Autumn Leaves Painting',
    description: 'Warm autumn scene with golden leaves',
    price: 75.00,
    category: 'paintings' as const,
    images: ['/placeholder-painting-2.jpg'],
    inventory: 3,
    featured: false,
    active: true,
    tags: ['autumn', 'leaves', 'warm'],
  },
  {
    id: '5',
    name: 'Nature Quote Stickers',
    description: 'Inspirational nature quotes on rustic backgrounds',
    price: 15.99,
    category: 'stickers' as const,
    images: ['/placeholder-stickers-2.jpg'],
    inventory: 30,
    featured: false,
    active: true,
    tags: ['quotes', 'nature', 'inspirational'],
  },
  {
    id: '6',
    name: 'Wooden Bookmark Collection',
    description: 'Set of 3 wooden bookmarks with burned designs',
    price: 18.99,
    category: 'bookmarks' as const,
    images: ['/placeholder-bookmarks-2.jpg'],
    inventory: 20,
    featured: false,
    active: true,
    tags: ['wooden', 'burned', 'collection'],
  },
];

const categories = [
  { value: 'all', label: 'All Products' },
  { value: 'paintings', label: 'Paintings' },
  { value: 'stickers', label: 'Stickers' },
  { value: 'bookmarks', label: 'Bookmarks' },
];

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A-Z' },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const { addToCart } = useCartStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory && product.active;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return b.featured ? 1 : -1;
      }
    });

  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold rustic-text-brown mb-4">
            Shop Artwork
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover beautiful handcrafted rustic art pieces
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:items-center lg:justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="rustic-card overflow-hidden group">
              <div className="aspect-square relative">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {product.featured && (
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Featured
                  </Badge>
                )}
                {product.inventory <= 5 && (
                  <Badge variant="destructive" className="absolute top-4 right-4">
                    Low Stock
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold rustic-text-brown line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold rustic-text-gold">
                      {formatPrice(product.price)}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Button
                    className="w-full rustic-button-primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.inventory === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {product.inventory === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/shop/${product.category}/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium rustic-text-brown mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSortBy('featured');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
