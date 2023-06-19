"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* ********** DATABASE ********** */
var PhotoCollection = [
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
var pictureGrid = document.getElementById("picture-grid");
var modalPictureContainer = document.getElementById("modal-picture-container");
var modalPicture = document.getElementById("modal-picture-img");
var modalPrevious = document.getElementById("modal-picture-previous");
var modalNext = document.getElementById("modal-picture-next");
var modalClose = document.getElementById("modal-picture-close");
/* ********** LOGIC CONST AND VARIABLES ********** */
var pathToImg = './src/assets/pictures/';
/* ********** EVENT LISTENERS ********** */
/* ********** FUNCTIONS ********** */
function createOnePicture(Image) {
    var newPictureContainer = document.createElement("picture");
    var sourceLarge = document.createElement("source");
    var imgDefaut = document.createElement("img");
    sourceLarge.setAttribute("srcset", pathToImg + Image.fileNames.large);
    sourceLarge.setAttribute("media", "(min-width: 1080px)");
    sourceLarge.setAttribute("alt", Image.title);
    imgDefaut.setAttribute("src", pathToImg + Image.fileNames.small);
    imgDefaut.setAttribute("alt", Image.title);
    newPictureContainer.append(sourceLarge, imgDefaut);
    return newPictureContainer;
}
function displayPictures() {
    PhotoCollection.forEach(function (photo) {
        pictureGrid === null || pictureGrid === void 0 ? void 0 : pictureGrid.appendChild(createOnePicture(photo));
    });
}
/* ********** Initialization ********** */
// displayPictures()
(console.log("okay!"));
