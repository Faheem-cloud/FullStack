const form = document.getElementById("studentForm");
const vtu = document.getElementById("vtu");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const vtuErr = document.getElementById("vtuErr");
const emailErr = document.getElementById("emailErr");
const phoneErr = document.getElementById("phoneErr");
const successMsg = document.getElementById("successMsg");
const clearBtn = document.getElementById("clearBtn");

// Regex patterns
const vtuPattern = /^VTU\d{5}$/i;         // VTU + 5 digits
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[6-9]\d{9}$/;      // Indian mobile style (starts 6-9, total 10 digits)

function setError(el, msg) {
  el.textContent = msg;
}
function clearErrors() {
  setError(vtuErr, "");
  setError(emailErr, "");
  setError(phoneErr, "");
  successMsg.style.display = "none";
  successMsg.textContent = "";
}

function validate() {
  clearErrors();
  let ok = true;

  const vtuVal = vtu.value.trim().toUpperCase();
  const emailVal = email.value.trim();
  const phoneVal = phone.value.trim();

  if (!vtuVal) { setError(vtuErr, "VTU number is required."); ok = false; }
  else if (!vtuPattern.test(vtuVal)) { setError(vtuErr, "Invalid VTU format. Example: VTU24988"); ok = false; }

  if (!emailVal) { setError(emailErr, "Email is required."); ok = false; }
  else if (!emailPattern.test(emailVal)) { setError(emailErr, "Invalid email format."); ok = false; }

  if (!phoneVal) { setError(phoneErr, "Phone number is required."); ok = false; }
  else if (!phonePattern.test(phoneVal)) { setError(phoneErr, "Enter a valid 10-digit phone number."); ok = false; }

  return ok;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validate()) {
    // Save (demo) – localStorage
    const data = {
      vtu: vtu.value.trim().toUpperCase(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      savedAt: new Date().toISOString()
    };
    localStorage.setItem("student_details", JSON.stringify(data));

    successMsg.style.display = "block";
    successMsg.textContent = "✅ Submitted successfully! Data saved in browser (localStorage).";
    form.reset();
  }
});

clearBtn.addEventListener("click", () => {
  clearErrors();
  form.reset();
});
