// const db = firebase.firestore();
var storage = firebase.storage();
var storageRef = storage.ref();

(function () {
  storageRef
    .child("06b3FMA.jpg")
    .getDownloadURL()
    .then((url) => {
      console.log("downloaded");
      // `url` is the download URL for 'images/stars.jpg'

      // // This can be downloaded directly:
      // var xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   var blob = xhr.response;
      // };
      // xhr.open('GET', url);
      // xhr.send();

      // Or inserted into an <img> element
      var img = document.getElementById("myimg");
      console.log(img);
      img.setAttribute("src", url);
    })
    .catch((error) => {
      // Handle any errors
    });
})();
const create_contest = (event) => {
  event.preventDefault();
  const name = document.getElementById("contestname").value;
  const creater = document.getElementById("creater").value;
  const lang = document.getElementById("lang").value;
  const desc = document.getElementById("desc").value;
  const start_date = document.getElementById("start_date").value;
  const end_date = document.getElementById("end_date").value;
  // const contestfile = document.getElementById("file").value;
  const contestdata = {
    name: name,
    creater: creater,
    lang: lang.split(","),
    desc: desc,
    start_date: start_date,
    end_date: end_date,
  };

  console.log(contestdata);
  db.collection("contests")
    .add(contestdata)
    .then((res) => {
      console.log(" res", res);
      alert("contest created Successfully");
      window.location.href = "live_contest.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, ":", errorMessage);
    });
};
