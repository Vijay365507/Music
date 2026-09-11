// payments.js
// Expects a plan to have been chosen on premium.html and stored as "selectedPlan"
// in localStorage, e.g. { name: "Premium", price: 99, period: "month" }

function loadOrderSummary() {
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  const nameEl = document.getElementById("summaryPlanName");
  const priceEl = document.getElementById("summaryPlanPrice");

  if (!plan) {
    if (nameEl) nameEl.textContent = "No plan selected";
    if (priceEl) priceEl.textContent = "";
    return;
  }

  if (nameEl) nameEl.textContent = plan.name + " Plan";
  if (priceEl) priceEl.textContent = `₹${plan.price} / ${plan.period}`;
}

function handlePayment(event) {
  event.preventDefault();

  const cardName = document.getElementById("cardName").value.trim();
  const cardNumber = document.getElementById("cardNumber").value.trim();
  const expiry = document.getElementById("cardExpiry").value.trim();
  const cvv = document.getElementById("cardCVV").value.trim();
  const errorMsg = document.getElementById("paymentError");

  if (!cardName || !cardNumber || !expiry || !cvv) {
    errorMsg.textContent = "Please fill in all payment fields.";
    errorMsg.style.display = "block";
    return;
  }

  if (cardNumber.length < 12) {
    errorMsg.textContent = "Please enter a valid card number.";
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  // Update current user's plan (dummy/local practice only, no real payment)
  const plan = JSON.parse(localStorage.getItem("selectedPlan"));
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && plan) {
    currentUser.plan = plan.name;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(u => u.email === currentUser.email ? { ...u, plan: plan.name } : u);
    localStorage.setItem("users", JSON.stringify(users));
  }

  // Save a simple order record
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push({
    plan: plan ? plan.name : "Unknown",
    price: plan ? plan.price : 0,
    date: new Date().toLocaleDateString(),
    status: "Success"
  });
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Payment successful! Your plan has been activated.");
  window.location.href = "profile.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadOrderSummary();
  const form = document.getElementById("paymentForm");
  if (form) form.addEventListener("submit", handlePayment);
});