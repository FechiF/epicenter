import { useEffect } from 'react';

export function useKey(keyCode, keyCallback) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code.toLowerCase() === keyCode.toLowerCase()) {
          keyCallback();
        }
      }

      document.addEventListener('keydown', callback);

      return function () {
        document.removeEventListener('keydown', callback);
      };
    },
    [keyCode, keyCallback]
  );
}
