import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing screen wake lock
 * Prevents screen from sleeping during workouts
 */
export const useWakeLock = () => {
  const wakeLockRef = useRef(null);

  useEffect(() => {
    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLockRef.current = await navigator.wakeLock.request('screen');
          console.log('Wake lock activated');
          
          // Re-acquire wake lock when page becomes visible again
          const handleVisibilityChange = async () => {
            if (wakeLockRef.current !== null && document.visibilityState === 'visible') {
              try {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
                console.log('Wake lock re-acquired');
              } catch (err) {
                console.warn('Wake lock re-acquisition failed:', err);
              }
            }
          };
          
          document.addEventListener('visibilitychange', handleVisibilityChange);
          
          // Store the cleanup function
          wakeLockRef.current.cleanup = () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
          };
        } else {
          // Fallback for older browsers - use video element trick
          console.log('Wake Lock API not supported, using video fallback');
          const video = document.createElement('video');
          video.setAttribute('muted', '');
          video.setAttribute('playsinline', '');
          video.style.position = 'fixed';
          video.style.top = '-1px';
          video.style.left = '-1px';
          video.style.width = '1px';
          video.style.height = '1px';
          video.style.opacity = '0';
          video.style.pointerEvents = 'none';
          
          // Create a minimal video data URL
          video.src = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMWF2YzEAAAAIZnJlZQAAAr1tZGF0AAACrgYF//+q3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOWE1OTAzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEwIHNjZW5lY3V0PTQwIGludHJhX3JlZnJlc2g9MCByY19sb29rYWhlYWQ9NDAgcmM9Y3JmIG1idHJlZT0xIGNyZj0yMy4wIHFjb21wPTAuNjAgcXBtaW49MCBxcG1heD02OSBxcHN0ZXA9NCBpcF9yYXRpbz0xLjQwIGFxPTE6MS4wMACAAAAAD2WIhAA3//728P4FNjuZQQAAAu5tb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAAZAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////v7/AAAF+XRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAA';
          
          document.body.appendChild(video);
          video.play().catch(() => {
            console.log('Video fallback failed');
          });
          
          // Store reference for cleanup
          wakeLockRef.current = {
            release: () => {
              if (video.parentNode) {
                video.parentNode.removeChild(video);
              }
            },
            cleanup: () => {}
          };
        }
      } catch (err) {
        console.warn('Wake lock failed:', err);
      }
    };

    requestWakeLock();

    return () => {
      if (wakeLockRef.current) {
        if (wakeLockRef.current.cleanup) {
          wakeLockRef.current.cleanup();
        }
        wakeLockRef.current.release().catch(err => {
          console.warn('Wake lock release failed:', err);
        });
      }
    };
  }, []);

  return {
    isActive: !!wakeLockRef.current
  };
}; 