import { COLORS } from './colors.js';
import { TokenTypeWithLevels, tokenize } from './tokenizer.js';

export type ColorTheme = Record<TokenTypeWithLevels, string>;

const defaultTheme: ColorTheme = {
  Whitespace: COLORS.black,
  Brace0: COLORS.yellow,
  Brace1: COLORS.magenta,
  Brace2: COLORS.blue,
  Bracket0: COLORS.yellow,
  Bracket1: COLORS.magenta,
  Bracket2: COLORS.blue,
  Colon: COLORS.black,
  Comma: COLORS.black,
  StringKey: COLORS.cyan,
  StringLiteral: COLORS.green,
  NumberLiteral: COLORS.yellow,
  BooleanLiteral: COLORS.blue,
  NullLiteral: COLORS.bold,
};

const defaultOptions: ColorizeOptions = {
  colors: defaultTheme,
};

export type ColorizeOptions = {
  colors?: ColorTheme;
  indent?: number;
  isPretty?: boolean;
};

export function colorizeJson(jsonStr: string, options: ColorizeOptions = {}) {
  const { colors, indent = 2, isPretty } = options;

  if (typeof jsonStr !== 'string') {
    throw new TypeError('Input must be a string');
  }

  const updatedJsonStr = isPretty ? JSON.stringify(JSON.parse(jsonStr), null, indent) : jsonStr;

  const tokens = tokenize(updatedJsonStr);

  const theme: Record<TokenTypeWithLevels, any> = {
    ...defaultOptions.colors!,
    ...colors,
  };

  return tokens.reduce((output, token) => `${output}${theme[token.type]}${token.value}${COLORS.stop}`, '');
}
