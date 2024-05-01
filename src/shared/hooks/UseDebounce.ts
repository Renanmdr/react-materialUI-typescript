import { useCallback, useRef } from 'react';


export const useDebounce = (delay = 400, notDelayInfirstTime = true) => {
  const debouncing = useRef<number>();
  const isFirstTime = useRef(notDelayInfirstTime);

  const debounce = useCallback((func: () => void) => {
    if(isFirstTime.current){
      isFirstTime.current = false;
      func();
    }else{
      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }

      debouncing.current = setTimeout(() => {
        func();
      }, delay);
    }
   

  }, [delay]);

  return {debounce};
};