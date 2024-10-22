const createproduct_btn = document.getElementById('createproduct_btn')
const addToCartBtn = document.getElementById('addToCart');

// array สำหรับเก็บสินค้า
let products = [];
let cart = [];

createproduct_btn.addEventListener('click',function(event) {
    event.preventDefault(); // ป้องกันไม่ให้หน้าเว็บรีเฟรช

    const productName = document.getElementById('productName').value //เข้าถึง value ใน input productName
    const productPrice = parseFloat(document.getElementById('productPrice').value) //เข้าถึง value ใน input productPrice แบบตัวเลข 2 หลัก
    const productImg = document.getElementById('productImg').value
    const productList = document.getElementById('product-list') //เข้าถึง div product-list

    // สร้างสินค้าใหม่เป็น object
    const product = { 
        name: productName, 
        price: productPrice, 
        image: productImg 
    };
    products.push(product);

    // สร้าง div สำหรับแสดงสินค้า
    const productDiv = document.createElement('div');

    if (productName !== null && productPrice !== NaN && productImg !== '') {
    productDiv.innerHTML = `
        <input type="checkbox" class="product-checkbox">
        <img src="${product.image}" width="50" height="auto">
        ${product.name} - $${product.price.toFixed(2)}
        <button id="btnRemove" onclick="btnRemove(event)">Remove</button>`;
        productList.appendChild(productDiv);
    }else {
        return false;
    }

    // ล้างค่า input หลังจากเพิ่มสินค้า
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImg').value = '';


});

// ปุ่มลบ product list
function btnRemove(event) {
    event.target.parentElement.remove();
}

// ปุ่ม add to cart เพิ่มสินค้าไปยังช่อง cart
addToCartBtn.addEventListener('click', function() {
    const checkBox = document.querySelectorAll('.product-checkbox') //ดึงข้อมูล input checkbox id มาทั้งหมดเพื่อวน loop
    const cartList = document.getElementById('cart-list') //ดึงข้อมูล div id cart list มา

    checkBox.forEach((checkBox, index) => {
        if(checkBox.checked) {
            const product = products[index];

            const filterProduct = cart.filter(function(p) {
                
            })
            cart.push(product);

            const cartDiv = document.createElement('div');
            cartDiv.innerHTML = `
            <img src="${product.image}" width="50" height="auto">
            ${product.name} - $${product.price.toFixed(2)}
            <button id="btnRemove" onclick="btnRemove_Cart(event)">Remove</button>`;
            cartList.appendChild(cartDiv);

            const checkAtt = checkBox.setAttribute('value', '${product.name}');
            const hasAtt = checkAtt.hasAttribute('${product.name}')

            checkBox.parentElement.remove();
            
            
        }
        
    })
})
// ลบ item cart
function btnRemove_Cart(event) {
    event.target.parentElement.remove();
}


