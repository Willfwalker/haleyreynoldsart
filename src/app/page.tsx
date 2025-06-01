import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowRight, Star, Palette, Heart, Truck } from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    name: 'Rustic Barn Painting',
    price: 89.99,
    image: '/placeholder-painting.jpg',
    category: 'paintings' as const,
    featured: true,
  },
  {
    id: '2',
    name: 'Vintage Flower Stickers',
    price: 12.99,
    image: '/placeholder-stickers.jpg',
    category: 'stickers' as const,
    featured: true,
  },
  {
    id: '3',
    name: 'Leather Bookmark Set',
    price: 24.99,
    image: '/placeholder-bookmarks.jpg',
    category: 'bookmarks' as const,
    featured: true,
  },
];

const categories = [
  {
    name: 'Stickers',
    href: '/shop/stickers',
    image: '/placeholder-stickers-category.jpg',
    description: 'Beautiful rustic stickers for your journals and crafts',
  },
  {
    name: 'Bookmarks',
    href: '/shop/bookmarks',
    image: '/placeholder-bookmarks-category.jpg',
    description: 'Handcrafted bookmarks for book lovers',
  },
  {
    name: 'Paintings',
    href: '/shop/paintings',
    image: '/placeholder-paintings-category.jpg',
    description: 'Original rustic paintings that tell a story',
  },
];

const features = [
  {
    icon: Palette,
    title: 'Handcrafted Art',
    description: 'Each piece is carefully created with attention to detail and rustic charm.',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every artwork is infused with passion and creativity.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Quick and secure delivery to bring art to your doorstep.',
  },
];

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  ✨ New Collection Available
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold rustic-text-brown leading-tight">
                  Beautiful Rustic
                  <span className="block rustic-text-gold">Artwork</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-md">
                  Discover handcrafted art that brings warmth and character to your space.
                  From paintings to stickers, each piece tells a unique story.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rustic-button-primary" asChild>
                  <Link href="/shop">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/commissions">Custom Commissions</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Loved by 500+ customers
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden rustic-card">
                <Image
                  src="/placeholder-hero-art.jpg"
                  alt="Featured Artwork"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rustic-card p-4 bg-background">
                <p className="text-sm font-medium">🎨 New artwork weekly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold rustic-text-brown mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of handcrafted rustic art pieces, each category offering unique charm and character.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <Card className="rustic-card overflow-hidden transition-transform group-hover:scale-105">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold rustic-text-brown mb-2">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold rustic-text-brown mb-4">
              Featured Artwork
            </h2>
            <p className="text-lg text-muted-foreground">
              Handpicked pieces that showcase the beauty of rustic art
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="rustic-card overflow-hidden group">
                <div className="aspect-square relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary">
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold rustic-text-brown mb-2">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold rustic-text-gold mb-4">
                    ${product.price}
                  </p>
                  <Button className="w-full rustic-button-primary" asChild>
                    <Link href={`/shop/${product.category}/${product.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold rustic-text-brown mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Commission Your Own Piece?
          </h2>
          <p className="text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Work directly with Haley to create a custom piece that perfectly fits your vision and space.
          </p>
          <Button size="lg" className="rustic-button-primary" asChild>
            <Link href="/commissions">
              Start Your Commission <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
