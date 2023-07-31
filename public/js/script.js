let ingredientlist = document.querySelector('.ingredientList')
let addbtn = document.getElementById("addIngredientbtn")
let ingredDiv  = document.querySelectorAll('.ingredientdiv')[0]
let harmbuggermenu = document.querySelector('.fa-bars')
let responsivenav = document.querySelector('.responsivenav');

addbtn.addEventListener('click',()=>{
    let newingredient = ingredDiv.cloneNode(true);
    let input = newingredient.getElementByTagName('input')[0]
    input.value = '';
    ingredientlist.appendChild(newingredient)
})


harmbuggermenu.addEventListener('click',()=>{
    alert('Button clicked')
})