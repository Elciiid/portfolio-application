import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  className?: string;
}

export default function Tag({ label, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium",
        "bg-[#111118] border border-[#1E1E2E] text-[#A78BFA]",
        "hover:border-[#7C3AED] hover:text-[#F0F0FA] transition-colors duration-200",
        className
      )}
    >
      {label}
    </span>
  );
}
