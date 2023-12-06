import { menuArray } from "./data.js";


let totalPrice = 0
let shoppingCart = []

document.addEventListener('click',function(e){
    if(e.target.dataset.preorder){
        displayOrder(e.target.dataset.preorder)
    } else if(e.target.id === 'confirmButton'){
        displayForm()
    } else if(e.target.dataset.removefood){
        removeMeals(e.target.dataset.removefood)
    }
})

// Render the whole menu list
function menuList(){
    let menuHtml = ``

    menuArray.forEach(function(food){
        menuHtml += `
        <div class='menu-items'>
            <img src="${food.image}" >
            <div class="menu-items-details">
                <h3>${food.name}</h3>
                <p>${food.ingredients}</p>
                <p class='bold'>$${food.price}</p>
            </div>
            <button data-preorder="${food.id}">+</button>
        </div>
        `
    })

    return menuHtml
}

function render(){
    document.getElementById('menu').innerHTML = menuList()
}

render()

// To remove items from order
function removeMeals(removeId){
    let displayOrderObj = menuArray.filter(function(meal){
        return removeId == meal.id
    })[0]
    const itemIndex = shoppingCart.indexOf(displayOrderObj)
    shoppingCart.splice(itemIndex,1)
    totalPrice -= displayOrderObj.price
    shoppingCartDisplay()
    shoppingCartPrice()
    if(totalPrice == 0){
        document.getElementById('checkoutSection').classList.add('hidden')
    }
}

// To display the items order
function shoppingCartDisplay(){
    let shoppingCartHtml = ``
    shoppingCart.forEach(function(pieces){
        shoppingCartHtml += `
            <div>
                <div class="body">
                    <div class='bodyContent'>
                        <p>${pieces.name}</p>
                        <button id='remove' data-removefood='${pieces.id}'>remove</button>
                    </div>  
                    <p>$${pieces.price}</p>
                </div>
            </div>`
    })
    document.getElementById('checkout').innerHTML = shoppingCartHtml
}

// To show the total price of the order
function shoppingCartPrice(){
    let shoppingCartPriceHtml = ``
    shoppingCartPriceHtml = `
        <div>
            <div class='bodyPrice'>
                <p>Total Price</p>
                <p>${totalPrice}</p>
            </div>
            <button class="confirm" id="confirmButton">Confirm Order</button>
        </div>
        `
    document.getElementById('checkoutPrice').innerHTML = shoppingCartPriceHtml
}

// To display the full checkout including your items and price
function displayOrder(foodId){
    let displayOrderObj = menuArray.filter(function(meal){
        return foodId == meal.id
    })[0]
    shoppingCart.push(displayOrderObj)
    totalPrice += displayOrderObj.price
    shoppingCartDisplay()
    shoppingCartPrice()
    document.getElementById('checkoutSection').classList.remove('hidden')

}

// To render the form after confirming your order for payment
function displayForm(){
    document.getElementById('consentForm').classList.remove('hide')
}

// Form to fill in card details and other informations
document.getElementById('consentForm').addEventListener('submit',function(e){
    e.preventDefault()
    const consentFormInfo = new FormData(document.getElementById('consentForm'))
    const fullName = consentFormInfo.get('name')

    document.getElementById('consentForm').classList.add('hide')
    document.getElementById('checkoutSection').innerHTML = `
        <div class='confirmText'><h1>Thank you ${fullName}, your order is on its way</h1></div>
    `
})



