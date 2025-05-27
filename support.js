function sendMessage(event) {
  event.preventDefault();
  const msg = document.getElementById("responseMsg");
  msg.textContent = "✅ Спасибо! Ваше сообщение отправлено.";
  msg.style.color = "green";
}

function submitComplaint(event) {
  event.preventDefault();
  const msg = document.getElementById("complaintMsg");
  msg.textContent = "✅ Ваша жалоба успешно зарегистрирована.";
  msg.style.color = "darkred";
}
