/**
 * Window Interaction Utilities for AppWindow
 * Handles drag, resize, and other window interactions
 */

/**
 * Create drag handlers that work with reactive state
 */
export function createDragHandlers(windowRef, props, isDragging, dragStart, emit) {
  function startDrag(e) {
    if (e.target.closest('.traffic-lights')) return
    isDragging.value = true
    dragStart.value = {
      x: e.clientX - (parseInt(windowRef.value.style.left) || props.x),
      y: e.clientY - (parseInt(windowRef.value.style.top) || props.y)
    }
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }

  function onDrag(e) {
    if (!isDragging.value) return
    const newX = e.clientX - dragStart.value.x
    const newY = e.clientY - dragStart.value.y
    windowRef.value.style.left = Math.max(0, newX) + 'px'
    windowRef.value.style.top = Math.max(38, newY) + 'px'
    emit('move', { x: newX, y: newY })
  }

  function stopDrag() {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDrag)
  }

  return { startDrag, onDrag, stopDrag }
}

/**
 * Create resize handlers that work with reactive state
 */
export function createResizeHandlers(windowRef, props, isResizing, resizeStart, isMaximized, emit) {
  function startResize(e) {
    if (isMaximized.value) return
    isResizing.value = true
    resizeStart.value = {
      x: e.clientX,
      y: e.clientY,
      width: parseInt(windowRef.value.style.width) || props.width,
      height: parseInt(windowRef.value.style.height) || props.height
    }
    document.addEventListener('mousemove', onResize)
    document.addEventListener('mouseup', stopResize)
  }

  function onResize(e) {
    if (!isResizing.value) return
    const newWidth = Math.max(300, resizeStart.value.width + (e.clientX - resizeStart.value.x))
    const newHeight = Math.max(200, resizeStart.value.height + (e.clientY - resizeStart.value.y))
    windowRef.value.style.width = newWidth + 'px'
    windowRef.value.style.height = newHeight + 'px'
    emit('resize', { width: newWidth, height: newHeight })
  }

  function stopResize() {
    isResizing.value = false
    document.removeEventListener('mousemove', onResize)
    document.removeEventListener('mouseup', stopResize)
  }

  return { startResize, onResize, stopResize }
}

/**
 * Create maximize handler with animation
 */
export function createMaximizeHandler(isMaximized, windowRef, emit) {
  function onMaximize() {
    if (isMaximized.value) {
      isMaximized.value = false
      emit('maximize', false)
    } else {
      isMaximized.value = true
      emit('maximize', true)
      // Trigger animation
      setTimeout(() => {
        if (windowRef.value) {
          windowRef.value.classList.add('maximizing')
          setTimeout(() => {
            windowRef.value.classList.remove('maximizing')
          }, 300)
        }
      }, 10)
    }
  }

  return { onMaximize }
}

/**
 * Simple event handlers for traffic lights
 */
export function createTrafficLightHandlers(emit) {
  function onClose() {
    emit('close')
  }

  function onMinimize() {
    emit('minimize')
  }

  return { onClose, onMinimize }
}

/**
 * Initialize window position on mount
 */
export function initializeWindowPosition(windowRef, props) {
  if (windowRef.value) {
    windowRef.value.style.left = props.x + 'px'
    windowRef.value.style.top = props.y + 'px'
  }
}
