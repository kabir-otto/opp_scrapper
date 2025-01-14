"use client";

import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { DateFilter } from './DateFilter';
import { SourceFilter } from './SourceFilter';
import { KeywordFilter } from './KeywordFilter';
import type { Filters } from '@/lib/types';

interface SidebarProps {
    filters: Filters;
    onFiltersChange: (filters: Filters) => void;
    keywords: string[];
}

export function Sidebar({ filters, onFiltersChange, keywords }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={`relative h-full bg-white border-r border-gray-200 transition-all duration-300 ${
                isCollapsed ? 'w-12' : 'w-80'
            }`}
        >
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-4 bg-white border border-gray-200 rounded-full p-1 shadow-sm"
            >
                {isCollapsed ? (
                    <ChevronRightIcon className="h-4 w-4" />
                ) : (
                    <ChevronLeftIcon className="h-4 w-4" />
                )}
            </button>

            <div className={`p-6 space-y-8 ${isCollapsed ? 'hidden' : 'block'}`}>
                <DateFilter
                    selected={filters.dateRange}
                    onChange={(dateRange) => onFiltersChange({ ...filters, dateRange })}
                />
                <SourceFilter
                    sources={filters.sources}
                    onChange={(sources) => onFiltersChange({ ...filters, sources })}
                />
               
            </div>
        </div>
    );
}