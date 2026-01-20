const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const resetBtn = document.getElementById("reset");

const stepTitle = document.getElementById("stepTitle");
const stepDescription = document.getElementById("stepDescription");

let currentStep = 1;

const stepData = [
  { title: "Account", desc: "Create your account credentials to get started." },
  { title: "Profile", desc: "Add basic profile information for personalization." },
  { title: "Details", desc: "Provide additional details to complete setup." },
  { title: "Complete", desc: "Your account setup is complete 🎉" }
];

nextBtn.addEventListener('click', () => {
  currentStep++;
  if (currentStep > circles.length) {
    currentStep = circles.length;
  }
  updateUI();
});

prevBtn.addEventListener('click', () => {
  currentStep--;
  if (currentStep < 1) {
    currentStep = 1;
  }
  updateUI();
});

resetBtn.addEventListener('click', () => {
  currentStep = 1;
  updateUI();
});

function updateUI() {
  circles.forEach((circle, index) => {
    if (index < currentStep) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  progress.style.width =
    ((currentStep - 1) / (circles.length - 1)) * 100 + "%";

  stepTitle.textContent = stepData[currentStep - 1].title;
  stepDescription.textContent = stepData[currentStep - 1].desc;

  prevBtn.disabled = currentStep === 1;
  nextBtn.disabled = currentStep === circles.length;
}
