(function () {
  quizRef = firebase.firestore().collection("quiz");
  quiz = quizRef.get().then((snapshot) => {
    data = snapshot.docs.map((d) => {
      createCard(d.data());
    });
  });
})();
const divToInsert = document.getElementById("card_container");

const savetoLocal = (value) => {
  localStorage.setItem("contest_name", value);
  console.log(value);
  window.location.href = "contest_details.html";
};
const createCard = (data) => {
  console.log(data);
  let optArr = [data.correct, data.option_1, data.option_2, data.option_3];
  optArr.sort(() => 0.5 - Math.random());
  //   console.log(data);
  const createOptions = optArr.map((e) => {
    return `
      <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name=${e}
            value=${e}
          /><label
            class="form-check-label"
          >
            ${e}
          </label>
        </div>
      `;
  });
  const cardData = `
    <div class="row mt-2 ml-3">
    <div class="card col-lg-12">
      <div class="card-header">${data.question}</div>
      <div class="card-body">
       ${createOptions.join("")}
      </div>
    </div>
  </div>`;
  divToInsert.innerHTML += cardData;
};
