//Project requirments:

//1. Your app must be a HTML/CSS/JS frontend that accesses data from a public API. 
//   All interactions between the client and the API should be handled asynchronously and use JSON as the communication format.
//DONE

//2. Your entire app must run on a single page. 
//   There should be NO redirects. In other words, 
//   your project will contain a single HTML file.
//DONE

//3. Your app needs to incorporate at least 3 separate event listeners 
//   (DOMContentLoaded, click, change, submit, etc).
//DONE

//4. Some interactivity is required. This could be as simple as adding a "like" button or adding comments. 
//   These interactions do not need to persist after reloading the page.
//DONE

//5. Follow good coding practices. Keep your code DRY (Do not repeat yourself) 
//   by utilizing functions to abstract repetitive code.
//DONE

// ᖬ symbol for credits

document.addEventListener('DOMContentLoaded', () => {
    
    shipDataFetch()

// array lists

    const dataArray = []
    let classArray = []
    
//add Event Listeners    

    const form = document.getElementById("class-select")
    const toggle = document.getElementById("dark-toggle")
    const budget = document.getElementById("budget-form")

    form.addEventListener("click", filter)
    toggle.addEventListener("click", darkMode)
    budget.addEventListener("input", budgetForm)
    budget.addEventListener("mouseenter", hoverOn)
    budget.addEventListener("mouseleave", hoverOff)

//fetch ship data

    function shipDataFetch(){
        fetch('https://swapi.dev/api/starships')
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            //populating seperate arrays
            data.results.forEach(item => handleShipData(item))
            data.results.forEach(item => dataArray.push(item))

            //class array
            dataArray.forEach((ship) => {
                if (!classArray.includes(ship.starship_class)) {
                    classArray.push(ship.starship_class)
                    populateSelectForm(ship.starship_class)
                }
            });
        })
        .catch((error)=>{
            alert(error.message) 

        })
    }

    function handleShipData(ship){

        const collection = document.getElementById("ship-list")
        const newShip = document.createElement('div')

        newShip.className = 'card'
        newShip.innerHTML = `
                            <h2>${ship.name}</h2>
                            <p>Model: ${ship.model}</p>
                            <p>Manufacturer: ${ship.manufacturer}</p>
                            <p>Class: ${ship.starship_class}</p>
                            <p>Cost: ᖬ ${ship.cost_in_credits}</p>
                            <button class="button" value="${ship.name}">add to wishlist</button>
                            `
        collection.appendChild(newShip)

        const button = document.getElementsByClassName("button")

        for (let i = 0 ; i < button.length; i++) {
            button[i].addEventListener('click' , wishlist, false ) ; 
        }

        // tooltip()
    }

    function populateSelectForm(starship_class){

        const classSelect = document.getElementById('class-select')
        const option = document.createElement("option")

        option.innerText = starship_class
        option.className = "option"
        classSelect.appendChild(option)
        
    }

    function wishlist(e){

        const wishlist = document.getElementById("wishlist")  
        const wished = document.createElement('div')

        wished.innerHTML = `<li>${e.target.value}</li>`
        wishlist.appendChild(wished)
    }

    function filter(e){

        let result = []

        dataArray.forEach((ship) =>{

            if (ship.starship_class === e.target.value){
                result.push(ship)
            } else if (e.target.value === "Any Class"){
                result = dataArray
            }

        const collection = document.getElementById("ship-list")
        collection.innerHTML = ""
        
        })

        result.forEach(ship => handleShipData(ship))
    }

    function darkMode(){

        const body = document.body

        body.classList.toggle("dark-mode")
        
    }

    function budgetForm(e){
        
        let result = []

        const inputNum = parseInt(e.target.value)

        dataArray.filter((ship) => {

            const cost = parseInt(ship.cost_in_credits) 

            if (cost < inputNum){
                result.push(ship)
            } else if (e.target.value === ""){
                result = dataArray
            }

            const collection = document.getElementById("ship-list")
            collection.innerHTML = ""

        })
        console.log(result)
        result.forEach(ship => handleShipData(ship))
    }

    function hoverOn(){
        const hoverText = document.getElementById("hover-text")
        hoverText.innerHTML = "<p>Input Desired Maximum Budget</p>"
    }

    function hoverOff(){
        
        const hoverText = document.getElementById("hover-text")
        setTimeout(()=> {
            hoverText.innerHTML = "<p></p>"
        }, 3000)
    }

})

