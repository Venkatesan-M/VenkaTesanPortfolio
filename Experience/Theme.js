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
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
            this.emit("switch", this.theme);
        });
    }
}

