'use client';

import Link from 'next/link';
import { use, useState, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Home, LogOut, Menu, Sparkles, Mail, DollarSign, HomeIcon, BookOpen, FileText } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function NavigationLinks({ onClick, isMobile = false }: { onClick?: () => void; isMobile?: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Accueil', icon: HomeIcon },
    { href: '/features', label: 'Fonctionnalités', icon: Sparkles },
    { href: '/docs', label: 'Documentation', icon: BookOpen },
    { href: '/blog', label: 'Blog', icon: FileText },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/pricing', label: 'Prix', icon: DollarSign },
  ];

  if (isMobile) {
    return (
      <>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#003463] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={onClick}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors relative ${
              isActive
                ? 'text-[#003463]'
                : 'text-gray-700 hover:text-gray-900'
            }`}
            onClick={onClick}
          >
            {item.label}
            {isActive && (
              <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-[#003463]" />
            )}
          </Link>
        );
      })}
    </>
  );
}

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: user } = useSWR<User>('/api/user', fetcher);
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    mutate('/api/user');
    router.push('/');
  }

  function handleDashboardClick() {
    setIsMenuOpen(false);
    router.push('/dashboard');
  }

  if (!user) {
    return (
      <Button asChild className="rounded-full">
        <Link href="/sign-up">S'inscrire</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback>
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem onClick={handleDashboardClick} className="cursor-pointer">
          <Home className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <form action={handleSignOut} className="w-full">
          <button type="submit" className="flex w-full">
            <DropdownMenuItem className="w-full flex-1 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Se déconnecter</span>
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Muslim Guard"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="ml-2 text-xl font-semibold text-gray-900">Muslim Guard</span>
        </Link>

        {/* Navigation Desktop - cachée sur mobile */}
        <nav className="hidden md:flex items-center space-x-6">
          <NavigationLinks />
        </nav>

        {/* Boutons droite */}
        <div className="flex items-center space-x-4">
          {/* Menu burger mobile - visible uniquement sur mobile */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col h-full">
                {/* Header du menu */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2 mt-3 px-3">
                    <Image
                      src="/images/logo.png"
                      alt="Muslim Guard"
                      width={28}
                      height={28}
                      className="h-7 w-7"
                    />
                    <span className="text-lg font-semibold text-gray-900">Menu</span>
                  </div>
                  <p className="text-xs text-gray-500 px-3">Navigation rapide</p>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col space-y-2 flex-1">
                  <NavigationLinks onClick={() => setIsMenuOpen(false)} isMobile={true} />
                </nav>

                {/* Footer du menu */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    © 2024 Muslim Guard
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* UserMenu (Avatar ou S'inscrire) */}
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col min-h-screen">
      <Header />
      {children}
    </section>
  );
}
