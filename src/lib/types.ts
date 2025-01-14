export type DateFilterOption = 'today' | 'yesterday' | 'past7' | 'past30' | 'past90';
export type Source = 'SAM.gov' | 'Grants.gov';

export interface Filters {
    dateRange: DateFilterOption;
    sources: {
        [key in Source]: boolean;
    };
    selectedKeywords: string[];
}

export interface Keyword {
    keyword: string;
    score: number;
}

export interface Opportunity {
    id: string;
    title: string;
    agency: string;
    source: Source;
    postDate: string;
    closeDate: string;
    description: string;
    opportunityLink: string;
    totalScore: number;
    keywords: Keyword[];
}

export interface OpportunitiesData {
    opportunities: Opportunity[];
}