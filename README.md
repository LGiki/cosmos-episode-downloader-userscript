# Cosmos Episode Downloader Userscript

在小宇宙单集页面增加一个 `📥 下载播客音频` 按钮，用于下载单集音频。

# 截图

![screenshot](https://user-images.githubusercontent.com/20807713/231678420-8266612c-7a2d-4560-a01f-e537320bb00f.png)

# 安装

1. 安装 `Tampermonkey` 浏览器扩展程序（如果已安装则跳过该步骤）
   - Chrome 用户：[https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chrome.google.com/webstore/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox 用户：[https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - Edge 用户：[https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd](https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd)
2. 点击 [这里](https://github.com/LGiki/cosmos-episode-downloader-userscript/raw/main/cosmos-episode-downloader.user.js) 安装脚本文件
3. 在弹出的 Tampermonkey 用户脚本安装页面中点击 `安装` 按钮即可
4. **如果未弹出** Tampermonkey 用户脚本安装页面，则需要进行以下操作
   - 点击浏览器上的 Tampermonkey 扩展图标，然后点击 `➕ 添加新脚本`，将第 2 步中下载的脚本文件的内容粘贴到编辑框中，保存脚本

# 使用

在小宇宙播客的单集页面上，会自动增加一个 `📥 下载播客音频` 按钮，点击这个按钮即可下载播客。

# 注意事项

- 本脚本仅在 Chrome、Firefox、Edge 浏览器中测试过，其他浏览器的兼容性未知。
- 本脚本仅适用于小宇宙播客的单集页面，其他页面不会生效。
- 本脚本可能会与其他 Tampermonkey 脚本产生冲突，如果出现问题，请禁用其他脚本再尝试。

# 许可协议

本脚本使用 MIT 许可协议，详细信息请查看 [LICENSE](https://github.com/LGiki/cosmos-episode-downloader-userscript/blob/main/LICENSE) 文件。