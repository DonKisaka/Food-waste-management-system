import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavLinkProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    isActive?: boolean;
}

const Navlink = ({ href, icon, label, isActive }: NavLinkProps) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
        isActive 
          ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:shadow-sm"
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
      )}
      
      <span className={cn(
        "transition-colors duration-200 flex-shrink-0",
        isActive 
          ? "text-blue-600" 
          : "text-slate-400 group-hover:text-slate-600"
      )}>
        {icon}
      </span>
      
      <span className="hidden md:inline font-medium tracking-wide">
        {label}
      </span>
      
      {/* Hover effect background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl",
        isActive && "opacity-100"
      )}></div>
    </Link>
  )
}

export default Navlink;
