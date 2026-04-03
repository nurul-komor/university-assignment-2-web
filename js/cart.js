/**
 * MegaMart cart — sessionStorage + helpers for storefront & payment
 */
(function () {
  "use strict";

  var KEY = "megamart_cart";

  function getCart() {
    try {
      var raw = sessionStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function setCart(items) {
    sessionStorage.setItem(KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("megamart:cart-updated"));
  }

  function addItem(product) {
    var cart = getCart();
    var id = product.id;
    var idx = cart.findIndex(function (l) {
      return l.id === id;
    });
    var qty = product.qty || 1;
    if (idx >= 0) {
      cart[idx].qty += qty;
    } else {
      cart.push({
        id: id,
        name: product.name,
        price: product.price,
        priceDisplay: product.priceDisplay,
        image: product.image,
        qty: qty,
      });
    }
    setCart(cart);
  }

  function removeLine(id) {
    setCart(getCart().filter(function (l) {
      return l.id !== id;
    }));
  }

  function updateQty(id, qty) {
    var n = Math.max(0, parseInt(qty, 10) || 0);
    var cart = getCart();
    var line = cart.find(function (l) {
      return l.id === id;
    });
    if (!line) return;
    if (n === 0) {
      removeLine(id);
      return;
    }
    line.qty = n;
    setCart(cart);
  }

  function lineCount() {
    return getCart().reduce(function (s, l) {
      return s + l.qty;
    }, 0);
  }

  function subtotal() {
    return getCart().reduce(function (s, l) {
      return s + l.price * l.qty;
    }, 0);
  }

  function formatRupee(amount) {
    return "₹" + amount.toLocaleString("en-IN");
  }

  window.MegaMartCart = {
    getCart: getCart,
    setCart: setCart,
    addItem: addItem,
    removeLine: removeLine,
    updateQty: updateQty,
    lineCount: lineCount,
    subtotal: subtotal,
    formatRupee: formatRupee,
  };
})();
