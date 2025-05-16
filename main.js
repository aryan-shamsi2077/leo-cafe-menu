const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true }
});

// مخفی کردن مودال در ابتدا
document.querySelector('.product-modal').style.display = 'none';

async function fetchMenuData() {
    try {
        const response = await fetch('category.json');
        if (!response.ok) throw new Error('مشکل در دریافت داده‌ها');
        return await response.json();
    } catch (error) {
        console.error('خطا در بارگذاری منو:', error);
        return null;
    }
}

function renderProductModal(product) {
    const modal = document.querySelector('.product-modal');
    
    modal.innerHTML = `
        <div class="product-modal-container">
            <div class="back-and-favourite-btns">
                <div class="back-and-favourite-btns-inner">
                    <button class="back-button-modal">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="45px" height="45px" stroke-width="1" stroke="currentColor" class="modal-back-btn">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    <button class="favourite-button-modal">
                        <div class="favorite-button-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px" fill="currentColor" class="modal-favourite-btn">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>

            <div class="product-modal-img-bg">
                <div class="product-modal-img-container">
                    <img class="product-modal-img" src="${product.imgSrc}" alt="${product.name}">
                </div>
            </div>

            <div class="product-modal-info-sec">
                <div class="pr-heart-modal-num">
                    <div class="pr-heart-num-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pr-heart-icon">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                        </svg>
                        <p>۱۰۰</p>
                    </div>
                </div>

                <div class="product-name-price">
                    <div class="product-price">
                        <p>تومان</p>
                        <span>${product.price}</span>
                    </div>
                    <div class="product-name-container">
                        <h1 class="product-name">${product.name}</h1>
                    </div>
                </div>

                <div class="product-size-sec">
                    <p class="product-size-sec-title">سایز محصول</p>
                    <div class="product-size-group">
                        <div class="product-size-btn">کوچک</div>
                        <div class="product-size-btn">متوسط</div>
                        <div class="product-size-btn">بزرگ</div>
                    </div>
                </div>

                <div class="product-about-sec">
                    <p class="product-about-sec-title">درباره</p>
                    <div class="product-about">
                        <p>${product.about}</p>
                    </div>
                </div>

                <div class="product-size-add-num">
                    <div class="number-of-product">
                        <div class="number-of-product-box">
                            <div class="reduce-product">-</div>
                            <div class="number-of-product">
                                <span>1</span>
                            </div>
                            <div class="increase-product">+</div>
                        </div>
                    </div>

                    <div class="product-size-title">
                        <span class="product-size-num">${product.size}</span>
                        <p class="product-size-text">سایز</p>
                    </div>
                </div>

                <div class="add-list-buy-btn">
                    <div class="add-list-product-modal-btn">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="add-list-btn-m">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                        </button>
                    </div>

                    <div class="buy-product-btm-modal">
                        <button>خرید</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // اضافه کردن ایونت لیسنر برای دکمه بستن مودال
    modal.querySelector('.back-button-modal').addEventListener('click', closeProductModal);
    
    // اضافه کردن ایونت لیسنر برای دکمه‌های افزایش/کاهش تعداد
    modal.querySelector('.increase-product').addEventListener('click', () => {
        const quantityElement = modal.querySelector('.number-of-product span');
        quantityElement.textContent = parseInt(quantityElement.textContent) + 1;
    });

    modal.querySelector('.reduce-product').addEventListener('click', () => {
        const quantityElement = modal.querySelector('.number-of-product span');
        const current = parseInt(quantityElement.textContent);
        if(current > 1) {
            quantityElement.textContent = current - 1;
        }
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// تابع نمایش مودال محصول
function showProductModal(product) {
    renderProductModal(product);
    window.scrollTo(0, 0);
}

// تابع بستن مودال
function closeProductModal() {
    document.querySelector('.product-modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // فعال کردن مجدد اسکرول
}

// رندر کردن محصولات
function renderProducts(products) {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = '';

    products.forEach(product => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.dataset.productId = product.id;
        
        slide.innerHTML = `
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
        `;
        
        swiperWrapper.appendChild(slide);
    });

    // اضافه کردن ایونت لیسنر برای دکمه‌های افزودن
    document.querySelectorAll('.pr-add').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.swiper-slide').dataset.productId;
            const product = products.find(p => p.id === productId);
            showProductModal(product);
        });
    });

    swiper.update();
}

// رندر کردن دسته‌بندی‌ها
function renderCategories(categories) {
    const categoriesUl = document.querySelector(".categories-ul");
    categoriesUl.innerHTML = '';

    categories.forEach((category, index) => {
        const li = document.createElement('li');
        li.className = 'category-item';
        li.innerHTML = `
            <button class="category-item-inner ${index === 0 ? 'active' : ''}" 
                    data-category-id="${category.id}">
                <p class="category-name">${category.title}</p>
            </button>
        `;
        categoriesUl.appendChild(li);

        if(index === 0) {
            document.body.className = category.theme;
        }
    });
}

// این کد رو در انتهای فایل main.js (قبل از بسته شدن اسکریپت) اضافه کنید
document.getElementById('search-input').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    if (searchTerm.length > 0) {
        fetchMenuData().then(data => {
            // ساخت آرایه‌ای از همه محصولات با اطلاعات تم دسته‌بندی
            const allProducts = data.categories.flatMap(category => 
                category.items.map(item => ({
                    ...item,
                    categoryTheme: category.theme
                }))
            );
            
            // فیلتر کردن نتایج
            const results = allProducts.filter(item => 
                item.name.toLowerCase().includes(searchTerm)
            );
            
            if (results.length > 0) {
                // تغییر تم بر اساس دسته‌بندی اولین نتیجه
                document.body.className = results[0].categoryTheme;
                renderProducts(results);
            } else {
                document.querySelector('.swiper-wrapper').innerHTML = `
                    <div style="text-align:center;padding:50px;color:var(--text-color)">
                        محصولی یافت نشد
                    </div>
                `;
            }
        });
    } else {
        // بازگشت به حالت پیش‌فرض اگر جستجو خالی شد
        fetchMenuData().then(data => {
            document.body.className = data.categories[0].theme;
            renderProducts(data.categories[0].items);
        });
    }
});

// اجرای اولیه
fetchMenuData().then(data => {
    if (data) {
        renderCategories(data.categories);
        renderProducts(data.categories[0].items);
        
        // ایونت لیسنر برای تغییر دسته‌بندی
        document.querySelector('.categories-ul').addEventListener('click', async (e) => {
            if (e.target.closest('.category-item-inner')) {
                // حذف کلاس active از همه دکمه‌ها
                document.querySelectorAll('.category-item-inner').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // اضافه کردن کلاس active به دکمه انتخاب شده
                e.target.closest('.category-item-inner').classList.add('active');
                
                const categoryId = e.target.closest('.category-item-inner').dataset.categoryId;
                const selectedCategory = data.categories.find(cat => cat.id === categoryId);
                document.body.className = selectedCategory.theme;
                renderProducts(selectedCategory.items);
            }
        });
    }
});

// بستن مودال با کلیک روی دکمه برگشت
document.querySelector('.back-button-modal').addEventListener('click', closeProductModal);

