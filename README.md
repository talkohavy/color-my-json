# Color My JSON

Welcome to **Color My JSON**! 🎨✨

This package provides a single, easy-to-use function that allows you to colorize your JSON strings for beautiful and readable output in your terminal. The colors are inspired by the vibrant and familiar themes of Visual Studio Code, making your terminal output feel right at home.

## Features

- 🌈 **Colorful Output**: Adds colors to your JSON keys, values, and structures for better readability.
- ⚡ **Customizable Themes**: Use the default theme or provide your own color scheme.
- 🚀 **Fast**: We're not using neither `JSON.parse` nor `JSON.stringify` under the hood. We' all about the colors. You provide the stringified JSON, and we simply color it.
- 🖥️ **VS Code-Inspired Colors**: Default colors are designed to match the look and feel of VS Code.

## Installation

Install the package using your favorite package manager:

```bash
# Using npm
npm install color-my-json

# Using pnpm
pnpm add color-my-json

# Using yarn
yarn add color-my-json
```

## Usage

Here's how you can use the `colorMyJson` function:

```ts
import { colorMyJson } from 'color-my-json';

const json = JSON.stringify({
  name: 'Color My JSON',
  version: '1.0.0',
  features: ['Colorful Output', 'Customizable Themes', 'Pretty Print'],
});

const coloredOutput = colorMyJson(json);

console.log(coloredOutput);
```

## Example Output

```json
{
  "name": "Color My JSON",
  "version": "1.0.0",
  "features": [
    "Colorful Output",
    "Customizable Themes",
    "Pretty Print"
  ]
}
```

But with beautiful colors! 🎉

## Why Use Color My JSON?

- **Improved Readability**: Quickly scan and understand JSON output.
- **Debugging Made Easy**: Spot issues in your JSON structure at a glance.
- **Aesthetic Appeal**: Bring a touch of VS Code's style to your terminal.

Happy coding! 🚀

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests on [GitHub](https://github.com/talkohavy/color-my-json).

## License

This project is licensed under the MIT License.
