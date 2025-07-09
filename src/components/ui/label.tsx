import * as React from "react"

// Simple utility function to replace cn
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    style={{
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '1',
      display: 'block',
      marginBottom: '8px',
      color: '#374151'
    }}
    {...props}
  />
))
Label.displayName = "Label"

export { Label }
