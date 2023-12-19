const lightbox = document.querySelector(".gallery-lightbox");
const galleryBox = Array.from(lightbox.querySelectorAll(".gallery-lightbox__box"));
const lightboxPopup = document.querySelector(".gallery-lightbox__popup");
const optionsHeader = lightboxPopup.querySelector(".gallery-lightbox__popup--options")
const optionsLink = Array.from(optionsHeader.querySelectorAll(".option-link"));
const fullscreenOption = optionsHeader.querySelector(".fullscreen");
const downloadOption = optionsHeader.querySelector(".download");
const zoomOutOption = optionsHeader.querySelector(".zoom-out");
const zoomInOption = optionsHeader.querySelector(".zoom-in");
let zoomLevel = 1;
let zoomInc = 0.05;
const fullViewContainer = lightboxPopup.querySelector(".gallery-lightbox__popup--content");
const fullView = lightboxPopup.querySelector(".fullview");
const fullViewCaption = lightboxPopup.querySelector("p");
const leftArrow = lightboxPopup.querySelector(".arrow-left");
const rightArrow = lightboxPopup.querySelector(".arrow-right");
let active = lightbox.querySelector(".gallery-lightbox__box.active")
let nextGallery, prevGallery, galleryDirection, inedex;

// Function to start lightbox
const startLightbox = () => {
    // Get full size image
    const fullSize = active.dataset.fullsize;
    // const fullSize = active.getAttribute("data-fullsize")

    // Caption
    const caption = active.dataset.caption;
    // Index
    index = Number(active.dataset.index);

    // Place image inside full view container
    fullView.innerHTML = `<img src="${fullSize}"></img>`
    fullViewCaption.textContent = caption;

    // Options and zoom
    downloadOption.href = fullSize;
    zoomInOption.setAttribute("data-zoom-level", zoomLevel);
    zoomOutOption.setAttribute("data-zoom-level", zoomLevel);

    // Reset Zoom
    zoomLevel = 1;
    fullView.style.transform = `scale(${zoomLevel})`;

    // Reset Fullscreen
    fullView.style.width = "";
    fullView.style.height = "";
    fullViewContainer.classList.remove("fullscreen");
}

// Gallery box
galleryBox.forEach((gallery) => {
    
    gallery.addEventListener("click", (e) => {
        e.preventDefault()

        if (!gallery.classList.contains("active")) {
            active.classList.remove("active");
        }
        gallery.classList.add("active");
        nextGallery = lightbox.querySelector(".gallery-lightbox__box.active")
        // Newly active gallery
        active = lightbox.querySelector(".gallery-lightbox__box.active");
        
        lightboxPopup.classList.add("active");

        
        // StartLightbox
        startLightbox()
    })
});

rightArrow.addEventListener("click", () => changeGallery("right"));
leftArrow.addEventListener("click",  () => changeGallery("left"));

function changeGallery(direction) { 
    (direction === "right") ? index++ : index--;
    if (direction === "right" && index >= galleryBox.length) {
        index = 0;
    }
    if (direction === "left" && index < 0) {
        index = galleryBox.length - 1;
    }

    galleryDirection = galleryBox[index]
    active.classList.remove("active");
    galleryDirection.classList.add("active");
    active = lightbox.querySelector(".gallery-lightbox__box.active");

    zoomLevel = 1;
    startLightbox()
}

// Options 
optionsLink.forEach((link) => {
    link.addEventListener("click", (e) => e.preventDefault())
});

// Zooming in and out effect
zoomInOption.addEventListener("click", function () {
    zoomLevel += zoomInc;

    if (zoomLevel >= 1.4) {
        zoomLevel = zoomLevel - 0.01;
        this.classList.add("disabled");
        return;
    }

    this.setAttribute("data-zoom-level", zoomLevel)
    // Update zoom out
    zoomOutOption.setAttribute("data-zoom-level", zoomLevel)
    zoomOutOption.classList.remove("disabled");

    fullView.style.transform = `scale(${zoomLevel})`;;
})

zoomOutOption.addEventListener("click", function () {
    zoomLevel -= zoomInc;

    if (zoomLevel <= 0.6) {
        zoomLevel = zoomLevel + 0.01;
        this.classList.add("disabled");
        return;
    }

    this.setAttribute("data-zoom-level", zoomLevel)
    // Update zoom out
    zoomInOption.setAttribute("data-zoom-level", zoomLevel)
    zoomInOption.classList.remove("disabled");

    fullView.style.transform = `scale(${zoomLevel})`;;
})

// fullscreen
fullscreenOption.addEventListener("click", () => {
    const optionsHeaderHeight = optionsHeader.clientHeight;

    fullViewContainer.classList.toggle("fullscreen")

    if (fullViewContainer.classList.contains("fullscreen")) {
        fullView.style.width = "100vw";
        fullView.style.height = `calc(100vh - ${optionsHeaderHeight}px)`;
        zoomLevel = 1;
        fullView.style.transform = `scale(${zoomLevel})`;
    } else {
        fullView.style.width = "";
        fullView.style.height = "";
    }
})

// Closing Gallery
lightboxPopup.addEventListener("mouseup", (e) => {
    const target = e.target;
    if (!target.classList.contains("gallery-lightbox__popup")) {
        return
    } else{
    lightboxPopup.classList.remove("active")}
})