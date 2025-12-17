# 如何新增專案作品

本作品集目前使用 JavaScript 資料檔 (`data.js`) 運作，這讓它可以在沒有伺服器的情況下也能正常瀏覽。

## 方法 A：自動掃描與分組（適用於設計作品）

1. 將您的圖片檔案拖入 `design_works` 資料夾中。
2. **命名規則**：
   - 如果要將多張圖片歸類在同一個作品中（例如同一份菜單的多個頁面），請將它們命名為相同的開頭，後面加上編號。
   - 範例：
     - `作品  Packaging TeaBox P1.jpg`
     - `作品  Packaging TeaBox P2.jpg`
     - `作品  Packaging TeaBox P3.jpg`
   - 這 3 張圖會被自動合併成**一張作品卡片**，標題為 "Packaging TeaBox"。
   - 點擊該卡片時，會開啟包含這 3 張圖的相簿。
3. 執行（雙擊）`generate_data.py` 程式。
   - 這會自動更新 `data.js` 檔案。
   - **注意**：此程式現在會根據**顏色**自動排序您的設計作品！（需要安裝 `pillow` 套件）
   - 它會安全地**保留**您原本手動建立的 Code 或 Notion 專案，不會將其刪除。

## 隱藏專案（醫療相關）
任何檔名中包含 **"醫療"** (或 Medical) 的專案都會被自動標記為 **私人 (Private)**。
- 預設情況下，這些專案在網站上是 **隱藏** 的。
- 如果要查看這些內容（或是展示給客戶看），請使用這個特殊連結：
  - `index.html?view=all`
  - 這將會解鎖顯示所有隱藏專案，它們上方會有紅色的 "Private" 標籤。

## 精選案例 (Case Studies)
針對有獨立 HTML 介紹頁面的特殊專案（例如：咖啡廳品牌識別）：
1. 在 `files/` 資料夾中建立您的 HTML 頁面（例如 `your_project.html`）。
2. 手動在 `data.js` 中新增一筆資料，並將分類設定為 `"category": "Case Studies"`。
3. Python 程式會**保留**這筆資料（因為它不屬於 "Design" 類別）。

## 方法 B：手動輸入（適用於程式 / Notion / 隨筆作品）
1. 使用文字編輯器開啟 `data.js`。
2. 複製並貼上新的區塊。現在您可以使用 `images` 欄位來建立相簿了！
   ```javascript
   {
     "id": "my_new_project_id",               // 請給它一個獨特的英文 ID
     "title": "我的超棒網頁應用程式",          // 專案標題
     "category": "Code",                      // 分類：Code, Notion, 或 Traces
     "tags": ["React", "Tool"],               // 標籤
     "image": "thumb.jpg",                    // 封面縮圖
     "images": ["thumb.jpg", "screen1.jpg"],  // 相簿圖片列表 (如果只有一張圖，這裡也要放)
     "description": "這裡是專案的簡短介紹。",   // 描述
     "link": "https://..."                    // 連結 (可選)
   },
   ```

## 更新網站
修改完成後，只需要重新整理瀏覽器中的 `index.html` 即可看到變更！
