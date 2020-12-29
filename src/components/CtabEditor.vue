<template>
    <div class="CTAB-editor">
        <button @click="testCopy">Copy HTML rough</button>
        <div class="format-box">
            <a href="https://nemoandrea.github.io/better-contributions-spec/" target="_blank" style="margin: 1rem; font-size: 1.4rem">Docs</a>
        </div>
        <div class="editor-flexbox">
            <div class="shortcut-box">
                <div class="shortcut-title">Keyboard Shortcuts</div>
                <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">C</span> for a new column </div>
                <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">R</span> for a new row </div>
                <div class="shortcut-hint"> Use <span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-left</v-icon></span>,
                    <span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-right</v-icon></span>,
                    <span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-up</v-icon></span>,
                    <span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-down</v-icon></span> To navigate </div>
                <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">Q</span> to delete a row</div>
                <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">W</span> to delete a column</div>
                <div class="shortcut-hint"> Use <span class="keyboard-key">Shift </span>+<span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-left</v-icon></span>,
                    <span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-right</v-icon></span>,
                    <span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-up</v-icon></span>,
                    <span class="keyboard-key"><v-icon color="var(--keyboard-white)">mdi-arrow-down</v-icon></span>  to move rows and columns </div>
                <div class="shortcut-hint">Use <span class="keyboard-key">+</span>,<span class="keyboard-key">-</span>
                or press<span class="keyboard-key">1</span><span class="keyboard-key">2</span><span class="keyboard-key">3</span> to set contribution degree</div>
                <div class="shortcut-hint">Press <span class="keyboard-key">Enter </span> to edit/confirm a label</div>
                <div class="shortcut-hint">Press <span class="keyboard-key">Shift </span>+<span class="keyboard-key">/</span> to reset the table</div>
            </div>
            <div class="editor-tbl-container">
                <table id="editor-tbl">
                    <tr>
                        <th class="CTAB-meta">CTAB V{{CTAB.version}}</th>
                        <td v-for="(col, index) in CTAB.cols" :key="col.id" style="position: relative"
                            :class="'grid-c' + (index+1) + 'r0'"
                         >
                            <div class="CTAB-column-input" ><v-text-field
                                    color="var(--theme-deep-red)"
                                    :value="CTAB.cols[index]"
                                    dense
                                    hide-details
                                    v-model="CTAB.cols[index]"
                                    :ref="'col'+(index+1)"
                                    @focus="$event.target.select()"
                            ></v-text-field></div>
                        </td>
                    </tr>
                    <tr v-for="(row, rowIndex) in CTAB.rows" :key="row.id">
                        <td class="CTAB-row" :class="'grid-c0r' + (rowIndex+1)"><v-text-field
                            color="var(--theme-deep-red)"
                            :value="CTAB.rows[rowIndex]"
                            dense
                            hide-details
                            v-model="CTAB.rows[rowIndex]"
                            :ref="'row'+(rowIndex+1)"
                            @focus="$event.target.select()"

                            ></v-text-field></td> <!--v-on:keydown.enter="$event.target.blur()"-->
                        <td v-for=" (val, colIndex) in CTAB.contributions.map(contribution => contribution[rowIndex])"
                            :key="val.id"
                            class="grid-el"
                            :class="'contribution-level-'+val + ' grid-c' + (colIndex+1) + 'r' + (rowIndex+1)"
                            @click="edit_contents(colIndex, rowIndex)">
                            {{'*'.repeat(val)}}
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="export-box">
            <div class="export-header">Export options</div>
            <div class="export-options">
                <export-card format="raw" :contribution-table="CTAB" :save-option=true>
                    <template v-slot:header>Raw Format</template>
                    <template v-slot:quick-summary>Export the {{name}} in the plaintext Raw Format. Markdown compatible.</template>
                </export-card>

                <export-card format="link" :contribution-table="CTAB">
                    <template v-slot:header>Editor link</template>
                    <template v-slot:quick-summary>Export as a sharable link to the editor</template>
                </export-card>

                <div class="export-item-spacer">OR</div>
                <export-card :details=true format="LaTeX" :contribution-table="CTAB">
                    <template v-slot:header>LaTeX table</template>
                    <template v-slot:quick-summary>Export the {{name}} as a LaTeX table</template>
                    <template v-slot:details-text>The default export includes the <b>[xcolor, array, graphicx, hhline]</b> packages. If you want a plain LaTeX version, press 'alt export' </template>
                </export-card>
                <export-card :notReady=true :contribution-table="CTAB">
                    <template v-slot:header>PDF</template>
                    <template v-slot:quick-summary>Export the {{name}} as a PDF object</template>
                </export-card>
                <export-card :notReady=true :contribution-table="CTAB">
                    <template v-slot:header> HTML</template>
                    <template v-slot:quick-summary>Export as HTML element, complete with styling and JS</template>
                </export-card>
                <export-card :notReady=true :contribution-table="CTAB">
                    <template v-slot:header>Word table</template>
                    <template v-slot:quick-summary>Export as a table for Microsoft Word</template>
                </export-card>
                <div class="export-item-spacer">OR</div>
                <export-card :notReady=true :contribution-table="CTAB">
                    <template v-slot:header>PNG</template>
                    <template v-slot:quick-summary>Export as PNG raster image</template>
                </export-card>
                <div class="halfbackdrop"></div> <!--TODO remove or keep?-->
            </div>
        </div>
    </div>
</template>

<script>
    import ExportCard from "./ExportCard";
    // eslint-disable-next-line no-unused-vars
    import { exportPlainText } from "../export.js"
    import { parseEditorQuery, isValidCTAB } from "../parser.js"
    export default {
        name: "CTAB-editor",
        components: {ExportCard},
        data: () => ({
            CTAB: {cols: ['E. X. Ample', 'T. Esting','R. E. Viewer'],
                rows: ['manuscript', 'experiments','feedback'],
                contributions: [[0,1,2],[1,2,1],[0,0,1]],
                version: '0.1'},
            tableEl: null,
            keysDown: {},
            cursor: {row:2, col:2},
            metadata: {lowerDegreeLimit:0, upperDegreeLimit:2},
            name: 'contribution table',
            focusedInput: null
        }),
        methods: {

            testFocus(index) {
                console.log('FOcusssing on' + index);
                this.$refs[ 'col' + (index+1) ][0].focus()
            },

            drawTable() {
                console.log('Re-drawing the contribution table');
                this.drawCursor()
            },

            edit_contents(col ,row) {
                this.cursor.row = row+1;
                this.cursor.col = col+1;
                this.drawCursor()
            },

            addRow(name) {
                this.CTAB.rows.splice( this.cursor.row, 0, name);
                // update the contributions arrays (add a zero to each array in .contributions at appropriate index)
                for (let singleContribution of this.CTAB.contributions) {
                    singleContribution.splice(this.cursor.row , 0, this.metadata.lowerDegreeLimit)
                }
                // make sure we automatically select the text box to enter name
                this.$nextTick(() => {
                    // focus on the last text input element (which is the one we just added!)
                    this.setInputFocus( 'row' + (this.cursor.row+1) );
                    Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);
                    // update the cursor (move it to the location the user is most likely to want to start editing)
                    this.cursor = {row: this.cursor.row+1, col: 1 };
                    this.drawCursor()
                });
            },

            addColumn(name) {
                this.CTAB.cols.splice( this.cursor.col, 0, name);
                // update the contributions array (in this case simply add an array of zeros)
                this.CTAB.contributions.splice(this.cursor.col, 0, Array(this.CTAB.rows.length).fill(this.metadata.lowerDegreeLimit));
                // make sure we automatically select the text box to enter name
                this.$nextTick(() => {
                    // focus on the last text input element (which is the one we just added!)
                    this.setInputFocus( 'col' + (this.cursor.col+1) );
                    Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);
                    // update the cursor (move it to the location the user is most likely to want to start editing)
                    this.cursor = {row: 1, col: this.cursor.col+1 };
                    this.drawCursor()
                });
            },

            // remove a row based on the current value of currentSquare
            removeRow() {
                if (this.cursor.row !== 0){  // we cannot remove the header
                    if (this.CTAB.rows.length > 1) { // cannot remove if we only have one left
                        console.log('removing row nr: ' + this.cursor.row);
                        this.CTAB.rows.splice(this.cursor.row - 1, 1);
                        Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);  // prevent accidental multi-removal
                        // also update the CTAB.contributions
                        this.CTAB.contributions.forEach(contribution => contribution.splice(this.cursor.row-1,1));
                    }
                }
            },

            // remove a column based on the current value of currentSquare
            removeColumn() {
                if (this.cursor.col !== 0){  // we cannot remove the header
                    if (this.CTAB.cols.length > 1) { // cannot remove if we only have one left
                        console.log('removing column nr: ' + this.cursor.col);
                        this.CTAB.cols.splice(this.cursor.col - 1, 1);
                        Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);  // prevent accidental multi-removal
                        // also update the CTAB.contributions
                        this.CTAB.contributions.splice(this.cursor.col-1, 1)
                    }
                }
            },

            setContribution(contributionDegree) {
                if (this.cursor.col>0 && this.cursor.row>0) {  // avoid setting a contribution level on a header
                    console.log(`Setting contribution of ${this.CTAB.cols[this.cursor.col-1]} in category ${this.CTAB.rows[this.cursor.row-1]} to: ${contributionDegree}`);
                    this.CTAB.contributions[this.cursor.col - 1].splice(this.cursor.row - 1, 1, contributionDegree);
                }
                this.$nextTick(() => {
                    this.drawCursor()
                });
            },

            // change the contribution level at the current cursor location. increases or decreases the value, rather
            // than directly setting a value for it
            changeContribution(shouldBeIncreased) {
                if (this.cursor.row > 0 && this.cursor.col > 0) {  // not in header or labels
                    let currentContributionDegree = this.CTAB.contributions[this.cursor.col - 1][this.cursor.row - 1];
                    if (shouldBeIncreased && currentContributionDegree < this.metadata.upperDegreeLimit) {  // incease onlu if allowed
                        this.CTAB.contributions[this.cursor.col-1].splice(this.cursor.row-1, 1, currentContributionDegree + 1);
                    } else if (!shouldBeIncreased && currentContributionDegree > this.metadata.lowerDegreeLimit) { // decrease only if allowed
                        this.CTAB.contributions[this.cursor.col-1].splice(this.cursor.row-1, 1, currentContributionDegree - 1);
                    }
                    this.$nextTick(() => {
                        this.drawCursor()
                    });
                }
            },

            // move row or column up or down (swap position with col above, below)
            rearrangeCTAB(direction) {
                if (direction === 1 && this.cursor.col < (this.CTAB.cols.length)  && this.cursor.col !==0 ) {
                    // if move right (swap with col right) - we check there is a col to right (and we are not in labels)
                    const currentIndex = this.cursor.col-1;
                    const swapIndex = this.cursor.col;
                    // swap the row labels (triggers a table redraw)
                    const target = this.CTAB.cols[swapIndex];
                    const current = this.CTAB.cols[currentIndex];
                    this.CTAB.cols.splice(swapIndex, 1, current);
                    this.CTAB.cols.splice(currentIndex, 1, target);
                    // make sure we also rearrange CTAB.contributions
                    const target_contributions = this.CTAB.contributions[swapIndex];
                    this.CTAB.contributions.splice(swapIndex, 1, this.CTAB.contributions[currentIndex]);
                    this.CTAB.contributions.splice(currentIndex, 1, target_contributions)
                } else if (direction === 2 && this.cursor.col > 1) {
                    // if move left (swap with col left) - we check there is a column to the left
                    const currentIndex = this.cursor.col-1;
                    const swapIndex = this.cursor.col-2;
                    // swap the row labels (triggers a table redraw)
                    const target = this.CTAB.cols[swapIndex];
                    const current = this.CTAB.cols[currentIndex];
                    this.CTAB.cols.splice(swapIndex, 1, current);
                    this.CTAB.cols.splice(currentIndex, 1, target);
                    // make sure we also rearrange CTAB.contributions
                    const target_contributions = this.CTAB.contributions[swapIndex];
                    this.CTAB.contributions.splice(swapIndex, 1, this.CTAB.contributions[currentIndex]);
                    this.CTAB.contributions.splice(currentIndex, 1, target_contributions)
                } else if (direction === 3 && this.cursor.row > 1) {
                    // if move up (swap with row above) - we check there is a row above
                    const currentIndex = this.cursor.row-1;
                    const swapIndex = this.cursor.row-2;
                    // swap the row labels (triggers a table redraw)
                    const target = this.CTAB.rows[swapIndex];
                    const current = this.CTAB.rows[currentIndex];
                    this.CTAB.rows.splice(swapIndex, 1, current);
                    this.CTAB.rows.splice(currentIndex, 1, target);
                    // make sure we also rearrange CTAB.contributions
                    const target_category = this.CTAB.contributions.map(x => x[swapIndex]);
                    this.CTAB.contributions.forEach(contribution => contribution[swapIndex] = contribution[currentIndex]);
                    this.CTAB.contributions.forEach((contribution, index) => contribution[currentIndex] = target_category[index]);
                } else if (direction === 4 && this.cursor.row < (this.CTAB.rows.length) && this.cursor.row !==0 ) {
                    // if move down (swap with row below) - we check there is a row below (and we are not in labels)
                    const currentIndex = this.cursor.row-1;
                    const swapIndex = this.cursor.row;
                    // swap the row labels (triggers a table redraw)
                    const target = this.CTAB.rows[swapIndex];
                    const current = this.CTAB.rows[currentIndex];
                    this.CTAB.rows.splice(swapIndex, 1, current);
                    this.CTAB.rows.splice(currentIndex, 1, target);
                    // make sure we also rearrange CTAB.contributions
                    const target_category = this.CTAB.contributions.map(x => x[swapIndex]);
                    this.CTAB.contributions.forEach(contribution => contribution[swapIndex] = contribution[currentIndex]);
                    this.CTAB.contributions.forEach((contribution, index) => contribution[currentIndex] = target_category[index]);
                }
                this.$nextTick(() => {
                    this.moveCurrentSquare(direction);  // also move the cursor so we can easily move a row or col multiple spots
                });
            },

            // attempt to move the 'cursor'
            moveCurrentSquare(directionVal) {
                //console.log('moving cursor' + directionVal)
                // we do not allow the cursor to be moved (directionally) when we are currently editing an input
                if (this.focusedInput === null) {
                    if (directionVal === 1) { // right
                        if (this.cursor.col < this.CTAB.cols.length) {
                            this.cursor.col++;
                        }
                    } else if (directionVal === 2) {// left
                        if (this.cursor.row === 0 && this.cursor.col > 1) { // we are in header row, so we can only go to 1
                            this.cursor.col--;
                        } else if (this.cursor.row > 0 && this.cursor.col > 0) { // we cant go further than 0
                            this.cursor.col--;
                        }
                    } else if (directionVal === 3) {// up
                        if (this.cursor.col === 0 && this.cursor.row > 1) { // we are in row labels, so we can only go to 1
                            this.cursor.row--;
                        } else if (this.cursor.col > 0 && this.cursor.row > 0) { // we cant go further than 0
                            this.cursor.row--;
                        }
                    } else if (directionVal === 4) {// down
                        if (this.cursor.row < this.CTAB.rows.length) {
                            this.cursor.row++;
                        }
                    }
                }
                this.drawCursor()
            },

            drawCursor() {
                // first remove the cursor class from the previously focussed element
                const old_focus = document.querySelectorAll(".cursor");
                [].forEach.call(old_focus, (el) => { el.classList.remove("cursor") });

                // and then add it to the new one!
                let focusedEl = document.querySelector('.grid-c' + this.cursor.col + 'r' + this.cursor.row);
                focusedEl.classList.add("cursor");
                focusedEl.focus()
            },

            editLabel() {
                if (this.focusedInput !== null) {  // an input was previously selected (either through cursor **or** adding new column/row
                    this.setInputFocus(this.focusedInput)
                } else if (this.cursor.row === 0) {  // nothing currently selected, but cursor is in the column labels
                    this.setInputFocus( 'col' + (this.cursor.col) );
                } else if (this.cursor.col === 0) {  // nothing currently selected, but cursor is in the row labels
                    this.setInputFocus( 'row' + (this.cursor.row) );
                }
            },

            // select or deselect input element
            setInputFocus(ref) {
                console.log('called set focus', ref);
                if (this.focusedInput !== ref) {
                    console.log('setting focus', ref);
                    this.$refs[ref][0].focus();
                    this.focusedInput=ref;
                } else {
                    console.log('blurring', ref);
                    this.$refs[this.focusedInput][0].blur();
                    this.focusedInput = null;
                }
            },

            // Reset the contribution table to an empty state (i.e. clear table)
            resetTable() {
                console.log('Resetting CTAB...');
                this.cursor = {row:1, col:1}; // reset cursor
                this.CTAB = {version: this.CTAB.version, cols:['undefined'], rows:['empty'], contributions: [[0]]}
                this.drawCursor()
            },

            handleKeyPress(event) {
                this.keysDown[event.key] = true;  // we store key's last state (true=pressed)
                //console.log(event);
                if (this.keysDown["Shift"] && (this.keysDown["C"] || this.keysDown["c"])) {
                    this.addColumn('undefined');
                    event.preventDefault();  // prevent typing 'c'
                } else if (this.keysDown["Shift"] && (this.keysDown["R"] || this.keysDown["r"])) {
                    this.addRow('empty');
                    event.preventDefault();  // prevent typing 'r'
                } else if (this.keysDown["Shift"] && (this.keysDown["Q"] || this.keysDown["q"])) {
                    this.removeRow();
                    event.preventDefault();  // prevent typing 'q'
                } else if (this.keysDown["Shift"] && (this.keysDown["W"] || this.keysDown["w"])) {
                    this.removeColumn();
                    event.preventDefault();  // prevent typing 'W'
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowRight']) {
                    this.rearrangeCTAB(1);
                    event.preventDefault();
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowLeft']) {
                    this.rearrangeCTAB(2);
                    event.preventDefault();
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowUp']) {
                    this.rearrangeCTAB(3);
                    event.preventDefault();
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowDown']) {
                    this.rearrangeCTAB(4);
                    event.preventDefault();
                } else if (this.keysDown['?']) {
                    this.resetTable();
                    event.preventDefault();
                } else if (this.keysDown['Enter']) {
                    this.editLabel();
                    event.preventDefault();
                } else if (this.keysDown['ArrowRight']) {
                    this.moveCurrentSquare(1);
                } else if (this.keysDown['ArrowLeft']) {
                    this.moveCurrentSquare(2);
                } else if (this.keysDown['ArrowUp']) {
                    this.moveCurrentSquare(3);
                } else if (this.keysDown['ArrowDown']) {
                    this.moveCurrentSquare(4);
                } else if (this.keysDown['1']) {
                    this.setContribution(0)
                } else if (this.keysDown['2']) {
                    this.setContribution(1)
                } else if (this.keysDown['3']) {
                    this.setContribution(2)
                } else if (this.keysDown['+'] || this.keysDown[']']) {
                    this.changeContribution(true)
                } else if (this.keysDown['_'] || this.keysDown['[']) {
                    this.changeContribution(false)
                }
            },

            handleKeyUp(event) {
                this.keysDown[event.key] = false;  // here is where we reset a key's state when it is released
            },

            testCopy(){
                const doc = document;
                const text = doc.getElementById( 'editor-tbl' );
                let range;
                let selection;

                if( doc.body.createTextRange ) {

                    range = doc.body.createTextRange();
                    range.moveToElement( text );
                    range.select();

                } else if ( window.getSelection ) {

                    selection = window.getSelection();

                    range = doc.createRange();
                    range.selectNodeContents( text );

                    selection.removeAllRanges();
                    selection.addRange( range );

                }

                document.execCommand( 'copy' );
                window.getSelection().removeAllRanges();
            },

            parseQuery() {
                // in the URL a CTAB can be specified following the # symbol. see docs for more.
                let query = new URLSearchParams(window.location.hash);
                let parsedCTAB = parseEditorQuery(query);
                // make sure that whatever the hash parameters were, it is actually a valid CTAB
                if ( isValidCTAB( parsedCTAB ) ) {
                    console.log('[Parser] adding CTAB from query string!');
                    this.CTAB = parsedCTAB;
                }
            },
        },
        mounted() {
            // initialise a grid from rows + categories
            this.tableEl = document.querySelector('#editor-tbl');

            this.drawTable();
            // handle keypresses
            window.addEventListener("keydown", this.handleKeyPress);
            window.addEventListener("keyup", this.handleKeyUp);

            // manage the variables in localStroage
            // we store meta variables in localstorage, so they can manually be overriden by people that feel like it
            localStorage.getItem("meta_lowerDegreeLimit") !== null ? this.metadata.lowerDegreeLimit = Number(localStorage.getItem("meta_lowerDegreeLimit")) :
                localStorage.setItem("meta_lowerDegreeLimit", String(this.metadata.lowerDegreeLimit));
            localStorage.getItem("meta_upperDegreeLimit") !== null ? this.metadata.upperDegreeLimit = Number(localStorage.getItem("meta_upperDegreeLimit")) :
                localStorage.setItem("meta_upperDegreeLimit", String(this.metadata.upperDegreeLimit));

            // parse any possible query string
            this.parseQuery();

            // make sure the CTAB has proper ctrl-c behaviour (the clipboard is formatted correctly)
            // document.getElementById('editor-grid').addEventListener('copy', (e)=>{
            //     e.preventDefault();
            //     e.clipboardData.setData("Text", exportPlainText(this.CTAB) );
            // });
        }
    }
</script>

<style>
    .CTAB-editor {
        background-color: var(--theme-white);
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        --gridsize: 40px;
    }

    .editor-tbl-container{
       display: flex;
        justify-content: center;
        flex-grow: 1
    }

    .CTAB-meta {
        color: rgba(0,0,0,0.1);
    }

    table, th, td {border-collapse: collapse; border-spacing: 0}

    .grid-el {
        background-color: floralwhite;
        font-size: 8px;
        border: 4px solid black;
        width: var(--gridsize);
        height: var(--gridsize);
    }

    .grid-el.cursor{
        position: relative;
    }

    .grid-el.cursor:before{
        content : "";
        position: absolute;
        left    : 0;
        bottom  : 0;
        height  : 100%;
        width   : 100%;
        border: 2.5px solid var(--theme-soft-pink);
    }

    .contribution-level-0 {
        background-color: white;
        color: white;
    }

    .contribution-level-1 {
        background-color: #A0A0A0;
        color: #A0A0A0;
    }

    .contribution-level-2 {
        background-color: 	#303030;
        color: #303030
    }

    .gridbars {
        background-color: rgba(0,0,0,0.9);
        /*border-radius: 5px;*/
        grid-row-start: 2;
        grid-column-start: 2;
    }

    .editor-flexbox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-grow: 1
    }

    .CTAB-row{
        padding-right: 0.8rem;
    }

    .CTAB-row.cursor {
        font-weight: bold;
    }

    .CTAB-column {
        align-self: end;
        justify-self: center;

        grid-row: 0;
        position: relative;
    }

    .CTAB-column-input {
        position: absolute;
        bottom: 0px;
        left: 15px;
        transform-origin: center left;
        transform: rotate(-70deg);
        width: 100px;
    }

    .cursor .CTAB-column-input  {
        font-weight: bold;
    }

    .shortcut-box {
        margin: 1rem;
    }

    .shortcut-title {
        font-size: 1.2rem;
        font-weight: bold;
        padding-bottom: 0.3rem;
        color: var(--theme-deep-red);
    }

    .shortcut-hint {
        margin: 10px 0px;
    }

    .keyboard-key {
        background: var(--theme-deep-red);
        color: var(--keyboard-white);
        padding: 3px 5px;
        border-radius: 3px;
        margin: 0px 3px;
        filter: drop-shadow(0 3.5px 0 var(--theme-oxblood));
    }

    /* ensure rows are right aligned*/
    .CTAB-row .v-text-field input {
        text-align: right;
    }

    .export-box{
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .export-header {
        font-size: 1.3rem;
        text-align: center;
        font-weight: bold;
        color: var(--theme-brightpink);
    }

    .export-options {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    .export-item {
        margin: 1rem;
    }

    .export-item-spacer {
        margin: 0.5rem;
        font-weight: bold;
        font-size: 1.1rem;
        color: var(--theme-brightpink);
        z-index: 1;
    }

    /*.halfbackdrop {*/
    /*    position: absolute;*/
    /*    width: 100%;*/
    /*    background-color: rgba(0,0,0,0.3);*/
    /*    height: 50%;*/
    /*    bottom: 0;*/
    /*    z-index: 0;*/
    /*}*/

</style>

