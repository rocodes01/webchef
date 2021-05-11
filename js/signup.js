const db = firebase.firestore();
const showToast = (type, message) => {
  const toast = document.getElementById("toast");
  const toastBody = document.getElementById("toastBody");
  toastBody.innerText = message;
  toast.style.opacity = 1;
  type.classList.add("errorInput");
  setTimeout(() => {
    type.classList.remove("errorInput");
    toast.style.opacity = 0;
  }, 2000);
};
const signup = (event) => {
  event.preventDefault();
  const email = document.getElementById("InputEmail");
  const password = document.getElementById("InputPassword");
  const repassword = document.getElementById("RepeatPassword");
  const usertype = document.getElementById("usertype");
  const first = document.getElementById("FirstName");
  const last = document.getElementById("LastName");
  console.log(email.value, password.value, usertype.value);
  const userdata = {
    name: `${first.value} ${last.value}`,
    email: email.value,
    role: Number(usertype.value),
  };
  console.log(userdata);
  if (!email.value.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
    showToast(email, "email format Not Valid");
  } else if (first.value.length <= 2) {
    showToast(first, "First name Should be greater than 2 characters");
  } else if (last.value.length <= 2) {
    showToast(last, "Last name Should be greater than 2 characters");
  } else if (isNaN(usertype.value)) {
    showToast(usertype, "Please Select a User Type");
  } else if (password.value.length < 6) {
    showToast(password, "Password Length cannot be less than 6");
  } else if (password.value != repassword.value) {
    showToast(repassword, "Passwords Do not match");
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        var user = userCredential.user;
        db.collection("users")
          .doc(user.uid)
          .set(userdata)
          .then((res) => {
            console.log(" res", res);

            window.location.href = "index.html";
          });
        console.log(user.uid);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
        console.log(errorCode, ":", errorMessage);
      });
  }
};
