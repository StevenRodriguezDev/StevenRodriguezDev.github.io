// global variables
let employees = [];
const urlAPI = 
`https://randomuser.me/api/?results=12&inc=name, picture,
email, location,street,phone,dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const search = document.querySelector('#search');
const cards = document.querySelectorAll('.card');
const prevArrow = document.querySelector('.prev');
const nextArrow = document.querySelector('.next');
let modalIndex;



//fetch data from api
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';

    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    // template literals make this so much cleaner!
    employeeHTML += `
    <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
        </div>
    </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal(index){
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);
  
    const modalHTML=`
        <img class="avatar" src="${picture.large}"/>
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr>
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${city} ${state} ${postcode}</p>
            <p>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    // modalIndex = index;
}

gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
        // select the card element based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index)   
    }
});

/*close modal */

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden')

});

// overlay.addEventListener('click', () => {
//     overlay.classList.add('hidden')
// });

/* arrows */


prevArrow.addEventListener('click', (e) => {
        if (modalIndex > 0) {
            modalIndex--;
            displayModal(modalIndex);
        } else {
            modalIndex = 11;
            displayModal(modalIndex);
        }
    });

nextArrow.addEventListener('click', (e) =>{
    if(modalIndex < 11){
        modalIndex ++;
        displayModal(modalIndex)
    } else { 
        modalIndex = 0;
        displayModal(modalIndex);
    } 
});

// search bar

const searchHandler = event => {
    const cardName = document.querySelectorAll('h2.name');
    const searchTerm = event.target.value.toLowerCase();

    cardName.forEach( cardName => {
        const cardText = cardName.textContent.toLowerCase();
        const card = cardName.parentElement.parentElement;

        if (cardText.includes(searchTerm)) {
            card.style.display = "";
        } else {
            card.style.display ="none";
        }
    });
}
search.addEventListener('keyup', searchHandler);

