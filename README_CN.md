<h1 align="center">FaceCheck 直接下载 & Yandex 跳转</h1>

[English](./README.md) / 简体中文

<a href="https://github.com/15973081/facecheck.id-direct-download" target="_blank">
  <img src="https://img.shields.io/github/stars/15973081/facecheck.id-direct-download?style=social" alt="GitHub stars">
</a>
<a href="https://github.com/15973081/facecheck.id-direct-download/issues">
  <img src="https://img.shields.io/github/issues/15973081/facecheck.id-direct-download" alt="issues">
</a>
<a href="https://github.com/15973081/facecheck.id-direct-download/blob/main/LICENSE">
  <img src="https://img.shields.io/github/license/15973081/facecheck.id-direct-download" alt="license">
</a>

**在 FaceCheck.id 的 base64 预览图上悬停 → 一键直接下载 & Yandex 跳转。免费轻量级 Tampermonkey 脚本。**

[安装脚本](https://raw.githubusercontent.com/15973081/facecheck.id-direct-download/main/facecheck.user.js) · [Greasy Fork（即将上线）](#) · [报告问题](https://github.com/15973081/facecheck.id-direct-download/issues) · [贡献指南](#贡献)

## 功能亮点

- 在结果页的 base64 预览图上悬停 → 自动显示 **直接下载**（保存原始完整图片）和 **Yandex 跳转**（快速打开 Yandex 反向搜索）按钮
- 一键保存完整 .webp 图片，无需跳转、无需付费查看大图
- 支持桌面和移动端（触屏设备长按即可模拟悬停）
- 极致轻量、无任何依赖 — 纯原生 JavaScript + MutationObserver
- 按钮悬浮在右下角，简洁不干扰原页面
- 自动适配动态加载 / 懒加载的搜索结果

## 安装（30 秒搞定）

1. 安装用户脚本管理器：
   - [Tampermonkey](https://www.tampermonkey.net/)（支持 Chrome/Edge/Firefox）
   - 手机端推荐：Kiwi Browser + Tampermonkey

2. 直接安装脚本：
   - 点击 → [Raw 安装链接](https://raw.githubusercontent.com/15973081/facecheck.id-direct-download/main/facecheck.user.js)  
     （浏览器会跳转到 Tampermonkey 安装确认页面 → 点击“安装”即可）

3. 访问 https://facecheck.id，上传图片进行搜索 → 鼠标悬停任意预览缩略图即可测试！

![演示](image/use.gif)

**小提示**：如果 FaceCheck 网站更新导致按钮失效，请在 Issues 中反馈 — 我们会尽快修复。

## 为什么要做这个脚本？

自 2024 年起，FaceCheck.id 将大量完整图片功能设为付费，原图被 base64 预览图隐藏。  
本脚本专注于 **一键直接下载** + **Yandex 一键反查**，比单纯把 base64 转成链接的工具更方便实用。

对比：

- airborne-commando 的提取工具 → 主要转为可点击链接
- 本脚本 → 强调即时保存 + 一键 Yandex跳转，操作更少

## 常见问题

- **按钮不显示？** → 刷新页面，或检查 Tampermonkey 是否已启用该脚本
- **想要新功能**（批量下载、复制 base64、自动打开所有 Yandex 等）？→ 欢迎在 Issues 中讨论或提交 PR

## 贡献指南

欢迎 fork & 提交 PR！  
发现 FaceCheck 页面结构变化？带上截图提 Issue，我们会快速适配。

## 许可证

[MIT License](LICENSE)

感谢每一位 star & fork 的朋友！