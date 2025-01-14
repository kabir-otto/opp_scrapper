"use client";

import { useState } from 'react';
import { Opportunity } from '@/lib/types';
import { OpportunityCard } from './OpportunityCard';
import { Button } from '@/components/ui/Button';

interface OpportunityGridProps {
    opportunities: Opportunity[];
}

export function OpportunityGrid({ opportunities }: OpportunityGridProps) {
    const [displayCount, setDisplayCount] = useState(12);
    const displayedOpportunities = opportunities.slice(0, displayCount);
    const hasMore = displayCount < opportunities.length;

    return (
        <div className="space-y-6">
            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedOpportunities.map((opportunity) => (
                    <OpportunityCard 
                        key={opportunity.id} 
                        opportunity={opportunity} 
                    />
                ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
                <div className="flex justify-center mt-8">
                    <Button
                        variant="secondary"
                        onClick={() => setDisplayCount((prev) => prev + 12)}
                    >
                        Load More Opportunities
                    </Button>
                </div>
            )}
        </div>
    );
}