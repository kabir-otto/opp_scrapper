"use client";

import { useState } from 'react';
import { Sidebar } from '../components/Sidebar/index';
import { OpportunityGrid } from '../components/OpportunityGrid/index';
import { Filters, Opportunity, OpportunitiesData, Source } from '@/lib/types';
import sampleData from '../data/opportunities.json';

// Sample keywords - replace with actual keywords from your data
const SAMPLE_KEYWORDS = [
    "Sustainable Aviation",
    "Green Aviation",
    "Aircraft Design",
    "UAV Development",
    "Drone Technology",
    "Aerospace",
    "Electric Propulsion",
    "Research Programs"
];

// Type assertion for the imported JSON
const typedSampleData = sampleData as OpportunitiesData;
const SAMPLE_OPPORTUNITIES = typedSampleData.opportunities;

export default function Home() {
    // State for filters
    const [filters, setFilters] = useState<Filters>({
        dateRange: 'today',
        sources: {
            'SAM.gov': true,
            'Grants.gov': true
        },
        selectedKeywords: []
    });

    // Filter opportunities based on current filters
    const filteredOpportunities = SAMPLE_OPPORTUNITIES.filter(opp => {
        // Source filter - add type check
        if (!filters.sources[opp.source as Source]) return false;

        // Keyword filter
        if (filters.selectedKeywords.length > 0) {
            const oppKeywords = opp.keywords.map(k => k.keyword);
            if (!filters.selectedKeywords.some(k => oppKeywords.includes(k))) {
                return false;
            }
        }

        // Date filter - you would implement actual date filtering logic here
        return true;
    });

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                filters={filters}
                onFiltersChange={setFilters}
                keywords={SAMPLE_KEYWORDS}
            />
            
            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">Opportunities Dashboard</h1>
                        <p className="text-gray-500">
                            Showing {filteredOpportunities.length} opportunities matching your filters
                        </p>
                    </div>
                    <OpportunityGrid opportunities={filteredOpportunities} />
                </div>
            </div>
        </div>
    );
}