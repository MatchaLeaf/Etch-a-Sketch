const container = document.querySelector("#container");
const colorPicker = document.querySelector("#colorInput");
const opacitySlider = document.querySelector("#opacity");
const opacityLabel = document.querySelector("#opacityLabel");
const selectedColor = colorPicker.value;

let isHolding = false;
let defaultColor = '#000000';
let mode = "normal";
let defaultOpacity = opacitySlider.value;

//create 3 event types that will "listen" to what the user inputs
container.addEventListener("mousedown", () =>{ isHolding =  true; });
container.addEventListener("mouseup", () => { isHolding = false; });
container.addEventListener("mouseleave", () =>{ isHolding = false; })


//listen for the color change taking place
colorPicker.addEventListener("change", ()  => {
    defaultColor = colorPicker.value;
})

//listen for the change with the slider
opacity.addEventListener("input", () => {
    const value = opacitySlider.value;
    opacityLabel.textContent = value;
    defaultOpacity = opacitySlider.value;
}
)

function hexToRgb(hex){
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0,2), 16);
    const g = parseInt(hex.substring(2,4), 16);
    const b = parseInt(hex.substring(4,6), 16);
    return `${r}, ${g}, ${b}`;
}

function Normal(){


while (container.firstChild){
    container.removeChild(container.firstChild);
}

 for(let i = 1; i <= 256; i++){
    const div = document.createElement("div");
    div.classList.add("grid-cell");
    container.appendChild(div);


    div.addEventListener("mousemove", () => {
        setTimeout(()=>{
            const opacity = opacitySlider.value / 100;
            if(isHolding){ 
                if(mode == "normal"){
                  const rgb = hexToRgb(defaultColor);
                  div.style.backgroundColor = `rgba(${rgb}, ${opacity})`
                }else if(mode == "random"){
                    const rgb = RandomColors();
                    div.style.backgroundColor = `rgba(${rgb}, ${opacity})`;
                }
            }
        }, 50); 
    });

    div.addEventListener("mousedown", () => {
        const opacity = opacitySlider.value / 100;
        if(mode == "normal"){
            const rgb = hexToRgb(defaultColor);
            div.style.backgroundColor = `rgba(${rgb}, ${opacity})`
        }else if(mode == "random"){
            const rgb = RandomColors();
            div.style.backgroundColor = `rgba(${rgb}, ${opacity})`;

        }
    })
}
}

function RandomColors() {
    //Randomize values for each color from 0 to 256
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    
    return `${r}, ${g}, ${b}`; //Returns RBG as a string 
}

function Eraser(){
    mode = "normal";
    defaultColor = "#FFFFFF";
}

function Random(){
    mode = "random";
}

function AskUser(){
    //To get what the user inputted inside the textbox we use the .value tag
    const input = document.querySelector("#gridSizeInput");
    const n = Number(input.value);

    if(isNaN(n)){
        alert("Please Enter a number from 8 to 100");
        input.value = "";
        return;
    }else if(n < 8){
        alert("This number is too small (pick between 8 to 100)")
        input.value = "";
        return;
    }else if(n > 100){
        alert("Sorry this number is too big (Please Enter a number between 8 to 100");
        input.value = "";
        return;
    }else if(n <= 100){
        input.value = "";
        //First clear existing grid
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }

        //Set the grid size to the designated value
        for(let i = 1; i <= n*n; i++){
            const newDiv = document.createElement("div");
            newDiv.classList.add("grid-cell");
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
                        const rgb = hexToRgb(defaultColor);
                        const opacity = opacitySlider.value / 100;
                        newDiv.style.backgroundColor = `rgba(${rgb}, ${opacity})`
                    } else if(mode == "random"){
                        const rgb = RandomColors();
                        const opacity = opacitySlider.value / 100;
                        newDiv.style.backgroundColor = `rgba(${rgb}, ${opacity})`;
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
                            const rgb = hexToRgb(defaultColor);
                            const opacity = opacitySlider.value / 100;
                            newDiv.style.backgroundColor = `rgba(${rgb}, ${opacity})`
                        }else if(mode === "random"){
                            const rgb = RandomColors();
                            const opacity = opacitySlider.value / 100;
                            newDiv.style.backgroundColor = `rgba(${rgb}, ${opacity})`;
                        }
                    }
                }, 100);
            });
            
        }
    
    }else if(!Number.isInteger(n)){
        alert("Please Enter a number");
        return;
    }
}

function Clear(){
    //first select all of the divs on the screens
   const gridCell = document.querySelectorAll(".grid-cell");
   //For each of those divs set the background color to white
   gridCell.forEach( cells => cells.style.backgroundColor = "white");
}

function Pencil(){
    mode = "normal";
    defaultColor = colorPicker.value;
}
Normal();