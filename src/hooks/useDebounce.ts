import { useCallback, useRef } from "react";

export const useDebounce = <F extends (...args: any[]) => void>(func: F, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFunction = useCallback(
    (...args: Parameters<F>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay],
  );

  return debouncedFunction as F;
};
