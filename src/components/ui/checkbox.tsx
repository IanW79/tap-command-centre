import * as React from "react"

// Simple utility function to replace cn
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    style={{
      width: '16px',
      height: '16px',
      borderRadius: '4px',
      border: '2px solid #2563eb',
      cursor: 'pointer',
      marginRight: '8px'
    }}
    {...props}
  />
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
