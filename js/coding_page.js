(function () {
  let practiceImg = localStorage.getItem("practice");
  if (practiceImg) {
    document.getElementById("practiceOrContest");
    document.getElementById("contest_name").innerText = "Practice Question";
    document.getElementById(
      "contest_desc"
    ).innerHTML = `<img src=${practiceImg} width="470px" height="270px">`;
  } else {
    const contest_name = localStorage.getItem("contest_name");
    contestsRef = firebase.firestore().collection("contests");
    contest = contestsRef
      .where("name", "==", contest_name)
      .get()
      .then((snapshot) => {
        snapshot?.docs?.filter((d) => {
          console.log(d.data());
          document.getElementById("contest_name").innerText = d.data().name;
          document.getElementById("contest_desc").innerText = d.data().desc;
          document.getElementById(
            "submitBtn"
          ).innerHTML = `<button onclick="saveToDB()" class="btn btn-primary">Submit Your Code</button>`;
        });
      });
  }
})();
const clearStorage = () => {
  localStorage.clear();
};
window.onbeforeunload = clearStorage;
