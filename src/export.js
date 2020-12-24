export function exportPlainText(heatmap) {
    console.log('[Export Utilities] generating plaintext representation of heatmap');
    return heatmap.rows.join('-')
}
