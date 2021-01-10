<template>
    <div>

        <section class="scroll-target" id="greeter">
<!--            <div class="temp-message">-->
<!--                <b>Contribution Tables promotional page.</b> <br>-->
<!--                This page is under development, in the meantime: <router-link to="/editor">go to editor</router-link>-->
<!--            </div>-->
<!--            <button @click="buildRandomCTAB">new table</button>-->
            <div class="title-box">
                <div class="title-main">Contribution<br>Tables</div>
                <div class="title-ext">
                    <div class="ext-link">
						<router-link to="/editor">
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
            A clearer way to show contributions
        </section>
        <section class="mini-page m-batteries scroll-target">
            Batteries included
        </section>
        <section class="mini-page m-flexible scroll-target">
            Flexible Standard
            <div class="ext-link">
                <router-link to="/check-CTAB">
                    <span class="ext-link-text">Check your <span class="acc">CTAB string</span></span>
                    <span class="ext-link-icon"><v-icon>mdi-arrow-top-right</v-icon><span class="ext-link-icon-circle"></span></span>
                </router-link>
            </div>
        </section>
        <footer class="final-navigation-link m-endlink scroll-target">
            <div class="end-nav-link">Back to top</div>
            <div class="end-nav-link">Try the editor</div>
            <div class="end-nav-link">Read the specification</div>
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
            demoLimits: {minrows: 3, mincols:4, maxrows: 7, maxcols: 12, maxLevel: 2, intermediateLevelChance: 0.3}
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
            }
        },
        mounted() {

            const sections = document.querySelectorAll(".scroll-target");


            this.buildRandomCTAB();
            window.setInterval(() =>{
                this.buildRandomCTAB();
            }, 700);


            sections.forEach(section => {
                // const intoAnim = gsap.timeline({paused: true})
                //     .from(section.querySelector(".right-col"), {yPercent: 50, duration: 1})
                //
                ScrollTrigger.create({
                    trigger: section,
                    onEnter: () => this.goToSection(section),
                });

                ScrollTrigger.create({
                    trigger: section,
                    start: "bottom bottom",
                    onEnterBack: () => this.goToSection(section),
                });
            });

            gsap.to(window, {
                scrollTo: "#greeter",
                duration: 1
            });

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
    }

    .mini-page {
        height: 100vh;
        width: 100vw;
        padding: 10rem;
    }

    .final-navigation-link {
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .end-nav-link {
        margin: 3rem;
        width: 13rem;
        background-color: pink;
        text-align: center;
    }

    .m-clearer {
        background-color: lightcyan;
    }

    .m-batteries {background-color: darkseagreen}

    .m-flexible {background-color: var(--theme-soft-pink)}

    .ext-link {
        margin: 3rem 2rem;
    }

    .ext-link-text {
        color: black;
        display: inline-block;
        background-color: white;
        z-index: 2;
        position: relative;
        padding: 5px 2px 5px 0;
        font-weight: bold;
        transition: transform 0.4s, color 0.3s;
    }

    .m-flexible .ext-link-text {
        background-color: var(--theme-soft-pink);
        color: white;
    }

    .ext-link:hover .ext-link-text, .ext-link:hover .ext-link-icon i.v-icon{
        transform: translateX(4px);
    }


    .ext-link:hover .ext-link-text .acc {
        color: var(--theme-reddish);
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
        border: 3px solid var(--theme-reddish);
        z-index: 1;
    }


</style>
