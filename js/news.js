const newsContainer = document.getElementById("news-container");

let newsdata = [];
(function () {
  fetch("https://dev.to/api/articles", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      createCard(data);
    })
    .catch((err) => {
      console.error(err);
    });
})();

const createCard = (data) => {
  let news = data.map((e) => {
    return `<div className="card">
        <div className="card-title">
          <ul>
          <li><a href="${e.url}" target="_blank">${e.title}</a></li>
          </ul>
        </div>
      </div>`;
  });
  news.map((e) => {
    newsContainer.innerHTML += e;
  });
};
