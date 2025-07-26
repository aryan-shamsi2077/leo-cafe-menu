const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true }
});

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

let cartItems = []; 


function showCategory(categories){

  const catBox = document.querySelector('.categories-ul');
  catBox.innerHTML = '';

  categories.forEach((category, index) => {
    const catLi = document.createElement('li');
    catLi.className = 'category-item';
     

    catLi.innerHTML = `
      <button class="category-item-inner ${index === 0 ? 'active' : ''}" 
          data-category-id="${category.id}">
        <p class="category-name">${category.title}</p>
      </button>
    `;

    catBox.appendChild(catLi)

    if(index === 0) {
      document.body.className = category.theme;
    }

  });


}

function showProducts(products){
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  swiperWrapper.innerHTML = '';

  products.forEach(product => {
    const slider = document.createElement('div');
    slider.className = 'swiper-slide';
    slider.dataset.productId = product.id;

    slider.innerHTML = `
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

        swiperWrapper.appendChild(slider);
  });

    document.querySelectorAll('.pr-add').forEach(button => {
        button.addEventListener('click', (e) =>{
            const productId = e.target.closest('.swiper-slide').dataset.productId
            const product = products.find(p => p.id === productId);
            showProductModal(product);
        });
    });
    swiper.update();
}

function updateCartDisplay(){
    
    const chosenProductsGroup = document.querySelector('.chosen-products-group');
    chosenProductsGroup.innerHTML = '';

    cartItems.forEach(item => {
        const chosenProductLi = document.createElement('li');
        chosenProductLi.className = 'chosen-product-li';

        
        chosenProductLi.innerHTML = `
            <div class="chosen-product-line"></div>
            <div class="chosen-product">
                <div class="chosen-product-quantity">
                    <button class="increase-ch chosen-product-btn" data-id="${item.id}">+</button>
                    <span class="chosen-product-count">${item.quantity}</span>
                    <button class="decrease-ch chosen-product-btn" data-id="${item.id}">-</button>
                </div>
                <div class="chosen-product-pic-info">
                    <div class="chosen-product-info">
                        <h3 class="chosen-product-name">${item.name}</h3>
                        <p class="chosen-product-size">${item.size}</p>
                        <span class="chosen-product-price">${item.price * item.quantity} تومان</span>
                    </div>
                    <div class="chosen-product-pic-box">
                        <img src="${item.imgSrc}" class="chosen-product-pic" alt="">
                    </div>
                </div>
            </div>
        `;

        chosenProductsGroup.appendChild(chosenProductLi);

    });

}

function showProductModal(product){
    const modal = document.querySelector('.product-modal');
    modal.style.display = 'block';

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
                            <button class="add-shopping-cart">خرید</button>
                        </div>
                    </div>
                </div>
            </div>
    `
    modal.querySelector('.back-button-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.querySelector('.add-shopping-cart').addEventListener('click', () => {
        addToCart(product);
        updateCartDisplay();
        document.querySelector('.shopping-cart').style.display = 'block';
        modal.style.display = 'none';
    });
}

function updateTotalPrice() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.querySelector('.total-price-value').textContent = `${total} تومان`;
}

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.style.display = 'flex';
        badge.textContent = totalItems;
    } else {
        badge.style.display = 'none';
    }
}

function handleCartActions() {
    // رویدادهای افزایش/کاهش تعداد
    document.querySelector('.chosen-products-group').addEventListener('click', (e) => {
        if (e.target.classList.contains('increase-ch')) {
            const productId = e.target.dataset.id;
            const item = cartItems.find(item => item.id === productId);
            if (item) {
                item.quantity += 1;
                updateCartDisplay();
                updateTotalPrice();
                updateCartBadge();
            }
        } else if (e.target.classList.contains('decrease-ch')) {
            const productId = e.target.dataset.id;
            const itemIndex = cartItems.findIndex(item => item.id === productId);
            if (itemIndex !== -1) {
                if (cartItems[itemIndex].quantity > 1) {
                    cartItems[itemIndex].quantity -= 1;
                } else {
                    cartItems.splice(itemIndex, 1);
                }
                updateCartDisplay();
                updateTotalPrice();
                updateCartBadge();
            }
        }
    });

    // رویداد خالی کردن سبد خرید
    document.querySelector('.sh-c-trash').addEventListener('click', () => {
        cartItems = [];
        updateCartDisplay();
        updateCartBadge();
    });
}



fetchMenuData().then(data => {
    if (!data) return;

    showCategory(data.categories);

    if (data.categories.length > 0) {
        showProducts(data.categories[0].items);
    }

    let catBtn = document.querySelectorAll('.category-item-inner');
    catBtn.forEach(button => {
        button.addEventListener('click', function() {
            catBtn.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const categoryId = this.dataset.categoryId;
            const selectedCategory = data.categories.find(cat => cat.id === categoryId);
            document.body.className = selectedCategory.theme;
            showProducts(selectedCategory.items);
        });
    });

    // مقداردهی اولیه
    handleCartActions();
});

// انتقال تابع addToCart به بیرون از fetchMenuData.then()
function addToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    updateTotalPrice();
    updateCartBadge();
}

// اضافه کردن رویداد کلیک برای آیکون سبد خرید
document.querySelector('.shopping-sec').addEventListener('click', () => {
    document.querySelector('.shopping-cart').style.display = 'block';
    updateCartDisplay();
});

// اضافه کردن رویداد کلیک برای دکمه بازگشت
document.querySelector('.sh-c-back').addEventListener('click', () => {
    document.querySelector('.shopping-cart').style.display = 'none';
});
