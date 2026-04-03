(function () {
  "use strict";

  var form = document.querySelector(".mm-auth-card form");
  var p1 = document.getElementById("regPassword");
  var p2 = document.getElementById("regPassword2");

  if (!form || !p1 || !p2) {
    return;
  }

  function syncValidity() {
    if (p2.value && p1.value !== p2.value) {
      p2.setCustomValidity("Passwords do not match");
    } else {
      p2.setCustomValidity("");
    }
  }

  p1.addEventListener("input", syncValidity);
  p2.addEventListener("input", syncValidity);

  form.addEventListener("submit", function () {
    syncValidity();
  });
})();
