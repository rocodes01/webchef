const contest_naam = localStorage.getItem("contest_name");
let contestsRef = firebase.firestore().collection("contests");
let practiceOrContest = document.getElementById("practiceOrContest");
let refId;
contestsRef
  .where("name", "==", contest_naam)
  .get()
  .then((snapshot) => {
    refId = snapshot?.docs[0].id;
  });
let htmlcode = "";
let csscode = "";
const updatecontentCss = (val) => {
  csscode = val;
};
const updatecontentHtml = (val) => {
  htmlcode = val;
};

const saveToDB = () => {
  const finalCode = `<head>
      <style>
      ${csscode}
      </style>
      </head>
      <body>
      ${htmlcode}
      </body>
      `;
  if (!htmlcode || !csscode) {
    alert("write Some Code To Submit");
  } else {
    contestsRef.doc(refId).update({
      submissions: firebase.firestore.FieldValue.arrayUnion(finalCode),
    });
  }
};

const Studio = function () {
  /**
   ** If Argument Object is missing
   ** dom it will look for html
   ** css and js ids in the DOM
   */
  if ((arguments[0] && !arguments[0]["dom"]) || !arguments[0]) {
    this.dom = {
      html: document.getElementById("html"),
      css: document.getElementById("css"),
      js: document.getElementById("js"),
    };
  } else {
    this.dom = arguments[0]["dom"];
  }
  /**
   ** The Defaults Object can take in
   ** new options through its
   ** function
   */
  this.defaults = function (object) {
    var defs = {
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackes: true,
      theme: "panda-syntax",
    };
    if (object) {
      var key = Object.keys(object);
      for (var i = 0; i < key.length; i++) {
        defs[key[i]] = object[key[i]];
      }
    }
    return defs;
  };
  /**
   ** this.editor holds the creation
   ** and mounting of the CodeMirror
   ** editors.
   */
  this.editor = {
    html: CodeMirror(
      this.dom.html,
      this.defaults({
        mode: "text/html",
        value: "<h1>Write Your Code Here</h1>",
      })
    ),
    css: CodeMirror(
      this.dom.css,
      this.defaults({
        mode: "css",
        value: "body {\n\tcolor: red;\n}",
      })
    ),
    js: CodeMirror(
      this.dom.js,
      this.defaults({
        mode: "javascript",
        value: 'console.log("hi")',
      })
    ),
  };
};
/** Initialize Editors
 ** And load them to DOM
 */
const studio = new Studio({
  dom: {
    html: document.getElementById("html"),
    css: document.getElementById("css"),
    js: document.getElementById("js"),
  },
});
/**
 ** Messy Code That Sends The Updated
 ** Code From The Editors To The
 ** Iframe
 */
const liveRoom = document.getElementById("live");
liveRoom.contentWindow.document.body.innerHTML =
  "<h1>Write Your Code Here</h1>";
const style = document.createElement("style");
style.setAttribute("id", "style");
style.innerHTML = "body {color: red;}";

const script = document.createElement("script");
script.innerHTML = 'console.log("hi")';

liveRoom.contentWindow.document.head.appendChild(style);
liveRoom.contentWindow.document.head.appendChild(script);

CodeMirror.on(studio.editor.html, "change", function () {
  liveRoom.contentWindow.document.body.innerHTML = studio.editor.html.getValue();
  updatecontentHtml(studio.editor.html.getValue());
});
CodeMirror.on(studio.editor.css, "change", function () {
  liveRoom.contentWindow.document.getElementById(
    "style"
  ).innerHTML = studio.editor.css.getValue();
  updatecontentCss(studio.editor.css.getValue());
});
