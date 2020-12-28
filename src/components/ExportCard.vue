<template>
    <div style="height: 100%">
        <v-card :disabled="notReady"
                class=" export-item"
                max-width="220px"
                height="80%"
        >
            <v-card-title><slot name="header">Export Option</slot></v-card-title>
            <v-card-text class="quick-summary-text">
                <slot name="quick-summary">This will export the table in the format above</slot>
            </v-card-text>
            <v-card-actions class="export-card-buttons">
                <v-btn
                        text
                        color="var(--theme-brightpink)"
                        @click="exportTable(false)"
                >
                    Export
                </v-btn>
                <!--not compatible with saveOption-->
                <v-btn
                        v-if="details"
                        text
                        color="rgba(0,0,0,0.5)"
                        @click="reveal = true"
                >
                    Details
                </v-btn>
                <!--not compatible with details-->
                <v-btn
                    v-if="saveOption"
                    text
                    color="rgba(0,0,0,0.5)"
                    @click="exportTable(true)"
                    >
                    Download
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <v-card
                        v-if="reveal"
                        class="transition-fast-in-fast-out card-export-details"
                        style="height: 100%;"
                >
                    <v-card-text class="pb-0 details-text">
                        <slot name="details-text">You can find more details <a href="https://nemoandrea.github.io/better-contributions-spec/export-formats/">in the docs</a></slot>
                    </v-card-text>
                    <v-card-actions class="pt-0 export-card-buttons">
                        <v-btn
                                text
                                color="var(--theme-brightpink)"
                                @click="exportTable(true)"
                        >
                            Alt Export
                        </v-btn>
                        <v-btn
                                text
                                color="rgba(0,0,0,0.5)"
                                @click="reveal = false"
                        >
                            Hide
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-expand-transition>
        </v-card>
        <v-snackbar v-model="snackbar" :multi-line=true>
            {{ snackText }}

            <template v-slot:action="{ attrs }">
                <v-btn
                        color="red"
                        text
                        v-bind="attrs"
                        @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import { exportPlainText, exportRichLatex, exportBasicLatex } from "../export.js"
    export default {
        name: "ExportCard",
        data: () => ({
            reveal: false,
            snackbar: false,
            snackText: '',
        }),
        props: {
            details: { type: Boolean, default: false },
            saveOption: { type: Boolean, default: false },
            notReady: { type: Boolean, default: false},
            contributionTable: {type:Object},
            format: { type: String, default: 'raw'}
        },
        methods: {
            exportTable( alternate ) {
                console.log('Exporting contribution table in ' + this.format + ' format...')

                switch(this.format) {
                    case 'raw':
                        this.exportRaw( alternate );
                        break;
                    case 'link':
                        this.exportLink();
                        break;
                    case 'LaTeX':
                        this.exportLaTeX( alternate );
                        break;
                    default:
                        console.log('Error exporting table: unrecognised format')
                }
                console.log('Export complete.');
            },

            exportRaw( saveFile ) { // export a raw format (tab separated representation) of contributionTable
                console.log(exportPlainText(this.contributionTable))
                const raw_format = exportPlainText(this.contributionTable);

                // download
                if (saveFile) {
                    const blob = new Blob([raw_format], {type: 'text/txt'});
                    let elem = window.document.createElement('a');
                    elem.href = window.URL.createObjectURL(blob);
                    elem.download = this.contributionTable.cols[0].replace(/\s+/g, '') + '.CTAB';
                    document.body.appendChild(elem);
                    elem.click();
                    document.body.removeChild(elem);
                    this.notify('Downloaded raw format (.CTAB) text file')
                }
                else {
                    this.copyStringToClipboard( raw_format );
                    this.notify('Copied Raw Format to clipboard, you can now paste it somewhere')
                }
            },

            exportLink() {
                console.log('link')
            },

            exportLaTeX(alternate) {
                let LaTeX = null;
                if (!alternate) {
                    LaTeX = exportRichLatex(this.contributionTable)
                } else {
                    LaTeX = exportBasicLatex(this.contributionTable)
                }
                console.log(LaTeX)
                this.copyStringToClipboard(LaTeX);
                this.notify('Copied LaTeX to clipboard, you can now paste it somewhere')
            },

            exportHTML() {},

            copyStringToClipboard(string) {
                // copy to user clipboard
                var dummy = document.createElement("textarea");
                document.body.appendChild(dummy);
                dummy.value = string;
                dummy.select();
                document.execCommand("copy");
                document.body.removeChild(dummy);
            },

            notify(message) {
                this.snackText = message;
                this.snackbar = true;
            }
        }
    }
</script>

<style scoped>
    .card-export-details {
        bottom: 0;
        opacity: 1 !important;
        position: absolute !important;
        width: 100%;
    }

    .export-card-buttons {
        justify-content: space-between;
    }

    .details-text a {
        color: var(--theme-brightpink);
    }

    .quick-summary-text.v-card__text {
        padding-bottom: 5px;
    }

    .v-card__actions {
        padding-top: 0;
    }

</style>
