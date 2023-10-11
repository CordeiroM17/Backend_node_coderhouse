let btnAddToCart = document.querySelectorAll('.btn-add-to-cart');

function setAddToCart(btnAddToCart) {
  for (let btn of btnAddToCart) {
    btn.addEventListener('click', async () => {
      const response = await fetch(btn.value, {
        method: 'post',
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'El producto fue añadido al carrito con exito',
          toast: true,
          position: 'top',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  }
}

setAddToCart(btnAddToCart);
