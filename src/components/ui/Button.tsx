import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;

  /** Override the default horizontal padding */
  paddingX?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface",
};

export default function Button({
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  className = "",
  fullWidth = false,
  paddingX = "px-4",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg ${paddingX} font-medium transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
        fullWidth ? "w-full" : "w-fit"
      } ${variants[variant]} ${className}`}
      {...props}
    >
      {leftIcon && (
        <span className="flex items-center">{leftIcon}</span>
      )}

      <span>{children}</span>

      {rightIcon && (
        <span className="flex items-center">{rightIcon}</span>
      )}
    </button>
  );
}