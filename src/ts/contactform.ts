/* ********** PAGE ELEMENTS ********** */

const btnContact = document.getElementById("btn-contact")! as HTMLButtonElement;
const modalFormContainer = document.getElementById("modal-form-wrapper");
const submitErrorMsg = document.getElementById("submit-error") as HTMLSpanElement;
const contactEmail = document.getElementById("email-field") as HTMLInputElement;
const contactMessage = document.getElementById("message-field") as HTMLTextAreaElement;
const contactLengthFeedback = document.getElementById("message-length") as HTMLSpanElement;
const contactCancel = document.getElementById("form-cancel") as HTMLButtonElement;
const contactSubmit = document.getElementById("form-submit") as HTMLButtonElement;
const modalContactOverlay = document.getElementById("modal-contact-overlay");

/* ********** LOGIC CONST AND VARIABLES ********** */

let isEmailValid = false;
let isMessageValid = false;
const messageLengthRange = {
    min: 10,
    max: 1000
}

const regPattern = {
    email: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/
}

const formAction = "https://formspree.io/f/mrgwzovb";

/* ********** EVENT LISTENERS ********** */
btnContact.addEventListener("click", openContactModal);
contactMessage.addEventListener("input", displayCurrentLength);
contactCancel.addEventListener("click", closeContactModal);
contactSubmit.addEventListener("click", handleSubmit);

/* ********** FUNCTIONS ********** */
function verifyEmail() {
    isEmailValid = regPattern.email.test(contactEmail.value);
}

function verifyMessage() {
    isMessageValid = (contactMessage.value.length >= messageLengthRange.min && contactMessage.value.length <= messageLengthRange.max);
}

function displayCurrentLength() {
    let currentlength = contactMessage.value.length;
    let message = "";

    if (currentlength < messageLengthRange.min) {
        message = "veuillez écrire au moins 10 caractères."
        contactLengthFeedback.classList.add("error");
    } else if (currentlength >= messageLengthRange.min && currentlength <= messageLengthRange.max) {
        message = currentlength + "/" + messageLengthRange.max
        if (contactLengthFeedback.classList.contains("error")) { contactLengthFeedback.classList.remove("error") }
    } else {
        message = currentlength + "/" + messageLengthRange.max
        contactLengthFeedback.classList.add("error");
    }
    contactLengthFeedback.textContent = message;
}

function openContactModal() {
    displayCurrentLength();
    modalFormContainer?.classList.remove("hidden");
    modalContactOverlay?.classList.remove("hidden");
}

function closeContactModal() {
    modalFormContainer?.classList.add("hidden");
    modalContactOverlay?.classList.add("hidden");
    contactMessage.value = ""
    contactEmail.value = "";
    contactMessage.value = "";
    isEmailValid = false;
    isMessageValid = false;
}

function getRequestBody() {
    return {
        email: contactEmail.value,
        message: contactMessage.value
    }
}

async function handleSubmit() {
    verifyEmail();
    verifyMessage();

    if (isEmailValid && isMessageValid) {
        fetch(formAction, {
            method: "POST",
            body: JSON.stringify(getRequestBody()),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("le message a bien été envoyé");
                closeContactModal();
            } else {
                alert("une erreur a eu lieu durant la transmission de l'email via formspree")
            }
        }).catch(error => {
            alert("une erreur a eu lieu durant la transmission de l'email via formspree")
        });
    } else {
        if (!isEmailValid && !isMessageValid) {
            submitErrorMsg.textContent = "Le format de l'email est incorrect et le message ne satisfait pas la longueur attendue";
        }
        else if (!isEmailValid) {
            submitErrorMsg.textContent = "Le format de l'email est incorrect";
        }
        else {
            if (contactMessage.value.length < messageLengthRange.min) {
                submitErrorMsg.textContent = "Le message est trop court";
            } else if (contactMessage.value.length > messageLengthRange.max) {
                submitErrorMsg.textContent = "Le message est trop long";
            }
        }
        submitErrorMsg.classList.remove("transparent");
        setTimeout(() => {
            submitErrorMsg.classList.add("transparent")
        }, 5000);
    }
}