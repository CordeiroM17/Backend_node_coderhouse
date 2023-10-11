let btnUsersClear = document.querySelector('.usersClear');

btnUsersClear.addEventListener('click', () => {
  Swal.fire({
    icon: 'warning',
    title: '¿Desea hacer una limpieza de usuarios?',
    text: 'Se borraran los usuarios que lleven mas de dos dias sin conectarse',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Si, realizar limpieza',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      return fetch('/api/users/clearusers', { method: 'delete' }).then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Limpieza realizada',
            text: 'Los usuarios que llevaban mas de dos dias sin conectarse han sido eliminados',
            timer: 3000,
            showConfirmButton: false,
          });
          setTimeout(() => {
              location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'No se pudo realizar la limpieza',
          });
        }
      });
    }
  });
});
