const socket = io();

//Create product and add new product in the table
let formProducts = document.getElementById("form-products")
let title = document.getElementById("form-new-product-title")
let description = document.getElementById("form-new-product-description")
let price = document.getElementById("form-new-product-price")
let thubmail = document.getElementById("form-new-product-thubmail")
let code = document.getElementById("form-new-product-code")
let stock = document.getElementById("form-new-product-stock")

formProducts.addEventListener("submit", (e) => {
  e.preventDefault();
  let newProduct = {
    title: title.value,
    description: description.value,
    price: price.value,
    thubmail: thubmail.value,
    code: code.value,
    stock: stock.value
  };
  socket.emit("new-product-created", newProduct);
});

socket.on("products", (products) => {
  if (products) {
    let lastProduct = products.slice(-1).pop();
    let container = document.getElementById("dinamic-product-list");
    let data = document.createElement("tr");
    container.append(data);
    data.innerHTML = `<td>${lastProduct.id}</td>
                      <td>${lastProduct.title}</td>
                      <td>${lastProduct.description}</td>
                      <td>${lastProduct.price}</td>
                      <td>${lastProduct.thubmail}</td>
                      <td>${lastProduct.code}</td>
                      <td>${lastProduct.stock}</td>
                      <td>
                      <button type="button" class="btn-delete" value=${lastProduct.id}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                      </td>
                    `;
    
    btnDelete = document.querySelectorAll(".btn-delete");
    setDelete(btnDelete)
  } else {
    Swal.fire({
      title: 'duplicate code',
      text: "Please change the code",
      icon: 'warning',
    })
  }
});

// Delete product and delete in table
let btnDelete = document.querySelectorAll(".btn-delete");

function setDelete(btnDelete) {
  for (let btn of btnDelete) {
    btn.addEventListener("click", () => {
      Swal.fire({
        title: 'Do you want to delete',
        text: `you are going to delete the product with the ID: "${btn.value}"`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          let idToDelete = btn.value
          socket.emit("delete-product", idToDelete)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    });
  };
}

setDelete(btnDelete);

socket.on("delete-product-in-table", (idToDelete) => {
  btnDelete = document.querySelectorAll(".btn-delete");
  for (let btn of btnDelete) {
    if (btn.value == idToDelete) {
      let hijo = btn.parentNode;
      let padre = hijo.parentNode;
      padre.remove()
    }
  }
})