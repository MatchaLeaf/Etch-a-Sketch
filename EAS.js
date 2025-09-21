const container = document.querySelector("#container");
function Draw(e){
for(let i = 1; i <= 256; i++){
    const div = document.createElement("div");
    container.appendChild(div);

    newDiv.addEventListener("mouseover", () => {
        newDiv.style.backgroundColor = `black`;
        
        setTimeout(() => { 
            newDiv.style.backgroundColor = `black`
        },100);

    });

    div.addEventListener("mouseout", () => {
        div.style.backgroundColor = `black`;
});
}

}
function AskUser(n){
    n = prompt("What Grid Size Would You Like?");
    if(n === null){
        alert("Please Enter a number from 1 to 100");
    }else if(n > 100){
        alert("Sorry this is too big");
    }else if(n <= 100){
        
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

            newDiv.addEventListener("mouseover", () => {
                newDiv.style.backgroundColor = `${randomColor}`;
                setTimeout(() => { 
                    newDiv.style.backgroundColor = `${randomColor}`
                },100);

            });
            
        }
    
    }else if(!Number.isInteger(n)){
        alert("Please Enter a number");
    }
}

function RandomColors() {
    //Randomize values for each color from 0 to 256
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`; //Returns RBG as a string 
}
const randomColor = RandomColors();
console.log(randomColor);