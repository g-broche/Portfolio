/* ********** IMPORTS ********** */
import { Photo } from './interfaces/model';

/* ********** DATABASE ********** */
const PhotoCollection: Photo[] = [
    {
        id: 1,
        title: "Bee and sunflower",
        fileNames: {
            xsmall: "bee-sunflower_160.webp",
            small: "bee-sunflower_240.webp",
            medium: "bee-sunflower_480.webp",
            large: "bee-sunflower_720.webp",
        },
        tag: ["abeille", "tournesol"]
    },
    {
        id: 2,
        title: "Crabier chevelu",
        fileNames: {
            xsmall: "crabier_160.webp",
            small: "crabier_240.webp",
            medium: "crabier_480.webp",
            large: "crabier_720.webp",
        },
        tag: ["crabier"]
    },
    {
        id: 3,
        title: "Renard du soir",
        fileNames: {
            xsmall: "fox_160.webp",
            small: "fox_240.webp",
            medium: "fox_480.webp",
            large: "fox_720.webp",
        },
        tag: ["renard"]
    },
    {
        id: 4,
        title: "Hermine",
        fileNames: {
            xsmall: "hermine_160.webp",
            small: "hermine_240.webp",
            medium: "hermine_480.webp",
            large: "hermine_720.webp",
        },
        tag: ["hermine"]
    },
    {
        id: 5,
        title: "Libellule en vol",
        fileNames: {
            xsmall: "libellule_160.webp",
            small: "libellule_240.webp",
            medium: "libellule_480.webp",
            large: "libellule_720.webp",
        },
        tag: ["libellule"]
    },
    {
        id: 6,
        title: "Marmottes du Taillefer",
        fileNames: {
            xsmall: "marmottes_160.webp",
            small: "marmottes_240.webp",
            medium: "marmottes_480.webp",
            large: "marmottes_720.webp",
        },
        tag: ["marmottes"]
    },
];

/* ********** PAGE ELEMENTS ********** */

const pictureGrid = document.getElementById("picture-grid");
const modalPictureContainer = document.getElementById("modal-picture-container");
const modalPicture = document.getElementById("modal-picture-img");
const modalPrevious = document.getElementById("modal-picture-previous");
const modalNext = document.getElementById("modal-picture-next");
const modalClose = document.getElementById("modal-picture-close");

/* ********** LOGIC CONST AND VARIABLES ********** */
const pathToImg = './src/assets/pictures/';


/* ********** EVENT LISTENERS ********** */


/* ********** FUNCTIONS ********** */

function createOnePicture(Image: Photo): Element {
    let newPictureContainer = document.createElement("picture");
    let sourceLarge = document.createElement("source");
    let imgDefaut = document.createElement("img");

    sourceLarge.setAttribute("srcset", pathToImg + Image.fileNames.large);
    sourceLarge.setAttribute("media", "(min-width: 1080px)");
    sourceLarge.setAttribute("alt", Image.title);

    imgDefaut.setAttribute("src", pathToImg + Image.fileNames.small);
    imgDefaut.setAttribute("alt", Image.title);

    newPictureContainer.append(sourceLarge, imgDefaut);
    return newPictureContainer;
}

function displayPictures() {
    PhotoCollection.forEach(photo => {
        pictureGrid?.appendChild(createOnePicture(photo));
    });
}


/* ********** Initialization ********** */
// displayPictures()
(console.log("okay!"));