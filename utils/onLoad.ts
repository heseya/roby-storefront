/**
 * @param callback - the function to run after onLoad
 * @param delay wait X milliseconds after onLoad
 */
export const onLoad = (callback: Function, delay = 1) => {
  // missed the load event, run now
  if (document.readyState === 'complete') {
    setTimeout(() => callback(), delay)
  } else {
    window.addEventListener('load', function () {
      setTimeout(() => callback(), delay)
    })
  }
}
