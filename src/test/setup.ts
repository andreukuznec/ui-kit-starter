import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserverStub
}

// jsdom has no layout. Recharts reads getBoundingClientRect() after mount and
// overwrites initialDimension with 0×0, which logs a noisy width/height warning.
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect
Element.prototype.getBoundingClientRect = function getBoundingClientRect() {
  if (this instanceof HTMLElement && this.classList.contains("recharts-responsive-container")) {
    return {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 800,
      bottom: 208,
      width: 800,
      height: 208,
      toJSON() {
        return {}
      },
    }
  }
  return originalGetBoundingClientRect.call(this)
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent() {
      return false
    },
  }),
})

if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

HTMLCanvasElement.prototype.getContext = () => null

afterEach(() => {
  cleanup()
})
