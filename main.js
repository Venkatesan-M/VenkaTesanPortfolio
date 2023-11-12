import "./style.css";
import Experience from "./Experience/Experience.js";
import Facts from "./Facts.js";
import { shuffleArray } from "./Facts.js";

const experience = new Experience(document.querySelector(".experience-canvas"));

document.addEventListener("DOMContentLoaded", function() {
    
    var factPlaceholder = document.getElementById("fact");
    var factNumber;
 
    function randomFact(){
        shuffleArray(Facts)
      return Facts[factNumber];
    }
  
    factNumber = Math.floor(Math.random() * Facts.length);
    factPlaceholder.textContent = randomFact();

  });