# AGENTS.md — shanghao

給 AI coding agent 看的工作說明。內容以 `README.md` 和實際檔案為準；有衝突時以 README 為準，並回報。

## 專案是什麼

- 純靜態示範站（HTML／CSS／原生 JS），限 18 歲以上主題的介面設計示範。
- 沒有後端、沒有資料庫、沒有建置步驟，也沒有 `package.json`。
- 公開站走 GitHub Pages，網址見 README。

## 目錄結構

```
*.html              各頁面（index、select、studio、signal、profile、login、register、account、publish、guide、faq、about、safety、terms、privacy、recover、404）
css/                tokens.css（色票）、base.css、components.css、pages.css、mobile.css（<1024px 手機版）
js/app.js           互動邏輯
js/data.js          頁面用的示範資料
img/                上線用圖
video/              首頁封面影片
site.webmanifest    加入主畫面設定
serve.mjs           本機／區網預覽伺服器（Node 內建模組，無相依套件）
雙擊預覽.bat         Windows：開預覽並打開瀏覽器（preview.bat 會呼叫它）
公開預覽.bat         Windows：用 cloudflared 開臨時公開隧道
_source/            原始圖，已在 .gitignore，不上線、不提交
```

## 怎麼跑

```bash
node serve.mjs
```

- 預設 `http://127.0.0.1:8787/`；可用環境變數 `PORT`、`HOST` 覆寫。
- 預設綁 `0.0.0.0`，同網段裝置也連得到。這是開發預覽，**不是正式部署指令**。
- `serve.mjs` 會擋 `_source/` 和 `.git/` 路徑。
- `公開預覽.bat` 開的是臨時隧道，關視窗就失效；只在主人要求時使用。

## 測試

- repo 裡沒有自動測試，也沒有 CI 設定。
- 目前的驗收方式：本機開預覽，手動看桌機與手機寬度（<1024px）各頁是否正常（待驗證：主人是否有固定檢查清單）。
- Node 最低版本未標註（待驗證）；`serve.mjs` 用的是 ESM 與 `node:` 內建模組。

## 程式風格

- HTML `lang="zh-Hant"`，頁面文字用繁體中文。
- 原生 JS，不引入框架或打包工具；新增相依套件前先問主人。
- 顏色、字級等設計變數放 `css/tokens.css`，手機版樣式放 `css/mobile.css`。
- 靜態資源用 `?v=` 快取版本號（例如 `css/*.css?v=...`、`js/app.js?v=...`）。改了 CSS／JS 要一起更新所有引用頁面的版本號。
- 保持現有檔案結構，不要搬目錄或改檔名，除非主人要求。

## 安全紅線

- 不提交金鑰、token、密碼、`.env` 或任何登入檔；靜態站的檔案全部公開可讀。
- 不寫入私人機器的 IP、主機名稱，或真實姓名、地點、聯絡方式。
- 不把真實人員或客人資料放進 `js/data.js` 或任何頁面，只放示範資料。
- 動到正式站（GitHub Pages 設定、網域、`main` 分支直接推送）要主人准。
- 一律開 PR 給主人看，不自動 merge、不 force push。
- `_source/` 不上線、不提交。
