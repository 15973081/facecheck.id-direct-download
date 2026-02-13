// ==UserScript==
// @name         FaceCheck.id - Download Base64 Images Directly
// @namespace    https://github.com/15973081
// @version      0.3
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

    // 插入樣式
    const style = document.createElement('style');
    style.textContent = `
        .fc-btn-container {
            position: absolute;
            bottom: 8px;
            right: 8px;
            display: flex;
            gap: 8px;
            z-index: 9999;
            display: none;
        }
        .fc-download-btn, .fc-yandex-btn {
            background: rgba(0, 120, 215, 0.92);
            color: white;
            border: none;
            border-radius: 5px;
            padding: 6px 12px;
            font-size: 13px;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.35);
            transition: background 0.15s;
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
        const match = bg.match(/url\(["']?(data:image\/[^"')]+)["']?\)/i);
        return match ? match[1] : null;
    }

    function addButtons(el, dataUrl) {
        if (el.dataset.fcHasBtn === '1') return;
        el.dataset.fcHasBtn = '1';

        let container = el;
        if (el.parentNode && !el.parentNode.classList.contains('fc-download-container')) {
            container = document.createElement('div');
            container.className = 'fc-download-container';
            el.parentNode.insertBefore(container, el);
            container.appendChild(el);
        }

        const btnContainer = document.createElement('div');
        btnContainer.className = 'fc-btn-container';

        // 下載按鈕
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'fc-download-btn';
        downloadBtn.textContent = 'download';
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

        // Yandex 按鈕（只跳轉，不做其他事）
        const yandexBtn = document.createElement('button');
        yandexBtn.className = 'fc-yandex-btn';
        yandexBtn.textContent = 'Yandex search';
        yandexBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://yandex.com/images/', '_blank');
            // 可選：如果你希望更明顯地提醒使用者自己手動上傳，可以加這一行
            // 但多數人已經知道，所以這裡先註解掉
            // alert('已開啟 Yandex 搜圖頁面，請手動上傳或貼上圖片');
        };

        btnContainer.appendChild(downloadBtn);
        btnContainer.appendChild(yandexBtn);
        container.appendChild(btnContainer);
    }

    function scanForBgImages() {
        const selectors = [
            'div', 'li', 'span', 'a',
            '[class*="result"]', '[class*="card"]', '[class*="item"]',
            '[id^="fimg"]', '[class*="image"]', '[class*="photo"]'
        ].join(',');

        document.querySelectorAll(selectors).forEach(el => {
            const dataUrl = extractDataUrlFromBg(el);
            if (dataUrl && dataUrl.startsWith('data:image/')) {
                addButtons(el, dataUrl);
            }
        });
    }

    // 初次執行
    scanForBgImages();

    // 監聽 DOM 變化
    const observer = new MutationObserver(scanForBgImages);
    observer.observe(document.body, { childList: true, subtree: true });

    // 保險機制：頁面延遲載入很常見
    setInterval(scanForBgImages, 5000);

    //console.log('[FaceCheck Tools] v0.3 ');
})();