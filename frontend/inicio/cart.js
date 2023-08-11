document.addEventListener("DOMContentLoaded", () => {
    showCartItems();
});

async function showCartItems() {
    const cartTableBody = document.querySelector(".tbodie");
    cartTableBody.innerHTML = "";

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    let totalPrice = 0;

    cartItems.forEach(item => {
        const { _id, imagen, nombre, precio, cantidad } = item;
        const row = document.createElement("tr");
        const total = precio * cantidad;
        const formattedPrecio = formatCurrency(precio);
        const formattedTotal = formatCurrency(total);

        row.innerHTML = `
            <td><img src="img/${imagen}" alt="" style="width: 50px;"></td>
            <td class="align-middle">${nombre}</td>
            <td class="align-middle">$${formattedPrecio}</td>
            
            <td class="align-middle">
                <div class="input-group quantity mx-auto" style="width: 100px;">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-minus" data-id="${_id}" style="visibility: hidden;">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>
                    <input type="number" class="form-control form-control-sm bg-secondary text-center input-quantity" value="${cantidad}" min="0">
                    <div class="input-group-btn">
                        <button class="btn btn-sm btn-primary btn-plus" data-id="${_id}" style="visibility: hidden;">
                            <i class="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
            </td>
            <td class="align-middle">$${formattedTotal}</td>
            <td class="align-middle"><button class="btn btn-sm btn-primary btn-remove delete" data-id="${_id}"><i class="fa fa-times"></i></button></td>
        `;

        cartTableBody.appendChild(row);
        totalPrice += total;
    });

    const formattedTotalPrice = formatCurrency(totalPrice);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
        <td colspan="3" class="text-end fw-bold">Total:</td>
        <td colspan="2">$${formattedTotalPrice}</td>
    `;

    cartTableBody.appendChild(totalRow);

    const removeButtons = document.querySelectorAll(".btn-remove");
    removeButtons.forEach(button => {
        button.addEventListener("click", removeFromCart);
    });

    const inputQuantities = document.querySelectorAll(".input-quantity");
    inputQuantities.forEach(input => {
        input.addEventListener("change", updateQuantityFromInput);
    });

    const quantityFields = document.querySelectorAll(".input-quantity");
    quantityFields.forEach(field => {
        field.addEventListener("click", showQuantityButtons);
    });
}

function removeFromCart(event) {
    const id = event.target.getAttribute("data-id");
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    const updatedCart = cartItems.filter(item => item._id !== id);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    showCartItems();
}

function showQuantityButtons(event) {
    const parentDiv = event.target.parentElement.parentElement;
    const minusButton = parentDiv.querySelector(".btn-minus");
    const plusButton = parentDiv.querySelector(".btn-plus");
    minusButton.style.visibility = "visible";
    plusButton.style.visibility = "visible";
}

function updateQuantityFromInput(event) {
    const id = event.target.parentElement.querySelector(".btn-plus").getAttribute("data-id");
    const newQuantity = parseInt(event.target.value);
    
    if (newQuantity < 0) {
        event.target.value = 0;
        updateQuantity(id, 0);
    } else {
        updateQuantity(id, newQuantity);
    }
}

function updateQuantity(id, change) {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
    const updatedCart = cartItems.map(item => {
        if (item._id === id) {
            item.cantidad = change;
        }
        return item;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    showCartItems();
}

function formatCurrency(amount) {
    return parseFloat(amount).toFixed(2);
}
