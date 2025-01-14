// src/components/OpportunityGrid/OpportunityCard.tsx
import { Opportunity } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';

interface OpportunityCardProps {
    opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6 space-y-4">
                {/* Header with Title and Source */}
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                        {opportunity.title}
                    </h3>
                    <Badge 
                        variant={opportunity.source === 'SAM.gov' ? 'default' : 'success'}
                        className="flex-shrink-0"
                    >
                        {opportunity.source}
                    </Badge>
                </div>

                {/* Agency Name */}
                <p className="text-sm text-gray-600">{opportunity.agency}</p>

                {/* Dates */}
                <div className="flex gap-4 text-sm text-gray-500">
                    <span>Posted: {format(new Date(opportunity.postDate), 'MMM d, yyyy')}</span>
                    <span>Closes: {format(new Date(opportunity.closeDate), 'MMM d, yyyy')}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 line-clamp-3">{opportunity.description}</p>

                {/* Total Score */}
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">Score:</span>
                    <Badge 
                        variant={
                            opportunity.totalScore >= 90 ? 'success' :
                            opportunity.totalScore >= 70 ? 'default' :
                            'warning'
                        }
                    >
                        {opportunity.totalScore.toFixed(1)}
                    </Badge>
                </div>

                {/* Keywords - Only render if keywords exist */}
                {opportunity.keywords && opportunity.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {opportunity.keywords.map(({ keyword, score }) => (
                            <Badge 
                                key={keyword} 
                                variant="default" 
                                className="text-xs bg-opacity-50"
                            >
                                {keyword} ({score.toFixed(1)})
                            </Badge>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}