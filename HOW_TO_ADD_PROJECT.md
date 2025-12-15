# How to Add New Projects

This portfolio is now powered by a JavaScript data file (`data.js`) to ensure it works offline without a server.

## Option A: Auto-Scan & Grouping (For Design Works)
1. Drop your image files into the `design_works` folder.
2. **Naming Convention**:
   - To group multiple images into one project, give them the same prefix name followed by a number.
   - Example:
     - `作品  Packaging TeaBox P1.jpg`
     - `作品  Packaging TeaBox P2.jpg`
     - `作品  Packaging TeaBox P3.jpg`
   - These 3 will become **ONE Card** titled "Packaging TeaBox".
   - When clicked, it will show a gallery of all 3 images.
3. Double click/run the `generate_data.py` script.
   - This will automatically update `data.js`.
   - **Note**: The script now automatically sorts your design works by **Color**! (Requires `pip install pillow`)
   - It also safely **preserves** your Code/Notion projects, so they won't be deleted.

## Private Projects (Medical Works)
Any project filename containing **"醫療"** (Medical) will be automatically marked as **Private**.
- By default, these projects are **HIDDEN** on the website.
- To view them (or show them to a client), use this special link:
  - `index.html?view=all`
  - This will unlock all hidden projects. They will have a red "Private" badge.

  - `index.html?view=all`
  - This will unlock all hidden projects. They will have a red "Private" badge.

## Case Studies (Manual HTML Pages)
For special projects (like Cafe Branding) that have their own HTML page:
1. Create the HTML page in `files/your_project.html`.
2. Manually add the entry to `data.js` with `"category": "Case Studies"`.
3. The python script will **preserve** this entry (because it's not "Design").

## Option B: Manual Entry (For Code / Notion / Traces)
1. Open `data.js` in a text editor.
2. Add a new item block. You can now use the `images` list for galleries!
   ```javascript
   {
     "id": "project_unique_id",
     "title": "My Awesome Web App",
     "category": "Code", 
     "tags": ["React", "Tool"],
     "image": "thumb.jpg", 
     "images": ["thumb.jpg", "screen1.jpg", "screen2.jpg"], // Gallery!
     "description": "A brief description.",
     "link": "https://..."
   },
   ```

## Updating the Site
Just refresh your `index.html` in the browser!
