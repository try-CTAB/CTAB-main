<template>
    <div>
        <div class="checker-header">
            <div class="checker-title">CTAB string parser <span class="checker-title-minor">- check validity of .CTAB string</span></div>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                            :disabled="!validCTAB"
                            color="var(--theme-reddish)"
                            dark
                            v-bind="attrs"
                            v-on="on"
                            @click="prettify"
                    >
                        Prettify CTAB
                    </v-btn>
                </template>
                <span>Make the formatting of your CTAB string prettier & easier to read.</span>
            </v-tooltip>
        </div>
        <div class="checker-box">
            <div class="pastebox"><v-textarea
                        v-model="CTABstring"
                        filled
                        clearable
                        label="Paste plain CTAB here. Press tab or defocus field to parse."
                        color="var(--theme-reddish)"
                        auto-grow
                        @change="checkCTABstring"
            ></v-textarea></div>
            <plainCTAB v-if="validCTAB" :show-source="false" :CTAB="parsedCTAB"></plainCTAB>
        </div>
        <v-snackbar v-model="snackbar">
            <v-icon v-if="validCTAB">mdi-check-circle</v-icon>
            <v-icon v-if="!validCTAB">mdi-alert</v-icon>
            {{ snackText }}
            <template v-slot:action="{ attrs }">
                <v-btn
                        color="pink"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
    import { parseCTABstring, isValidCTAB } from "../parser.js"
    import { exportPlainText } from "../export.js"
    import plainCTAB from "./plainCTAB";
    export default {
        name: "CTABchecker",
        components: {plainCTAB},
        data: () => ({
            CTABstring: null,
            parsedCTAB: {
                cols: ['loading...'],
                rows: ['loading...'],
                contributions: [[0]],
                version: '0.2'
            },
            validCTAB: false,
            snackbar: false,
            snackText: '',
        }),
        methods: {
            checkCTABstring() {
                console.log('New string detected, checking...');
                console.log(this.CTABstring)
                try {
                    let newCTAB = parseCTABstring(this.CTABstring);
                    if (isValidCTAB(newCTAB)) {
                        this.parsedCTAB = newCTAB;
                        this.updateCTABstatus(true);
                    } else {
                        this.updateCTABstatus(false);
                    }
                } catch (e) {
                    console.error(e);
                    this.updateCTABstatus(false);
                }
            },

            updateCTABstatus( newStatus ) {
                this.validCTAB = newStatus;
                if (this.validCTAB) {
                    this.snackText  = 'String is valid CTAB. Check if output table is as expected';
                    this.snackbar = true;
                } else {
                    this.snackText  = 'Error Parsing CTAB String. Check console for hints.';
                    this.snackbar = true;
                }
            },

            prettify() {
                const prettified = exportPlainText(this.parsedCTAB, false);
                this.CTABstring = prettified;
            }
        }
    }
</script>

<style scoped>
    .checker-header {
        display: flex;
        margin: 0rem 2rem;
        align-items: center;
        justify-content: space-between;
    }

    .checker-title {
        font-size: 1.3rem;
        margin: 1rem 0rem;
        color: var(--theme-reddish);
        font-weight: bold;
    }

    .checker-title-minor {
        color: #A0A0A0;
        font-weight: normal;
        font-size: 1.1rem;
    }

    .checker-box {
        display: flex;
        flex-direction: column;
        align-items: center;

        font-family: monospace;

    }

    .pastebox {
        width: 100%;
        padding: 0 2rem 2rem 2rem;
    }

</style>
