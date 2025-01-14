interface KeywordFilterProps {
    keywords: string[];
    selectedKeywords: string[];
    onChange: (keywords: string[]) => void;
}

export function KeywordFilter({ keywords, selectedKeywords, onChange }: KeywordFilterProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Keywords</h3>
            <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                    <button
                        key={keyword}
                        onClick={() => {
                            if (selectedKeywords.includes(keyword)) {
                                onChange(selectedKeywords.filter((k) => k !== keyword));
                            } else {
                                onChange([...selectedKeywords, keyword]);
                            }
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                            selectedKeywords.includes(keyword)
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                    >
                        {keyword}
                    </button>
                ))}
            </div>
        </div>
    );
}