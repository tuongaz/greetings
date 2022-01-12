export function rgb2hex(rgb: string): string {
  const values = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  function hex(x: string) {
    return `0${parseInt(x, 10).toString(16)}`.slice(-2);
  }

  if (values === null) {
    return '';
  }

  return `#${hex(values[1])}${hex(values[2])}${hex(values[3])}`;
}

export function pxToInt(px: string): number {
  return parseInt(px.replace('px', ''), 10);
}
