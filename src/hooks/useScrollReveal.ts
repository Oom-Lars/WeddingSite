import { useRef, useCallback } from 'react'

/**
 * useScrollReveal — one-shot IntersectionObserver ref callback.
 *
 * When the returned ref callback is attached to a DOM element, the hook
 * observes that element and adds the CSS class `reveal--visible` the first
 * time it enters the viewport.  The observer is then disconnected so the
 * class is added at most once per mount cycle (Requirements 13.1, 13.2).
 *
 * When the component unmounts React calls the ref callback with `null`,
 * which disconnects the observer and prevents memory leaks (Requirement 13.3).
 *
 * @param options - Optional IntersectionObserverInit overrides.
 *                  Defaults to `{ threshold: 0.15 }`.
 * @returns A stable ref callback to attach to the target element.
 */
function useScrollReveal<T extends Element>(
  options?: IntersectionObserverInit
): (node: T | null) => void {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const refCallback = useCallback(
    (node: T | null) => {
      // Disconnect any previously created observer first
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
      }

      // When the component unmounts React passes null — nothing more to do
      if (node === null) return

      // Create a new observer for the incoming node
      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
            // One-shot: disconnect immediately after the class is added
            observerRef.current?.disconnect()
          }
        },
        { threshold: 0.15, ...options }
      )

      observerRef.current.observe(node)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return refCallback
}

export { useScrollReveal }
export default useScrollReveal
