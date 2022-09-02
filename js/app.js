const loadCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = (news) => {
    const categories = document.getElementById('categories');
    news.forEach(news => {
        const creatDiv = document.createElement('div');
        creatDiv.classList.add('float-end');
        creatDiv.innerHTML = `
        <h6>${news.category_name}</h6>
        `;
        categories.appendChild(creatDiv);
    });
   
}


loadCategories();