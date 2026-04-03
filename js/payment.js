(function () {
  "use strict";

  function renderPayOrder() {
    var Cart = window.MegaMartCart;
    var list = document.getElementById("payOrderList");
    var totalRow = document.getElementById("payOrderTotalRow");
    var totalEl = document.getElementById("payOrderTotal");
    if (!list) return;
    if (!Cart || Cart.getCart().length === 0) {
      list.innerHTML =
        '<p class="text-muted small mb-0">Your cart is empty. <a href="index.html" class="pay-inline-link">Continue shopping</a></p>';
      if (totalRow) totalRow.classList.add("d-none");
      return;
    }
    list.innerHTML = Cart.getCart()
      .map(function (line) {
        return (
          '<div class="pay-order-snippet">' +
          '<img src="' +
          line.image +
          '" alt="" />' +
          '<div><div class="name">' +
          line.name +
          '</div><div class="qty">(×' +
          line.qty +
          ")</div></div>" +
          '<div class="price">' +
          Cart.formatRupee(line.price * line.qty) +
          "</div></div>"
        );
      })
      .join("");
    if (totalEl) totalEl.textContent = Cart.formatRupee(Cart.subtotal());
    if (totalRow) totalRow.classList.remove("d-none");
  }

  document.addEventListener("DOMContentLoaded", renderPayOrder);

  var rows = document.querySelectorAll(".pay-card-row");
  var summaryBank = document.getElementById("summaryBank");
  var summaryLast4 = document.getElementById("summaryLast4");
  var summaryName = document.getElementById("summaryName");
  var summaryExpiry = document.getElementById("summaryExpiry");

  function selectRow(row) {
    rows.forEach(function (r) {
      r.classList.remove("selected");
      var rad = r.querySelector(".pay-card-radio");
      if (rad) rad.innerHTML = "";
    });
    row.classList.add("selected");
    var radio = row.querySelector(".pay-card-radio");
    if (radio) radio.innerHTML = '<i class="bi bi-check"></i>';

    if (summaryBank) summaryBank.textContent = row.dataset.bank || "";
    if (summaryLast4) summaryLast4.textContent = row.dataset.last4 || "";
    if (summaryName) summaryName.textContent = row.dataset.name || "";
    if (summaryExpiry) summaryExpiry.textContent = row.dataset.expiry || "";
  }

  rows.forEach(function (row) {
    row.addEventListener("click", function () {
      selectRow(row);
    });
    row.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectRow(row);
      }
    });
  });

})();
