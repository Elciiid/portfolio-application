import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary:
      "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]",
    secondary:
      "border border-[#7C3AED] text-[#A78BFA] hover:bg-[#7C3AED] hover:text-white",
    ghost:
      "text-[#6B7280] hover:text-[#F0F0FA] hover:bg-[#111118]",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-5 py-2.5",
    lg: "text-base px-7 py-3.5",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
