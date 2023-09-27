import * as React from "react";
import { mergeClassesUtils } from "@/utils/mergeClassesUtils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  addonLeft?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ addonLeft, disabled, className, type, ...props }, ref) => {
    return (
      <div className="relative">
        {addonLeft && (
          <div
            className={mergeClassesUtils(
              "pointer-events-none absolute inset-y-0 left-0 left-3 flex items-center",
              disabled && "opacity-40",
            )}
          >
            <span className="text-gray-500 sm:text-sm">{addonLeft}</span>
          </div>
        )}
        <input
          disabled={disabled}
          type={type}
          className={mergeClassesUtils(
            "color-state-900 flex h-9 w-full rounded-lg border border-gray-400 bg-gray-300 px-3 py-2 text-sm placeholder:text-slate-800 focus:border-blue-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
            addonLeft && "px-9",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);
