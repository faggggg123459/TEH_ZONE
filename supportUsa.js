function sendMessage(event) {
  event.preventDefault();
  const msg = document.getElementById("responseMsg");
  msg.textContent = "✅ Thank you! Your message has been sent.";
  msg.style.color = "green";
}

function submitComplaint(event) {
  event.preventDefault();
  const msg = document.getElementById("complaintMsg");
  msg.textContent = "✅ Your complaint has been successfully registered.";
  msg.style.color = "darkred";
}
