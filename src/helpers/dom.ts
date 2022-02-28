export function isPartOfNode(
  target: HTMLElement | null,
  root: HTMLElement | null,
): boolean {
  if (!root || !target) return false;
  return root === target || root.contains(target);
}

export function getScrollBarWidth(): number {
  // https://learn.javascript.ru/task/scrollbar-width
  // создадим элемент с прокруткой
  const div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';

  // мы должны вставить элемент в документ, иначе размеры будут равны 0
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;

  div.remove();
  return scrollWidth;
}

export function disableScroll() {
  if (isBodyScroll()) {
    document.body.style.paddingRight = getScrollBarWidth() + 'px';
  }
  document.body.style.overflow = 'hidden';
}

export function enableScroll() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

export function isBodyScroll() {
  return window.innerWidth > document.body.clientWidth;
}
