/**
 * @param callback - the function to run after onDocumentLoad
 * @param delay wait X milliseconds after onDocumentLoad
 */
export const onDocumentLoad = (callback: Function, delay = 1) => {
  // missed the load event, run now
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay)
  } else {
    window.addEventListener('load', function () {
      setTimeout(() => callback(), delay)
    })
  }
}

/**
 * @param callback - the function to run after onDocumentLoad
 * @param delay wait X milliseconds after onDocumentLoad
 */
export const onMountedDocumentLoad = (callback: Function, delay = 1) => {
  onMounted(() => {
    onDocumentLoad(callback, delay)
  })
}
