let btnProductDelete = document.querySelectorAll('.btn-delete');
let btnClearCart = document.querySelector('.clearCart');

btnClearCart.addEventListener('click', () => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to empty the cart?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, clear cart!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        return fetch(`/api/carts/${btnClearCart.value}`, { method: 'delete' }).then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Cart empty',
              timer: 3000,
              allowOutsideClick: false,
              showConfirmButton: false,
            });
            setTimeout(() => {
              window.location.href = "/products";
            }, 3000);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'we could not empty the cart',
            });
          }
        });
      }
    });
  });

for (let btn of btnProductDelete) {
  btn.addEventListener('click', () => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete this product from the cart?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete product!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        return fetch(`/api/carts/${btn.value}/products/${btn.id}`, { method: 'delete' }).then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Product deleted',
              allowOutsideClick: false,
              timer: 3000,
              showConfirmButton: false,
            });
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            Swal.fire({
              icon: 'warning',
              title: 'Could not remove product from cart',
            });
          }
        });
      }
    });
  });
}
