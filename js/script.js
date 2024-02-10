let rowData = document.getElementById("rowData");
let searchSection = document.getElementById("searchSection");
function openNavSide() {
  $(".nav-menu").animate({ left: 0 }, 500);
  $(".icon-open").removeClass("fa-align-justify").addClass("fa-x");

  for (let i = 0; i < 5; i++) {
    $(".nav-link li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}

function closeNavSide() {
  $(".nav-menu").animate({ left: -257 }, 500);
  $(".icon-open").addClass("fa-align-justify").removeClass("fa-x");

  $(".nav-link li").animate({ top: 300 }, 500);
}
closeNavSide();
$(".nav-menu i.icon-open").click(() => {
  if ($(".nav-menu").css("left") == "0px") {
    closeNavSide();
  } else {
    openNavSide();
  }
});

async function addMeal(any) {
  
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${any}`);
  response = await response.json();
  displayMeal(response.meals)
}
function displayMeal(arr) {
  
  let cartona = ``;

  for (let i = 0; i < arr.length; i++) {
    cartona += `
        <div class="col-md-3 mt-5">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-3 cursor-pointer">
                  <img src="${arr[i].strMealThumb}" alt="" class="w-100" />
                  <div
                    class="layer position-absolute d-flex  align-items-center p-2">
                    <h3 class="text-black">${arr[i].strMeal}</h3>
                  </div>
                </div>
        </div>
        `;
  }
  rowData.innerHTML = cartona;
}
addMeal("");

async function getCategory() {
  searchSection.innerHTML = " ";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  response = await response.json();
  displayCategories(response.categories)
}
function displayCategories(arr) {
  let cartona = ``;

  for (let i = 0; i < arr.length; i++) {
    cartona += `
            <div class="col-md-3 mt-5 ">
                    <div onclick="getCategoriesMeals('${arr[i].strCategory}')" class="meal  position-relative overflow-hidden rounded-3 cursor-pointer ">
                      <img src="${arr[i].strCategoryThumb
      }" alt="" class="w-100" />
                      <div
                        class="layer position-absolute text-center p-2">
                        <h3 class="text-black">${arr[i].strCategory}</h3>
                        <p class="text-black">${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")
      }</p>
                      </div>
                    </div>
            </div>
            `;
  }
  rowData.innerHTML = cartona;

}

async function getArea() {
  searchSection.innerHTML = " ";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  response = await response.json();

  displayArea(response.meals)
}

function displayArea(arr) {

  let cartona = ``;
  for (let i = 0; i < arr.length; i++) {
    cartona += `<div class="col-md-3 gy-4 ">
    <div onclick="getAreaMeals('${arr[i].strArea}')" class="get  text-white text-center cursor-pointer ">
      <i class="fa-solid fa-house-laptop fa-4x"></i>
      <h3>${arr[i].strArea}</h3>
      </div>
    </div>`

  }
  rowData.innerHTML = cartona
}

async function getingrediants() {
  searchSection.innerHTML = " ";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  response = await response.json();

  displayIngrediant(response.meals.slice(0, 20))
}
function displayIngrediant(arr) {
  let cartona = '';
  for (let i = 0; i < arr.length; i++) {

    cartona += `
      <div class="col-md-3 gy-3">
          <div onclick="getIngrediantsMeals('${arr[i].strIngredient}')" class="get text-white text-center cursor-pointer ">
            <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${arr[i].strIngredient}</h3>
            <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
          </div>
        </div>

      `
  }
  rowData.innerHTML = cartona
}

async function getCategoriesMeals(category) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  response = await response.json();

  displayMeal(response.meals.slice(0, 20))

}
async function getAreaMeals(area) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  response = await response.json();

  displayMeal(response.meals)
}
async function getIngrediantsMeals(ingrediant) {
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediant}`)
  response = await response.json();

  displayMeal(response.meals)
}
async function getMealDetails(mealID) {
  searchSection.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  response = await response.json();

  displayMealDetails(response.meals[0])
}
function displayMealDetails(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {

    if (meal[`strIngredient${i}`]) {
      ingredients += `       <li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
    }
  }
  let tags = meal.strTags.split(",");
  if(!tags) tags = [];
  let tagsStr = ` `;
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class="alert alert-info m-2 p-1">${tags[i]}</li>`
  }
  let cartona = `
<div class="col-md-4 mt-5">
          <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
          <h2>Brown Stew Chicken</h2>
        </div>
        <div class="col-md-8 mt-5">
          <h2>Instructions</h2>
          <p>${meal.strInstructions}</p>
          <h3><span class="fw-bolder">Area : </span> ${meal.strArea}</h3>
          <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
          <h3>Recipes : </h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap">
           ${ingredients}
          </ul>
          <h3>Tags : </h3>

          <ul class="list-unstyled d-flex g-3 flex-wrap">
           ${tagsStr}
          </ul>

          <a target="_blank"  href="${meal.strSource}" class="btn btn-success">Source</a>
          <a target="_blank"  href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>

        </div>`
  rowData.innerHTML = cartona;
}
function searchInput(){

searchSection.innerHTML = `
<div class="row py-4">
<div class="col-md-6">
  <input onkeyup="searchByName(this.value)"
    type="text" class="form-control text-white bg-transparent" placeholder="Search By Name"
  />
</div>
<div class="col-md-6">
  <input onkeyup="searchByFirstLitter(this.value)" maxlength="1"
    type="text"
    class="form-control bg-transparent text-white "placeholder="Search By First Litter"/>
</div>
</div>`;
rowData.innerHTML = " ";
}

async function searchByName(term){
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
response = await response.json();
response.meals ? displayMeal(response.meals) : displayMeal([ ]);
}
async function searchByFirstLitter(litter){
  litter == " "? litter = "a" : " ";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`)
response = await response.json();
response.meals ? displayMeal(response.meals) : displayMeal([ ]);
}

function getContact() {
  rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
  <div class="container w-75 text-center">
      <div class="row g-4">
          <div class="col-md-6">
              <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Special characters and numbers not allowed
              </div>
          </div>
          <div class="col-md-6">
              <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Email not valid *exemple@yyy.zzz
              </div>
          </div>
          <div class="col-md-6">
              <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid Phone Number
              </div>
          </div>
          <div class="col-md-6">
              <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid age
              </div>
          </div>
          <div class="col-md-6">
              <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid password *Minimum eight characters, at least one letter and one number:*
              </div>
          </div>
          <div class="col-md-6">
              <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                  Enter valid repassword 
              </div>
          </div>
      </div>
      <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
  </div>
</div> `
  submitBtn = document.getElementById("submitBtn")


  document.getElementById("nameInput").addEventListener("focus", () => {
      nameInputTouched = true
  })

  document.getElementById("emailInput").addEventListener("focus", () => {
      emailInputTouched = true
  })

  document.getElementById("phoneInput").addEventListener("focus", () => {
      phoneInputTouched = true
  })

  document.getElementById("ageInput").addEventListener("focus", () => {
      ageInputTouched = true
  })

  document.getElementById("passwordInput").addEventListener("focus", () => {
      passwordInputTouched = true
  })

  document.getElementById("repasswordInput").addEventListener("focus", () => {
      repasswordInputTouched = true
  })
}
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}