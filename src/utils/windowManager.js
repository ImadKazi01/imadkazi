/**
 * Window Management Utilities for ImadOS
 * Handles app state management, opening, closing, minimizing, etc.
 */

// Content-based window sizing - Optimized for each window type
const contentSizes = {
  about: { width: 900, height: 600 }, // Contact card - compact but readable
  work: { width: 1200, height: 700 }, // Finder-style - needs space for grid/list
  services: { width: 1000, height: 650 }, // System Preferences - sidebar + content
  contact: { width: 1000, height: 700 }, // Mail.app - form + sidebar
  resume: { width: 1200, height: 800 } // Preview.app - document viewing
}

export const appConfigs = {
  about: {
    id: 'about',
    title: 'About Imad',
    icon: '/favicon-32x32.png',
    width: contentSizes.about.width,
    height: contentSizes.about.height
  },
  work: {
    id: 'work',
    title: 'My Work',
    icon: '/favicon-32x32.png',
    width: contentSizes.work.width,
    height: contentSizes.work.height
  },
  services: {
    id: 'services',
    title: 'Services',
    icon: '/favicon-32x32.png',
    width: contentSizes.services.width,
    height: contentSizes.services.height
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: '/favicon-32x32.png',
    width: contentSizes.contact.width,
    height: contentSizes.contact.height
  },
  resume: {
    id: 'resume',
    title: 'Resume',
    icon: '/favicon-32x32.png',
    width: contentSizes.resume.width,
    height: contentSizes.resume.height
  }
}

/**
 * Open an app - either restore existing or create new
 */
export function openApp(appId, openApps, activeApp) {
  const existing = openApps.value.find((a) => a.id === appId)
  if (existing) {
    existing.visible = true
    existing.active = true
    activeApp.value = existing.title
    // Set all other apps as inactive
    openApps.value.forEach((app) => {
      if (app.id !== appId) app.active = false
    })
    return
  }

  const config = appConfigs[appId]
  if (config) {
    // Center the window on screen
    const centerX = Math.max(0, (window.innerWidth - config.width) / 2)
    const centerY = Math.max(38, (window.innerHeight - config.height) / 2)

    const newApp = {
      ...config,
      x: centerX,
      y: centerY,
      visible: true,
      maximized: false,
      minimized: false,
      active: true
    }
    // Set all other apps as inactive
    openApps.value.forEach((app) => {
      app.active = false
    })
    openApps.value.push(newApp)
    activeApp.value = newApp.title
  }
}

/**
 * Set a window as the active window
 */
export function setActiveWindow(appId, openApps, activeApp) {
  const app = openApps.value.find((a) => a.id === appId)
  if (app && app.visible) {
    // Set all apps as inactive
    openApps.value.forEach((a) => (a.active = false))
    // Set this app as active
    app.active = true
    activeApp.value = app.title
  }
}

/**
 * Close an app
 */
export function closeApp(appId, openApps, activeApp) {
  const app = openApps.value.find((a) => a.id === appId)
  if (app) {
    app.visible = false
    app.active = false
    // Reset to ImadOS if this was the active app
    if (activeApp.value === app.title) {
      activeApp.value = 'ImadOS'
    }
  }
}

/**
 * Minimize an app
 */
export function minimizeApp(appId, openApps, activeApp, minimizedApps) {
  const app = openApps.value.find((a) => a.id === appId)
  if (app) {
    app.visible = false
    app.minimized = true
    app.active = false
    if (!minimizedApps.value.includes(appId)) {
      minimizedApps.value.push(appId)
    }
    // Reset to ImadOS if this was the active app
    if (activeApp.value === app.title) {
      activeApp.value = 'ImadOS'
    }
  }
}

/**
 * Restore a minimized app
 */
export function restoreApp(appId, openApps, activeApp, minimizedApps) {
  const app = openApps.value.find((a) => a.id === appId)
  if (app) {
    app.visible = true
    app.minimized = false
    app.active = true
    minimizedApps.value = minimizedApps.value.filter((id) => id !== appId)
    // Set all other apps as inactive
    openApps.value.forEach((a) => {
      if (a.id !== appId) a.active = false
    })
    activeApp.value = app.title
  }
}

/**
 * Maximize/restore an app
 */
export function maximizeApp(appId, isMaximized, openApps) {
  const app = openApps.value.find((a) => a.id === appId)
  if (app) {
    app.maximized = isMaximized
    console.log(`App ${appId} maximized: ${isMaximized}`) // Debug log
  }
}

/**
 * Move an app to new position
 */
export function moveApp(appId, position, openApps) {
  const app = openApps.value.find((a) => a.id === appId)
  if (app) {
    app.x = position.x
    app.y = position.y
  }
}

/**
 * Resize an app
 */
export function resizeApp(appId, size, openApps) {
  const app = openApps.value.find((a) => a.id === appId)
  if (app) {
    app.width = size.width
    app.height = size.height
  }
}
