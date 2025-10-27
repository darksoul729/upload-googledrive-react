import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 🎨 Variants styling
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/30",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-sm hover:from-red-500 hover:to-red-400 hover:shadow-red-500/30",
        outline:
          "border border-slate-500/50 bg-transparent text-slate-200 hover:bg-slate-800/60 hover:text-white transition",
        secondary:
          "bg-gradient-to-r from-slate-700 to-slate-600 text-slate-100 hover:from-slate-600 hover:to-slate-500",
        ghost:
          "bg-transparent hover:bg-slate-800/40 text-slate-200 hover:text-white",
        link: "text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2.5 text-sm",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "relative overflow-hidden group",
          buttonVariants({ variant, size, className })
        )}
        ref={ref}
        {...props}
      >
        {/* ✨ Efek hover cahaya */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
        {props.children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
