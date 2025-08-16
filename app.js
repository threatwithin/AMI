const dataset = [
  { text: "They don’t want you to know this!", label: 1 },
  { text: "Share before they delete it!", label: 1 },
  { text: "Drink water and stretch.", label: 0 },
  { text: "Touch grass today.", label: 0 },
  { text: "Wake up before it’s too late!", label: 1 },
  { text: "Remember to call your mom.", label: 0 }
];

let index = 0;
let correct = 0;
let mistakes = [];

const card = document.getElementById("card");
const summary = document.getElementById("summary");
const loading = document.getElementById("loading");
const memeText = document.getElementById("memeText");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");
const scoreLine = document.getElementById("scoreLine");
const mistakeList = document.getElementById("mistakes");

function showItem() {
  if (index >= dataset.length) return endSession();
  const item = dataset[index];
  memeText.textContent = item.text;
  feedback.textContent = "";
  progress.textContent = `${index + 1} / ${dataset.length}`;
  card.classList.remove("hidden");
  loading.classList.add("hidden");
}

function guess(isManip) {
  const item = dataset[index];
  const right = item.label === (isManip ? 1 : 0);
  if (right) {
    feedback.textContent = "✔ Correct";
    correct++;
  } else {
    feedback.textContent = "✘ Incorrect";
    mistakes.push(item.text);
  }
}

function nextItem() {
  index++;
  if (index < dataset.length) {
    showItem();
  } else {
    endSession();
  }
}

function endSession() {
  card.classList.add("hidden");
  summary.classList.remove("hidden");
  scoreLine.textContent = `You got ${correct} of ${dataset.length} correct.`;
  mistakeList.innerHTML = "";
  mistakes.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    mistakeList.appendChild(li);
  });
}

function restart() {
  index = 0; correct = 0; mistakes = [];
  summary.classList.add("hidden");
  showItem();
}

document.getElementById("btnManip").onclick = () => guess(true);
document.getElementById("btnBenign").onclick = () => guess(false);
document.getElementById("btnNext").onclick = nextItem;
document.getElementById("btnRestart").onclick = restart;

showItem();
