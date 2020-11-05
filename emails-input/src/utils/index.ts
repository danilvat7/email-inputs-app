/*
 *  Helper functions
 */
export function fadeOut(el: any, cb?: () => void): void {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = 'none';
      cb && cb();
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

export function fadeIn(el: any, display: string = 'block'): void {
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
  return `${randomString()}@test.com`;
}

export function randomString(): string {
  return (
    Math.random().toString(36).substring(2, 5) +
    Math.random().toString(36).substring(2, 5)
  );
}

export function triggerEvent(el: Element, type: string): void {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, false, true);
  el.dispatchEvent(e);
}

// IE11 compatibility
export function isTargetKeyPressed(event: KeyboardEvent): boolean {
  const { code, keyCode } = event;
  if (event.code) {
    return code === 'Enter' || code === 'Comma';
  } else {
    return keyCode === 13 || keyCode === 188;
  }
}
