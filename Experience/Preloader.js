import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from 'gsap';
import convert from "./Utils/convertDivstoSpans";

export default class Preloader extends EventEmitter{
    constructor(){
        super();

        this.experience = new  Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        if(this.sizes.width > 580){
            document.querySelector(".hero-main-description").textContent = "Aspiring Software Developer | Computer Science Student";
        }else{
            document.querySelector(".hero-main-description").textContent = "Aspiring Software Developer";
        }                                                                   

        this.sizes.on("switchdevice",(device)=>{
            this.device = device;
        });

        this.world.on("worldReady",()=>{
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildern;
    }

    firstIntro(){
        return new Promise((resolve) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader",{
                opacity: 0,
                delay: 1,
                onComplete: ()=>{
                    document.querySelector(".preloader").classList.add(".hidden");
                }
            })
            if(this.device === "desktop"){
                this.timeline
                .to(this.roomChildren.cube.scale,{
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7
                }).to(this.room.position,{
                    x:-1.03,
                    ease: "power1.out",
                    duration: 0.7,
                })
            }else{
                this.timeline
                .to(this.roomChildren.cube.scale,{
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7
                }).to(this.room.position,{
                    z:-1,
                    ease: "power1.out",
                    duration: 0.7,
                });
            }
            this.timeline
                .to(".intro-text .animatedis", {
                    yPercent: 0,
                    stagger: 0.05,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                    },
                    "same"
                )
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "same"
                );
        });

    }
    secondIntro(){
        return new Promise((resolve) => {
            this.secondtimeline = new GSAP.timeline();
            this.secondtimeline
                .to(
                    ".intro-text .animatedis",
                    {
                        yPercent: 100,
                        stagger: 0.05,
                        ease: "back.in(1.7)",
                    },
                    "fadeout"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 0,
                    },
                    "fadeout"
                )
            .to(this.room.position,{
                x:0,
                y:0,
                z:0,
                ease: "power1.out",
            },"same")
            .to(this.roomChildren.cube.rotation,{
                y: 2.5 * Math.PI + Math.PI / 4,
            },"same")
            .to(this.roomChildren.cube.scale,{
                x:8.5, y:8.5, z:8.5,
            },"same")
            .to(this.camera.orthographicCamera.position,{
                y:3.5,
            },"same")
            .to(this.roomChildren.cube.position,{
                y: 8.5,
                 x: -0.038627 , z: -0.347643,
            },"same").set(this.roomChildren.body.scale,{
                x:1, y:1, z:1,
            })
            .to(this.roomChildren.cube.scale,{
                x: 0, y:0, z:0, duration: 1
            },"text")
            .to(".hero-main-title .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },"text")
            .to(".hero-main-description .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },"text")
            .to(".first-sub .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },"text")
            .to(".second-sub .animatedis",{
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",
            },"text")
            .to(this.roomChildren.tank001.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.5")
            .to(this.roomChildren.seahorse001.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
            },">-0.4")
            .to(this.roomChildren.flooritems.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.3")
            .to(this.roomChildren.tableitems.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2,2)",
                duration: 0.5,
            },">-0.3")
            .to(this.roomChildren.deskitems.scale,{
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.2")
            .to(this.roomChildren.moni.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
                duration: 0.5,

            },">-0.2")
            .to(this.roomChildren.phone001.scale,{
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.2")
            .to(this.roomChildren.chair.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.2")
            .to(this.roomChildren.chair.rotation,{
                y: (Math.PI)/2 + Math.PI/6,
            },">-0.2")
            .to(this.roomChildren.shlef.scale,{
                x:1, y:1, z:1,
                ease: "power1.out",
                duration: 0.5,
            },">-0.3")
            .to(this.roomChildren.wallitems.scale,{
                x:1, y:1, z:1,
                ease: "power1.out",
                duration: 0.5,
            },">-0.3")
            .to(this.roomChildren.hourhand.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
            })
            .to(this.roomChildren.minutehand.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
            })
            .to(this.roomChildren.secondhand.scale,{
                x:1, y:1, z:1,
                ease: "back.out(2.2)",
            })
            .to(this.roomChildren.minifloor.scale,{
                x:1, y:1, z:1,
            })
            .to(".arrow-svg-wrapper",{
                opacity: 1,
                onComplete: resolve,
            })
            // .to(
            //     ".toggle-bar",
            //     {
            //         opacity: 1,
            //         onComplete: resolve,
            //     }
            // );
        });
    }

    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e){
        this.intialY = e.touches[0].clientY;
    }
    onTouchMove(e){
        let currentY = e.touches[0].clientY;
        let difference = this.intialY - currentY;
        if(difference > 0){
            // console.log("swipped");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
     }

     removeEventListeners(){
        window.removeEventListener("wheel",this.scrollOnceEvent);
        window.removeEventListener("touchstart",this.touchStart);
        window.removeEventListener("touchmove",this.touchMove);
     }

    async playIntro(){
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel",this.scrollOnceEvent);
        window.addEventListener("touchstart",this.touchStart);
        window.addEventListener("touchmove",this.touchMove);
    }
    async playSecondIntro(){
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move(){
        if(this.device === "desktop"){
            this.room.position.set(-1.03,0,0);
        }else{
            this.room.position.set(0,0,-1)
        }
    }
    
    scale(){
        this.roomChildren.rectlight.width = 0;
        this.roomChildren.rectlight.height = 0;
        if(this.device === "desktop"){
            this.room.scale.set(0.11,0.11,0.11);
        }else{
            this.room.scale.set(0.07,0.07,0.07)
        }
        
    }

    update(){
        if(this.moveFlag){
            this.move();
        }
        if(this.scaleFlag){
            this.scale();
        }
    }
}