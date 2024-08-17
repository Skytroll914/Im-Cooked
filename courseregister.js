document.addEventListener('DOMContentLoaded', function () {
  var modal1 = new bootstrap.Modal(document.getElementById('exampleModalToggle'), {
    backdrop: true // Ensure backdrop is active
  });
  var modal2 = new bootstrap.Modal(document.getElementById('exampleModalToggle2'));

  modal1.show();

  document.getElementById('exampleModalToggle').addEventListener('click', function (event) {
    if (event.target === this) {
      // Redirect to another HTML page when clicking outside the modal
      window.location.href = 'store.html';
    }
  });

  document.getElementById('closeToNav').addEventListener('click', function () {
    window.location.href = 'store.html';
  });

  document.getElementById('closeToNav2').addEventListener('click', function () {
    window.location.href = 'store.html';
  });

  document.querySelector('.btn-primary').addEventListener('click', function () {
    var form = document.querySelector('.needs-validation');

    if (form.checkValidity()) {
      // If form is valid, show the second modal
      modal1.hide();
      modal2.show();
    } else {
      // Prevent modal from toggling and add validation styles
      form.classList.add('was-validated');
    }
  });

  // Example starter JavaScript for disabling form submissions if there are invalid fields
  (() => {
    'use strict';

    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add('was-validated');
      }, false);
    });
  })();
});