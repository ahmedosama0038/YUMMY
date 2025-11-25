
// /////////////////////////////////////************/////////////////////////////////////////////
 const rowData = document.getElementById("rowData");
const searchContainer = document.getElementById("searchContainer");
const sidebar = document.getElementById("sidebar");
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const melaImge = document.getElementById("mela-imge");
const mealNama = document.getElementById("meal-nama");
const melaInstructions = document.getElementById("mela-Instructions");
const malaAree= document.getElementById("mala-aree");
const melaCotegory = document.getElementById("mela-cotegory");
const melaRecipes = document.getElementById("mela-Recipes");
const ingredentslist = document.getElementById("ingredents-list");
const maleTags = document.getElementById("male-tags");
const maleYoutube = document.getElementById("male-youtube");
const secicionsidebar = document.getElementById("sectionSerch");
const sourceLink = document.getElementById("male-source");
const linlSarch = document.getElementById("linlSarch");
const linkCatgreies = document.getElementById("linkCatgreies");
const sectionHome= document.getElementById("sectionHome");
const sectionCategories= document.getElementById("CategoriesSection");
const listCategoriesMeals= document.getElementById("listCategoriesMeals");
const serchName =document.getElementById("serchinputName");
const serchLetter =document.getElementById("serchinputLetter");
const liyrsectionSh =document.getElementById("liyrsection");
const linkArea =document.getElementById("linkArea");
const AreaSection =document.getElementById("AreaSection");
const IngredientsSection =document.getElementById("IngredientsSection");
const ContactsSection =document.getElementById("ContactsSection");
const nameContact =document.getElementById("nameContact");
const emailContact =document.getElementById("emailContact");
const phoneContact =document.getElementById("phoneContact");
const ageContact =document.getElementById("ageContact");
const passContact =document.getElementById("passContact");
const pass2Contact =document.getElementById("pass2Contact");
const btnContact =document.getElementById("btnContact");
const linkContact =document.getElementById("linkContact");




// /////////////////////////////////////************/////////////////////////////////////////////
// /////////////////////////////////////START-SIEDBAAR/////////////////////////////////////////////
let submitBtn;

$(document).ready(() => {
    searchByName("").then(() => {
        $(".spinner").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

// /////////////////////////////////////END-SIEDBAAR/////////////////////////////////////////////
// /////////////////////////////////////START-SEARCH/////////////////////////////////////////////

serchName.addEventListener("input" ,  ()=> {

let male =serchName.value
getresipesName(male)

})

serchLetter.addEventListener("input" ,  () =>{

  let maleLeteer = serchLetter.value.trim();
if (maleLeteer.length === 1) {
    getReispesLetter(maleLeteer)
}
})
 async function getresipesName(nama){

try {
 const reispes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nama}`)
 if( !reispes.ok){
   console.log(`HTTP error! status: ${reispes.status}`);
   return
}
 const data = await reispes.json()

if (data.meals) {
   diasplayData(data.meals)
}else{

 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });

}

  
} catch (error) {

  console.log("error :" , error);
}
    
  }
getresipesName( '')

async function getReispesLetter(letter){

  try {
    
const resipes = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)

if (!resipes.ok) {
  console.log(`HTTP error! status: ${resipes.status}`);
  return

}

 const data  =  await resipes.json();

if(data.meals){

 diasplayData(data.meals) ;

}else{


 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });
}


  } catch (error) {
    console.log("error : " , error);
    
    
  }
    
}

function diasplayData(arr){
 let cartona =""

 for (let i = 0; i < arr.length; i++) {
    
    cartona+=`
    
    
    
         <div class="col-md-3">
          <div class="image-wrrpr rounded">
           <img src="${arr[i].strMealThumb}" class="w-100"  alt="pasta">
         
          <div class="layr-imge text-black" onclick="dideils(${arr[i].idMeal})" id="liyrloop">
            <h3>${arr[i].strMeal}</h3>
        
          </div>
          </div>


         </div>

    
    
    `
 }
 document.getElementById("rowData").innerHTML=cartona;
 document.getElementById("rowDataHome").innerHTML = cartona;




}

 async function dideils(id){

try {

  const respins = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)  

 if(!respins.ok){
console.log(`HTTP error! status: ${respins.status}`);
return

}
const data = await respins.json()
if(data  ){

dideilsId(data)
}else{

 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });

}

  
} catch (error) {
  console.log("error :", error);
  
  
}
    
  }
getReispesLetter('')
// /////////////////////////////////////END-SEARCH/////////////////////////////////////////////
// //////////////////////////////////// STARTDITIELS-DATA ALL/////////////////////////////////////////////

function dideilsId(dataId){
  liyrsectionSh.classList.remove("d-none");
  sectionCategories.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  sectionHome.classList.add("d-none");
  AreaSection.classList.add("d-none");

  document.getElementById("rowData").innerHTML = "";
  document.getElementById("rowDataHome").innerHTML = "";
document.getElementById("rowCategories").innerHTML = "";
  document.getElementById("rowDataCategoriesMeals").innerHTML = "";

  
melaImge.src =  dataId.meals[0].strMealThumb;
mealNama.innerHTML=`${dataId.meals[0].strMeal}`
melaInstructions.innerHTML=`${dataId.meals[0].strInstructions}`
malaAree.innerHTML+=`${dataId.meals[0].strArea}`
melaCotegory.innerHTML+=`${dataId.meals[0].strCategory}`

ingredentslist.innerHTML = "";
let ingred = "";
for (let i = 1; i <= 20; i++) {
  let ingredient = dataId.meals[0][`strIngredient${i}`];
  let measure = dataId.meals[0][`strMeasure${i}`];
  if (ingredient && ingredient.trim() !== "") {
    ingred += `<li>${measure} ${ingredient}</li>`;
  }



ingredentslist.innerHTML= ingred;



sourceLink.href=`${dataId.meals[0].strSource}`
maleYoutube.href=`${dataId.meals[0].strYoutube}`
informationSerch()
}


}
linlSarch.addEventListener("click" , () => {

   showMaleSerch()
// informationCategoriesMeals()
  })
               
// /////////////////////////////////////END DITELS-DATA ALL/////////////////////////////////////////////

// /////////////////////////////////////STARY Categories/////////////////////////////////////////////


 async function getCategories(){

try {
  
 const  reispes = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)

 if(! reispes.ok){

console.log(`HTTP error! status: ${reispes.status}`);
return
  
  }

 const data = await reispes.json();

 if(data.categories){

 displayCategories(data.categories)

 }else{

 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });

 }



} catch (error) {

  console.log("error :" , error);
  
  
}

}

getCategories()

function displayCategories(arr){

  
  let cartona =""

  for (let i = 0; i < arr.length; i++) {
  
    cartona+=`
    
    
    
         <div class="col-md-3">
          <div class="image-wrrpr rounded">
           <img src="${arr[i].strCategoryThumb}" class="w-100"  alt="pasta">
         
          <div class="layr-imge text-black"     onclick="dideilsCategoriesId('${arr[i].strCategory}')" id="liyrloop">
            <h3>${arr[i].strCategory}</h3>
         <p>${arr[i].strCategoryDescription.split(" ").slice(0, 15).join(" ") + "..."}</p>


        
          </div>
          </div>


         </div>

    

    
    
    `



  }

     
  document.getElementById("rowCategories").innerHTML=cartona;
    

    }

 async function dideilsCategoriesId(  categoryName  ){

try {
  
 const respins = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)

if(!respins.ok){
  console.log(`HTTP error! status: ${respins.status}`);
  return
  }
 const data = await respins.json()

if(data.meals){
 displayCategoriesMeals(data.meals)

informationCategories()

}else{
   Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });
}


} catch (error) {

  console.log("error :" ,error);
  
}


}

function displayCategoriesMeals(arr){


  let cartona =""

  for (let i = 0; i < arr.length; i++) {
    cartona+=`
    
    

    
         <div class="col-md-3">
          <div class="image-wrrpr rounded">
           <img src="${arr[i].strMealThumb}" class="w-100"  alt="pasta">
         
          <div class="layr-imge text-black"     onclick="dideils('${arr[i].idMeal}')" id="liyrloop">
            <h3>${arr[i].strMeal}</h3>
        


        
          </div>
          </div>


         </div>


    
    
    
    `
}

document.getElementById("rowDataCategoriesMeals").innerHTML=cartona;

AreaSection.classList.add("d-none");
sectionCategories.classList.remove("d-none");
secicionsidebar.classList.add("d-none");
liyrsectionSh.classList.add("d-none");
sectionHome.classList.add("d-none");

}

   linkCatgreies.addEventListener("click" , () => {
    showCategories()

}) 

// /////////////////////////////////////END Categories/////////////////////////////////////////////

function informationSerch(){
  liyrsectionSh.classList.remove("d-none");
  secicionsidebar.classList.add("d-none");
  sectionHome.classList.add("d-none");
  sectionCategories.classList.add("d-none");
  AreaSection.classList.add("d-none");
  ContactsSection.classList.add("d-none");
  IngredientsSection.classList.add("d-none");
  

  }

function informationCategories(){
  listCategoriesMeals.classList.remove("d-none");
  sectionCategories.classList.add("d-none");
  AreaSection.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  sectionHome.classList.add("d-none");
  ContactsSection.classList.add("d-none");
  IngredientsSection.classList.add("d-none");

}

function showCategories(){
  sectionCategories.classList.remove("d-none");
   IngredientsSection.classList.add("d-none");
  liyrsectionSh.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  sectionHome.classList.add("d-none");
  AreaSection.classList.add("d-none");
  listCategoriesMeals.classList.add("d-none");
  ContactsSection.classList.add("d-none");
 


}

function showMaleSerch(){
  secicionsidebar.classList.remove("d-none");
  liyrsectionSh.classList.add("d-none");
  sectionHome.classList.add("d-none");
  sectionCategories.classList.add("d-none");
  IngredientsSection.classList.add("d-none");
  ContactsSection.classList.add("d-none");
  listCategoriesMeals.classList.add("d-none");
  
}

function showHome(){
  sectionHome.classList.remove("d-none");
  sectionCategories.classList.add("d-none");
  liyrsectionSh.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  AreaSection.classList.add("d-none");
  ContactsSection.classList.add("d-none");
  IngredientsSection.classList.add("d-none");
  listCategoriesMeals.classList.add("d-none");

}

showHome()

// /////////////////////////////////////END-categories/////////////////////////////////////////////
// /////////////////////////////////////START-AREA/////////////////////////////////////////////

 async function getArea(){

try {
  
 const res = await    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)

if (!res.ok){
console.log(`HTTP error! status: ${respins.status}`);
return
}

const data = await res.json()

if(data.meals ){
displayArea(data.meals)

}else{
 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });
}


} catch (error) {

  console.log("error: " , error);
  
  
}

}
getArea()

function displayArea(arr){
let cartona =""
for (let i = 0; i < arr.length; i++) {


  cartona+=`
  <div class="col-md-3 text-center">
    <div class="area-box" onclick="dideilsArea('${arr[i].strArea}')">
      <i class="fa-solid fa-house fs-6 display-1 p-5 text-white " id="iconn"></i>
    
       <h3 class="ms-5 text-white fw-bold">${arr[i].strArea}</h3>
    </div>
  </div>
    
  
`


}


document.getElementById("rowArea").innerHTML=cartona;



}

  async function dideilsArea( areaName  ){
try {
  
    const respins = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    if(!respins.ok){
      console.log(`HTTP error! status: ${respins.status}`);
      return

}
const data = await respins.json()

if(data.meals){   
 displayCategoriesMeals(data.meals)
  informationArea()
}else{

 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });

}


} catch (error) {

  console.log("error : ", error);
  
  
}


  }

linkArea.addEventListener("click" , () => {
  showArea()
// informationArea()
   })

  function informationArea(){
    liyrsectionSh.classList.add("d-none");
    secicionsidebar.classList.add("d-none");
    sectionHome.classList.add("d-none");
    sectionCategories.classList.add("d-none");
    AreaSection.classList.add("d-none");
   ContactsSection.classList.add("d-none");
    IngredientsSection.classList.add("d-none");
  listCategoriesMeals.classList.remove("d-none");

  }

function showArea(){

AreaSection.classList.remove("d-none");
  sectionCategories.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  liyrsectionSh.classList.add("d-none");
  sectionHome.classList.add("d-none");
  listCategoriesMeals.classList.add("d-none");
  IngredientsSection.classList.add("d-none");
  ContactsSection.classList.add("d-none");
  
}
// /////////////////////////////////////END-AREA/////////////////////////////////////////////

// /////////////////////////////////////START-IngredientsSection/////////////////////////////////////////////

  async function getIngredients(){

try {
  
 const res = await    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)

   if (!res.ok) {
console.log(`HTTP error! status: ${respins.status}`);
return

}


 const data = await res.json()
if(data.meals){

 displayIngredients(data.meals)

}else{

 Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });
}



} catch (error) {

  console.log("error:" , error);
  
  
}
 
  }
  
  getIngredients()
    


function displayIngredients(arr){
  let cartona =""

  for (let i = 0; i < arr.length && i < 20; i++) {

    cartona+=`
    
     <div class="col-md-3">
    <div class="Ingredients-item text-center p-3 fs-6 display-1 rounded shadow cursor-pointer" onclick="dideilsIngredients('${arr[i].strIngredient}')">
        
        <img src="image/001-chicken-leg.png" class="w-25 d-block mx-auto mb-2" id="icon" alt="chihin">

        <h3 class="text-white fw-bold">${arr[i].strIngredient}</h3>

        <p class="text-white text-center">
            ${arr[i].strDescription?.substring(0, 50) || ""}
        </p>

    </div>
</div>

    
    
    `

}

  document.getElementById("rowIngredients").innerHTML=cartona;

}

 async function dideilsIngredients( ingredientName  ){

 try {



    let respins = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    if(!respins.ok){

console.log(`HTTP error! status: ${respins.status}`);
return



}
 let data = await respins.json()

if (data.meals) {
      displayCategoriesMeals(data.meals)
  informationIngredients()
  liyrsectionSh.classList.add("d-none");
  
}else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No meals found with this ingredient!',
  });

     
  } 



  
 } catch (error) {
   console.log("error:" , error);
   
 }

    }

function showIngredients(){
  IngredientsSection.classList.remove("d-none");
  AreaSection.classList.add("d-none");
  sectionCategories.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  liyrsectionSh.classList.add("d-none");
  sectionHome.classList.add("d-none");
  ContactsSection.classList.add("d-none");
}
function informationIngredients(){
  liyrsectionSh.classList.remove("d-none");
  IngredientsSection.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  sectionHome.classList.add("d-none");
  sectionCategories.classList.add("d-none");
  AreaSection.classList.add("d-none");
  ContactsSection.classList.add("d-none");
  listCategoriesMeals.classList.remove("d-none");
}

  linkIngredients.addEventListener("click" , () => {
    showIngredients()
    
  // informationArea()
     })


// /////////////////////////////////////END-IngredientsSection/////////////////////////////////////////////
// /////////////////////////////////////START-ContactsSection/////////////////////////////////////////////

function usernameValid(){
  let regex = /^[A-Za-z][A-Za-z0-9._]{3,19}$/;
if( regex.test(nameContact.value.trim()) == true ){
 nameContact.classList.add("is-valid");
 nameContact.classList.remove("is-invalid");
  document.getElementById("convartName").classList.add("d-none");
   return true;

} else{
  nameContact.classList.add("is-invalid");
  nameContact.classList.remove("is-valid");
  document.getElementById("convartName").classList.remove( "d-none");
   return false;
 
}

}

function emailValid(){
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if( regex.test(emailContact.value.trim()) == true ){
 emailContact.classList.add("is-valid");
 emailContact.classList.remove("is-invalid");
  document.getElementById("convartEmail").classList.add("d-none");
   return true;
} else{
  emailContact.classList.add("is-invalid");
  emailContact.classList.remove("is-valid");
  document.getElementById("convartEmail").classList.remove( "d-none");
   return false;
   
   }
}

function phoneValid(){
  let regex = /^[0-9]{10}$/;
if( regex.test(phoneContact.value.trim()) == true ){
 phoneContact.classList.add("is-valid");
 phoneContact.classList.remove("is-invalid");
  document.getElementById("convartPhone").classList.add("d-none");
   return true;
}else{
  phoneContact.classList.add("is-invalid");
  phoneContact.classList.remove("is-valid");
  document.getElementById("convartPhone").classList.remove( "d-none");
   return false;
   }
}

function ageValid(){
  let regex = /^(1[89]|[2-9][0-9])$/;
if( regex.test(ageContact.value.trim()) == true ){
 ageContact.classList.add("is-valid");
 ageContact.classList.remove("is-invalid");
  document.getElementById("convartAge").classList.add("d-none");
   return true;
}else{
  ageContact.classList.add("is-invalid");
  ageContact.classList.remove("is-valid");
  return false;
   }
}

function passValid(){
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

if( regex.test(passContact.value.trim()) == true ){
 passContact.classList.add("is-valid");
 passContact.classList.remove("is-invalid");
  document.getElementById("convartpassword").classList.add("d-none");
   return true;
}else{
  passContact.classList.add("is-invalid");
  passContact.classList.remove("is-valid");
  document.getElementById("convartpassword").classList.remove( "d-none");
   return false;
   }
}

function pass2Valid(){
if( pass2Contact.value.trim() === passContact.value.trim() ){
 pass2Contact.classList.add("is-valid");
  pass2Contact.classList.remove("is-invalid");
  document.getElementById("convartRpassword").classList.add("d-none");
   return true;
}else{
  pass2Contact.classList.add("is-invalid");
  pass2Contact.classList.remove("is-valid");
  document.getElementById("convartRpassword").classList.remove( "d-none");
    return false;
    }
}

nameContact.addEventListener("input", function () {
  usernameValid();
});

emailContact.addEventListener("input", function () {
  emailValid();
});

phoneContact.addEventListener("input", function () {
  phoneValid();
});

ageContact.addEventListener("input", function () {
  ageValid();
});

passContact.addEventListener("input", function () {
  passValid();
});
pass2Contact.addEventListener("input", function () {
  pass2Valid();
});

function validateForm() {
  if (usernameValid() && emailValid() && phoneValid() &&  ageValid() &&  passValid()  && pass2Valid()== true) {
    btnContact.classList.remove("disabled");
    btnContact.removeAttribute("disabled");
    return true;
  } else {
    btnContact.classList.add("disabled", "true");
    btnContact.setAttribute("disabled", "true");
    return false;
  }
}


nameContact.addEventListener("input", validateForm);
emailContact.addEventListener("input", validateForm);
phoneContact.addEventListener("input", validateForm);
ageContact.addEventListener("input", validateForm);
passContact.addEventListener("input", validateForm);
pass2Contact.addEventListener("input", validateForm);

 btnContact.addEventListener("click", function (e) {
  e.preventDefault();
 if (validateForm()== true) {
  Swal.fire({
  title: 'Welcome!',
  text: 'Welcome to my personal project, young man 😎',
  icon: 'success',
  confirmButtonText: 'OK'
});

 }
});

linkContact.addEventListener("click" , () => {
  showContacts()
// informationArea()
   }
    );


function showContacts(){
  ContactsSection.classList.remove("d-none");
  AreaSection.classList.add("d-none");
  sectionCategories.classList.add("d-none");
  secicionsidebar.classList.add("d-none");
  liyrsectionSh.classList.add("d-none");
  sectionHome.classList.add("d-none");
  listCategoriesMeals.classList.add("d-none");
  IngredientsSection.classList.add("d-none");
  

}
// /////////////////////////////////////end-ContactsSection/////////////////////////////////////////////
   




















































   