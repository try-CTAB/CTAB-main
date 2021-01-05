<template>
    <div>

        <section class="scroll-target" id="greeter">
            <div class="temp-message">
                <b>Contribution Tables promotional page.</b> <br>
                This page is under development, in the meantime: <router-link to="/editor">go to editor</router-link>
            </div>
            <div class="title-box">
                <div class="title-main">Contribution<br>Tables</div>
                <div class="title-ext">
                    <div class="ext-link">
                        <a href="/#/editor" target="_blank">
                            <span class="ext-link-text">Try the table <span class="acc">editor</span></span>
                            <span class="ext-link-icon"><v-icon>mdi-arrow-top-right</v-icon><span class="ext-link-icon-circle"></span></span>
                        </a>
                    </div>
                    <div class="ext-link">
                        <a href="https://nemoandrea.github.io/better-contributions-spec/" target="_blank">
                            <span class="ext-link-text">Read the <span class="acc">how</span></span>
                            <span class="ext-link-icon"><v-icon>mdi-arrow-top-right</v-icon><span class="ext-link-icon-circle"></span></span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="scroll-hint">scroll to get started</div>
        </section>
        <section class="mini-page m-clearer scroll-target" >
            A clearer way to show contributions
        </section>
        <section class="mini-page m-batteries scroll-target">
            Batteries included
        </section>
        <section class="mini-page m-flexible scroll-target">
            Flexible Standard
        </section>
        <footer class="final-navigation-link m-endlink scroll-target">
            <div class="end-nav-link">Back to top</div>
            <div class="end-nav-link">Try the editor</div>
            <div class="end-nav-link">Read the specification</div>
        </footer>
    </div>

</template>

<script>
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    export default {
        name: "promotionalPage",
        methods: {
            goToSection(section, anim) {
                gsap.to(window, {
                    scrollTo: {y: section, autoKill: false},
                    duration: 1
                });

                if(anim) {
                    anim.restart();
                }
            }
        },
        mounted() {

            const sections = document.querySelectorAll(".scroll-target");


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

    .m-flexible {background-color: #E3AFBC}

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
