const phoneLoad = async(phoneName, dataLimit) => {
    const phoneUrlLink = `https://openapi.programming-hero.com/api/phones?search=${phoneName}`
    const res = await fetch(phoneUrlLink);
    const phoneData = await res.json();
    displayPhoneData(phoneData.data, dataLimit)
}

const displayPhoneData = (phoneData, dataLimit) => {
    const parentIdTarget = document.getElementById('parentTag');
    parentIdTarget.textContent = '';

    /* 10 Phone Result Show Code */
    const viewAll = document.getElementById('viewAll');
    if(dataLimit && phoneData.length > 10){
        phoneData = phoneData.slice(0,10)
        viewAll.classList.remove('d-none')
    }
    else{
        viewAll.classList.add('d-none')
    }
    
    /* Not Found Phone Code */
    const noPhoneMessageId = document.getElementById('no-phone-found')
    if(phoneData.length === 0){
        noPhoneMessageId.classList.remove('d-none')
    }
    else{
        noPhoneMessageId.classList.add('d-none')
    }

    for(const phone of phoneData){
        console.log(phone)
        const createDivTag = document.createElement('div');
        createDivTag.classList.add('col')
        createDivTag.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p>
            <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
        </div>
        `
        parentIdTarget.appendChild(createDivTag);
    }
    /* stop loading spinner */
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchInputText = document.getElementById('inputFlied');
    const inputTextValue = searchInputText.value;
    phoneLoad(inputTextValue, dataLimit);
}
document.getElementById('btnSearch').addEventListener('click', function(){
    // toggleSpinner(true);
    // const searchInputText = document.getElementById('inputFlied');
    // const inputTextValue = searchInputText.value;
    // phoneLoad(inputTextValue);
    processSearch(10);
})
document.getElementById('inputFlied').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        processSearch(10);
    }
})

document.getElementById('viewAll').addEventListener('click', function(){
    processSearch();
})

const toggleSpinner = (isLoading) =>{
    const loadSectionId = document.getElementById('loading-spinner')
    if(isLoading){
        loadSectionId.classList.remove('d-none');
    }
    else{
        loadSectionId.classList.add('d-none')
    }
}

const loadPhoneDetails = async id => {
    const urlLink = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(urlLink);
    const data = await res.json();
    modalDocument(data.data)
}

const modalDocument = (data) => {
    console.log(data)
    const title = document.getElementById('brand');
    title.innerText = data.brand;

    const Display = document.getElementById('display');
    Display.innerText = data.mainFeatures.displaySize

    const release = document.getElementById('release');
    release.innerText = data.releaseDate

    const storage = document.getElementById('storage');
    storage.innerText = data.mainFeatures.memory

    const processor = document.getElementById('processor');
    processor.innerText = data.mainFeatures.chipSet

    const bluetooth = document.getElementById('bluetooth');
    bluetooth.innerText = data.others.Bluetooth

    const others = document.getElementById('others');
    others.innerText = data.others.GPS, data.others.NFC, data.others.Radio, data.others.USB
}