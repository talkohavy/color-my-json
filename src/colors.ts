const color = (num: number) => `\x1b[${num}m`;

export const COLORS = {
  // Styles
  bold: color(1),
  italic: color(3),
  underline: color(4), // <--- either underline or upperline, not both
  strikethrough: color(9),
  upperline: color(53),
  // Foreground colors
  lightGray: color(30),
  red: color(31),
  green: color(32),
  yellow: color(33),
  blue: color(34),
  magenta: color(35),
  cyan: color(36),
  white: color(37),
  // Background colors
  bgBlack: color(40),
  bgRed: color(41),
  bgGreen: color(42),
  bgYellow: color(43),
  bgBlue: color(44),
  bgMagenta: color(45),
  bgCyan: color(46),
  bgWhite: color(47),
  // Effects
  dim: color(2),
  inverse: color(7),
  hidden: color(8),
  // Reset
  stop: '\x1b[0m',
};
