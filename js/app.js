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
        <a href="#" class = "text-decoration-none text-secondary" onclick = "loadNews(${news.category_id})" ><h6>${news.category_name}</h6></a>
        `;
        categories.appendChild(creatDiv);
    });
   
}

const loadNews = (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
}

const displayNewsDetails = (data) => {
    const newsDis = document.getElementById('displayNews');
    const creatDiv = document.createElement('div');
    creatDiv.classList.add('card');
    creatDiv.innerHTML = `
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${data.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data.title}</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
    `;
    newsDis.appendChild(creatDiv);
}

loadCategories();