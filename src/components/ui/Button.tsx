import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseStyles =
  "inline-flex items-center cursor-pointer justify-center rounded-lg font-medium transition-colors " +
  "focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400",

  outline:
    "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-400",

  ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-400",

  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && "w-full",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
export { Button };
