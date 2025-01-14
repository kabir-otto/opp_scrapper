import json
import csv
from datetime import datetime
import re

def extract_url(text):
    """
    Extract URL from text if it exists
    """
    if not text:
        return ""
    # Look for URLs starting with https://
    url_match = re.search(r'https://[^\s<>"]+', text)
    return url_match.group(0) if url_match else ""

def convert_csv_to_opportunities(csv_file):
    """
    Convert CSV file to opportunities JSON format
    """
    opportunities = []
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        csv_reader = csv.DictReader(f)
        for idx, row in enumerate(csv_reader, 1):
            # Get the URL either from OpportunityUrl or extract from Description
            url = row.get("OpportunityUrl", "")
            if not url:
                url = extract_url(row.get("Description", ""))
                
            opportunity = {
                "id": row.get("OpportunityId", str(idx)),
                "title": row.get("Title", ""),
                "agency": row.get("Agency", ""),
                "source": row.get("Source", ""),
                "postDate": row.get("PostDate", "").split('T')[0] if row.get("PostDate") else "",
                "closeDate": row.get("CloseDate", "").split('T')[0] if row.get("CloseDate") else "",
                "description": row.get("Description", ""),
                "opportunityLink": url,
                "totalScore": float(row.get("TotalScore", 0)),
                "keywords": []  # Added empty keywords array to match the expected format
            }
            opportunities.append(opportunity)
    
    # Sort opportunities by totalScore in descending order
    opportunities.sort(key=lambda x: x['totalScore'], reverse=True)
    
    return {
        "opportunities": opportunities,
        "totalCount": len(opportunities)
    }

def save_to_json(data, output_file="opportunities.json"):
    """
    Save the converted data to a JSON file
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    # Convert CSV to JSON
    converted_data = convert_csv_to_opportunities("Query.csv")
    save_to_json(converted_data)
    
    print("Conversion complete! Check opportunities.json for the results.")
    print(f"Number of opportunities converted: {converted_data['totalCount']}")
