import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type CardVariant = "default" | "outlined" | "soft";
type CardPadding = "sm" | "md" | "lg";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
}

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default: "bg-white shadow-sm border border-gray-200",
  outlined: "bg-white border border-gray-300",
  soft: "bg-gray-50 border border-gray-200",
};

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-5",
  lg: "p-5 sm:p-7",
};

const Card = ({
  children,
  className,
  variant = "default",
  padding = "md",
  hoverable = false,
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-200 space-y-2",
        variantStyles[variant],
        paddingStyles[padding],
        hoverable && "hover:shadow-md hover:-translate-y-[1px]",
        className
      )}
    >
      {children}
    </div>
  );
};

/* ---------- Sub Components ---------- */

const CardHeader = ({ children, className }: CardSectionProps) => (
  <div
    className={cn(
      "mb-3 flex items-center justify-between border-b border-gray-200 pb-2",
      className
    )}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className }: CardSectionProps) => (
  <h3
    className={cn(
      "text-base sm:text-lg font-semibold text-gray-900",
      className
    )}
  >
    {children}
  </h3>
);

/* ---------- Attach & Export ---------- */

Card.Header = CardHeader;
Card.Title = CardTitle;

export { Card };
export default Card;
