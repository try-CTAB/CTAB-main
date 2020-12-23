<template>
    <div class="heatmap-editor">
        <div>editor</div>
        cursor: {{cursor}}
<!--        rows: {{heatmap.rows}} <br>-->
<!--        columns: {{heatmap.cols}}-->
<!--        <v-btn depressed @click="testName">-->
<!--            test-->
<!--        </v-btn>-->
        <div class="shortcut-box">
            <div class="shortcut-title">Keyboard Shortcuts</div>
            <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">C</span> for a new column </div>
            <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">R</span> for a new row </div>
            <div class="shortcut-hint"> Use <span class="keyboard-key">left</span>,
                <span class="keyboard-key">right</span>,
                <span class="keyboard-key">up</span>,
                <span class="keyboard-key">down</span> To navigate </div>
            <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">Q</span> to delete a row</div>
            <div class="shortcut-hint"> Press <span class="keyboard-key">Shift</span>+<span class="keyboard-key">W</span> to delete a column</div>
            <div class="shortcut-hint"> Use <span class="keyboard-key">Shift </span>+<span class="keyboard-key">left</span>,
                <span class="keyboard-key">right</span>,
                <span class="keyboard-key">up</span>,
                <span class="keyboard-key">down</span> to move rows and columns </div>
        </div>
        <div class="format-box"></div>
        <div class="editor">
            <div id="editor-grid">
                <div v-for="(col, index) in heatmap.cols" :key="index" class="heatmap-column"
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
                <div v-for="(row, index) in heatmap.rows" :key="index" class="heatmap-row"
                     :class="'grid-c0r'+(index+1)" v-bind:style="{ gridRow: (index+2)}">
                    <v-text-field
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
                <v-responsive :aspect-ratio="1" style="grid-row: 2; grid-column: 2" class="grid-el">
                  <div>doom</div>
                </v-responsive>
                <v-responsive :aspect-ratio="1" style="grid-row: 3; grid-column: 3" class="grid-el">
                    <div >final</div>
                </v-responsive>
                <v-responsive :aspect-ratio="1" style="grid-row: 2; grid-column: 3" class="grid-el">
                    <div>enigma</div>
                </v-responsive>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "HeatmapEditor",
        data: () => ({
            heatmap: {cols: ['E. X. Ample', 'T. Esting','R. E. Viewer'],
                rows: ['manuscript', 'experiments','feedback']},
            heatmapEl: null,
            keysDown: {},
            cursor: {row:2, col:2}
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
                console.log('1f' + ' auto'.repeat(this.heatmap.cols.length +2));
                this.heatmapEl.style.gridTemplateRows = '1f' + ' auto'.repeat(this.heatmap.cols.length)
                this.heatmapEl.style.gridTemplateColumns = '1f' + ' auto'.repeat(this.heatmap.rows.length);
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
                        grid_element.innerHTML = i +' and ' +  j;
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
                console.log('Clicked on ' + col + '  and row ' + row)
            },

            // attempt to move the 'cursor'
            moveCurrentSquare(directionVal) {
                console.log('moving cursor' + directionVal)
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
                let focusedEl = document.querySelector('.grid-c' + this.cursor.col + 'r' + this.cursor.row)
                focusedEl.classList.add("cursor");
            },

            addRow(name) {
                this.heatmap.rows.push(name);
                // make sure we automatically select the text box to enter name
                this.$nextTick(() => {
                    // focus on the last text input element (which is the one we just added!)
                    this.$refs['row'+this.heatmap.rows.length][0].focus();
                    Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);
                });
            },

            addColumn(name) {
                this.heatmap.cols.push(name);
                // make sure we automatically select the text box to enter name
                this.$nextTick(() => {
                    // focus on the last text input element (which is the one we just added!)
                    this.$refs['col' + this.heatmap.cols.length][0].focus();
                    Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);
                });
            },

            // remove a row based on the current value of currentSquare
            removeRow() {
                if (this.cursor.row !== 0){  // we cannot remove the headerQQ
                    if (this.heatmap.rows.length > 1) { // cannot remove if we only have one left
                        console.log('removing row nr: ' + this.cursor.row);
                        this.heatmap.rows.splice(this.cursor.row - 1, 1);
                        Object.keys(this.keysDown).forEach(v => this.keysDown[v] = false);  // prevent accidental multi-removal
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
                    }
                }
            },

            handleKeyPress(event) {
                this.keysDown[event.key] = true;  // we store key's last state (true=pressed)
                //console.log(event);

                if (this.keysDown["Shift"] && (this.keysDown["C"] || this.keysDown["c"])) {
                    this.addColumn('empty');
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
                    console.log('WIP')
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowLeft']) {
                    console.log('WIP')
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowUp']) {
                    console.log('WIP')
                } else if (this.keysDown["Shift"] && this.keysDown['ArrowDown']) {
                    console.log('WIP')
                } else if (this.keysDown['ArrowRight']) {
                    this.moveCurrentSquare(1);
                } else if (this.keysDown['ArrowLeft']) {
                    this.moveCurrentSquare(2);
                } else if (this.keysDown['ArrowUp']) {
                    this.moveCurrentSquare(3);
                } else if (this.keysDown['ArrowDown']) {
                    this.moveCurrentSquare(4);
                }
            },

            handleKeyUp(event) {
                this.keysDown[event.key] = false;  // here is where we reset a key's state when it is released
            },

            printContributionHeatmap() {
                console.log('printing not yet supported ;)')
            }
        },
        mounted() {
            // initialise a grid from rows + categories
            this.heatmapEl = document.querySelector('#editor-grid');

            this.drawHeatmap();
            // handle keypresses
            window.addEventListener("keydown", this.handleKeyPress);
            window.addEventListener("keyup", this.handleKeyUp);
        }
    }
</script>

<style>
    .heatmap-editor {
        background-color: var(--theme-white);
        width: 100vw;
    }

    #editor-grid {
        display: grid;
        grid-template-rows: 1fr repeat(2, auto);
        grid-template-columns: 1fr repeat(2, auto);
        margin: 4rem;
    }

    .grid-el{
        background-color: floralwhite;
        width: 30px;
        margin: 5px;
        font-size: 8px;
    }

    .grid-el::before {
        content: "";
        display: inline-block;
        width: 1px;
        height: 0;
        padding-bottom: 100%;
    }

    .grid-el.cursor {
        background-color: var(--theme-soft-pink);
    }

    .gridbars {
        background-color: rgba(0,0,0,0.9);
        border-radius: 5px;
        grid-row-start: 2;
        grid-column-start: 2;
    }

    .heatmap-row {
        align-self: center;
        justify-self: end;
        margin-right: 1rem;
        grid-column: 0;
    }

    .heatmap-row.cursor {
        background-color: var(--theme-soft-pink);
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

    .cursor .heatmap-column-input  {
        background-color: var(--theme-soft-pink);
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
        color: white;
        padding: 3px 5px;
        border-radius: 3px;
        margin: 0px 3px;
        filter: drop-shadow(0 3.5px 0 var(--theme-oxblood));
    }
</style>

