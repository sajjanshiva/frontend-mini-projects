const statusText =document.getElementById("status");
// Status text change
document.getElementById("statusBtn").onclick = function () {
  // logic missing
   statusText.innerText="Status: Active";
};

// Show / Hide text
document.getElementById("toggleTextBtn").onclick = function () {
  let text = document.getElementById("infoText");
  // incomplete toggle logic

  if(text.style.display === 'none'){
    text.style.display='block'
  }else{
    text.style.display='none';
  }

  // OR text.classList.toggle("hidden");

};

// Theme toggle
document.getElementById("themeBtn").onclick = function () {
  // should toggle dark-theme class
  document.body.classList.toggle('dark-theme');
   
};

// Live input display + enable button
let nameInput = document.getElementById("nameInput");
let liveOutput = document.getElementById("liveOutput");

nameInput.addEventListener('keyup', ()=>{
    liveOutput.innerText=nameInput.value;
})

// Character counter
document.getElementById("messageBox").addEventListener("input", function () {
  // missing logic
  let charCount=document.getElementById("charCount");
  let TextLength=this.value.length;
  charCount.innerText=`characters: ${TextLength}`
});

// Toggle password
document.getElementById("togglePassword").onclick = function () {
  // missing logic
  let input = document.getElementById("passwordInput");
  if(input.type === "password"){
    input.type="text";
    this.innerText="hide";   //this refers to togglePassword
  }else{
    input.type="password";
    this.innerText="show"; 
  }
};

// Counter logic
let count = 0;
 let countVal=document.getElementById("countValue");
document.getElementById("plusBtn").onclick = function () {
  // increment logic
  count++;
  countVal.innerText=count;
};

document.getElementById("minusBtn").onclick = function () {
  // decrement logic (should not go below 0)
  if(count > 0)
    count--;
   countVal.innerText=count;   //dont use count++ here  ...it will set as count first the....++  happens
};

// Image toggle
document.getElementById("imageBtn").onclick = function () {
  let img = document.getElementById("sampleImage");
  // missing show/hide logic
// If image is currently visible OR no inline style yet
  if (img.style.display === "" || img.style.display === "block") {
    img.style.display = "none";
  } else {
    img.style.display = "block";
  }
};
