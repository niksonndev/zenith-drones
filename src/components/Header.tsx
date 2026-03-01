'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from '@heroui/react';
import { Search, ShoppingBag, User } from 'lucide-react';
import { useBasketStore } from '@/store/useBasketStore';
import Logo from './Logo';

const navLinks = [
  { label: 'Product', href: '#' },
  { label: 'Explore', href: '#' },
  { label: 'Support', href: '#' },
  { label: 'Business', href: '#' },
];

export default function Header() {
  const session = false;
  const items = useBasketStore((state) => state.items);

  return (
    <Navbar
      isBlurred
      maxWidth="xl"
      className="bg-white/70 backdrop-blur-md backdrop-saturate-150"
      classNames={{
        base: 'fixed top-0 left-0 right-0 z-50 border-b border-white/20',
      }}>
      <NavbarContent justify="start">
        <NavbarMenuToggle className="sm:hidden" aria-label="Abrir menu" />
        <NavbarBrand>
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-3 opacity-90 transition hover:opacity-100">
            <Logo width={40} height={40} className="text-[#232428]" />
            <span className="logoText font-medium tracking-[0.2em] text-[#232428]">
              Zenith Drones
            </span>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="hidden gap-8 md:flex">
        {navLinks.map((link) => (
          <NavbarItem key={link.label}>
            <Link
              href={link.href}
              className="text-[#232428] opacity-75 transition hover:opacity-100">
              {link.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end" className="flex gap-2">
        <NavbarItem>
          <Button isIconOnly variant="light" aria-label="Buscar" className="text-[#232428]">
            <Search className="h-5 w-5" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/checkout"
            className="relative flex items-center justify-center rounded-full p-2 text-[#232428] transition hover:bg-default-100"
            aria-label="Carrinho">
            {items.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px] font-medium text-white">
                {items.length}
              </span>
            )}
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          {session ? (
            <Image
              src="/avatar-placeholder.png"
              alt="Avatar"
              width={34}
              height={34}
              className="cursor-pointer rounded-full"
            />
          ) : (
            <Button isIconOnly variant="light" aria-label="Usuário" className="text-[#232428]">
              <User className="h-5 w-5" />
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-white/80 backdrop-blur-md">
        {navLinks.map((link) => (
          <NavbarMenuItem key={link.label}>
            <Link href={link.href} className="w-full text-[#232428]">
              {link.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
