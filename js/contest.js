// const db = firebase.firestore();

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
