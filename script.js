// Shopping Cart and Order Management System
let cart = [];
let totalAmount = 0;

// Product selection with checkboxes - automatically add to cart when selected
function toggleProduct(productId, productName, price, checkbox) {
    console.log('=== TOGGLE PRODUCT DEBUG ===');
console.log('Product ID:', productId);
console.log('Product Name:', productName);
console.log('Product Price:', price);
console.log('Checkbox Checked:', checkbox.checked);
console.log('Current Cart Before:', JSON.stringify(cart, null, 2));
    
    // Visual feedback - add animation class
    const productCard = checkbox.closest('.bg-gray-900');
    
    if (checkbox.checked) {
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        console.log('Existing item:', existingItem);
        
        if (existingItem) {
            // Product already in cart - increase quantity
            existingItem.quantity += 1;
            console.log('Increased quantity to:', existingItem.quantity);
            
            // Visual feedback - pulse animation
            productCard.classList.add('ring-4', 'ring-blue-500', 'animate-pulse');
            setTimeout(() => {
                productCard.classList.remove('ring-4', 'ring-blue-500', 'animate-pulse');
            }, 1000);
        } else {
            // Add new product to cart
            cart.push({
                id: productId,
                name: productName,
                price: price,
                quantity: 1
            });
            console.log('Added to cart:', { productId, productName, price });
            
            // Visual feedback - scale animation + checkmark
            productCard.classList.add('scale-110', 'shadow-2xl', 'shadow-blue-500/50');
            
            // Add checkmark indicator
            const checkboxContainer = checkbox.parentElement;
            const checkmark = document.createElement('div');
            checkmark.innerHTML = '<i class="fas fa-check text-green-400 text-lg ml-2"></i>';
            checkmark.className = 'absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center';
            checkboxContainer.appendChild(checkmark);
            
            setTimeout(() => {
                productCard.classList.remove('scale-110', 'shadow-2xl', 'shadow-blue-500/50');
                // Keep checkmark visible
            }, 500);
        }
    } else {
        // Remove from cart
        const existingItem = cart.find(item => item.id === productId);
        console.log('Removing item:', existingItem);
        
        if (existingItem) {
            // Decrease quantity or remove if quantity is 1
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
                console.log('Decreased quantity to:', existingItem.quantity);
                
                // Visual feedback - shake animation
                productCard.classList.add('animate-pulse');
                setTimeout(() => {
                    productCard.classList.remove('animate-pulse');
                }, 500);
            } else {
                // Remove completely if quantity is 1
                cart = cart.filter(item => item.id !== productId);
                console.log('Removed completely from cart');
                
                // Visual feedback - fade out
                productCard.classList.add('opacity-50');
                setTimeout(() => {
                    productCard.classList.remove('opacity-50');
                }, 300);
            }
        }
        // Uncheck the checkbox
        checkbox.checked = false;
        
        // Remove checkmark if exists
        const existingCheckmark = checkbox.parentElement.querySelector('.fa-check');
        if (existingCheckmark) {
            existingCheckmark.remove();
        }
    }
    
    // Search functionality
function performSearch(searchTerm) {
    console.log('=== SEARCH FUNCTION DEBUG ===');
    console.log('Search Term:', searchTerm);
    
    const searchResults = document.getElementById('search-results');
    const searchItems = document.getElementById('search-items');
    
    if (!searchTerm || searchTerm.trim() === '') {
        console.log('Empty search term - hiding results');
        searchResults.classList.add('hidden');
        return;
    }
    
    // Show search results section
    searchResults.classList.remove('hidden');
    
    // Available products (in real app, this would come from database)
    const availableProducts = [
        { id: 'product-1', name: 'Premium Engine Oil', price: 29.99 },
        { id: 'product-2', name: 'Racing Engine Oil', price: 45.99 },
        { id: 'product-3', name: 'Diesel Engine Oil', price: 34.99 },
        { id: 'product-4', name: 'Synthetic Blend Oil', price: 24.99 }
    ];
    
    // Search through available products
    const matchingProducts = availableProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    console.log('Found matching products:', matchingProducts);
    
    if (matchingProducts.length > 0) {
        searchItems.innerHTML = matchingProducts.map(product => `
            <div class="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2 hover:bg-gray-700 transition-colors">
                <div>
                    <span class="text-white font-semibold">${product.name}</span>
                    <span class="text-gray-400 ml-2">$${product.price.toFixed(2)}</span>
                </div>
                <button onclick="toggleProduct('${product.id}', '${product.name}', ${product.price}, document.getElementById('${product.id}'))" class="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300">
                    Add to Cart
                </button>
            </div>
        `).join('');
    } else {
        searchItems.innerHTML = '<p class="text-gray-400">No products found for "' + searchTerm + '"</p>';
    }
}

console.log('Current Cart After Update:', JSON.stringify(cart, null, 2));
    console.log('Cart Length:', cart.length);
    console.log('Total Amount:', totalAmount);
    updateCart();
}

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

// Initialize button event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Adding button listeners');
    
    // Confirm Order button
    const confirmBtn = document.querySelector('button[onclick="confirmOrder()"]');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            console.log('Confirm Order button clicked');
        });
    }
    
    // Contact Us button
    const contactBtn = document.querySelector('button[onclick="openWhatsApp()"]');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            console.log('Contact Us button clicked');
        });
    }
    
    // Explore Now button
    const exploreBtn = document.querySelector('button[onclick="exploreProducts()"]');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            console.log('Explore Now button clicked');
        });
    }
});

// Update cart display and total
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-amount');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-400">No items selected</p>';
        totalElement.textContent = '0.00';
        totalAmount = 0;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-2">
                <div>
                    <span class="text-white font-semibold">${item.name}</span>
                    <div class="flex items-center space-x-2">
                        <span class="text-gray-400">Qty: ${item.quantity}</span>
                        <span class="text-gray-400">$${item.price.toFixed(2)}</span>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="removeFromCart('${item.id}')" class="text-red-400 hover:text-red-300">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Calculate total with quantities
        totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalElement.textContent = totalAmount.toFixed(2);
    }
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    const checkbox = document.getElementById(`product-${productId}`);
    if (checkbox) {
        checkbox.checked = false;
    }
    updateCart();
}

// Explore Now button functionality
function exploreProducts() {
    // Scroll to products section or redirect
    window.location.href = 'product.html';
}

// Order confirmation
function confirmOrder() {
    if (cart.length === 0) {
        alert('Please select at least one product');
        return;
    }
    
    const confirmation = confirm(`Total Amount: $${totalAmount.toFixed(2)}\n\nDo you want to confirm this order?`);
    
    if (confirmation) {
        // Send WhatsApp message
        sendWhatsAppOrder();
        
        // Show success message
        alert('Order confirmed! We will contact you soon.');
        
        // Clear cart
        cart = [];
        updateCart();
    }
}

// WhatsApp order functionality
function sendWhatsAppOrder() {
    const phoneNumber = '03006955087';
    const message = `New Order Details:\n\n${cart.map(item => 
        `• ${item.name} - $${item.price.toFixed(2)}`
    ).join('\n')}\n\nTotal: $${totalAmount.toFixed(2)}\n\nPlease confirm and process my order.`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Contact functionality
function openWhatsApp() {
    const phoneNumber = '03006955087';
    const message = 'Hello, I need help with my order or have a question about products.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCart();
});
