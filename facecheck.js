// ==UserScript==
// @name         FaceCheck.id - Download Base64 Images Directly
// @namespace    https://github.com/15973081
// @version      0.2
// @description  让 FaceCheck.id 的 base64 预览图可直接点击下载，不跳转、不重定向
// @author       You
// @match        https://facecheck.id/*
// @match        https://*.facecheck.id/*
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // ------------------------------
    // 配置区（可自行调整）
    // ------------------------------
    const DOWNLOAD_FILENAME_PREFIX = 'facecheck-';
    const FILE_EXT = 'webp';  // FaceCheck 目前主要是 webp，可改成 png 等

    // ------------------------------
    // 主逻辑
    // ------------------------------
    function makeImageDownloadable(img) {
        // 避免重复处理
        if (img.dataset.fcDownloadable === 'true') return;
        img.dataset.fcDownloadable = 'true';

        // 只处理真正的 base64 图片
        if (!img.src.startsWith('data:image/')) return;

        // 创建下载用的 <a> 标签
        const link = document.createElement('a');
        link.href = img.src;
        link.download = `${DOWNLOAD_FILENAME_PREFIX}${Date.now()}.${FILE_EXT}`;

        // 视觉提示
        img.title = '点击直接下载此图片';
        img.style.cursor = 'pointer';
        img.style.opacity = '0.92';  // 轻微变亮提示可交互（可选）

        // 包装：把 img 包进 a 标签
        if (img.parentNode) {
            img.parentNode.insertBefore(link, img);
            link.appendChild(img);
        }

        // 点击时强制下载（兼容部分浏览器直接打开 data: URL 的行为）
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const tempA = document.createElement('a');
            tempA.href = img.src;
            tempA.download = `${DOWNLOAD_FILENAME_PREFIX}${Math.random().toString(36).slice(2, 10)}.${FILE_EXT}`;
            document.body.appendChild(tempA);
            tempA.click();
            document.body.removeChild(tempA);
        });
    }

    // 处理当前已存在的图片
    function processExistingImages() {
        const images = document.querySelectorAll('img[src^="data:image/"]');
        images.forEach(makeImageDownloadable);
    }

    // 监听动态插入的 DOM 变化（FaceCheck 是 AJAX 加载结果）
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) {  // 元素节点
                        if (node.tagName === 'IMG' && node.src.startsWith('data:image/')) {
                            makeImageDownloadable(node);
                        }
                        // 也检查子孙节点
                        const imgs = node.querySelectorAll('img[src^="data:image/"]');
                        imgs.forEach(makeImageDownloadable);
                    }
                });
            }
        });
    });

    // 启动监听
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 初次执行
    processExistingImages();

    // 每隔几秒再扫一次（防极端延迟加载，1分钟扫一次即可）
    setInterval(processExistingImages, 60 * 1000);

    console.log('[FaceCheck Download] 脚本已加载，base64 图片现在可点击下载');
})();