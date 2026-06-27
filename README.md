# mayunfei25.github.io bilingual website update v9

This package contains a bilingual academic homepage for Yunfei Ma.

## Files

- `index.html`: English homepage
- `zh.html`: Chinese homepage
- `styles.css`: shared style sheet
- `script.js`: portrait crop editor
- `assets/README.txt`: reminder for portrait file

## How to use on GitHub Pages

1. Open the `mayunfei25.github.io` repository on GitHub.
2. Upload `index.html`, `zh.html`, `styles.css`, and `script.js` to the repository root.
3. Keep your existing `assets/profile.jpg` in the `assets` folder, or upload a photo named `profile.jpg` into `assets/`.
4. Commit changes.
5. Visit `https://mayunfei25.github.io/` for the English page and `https://mayunfei25.github.io/zh.html` for the Chinese page.

## Portrait crop

Open `https://mayunfei25.github.io/?edit=1` to adjust the portrait crop. The current saved defaults are:

```css
:root {
  --portrait-move-x: 2px;
  --portrait-move-y: -7px;
  --portrait-scale: 1.09;
}
```


## v10 update

Chinese layout refined: CJK-first font stack, smaller Chinese hero heading, cleaner language links, wider sidebar, and improved Chinese spacing.
