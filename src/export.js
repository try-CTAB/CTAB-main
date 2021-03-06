export function exportPlainText(CTAB, forMarkDown) {
    console.log('[Export Utilities] generating plaintext representation of table');
    const longestCategory = CTAB.rows.reduce((a,b) => {  return a.length > b.length ? a : b }).length;

    let rawFormat = '';
    rawFormat += '| ' + 'CTAB V'+CTAB.version +' '.repeat(longestCategory-CTAB.version.length-6) +
        ' | ' + CTAB.cols.join(' | ') + ' |\n';
    if ( forMarkDown ) {  // add the | ---- | for markdown
        rawFormat += '| ' + '-'.repeat(longestCategory - 1) + ': | :' + CTAB.cols.map(col => {
            return '-'.repeat(col.length - 2)
        }).join(': | :') + ': |\n';
    }
    for (const [i, row] of CTAB.rows.entries()) {
        rawFormat += '| ' + row + ' '.repeat(longestCategory-row.length) + ' | ' + CTAB.contributions.map((contribution, index) => {
            const colLength = CTAB.cols[index].length;
            const contDegree = contribution[i]
            return ' '.repeat(Math.floor((colLength-contDegree)/2)) + '*'.repeat(contDegree) + ' '.repeat(Math.ceil((colLength-contDegree)/2));
        }).join(' | ') + ' |\n';
    }

    return rawFormat
}

// export in format pastable in LaTeX. Requires/includes xcolor package import
export function exportRichLatex(CTAB) {
    const numcols = CTAB.cols.length;
    console.log('[Export Utilities] generating rich LaTeX representation of table');
    let table = '';
    table += '% Contribution table generated by https://try-ctab.github.io/#/editor \n';
    table += '% \\usepackage{array} \n'; // needed for fixed column widths
    table += '% \\usepackage[table]{xcolor} \n'; // needed for shaded cells
    table += '% \\usepackage{graphicx} \n'; // needed for rotated text
    table += '% \\usepackage{hhline} \n'; // needed for shaded cells
    table += '\\newcommand*\\rot{\\rotatebox{90}} \n';
    table += '\\setlength{\\arrayrulewidth}{0.7mm} \n'; // appearance
    table += '\\renewcommand{\\arraystretch}{2.1} \n';  // bit of a hacky way to get boxes to be close to square
    table += '\\definecolor{version}{HTML}{DCDCDC}\n'  // add a light shade of gray for the version number
    table += '\\definecolor{background}{HTML}{FFFFFF}\n'  // add a background color in absence of transparent text
    table += '\\definecolor{C1}{HTML}{FFFFFF}\n'  // add a color for level 1
    table += '\\definecolor{C2}{HTML}{A0A0A0}\n'  // add a color for level 3
    table += '\\definecolor{C3}{HTML}{303030}\n'  // add a color for level 3
    table += '\\begin{tabular}{ r | ' + 'm{0.5cm} | '.repeat(numcols) + '} \n';
    // the \multicolumn{1}{c}{} is a bit hacky, but it removes the vertical lines from the header
    // Add header
    table += '\\multicolumn{1}{c}{\\textcolor{version}{' + 'CTAB V' + CTAB.version +  '\\textcolor{background}{|}}} & \\multicolumn{1}{c}{\\rot{' +
        CTAB.cols.join('\\textcolor{background}{|}}} & \\multicolumn{1}{c}{\\rot{') + '\\textcolor{background}{|}}} \\\\ \n';
    table += '\\hhline{~|' + '-|'.repeat(numcols) +'} \n';
    // add main table body
    for (const [i, row] of CTAB.rows.entries() ) {
        table += '\\textcolor{background}{|}'+row + '\\textcolor{background}{|} & ' + CTAB.contributions.map(contribution => {
            return '\\cellcolor{C' + (contribution[i]+1) + '}' + '\\textcolor{C'+(contribution[i]+1)+'}{' +'*'.repeat(contribution[i]) + '|}';
        }).join(' & ') + ' \\\\ \n'
        table += '\\hhline{~|' + '-|'.repeat(numcols) +'} \n';
    }
    table += '\\end{tabular}';

    return table
}

// same as rich latex, but without any additional packages
export function exportBasicLatex(CTAB) {
    console.log('[Export Utilities] generating basic LaTeX representation of table');
    const numcols = CTAB.cols.length;

    let table = '';
    table += '% Contribution table (no-package mode) generated by https://try-ctab.github.io/#/editor \n';
    table += '\\setlength{\\arrayrulewidth}{0.7mm} \n'; // appearance
    table += '\\renewcommand{\\arraystretch}{2.1} \n';  // bit of a hacky way to get boxes to have more square aspect
    table += '\\begin{tabular}{ r | ' + 'c | '.repeat(numcols) + '} \n';
    table += '\\multicolumn{1}{c}{' + 'CTAB V' + CTAB.version +  '} & \\multicolumn{1}{c}{' + CTAB.cols.join('} & \\multicolumn{1}{c}{') + '} \\\\ \n';
    table += '\\cline{2-'+ (numcols+1) + '} \n';
    for (const [i, row] of CTAB.rows.entries() ) {
        table += row + ' & ' + CTAB.contributions.map(contribution => {
            return '*'.repeat(contribution[i]);
        }).join(' & ') + ' \\\\ \n';
        table += '\\cline{2-'+ (numcols+1) + '} \n';
    }
    table += '\\end{tabular}';

    return table
}

export function exportEditorLink(CTAB, skipbaseURL) {
    console.log('[Export Utilities] generating editor link for contribution table');
    let baseURLString = '';
    if (!skipbaseURL) {
        baseURLString = window.location.href.split('?')[0];  // get URL minus any pre-existing params
    }
    baseURLString += '?';

    baseURLString += 'version=' + CTAB.version;
    baseURLString += '&cols=' + CTAB.cols.map(col => col.replace(/ /g, '%20'));  // replace spaces with %20
    baseURLString += '&rows=' + CTAB.rows.map(row => row.replace(/ /g, '%20'));  // replace spaces with %20
    baseURLString += '&contributions=' + CTAB.contributions.join('~');

    return baseURLString
}
