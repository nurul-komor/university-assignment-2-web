(function () {
  "use strict";

  var sidebar = document.getElementById("adminSidebar");
  var toggle = document.getElementById("sidebarToggle");
  var backdrop = document.getElementById("sidebarBackdrop");

  function closeSidebar() {
    sidebar?.classList.remove("show");
    backdrop?.classList.remove("show");
  }

  toggle?.addEventListener("click", function () {
    sidebar?.classList.toggle("show");
    backdrop?.classList.toggle("show");
  });

  backdrop?.addEventListener("click", closeSidebar);

  window.addEventListener("resize", function () {
    if (window.matchMedia("(min-width: 992px)").matches) {
      closeSidebar();
    }
  });

  var lineEl = document.getElementById("ordersLineChart");
  if (lineEl && typeof Chart !== "undefined") {
    new Chart(lineEl, {
      type: "line",
      data: {
        labels: ["6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
        datasets: [
          {
            label: "May 21",
            data: [12, 19, 15, 25, 22, 30, 28, 24],
            borderColor: "#94a3b8",
            backgroundColor: "transparent",
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: "May 22",
            data: [18, 24, 22, 34, 32, 38, 34, 34],
            borderColor: "#00a1e4",
            backgroundColor: "rgba(0, 161, 228, 0.08)",
            fill: true,
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#0f172a",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            position: "top",
            align: "end",
            labels: { usePointStyle: true, boxWidth: 8 },
          },
          tooltip: {
            backgroundColor: "#0f172a",
            titleColor: "#fff",
            bodyColor: "#e2e8f0",
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              title: function (items) {
                var i = items[0];
                return i ? i.parsed.y + " Orders — May 22, " + i.label : "";
              },
              label: function () {
                return "";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#f1f5f9" },
            ticks: { color: "#94a3b8", font: { size: 11 } },
          },
          x: {
            grid: { display: false },
            ticks: { color: "#94a3b8", font: { size: 11 } },
          },
        },
      },
    });
  }

  var barEl = document.getElementById("salesBarChart");
  if (barEl && typeof Chart !== "undefined") {
    new Chart(barEl, {
      type: "bar",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [1200, 1900, 2525, 1800, 2100, 2400, 1600],
            backgroundColor: "#22c55e",
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (ctx) {
                return (
                  "$" +
                  ctx.parsed.y.toLocaleString()
                );
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: "#f1f5f9" },
            ticks: {
              color: "#94a3b8",
              callback: function (v) {
                return v >= 1000 ? v / 1000 + "k" : v;
              },
            },
          },
          x: { grid: { display: false }, ticks: { color: "#94a3b8" } },
        },
      },
    });
  }
})();
