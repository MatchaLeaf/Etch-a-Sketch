const container = document.querySelector("#container");
let isHolding = false;
let defaultColor = 'black';
let mode = "normal";

//create 3 event types that will "listen" to what the user inputs
container.addEventListener("mousedown", () =>{ isHolding =  true; });
container.addEventListener("mouseup", () => { isHolding = false; });
container.addEventListener("mouseleave", () =>{ isHolding = false; })

function Normal(){


while (container.firstChild){
    container.removeChild(container.firstChild);
}

 for(let i = 1; i <= 256; i++){
    mode = "normal";
    defaultColor = "black";
    const div = document.createElement("div");
    container.appendChild(div);


    div.addEventListener("mousemove", () => {
        setTimeout(()=>{
            if(isHolding){ 
                if(mode == "normal"){
                div.style.backgroundColor = defaultColor;
                }else if(mode == "random"){
                div.style.backgroundColor = RandomColors();
                }
            }
        }, 50); 
    });

    div.addEventListener("mousedown", () => {
        if(mode == "normal"){
            div.style.backgroundColor = defaultColor;
        }else if(mode == "random"){
            div.style.backgroundColor = RandomColors();
        }
    })
}
}

function RandomColors() {
    //Randomize values for each color from 0 to 256
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    return `rgb(${r}, ${g}, ${b})`; //Returns RBG as a string 
}

function Eraser(){
    mode = "normal";
    defaultColor = "white";
}

function Random(){
    mode = "random";
    console.log(mode);
}

function AskUser(){
    //To get what the user inputted inside the textbox we use the .value tag
    const input = document.querySelector("#gridSizeInput");
    const n = parseInt(input.value);

    if(n === null){
        alert("Please Enter a number from 8 to 100");
        input.value = "";
    }else if(n < 8){
        alert("This number is too small (pick between 8 to 100)")
        input.value = "";
    }else if(n > 100){
        alert("Sorry this number is too big (Please Enter a number between 8 to 100");
        input.value = "";
    }else if(n <= 100){
        input.value = "";
        //First clear existing grid
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }

        //Set the grid size to the designated value
        for(let i = 1; i <= n*n; i++){
            const newDiv = document.createElement("div");
            container.appendChild(newDiv);

            newDiv.style.height = (100 / n) + "%";
            const containerSize = 640; // fixed px
            //Makes the square all uniform in size
            const cellSize = containerSize / n; // 10px
            newDiv.style.flex = `0 0 ${cellSize}px`;
            newDiv.style.height = `${cellSize}px`;
            // newDiv.textContent = i;

            //create 3 event types that will "listen" to what the user inputs
            newDiv.addEventListener("mousedown", () =>{
                //start drawing
                if(isHolding){
                    if(mode === "normal"){
                    newDiv.style.backgroundColor = defaultColor;
                    } else if(mode ==- "random"){
                    newDiv.style.backgroundColor = RandomColors();
                    }
                }     
            });
            newDiv.addEventListener("mouseup", () => {
                //Stop drawing
                isHolding = false;
            })
            newDiv.addEventListener("mousemove", () => {
                setTimeout (() => {
                    if(isHolding){ 
                        if(mode === "normal") {
                            newDiv.style.backgroundColor = defaultColor;
                        }else if(mode === "random"){
                            newDiv.style.backgroundColor = RandomColors();
                        }
                    }
                }, 100);
            });
            
        }
    
    }else if(!Number.isInteger(n)){
        alert("Please Enter a number");
    }
}

function Clear(){
    //first select all of the divs on the screens
   const div = document.querySelectorAll("div");
   //For each of those divs set the background color to white
   div.forEach( div => div.style.backgroundColor = "white");
}

function Pencil(){
    mode = "normal";
    defaultColor = "black";
}
Normal();