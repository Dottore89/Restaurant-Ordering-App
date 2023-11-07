import {menuArray} from "/data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

// Order
const orderDiv = document.getElementById("order-div")
const innerOrderDiv = document.getElementById('inner-order-div')
const finalPriceEl = document.getElementById("final-price")
let orderArr = []

// Form
const cardDetailsForm = document.getElementById("card-details-form")
const formDiv = document.getElementById("form-div")
const cardDetailsDiv = document.getElementById("card-details-div")
const payBtn = document.getElementById("pay-btn")

// Customer
const formName = document.getElementById("form-name")
const formCard = document.getElementById("form-card")
const formCvv = document.getElementById("form-cvv")

let customerDiv = document.getElementById("customer-div")

// Create menu
function getMenu(){
    let menuHtml = ``
    
    menuArray.forEach( product => {
        menuHtml += `
    <div class="product-div">
        <img class="product-img" src="images/${product.image}">
        <div>
            <h3>${product.name}</h3>
            <span>${product.ingredients}</span>
            <h5>$${product.price}</h5>
        </div>
        <button class="product-btn" data-product="${product.id}">+</button>
    </div>
`
    })
    return menuHtml
}

// Render menu
function renderMenu(){
    document.getElementById('hero').innerHTML = getMenu()
}

renderMenu()

///////////////////////////////////////////////////

// Create order
function createOrder(productId){
    menuArray.forEach( (product) => {
        if(productId === product.id){
            orderArr.push({
                name: product.name,
                price: product.price,
                id: uuidv4()
            })
        }
    })
    getTotalPrice()
    renderOrder()
}

// Get price - render price
function getTotalPrice(){
    let sum = 0
    orderArr.forEach(function(product){
        sum += product.price
    })
     finalPriceEl.innerHTML = `
         <div id="total-price-div">
             <h3>Total price:</h3>
             <span id="total-price-span">$${sum}</span>
         </div>
     `
}

// Remove order item
function removeOrderItem(targetItemObj){
    orderArr.forEach(function(product, index){
        if(product.id === targetItemObj){
            orderArr.splice(index, 1)
        }
    })
    createOrder()
}

// Render order
function renderOrder(){
    let innerOrderHtml = ''
    
        orderArr.forEach(function(product){
            innerOrderHtml += `
            <div id="inner-order-style">
                <h3>${product.name}</h3>
                <span data-remove="${product.id}">REMOVE</span>
                <h4>$${product.price}</h4>
            </div>
        `
        })
        return innerOrderDiv.innerHTML = innerOrderHtml
}

// Event listeners
document.addEventListener('click', function(e){
    if(e.target.dataset.product){
        createOrder(e.target.dataset.product)
        orderDiv.style.display = "flex"
    }
    else if(e.target.dataset.order){
        formDiv.style.display = "flex"
    }
    else if(e.target.dataset.remove){
        removeOrderItem(e.target.dataset.remove)
        if(orderArr.length < 1){
            orderDiv.style.display = "none"
        }
    }
})

cardDetailsForm.addEventListener("submit", function(e){
    e.preventDefault()
})

// Render customer name - Hide "thanks"
payBtn.addEventListener("click", () => {
    if(formName.value, formCard.value, formCvv.value){
        function renderCustomerName(){
            orderArr = []
            customerDiv.innerHTML = `Thanks, ${formName.value}! Your order is on its way!`
            customerDiv.style.display = "block"
            formDiv.style.display = "none"
            orderDiv.style.display = "none"
    }
    renderCustomerName()
    setTimeout( () => {
        customerDiv.style.display = "none"
    }, 3000)
    }
})