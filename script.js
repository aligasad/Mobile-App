const mobileAPI_URL = "https://openapi.programming-hero.com/api/phones?search=";
const mobileContainer = document.querySelector("#mobileContainer");

window.addEventListener("load", async () => {
  const data = await getDataFromURL(mobileAPI_URL + "apple");
  displayCard(data);
});

async function searchMobiles(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const { query } = Object.fromEntries(formData.entries()); // input ke text ko query me store kra lega
  const data = await getDataFromURL(mobileAPI_URL + query);
  displayCard(data);
}

async function getDataFromURL(url) {
  const response = await fetch(url);
  let result = await response.json();
  result = result.data;
  return result;
}

function displayCard(data) {
  mobileContainer.innerHTML = "";
  const fragment = document.createDocumentFragment();
  console.log(data);
  data.forEach((obj) => {
    const card = document.createElement("div");
    card.className = "card";
    const pImage = document.createElement("img");
    pImage.src = obj.image;
    pImage.className = "img";
    const pName = document.createElement("h3");
    pName.innerText = obj.phone_name;

    const details = document.createElement("p");
    details.innerText =
      "There are many variations of passages of available, but the majority have suffered";

    const showDetails = document.createElement("button");
    showDetails.className = "button";
    showDetails.innerText = "SHOW DETAILS";

    showDetails.addEventListener("click", () =>
      showDetail(obj.image, obj.phone_name, obj.brand)
    );
    card.append(pImage, pName, details, showDetails);
    fragment.append(card);
  });
  mobileContainer.append(fragment);
}

function showDetail(img, name, brand) {
  toggleDetail();
  let detailImg = document.getElementById("detailImg");
  let detailTitle = document.getElementById("detailTitle");
  let detailBrand = document.getElementById("detailBrand");
  detailBrand.style.cssText = "font-weight: 400;"
  detailImg.src = img;
  detailTitle.innerHTML = name;
  detailBrand.innerHTML = brand;
}

let isOpen = false;
let detailDiv = document.querySelector(".detalsDiv");
function toggleDetail() {
  if (!isOpen) {
    detailDiv.style.display = "grid";
  } else {
    detailDiv.style.display = "none";
  }
  isOpen = !isOpen;
}
