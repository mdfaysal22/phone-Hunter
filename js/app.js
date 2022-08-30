const loadPhone = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
}


// Fatch Phone Details Data.....
const phoneDetails = async(id) => {
    const phoneDetailsURL = `https://openapi.programming-hero.com/api/phone/${id}`;
    const resDetails = await fetch(phoneDetailsURL);
    const getDetails = await resDetails.json();
    loadPhoneDetails(getDetails.data);
}

const loadPhoneDetails = (detailsData) => {
    const detailsContainer = document.getElementById('Phone-Details');
    const phoneName = detailsData.name;
    const storage = detailsData.mainFeatures.storage;
    const displaySize = detailsData.mainFeatures.displaySize;
    const chipSet = detailsData.mainFeatures.chipSet;
    const memory = detailsData.mainFeatures.memory;
    const releaseDate = detailsData.releaseDate;
    const detailsmodal = document.createElement('div');
    detailsmodal.innerHTML = `
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title bold" id="staticBackdropLabel">${phoneName}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Storage: ${storage}</p>
                    <p>Display: ${displaySize}</p>
                    <p>ChipSet: ${chipSet}</p>
                    <p>Memory: ${memory}</p>
                    <p>Release Date: ${releaseDate ? releaseDate : "No Release Data"}</p>
                </div>
                <div class="modal-footer">
                <button id="clearBtn" type="button" class="btn btn-danger"  data-bs-dismiss="modal">Clear Data</button>
            </div>
        </div>
     </div>
    `
    detailsContainer.appendChild(detailsmodal);
    document.getElementById('clearBtn').addEventListener('click', function(){
        detailsContainer.innerHTML = "";
    })
     
}

const displayPhone = (phones, dataLimit) => {
   const cardContainer = document.getElementById('card-container');
    //Empty Container....      
   cardContainer.innerText = '';
   // Onliy Display 20 Phone.....
   
   const showAllBtn = document.getElementById('show-all');
   if(dataLimit && phones.length > 18){
        phones = phones.slice(0, 18);
        showAllBtn.classList.remove('d-none');
   }else{
        showAllBtn.classList.add('d-none')
   }
    //No Phone Found.....
    const noPhone = document.getElementById('no-phone');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');

    } else{
        noPhone.classList.add('d-none');
    }  
    
   phones.forEach(phone => {
    const cardBody = document.createElement('div');
    
    cardBody.classList.add('col');
    cardBody.innerHTML = `
        <div class="card">
                <img src="${phone.image}" class="card-img-top img-small" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div class="text-center">
                    <button id="${phone.slug}" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
    `;
    cardContainer.appendChild(cardBody);


    // Phone Details Click Handler here......
    document.getElementById(`${phone.slug}`).addEventListener('click', function(){
        phoneDetails(phone.slug);
        })
   });
   

   loader(false);
    
}
const inputField = document.getElementById('input-field');
const loadData = (dataLimit) => {
    // click Loader Add 
    loader(true);
    
    const getInputValue = inputField.value;
    loadPhone(getInputValue, dataLimit);
    
}
document.getElementById('show-all-btn').addEventListener('click', function(){
    loadData()
    inputField.value = "";
})

document.getElementById('search-btn').addEventListener('click', function(){
    loadData(18);
})
document.getElementById('input-field').addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        loadData(18);
    }
    
})




// Loader Function
const loader = (isLoad) => {
    const loaderSection  = document.getElementById('loarder-section');
    if(isLoad){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}




