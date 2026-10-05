import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex max-w-full items-center rounded-none border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider transition-colors truncate",
  {
    variants: {
      variant: {
        default: "border-foreground bg-foreground text-background",
        secondary: "border-border bg-background text-muted",
        outline: "border-border text-muted",
      },
    },
    defaultVariants: { variant: "secondary" },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
