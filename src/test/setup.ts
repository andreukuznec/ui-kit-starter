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

// Radix and cmdk issue pointer capture calls that jsdom does not implement.
const capturedPointers = new Map<number, Element>()

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = function hasPointerCapture(pointerId: number) {
    return capturedPointers.get(pointerId) === this
  }
}
if (!Element.prototype.setPointerCapture) {
  Element.prototype.setPointerCapture = function setPointerCapture(pointerId: number) {
    capturedPointers.set(pointerId, this)
  }
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = function releasePointerCapture(pointerId: number) {
    if (capturedPointers.get(pointerId) === this) {
      capturedPointers.delete(pointerId)
    }
  }
}

if (typeof window.PointerEvent === "undefined") {
  class PointerEventStub extends MouseEvent {
    pointerId = 1
    constructor(type: string, params: MouseEventInit = {}) {
      super(type, params)
    }
  }
  window.PointerEvent = PointerEventStub as typeof PointerEvent
}

HTMLCanvasElement.prototype.getContext = () => null

afterEach(() => {
  capturedPointers.clear()
  cleanup()
  // Radix portals mount on document.body. Presence can leave focus guards
  // behind in jsdom when close animations never fire.
  document.body.innerHTML = ""
  document.body.removeAttribute("style")
})
