# 尚豪 — 示範站

私人檔期協議的靜態介面。限 18 歲以上。

## 公開網址

https://gabe45665x.github.io/shanghao/

## 目錄

```
index.html          首頁
select / studio / signal / profile
login / register / account / publish
guide / faq / about / safety / terms / privacy
css/                色票、元件、頁面、手機版
js/                 資料與互動
img/                上線用圖
site.webmanifest    加入主畫面
serve.mjs           本機／區網預覽伺服器
_source/            原始封面與參考圖（不上線）
```

## 本機預覽

雙擊 `雙擊預覽.bat`，或：

```
node serve.mjs
```

預設 `http://127.0.0.1:8787/`，也會綁 `0.0.0.0`，同一 Wi-Fi 的手機可用印出的區網 IP。

## 公開給別人看

1. **GitHub Pages（部分網路會打不開 github.io）**  
   https://gabe45665x.github.io/shanghao/

2. **臨時公開隧道**  
   先開 `雙擊預覽.bat`，再雙擊 `公開預覽.bat`。視窗會印出 `https://*.trycloudflare.com` 連結，關掉視窗連結就失效。

## 手機

小於 1024px 自動切成手機版：底部五個分頁、直式封面輪播（可左右滑）、兩欄名片、安全區避開瀏海與 Home 條。可用「加入主畫面」。
