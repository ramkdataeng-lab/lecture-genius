# How to Convert README.html to PDF

There are several ways to convert the README.html to a PDF with clickable links:

## Method 1: Using Your Browser (EASIEST - RECOMMENDED)

1. **Open README.html** in your browser (Chrome, Edge, or Firefox)
   - Right-click on `README.html` → Open with → Chrome/Edge

2. **Print to PDF**
   - Press `Ctrl + P` (or Cmd + P on Mac)
   - In the print dialog:
     - **Destination**: Select "Save as PDF" or "Microsoft Print to PDF"
     - **Layout**: Portrait
     - **Margins**: Default or None
     - **Options**: Check "Background graphics" ✓
   - Click **Save**
   - Name it `README.pdf`

✅ **Links will be clickable in the PDF!**

---

## Method 2: Using Python (if you have Python installed)

1. **Install WeasyPrint**
```bash
pip install weasyprint
```

2. **Run the conversion script**
```bash
python convert-to-pdf.py
```

---

## Method 3: Using Node.js (if you have Node.js)

1. **Install Puppeteer**
```bash
npm install --save-dev puppeteer
```

2. **Run the conversion script**
```bash
node convert-to-pdf.js
```

---

## Method 4: Online Tools

1. Go to one of these websites:
   - https://www.sejda.com/html-to-pdf
   - https://cloudconvert.com/html-to-pdf
   - https://www.ilovepdf.com/html-to-pdf

2. Upload `README.html`

3. Download the PDF

⚠️ **Note**: Make sure to select "Preserve hyperlinks" option if available

---

## Recommended: Method 1 (Browser)

The browser method is the easiest and most reliable. It preserves:
- ✅ All styling and colors
- ✅ Clickable links
- ✅ Gradients and backgrounds
- ✅ Fonts and layout

Just open `README.html` in Chrome/Edge and press `Ctrl + P` → Save as PDF!
