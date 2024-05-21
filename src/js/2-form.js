
//  скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.



const STORAGE_KEY = "feedback-form";

const form = document.querySelector(".feedback-form");
const textareas = form.querySelectorAll("textarea, input[name='email']");

form.addEventListener("submit", handleSubmit);
textareas.forEach(textarea => textarea.addEventListener("input", handleInput));
populateTextarea();

function handleSubmit(event) {
    event.preventDefault();

    const { email, message } = event.target.elements;
    const emailValue = email.value;
    const messageValue = message.value;

    console.log({
        email: emailValue,
        message: messageValue
    });

    event.target.reset();
    localStorage.removeItem(STORAGE_KEY);
} 

function handleInput(event) {
    const formData = {};
    let allFieldsFilled = true;

    textareas.forEach(textarea => {
        formData[textarea.name] = textarea.value;
        if (!textarea.value.trim()) {
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled) {
        alert('Пожалуйста, заполните все поля.');
        return; // Прекращаем выполнение функции, если есть пустые поля
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        if (email) form.elements.email.value = email;
        if (message) form.elements.message.value = message;
    }
}

