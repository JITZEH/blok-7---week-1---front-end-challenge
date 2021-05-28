var cart = {
    pizzaprice: 0,
    factor: 0,
    toppingprice: 0
};
const pizzas = [{
        name: 'Margherita',
        price: 850,
        img: 'margherita.png'
    },
    {
        name: 'Marinara',
        price: 750,
        img: 'marinara.png'
    },
    {
        name: 'Quattro Formaggi',
        price: 850,
        img: 'quattro-formaggi.png'
    },
    {
        name: 'Vegetariana',
        price: 1140,
        img: 'vegetariana.png'
    },
    {
        name: 'Quattro Stagioni',
        price: 1100,
        img: 'quattro-stagioni.png'
    },
    {
        name: 'pannekoek',
        price: 750,
        img: 'pannekoek.png'
    }
];

const sizes = [{
        size: 'small',
        factor: 0.6,
        img: 'small.png',
    },
    {
        size: 'kinder',
        factor: 0.8,
        img: 'kinder.png'
    },
    {
        size: 'normal',
        factor: 1,
        img: 'normal.png'
    },
    {
        size: 'medium',
        factor: 1.2,
        img: 'medium.png'
    },
    {
        size: 'large',
        factor: 1.4,
        img: 'large.png'
    },
    {
        size: 'kingsize',
        factor: 2,
        img: 'kingsize.png'
    }
]

const toppings = [{
        topping: 'salami',
        toppingprice: 50,
        img: 'salami.png'
    },
    {
        topping: 'champignons',
        toppingprice: 100,
        img: 'champignons.png'
    },
    {
        topping: 'ananas',
        toppingprice: 125,
        img: 'ananas.png'
    },
    {
        topping: 'ham',
        toppingprice: 60,
        img: 'ham.png'
    },
    {
        topping: 'kaas',
        toppingprice: 25,
        img: 'kaas.png'
    },
    {
        topping: 'none',
        toppingprice: 0,
        img: 'none.png'
    }
]
const cardsPizzas = document.getElementById("pizzas");
const cardsSizes = document.getElementById("sizes");
const cardsToppings = document.getElementById("toppings");
const templateDiv = document.getElementById("template");
const imgDiv = document.getElementsByClassName("card-img-top")[0];
const textDiv = document.getElementsByClassName("card-text")[0];
const priceDiv = document.getElementsByClassName("price")[0];
const cardDiv = document.getElementsByClassName("card")[0];
const shopImg = document.getElementById("shopimg");
const shopName = document.getElementById("shopname");
const shopTopping = document.getElementById("shoptopping");
const shopPrice = document.getElementById("shopprice");
const shoppingCart = document.getElementById("shoppingcart");
const betaalMetPin = document.getElementById("betaalmetpin");
const thuisBezorgd = document.getElementById("thuisbezorgd");
const totalPrice = document.getElementById("totalprice");
const nextPageButton = document.getElementById("nextpage");
const openSC = document.getElementById("openSC");
const openSCimg = document.getElementById("openSCimg");
const sizeSC = document.getElementById("sizeSC");
const toppingSC = document.getElementById("toppingSC");
const templateSC = document.getElementById("templateSC");
const exitSC = document.getElementById("exitSC");
const newPizzaButton = document.getElementById("newPizza");
var brutoPrice;
var totalPriceCalc;
var colorOfCard;
const arrayGenerator = [{
        group: cardsPizzas,
        array: pizzas,
        color: 'cardsalmon'
    },
    {
        group: cardsSizes,
        array: sizes,
        color: 'cardblue'
    },
    {
        group: cardsToppings,
        array: toppings,
        color: 'cardyellow'
    }
];

var currentArrayIndex = 0;

for (let pos = 0; pos < arrayGenerator.length; pos++) {
    colorOfCard = arrayGenerator[pos].color;
    arrayGenerator[pos].array.forEach(object => {
        createCards(object, pos)
    });
}


showCardGroup();
nextPageButton.addEventListener('click', showCardGroup);

function showCardGroup() {
    if (currentArrayIndex > 0) {
        arrayGenerator[currentArrayIndex].group.classList.remove('hidden');
        arrayGenerator[currentArrayIndex - 1].group.classList.add('hidden');
    }
    currentArrayIndex++;
    if (currentArrayIndex == arrayGenerator.length) {
        openSC.classList.remove("hidden");
        nextPageButton.classList.add("hidden");
        openSC.addEventListener('click', showShoppingCart);

    }
}
openSCimg.addEventListener('click', showShoppingCart);

function showShoppingCart() {
    shoppingCart.classList.remove("hidden");
    addItemToCart();
    totalPriceCalc = parseInt(brutoPrice);
    totalPrice.innerHTML =  priceCalc(totalPriceCalc);
}

exitSC.addEventListener('click', hideShoppingCart);

function hideShoppingCart() {
    shoppingCart.classList.add("hidden");
}
/**
 * create cardelelements in hte HTML with product information
 *
 * @param {object} object - name, price/factor, image/size
 * @param {number} pos - index in arrayGenerator
*/
function createCards(object, pos) {
    cardDiv.classList.add(colorOfCard);
    textDiv.innerHTML = object.name || object.size || object.topping;
    priceDiv.innerHTML = priceCalc(object.price || object.toppingprice);
    if (object.factor != undefined){
        priceDiv.innerHTML = "pizza x"+object.factor;
    }
    imgDiv.src = 'img/' + object.img;

    const newTemplate = templateDiv.cloneNode(true);
    newTemplate.classList.remove("hidden");

    var cardGroup = arrayGenerator[pos].group;
    cardGroup.appendChild(newTemplate);

    let addButton = newTemplate.getElementsByClassName('addButton')[0];
    addButton.addEventListener('click', addtoCartButton);
    if (object.name != undefined) {
        addButton.dataset.pizzaPrice = parseInt(object.price);
    } else if (object.size != undefined) {
        addButton.dataset.pizzaFactor = parseInt(object.factor);
    } else if (object.topping != undefined) {
        addButton.dataset.toppingPrice = parseInt(object.toppingprice);
    }
}

function addtoCartButton() {
    if (this.dataset.pizzaPrice != undefined) {
        cart.pizzaprice = this.dataset.pizzaPrice;
    } else if (this.dataset.pizzaFactor != undefined) {
        cart.factor = this.dataset.pizzaFactor;
    } else if (this.dataset.toppingPrice != undefined) {
        cart.toppingprice = this.dataset.toppingPrice;
    }
}

function addItemToCart() {
    
    brutoPrice = (parseInt(cart.pizzaprice)*parseInt(cart.factor)) + parseInt(cart.toppingprice) ;
    shopPrice.innerHTML = priceCalc(brutoPrice);
    
    let newTemplateSC = document.getElementById('templateSC').cloneNode(true);
    document.getElementById('templateSC').classList.add("hidden");
    document.getElementById('SCelements').appendChild(newTemplateSC);
}

function betaalMetPinFunc (){
    if (betaalMetPin.checked == true){
        totalPriceCalc = parseInt(brutoPrice) - 200;
        totalPrice.innerHTML =  priceCalc(totalPriceCalc);
    } else {
        totalPriceCalc = parseInt(brutoPrice);
        totalPrice.innerHTML =  priceCalc(totalPriceCalc);
    }
    
}
function thuisbezorgdFunc() {
    if (thuisBezorgd.checked == true){
        totalPriceCalc = parseInt(brutoPrice) + 200;
        totalPrice.innerHTML =  priceCalc(totalPriceCalc);
    } else {
        totalPriceCalc = parseInt(brutoPrice);
        totalPrice.innerHTML =  priceCalc(totalPriceCalc);
    }
}
/**
 * 
 * creates a beautiful price with € and rounds it off
 * @param {number} price - number
 * @return {string} €+price rounds it off
 *
 */

 
function priceCalc(price) {
    return "€" + (price / 100).toFixed(2);
}

newPizzaButton.addEventListener('click', createANewPizza);

function createANewPizza() {
    arrayGenerator[currentArrayIndex - 1].group.classList.add('hidden');
    currentArrayIndex = 0;
    arrayGenerator[currentArrayIndex].group.classList.remove('hidden');
    currentArrayIndex = 1;
    openSC.classList.add("hidden");
    nextPageButton.classList.remove("hidden");
    openSC.addEventListener('click', showShoppingCart);

}