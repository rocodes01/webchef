const auth = firebase.auth();
let resetEmail = "";
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.email);
    resetEmail = user.email;
  } else {
    // No user is signed in.
    console.log("Not logged in");
  }
});

var OSName = "Unknown OS";
if (navigator.appVersion.indexOf("Win") != -1) OSName = "Windows";
if (navigator.appVersion.indexOf("Mac") != -1) OSName = "MacOS";
if (navigator.appVersion.indexOf("X11") != -1) OSName = "UNIX";
if (navigator.appVersion.indexOf("Linux") != -1) OSName = "Linux";
document.getElementById("Browser").innerText = "OS: " + OSName;
// alert(window.platform.os);

navigator.sayswho = (function () {
  var N = navigator.appName,
    ua = navigator.userAgent,
    tem;
  var M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  if (M && (tem = ua.match(/version\/([\.\d]+)/i)) != null) M[2] = tem[1];
  M = M ? [M[1], M[2]] : [N, navigator.appVersion, "-?"];
  return M;
})();

var browser_version = navigator.sayswho;
// console.log(browser_version);
document.getElementById("OS").innerText =
  "Browser: " + browser_version[0] + " v" + browser_version[1].slice(0, 7);

const sendResetEmail = () => {
  console.log(resetEmail);
  auth
    .sendPasswordResetEmail(resetEmail)
    .then(function () {
      alert("Please Check Your mail");
      //   window.location.href = "index.html";
    })
    .catch(function (error) {
      alert("Error sending mail.Please Try Again Later!");
    });
};
