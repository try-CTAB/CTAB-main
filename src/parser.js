export function parseEditorQuery(query) {
    console.log('[Parser] parsing (possible) query string...', query);
    let newCTAB = {};
    for (let [key, value] of Object.entries(query)) {
        key = key.replace('#', '')
        console.log(key, '<->' , value.split(','));
        if (key === 'contributions') {
            newCTAB[key] = value.split('~').map(individualContribution => individualContribution.split(','))
        } else if (key === 'version') {
            newCTAB[key] = Number(value)
        } else {  // treat as comma delimited
            newCTAB[key] = value.split(',');
        }
    }

    return newCTAB
}

// Checks if a CTAB object is valid. Returns Boolean value.
export function isValidCTAB(CTAB) {
    let isValid = true;

    if (Object.keys(CTAB).length > 0) {  // do a check beforehand if there actually is anything there
        // check if all keys/fields are present
        let requiredKeys = ['version', 'rows', 'cols', 'contributions'];
        for (const key of requiredKeys) {
            if (!Object.keys(CTAB).includes(key)) {
                // if the required key is not found in our CTAB Object, it is not valid
                isValid = false;
                console.warn(`Invalid CTAB: Not all of the required keys (${requiredKeys}) were present in CTAB Object`);
                return;
            }
        }

        // Check if dimensions are right
        if (CTAB.cols.length !== CTAB.contributions.length) {
            isValid = false;
            console.warn('Invalid CTAB: number of contribution sets does not match the number of columns');
        }
        if (!CTAB.contributions.every(contribution => {
            return contribution.length === CTAB.rows.length
        })) {
            isValid = false;
            console.warn('Invalid CTAB: The length of all contributions does not the number of categories (rows)');
        }
    } else {
        isValid = false;
        console.warn('Invalid CTAB: empty Object');
    }

    return isValid
}
