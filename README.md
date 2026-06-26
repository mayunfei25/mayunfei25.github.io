# Yunfei Ma Academic Homepage v1

这是一版更接近 `hongjiew.github.io` 那种 AcademicPages 学术主页风格的静态 GitHub Pages 网站。

## 文件结构

```text
your-github-username.github.io/
├── index.html
├── styles.css
└── assets/
    └── profile-placeholder.svg
```

## 本地预览

双击 `index.html` 即可打开。

## 上传到 GitHub Pages

1. 在 GitHub 新建仓库：`你的GitHub用户名.github.io`
2. 上传本文件夹里面的所有文件
3. 确保 `index.html` 在仓库根目录，不要套在二级文件夹里
4. 进入 Settings → Pages
5. Source 选择 `Deploy from a branch`
6. Branch 选择 `main`，Folder 选择 `/ root`
7. 保存后等待 GitHub Pages 部署

## 你需要替换的地方

### 头像

把 `assets/profile-placeholder.svg` 替换成你的照片，例如：

```text
assets/profile.jpg
```

然后在 `index.html` 里把：

```html
<img class="portrait" src="assets/profile-placeholder.svg" ... />
```

改成：

```html
<img class="portrait" src="assets/profile.jpg" ... />
```

### 链接

把这些 `href="#"` 替换成你的真实链接：

- Google Scholar
- GitHub
- CV
- paper
- code
- slides
- poster

### 内容

可以继续补充：

- Recent News
- Education
- Projects
- Publications and Preprints
- Academic Service
- Selected Awards

## 建议

这版比 v0 更像正式学术主页。后续如果你想完全使用 AcademicPages/Jekyll 模板，也可以直接 fork `academicpages/academicpages.github.io`，但这版静态 HTML 更容易上手。
