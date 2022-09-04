const loadCategories = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`
  const res = await fetch(url);
  const data = await res.json();
  displayCategories(data.data.news_category);
}

const displayCategories = (news) => {
  const categories = document.getElementById('categories');
  news.forEach(news => {
    console.log(news)
    const creatDiv = document.createElement('div');
    creatDiv.innerHTML = `
        <a href="#" class = "text-decoration-none text-secondary " onclick = "loadNews(${news.category_id})" ><h6>${news.category_name}</h6></a>
        `;
    categories.appendChild(creatDiv);
  });

}

const loadNews = (category_id) => {
  const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
  console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data))
  toggleSpinner(true);
}
const displayNewsDetails = (data) => {
  const newsDis = document.getElementById('displayNews');
  newsDis.textContent = '';
  data.forEach(data => {
    console.log(data._id)
    const creatDiv = document.createElement('div');
    creatDiv.classList.add('card');
    creatDiv.classList.add('my-4');
    creatDiv.classList.add('shadow');

    creatDiv.innerHTML = `
    <div class="row g-0" >
    <div class="col-md-3">
      <img src="${data.thumbnail_url}" class="img-fluid rounded-start p-3" alt="...">
    </div>
    <div class="col-md-9">
      <div class="card-body">
          <h5 class="card-title fw-bold fs-3">${data.title}</h5>
          <p class="card-text">${data.details.slice(0, 300)}</p>
          <p class="card-text">${data.details.slice(0, 200)}....</p>
        </div>  
       <div class="row">
        <div class="col-md-4 pt-5">
          <img class = "rounded-circle autImg" src="${data.author.img}">
          <p class="d-inline">${data.author.name ? data.author.name : 'No Data Available'}</p>
          <p></p>
        </div>
        <div class="col-md-8 pt-5 d-flex justify-content-evenly">
          <p <i class="fa-solid fa-eye"></i> ${data.total_view ? data.total_view : '00'}</p>
          <p><i class="fa-solid fa-star-half-stroke text-warning"></i><i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i></p>
          <button class="btn btn-primary" data-bs-toggle="modal" onclick="detailsNews('${data._id}')" data-bs-target="#staticBackdrop">View Details</button>
          <p><i class="fa-sharp fa-solid fa-arrow-right fs-3 text-primary"></i></p>
          </div>
        </div>
      </div>
        </div>
        </div>
      </div>
    </div>
  </div>
    `;
    newsDis.appendChild(creatDiv);
    toggleSpinner(false);
  });

  const newsLength = newsDis.children.length;
  const newsQuantity = document.getElementById('categoriItem');
  newsQuantity.innerText = newsLength + ' ' + 'Items News founded';
  // console.log(newsLength);
}

const detailsNews = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayDetailNews(data);
}

const displayDetailNews = (data) => {
  const displayDetailsNews = document.getElementById('displayDetailsNews');
  displayDetailsNews.innerHTML = `
  <h2>${data.data[0]?.title}</h2>
  <img class = "w-100" src="${data.data[0]?.thumbnail_url}">
  <p>${data.data[0]?.details}</p>
  
  <div class="row">
        <div class="col-md-5 pt-5">
          <img class = "rounded-circle autImg" src="${data.data[0]?.author.img}">
          <p class="d-inline">${data.data[0]?.author.name}</p>
          <p></p>
        </div>
        <div class="col-md-7 pt-5 d-flex justify-content-evenly">
          <p <i class="fa-solid fa-eye">${data.data[0]?.total_view}</i> </p>
          <p><i class="fa-solid fa-star-half-stroke text-warning"></i><i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i></p>
         </div>
  </div>        
        <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
           <button type="button" class="btn btn-primary">Oky</button>
        </div>

  `;
}

function toggleSpinner(isLoading) {
  const loaderSection = document.getElementById('spinner');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  }
  else {
    loaderSection.classList.add('d-none');
  }
}

loadCategories();
detailsNews();
