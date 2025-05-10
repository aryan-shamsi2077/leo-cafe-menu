const swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    pagination: { el: ".swiper-pagination", clickable: true }
});

async function fetchMenuData() {
    try {
        const response = await fetch('category.json');

// مدیریت تم‌ها
const themes = {
    hotCoffee: {},
    coldCoffee: {},
    coldDrink: {},
    hotDrink: {},
    pizza: { 
        containerClass: "pizza-bg",
        buttonClass: "pr-add-btn" 
    },
    Waffle: {},
    pasta: {}
};

// تابع عمومی رندر
function renderItems(items, category) {
    const sliderPlace = document.querySelector(".swiper-wrapper");
    sliderPlace.innerHTML = "";

    items.forEach(item => {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        
        let containerClass = "product-container";
        let buttonClass = "pr-add";
        
        if (category === 'pizza') {
            containerClass += " pizza-bg";
            buttonClass += " pr-add-btn";
        }

        slide.innerHTML = `
            <div class="${containerClass}">
                <div class="product-card">
                    <div class="pr-img">
                        <img src="${item.imgSrc}" alt="${item.name}">
                    </div>
                    <div class="pr-info">
                        <h3>${item.name}</h3>
                        <div class="flex-right pr-heart-num">
                            <div class="pr-heart-num-inner">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pr-heart-icon">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                </svg>
                                <p>۱۰۰</p>
                            </div>
                        </div>
                        <div class="flex-right pr-volume">
                            <span>${item.volume}</span>
                            <p>حجم</p>
                        </div>
                        <div class="flex-between price-add">
                            <button class="${buttonClass}">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="20" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                                </svg>
                            </button>
                            <div class="pr-price">
                                <p>T</p>
                                <span>${item.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        sliderPlace.appendChild(slide);
    });
}

function setupCategoryButtons(data) {
    const buttons = {
        hotCoffee: document.querySelector(".hotCoffee"),
        coldCoffee: document.querySelector(".coldCoffee"),
        coldDrink: document.querySelector(".coldDrink"),
        hotDrink: document.querySelector(".hotDrink"),
        pizza: document.querySelector(".pizza"),
        Waffle: document.querySelector(".Waffle"),
        pasta: document.querySelector(".pasta")
    };

    Object.keys(buttons).forEach(category => {
        buttons[category].addEventListener("click", () => {
            renderItems(data.category[category], category);
        });
    });
}