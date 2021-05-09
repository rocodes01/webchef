const auth = firebase.auth();
const sendResetEmail = () => {
  const resetEmail = document.getElementById("resetEmail").value;
  //   console.log(resetEmail);
  auth
    .sendPasswordResetEmail(resetEmail)
    .then(function () {
      alert("Please Check Your mail");
      window.location.href = "index.html";
    })
    .catch(function (error) {
      alert("Error sending mail.Please Try Again Later!");
    });
};
