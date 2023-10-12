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
          title: 'The product was added to the cart successfully',
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
