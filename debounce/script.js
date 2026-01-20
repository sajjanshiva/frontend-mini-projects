let normal=0;
let debounceCount=0;
let throttleCount=0;

document.getElementById('normalBtn').addEventListener('click', ()=> {
  normal++;
  document.getElementById('normalCount').textContent=normal;
})


function debounce(fn, delay){
  let timer;

  return function(){
    clearTimeout(timer);
    timer=setTimeout(fn, delay);
  }
}


const debouncedClick = debounce( ()=> {
    debounceCount++;
    document.getElementById('debounceCount').textContent=debounceCount;
},1000)


document.getElementById("debounceBtn").addEventListener('click',debouncedClick)



function throttle(fn, delay){
  let lastTime=0;

  return function(){

  const now=Date.now();
  if(now-lastTime >= delay){
    lastTime=now;
    fn();
  }

  }

}


const throttledClick = throttle( ()=> {
    throttleCount++;
    document.getElementById('throttleCount').textContent=throttleCount;
},1000)


document.getElementById("throttleBtn").addEventListener('click',throttledClick)
