<template>

    <div class="plainCTAB">
        <table class="CTAB" ref="mytable" >
        <tr>
            <td class="CTAB-meta">CTAB V{{CTAB.version}}</td>
            <td v-for="col in CTAB.cols" :key="col.id" class="CTAB-column-anchor">
                <div class="CTAB-column"> {{col}} </div>
            </td>
        </tr>
        <tr v-for="(row, rowIndex) in CTAB.rows" :key="row.id">
            <td class="CTAB-row"> {{row}} </td>
            <td v-for=" val in CTAB.contributions.map(contribution => contribution[rowIndex])"
                :key="val.id"
                class="CTAB-grid-el"
                :class="'CTAB-contribution-level-'+val"
            >
                {{'*'.repeat(val)}}
            </td>
        </tr>
    </table>

        <div class="CTAB-source-view" v-if="loaded && showSource">
            <div class="CTAB-source-view-title">Source view (for changing styles or adding to your own HTML page)</div>
            {{ formatHTML(CTABel) }}
            <br><br>
            {{ formatJS(CTABscript)}}
            <br><br>
            {{ formatCSS(CTABstyle) }}
        </div>



        <component :is="'script'"  ref="CTABscript">

        </component>
        <component :is="'style'"  ref="CTABstyle">
            .CTAB {
            --gridsize: 40px;
            padding-top: 5rem;
            margin-top: 5rem;
            }

            table.CTAB {border-collapse: collapse; border-spacing: 0}

            .CTAB-meta {
            color: #E8E8E8;
            font-weight: bold;
            }

            .CTAB-column-anchor {
            position: relative;
            }

            .CTAB-column {
            white-space: nowrap;
            position: absolute;
            bottom: 0px;
            left: 15px;
            transform-origin: center left;
            transform: rotate(-70deg);
            width: 100px;
            }

            .CTAB-row{
            white-space: nowrap;
            padding-right: 0.6rem;
            text-align: right;
            }

            .CTAB-grid-el {
            background-color: floralwhite;
            font-size: 8px;
            border: 4px solid black;
            width: var(--gridsize);
            height: var(--gridsize);
            }

            .CTAB-contribution-level-0 {
            background-color: white;
            color: white;
            }

            .CTAB-contribution-level-1 {
            background-color: #A0A0A0;
            color: #A0A0A0;
            }

            .CTAB-contribution-level-2 {
            background-color: 	#303030;
            color: #303030
            }
        </component>
    </div>

</template>

<script>
    import { parseEditorQuery, isValidCTAB } from "../parser.js"

    export default {
        name: "plainCTAB",
        props: {
            CTAB: {type:Object, default: () => { return {cols: ['none'],
                    rows: ['an error occurred'],
                    contributions: [[0]],
                    version: ' undefined'}}},
            showSource: {type: Boolean, default: true},
        },
        data: () => ({
            loaded: false,
            CTABel: '',
            CTABstyle: '',
            CTABscript: '',
        }),
        methods: {
            formatHTML(el) {
                const html = el.outerHTML;
                let tab = '\t';
                let result = '';
                let indent= '';

                html.split(/></).forEach((element) => {

                    // closing bracket
                    if (element.match( /^\/\w/ )) {
                        indent = indent.substring(tab.length);
                    }

                    // add the bracket and newline
                    result += indent + '<' + element + '>\r\n';

                    // opening bracket
                    if (element.match( /^<?\w[^>]*[^]$/ )  ) {
                        indent += tab;
                    }
                });
                return result.substring(1, result.length-3);
            },

            copyCTAB(){
                const text = document.querySelector( '.CTAB' );
                let range;
                let selection;

                if( document.body.createTextRange ) {
                    range = document.body.createTextRange();
                    range.moveToElement( text );
                    range.select();
                } else if ( window.getSelection ) {
                    selection = window.getSelection();

                    range = document.createRange();
                    range.selectNodeContents( text );

                    selection.removeAllRanges();
                    selection.addRange( range );
                }
                document.execCommand( 'copy' );
                window.getSelection().removeAllRanges();
            },

            // very barebones JS formatter, more for style than anything
            formatJS(el) {
                const raw = el.outerHTML;
                let a = raw.slice(0, raw.length-10); //no close tag
                let JS = a.slice(9, a.length); //no open tag
                let result = '';
                JS.split(/(;)/).forEach((element) => {
                    if (element === ';') {
                        result += element;
                    } else if (element.length > 0){
                        result += '\r\n\t' +  element
                    }
                });

                result = '<scri' + 'pt>' + result
                result += '\r\n</scr' + 'ipt>';

                return result
            },

            formatCSS(el) {
                const css = el.outerHTML;
                let tab = '\t';
                let result = '';
                css.split(/([{;}])/).forEach((element) => {
                    // if bracket
                    if (element === '{') {
                        result += element + '\r\n' + tab
                    } else if (element === '}') {
                            result = result.substring(0, result.length - 2);
                            result += element + '\r\n'
                    } else if (element === ';'){
                        result += element + '\r\n\t'
                    } else {
                        result += element
                    }
                });
                //return result.substring(1, result.length-3);
                return result
            }
        },
        mounted() {
            // this component will always be opened with a query string
            let parsedCTAB = parseEditorQuery( this.$route.query );
            if ( isValidCTAB( parsedCTAB ) ) {
                console.log('[Parser] adding CTAB from query string!');
                this.CTAB = parsedCTAB;
            }

            this.$nextTick(() => {
                this.CTABel = document.querySelector('.CTAB');
                this.CTABstyle = this.$refs.CTABstyle;
                this.CTABscript = this.$refs.CTABscript;
                this.loaded = true;
            });
        }
    }
</script>

<!-- styles are listed in the template (above) -->

<style>
    .CTAB-source-view {
        margin-top: 3rem;
        white-space: pre-line;
        white-space: pre-wrap;
    }

    .CTAB-source-view-title {
        margin: 1rem;
        color: #E40044;
        font-size: 1.6rem;
    }

    .plainCTAB {
        margin: 3rem 3rem 3rem 3rem;
    }

    @media print {
        .CTAB-source-view {
            display: none;
        }
    }
</style>
