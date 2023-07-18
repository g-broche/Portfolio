/* ********** PAGE ELEMENTS ********** */

const modalScreenshotContainer = document.getElementById("modal-screenshot-container");
const modalCloseButton = document.getElementById("modal-screenshot-close");
const modalPictureFrame = document.getElementById("modal-screenshot-frame")! as HTMLPictureElement;
const modalPicture = document.getElementById("modal-screenshot-img")! as HTMLImageElement;

const screenshots = document.querySelectorAll(".gallery-screenshots img")

const modalOverlay = document.getElementById("modal-project-overlay");

const modalClassnameLandscape = "modal-screenshot-container__img-landscape";
const modalClassnamePortrait = "modal-screenshot-container__img-portrait";
const modalClassnameSquarish = "modal-screenshot-container__img-squarish";

/* ********** LOGIC CONST AND VARIABLES ********** */


/* ********** EVENT LISTENERS ********** */

modalCloseButton?.addEventListener("click", hideModalPictureContainer);
modalOverlay?.addEventListener("click", hideModalPictureContainer);
screenshots.forEach(screenshot => {
    screenshot.addEventListener("click", (event) => { displayModalScreenshot(event as MouseEvent) })
});




/* ********** FUNCTIONS ********** */

async function displayModalScreenshot(event: MouseEvent) {
    let sourceElement = event.target as HTMLImageElement;
    modalPicture.src = sourceElement.src
    toggleModalOrientationClasses(sourceElement.width / sourceElement.height);
    await (loadImage(modalPicture)).then(() => { showModalPictureContainer(); modalPicture.onload = null; })
}

function toggleModalOrientationClasses(ratio: number) {
    if (ratio >= 1.5) {
        modalPictureFrame.classList.add(modalClassnameLandscape);
        if (modalPictureFrame.classList.contains(modalClassnamePortrait)) { modalPictureFrame.classList.remove(modalClassnamePortrait); }
        if (modalPictureFrame.classList.contains(modalClassnameSquarish)) { modalPictureFrame.classList.remove(modalClassnameSquarish); }
    } else if (ratio > .5 && ratio < 1.5) {
        modalPictureFrame.classList.add(modalClassnameSquarish);
        if (modalPictureFrame.classList.contains(modalClassnamePortrait)) { modalPictureFrame.classList.remove(modalClassnamePortrait); }
        if (modalPictureFrame.classList.contains(modalClassnameLandscape)) { modalPictureFrame.classList.remove(modalClassnameLandscape); }
    } else {
        modalPictureFrame.classList.add(modalClassnamePortrait)
        if (modalPictureFrame.classList.contains(modalClassnameLandscape)) { modalPictureFrame.classList.remove(modalClassnameLandscape); }
        if (modalPictureFrame.classList.contains(modalClassnameSquarish)) { modalPictureFrame.classList.remove(modalClassnameSquarish); }
    }
}

async function loadImage(elem: HTMLImageElement) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        elem.onload = () => (resolve(elem));
        elem.onerror = reject;
    })
}

function hideModalPictureContainer() {
    modalScreenshotContainer?.classList.remove("visible");
    modalOverlay?.classList.remove("visible");
    modalScreenshotContainer?.classList.add("hidden");
    modalOverlay?.classList.add("hidden");
}

function showModalPictureContainer() {
    modalScreenshotContainer?.classList.remove("hidden");
    modalOverlay?.classList.remove("hidden");
    modalScreenshotContainer?.classList.add("visible");
    modalOverlay?.classList.add("visible");
}

/* ********** Initialization ********** */
