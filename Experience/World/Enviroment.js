import * as THREE from 'three';
import Experience from '../Experience';
import  GSAP  from 'gsap';
// import GUI from 'lil-gui';//Color Picker!!

export default class Enviroment{
    constructor(){
        this.experience = new  Experience();
        this.scene = this.experience.scene;

        this.setSunlight();
        // this.setGUI();
    }
//Color Picker!!
    // setGUI(){
    //     this.gui.addColor(this.obj, "colorObj").onChange(()=>{
    //         this.sunLight.color.copy(this.obj.colorObj)
    //         this.ambientLight.color.copy(this.obj.colorObj)
    //         console.log(this.obj.colorObj);
    //     });
    //     this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
    //         this.sunLight.intensity = this.obj.intensity;
    //         this.ambientLight.intensity = this.obj.intensity;
    //     });
    // }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff",3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        this.sunLight.position.set(-1.5,7,3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#ffffff",1.5);
        this.scene.add(this.ambientLight);

        const today = new Date()
        const curHr = today.getHours()
        if(curHr > 18 || curHr < 6 ){
            this.switchTheme('Moon');
            document.querySelector("input[name=checkbox]").click();
        }
    }

    switchTheme(theme){
        if(theme === "Moon"){
            GSAP.to(this.sunLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,      
            })
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,  
            })
            GSAP.to(this.sunLight, {
                intensity: 2.7,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1.3,
            });
        }else{
            GSAP.to(this.sunLight.color, {
                r: 1,
                g: 1,
                b: 1,
            })
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            })
            GSAP.to(this.sunLight, {
                intensity: 3,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1.5,
            });
        }
    }

    resize(){

    }
    
    update(){

    }
}