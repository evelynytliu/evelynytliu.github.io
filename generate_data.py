import os
import json
import urllib.parse
import re

# Configuration
DESIGN_WORKS_DIR = "design_works"
OUTPUT_FILE = "data.js"

# Category Mapping Rules
# Filename format: "作品  [Category] [Project Name].[ext]"
# or just look for keywords in the category part if it's messy.

CATEGORY_MAPPING = {
    # Keywords in filename -> Portfolio Category
    "Line": "Line/Social Media",
    "Social": "Line/Social Media",
    "FB": "Line/Social Media",
    "IG": "Line/Social Media",
    "Menu": "Menus",
    "菜單": "Menus",
    "Packaging": "Packaging",
    "包裝": "Packaging",
    "Poster": "Posters",
    "海報": "Posters",
    "DM": "Posters",
    "Manual": "Manuals",
    "說明書": "Manuals",
    "簡卡": "Manuals",
    "Logo": "Logos",
    "Card": "Business Cards",
    "Namecard": "Business Cards",
    "名片": "Business Cards",
    "Booklet": "Editorial",
    "Brochure": "Editorial",
}

DEFAULT_CATEGORY = "Graphic Design" # Fallback sub-category

def parse_filename(filename):
    """
    Parses "作品  [Category] [Project Name].[ext]"
    Returns (Title, Category, Tags, SubCategory)
    """
    # Remove extension
    name_without_ext = os.path.splitext(filename)[0]
    
    # Check for prefix "作品  " (note the two spaces often used in your examples)
    clean_name = name_without_ext.replace("作品  ", "").strip()
    
    # Split by spaces to try and find category
    # Heuristic: The first word(s) might be the category if they match our mapping
    parts = clean_name.split(" ")
    
    detected_sub_category = "Other"
    project_title = clean_name
    
    # Try to match the first part to a category
    first_part = parts[0]
    
    # Check mapping
    for key, value in CATEGORY_MAPPING.items():
        if key.lower() in clean_name.lower():
             detected_sub_category = value
             break
    
    # If the filename has structure like "Category ProjectName", we might want to clean up the title
    # For now, let's use the full clean name as title, but maybe remove the matched category keyword if desired.
    # User asked to "parse the filename to guess the category".
    
    return {
        "id": urllib.parse.quote(clean_name), # Simple ID
        "title": clean_name,
        "category": "Design", # Main category for these files
        "tags": [detected_sub_category],
        "image": f"design_works/{filename}",
        "description": f"Project: {clean_name}",
        "link": "" # No external link for design works usually
    }

def main():
    if not os.path.exists(DESIGN_WORKS_DIR):
        print(f"Error: Directory '{DESIGN_WORKS_DIR}' not found.")
        return

    existing_data = []
    if os.path.exists(OUTPUT_FILE):
        try:
             with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
        except:
            pass

    # We want to preserve explicitly non-design items (like Code/Notion/Traces) if they exist
    # But regenerate Design items to ensure sync.
    # Actually, for first run, let's just generate fresh list + add dummy Code/Notion items.
    
    new_items = []
    
    # Scan Design Works
    valid_extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"}
    
    print(f"Scanning {DESIGN_WORKS_DIR}...")
    
    files = sorted([f for f in os.listdir(DESIGN_WORKS_DIR) if os.path.isfile(os.path.join(DESIGN_WORKS_DIR, f))])
    
    # key: project_name_cleaned, value: item_dict
    grouped_projects = {}
    

try:
    from PIL import Image
    import colorsys
    HAS_PILLOW = True
except ImportError:
    HAS_PILLOW = False
    print("Warning: Pillow library not found. Color sorting will be skipped. Install with 'pip install pillow'")

def get_dominant_hue(image_path):
    """
    Returns the dominant hue (0-360) of the image.
    Uses a simple resizing method to average colors.
    """
    if not HAS_PILLOW:
        return 0
    
    try:
        # Open and resize to small size for speed and averaging
        with Image.open(image_path) as img:
            img = img.resize((1, 1))
            # Get color of the single pixel
            color = img.getpixel((0, 0))
            
            # Handle RGBA
            if isinstance(color, int):
                # Grayscale
                return 0
            if len(color) == 4:
                r, g, b, a = color
            else:
                r, g, b = color
            
            # Convert to HSV
            h, s, v = colorsys.rgb_to_hsv(r/255.0, g/255.0, b/255.0)
            return h * 360
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        return 0

def main():
    if not os.path.exists(DESIGN_WORKS_DIR):
        print(f"Error: Directory '{DESIGN_WORKS_DIR}' not found.")
        return

    # 1. READ EXISTING DATA (To preserve manual Code/Notion/Traces entries)
    preserved_items = []
    if os.path.exists(OUTPUT_FILE):
        try:
            with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
                content = f.read()
                # Strip "window.projectData = " and ";" to parse JSON
                json_str = content.replace("window.projectData = ", "").replace(";", "")
                details = json.loads(json_str)
                
                # Keep items that are NOT 'Design'
                for item in details:
                    if item.get("category") != "Design":
                        preserved_items.append(item)
                
                print(f"Preserved {len(preserved_items)} manual entries (Code, Notion, etc.).")
        except Exception as e:
            print(f"Warning: Could not read existing data.js: {e}")

    new_items = []
    
    # 2. SCAN DESIGN WORKS
    valid_extensions = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".pdf"} # PDF thumbnailing not implemented in this script logic, assuming thumbnails exist or handled elsewhere? 
    # Actually current script treats PDFs as valid but image paths point to them. Browser handles PDF display differently or fails if <img> src is pdf.
    # Assuming user provides images or browser can handle it? Original logic included .pdf. Let's keep it but note.
    
    print(f"Scanning {DESIGN_WORKS_DIR}...")
    
    files = sorted([f for f in os.listdir(DESIGN_WORKS_DIR) if os.path.isfile(os.path.join(DESIGN_WORKS_DIR, f))])
    
    # key: project_name_cleaned, value: item_dict
    grouped_projects = {}
    
    for f in files:
        ext = os.path.splitext(f)[1].lower()
        if ext in valid_extensions:
            # Parse full details
            parsed = parse_filename(f)
            
            # Create a Grouping Key (remove P1, -01 suffixes)
            clean_title = parsed['title']
            match = re.search(r'^(.*?)(?:[ _-]?P\d+|[ _-]\d+|[ _]頁面[ _]\d+)?$', clean_title)
            
            # group_key = clean_title
            group_key = clean_title
            if match and match.group(1):
                 group_key = match.group(1).strip()
            
            if group_key not in grouped_projects:
                grouped_projects[group_key] = parsed
                grouped_projects[group_key]['images'] = [parsed['image']]
                grouped_projects[group_key]['title'] = group_key 
                
                # Calculate Hue for sorting
                image_full_path = os.path.join(DESIGN_WORKS_DIR, f)
                grouped_projects[group_key]['hue'] = get_dominant_hue(image_full_path)
                
                # Check for Private/Medical keywords
                if "醫療" in group_key or "Medical" in group_key or "歐克" in group_key:
                    grouped_projects[group_key]['private'] = True
                
            else:
                grouped_projects[group_key]['images'].append(parsed['image'])
                
    # Convert dict to list
    design_items = list(grouped_projects.values())

    # 3. SORT DESIGN ITEMS BY COLOR
    if HAS_PILLOW:
        print("Sorting design projects by color...")
        # Sort by Hue
        design_items.sort(key=lambda x: x.get('hue', 0))
    
    # 4. MERGE PERSERVED ITEMS + NEW DESIGN ITEMS
    # We put Code/Notion first? Or mixed? Usually filter handles it. Let's append Design after.
    # User might want specific order. For now, let's keep Code/Notion at the end or specific spot.
    # Actually, current script just recreated everything. Let's append preserved to new design items.
    
    final_list = design_items + preserved_items

    # Add Dummy Data ONLY if truly empty (e.g. first run and no preserved items)
    if not final_list:
         # ... existing dummy logic if needed, skipping for now to keep it clean ...
         pass
        
    # Write to data.js
    js_content = f"window.projectData = {json.dumps(final_list, indent=2, ensure_ascii=False)};"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    print(f"Successfully generated {len(final_list)} items in data.js (Sorted & Preserved)")

if __name__ == "__main__":
    main()
