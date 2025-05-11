const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true }
});

async function fetchMenuData() {
    try {
        const response = await fetch('category.json');

        if (!response.ok) {
            throw new Error('مشکل در دریافت داده‌ها');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('خطا در بارگذاری منو:', error);
        return null;
    }
}


fetchMenuData().then(data => {
    if (data) {
        console.log(data.categories[0].items);

        renderCategories(data.categories)
        renderProducts(data.categories[0].items);
    } else {
        console.log('داده‌ای دریافت نشد');
    }
});

function renderCategories(categories, index) {
    const categoriesUl = document.querySelector(".categories-ul");
    categoriesUl.innerHTML = '';

    categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'category-item';
        li.innerHTML = `
            <button class="category-item-inner" data-category-id="${category.id}">
                <p class="category-name">${category.title}</p>
            </button>
        `;
        categoriesUl.appendChild(li);

        if(index === 0) {
            document.body.className = category.theme;
        }

    });
}

document.querySelector('.categories-ul').addEventListener('click', async (e) => {
    if (e.target.closest('.category-item-inner')) {
        const categoryId = e.target.closest('.category-item-inner').dataset.categoryId;
        const data = await fetchMenuData();
        const selectedCategory = data.categories.find(cat => cat.id === categoryId);

        document.body.className = selectedCategory.theme;

        renderProducts(selectedCategory.items);
    }
});

function renderProducts(products) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';

    products.forEach(product => {
        swiperWrapper.innerHTML += `
            <div class="swiper-slide">
                <div class="product-container">
                    <div class="product-card">
                        <div class="pr-img">
                            <img src="${product.imgSrc}" alt="${product.name}">
                        </div>
                        <div class="pr-info">
                            <h3>${product.name}</h3>
                            <div class="pr-heart-num">
                                <div class="pr-heart-num-inner">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pr-heart-icon">
                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                    </svg>
                                    <p>۱۰۰</p>
                                </div>
                            </div>
                            <div class="pr-volume">
                                <span>${product.size}</span>
                                <p>سایز</p>
                            </div>
                            <div class="price-add">
                                <button class="pr-add">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" stroke-width="1.5" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                    </svg>
                                </button>
                                <div class="pr-price">
                                    <span>${product.price} تومان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    
    // تنظیم مجدد Swiper
    swiper.params.slidesPerView = "auto";
    swiper.params.centeredSlides = true;
    swiper.params.spaceBetween = 30;
    swiper.update();
}