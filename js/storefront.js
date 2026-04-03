(function () {
  "use strict";

  var Cart = window.MegaMartCart;
  if (!Cart) return;

  function readProductFromCard(el) {
    var root = el.closest("[data-product-id]");
    if (!root) return null;
    var d = root.dataset;
    var nameEl = root.querySelector(".mm-pname, .mm-ess-name");
    var imgEl = root.querySelector("img");
    return {
      id: d.productId,
      name: d.productName || (nameEl ? nameEl.textContent.trim() : ""),
      price: parseInt(d.productPrice, 10) || 0,
      priceDisplay: d.productPriceDisplay || Cart.formatRupee(parseInt(d.productPrice, 10) || 0),
      image: d.productImage || (imgEl ? imgEl.getAttribute("src") : "") || "",
      description:
        d.productDesc ||
        "Quality product backed by MegaMart. Fast delivery and easy returns on eligible items.",
    };
  }

  function refreshBadge() {
    var n = Cart.lineCount();
    document.querySelectorAll("[data-cart-count]").forEach(function (el) {
      el.textContent = n > 99 ? "99+" : String(n);
      el.classList.toggle("d-none", n === 0);
    });
  }

  function renderOffcanvas() {
    var list = document.getElementById("cartOffcanvasList");
    if (!list) return;
    var lines = Cart.getCart();
    if (!lines.length) {
      list.innerHTML =
        '<p class="text-muted small mb-0">Your cart is empty. Add items from the store.</p>';
      var foot = document.getElementById("cartOffcanvasFooter");
      if (foot) foot.classList.add("d-none");
      return;
    }
    var foot = document.getElementById("cartOffcanvasFooter");
    if (foot) foot.classList.remove("d-none");
    list.innerHTML = lines
      .map(function (line) {
        return (
          '<div class="mm-cart-line d-flex gap-2 align-items-start py-2 border-bottom" data-line-id="' +
          line.id +
          '">' +
          '<img src="' +
          line.image +
          '" alt="" class="rounded" width="56" height="56" style="object-fit:cover"/>' +
          '<div class="flex-grow-1 min-w-0">' +
          '<div class="small fw-semibold text-break">' +
          line.name +
          "</div>" +
          '<div class="small text-muted">' +
          line.priceDisplay +
          " × " +
          line.qty +
          "</div>" +
          '<button type="button" class="btn btn-link btn-sm text-danger p-0 mm-cart-remove" data-remove-id="' +
          line.id +
          '">Remove</button>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");
    var subEl = document.getElementById("cartSubtotal");
    if (subEl) subEl.textContent = Cart.formatRupee(Cart.subtotal());
  }

  function openProductModal(product) {
    var modalEl = document.getElementById("productDetailModal");
    if (!modalEl || !product) return;
    modalEl.querySelector(".mm-modal-img").src = product.image;
    modalEl.querySelector(".mm-modal-img").alt = product.name;
    modalEl.querySelector(".mm-modal-title").textContent = product.name;
    modalEl.querySelector(".mm-modal-desc").textContent = product.description;
    modalEl.querySelector(".mm-modal-price").textContent = product.priceDisplay;
    var was = modalEl.querySelector(".mm-modal-was");
    var save = modalEl.querySelector(".mm-modal-save");
    var root = document.querySelector('[data-product-id="' + product.id + '"]');
    if (root && root.dataset.productWas) {
      was.textContent = root.dataset.productWas;
      was.classList.remove("d-none");
    } else {
      was.classList.add("d-none");
    }
    if (root && root.dataset.productSave) {
      save.textContent = root.dataset.productSave;
      save.classList.remove("d-none");
    } else {
      save.classList.add("d-none");
    }
    var addBtn = modalEl.querySelector(".mm-modal-add");
    addBtn.dataset.addId = product.id;
    addBtn.onclick = function () {
      Cart.addItem(product);
      refreshBadge();
      renderOffcanvas();
      var modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (modalInstance) modalInstance.hide();
      var offcanvasEl = document.getElementById("cartOffcanvas");
      if (offcanvasEl) {
        var oc = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
        oc.show();
      }
    };
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  }

  document.addEventListener("DOMContentLoaded", function () {
    refreshBadge();
    renderOffcanvas();

    document.body.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest(".mm-btn-details")) {
        e.preventDefault();
        var product = readProductFromCard(t.closest(".mm-btn-details"));
        if (product && product.id) openProductModal(product);
      }
      if (t.closest(".mm-btn-add-cart")) {
        e.preventDefault();
        e.stopPropagation();
        var product = readProductFromCard(t.closest(".mm-btn-add-cart"));
        if (product && product.id) {
          Cart.addItem(product);
          refreshBadge();
          renderOffcanvas();
          var offcanvasEl = document.getElementById("cartOffcanvas");
          if (offcanvasEl) bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl).show();
        }
      }
      if (t.classList.contains("mm-cart-remove") || t.closest(".mm-cart-remove")) {
        var btn = t.classList.contains("mm-cart-remove") ? t : t.closest(".mm-cart-remove");
        var rid = btn.getAttribute("data-remove-id");
        if (rid) {
          Cart.removeLine(rid);
          refreshBadge();
          renderOffcanvas();
        }
      }
    });

    document.getElementById("cartOffcanvas")?.addEventListener("show.bs.offcanvas", renderOffcanvas);

    document.getElementById("btnCheckoutPayment")?.addEventListener("click", function () {
      if (Cart.lineCount() === 0) return;
      window.location.href = "payment.html";
    });

    window.addEventListener("megamart:cart-updated", function () {
      refreshBadge();
      renderOffcanvas();
    });
  });
})();
