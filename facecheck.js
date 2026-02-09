// ==UserScript==
// @name         FaceCheck.id - Download Base64 Images Directly
// @namespace    https://github.com/15973081
// @version      0.2
// @description  让 FaceCheck.id 的 base64 预览图可直接点击下载，不跳转、不重定向
// @author       mayunnan
// @match        https://facecheck.id/*
// @match        https://*.facecheck.id/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const PREFIX = 'facecheck-';
    const EXT = 'webp';

    // 创建按钮样式（两个按钮：下载 + Yandex搜索）
    const style = document.createElement('style');
    style.textContent = `
        .fc-btn-container {
            position: absolute;
            bottom: 8px;
            right: 8px;
            display: flex;
            gap: 6px;
            z-index: 9999;
            display: none;
        }
        .fc-download-btn, .fc-yandex-btn {
            background: rgba(0, 120, 215, 0.9);
            color: white;
            border: none;
            border-radius: 4px;
            padding: 6px 10px;
            font-size: 12px;
            cursor: pointer;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        .fc-download-btn:hover, .fc-yandex-btn:hover {
            background: rgba(0, 120, 215, 1);
        }
        .fc-download-container {
            position: relative;
            display: inline-block;
        }
        .fc-download-container:hover .fc-btn-container {
            display: flex;
        }
    `;
    document.head.appendChild(style);

    function extractDataUrlFromBg(el) {
        const bg = window.getComputedStyle(el).backgroundImage;
        if (!bg || bg === 'none') return null;

        // 匹配 url("data:...") 或 url(data:...)
        const match = bg.match(/url\(["']?(data:image\/[^"')]+)["']?\)/i);
        return match ? match[1] : null;
    }

    function addButtons(el, dataUrl) {
        // 避免重复添加
        if (el.dataset.fcHasBtn === '1') return;
        el.dataset.fcHasBtn = '1';

        // 包一层相对定位容器
        let container = el;
        if (el.parentNode && !el.parentNode.classList.contains('fc-download-container')) {
            container = document.createElement('div');
            container.className = 'fc-download-container';
            el.parentNode.insertBefore(container, el);
            container.appendChild(el);
        }

        // 按钮容器
        const btnContainer = document.createElement('div');
        btnContainer.className = 'fc-btn-container';

        // 下载按钮
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'fc-download-btn';
        downloadBtn.textContent = '下载';
        downloadBtn.title = '点击下载此 base64 图片';

        downloadBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = `${PREFIX}${Date.now()}.${EXT}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        // Yandex 搜索按钮
        const yandexBtn = document.createElement('button');
        yandexBtn.className = 'fc-yandex-btn';
        yandexBtn.textContent = 'Yandex搜索';
        yandexBtn.title = '点击用此图片在 Yandex 进行反向搜索';

        yandexBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();

            // 构造 Yandex 反向图片搜索 URL，使用 encodeURIComponent 处理 dataUrl
            const yandexUrl = `https://yandex.com/images/search?rpt=imageview&url=${encodeURIComponent(dataUrl)}`;
            window.open(yandexUrl, '_blank');
        };

        btnContainer.appendChild(downloadBtn);
        btnContainer.appendChild(yandexBtn);
        container.appendChild(btnContainer);
    }

    function scanForBgImages() {
        // 扫描结果容器（根据 ID 如 #fimg0 或类名调整）
        const candidates = document.querySelectorAll(
            'div, li, span, a, [class*="result"], [class*="card"], [class*="item"], [id^="fimg"]'
        );

        candidates.forEach(el => {
            const dataUrl = extractDataUrlFromBg(el);
            if (dataUrl && dataUrl.startsWith('data:image/')) {
                addButtons(el, dataUrl);
            }
        });
    }

    // 初次扫描
    scanForBgImages();

    // 监听动态变化
    const observer = new MutationObserver(() => {
        scanForBgImages();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 定时扫描
    setInterval(scanForBgImages, 8000);

    console.log('[FC Download & Yandex] 脚本加载完成，悬停结果图出现“下载”和“Yandex搜索”按钮');
})();