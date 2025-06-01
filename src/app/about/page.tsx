import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { Palette, Heart, Award, Users } from 'lucide-react';

const achievements = [
  {
    icon: Palette,
    title: '500+ Artworks Created',
    description: 'Each piece crafted with love and attention to detail',
  },
  {
    icon: Users,
    title: '300+ Happy Customers',
    description: 'Building relationships through beautiful art',
  },
  {
    icon: Award,
    title: 'Featured Artist',
    description: 'Recognized in local art galleries and exhibitions',
  },
  {
    icon: Heart,
    title: '5+ Years Experience',
    description: 'Dedicated to the craft of rustic art creation',
  },
];

const values = [
  {
    title: 'Authenticity',
    description: 'Every piece is genuinely handcrafted with traditional techniques and modern creativity.',
  },
  {
    title: 'Quality',
    description: 'Using only the finest materials to ensure your artwork lasts for generations.',
  },
  {
    title: 'Personal Touch',
    description: 'Each commission is a collaboration, ensuring your vision comes to life perfectly.',
  },
  {
    title: 'Sustainability',
    description: 'Committed to eco-friendly practices and supporting local suppliers when possible.',
  },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-5xl font-bold rustic-text-brown leading-tight">
                Meet Haley Reynolds
              </h1>
              <p className="text-lg text-muted-foreground">
                A passionate artist dedicated to creating beautiful rustic artwork that brings warmth, 
                character, and storytelling to every space. Based in the heart of the countryside, 
                Haley draws inspiration from nature, vintage aesthetics, and the simple beauty of rural life.
              </p>
              <p className="text-lg text-muted-foreground">
                What started as a hobby during college has blossomed into a full-time passion for creating 
                art that connects with people on a personal level. Every brushstroke, every design choice, 
                and every color selection is made with intention and care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rustic-button-primary" asChild>
                  <Link href="/commissions">Commission a Piece</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/shop">View Gallery</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden rustic-card">
                <Image
                  src="/placeholder-haley-portrait.jpg"
                  alt="Haley Reynolds in her studio"
                  width={400}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 rustic-card p-4 bg-background">
                <p className="text-sm font-medium">🎨 Creating since 2019</p>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 lg:py-24 bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold rustic-text-brown mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-lg text-muted-foreground">
              A journey of growth, creativity, and connection through art
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold rustic-text-brown mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold rustic-text-brown mb-4">
                The Story Behind the Art
              </h2>
            </div>

            <div className="space-y-8 text-lg text-muted-foreground">
              <p>
                Growing up in a small rural town, I was always surrounded by the beauty of nature and 
                the charm of rustic living. Old barns, weathered fences, wildflower meadows, and the 
                changing seasons became my earliest sources of inspiration. What I loved most was how 
                these simple, everyday scenes could evoke such powerful emotions and memories.
              </p>

              <p>
                During my college years studying Fine Arts, I discovered my passion for combining 
                traditional painting techniques with modern design elements. I began experimenting 
                with different mediums, from watercolors and acrylics to digital illustrations that 
                could be transformed into stickers and bookmarks.
              </p>

              <p>
                The turning point came when I created a custom painting for a friend&apos;s wedding –
                a rustic barn scene that held special meaning for their relationship. Seeing the
                joy and emotional connection that piece brought to them made me realize that art
                isn&apos;t just about creating something beautiful; it&apos;s about creating something meaningful.
              </p>

              <p>
                Today, every piece I create is infused with that same intention: to capture not just
                an image, but a feeling, a memory, or a dream. Whether it&apos;s a custom commission that
                tells your unique story or a ready-made piece that speaks to your soul, my goal is
                to create art that becomes a cherished part of your life.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24 bg-secondary -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
              What Drives My Work
            </h2>
            <p className="text-lg text-secondary-foreground/80">
              The values and principles that guide every creation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value) => (
              <Card key={value.title} className="rustic-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold rustic-text-brown mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold rustic-text-brown mb-4">
              Let&apos;s Create Something Beautiful Together
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you&apos;re looking for a custom commission or want to browse my existing collection,
              I&apos;d love to help you find the perfect piece of art for your space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rustic-button-primary" asChild>
                <Link href="/commissions">Start a Commission</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
