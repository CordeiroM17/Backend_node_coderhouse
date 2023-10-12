let btnUsersClear = document.querySelector('.usersClear');
let btnUserDelete = document.querySelectorAll('.btn-delete');

btnUsersClear.addEventListener('click', () => {
  Swal.fire({
    icon: 'warning',
    title: 'Do you want to clean users?',
    text: 'Users who have not connected for more than two days will be deleted.',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'Yes, clear users!',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed) {
      return fetch('/api/users/clearusers', { method: 'delete' }).then((response) => {
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Cleaning done',
            text: 'Users who had not logged in for more than two days have been eliminated',
            timer: 3000,
            allowOutsideClick: false,
            showConfirmButton: false,
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Cleaning could not be performed',
          });
        }
      });
    }
  });
});

for (let btn of btnUserDelete) {
  btn.addEventListener('click', () => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete this user?',
      text: `You are going to delete the user ${btn.value}`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete user!',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        return fetch(`/api/users/${btn.id}`, { method: 'delete' }).then((response) => {
          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'User deleted',
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
              title: 'Cleaning could not be performed',
            });
          }
        });
      }
    });
  });
}
