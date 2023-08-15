import * as THREE from 'three';
import Experience from '../Experience';
import  GSAP  from 'gsap';
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper';

export default class Room{
    constructor(){
        this.experience = new  Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildern = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.11,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

    }

    setModel(){
        this.actualRoom.children.forEach(child=>{
            child.castShadow = true;
            child.receiveShadow = true;
            if(child instanceof THREE.Group){
                child.children.forEach(groupChild=>{
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }
            if(child.name === "Tank001"){
                
                child.children[4].material = new THREE.MeshPhysicalMaterial();
                child.children[4].material.roughness = 0;
                child.children[4].material.color.set(0x75e5f2);
                child.children[4].material.ior = 3;
                child.children[4].material.transmission = 1;
                child.children[4].material.opacity = 1;
                child.children[4].material.depthWrite = false;
            }

            else if(child.name === "Moni"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            else if(child.name === "MiniFloor"){
                child.position.x = -1.17621;
                child.position.z = 6.89224;
            }
            // if(child.name === "Mail" || 
            // child.name === "Lamp" || 
            // child.name === "Flower" || 
            // child.name === "Flower001" ||
            // child.name === "Dirt" || 
            // child.name === "F1" ||
            // child.name === "F2" ||
            // child.name === "F3" 
            // ){
            //     child.scale.set(0,0,0);
            // }
            child.scale.set(0,0,0);
            if(child.name === "Cube"){
                // child.scale.set(1,1,1);
                child.position.set(0, 0.8 , 0);

            }
            if(child.name === "minuteHand"){
                this.minuteHand = child;
            }
            if(child.name === "secondHand"){
                this.secondHand = child;
            }
            if(child.name === "hourHand"){
                this.hourHand = child;
            }

            this.roomChildern[child.name.toLowerCase()] = child;

        });

        const width = 0.57813;
        const height = 0.87531;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(6.3 ,7.5  ,-1.8 );
        rectLight.rotation.x = - Math.PI /2;
        rectLight.rotation.z =  Math.PI /4;
        this.actualRoom.add(rectLight);
        this.roomChildern['rectlight'] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper(rectLight1);
        // rectLight1.add(rectLightHelper);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11,0.11,0.11);
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
            this.rotation = ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth;
            this.lerp.target = this.rotation * 0.05;

        });
    }

    resize(){

    }
    
    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta * 0.00087531);
    }
}