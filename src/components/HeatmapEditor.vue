<template>
    <div class="heatmap-editor">
        <div>editor</div>
        <v-btn depressed @click="printContributionHeatmap">
            print
        </v-btn>
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
                <div style="grid-row: 1; grid-column: 1">Your table</div>
                <div style="grid-row: 1; grid-column: 2" class="heatmap-column">banana</div>
                <div style="grid-row: 2; grid-column: 1" class="heatmap-row">canine</div>
                <div style="grid-row: 3; grid-column: 1" class="heatmap-row">cookin</div>
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
            heatmap: {cols: ['apple', 'pear'],
                rows: ['writing', 'experiments']},
            heatmapEl: null,
            keysDown: {}
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
                this.drawColLabels();
                this.drawRowLabels();
                this.drawContents();
                this.drawBorder();


            },

            drawColLabels() {
                // remove old labels
                document.querySelectorAll('.heatmap-column').forEach(e => e.remove());
                // draw newlabels
                for (const [i, row] of this.heatmap.cols.entries()) {
                    let col_label = document.createElement('div');
                    col_label.innerHTML = row;
                    col_label.classList.add("heatmap-column");
                    col_label.style.gridColumn = i + 2;
                    col_label.style.gridRow = 1;
                    this.heatmapEl.appendChild(col_label)
                }
            },

            drawRowLabels() {
                // remove old labels
                document.querySelectorAll('.heatmap-row').forEach(e => e.remove());
                // draw newlabels
                for (const [i, row] of this.heatmap.rows.entries()) {
                    let col_label = document.createElement('div');
                    col_label.innerHTML = row;
                    col_label.classList.add("heatmap-row");
                    col_label.style.gridColumn = 1;
                    col_label.style.gridRow = i + 2;
                    this.heatmapEl.appendChild(col_label)
                }
            },

            drawContents() {
                // remove the old grid elements
                document.querySelectorAll('.grid-el').forEach(e => e.remove());
                // add new grid elements
                for (let i = 0; i < this.heatmap.cols.length; i++) {
                    for (let j = 0; j < this.heatmap.rows.length; j++) {
                        let grid_element = document.createElement('div');
                        grid_element.classList.add("grid-el");
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

            addRow(name) {
                this.heatmap.rows.push(name)
            },

            addColumn(name) {
                this.heatmap.cols.push(name)
            },

            handleKeyPress(event) {
                this.keysDown[event.key] = true;  // we store key's last state (true=pressed)
                console.log(event);

                if (this.keysDown["Shift"] && (this.keysDown["C"] || this.keysDown["c"])) {
                    this.addColumn('empty')
                } else if (this.keysDown["Shift"] && (this.keysDown["R"] || this.keysDown["r"])) {
                    this.addRow('empty')
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
    }

    .heatmap-column {
        align-self: end;
        justify-self: center;
        transform: rotate(-90deg);
        /*margin-bottom: 1rem;*/
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

