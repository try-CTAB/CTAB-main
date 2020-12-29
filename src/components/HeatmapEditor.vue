<template>
    <div class="heatmap-editor">
<!--        cursor: {{cursor}} <br>-->
<!--        rows: {{heatmap.rows}} <br>-->
<!--        columns: {{heatmap.cols}} <br>-->
<!--        contributions: {{heatmap.contributions}}-->
<!--        <v-btn depressed @click="testName">-->
<!--            test-->
<!--        </v-btn>-->
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
            </div>
            <div class="heatmap-html-element">
                <table id="tabley">
                    <tr>
                        <th>CTAB V0.1</th>
                        <td v-for="(col, index) in heatmap.cols" :key="col.id" style="position: relative;" >
                            <div class="heatmap-column-input-tbl"><v-text-field
                                    color="var(--theme-deep-red)"
                                    :value="heatmap.cols[index]"
                                    dense
                                    hide-details
                                    v-model="heatmap.cols[index]"
                                    :ref="'col'+(index+1)"
                                    @focus="$event.target.select()"
                            ></v-text-field></div>
                        </td>
                    </tr>
                    <tr v-for="(row, rowIndex) in heatmap.rows" :key="row.id">
                        <td class="heatmap-row-tbl"><v-text-field
                            color="var(--theme-deep-red)"
                            :value="heatmap.rows[rowIndex]"
                            dense
                            hide-details
                            v-model="heatmap.rows[rowIndex]"
                            :ref="'row'+(rowIndex+1)"
                            @focus="$event.target.select()"
                            ></v-text-field></td>
                        <td v-for=" (val, colIndex) in heatmap.contributions.map(contribution => contribution[rowIndex])"
                            :key="val.id"
                            class="grid-el-tbl"
                            :class="'contribution-level-'+val + ' grid-c' + (colIndex+1) + 'r' + (rowIndex+1)"
                            @click="edit_contents(colIndex, rowIndex)">
                            {{'*'.repeat(val)}}
                        </td>
                    </tr>
                </table>


                <div id="editor-grid">

                    <div class="heatmap-meta">CHM V0.1</div>
                    <div v-for="(col, index) in heatmap.cols" :key="col.id" class="heatmap-column"
                         :class="'grid-c'+(index+1)+'r0'" v-bind:style="{ gridColumn: (index+2)}" >
                        <div  class="heatmap-column-input">
                        <v-text-field
                                color="var(--theme-deep-red)"
                                :value="heatmap.cols[index]"
                                dense
                                hide-details
                                v-model="heatmap.cols[index]"
                                :ref="'col'+(index+1)"
                                @focus="$event.target.select()"
                        ></v-text-field>
                        </div>
                    </div>
                    <div v-for="(row, index) in heatmap.rows" :key="row.id" class="heatmap-row"
                         :class="'grid-c0r'+(index+1)" v-bind:style="{ gridRow: (index+2)}">
                        <v-text-field class="shrink"
                                color="var(--theme-deep-red)"
                                :value="heatmap.rows[index]"
                                dense
                                hide-details
                                v-model="heatmap.rows[index]"
                                :ref="'row'+(index+1)"
                                @focus="$event.target.select()"
                        ></v-text-field>
                    </div>
                    <div class="gridbars"></div>
                </div>
            </div>
        </div>
        <div class="export-box">
            <div class="export-header">Export options</div>
            <div class="export-options">
                <export-card format="raw" :contribution-table="heatmap" :save-option=true>
                    <template v-slot:header>Raw Format</template>
                    <template v-slot:quick-summary>Export the {{name}} in the plaintext Raw Format. Markdown compatible.</template>
                </export-card>

                <export-card format="link" :contribution-table="heatmap">
                    <template v-slot:header>Editor link</template>
                    <template v-slot:quick-summary>Export as a sharable link to the editor</template>
                </export-card>

                <div class="export-item-spacer">OR</div>
                <export-card :details=true format="LaTeX" :contribution-table="heatmap">
                    <template v-slot:header>LaTeX table</template>
                    <template v-slot:quick-summary>Export the {{name}} as a LaTeX table</template>
                    <template v-slot:details-text>The default export includes the <b>[xcolor, array, graphicx, hhline]</b> packages. If you want a plain LaTeX version, press 'alt export' </template>
                </export-card>
                <export-card :notReady=true :contribution-table="heatmap">
                    <template v-slot:header>PDF</template>
                    <template v-slot:quick-summary>Export the {{name}} as a PDF object</template>
                </export-card>
                <export-card :notReady=true :contribution-table="heatmap">
                    <template v-slot:header> HTML</template>
                    <template v-slot:quick-summary>Export as HTML element, complete with styling and JS</template>
                </export-card>
                <export-card :notReady=true :contribution-table="heatmap">
                    <template v-slot:header>Word table</template>
                    <template v-slot:quick-summary>Export as a table for Microsoft Word</template>
                </export-card>
                <div class="export-item-spacer">OR</div>
                <export-card :notReady=true :contribution-table="heatmap">
                    <template v-slot:header>PNG</template>
                    <template v-slot:quick-summary>Export as PNG raster image</template>
                </export-card>
                <div class="halfbackdrop"></div>

            </div>
        </div>
    </div>
</template>

<script>
    import ExportCard from "./ExportCard";
    // eslint-disable-next-line no-unused-vars
    import { exportPlainText } from "../export.js"
    export default {
        name: "HeatmapEditor",
        components: {ExportCard},
        data: () => ({
            heatmap: {cols: ['E. X. Ample', 'T. Esting','R. E. Viewer'],
                rows: ['manuscript', 'experiments','feedback'],
                contributions: [[0,1,2],[1,2,1],[0,0,1]]},
            heatmapEl: null,
            keysDown: {},
            cursor: {row:2, col:2},
            metadata: {lowerDegreeLimit:0, upperDegreeLimit:2},
            name: 'contribution table'
        }),
        watch: {
            heatmap: {
                handler(){
                    this.drawHeatmap()
                },
                deep: true
            }
        },
        methods: {
            drawHeatmap() {
                console.log('Re-drawing the heatmap');
                // fix the number of rows and cols
                this.heatmapEl.style.gridTemplateRows = '1fr' + ' var(--gridsize)'.repeat(this.heatmap.rows.length);
                this.heatmapEl.style.gridTemplateColumns = '1fr' + ' var(--gridsize)'.repeat(this.heatmap.cols.length);
                // this.heatmap.style.gridTemplateRows = ;
                this.drawContents();
                this.drawBorder();
                this.drawCursor()
            },



            drawContents() {
                // remove the old grid elements
                document.querySelectorAll('.grid-el').forEach(e => e.remove());
                // add new grid elements
                for (let i = 0; i < this.heatmap.cols.length; i++) {
                    for (let j = 0; j < this.heatmap.rows.length; j++) {
                        let grid_element = document.createElement('div');
                        grid_element.classList.add("grid-el");
                        grid_element.classList.add(`grid-c${i+1}r${j+1}`);
                        grid_element.classList.add(`contribution-level-${this.heatmap.contributions[i][j]}`);
                        grid_element.innerHTML = this.heatmap.contributions[i][j];
                        grid_element.style.gridColumn = i + 2;
                        grid_element.style.gridRow = j + 2;
                        grid_element.addEventListener("click", ()=>{this.edit_contents(i, j)});
                        this.heatmapEl.appendChild(grid_element)
                    }
                }
            },

            drawBorder() {
                let el = document.querySelector('.gridbars');
                el.style.gridColumnEnd = this.heatmap.cols.length + 2;
                el.style.gridRowEnd = this.heatmap.rows.length + 2;
            },

            edit_contents(col ,row) {
                this.cursor.row = row+1;
                this.cursor.col = col+1;
                this.drawCursor()
            },

            // attempt to move the 'cursor'
            moveCurrentSquare(directionVal) {
                //console.log('moving cursor' + directionVal)
                if (directionVal === 1) { // right
                    if (this.cursor.col < this.heatmap.cols.length) {
                        this.cursor.col++;
                    }
                } else if (directionVal === 2) {// left
                    if (this.cursor.row === 0 && this.cursor.col > 1) { // we are in header row, so we can only go to 1
                        this.cursor.col--;
                    } else if (this.cursor.row > 0 && this.cursor.col > 0 ) { // we cant go further than 0
                        this.cursor.col--;
                    }
                } else if (directionVal === 3) {// up
                    if (this.cursor.col === 0 && this.cursor.row > 1) { // we are in row labels, so we can only go to 1
                        this.cursor.row--;
                    } else if (this.cursor.col > 0 &&this.cursor.row > 0 ) { // we cant go further than 0
                        this.cursor.row--;
                    }
                } else if (directionVal === 4) {// down
                    if (this.cursor.row < this.heatmap.rows.length) {
                        this.cursor.row++;
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

            addRow(name) {
                this.heatmap.rows.splice( this.cursor.row, 0, name);
                // update the contributions arrays (add a zero to each array in .contributions at appropriate index)
                for (let singleContribution of this.heatmap.contributions) {
                    singleContribution.splice(this.cursor.row , 0, this.metadata.lowerDegreeLimit)
                }
                // make sure we automatically select the text box to enter name
                this.$nextTick(() => {
                    // focus on the last text input element (which is the one we just added!)
                    this.$refs[ 'row' + (this.cursor.row+1) ][0].focus();
                    Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);
                });
            },

            addColumn(name) {
                this.heatmap.cols.splice( this.cursor.col, 0, name);
                // update the contributions array (in this case simply add an array of zeros)
                this.heatmap.contributions.splice(this.cursor.col, 0, Array(this.heatmap.rows.length).fill(this.metadata.lowerDegreeLimit));
                // make sure we automatically select the text box to enter name
                this.$nextTick(() => {
                    // focus on the last text input element (which is the one we just added!)
                    this.$refs[ 'col' + (this.cursor.col+1) ][0].focus();
                    Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);
                });
            },

            // remove a row based on the current value of currentSquare
            removeRow() {
                if (this.cursor.row !== 0){  // we cannot remove the header
                    if (this.heatmap.rows.length > 1) { // cannot remove if we only have one left
                        console.log('removing row nr: ' + this.cursor.row);
                        this.heatmap.rows.splice(this.cursor.row - 1, 1);
                        Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);  // prevent accidental multi-removal
                        // also update the heatmap.contributions
                        this.heatmap.contributions.forEach(contribution => contribution.splice(this.cursor.row-1,1));
                    }
                }
            },

            // remove a column based on the current value of currentSquare
            removeColumn() {
                if (this.cursor.col !== 0){  // we cannot remove the header
                    if (this.heatmap.cols.length > 1) { // cannot remove if we only have one left
                        console.log('removing column nr: ' + this.cursor.col);
                        this.heatmap.cols.splice(this.cursor.col - 1, 1);
                        Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);  // prevent accidental multi-removal
                        // also update the heatmap.contributions
                        this.heatmap.contributions.splice(this.cursor.col-1, 1)
                    }
                }
            },

            setContribution(contributionDegree) {
                if (this.cursor.col>0 && this.cursor.row>0) {  // avoid setting a contribution level on a header
                    console.log(`Setting contribution of ${this.heatmap.cols[this.cursor.col-1]} in category ${this.heatmap.rows[this.cursor.row-1]} to: ${contributionDegree}`);
                    this.heatmap.contributions[this.cursor.col - 1].splice(this.cursor.row - 1, 1, contributionDegree);
                }
                this.$nextTick(() => {
                    this.drawCursor()
                });
            },

            // change the contribution level at the current cursor location. increases or decreases the value, rather
            // than directly setting a value for it
            changeContribution(shouldBeIncreased) {
                if (this.cursor.row > 0 && this.cursor.col > 0) {  // not in header or labels
                    let currentContributionDegree = this.heatmap.contributions[this.cursor.col - 1][this.cursor.row - 1]
                    if (shouldBeIncreased && currentContributionDegree < this.metadata.upperDegreeLimit) {  // incease onlu if allowed
                        this.heatmap.contributions[this.cursor.col-1].splice(this.cursor.row-1, 1, currentContributionDegree + 1);
                    } else if (!shouldBeIncreased && currentContributionDegree > this.metadata.lowerDegreeLimit) { // decrease only if allowed
                        this.heatmap.contributions[this.cursor.col-1].splice(this.cursor.row-1, 1, currentContributionDegree - 1);
                    }
                }
            },

            // move row or column up or down (swap position with col above, below)
            rearrangeHeatmap(direction) {

                if (direction === 1 && this.cursor.col < (this.heatmap.cols.length)  && this.cursor.col !==0 ) {
                    // if move right (swap with col right) - we check there is a col to right (and we are not in labels)
                    const currentIndex = this.cursor.col-1;
                    const swapIndex = this.cursor.col;
                    // swap the row labels (triggers a table redraw)
                    const target = this.heatmap.cols[swapIndex];
                    const current = this.heatmap.cols[currentIndex];
                    this.heatmap.cols.splice(swapIndex, 1, current);
                    this.heatmap.cols.splice(currentIndex, 1, target);
                    // make sure we also rearrange heatmap.contributions
                    const target_contributions = this.heatmap.contributions[swapIndex];
                    this.heatmap.contributions.splice(swapIndex, 1, this.heatmap.contributions[currentIndex]);
                    this.heatmap.contributions.splice(currentIndex, 1, target_contributions)
                } else if (direction === 2 && this.cursor.col > 1) {
                    // if move left (swap with col left) - we check there is a column to the left
                    const currentIndex = this.cursor.col-1;
                    const swapIndex = this.cursor.col-2;
                    // swap the row labels (triggers a table redraw)
                    const target = this.heatmap.cols[swapIndex];
                    const current = this.heatmap.cols[currentIndex];
                    this.heatmap.cols.splice(swapIndex, 1, current);
                    this.heatmap.cols.splice(currentIndex, 1, target);
                    // make sure we also rearrange heatmap.contributions
                    const target_contributions = this.heatmap.contributions[swapIndex];
                    this.heatmap.contributions.splice(swapIndex, 1, this.heatmap.contributions[currentIndex]);
                    this.heatmap.contributions.splice(currentIndex, 1, target_contributions)
                } else if (direction === 3 && this.cursor.row > 1) {
                    // if move up (swap with row above) - we check there is a row above
                    const currentIndex = this.cursor.row-1;
                    const swapIndex = this.cursor.row-2;
                    // swap the row labels (triggers a table redraw)
                    const target = this.heatmap.rows[swapIndex];
                    const current = this.heatmap.rows[currentIndex];
                    this.heatmap.rows.splice(swapIndex, 1, current);
                    this.heatmap.rows.splice(currentIndex, 1, target);
                    // make sure we also rearrange heatmap.contributions
                    const target_category = this.heatmap.contributions.map(x => x[swapIndex]);
                    this.heatmap.contributions.forEach(contribution => contribution[swapIndex] = contribution[currentIndex]);
                    this.heatmap.contributions.forEach((contribution, index) => contribution[currentIndex] = target_category[index]);
                } else if (direction === 4 && this.cursor.row < (this.heatmap.rows.length) && this.cursor.row !==0 ) {
                    // if move down (swap with row below) - we check there is a row below (and we are not in labels)
                    const currentIndex = this.cursor.row-1;
                    const swapIndex = this.cursor.row;
                    // swap the row labels (triggers a table redraw)
                    const target = this.heatmap.rows[swapIndex];
                    const current = this.heatmap.rows[currentIndex];
                    this.heatmap.rows.splice(swapIndex, 1, current);
                    this.heatmap.rows.splice(currentIndex, 1, target);
                    // make sure we also rearrange heatmap.contributions
                    const target_category = this.heatmap.contributions.map(x => x[swapIndex]);
                    this.heatmap.contributions.forEach(contribution => contribution[swapIndex] = contribution[currentIndex]);
                    this.heatmap.contributions.forEach((contribution, index) => contribution[currentIndex] = target_category[index]);
                }
                this.$nextTick(() => {
                    this.moveCurrentSquare(direction);  // also move the cursor so we can easily move a row or col multiple spots
                });
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
                    this.rearrangeHeatmap(1);
                    event.preventDefault();
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowLeft']) {
                    this.rearrangeHeatmap(2);
                    event.preventDefault();
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowUp']) {
                    this.rearrangeHeatmap(3);
                    event.preventDefault();
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowDown']) {
                    this.rearrangeHeatmap(4);
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
                const text = doc.getElementById( 'tabley' );
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

            testClicky(i,j) {
                console.log('i: ' + i + ' and j: ' + j)
                this.edit_contents(i,j);
            }
        },
        mounted() {
            // initialise a grid from rows + categories
            this.heatmapEl = document.querySelector('#editor-grid');

            this.drawHeatmap();
            // handle keypresses
            window.addEventListener("keydown", this.handleKeyPress);
            window.addEventListener("keyup", this.handleKeyUp);

            // manage the variables in localStroage
            // we store meta variables in localstorage, so they can manually be overriden by people that feel like it
            localStorage.getItem("meta_lowerDegreeLimit") !== null ? this.metadata.lowerDegreeLimit = Number(localStorage.getItem("meta_lowerDegreeLimit")) :
                localStorage.setItem("meta_lowerDegreeLimit", String(this.metadata.lowerDegreeLimit));
            localStorage.getItem("meta_upperDegreeLimit") !== null ? this.metadata.upperDegreeLimit = Number(localStorage.getItem("meta_upperDegreeLimit")) :
                localStorage.setItem("meta_upperDegreeLimit", String(this.metadata.upperDegreeLimit));


            // make sure the heatmap has proper ctrl-c behaviour (the clipboard is formatted correctly)
            // document.getElementById('editor-grid').addEventListener('copy', (e)=>{
            //     e.preventDefault();
            //     e.clipboardData.setData("Text", exportPlainText(this.heatmap) );
            // });
        }
    }
</script>

<style>
    .heatmap-editor {
        background-color: var(--theme-white);
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        --gridsize: 40px;
    }

    .heatmap-html-element{
       display: flex;
        justify-content: center;
        flex-grow: 1
    }

    #editor-grid {
        display: grid;
        grid-template-rows: 1f repeat(2, var(--gridsize));
        grid-template-columns: 1fr repeat(2, var(--gridsize));
        margin: 1rem;
    }

    .heatmap-meta {
        color: transparent;
        display: none;
    }

    .grid-el{
        background-color: floralwhite;
        width: 90%;
        height: 90%;
        margin: 10px;
        font-size: 8px;
        color: transparent;  /*hide text but keep it there for selection*/

        justify-self: center;
        align-self: center;
    }

    table, th, td {border-collapse: collapse; border-spacing: 0}

    .grid-el-tbl {
        background-color: floralwhite;
        font-size: 8px;
        color: transparent;  /*hide text but keep it there for selection*/
        border: 4px solid black;
        width: var(--gridsize);
        height: var(--gridsize);
    }

    .grid-el.cursor, .grid-el-tbl.cursor{
        border: #FFD800 solid 5px;
    }

    .contribution-level-0 {
        background-color: white;
    }

    .contribution-level-1 {
        background-color: #A0A0A0;
    }

    .contribution-level-2 {
        background-color: 	#303030;
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

    .heatmap-row {
        align-self: center;
        justify-self: end;
        margin-right: 1rem;
        grid-column: 0;
    }

    .heatmap-row-tbl{
        padding-right: 0.8rem;
    }

    .heatmap-row.cursor {
        font-weight: bold;
    }

    .heatmap-column {
        align-self: end;
        justify-self: center;

        grid-row: 0;
        position: relative;
    }

    .heatmap-column-input {
        position: absolute;
        bottom: 0px;
        left: -5px;
        transform-origin: center left;
        transform: rotate(-70deg);
        width: 100px;
    }

    .heatmap-column-input-tbl {
        position: absolute;
        bottom: 0px;
        left: 15px;
        transform-origin: center left;
        transform: rotate(-70deg);
        width: 100px;
    }

    .cursor .heatmap-column-input  {
        font-weight: bold;
    }

    .shortcut-box {
        margin: 1rem;
    }

    .shortcut-title {
        font-size: 1.1rem;
        font-weight: bold;
        color: var(--theme-deep-red);
    }

    .shortcut-hint {
        margin: 6px 0px;
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
    .heatmap-row .v-text-field input, .heatmap-row-tbl .v-text-field input {
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

