import Notiflix from 'notiflix';

const form = document.querySelector('form');
const submit = document.querySelector('button[type="submit"]');
form.addEventListener("submit", handleSubmitForm);

function handleSubmitForm(event) {
    event.preventDefault();
    const firstDelay = +document.querySelector('input[name="delay"]').value;
    const stepDelay = +document.querySelector('input[name="step"]').value;
    const amount = +document.querySelector('input[name="amount"]').value;

    for (let position = 1; position <= amount; position++) {
        const promise = createPromise(position, firstDelay + (position - 1) * stepDelay);
        promise.
            then(Notiflix.Notify.success).
            catch(Notiflix.Notify.failure).
            finally(() => {
                if (position === amount) {
                    submit.disabled = false;
                }
            })
    }
}

function createPromise(position, delay) {
    submit.disabled = true;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shouldResolve = Math.random() > 0.3;
            if (shouldResolve) {
                resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
            } else {
                reject(`❌ Rejected promise ${position} in ${delay}ms`);
            }
        }, delay);
    });
}
