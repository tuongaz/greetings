const colors = [
  '#e53935',
  '#d81b60',
  '#8e24aa',
  '#5e35b1',
  '#3949ab',
  '#1e88e5',
  '#039be5',
  '#00acc1',
  '#00897b',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#fbc02d',
  '#ffb300',
  '#fb8c00',
  '#f4511e',
  '#6d4c41',
  '#757575',
  '#546e7a',
  '#000000'
];

const fonts = [
  ['Courier New', 'I am going to miss you'],
  ['Times New Roman', 'I am going to miss you'],
  ['Arial', 'I am going to miss you'],
  ['Verdana', 'I am going to miss you'],
  ['Georgia', 'I am going to miss you'],
  ['Architects Daughter', 'I am going to miss you'],
  ['Gochi Hand', 'I am going to miss you'],
  ['Grand Hotel', 'I am going to miss you']
];

function getFont(): string {
  const idx = Math.floor(Math.random() * fonts.length);
  return fonts[idx][0];
}

function getColor(): string {
  const idx = Math.floor(Math.random() * colors.length);
  return colors[idx];
}

export { colors, fonts, getFont, getColor };
