

const mobileAPI_URL = "https://openapi.programming-hero.com/api/phones?search=";
const mobileContainer = document.querySelector("#mobileContainer");

window.addEventListener('load', async ()=>{
  const data = await getDataFromURL(mobileAPI_URL + "apple");
  displayCard(data); 
})

async function searchMobiles(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const {query } = Object.fromEntries(formData.entries());
  const data = await getDataFromURL(mobileAPI_URL + query);

  
  displayCard(data); 
}


async function getDataFromURL(url){
  const response = await fetch(url);
  let result = await response.json();
  result =result.data;
  // console.log(result);
  return result;
}

function displayCard(data){
  mobileContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  data.forEach((obj)=>{
    const card = document.createElement('div');
    card.className = "card";
    const pImage = document.createElement('img');
    pImage.src = obj.image;
    pImage.className = "img";
    const pName = document.createElement('h3');
    pName.innerText = obj.phone_name;
  
    const details = document.createElement('p');
    details.innerText = "There are many variations of passages of available, but the majority have suffered";


    const showDetails = document.createElement('button');
    showDetails.innerText = "SHOW DETAILS"
  
    card.append(pImage, pName, details, showDetails);
    fragment.append(card);
  });
  mobileContainer.append(fragment);
}
