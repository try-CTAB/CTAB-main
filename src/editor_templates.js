// Default templates that can be loaded straight from try-CTAB
// User- or publisher-derived templates can easily be provided as the CTAB config string
export const templates = {
    CRediT: {categories: [
            'Conceptualization',
            'Data curation',
            'Formal Analysis',
            'Funding acquisition',
            'Investigation',
            'Methodology',
            'Project administration',
            'Resources',
            'Software',
            'Supervision',
            'Validation',
            'Visualization',
            'Writing – original draft',
            'Writing – review and editing'
        ], info: 'CRediT is a high level-taxonomy system that describes author contributions.' +
            ' Categories may be too general for a CTAB.'},
    Minimal: {categories: ['Experiments','Analysis','Writing','Funding'], info: 'An extremely minimal template'}
};
