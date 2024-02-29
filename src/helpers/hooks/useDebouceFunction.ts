import { useCallback, useEffect, useRef, useState } from "react";

export default function useDebounceFunction<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timer = useRef<number | null>(null);

  const debounceCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;

  return debounceCallback;
}
