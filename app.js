const createproduct_btn = document.getElementById('createproduct_btn')
const addToCartBtn = document.getElementById('addToCart');
const clear = document.getElementById('clear')

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
    products.push(product); //เพิ่ม object สินเค้าเข้าไปเก็บใน arr products

    // สร้าง div สำหรับแสดงสินค้า
    const productDiv = document.createElement('div');
    const productIndex = products.length - 1;

    if (productName !== null && productPrice !== NaN && productImg !== '') {
    productDiv.innerHTML = `
        <input type="checkbox" class="product-checkbox" data-index="${productIndex}">
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

    checkBox.forEach((checkBox) => {
        if(checkBox.checked) {
            // ดึงค่า data-index ของสินค้ามาเก็บในตัวแปร
            const productIndex = parseInt(checkBox.getAttribute('data-index'));
            const product = products[productIndex]; // ค้นหาสินค้าโดยใช้เลข index data 

            // filter product name ที่อยู่ใน cart ออกมาเก็บในตัวแปร เพื่อเช็คว่า มีซ้ำกันมั้ย
            const filterProduct = cart.filter(function(p) {
                return p.name === product.name;
            })

            // เช็คว่าชื่อสินค้า มีอยู่ใน cart มั้ย
            if (filterProduct.length === 0)
            cart.push(product); // ถ้าไม่มี ให้เพิ่มสินค้าลงไป

            //เพิ่มสินค้า ด้วยการสร้าง div ใหม่แทรกลงไปใน cartlist ที่เตรียมไว้
            const cartDiv = document.createElement('div');
            cartDiv.innerHTML = `
            <img src="${product.image}" width="50" height="auto">
            ${product.name} - $${product.price.toFixed(2)}`;
            cartList.appendChild(cartDiv);

            //หลังจากนั้น ให้ลบรายการสินค้าออกหลังจากกดเพิ่ม (add to cart) ไปยัง cart
            checkBox.parentElement.remove();
            // เรียก function รวมราคา อัติโนมัติ
            calTotal ();
        }
        
    })
})
// // ลบ item cart
// function btnRemove_Cart(event) {
//     event.target.parentElement.remove();
// }

// รวมราคา อัตโนมัติ
function calTotal () {
    const total = document.getElementById('total') //ดึง div เปล่า id total มา
   
        //หาผลรวมของสินค้าในช่อง Cart ทั้งหมด
        const sumPrice = cart.reduce(function(sum, product){
        return sum + product.price
    },0);
    //รวม total price และเปลี่ยน text ในช่อง div เปล่า id total ให้แสดงเป็นผลรวมที่คำนวนมา
    total.innerText = `Total: $${sumPrice.toFixed(2)}`;
}

function clearTotal() {
    const total = document.getElementById('total') //ดึง div เปล่า id total มา
    const cartList = document.getElementById('cart-list') //ดึงข้อมูล div id cart list มา
    
    // ลบสินค้าใน cart ทั้งหมด
    while (cartList.firstChild) {
        cartList.removeChild(cartList.firstChild);
    }
    
    // ลบสินค้าใน array cart
    cart = [];
    total.innerText = `Total: $0`;

}

