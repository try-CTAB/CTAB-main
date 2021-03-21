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

export function parseCTABstring( CTABstring) {
    console.log('[Parser] parsing plain CTAB string');
    let CTAB = {};  // our output JS object

    // split string by newlines, and remove any empty lines (e.g. trailing newline at end)
    let lines = CTABstring.split('\n').filter(item => item);

    lines.forEach((line, index) => {
        // separate the different table cells ( | delimiter), but only keep cells that are length>0
        // This means a left delimiter at the start and a right delimiter at the end is optional
        let cells = line.split('|').filter(cell => cell.length>0);
        // remove leading and traiing spaces (but not in between!) and remove all tabs
        cells = cells.map(cell => cell.trim().replace('\t',''));
        //console.log(index, line, cells)

        if (index === 0) { // if header
            // we find (regex) a (optionally) decimal number in the the meta field. If we find nothing we set version to '?'
            const versionNum = cells[0].match(/\d*\.?\d*$/)[0];
            CTAB.version = versionNum.length > 0 ? versionNum : '?';
            CTAB.cols = cells.slice(1);  // get the column names (e.g. author names
            // prepare some arrays
            CTAB.rows = [];  // set up rows
            CTAB.contributions = cells.slice(1).map(() => []); // set up contributions
        } else { // if not header
            CTAB.rows.push(cells[0]); // first entry will be category label
            CTAB.contributions.forEach((contribution, index) => {
                //contribution.push( cells[index+1].length )
                contribution.push( (cells[index+1].match(/\*/g) || []).length )
            })
        }
    });
    return CTAB
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
                break;
            } else if ( CTAB[key].length === 0 ){
                isValid = false;
                console.warn(`Invalid CTAB: the required key '${key}' is empty`);
                break;
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

// checks if a CTAB config string is valid
export function parseCTABconfig( configString ) {
    if (configString === null) { return [false, '']}  // if the string is empty, we return no message
    //console.log('parsing config string: ' + configString);
    try {
        let config = JSON.parse(configString);
        // first check if all the keys are there
        const requiredKeys = ['configVersion', 'id', 'categories'];
        for (const key of requiredKeys) {
            if (!(Object.keys(config).includes(key))) {
                console.log('missing key: ' + key)
                return [false, 'Config JSON missing required key: ' + key]
            }
        }
        // check if the categories are valid
        if ( !Array.isArray(config.categories) ) { return [false, 'Categories are not formatted as array. Example of' +
        ' valid is -> categories: ["experiments","writing"]']}
        if ( !(config.categories.length > 1))  { return [false,'Only one item in "categories" array.' +
        ' At least 2 are required.']}

        // All failure checks passed; config is (probably) valid
        return [true, null]
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            return [false, 'Invalid JSON, did you paste the whole config string?']
        } else {
            return [false, e]
        }
    }

}
