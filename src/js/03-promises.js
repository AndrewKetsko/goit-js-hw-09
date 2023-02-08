import { Notify } from 'notiflix/build/notiflix-notify-aio';


formEl = document.querySelector('form');

formEl.addEventListener('submit', submitFn);


function submitFn(e) {
  e.preventDefault();
  const { elements: {delay, step, amount} } = e.currentTarget;
  
  console.log(delay.value);
  console.log(step.value);
  console.log(amount.value);

  createPromise(amount.value, delay.value)
    .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
  })
    .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
    })
    .finally(() => {
      
    })
    ;
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

