document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch product data from the API
    function fetchProductData(callback) {
        fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
            .then(response => response.json())
            .then(data => callback(data))
            .catch(error => console.error('Error fetching product data:', error));
    }

    // Function to populate product cards based on the selected category
    function populateProductCards(data, category) {
        const productContainer = document.getElementById('productContainer');
        productContainer.innerHTML = ''; // Clear previous products

        // Find the category data
        const categoryData = data.find(cat => cat.category_name.toLowerCase() === category.toLowerCase());
        if (!categoryData) return;

        // Loop through the category products and create product cards
        categoryData.category_products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            // Add image
            const image = document.createElement('img');
            image.src = product.image;
            card.appendChild(image);

            // Add badge if available
            if (product.badge_text) {
                const badge = document.createElement('div');
                badge.classList.add('badge');
                badge.innerText = product.badge_text;
                card.appendChild(badge);
            }

            // Add title and vendor in the same line
            const titleAndVendor = document.createElement('p');
            titleAndVendor.classList.add('title-and-vendor');
            const maxTitleLength = 25; // Maximum characters for the title
            const truncatedTitle = product.title.length > maxTitleLength ? product.title.substring(0, maxTitleLength) + '...' : product.title;
            titleAndVendor.innerHTML = `<span class="title">${truncatedTitle}</span>  <span class="vendor">${product.vendor}</span>`;
            card.appendChild(titleAndVendor);

            // Add price and discount
            const priceInfo = document.createElement('p');
            priceInfo.classList.add('price');
            priceInfo.innerHTML = `Rs <span class="price">${product.price}.00</span>&nbsp;&nbsp;<span class="compare-at-price">${product.compare_at_price}.00</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="discount-price">50% Off</span>`;
            card.appendChild(priceInfo);

            // Add dummy add to cart button
            const addToCartBtn = document.createElement('button');
            addToCartBtn.innerText = 'Add to Cart';
            card.appendChild(addToCartBtn);

            productContainer.appendChild(card);
        });

        // Apply CSS styles to dynamically created elements
        applyStyles();
    }

    // Function to apply CSS styles to dynamically created elements
    function applyStyles() {
        // Apply styles to title elements
        const titleElements = document.querySelectorAll('.title');
        titleElements.forEach(title => {
            title.style.fontFamily = "'Khula', sans-serif";
            title.style.display = 'inline-block';
            title.style.overflow = 'hidden';
            title.style.textOverflow = 'ellipsis';
            title.style.whiteSpace = 'nowrap';
            title.style.maxWidth = 'calc(70% - 10px)'; // Adjust width to fit other elements
            title.style.fontWeight = 'bold';
            title.style.marginRight = '10px';
        });

        // Apply styles to vendor elements
        const vendorElements = document.querySelectorAll('.vendor');
        vendorElements.forEach(vendor => {
            vendor.style.fontFamily = "'Khula', sans-serif";
            vendor.style.display = 'inline-block';
            vendor.style.overflow = 'hidden'; // Ensure vendor name is fully visible
            vendor.style.textOverflow = 'ellipsis';
            vendor.style.whiteSpace = 'nowrap';
            vendor.style.fontWeight = 'normal';
        });

        // Apply styles to price elements
        const priceElements = document.querySelectorAll('.price');
        priceElements.forEach(price => {
            const priceValue = price.querySelector('.price');
            const compareAtPriceValue = price.querySelector('.compare-at-price');
            const discountPriceValue = price.querySelector('.discount-price');

            priceValue.style.fontFamily = "'Khula', sans-serif";
            priceValue.style.fontSize = '14px';
            priceValue.style.fontWeight = 'bold';

            compareAtPriceValue.style.fontSize = '14px';
            compareAtPriceValue.style.color = '#8F8F8F';
            compareAtPriceValue.style.fontFamily = 'Khula, sans-serif';
            compareAtPriceValue.style.fontWeight = '600';

            discountPriceValue.style.fontFamily = "'Khula', sans-serif";
            discountPriceValue.style.fontSize = '14px';
            discountPriceValue.style.color = '#FF5733';
            discountPriceValue.style.fontWeight = '800';
        });
    }

    // Function to show the selected tab and load corresponding products
    window.showTab = function(category) {
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('active'));
        document.getElementById(`${category.toLowerCase()}Tab`).classList.add('active');

        // Fetch product data and populate cards
        fetchProductData(data => {
            populateProductCards(data.categories, category);
        });
    };

    // Initially show the Men category
    showTab('Men');
});



