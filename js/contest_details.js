(function () {
  const contest_name = localStorage.getItem("contest_name");
  contestsRef = firebase.firestore().collection("contests");
  contest = contestsRef
    .where("name", "==", contest_name)
    .get()
    .then((snapshot) => {
      snapshot?.docs?.filter((d) => {
        //   d.name == contest_name;
        console.log(d.data());
        document.getElementById("contest_name").innerText = d.data().name;
        document.getElementById("contest_desc").innerText = d.data().desc;
        document.getElementById("contest_creater").innerText = d.data().creater;
        document.getElementById(
          "start_date"
        ).innerText = d.data().start_date.toDate();
        document.getElementById(
          "end_date"
        ).innerText = d.data().end_date.toDate();

        // show Submissions here

        let subs = d.data().submissions.map((e) => {
          return `
          <tr>
          <td>1</td>
          <td><xmp>${e}</xmp></td>
          <td>${e}</td>
          </tr>
          `;
        });
        let subsVal = `<table class="table">
        <tr>
          <th>
            SR No.
          </th>
          <th>
            code
          </th>
          <th>
            OutPut
          </th>
        </tr>
        ${subs}
      </table>`;
        document.getElementById("subs").innerHTML = subsVal;
      });
    });
})();
