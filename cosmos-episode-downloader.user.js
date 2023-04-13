// ==UserScript==
// @name         小宇宙单集下载按钮
// @namespace    https://github.com/LGiki/cosmos-episode-downloader-userscript
// @homepageURL  https://github.com/LGiki/cosmos-episode-downloader-userscript
// @supportURL   https://github.com/LGiki/cosmos-episode-downloader-userscript/issues
// @version      1.0.1
// @description  为小宇宙单集页面增加下载按钮
// @author       LGiki
// @updateURL    https://github.com/LGiki/cosmos-episode-downloader-userscript/raw/main/cosmos-episode-downloader.meta.js
// @downloadURL  https://github.com/LGiki/cosmos-episode-downloader-userscript/raw/main/cosmos-episode-downloader.user.js
// @match        https://www.xiaoyuzhoufm.com/episode/*
// @match        https://www.xiaoyuzhoufm.com/podcast/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xiaoyuzhoufm.com
// @license      MIT
// @grant        GM_download
// ==/UserScript==

const isValidXiaoyuzhouEpisodeUrl = (url) => {
    return /^https?:\/\/(?:www\.)?xiaoyuzhoufm.com\/episode\/([0-9a-f]{24})/.test(url);
}

const generateDownloadFilename = (audioFileUrl) => {
    const supportFileExtensions = ['.mp3', '.m4a', '.wav', '.ogg', '.flac', '.ape'];
    const audioFileExtension = supportFileExtensions.find((extension) => audioFileUrl.endsWith(extension));
    if (!audioFileExtension) {
        return null;
    }
    const pageTitle = document.title;
    const filename = pageTitle.slice(0, pageTitle.lastIndexOf('|')).trim();
    return `${filename}${audioFileExtension}`;
}

const generateDownloadButton = () => {
    const audioElement = document.querySelector('audio');
    if (audioElement) {
        const audioUrl = audioElement.src;
        const downloadButtonContainer = document.createElement('div');
        downloadButtonContainer.style.cssText = 'display: flex; justify-content: center; margin: 5px 0;';
        downloadButtonContainer.id = 'cosmos-download-button-container';
        const downloadButton = document.createElement('button');
        downloadButton.style.cssText = 'color: white; cursor: pointer;font-size: 13px; display:flex; align-items:center; justify-content:center; border-radius: 2px;font-size: 13px; padding: 9px; background:linear-gradient(180deg,hsla(var(--theme-color-hsl),1)0%,hsla(var(--theme-color-hsl),.8)100%);border: 1px solid rgba(0,0,0,.1);';
        downloadButton.innerHTML = '📥 下载播客音频';
        const downloadFilename = generateDownloadFilename(audioUrl);
        if (downloadFilename) {
            downloadButton.download = downloadFilename;
        }
        downloadButton.onclick = () => {
            downloadButton.disabled = true
            GM_download({
                url: audioUrl, 
                name: downloadFilename,
                onload: () => {
                    downloadButton.innerHTML = '✔️ 下载完成'
                    downloadButton.disabled = false
                },
                onprogress: (progress) => {
                    if (progress.total !== 0) {
                        downloadButton.innerHTML = `🚀 下载中 (${(progress.done / progress.total * 100).toFixed(0)}%)`
                    } else {
                        downloadButton.innerHTML = `🚀 下载中`
                    }
                    downloadButton.disabled = true
                },
                onerror: (e) => {
                    downloadButton.innerHTML = '😢 下载失败'
                    downloadButton.disabled = false
                    console.log(e)
                },
                ontimeout: (e) => {
                    downloadButton.innerHTML = '😢 下载超时'
                    downloadButton.disabled = false
                    console.log(e)
                }
            })
        }
        downloadButtonContainer.appendChild(downloadButton);
        const header = document.getElementsByTagName('header')[0];
        header.parentNode.insertBefore(downloadButtonContainer, header.nextSibling);
    }
}

const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            const isInEpisodePage = isValidXiaoyuzhouEpisodeUrl(window.location.href);
            const extraInfo = document.querySelector('#cosmos-download-button-container');
            if (isInEpisodePage && !extraInfo) {
                generateDownloadButton();
            }
            if (!isInEpisodePage && extraInfo) {
                extraInfo.remove();
            }
        }
    }
}

const observedContainer = document.querySelector('title');
const observer = new MutationObserver(callback);
observer.observe(observedContainer, { attributes: true, childList: true, subtree: true });

window.onload = () => {
    if (isValidXiaoyuzhouEpisodeUrl(window.location.href)) {
        generateDownloadButton();
    }
}