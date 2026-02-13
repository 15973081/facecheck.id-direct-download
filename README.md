<h1 align="center">FaceCheck Direct Download</h1>

English / [简体中文](./README_CN.md)

<a href="https://github.com/15973081/facecheck.id-direct-download" target="_blank">
  <img src="https://img.shields.io/github/stars/15973081/facecheck.id-direct-download?style=social" alt="GitHub stars">
</a>
<a href="https://github.com/15973081/facecheck.id-direct-download/issues">
  <img src="https://img.shields.io/github/issues/15973081/facecheck.id-direct-download" alt="issues">
</a>
<a href="https://github.com/15973081/facecheck.id-direct-download/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/15973081/facecheck.id-direct-download" alt="license">
</a>

**Hover on FaceCheck.id base64 previews → one-click Download & Yandex Jump. Free & lightweight Tampermonkey script.**

[Install Script](https://raw.githubusercontent.com/15973081/facecheck.id-direct-download/main/facecheck.user.js) · [Greasy Fork (Coming Soon)](#) · [Report Issue](https://github.com/15973081/facecheck-id-direct-download-yandex/issues) · [Contributing Guide](#contributing)

## Features

- Hover over base64 preview images on results page → auto-show **Download** (direct save original image) and **Yandex Jump** (quick open Yandex reverse search) buttons
- One-click save full .webp image, no redirect, no need to pay for large view
- Works on desktop & mobile (long-press to simulate hover on touch devices)
- Lightweight, zero dependencies — pure native JS + MutationObserver
- Buttons float at bottom-right, clean and non-intrusive
- Automatically handles dynamic / lazy-loaded results

## Installation (30 seconds)

1. Install a userscript manager:
    - [Tampermonkey](https://www.tampermonkey.net/) (Chrome/Edge/Firefox)
    - For mobile: Kiwi Browser + Tampermonkey recommended

2. Install the script directly:
    - Click → [Raw install link](https://raw.githubusercontent.com/15973081/facecheck.id-direct-download/main/facecheck.user.js)  
      (Browser will redirect to Tampermonkey install page → confirm installation)

3. Visit https://facecheck.id, upload an image to search → hover any preview thumbnail to test!
   ![演示](image/use.gif)

**Tip**: If FaceCheck updates break the buttons, please report in Issues — we'll fix it quickly.

## Why This Script?

Since 2024, FaceCheck.id has paywalled many full-image features, hiding originals behind base64 previews. This script focuses on **direct one-click download** + **Yandex quick jump**, making it more practical than link-extraction-only tools.

Comparison:
- airborne-commando's extractor → mainly converts to clickable links
- This script → emphasizes instant save + one-click Yandex, fewer steps

## FAQ

- Buttons not showing? → Refresh page or check if Tampermonkey script is enabled
- Want new features (batch download, copy base64, etc.)? → Welcome to open PR or discuss in Issues

## Contributing

Fork & PR welcome!  
Found FaceCheck DOM changes? Submit an Issue with screenshot — we'll adapt fast.

## License

[MIT License](LICENSE)

Thanks to everyone who stars & forks!