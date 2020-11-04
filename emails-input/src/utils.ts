/*
 *  Helper functions
 */
export function fadeOut(el: any, cb?: () => void) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = 'none';
      cb();
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

export function fadeIn(el: any, display: string = 'block') {
  el.style.opacity = 0;
  el.style.display = display;
  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = `${val}`;
      requestAnimationFrame(fade);
    }
  })();
}

export function randomEmailGenerator(): string {
  return `${
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5)
  }@test.com`;
}
