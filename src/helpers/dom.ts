export function isPartOfNode(
  target: HTMLElement | null,
  root: HTMLElement | null,
): boolean {
  if (!root || !target) return false;
  return root === target || root.contains(target);
}
