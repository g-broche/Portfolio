/* ********** IMPORTS ********** */
import { Photo } from './interfaces/model';

/* ********** DATABASE AND HELPER FUNCTION********** */
const pathToImg = 'src/assets/pictures/';

function getImagePath(fileNamePattern: string): string {
    const imagePath = (pathToImg + fileNamePattern);
    return imagePath;
}

const PhotoCollection: Photo[] = [
    {
        id: 1,
        title: "Bee and sunflower",
        fileNames: {
            xsmall: getImagePath("bee-sunflower_160.webp"),
            small: getImagePath("bee-sunflower_240.webp"),
            medium: getImagePath("bee-sunflower_480.webp"),
            large: getImagePath("bee-sunflower_720.webp"),
        },
        tag: ["abeille", "tournesol"]
    },
    {
        id: 2,
        title: "Crabier chevelu",
        fileNames: {
            xsmall: getImagePath("crabier_160.webp"),
            small: getImagePath("crabier_240.webp"),
            medium: getImagePath("crabier_480.webp"),
            large: getImagePath("crabier_720.webp"),
        },
        tag: ["crabier"]
    },
    {
        id: 3,
        title: "Renard du soir",
        fileNames: {
            xsmall: getImagePath("fox_160.webp"),
            small: getImagePath("fox_240.webp"),
            medium: getImagePath("fox_480.webp"),
            large: getImagePath("fox_720.webp"),
        },
        tag: ["renard"]
    },
    {
        id: 4,
        title: "Hermine",
        fileNames: {
            xsmall: getImagePath("hermine_160.webp"),
            small: getImagePath("hermine_240.webp"),
            medium: getImagePath("hermine_480.webp"),
            large: getImagePath("hermine_720.webp"),
        },
        tag: ["hermine"]
    },
    {
        id: 5,
        title: "Libellule en vol",
        fileNames: {
            xsmall: getImagePath("libellule_160.webp"),
            small: getImagePath("libellule_240.webp"),
            medium: getImagePath("libellule_480.webp"),
            large: getImagePath("libellule_720.webp"),
        },
        tag: ["libellule"]
    },
    {
        id: 6,
        title: "Marmottes du Taillefer",
        fileNames: {
            xsmall: getImagePath("marmottes_160.webp"),
            small: getImagePath("marmottes_240.webp"),
            medium: getImagePath("marmottes_480.webp"),
            large: getImagePath("marmottes_720.webp"),
        },
        tag: ["marmottes"]
    },
];

/* ********** PAGE ELEMENTS ********** */

const pictureGrid = document.getElementById("picture-grid");
const btnContact = document.getElementById("btn-contact")! as HTMLButtonElement;

const modalPictureContainer = document.getElementById("modal-picture-container");
const modalPreviousButton = document.getElementById("modal-picture-previous");
const modalNextButton = document.getElementById("modal-picture-next");
const modalCloseButton = document.getElementById("modal-picture-close");
const modalPicture = document.getElementById("modal-picture-img");

const modalFormContainer = document.getElementById("modal-form-wrapper");

const submitErrorMsg = document.getElementById("submit-error") as HTMLSpanElement;
const contactForm = document.getElementById("contact-form") as HTMLFormElement;
const contactEmail = document.getElementById("email-field") as HTMLInputElement;
const contactMessage = document.getElementById("message-field") as HTMLTextAreaElement;
const contactLengthFeedback = document.getElementById("message-length") as HTMLSpanElement;
const contactCancel = document.getElementById("form-cancel") as HTMLButtonElement;
const contactSubmit = document.getElementById("form-submit") as HTMLButtonElement;

const modalPhotoOverlay = document.getElementById("modal-photo-overlay");
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

modalCloseButton?.addEventListener("click", hideModalPictureContainer);
modalPhotoOverlay?.addEventListener("click", hideModalPictureContainer);

modalNextButton?.addEventListener("click", toNextPhoto);
modalPreviousButton?.addEventListener("click", toPreviousPhoto);

btnContact.addEventListener("click", openContactModal)

// contactForm.addEventListener("submit", (event) => { handleSubmit(event) });

contactMessage.addEventListener("input", displayCurrentLength);
contactCancel.addEventListener("click", closeContactModal)

contactSubmit.addEventListener("click", handleSubmit)




/* ********** FUNCTIONS ********** */

function createOneThumbnail(image: Photo): Element {
    let newPictureContainer = document.createElement("picture");
    let sourcemedium = document.createElement("source");
    let sourcesmall = document.createElement("source");
    let imgDefaut = document.createElement("img");

    newPictureContainer.classList.add("thumbnail")
    newPictureContainer.dataset.id = String(image.id);
    newPictureContainer.addEventListener("click", (event) => { displayModalPicture(event) })

    sourcemedium.setAttribute("srcset", image.fileNames.medium);
    sourcemedium.setAttribute("media", "(min-width: 1080px)");
    sourcemedium.setAttribute("alt", image.title);

    sourcesmall.setAttribute("srcset", image.fileNames.small);
    sourcesmall.setAttribute("media", "(min-width: 720px)");
    sourcesmall.setAttribute("alt", image.title);

    imgDefaut.setAttribute("src", image.fileNames.xsmall);
    imgDefaut.setAttribute("alt", image.title);

    newPictureContainer.append(sourcemedium, sourcesmall, imgDefaut);
    return newPictureContainer;
}

function displayPictures() {
    PhotoCollection.forEach(photo => {
        pictureGrid?.appendChild(createOneThumbnail(photo));
    });
}

async function displayModalPicture(event: MouseEvent) {
    let sourceImage = getSourceImage(event)
    if (sourceImage) {
        if (modalPicture?.dataset.id && sourceImage.id === parseInt(modalPicture?.dataset.id)) {
            showModalPictureContainer()
        } else {
            setModalPictureContent(sourceImage)
            const imageToLoad = modalPicture?.querySelector(".source-main") as HTMLImageElement;
            await (loadImage(imageToLoad)).then(() => { showModalPictureContainer(); imageToLoad.onload = null; })
        }
    }
}
async function loadImage(elem: HTMLImageElement) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        elem.onload = () => (resolve(elem));
        elem.onerror = reject;
    })
}

function getSourceImage(event: MouseEvent) {
    let targetImage = event.target as HTMLElement;
    let imageId = targetImage.parentElement?.dataset.id;
    return findImageFromId(imageId ? parseInt(imageId) : null);
}

function setModalPictureContent(image: Photo): void {

    if (modalPicture) { modalPicture.dataset.id = String(image.id) };
    modalPicture?.querySelector(".source-main")?.setAttribute("srcset", image.fileNames.large)
    modalPicture?.querySelector(".source-medium")?.setAttribute("srcset", image.fileNames.medium)
    modalPicture?.querySelector(".source-small")?.setAttribute("src", image.fileNames.small)
}

function findImageFromId(id: number | null): Photo | null {
    const newMainImage = (id !== null ? PhotoCollection.find(photo => photo.id == id) : null);
    return (newMainImage ? newMainImage : null);
}

function hideModalPictureContainer() {
    modalPictureContainer?.classList.remove("visible");
    modalPhotoOverlay?.classList.remove("visible");
    modalPictureContainer?.classList.add("hidden");
    modalPhotoOverlay?.classList.add("hidden");
}

function showModalPictureContainer() {
    modalPictureContainer?.classList.remove("hidden");
    modalPhotoOverlay?.classList.remove("hidden");
    modalPictureContainer?.classList.add("visible");
    modalPhotoOverlay?.classList.add("visible");
}

function toNextPhoto() {
    let imageId = getIdFromModalPicture();
    if (imageId) {
        let nextPhoto = getNextPhotoFromCurrent(parseInt(imageId));
        if (nextPhoto) { setModalPictureContent(nextPhoto); }
    }
}
function toPreviousPhoto() {
    let imageId = getIdFromModalPicture();
    if (imageId) {
        let previousPhoto = getPreviousPhotoFromCurrent(parseInt(imageId));
        if (previousPhoto) { setModalPictureContent(previousPhoto); }
    }
}

function getIdFromModalPicture(): string | null {
    return (modalPicture?.dataset.id ? modalPicture.dataset.id : null);
}
function getNextPhotoFromCurrent(currentId: number): Photo | null {
    let currentIndex = PhotoCollection.findIndex((photo) => photo.id === currentId);
    let nextIndex = (currentIndex < PhotoCollection.length - 1 ? currentIndex + 1 : 0);
    return PhotoCollection[nextIndex];
}

function getPreviousPhotoFromCurrent(currentId: number): Photo | null {
    let currentIndex = PhotoCollection.findIndex((photo) => photo.id === currentId);
    let previousIndex = (currentIndex > 0 ? (currentIndex - 1) : (PhotoCollection.length - 1));
    return PhotoCollection[previousIndex];
}

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

// async function submitForm(event) {
//     verifyEmail();
//     verifyMessage();
//     if (isEmailValid && isMessageValid) {
//         contactForm.submit;
//         alert("le message a bien été envoyé");
//         closeContactModal();
//     } else {
//         if (!isEmailValid && !isMessageValid) {
//             submitErrorMsg.textContent = "Le format de l'email est incorrect et le message ne satisfait pas la longueur attendue";
//         }
//         else if (!isEmailValid) {
//             submitErrorMsg.textContent = "Le format de l'email est incorrect";
//         }
//         else {
//             if (contactMessage.value.length < messageLengthRange.min) {
//                 submitErrorMsg.textContent = "Le message est trop court";
//             } else if (contactMessage.value.length > messageLengthRange.max) {
//                 submitErrorMsg.textContent = "Le message est trop long";
//             }
//         }
//         submitErrorMsg.classList.remove("transparent");
//         setTimeout(() => {
//             submitErrorMsg.classList.add("transparent")
//         }, 5000);
//     }
// }

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
// form.addEventListener("submit", handleSubmit)

/* ********** Initialization ********** */
displayPictures();