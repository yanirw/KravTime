import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary mobile-optimized",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-primary transition-all ease-out progress-smooth"
      style={{ 
        width: `${value || 0}%`,
        transitionDuration: '100ms',
        willChange: 'width'
      }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress }; 