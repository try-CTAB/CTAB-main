<template>
    <div style="overflow: hidden">

        <section class="scroll-target" id="greeter" style="position: relative;">
<!--            <div class="temp-message">-->
<!--                <b>Contribution Tables promotional page.</b> <br>-->
<!--                This page is under development, in the meantime: <router-link to="/editor">go to editor</router-link>-->
<!--            </div>-->
<!--            <button @click="buildRandomCTAB">new table</button>-->
            <img src="../assets/blob_4.svg" id="blob-4">
            <div class="title-box">
                <div class="title-main">Contribution<br>Tables</div>
                <div class="title-ext">
                    <div class="ext-link">
						<router-link to="/editor" target="_blank">
                            <span class="ext-link-text">Try the table <span class="acc">editor</span></span>
                            <span class="ext-link-icon"><v-icon>mdi-arrow-top-right</v-icon><span class="ext-link-icon-circle"></span></span>
                        </router-link>
                    </div>
                    <div class="ext-link">
                        <a href="https://nemoandrea.github.io/better-contributions-spec/" target="_blank">
                            <span class="ext-link-text">Read the <span class="acc">how</span></span>
                            <span class="ext-link-icon"><v-icon>mdi-arrow-top-right</v-icon><span class="ext-link-icon-circle"></span></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="demo-CTAB" >
                <plainCTAB :show-source="false" :CTAB="demoCTAB"></plainCTAB>
            </div>
            <div class="scroll-hint">scroll to read more</div>
        </section>
        <section class="mini-page m-clearer scroll-target" >
            <div style="position: relative">
                <img src="../assets/blob_3.svg" style="position: absolute; left: 3rem; top: -5rem; z-index: 0; width: 25rem">
                <div class="page-flexbox">
                    <div class="mini-page-title">A clearer way to show <br> contributions</div>
                    <div class="mini-page-subtext">Figures and diagrams are front and center in publications, and for good reason.
                        A diagram can convey information much faster and more effectively than long paragraphs of text.
                        <b> Why not display your author contributions in a diagram too? </b>
                    </div>
                </div>
            </div>
            <div class="versus-box">
                <div class="mobile vs-hint">Compare the two ways below</div>
                <div id="plaintext-demo" class="versus-item"></div>
                <div class="versus-icon">VS.</div>
                <div id="ctab-demo">
                    <plainCTAB :show-source="false" :CTAB="staticCTAB"></plainCTAB>
                </div>
            </div>
            <v-btn
                    class="versus-refresh"
                    outlined
                    color="rgba(0,0,0,0.3"
                    @click="refreshVersusDemo"
            >
                refresh example
            </v-btn>
        </section>
        <section class="mini-page m-batteries scroll-target">
            <div class="page-flexbox">
                <div style="position: relative">
                    <img src="../assets/blob_1.svg" style="position: absolute; left: -5rem; top:-8rem; z-index: 0; width: 33rem">
                    <div class="mini-page-title" style="z-index: 1; position: relative">
                        Batteries Included
                        </div>
                    <div class="mini-page-subtext" style="position: relative">
                        This page has an easy-to-use web editor that can be used to quickly put together
                    your own contribution table. On top of that, there are many export options to
                    make including your contribution table as seamless as possible with your workflow. <br><br>
                    No fumbling in Illustrator or pasting JPEGs into your manuscript.</div>

                    <router-link to="/editor" target="_blank"><v-btn  class="editor-link"
                            rounded
                            color="var(--theme-reddish)"
                            outlined
                            x-large
                    >
                        Try the online editor
                    </v-btn></router-link>
                </div>
                <div >
                    <img src="../assets/promotional_export_options.png" class="export-option-images">
                </div>
            </div>
        </section>
        <section class="mini-page m-flexible scroll-target">
            <div class="page-flexbox">
                <div style="display: flex; flex-direction: column;justify-content: center;align-items: center; height: 100%">
                    <a href="https://nemoandrea.github.io/better-contributions-spec/" target="_blank" class="format-link">
                        <v-icon>mdi-text-box-search-outline</v-icon>
                        <div>Read the draft specification</div>
                    </a>
                    <router-link to="/check-CTAB" class="format-link" target="_blank">
                           <v-icon>mdi-sticker-check-outline</v-icon><div>CTAB string format checker</div>
                    </router-link>
                </div>
                <div style="position: relative" class="page-text">
                    <img src="../assets/blob_2.svg" style="position: absolute; left: -10%; top: -10%; z-index: 0; width: 120%">
                    <div style="position: relative; z-index: 1">
                    <div class="mini-page-title">A common format</div>
                    <div class="mini-page-subtext">
                        In order to make including a contribution table (CTAB for short) in manuscripts commonplace,
                    there needs to be some kind of standard. That way, it will be possible to make it
                    <b>machine readable</b> and easily transferrable between sources (e.g. your slides, manuscript,
                        website).
                        <br><br>

                        In addition, journals should be able to enforce their own aesthetic choices, and have
                        some control over the categories they want to <b>require</b> or set their own
                        recommendations.

                    </div>
                    </div>
                </div>
            </div>

        </section>
        <footer class="final-navigation-link m-endlink scroll-target">
            <div class="footer-subtle">Maintained by Nemo Andrea</div>
            <div class="end-nav-link"><v-btn
                    class="ma-2"
                    outlined
                    color="var(--theme-reddish)"
                    @click="goToTop()"
            ><v-icon>mdi-arrow-up-thick</v-icon> Back to top <v-icon>mdi-arrow-up-thick</v-icon>
            </v-btn>
            </div>
            <div class="footer-subtle">Last updated in 2021</div>
        </footer>
    </div>

</template>

<script>
    import plainCTAB from "./plainCTAB";
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    export default {
        name: "promotionalPage",
        components: {plainCTAB},
        data: () => ({
            demoCTAB: {cols: ['loading...'],
                rows: ['loading...'],
                contributions: [[0]],
                version: '0.2'},
            demoNames: ['E.X. Ample', 'R.E. Vision', 'E.X. Periment', 'F. Unding','M.A.N. Uscript', 'C. Ontrol',
                'S. Ignificant', 'C. Orrespondence', 'P.O. Ster', 'B.R. Eakthrough','N. Ovel', 'E.V.I. Dently',
                'T. Enure', 'S. Eminar', 'C.O.M. Petition', 'C. Ommunication','M.E. Thods','A.C. Knowledgements'],
            demoCategories: ['Conceptualisation', 'Coffee breaks','Purification','X-ray diffraction','Scripting',
                'Data Analysis','Funding','Outreach','Communication','Cryo EM','Fabrication', 'Tuning', 'Discussions',
                'Experimental Design', 'Cell Culture', 'Transfection', 'Image processing', 'Synthesis', 'Training'],
            demoLimits: {minrows: 3, mincols:4, maxrows: 7, maxcols: 12, maxLevel: 2, intermediateLevelChance: 0.3},
            staticCTAB: null,
        }),
        methods: {
            goToSection(section, anim) {
                gsap.to(window, {
                    scrollTo: {y: section, autoKill: false},
                    duration: 1
                });

                if(anim) {
                    anim.restart();
                }
            },

            goToTop() {
                gsap.to(window, {
                    scrollTo: "#greeter",
                    duration: 0.5
                });
            },

            // function that builds a random CTAB using random number of categories and names, drawn from a list
            // the contribution values are purely random
            buildRandomCTAB() {
                let newCTAB = {};
                newCTAB.version = this.demoCTAB.version;
                newCTAB.cols = this.getRandom( this.demoNames,
                    Math.round(Math.random()*(this.demoLimits.maxcols-this.demoLimits.mincols)) + this.demoLimits.mincols);
                newCTAB.rows = this.getRandom( this.demoCategories,
                    Math.round(Math.random()*(this.demoLimits.maxrows-this.demoLimits.minrows)) + this.demoLimits.minrows );
                let contributions = [];

                // eslint-disable-next-line no-global-assign
                for ( name of newCTAB.cols ) {
                    let singleContribution = []
                    // eslint-disable-next-line no-unused-vars
                    for (const category of newCTAB.rows) {
                        let level = Math.round(Math.random()*this.demoLimits.maxLevel );
                        // make sure we dont have too many intermediate levels
                        if (level > 0  && level<this.demoLimits.maxLevel)  {  // if intermediate
                            if (Math.random() > this.demoLimits.intermediateLevelChance) {
                                level = 0
                            }
                        }
                        singleContribution.push( level )
                    }
                    // make sure there can be no empty columns (i.e. person contributed nothing)
                    if (Math.max(...singleContribution) === 0){
                        const rowIndex = Math.round( Math.random()*(newCTAB.rows.length-1) );
                        singleContribution[rowIndex] = this.demoLimits.maxLevel;
                    }
                    contributions.push(singleContribution)
                }
                // do some checks on the table (ensure a category always has a dominant (maxlevel) contribution
                for (let i=0; i< newCTAB.rows.length; i++) {
                    let category = contributions.map(contribution => contribution[i]);
                    if (Math.max(...category) < this.demoLimits.maxLevel) {
                        const rowIndex = Math.round( Math.random()*(newCTAB.cols.length-1) );
                        contributions[rowIndex][i] = this.demoLimits.maxLevel;
                    }
                }

                newCTAB.contributions = contributions;
                this.demoCTAB = newCTAB;
            },

            // get n random items from array arr and return new array
            getRandom(arr, n) {
                let result = new Array(n),
                    len = arr.length,
                    taken = new Array(len);
                if (n > len)
                    throw new RangeError("getRandom: more elements taken than available");
                while (n--) {
                    const x = Math.floor(Math.random() * len);
                    result[n] = arr[x in taken ? taken[x] : x];
                    taken[x] = --len in taken ? taken[len] : len;
                }
                return result;
            },

            refreshVersusDemo() {
                this.buildRandomCTAB();
                this.staticCTAB = this.demoCTAB;
                this.ctabToString();
            },

            ctabToString(){
                let outputString = '';
                this.staticCTAB.cols.forEach((author, i) => {
                    outputString += '<b>'+ author + '</b>';
                    let contribution = this.staticCTAB.contributions[i];
                    let major = this.staticCTAB.rows.filter((category, i) => contribution[i] === 2);
                    if (major.length > 0) { outputString += ' made major contributions to ' + '<i>' + major.join('</i>, <i>') + '</i>'}


                    let minor = this.staticCTAB.rows.filter((category, i) => contribution[i] === 1);
                    if (minor.length > 0 && major.length > 0) { outputString += ' and '}
                    if (minor.length > 0) { outputString += ' made minor contributions to ' + '<i>' + minor.join('</i>, <i>') + '</i>'}

                    outputString += '. '
                });
                document.querySelector('#plaintext-demo').innerHTML = outputString;
            }
        },
        mounted() {

            const sections = document.querySelectorAll(".scroll-target");


            this.refreshVersusDemo();

            window.setInterval(() => {
                this.buildRandomCTAB();
            }, 800);


            if (window.innerWidth > 600) {
                console.log('Setting up gsap scroll')

                sections.forEach(section => {
                    // const intoAnim = gsap.timeline({paused: true})
                    //     .from(section.querySelector(".right-col"), {yPercent: 50, duration: 1})
                    //
                    ScrollTrigger.create({
                        trigger: section,
                        onEnter: () => this.goToSection(section),
                    });
                });

                gsap.to(window, {
                    scrollTo: "#greeter",
                    duration: 1
                });
        }

        }
    }
</script>

<style scoped>
    .temp-message {
        width: 100vw;
        height: 10vh;
        text-align: center;
        padding: 1rem;
        font-size: 1.4rem;
        background-color: var(--theme-soft-pink);
    }

    #greeter{
        height: 100vh;
        display:flex;
        justify-content: start;
        align-items: start;
        flex-direction: column;
        position: relative;
    }
    .title-box {
        margin: 5em 0 0 10em;
        position: relative;
        z-index: 1;
    }

    .title-main {
        font-size: 11em;
        font-family: 'Abril Fatface', cursive;
        line-height: 0.9em;
    }

    .title-ext {
        display: flex;
        justify-content: start;
    }

    #blob-4 {
        position: absolute;
        left: -18rem;
        top: -24rem;
        z-index: 0;
        width: 140rem
    }

    .demo-CTAB {
        position: absolute;
        margin-right: 10vw;
        right: 0;
        top: 65%;
        transform: translateY(-50%);
    }

    .scroll-hint {
        position: absolute;
        bottom: 2em;
        left: 50%;
        transform: translateX(-50%); /* Move button Center position  */
        z-index: 1;
    }

    .mini-page {
        height: 100vh;
        width: 100vw;
        padding: 5rem 10rem;
        position: relative;
    }

    .final-navigation-link {
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .end-nav-link {
        width: 13rem;
        text-align: center;
    }

    .m-flexible {background-color: white}

    .ext-link {
        margin: 3rem 2rem;
    }

    .ext-link-text {
        color: black;
        display: inline-block;
        z-index: 2;
        position: relative;
        padding: 5px 2px 5px 0;
        font-weight: bold;
        transition: transform 0.4s, color 0.3s;
        white-space: nowrap
    }

    .m-flexible .ext-link-text {
        background-color: var(--theme-soft-pink);
        color: white;
    }

    .ext-link:hover .ext-link-text, .ext-link:hover .ext-link-icon i.v-icon{
        transform: translateX(4px);
    }

    .ext-link .ext-link-text .acc {
        padding: 0.1rem;
        border-radius: 5px;
    }


    .ext-link:hover .ext-link-text .acc {
        color: white;
        background-color: rgba(0,0,0,0.7);
    }

    .ext-link-icon {
        position: relative;
    }

    .ext-link-icon i.v-icon {
        font-size: 1.8rem;
        display: inline-block;
    }

    .ext-link-icon-circle {
        position:  absolute;
        top: 50%;  /* position the top  edge of the element at the middle of the parent */
        left: 50%; /* position the left edge of the element at the middle of the parent */
        transform: translate(-50%, -50%);
        height: 60px;
        width: 60px;
        border-radius: 50%;
        border: 3px solid rgba(255,255,255,0.9);
        z-index: 1;
    }

    .mini-page-title{
        font-size: 3rem;
        font-weight: bold;
        margin-right: 3rem;
    }

    .mini-page-subtext {
        font-size: 1.2rem;
        padding-top: 1rem;
    }

    .m-batteries .mini-page-subtext {
        margin-right: 10rem;
    }

    .m-batteries .editor-link {
        margin-top: 5rem;
    }

    .versus-box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 4rem;
        position: relative;
        z-index: 1;
    }

    .versus-item {
        max-width: 40%;
    }

    .versus-icon {
        font-size: 2rem;
        font-weight: bold;
        margin: 0 4rem;
        margin-top: 5rem;
    }

    .versus-refresh {
        position: absolute;
        bottom: 5%;
        right: 5%;
    }

    #plaintext-demo {
        text-align: justify;
        margin-top: 5rem;
    }

    #ctab-demo .plainCTAB {
        margin: 0;
    }

    .export-option-images {
        max-width: 100%;
    }

    .m-clearer .page-flexbox {
        position: relative;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 20rem;
    }

    .m-batteries .page-flexbox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
    }

    .m-flexible .page-flexbox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%
    }

    .m-flexible .page-text {
        max-width: 40%;
    }

    .format-link {
        padding: 1rem;
        font-size: 1.8rem;
        font-weight: bold;
        color: var(--theme-reddish);


        width: 30vw;
        height: 25%;
        -webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.16);
        box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.16);
        background: rgba(0,0,0,0.05);
        margin: 2rem;

        -webkit-border-radius: 0px 40px 0px 40px;
        -moz-border-radius: 0px 40px 0px 40px;
        border-radius: 0px 40px 0px 40px;
        transition: background-color 0.66s ease;

        display: flex;
        align-items: center;
    }

    .format-link:hover{
        background: var(--theme-soft-pink);
    }

    .format-link i {
        font-size: 4rem;
        margin: 0 1rem;
    }


    .m-endlink {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-subtle {
        color: rgba(0,0,0,0.3);
        margin: 0 4rem;
    }

    .v-application a {
        color: inherit !important;
    }

    a {
        text-decoration: none !important;
    }

    .mobile { visibility: hidden}

    /* styles for mobile devices */
    @media only screen and (max-width: 600px) {
        .mobile { visibility: inherit}

        .title-box {
            margin: 1rem;
        }

        .title-main {
            font-size: 3rem;
        }

        .mini-page {
            padding: 1rem;
        }

        .plainCTAB {
            margin: 3px;
        }

        #blob-4 {
            width: 100rem;
        }

        .ext-link {
            width: inherit;
        }

        .title-ext {
            flex-direction: column;
            justify-content: center;
        }

        .ext-link {
            margin: 2rem;
            justify-content: center;
            align-items: center;
        }

        footer {
            flex-direction: column;
        }

        .m-clearer .page-flexbox {
            flex-direction: column;
            margin: 0;
        }


        .mini-page{
            height: inherit;
        }

        .versus-box {
            flex-direction: column;
            margin: 2rem 0;
        }

        .versus-item {
            max-width: inherit;

        }

        .versus-icon {
            margin: 2rem;
        }

        .versus-refresh {
            position: absolute;
            bottom: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            z-index: 1;
            visibility: hidden;
        }

        .vs-hint {
            margin-bottom: 2rem;
            color: rgba(0,0,0,0.7);
        }

        #plaintext-demo {
            margin: 0 1rem;
            padding: 0.5rem;
            border: 2px solid var(--theme-reddish);
            border-radius: 15px;
            text-align: inherit;
        }

        .m-batteries .mini-page-subtext {
            margin-right: inherit;
        }

        .m-batteries .page-flexbox {
            flex-direction: column;
        }

        .m-batteries .editor-link {
            margin: 3rem;
        }

        .m-flexible .page-flexbox {
            flex-direction: column-reverse;
        }

        .m-flexible .mini-page-subtext {
            margin-top: 1rem;
        }

        .m-flexible .page-text {
            max-width: inherit;
        }

        .format-link {
            width: 90%;
            font-size: 1.2rem;
            margin: 1rem;
        }

        .format-link i {
            font-size: 3rem;
        }
    }


</style>
