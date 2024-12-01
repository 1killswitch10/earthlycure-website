import sys
import os
import json

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF using basic text processing"""
    try:
        # Create data directory if it doesn't exist
        os.makedirs('data', exist_ok=True)
        
        # Process PDF content into sections
        sections = {
            "herbs_for_digestion": {
                "title": "Digestive Herbs",
                "content": ""
            },
            "herbs_for_immunity": {
                "title": "Immune System Herbs",
                "content": ""
            },
            "herbs_for_sleep": {
                "title": "Sleep and Relaxation Herbs",
                "content": ""
            }
        }

        # Read PDF content (simplified for demonstration)
        with open(pdf_path, 'rb') as file:
            content = file.read()
            
            # Extract text sections (you would implement proper PDF parsing here)
            current_section = None
            
            for line in content.split(b'\n'):
                try:
                    text = line.decode('utf-8').strip()
                    
                    # Identify sections based on keywords
                    if 'DIGESTIVE' in text.upper():
                        current_section = 'herbs_for_digestion'
                    elif 'IMMUNE' in text.upper():
                        current_section = 'herbs_for_immunity'
                    elif 'SLEEP' in text.upper():
                        current_section = 'herbs_for_sleep'
                    
                    # Add content to current section
                    if current_section and text:
                        sections[current_section]['content'] += text + '\n'
                except:
                    continue

        # Save processed content
        with open('data/herbal_medicine.json', 'w', encoding='utf-8') as f:
            json.dump(sections, f, indent=2, ensure_ascii=False)
            
        print("PDF content extracted and saved to data/herbal_medicine.json")
        
    except Exception as e:
        print(f"Error processing PDF: {e}")
        return False
    
    return True

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_pdf.py <pdf_path>")
        sys.exit(1)
        
    pdf_path = sys.argv[1]
    
    if extract_text_from_pdf(pdf_path):
        print("PDF processing completed successfully")
    else:
        print("Failed to process PDF")
        sys.exit(1)