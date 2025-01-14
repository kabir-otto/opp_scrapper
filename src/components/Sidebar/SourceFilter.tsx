interface SourceFilterProps {
    sources: { 'SAM.gov': boolean; 'Grants.gov': boolean };
    onChange: (sources: { 'SAM.gov': boolean; 'Grants.gov': boolean }) => void;
}

export function SourceFilter({ sources, onChange }: SourceFilterProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Sources</h3>
            <div className="space-y-2">
                {Object.entries(sources).map(([source, checked]) => (
                    <label
                        key={source}
                        className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50"
                    >
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => onChange({ ...sources, [source]: e.target.checked })}
                            className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-sm text-gray-700">{source}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}