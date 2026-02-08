"""
Convert README.html to PDF with clickable links
Requires: pip install weasyprint
"""

from weasyprint import HTML
import os

# Get the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Input and output paths
html_file = os.path.join(script_dir, 'README.html')
pdf_file = os.path.join(script_dir, 'README.pdf')

# Convert HTML to PDF
print("🔄 Converting README.html to PDF...")
HTML(filename=html_file).write_pdf(pdf_file)
print(f"✅ PDF created successfully: {pdf_file}")
print("📄 The PDF includes clickable links!")
