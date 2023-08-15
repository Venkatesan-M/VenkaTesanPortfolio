import EventEmitter from "events";

export default class Theme extends EventEmitter{
    constructor(){
        super();

        this.theme = "Sun";
        this.toggleButtom = document.querySelector("input[name=checkbox]");
        
        this.setEventListeners();
    }

    setEventListeners(){
        this.toggleButtom.addEventListener("change", ()=>{
            this.theme = this.theme === "Sun" ? "Moon" : "Sun";
            // console.log(this.theme);
            // if(this.theme === "Sun"){this.moonWrapper.style.display = "none";setTimeout(()=> {}, 300);this.sunWrapper.style.display = "block";}
            // else{this.sunWrapper.style.display = "none";setTimeout(()=> {}, 300); this.moonWrapper.style.display = "block";}
            // this.toggleButtom.textContent = this.theme;
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
            this.emit("switch", this.theme);
        });
    }
}

