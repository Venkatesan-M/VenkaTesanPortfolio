import * as THREE from 'three';
import Experience from '../Experience';

export default class Floor{
    constructor(){
        this.experience = new  Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xfaf4e5 ,
            side: THREE.BackSide,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI /2;
        this.plane.position.y = -0.1;
        this.plane.receiveShadow = true;
    }

    setCircles(){
        const geometry = new THREE.CircleGeometry(5,64);

        const pinkMaterial = new THREE.MeshStandardMaterial({color: 0xe5a1aa});
        const blueMaterial = new THREE.MeshStandardMaterial({color: 0x8395cd});
        const greenMaterial = new THREE.MeshStandardMaterial({color: 0x7ad0ac});

        this.pinkCircle = new THREE.Mesh(geometry,pinkMaterial);
        this.blueCircle = new THREE.Mesh(geometry,blueMaterial);
        this.greenCircle = new THREE.Mesh(geometry,greenMaterial);

        this.pinkCircle.position.y = -0.09;
        this.blueCircle.position.y = -0.08;
        this.greenCircle.position.y = -0.07;

        this.pinkCircle.scale.set(0,0,0);
        this.blueCircle.scale.set(0,0,0);
        this.greenCircle.scale.set(0,0,0);

        this.pinkCircle.rotation.x = this.blueCircle.rotation.x = this.greenCircle.rotation.x = -Math.PI/2;

        this.pinkCircle.receiveShadow = true; 
        this.blueCircle.receiveShadow = true; 
        this.greenCircle.receiveShadow = true; 

        this.scene.add(this.pinkCircle)
        this.scene.add(this.blueCircle)
        this.scene.add(this.greenCircle)
    }

    resize(){

    }
    
    update(){

    }
}