'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Recycle, 
  Package,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { signOut } from "@/app/actions/auth";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/food-donors", icon: Users, label: "Food Donors" },
  { href: "/collection-centers", icon: Building2, label: "Collection Centers" },
  { href: "/waste-processors", icon: Recycle, label: "Waste Processors" },
  { href: "/food-waste-items", icon: Package, label: "Food Waste Items" },
];

// Sidebar Content Component (reused for both desktop and mobile)
const SidebarContent = ({ 
  pathname, 
  closeMobileMenu,
  handleSignOut 
}: { 
  pathname: string; 
  closeMobileMenu: () => void;
  handleSignOut: () => Promise<void>;
}) => {
  // Get user initial (you can make this dynamic later)
  const userInitial = "D";
  const userName = "Donald Kisaka";
  const userEmail = "kisakadonald1@gmail.com";

  return (
    <>
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-2" onClick={closeMobileMenu}>
          <Image src="/foodlogo.png" alt="Logo" width={40} height={40} />
          <span className="font-bold text-lg">Food Waste</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobileMenu}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-600 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          {/* User Avatar */}
          <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-semibold">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
        </div>
        
        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );
};

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header - Visible only on mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-16">
        <div className="flex items-center justify-between h-full px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image src="/foodlogo.png" alt="Logo" width={32} height={32} />
            <span className="font-bold text-lg">Food Waste</span>
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar - Slide in from left */}
      <aside
        className={`
          lg:hidden fixed left-0 top-16 bottom-0 z-50 w-64 bg-white border-r border-gray-200 
          flex flex-col transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <SidebarContent 
          pathname={pathname} 
          closeMobileMenu={closeMobileMenu}
          handleSignOut={handleSignOut}
        />
      </aside>

      {/* Desktop Sidebar - Always visible on large screens */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex-col">
        <SidebarContent 
          pathname={pathname} 
          closeMobileMenu={closeMobileMenu}
          handleSignOut={handleSignOut}
        />
      </aside>
    </>
  );
};

export default Navigation;
