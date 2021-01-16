<template>
    <div style="padding: 1rem">
        <svg   xmlns="http://www.w3.org/2000/svg" class="svg-CTAB">
            <g class="CTAB-group">

                <g class="svg-CTAB-header">
                    <g class="svg-CTAB-row">
                        <text class="svg-CTAB-version"
                              :transform="'translate(' + -CTAB_padding + ',' + -CTAB_padding + ')'">
                            CTAB V{{CTAB.version}} <tspan class="CTAB-hidden">|</tspan>
                        </text>
                    </g>
                    <g v-for="(col,index) in CTAB.cols" :key="col.id"
                       :transform="'translate('+ ((index+0.5)*CTAB_level_width) +','+ (-CTAB_padding) + ') rotate(-70)'">
                        <text class="svg-CTAB-col-text">{{col}}<tspan class="CTAB-hidden">|</tspan></text>
                    </g>
                </g>
                <g v-for="(row, rowIndex) in CTAB.rows" :key="row.id" :transform="'translate(0,'+ (CTAB_level_height*(rowIndex)) + ')'">
                    <g class="svg-CTAB-row">
                        <text class="svg-CTAB-level-txt" :transform="'translate('+ -CTAB_padding +','+ CTAB_level_height/2 +')'" >
                        {{row}} <tspan class="CTAB-hidden">|</tspan> </text>
                    </g>
                    <g v-for="(val, valIndex) in CTAB.contributions.map(contribution => contribution[rowIndex])"
                        :key="val.id"
                        :transform="'translate('+ ((valIndex)*CTAB_level_width) + ',0)'"
                       :class="'svg-CTAB-contribution-level-'+val"
                       class="svg-CTAB-level" >
                        <rect class="svg-CTAB-level" :width="CTAB_level_width" :height="CTAB_level_height"></rect> <!--:y="-CTAB_level_height"-->
                        <text class="svg-CTAB-level-txt" :transform="'translate('+CTAB_level_width/2 + ',' + CTAB_level_height/2 + ')'">
                        {{'*'.repeat(val)}}| </text>
                    </g>
                </g>
            </g>
        </svg>
        <img v-if="showCopyImage" src="data:image/svg;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolf" alt="svg-CTAB-for-clipboard" />
        <div class="CTAB-source-view" v-if="loaded && showSource">
            <div style="display:flex">
                <v-btn depressed color="var(--theme-reddish)" dark @click="copyToClipboard" style="margin: 0rem 1rem">
                    Copy svg to clipboard
                </v-btn>
                <v-btn depressed color="var(--theme-reddish)" dark @click="saveSVG">
                    Save as .SVG for editors
                </v-btn>
            </div>
            <div class="CTAB-source-view-title">SVG css styling</div>
            {{ formatCSS(CTABstyle) }}
        </div>
        <component :is="'style'"  ref="svgCTABstyle">
            .svg-CTAB{
                display: inline-block;
            }

            .svg-CTAB-level {
                stroke-width: 4px;
                stroke: black;
            }

            .svg-CTAB-contribution-level-0 {
                fill: white;
            }

            .svg-CTAB-contribution-level-1 {
                fill: #A0A0A0;
            }

            .svg-CTAB-contribution-level-2 {
                fill: 	#303030;
            }

            .svg-CTAB-version {
                fill: #DCDCDC;
                text-anchor: end;
                alignment-baseline: baseline;
            }

            text.svg-CTAB-level-txt {
                alignment-baseline: middle;
                stroke-width: 0;
            }

            .svg-CTAB-row text.svg-CTAB-level-txt {
                text-anchor: end;
            }

            .CTAB-hidden {
                 fill: white
            }
        </component>
    </div>
</template>

<script>
    import { parseEditorQuery, isValidCTAB } from "../parser.js"
    export default {
        name: "svgCTAB",
        props: {
            CTAB: {type:Object, default: () => { return {cols: ['none'],
                    rows: ['an error occurred'],
                    contributions: [[0]],
                    version: ' undefined'}}},
        },
        data: () => ({
            CTAB_level_width: 40,
            CTAB_level_height: 40,
            CTAB_padding: 10,
            loaded:false,
            showSource: true,
            CTABstyle: null,
            showCopyImage: false,
            inkscapeMode: false,
        }),
        methods: {
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
            },

            copyToClipboard() {
                let copyText= document.querySelector('.svg-CTAB').outerHTML;
                copyText = this.sanitize(copyText, 'inkscape');

                navigator.permissions.query({name: "clipboard-write"}).then(result => {
                    if (result.state == "granted" || result.state == "prompt") {
                        navigator.clipboard.writeText(copyText).then(function() {
                            console.log('Wrote SVG to clipboard!')
                        }, function() {
                            console.error('clipboard failed...')
                        });
                    }
                });
            },

            saveSVG() {
                let copyText= document.querySelector('.svg-CTAB').outerHTML;
                copyText = this.sanitize(copyText, 'inkscape');

                const blob = new Blob([copyText], {type: 'text/txt'});
                let elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(blob);
                elem.download = this.CTAB.cols[0].replace(/\s+/g, '') + '.svg';
                document.body.appendChild(elem);
                elem.click();
                document.body.removeChild(elem);
            },

            sanitize( svgString ) {
                return svgString.replace('<g class="CTAB-group">', '<style>'+this.$refs.svgCTABstyle.innerHTML+'</style>' + '<g class="CTAB-group">')
            },

            copyToClipboardOld() {
                this.showCopyImage = true;
                this.$nextTick(() => {
                    const el = document.querySelector('.svg-CTAB');
                    let range;
                    let selection;

                    if (document.body.createTextRange) {

                        range = document.body.createTextRange();
                        range.moveToElement(el);
                        range.select();

                    } else if (window.getSelection) {

                        selection = window.getSelection();

                        range = document.createRange();
                        range.selectNodeContents(el);

                        selection.removeAllRanges();
                        selection.addRange(range);

                    }

                    document.execCommand('copy');
                    window.getSelection().removeAllRanges();
                    this.showCopyImage = false;
                    console.log('Copied SVG to clipboard!');
                });

            }
        },
        mounted() {
            let parsedCTAB = parseEditorQuery( this.$route.query );
            if ( isValidCTAB( parsedCTAB ) ) {
                console.log('[Parser] adding CTAB from query string!');
                this.CTAB = parsedCTAB;
            }

            this.$nextTick(() => {
                this.CTABstyle = this.$refs.svgCTABstyle;
                this.loaded = true;
                this.$nextTick(() => {
                    let svg = document.querySelector(".svg-CTAB");
                    let bbox = svg.getBBox();
                    svg.setAttribute("width", bbox.width + "px");
                    svg.setAttribute("height", bbox.height + "px");
                    svg.setAttribute("viewBox", `${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height+5}`);
                });
            });


        }
    }
</script>

<style>

    .CTAB-source-view {
        margin: 1rem 2rem;
        white-space: pre-line;
        white-space: pre-wrap;
    }

    .CTAB-source-view-title {
        margin: 1rem;
        color: #E40044;
        font-size: 1.6rem;
    }
</style>
