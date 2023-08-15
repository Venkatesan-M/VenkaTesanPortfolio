import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";


export default class Controls {
    constructor(){
        this.experience = new  Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child =>{
            if(child.type==="RectAreaLight"){this.rectLight = child; }
        });

        this.minuteHand = this.experience.world.room.minuteHand;
        this.secondHand = this.experience.world.room.secondHand;
        this.hourHand = this.experience.world.room.hourHand;
        this.counter = 0;


        this.pinkCircle = this.experience.world.floor.pinkCircle;
        this.blueCircle = this.experience.world.floor.blueCircle;
        this.greenCircle = this.experience.world.floor.greenCircle;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setClock();  
        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.setSmoothScroll();
        }
        this.setScrollTrigger();       
    }
    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }


    setScrollTrigger(){
        let mm = GSAP.matchMedia();
        //Desktop
        mm.add("(min-width: 969px)", () => {
            this.room.scale.set(0.11,0.11,0.11);
            this.rectLight.width = 0.57813;
            this.rectLight.height = 0.87531;
            this.camera.orthographicCamera.position.set(0, 3.5, 5);
            this.room.position.set(0, 0, 0);
            //First Section -----------------------------------------
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            })
            this.firstMoveTimeline.fromTo(
                this.room.position,
                { x: 0, y: 0, z: 0 },
                {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    },
                },"pos"
            ) .to(this.room.scale,{
                x: 0.125,
                y: 0.125,
                z: 0.125,
            },"same") .to(this.rectLight,{
                width: 1.25 * 0.57813,
                height: 1.25 * 0.87531,
            },"same").to(this.pinkCircle.scale,{
                x: 2,
                y: 2,
                z:2,
            },"pos")

            //second Section 
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            })
            .to(this.blueCircle.position,{
                x: 2 ,
            },)
             .to(this.room.position,{
                x: 1.505 ,
                z: ()=>{return this.sizes.height * 0.005}
            },"same") 
            .to(this.room.scale,{
                x: 0.5,
                y: 0.5,
                z: 0.5,
            },"same") .to(this.rectLight,{
                width: 5 * 0.57813,
                height: 5 * 0.87531,
            },"same") .to(this.blueCircle.scale,{
                x: 3,
                y: 3,
                z:3,
            },"same").to(this.pinkCircle.scale,{
                x: 0,
                y: 0,
                z:0,
            })

            //Third Section
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            }).to(this.camera.orthographicCamera.position,{
                x: 1.8,
                y:1.2,
                z:-9
            },"same").to(this.greenCircle.scale,{
                x: 3.8,
                y: 3.8,
                z:3.8,
            },"same").to(this.blueCircle.scale,{
                x: 0,
                y: 0,
                z:0,
            })

            //fourth Section

            this.fourthMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".fourth-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            }).to(this.blueCircle.position,{
                y: -0.069,
            },"same").to(this.camera.orthographicCamera.position,{
                x: this.sizes.width * 0.00078,
                y:-5,
                z:0
            },"same").to(this.blueCircle.scale,{
                x: 3,
                y: 3,
                z:3,
            })
            //fifth section
            this.fifthMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".fifth-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            }).to(this.camera.orthographicCamera.position,{
                x: 0,
                y:3.5,
                z:5
            }).to(this.pinkCircle.position,{
                x: ()=>{return this.sizes.width * 0.0014;},
                y: -0.065,
            })
             .to(this.room.position,{
                x: ()=>{return this.sizes.width * 0.0014;},
                y:0,
                z:0,
            },"same") .to(this.room.scale,{
                x: 0.125,
                y: 0.125,
                z: 0.125,
            },"same") .to(this.rectLight,{
                width: 1.25 * 0.57813,
                height: 1.25 * 0.87531,
            },"same")
            .to(this.pinkCircle.scale,{
                x: 2,
                y: 2,
                z: 2,
            },"same")
        });

        //Mobile
        mm.add("(max-width: 968px)", () => {

            //Resize
            this.room.scale.set(0.07,0.07,0.07);
            this.room.position.set(0,0,0);
            this.rectLight.width = 0.7 * 0.57813;
            this.rectLight.height = 0.7 * 0.87531;
            //First Section -----------------------------------------
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    // invalidateOnRefresh: true,
                }
            }).to(this.room.scale,{
                x: 0.1,
                y: 0.1,
                z: 0.1,
            },"same").to(this.rectLight,{
                width:  0.57813,
                height:  0.87531,
            },"same").to(this.pinkCircle.scale,{
                x: 1.5,
                y: 1.5,
                z:1.5,
            },"same")
            //second Section
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            }).to(this.blueCircle.position,{
                x: 1.505 ,
            },"same")
            .to(this.room.scale,{
                x: 0.25,
                y: 0.25,
                z: 0.25,
            },"same").to(this.rectLight,{
                width:2.5 * 0.57813,
                height:2.5 * 0.87531,
            },"same").to(this.room.position,{
                x: 1.505 ,
            },"same").to(this.blueCircle.scale,{
                x: 3,
                y: 3,
                z:3,
            },"same").to(this.pinkCircle.scale,{
                x: 0,
                y: 0,
                z:0,
            })

            //Third Section
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            }).to(this.camera.orthographicCamera.position,{
                x: 3,
                y:-4.3,
                z:-15
            },"same").to(this.greenCircle.scale,{
                x: 3.5,
                y: 3.5,
                z:3.5,
            },"same").to(this.blueCircle.scale,{
                x: 0,
                y: 0,
                z:0,
            })
            //fourth Section
            this.fourthMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".fourth-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            }).to(this.blueCircle.position,{
                y: -0.069,
            })
            .to(this.camera.orthographicCamera.position,{
                x: this.sizes.width * 0.00038,
                y:-1.25,
                z:0
            },"same").to(this.blueCircle.scale,{
                x: 3,
                y: 3,
                z:3,
            })
            //fifth Section
            this.fifthMoveTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".fifth-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                }
            }).to(this.camera.orthographicCamera.position,{
                x: 0,
                y:3.5,
                z:5
            })
             .to(this.room.position,{
                x: 0,
                y:0,
                z:0,
            },"same").to(this.pinkCircle.position,{
                x: -0.065,
                y: -0.065,
                z: -0.065,
            })
             .to(this.room.scale,{
                x: 0.08,
                y: 0.08,
                z: 0.08,
            },"same") .to(this.rectLight,{
                width: 0.8 * 0.57813,
                height: 0.8 * 0.87531,
            },"same") .to(this.pinkCircle.scale,{
                x: 2,
                y: 2,
                z: 2,
            })

        });

        mm.add("all", ()=>{
            //mini platform animation
            this.section = document.querySelectorAll(".section");
            this.section.forEach((section) =>{
                this.progressWrapper = section.querySelector(".progress-wrapper");
                this.progressBar = section.querySelector(".progress-bar");

                if(section.classList.contains("right")){
                    GSAP.to(section, {
                        borderTopLeftRadius: 10,
                        scrollTrigger:{
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        }
                    })
                    GSAP.to(section, {
                        borderBottomLeftRadius: 700,
                        scrollTrigger:{
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        }
                    })
                }else{
                    GSAP.to(section, {
                        borderTopRightRadius: 100,
                        scrollTrigger:{
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        }
                    })
                    GSAP.to(section, {
                        borderBottomRightRadius: 700,
                        scrollTrigger:{
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        }
                    })
                }

                GSAP.from(this.progressBar,{
                    scaleY: 0,
                    scrollTrigger:{
                        trigger: section,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                        pin: this.progressWrapper,
                        pinSpacing: false,
                    }
                })
            }); 
            this.secondPartTimeline = new GSAP.timeline({
                scrollTrigger:{
                    trigger: ".fourth-move",
                    start: "center center",
                }
            });
            this.room.children.forEach(child=>{
                if(child.name === "MiniFloor"){
                    this.first = GSAP.to(child.position,{
                        x: -5.23887 ,
                        z:10.9549 ,
                        duration: 0.3
                    })
                }
                if(child.name === "Mail"){
                    this.second = GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        duration: 0.3
                    })
                }
                if(child.name === "Lamp"){
                    this.third = GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        ease: "back.out(2)",
                        duration: 0.3
                    })
                }
                if(child.name === "Flower"){
                    this.nineth = GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        ease: "back.out(2)",
                        duration: 0.3
                    })
                }
                if(child.name === "Flower001"){
                    this.eight = GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        ease: "back.out(2)",
                        duration: 0.3
                    })
                }
                if(child.name === "Dirt"){
                    this.seventh = GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        ease: "back.out(2)",
                        duration: 0.3
                    })
                }
                if(child.name === "F3"){
                    this.sixth = GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        ease: "back.out(2)",
                        duration: 0.3
                    })
                }
                if(child.name === "F1"){
                    this.fourth =GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        ease: "back.out(2)",
                        duration: 0.3
                    })
                }
                if(child.name === "F2"){
                    this.fifth = GSAP.to(child.scale,{
                        x: 1 ,
                        y:1,
                        z:1,
                        duration: 0.3
                    })
                }
            });
            this.secondPartTimeline.add(this.first);
            this.secondPartTimeline.add(this.second);
            this.secondPartTimeline.add(this.third);
            this.secondPartTimeline.add(this.fourth, "-=0.2");
            this.secondPartTimeline.add(this.fifth, "-=0.2");
            this.secondPartTimeline.add(this.sixth, "-=0.2");
            this.secondPartTimeline.add(this.seventh, "-=0.2");
            this.secondPartTimeline.add(this.eight,"-=0.1");
            this.secondPartTimeline.add(this.nineth);
            
        })
        
    }

    setClock(){
        var d = new Date();
        this.s = d.getSeconds();
        this.m = d.getMinutes();
        this.h = d.getHours();
        this.h = this.h > 12 ? this.h-12 : this.h;
        this.hourAngle = (-Math.PI/6)*this.h;
        this.minuteAngle = (-Math.PI/30)*this.m;
        this.secondAngle = (-Math.PI/30)*this.s;
        this.hourHand.rotateY(this.hourAngle); 
        this.minuteHand.rotateY(this.minuteAngle); 
        this.secondHand.rotateY(this.secondAngle); 
    }
    updateClock() {
        var d = new Date();
        var newS = d.getSeconds();
        var newM = d.getMinutes();
        var newH = d.getHours();
    
        if (this.s !== newS) {
            this.secondHand.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-Math.PI / 30) * (newS - this.s));
            this.s = newS;
        }
        if (this.m !== newM) {
            this.minuteHand.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-Math.PI / 30) * (newM - this.m));
            this.m = newM;
        }
        if (this.h !== newH) {
            this.hourHand.rotateOnAxis(new THREE.Vector3(0, 1, 0), (-Math.PI / 6) * (newH - this.h));
            this.h = newH;
        }
    }

    resize(){

    }
    
    update(){         
        this.updateClock();
    }
}