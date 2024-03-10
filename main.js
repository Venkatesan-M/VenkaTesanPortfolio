import "./style.css";
import Experience from "./Experience/Experience.js";
import Facts from "./Facts.js";
import { shuffleArray, factTittles, docTitles } from "./Facts.js";

const experience = new Experience(document.querySelector(".experience-canvas"));

document.addEventListener("DOMContentLoaded", function() {
    
    const factPlaceholder = document.getElementById("fact");
    const facttitle = document.getElementById("fact-title");
    shuffleArray(factTittles);
    facttitle.innerText =factTittles[ Math.floor(Math.random() * factTittles.length)];
    var factNumber;
 
    function randomFact(){
        shuffleArray(Facts)
      return Facts[factNumber];
    }
  
    factNumber = Math.floor(Math.random() * Facts.length);
    factPlaceholder.textContent = randomFact();

    let docTitle = document.title;
    window.addEventListener("blur", ()=>{
      const docTitleNumber = Math.floor(Math.random() * docTitles.length);
      document.title = docTitles[docTitleNumber];
    } )
    window.addEventListener("focus", ()=>{
      document.title = docTitle;
    })
});
