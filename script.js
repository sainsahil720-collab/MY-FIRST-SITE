const BUSINESS_WHATSAPP_NUMBER = "15551234567"; // Replace with business number in international format.

const form = document.querySelector("#bookingForm");
const statusMessage = document.querySelector("#statusMessage");
const dateInput = document.querySelector("#bookingDate");

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const minDate = `${yyyy}-${mm}-${dd}`;

if (dateInput) {
  dateInput.setAttribute("min", minDate);
}

if (form) {
  // Ensure nothing is accidentally disabled by stale attributes.
  const interactiveElements = form.querySelectorAll("input, select, textarea, button");
  interactiveElements.forEach((field) => {
    field.disabled = false;
    field.removeAttribute("aria-disabled");
    field.style.pointerEvents = "auto";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      statusMessage.textContent = "Please fill in all required fields.";
      form.reportValidity();
      return;
    }

    const data = new FormData(form);
    const payload = {
      name: data.get("fullName")?.toString().trim(),
      phone: data.get("phone")?.toString().trim(),
      email: data.get("email")?.toString().trim() || "Not provided",
      service: data.get("service")?.toString().trim(),
      date: data.get("bookingDate")?.toString().trim(),
      time: data.get("bookingTime")?.toString().trim(),
      notes: data.get("notes")?.toString().trim() || "No additional notes",
    };

    const message = [
      "*New Booking Request*",
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      `Email: ${payload.email}`,
      `Service: ${payload.service}`,
      `Preferred Date: ${payload.date}`,
      `Preferred Time: ${payload.time}`,
      `Notes: ${payload.notes}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    statusMessage.textContent = "Opening WhatsApp…";
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}
