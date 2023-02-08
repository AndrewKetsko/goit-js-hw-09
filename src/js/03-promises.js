import { Notify } from 'notiflix/build/notiflix-notify-aio';
formEl = document.querySelector('form');
buttonEl = document.querySelector('button');

formEl.addEventListener('submit', submitFn);

function submitFn(e) {
  e.preventDefault();
  buttonEl.classList.add('disable')
  const { elements: {delay, step, amount} } = e.currentTarget;
  
  // console.log(+delay.value);
  // console.log(+step.value);
  // console.log(+amount.value);

  let fullDelay = +delay.value;
  
  for (i = 0; i < amount.value; i += 1) {

    fullDelay = +delay.value + step.value * i; 
    
    createPromise(i+1, fullDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
      });
  }
};


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
  if (shouldResolve) {
    resolve({ position, delay });
  } else {
    reject({ position, delay });
  }
  }, delay);
   });
 };

