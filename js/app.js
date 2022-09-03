const loadCategories = async() => {
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
    console.log(category_id)
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data))
}

const displayNewsDetails = (data) => {
    const newsDis = document.getElementById('displayNews');
    newsDis.textContent = '';
    data.forEach(data => {
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
          <p class="card-text">${data.details.slice(0,300)}</p>
          <p class="card-text">${data.details.slice(0,200)}....</p>
        </div>  
       <div class="row">
        <div class="col-md-4 pt-5">
          <img class = "rounded-circle autImg" src="${data.author.img}">
          <p class="d-inline">${data.author.name ? data.author.name : 'No Data Available' }</p>
          <p></p>
        </div>
        <div class="col-md-8 pt-5 d-flex justify-content-evenly">
          <p <i class="fa-solid fa-eye"></i> ${data.total_view ? data.total_view : '00'}</p>
          <p><i class="fa-solid fa-star-half-stroke text-warning"></i><i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i></p>
          <button class="btn btn-primary" data-bs-toggle="modal" onclick="detailsNews()" data-bs-target="#staticBackdrop">View Details</button>
          <p><i class="fa-sharp fa-solid fa-arrow-right fs-3 text-primary"></i></p>

          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">${data.title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <img src="${data.thumbnail_url}" class="img-fluid w-100 rounded-start p-3" alt="...">
            <p class="card-text">${data.details}</p>

            <div class="row">
            <div class="col-md-5 pt-5">
              <img class = "rounded-circle autImg" src="${data.author.img}">
              <p class="d-inline">${data.author.name ? data.author.name : 'No Data Available' }</p>
              <p></p>
            </div>
            <div class="col-md-7 pt-5 d-flex justify-content-evenly">
              <p <i class="fa-solid fa-eye"></i> ${data.total_view ? data.total_view : '00'}</p>
              <p><i class="fa-solid fa-star-half-stroke text-warning"></i><i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i> <i class="fa-regular text-warning fa-star"></i></p>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Oky</button>
            </div>
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
    });

    const newsLength = newsDis.children.length;
    const newsQuantity = document.getElementById('categoriItem');
    newsQuantity.innerText = newsLength + ' ' + 'Items News founded';
    console.log(newsLength);
}

const detailsNews = (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => console.log(data.data))
}
 
const displayDetailNews = () => {
  
}

loadCategories();
