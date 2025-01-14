import type { DateFilterOption } from '@/lib/types';

const dateOptions: { value: DateFilterOption; label: string }[] = [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'past7', label: 'Past 7 Days' },
    { value: 'past30', label: 'Past 30 Days' },
    { value: 'past90', label: 'Past 90 Days' },
];

interface DateFilterProps {
    selected: DateFilterOption;
    onChange: (value: DateFilterOption) => void;
}

export function DateFilter({ selected, onChange }: DateFilterProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Date Range</h3>
            <div className="space-y-2">
                {dateOptions.map((option) => (
                    <label
                        key={option.value}
                        className={`flex items-center p-2 cursor-pointer rounded-md ${
                            selected === option.value ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                    >
                        <input
                            type="radio"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            checked={selected === option.value}
                            onChange={() => onChange(option.value)}
                        />
                        <span className="ml-3 text-sm text-gray-700">{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}