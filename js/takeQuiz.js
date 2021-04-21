(function () {
  quizRef = firebase.firestore().collection("quiz");
  quizRef.get().then((snapshot) => {
    snapshot.docs.map((d) => {
      createCard(d.data());
    });
  });
})();
const divToInsert = document.getElementById("card_container");
let correctOptionsArr = [];
const savetoLocal = (value) => {
  localStorage.setItem("contest_name", value);
  console.log(value);
  window.location.href = "contest_details.html";
};

// It's just a hack solution to check correct answer
// If any question has option which is correct answer in another question
// then it will give false answer::correct it later
const checkAnswer = (event) => {
  const { value } = event.target;
  correctOptionsArr.includes(value) ? alert("right Answer") : "";
};

const createCard = (data) => {
  console.log(data);
  correctOptionsArr.push(data.correct);
  let optArr = [data.correct, data.option_1, data.option_2, data.option_3];
  optArr.sort(() => 0.5 - Math.random());
  //   console.log(data);
  const createOptions = optArr.map((e, i) => {
    return `
      <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="options"
            value=${e}
            id="option_${i}"
            onclick="checkAnswer(event)"
          /><label
            class="form-check-label"
            for="option_${i}"
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
  console.log(correctOptionsArr);
};
