import { DEFAULT_DEBOUNCE_TIME } from "@/commons"


export function useDebounce () {
  
    function createDebounce() {
        let timeout: NodeJS.Timeout;
        return function (fnc: Function, delayMs?: number) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            fnc();
          }, delayMs ?? DEFAULT_DEBOUNCE_TIME);
        };
      }
  
  return {
    debounce: createDebounce()
  }
}
