var crsr = document.querySelector("#cursor")
var crsrb = document.querySelector("#cursor-blur")
document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px"
  crsr.style.top = dets.y + "px"
  crsrb.style.left = dets.x - 250 + "px"
  crsrb.style.top = dets.y - 250 + "px"
})


gsap.to("#nav", {
  backgroundColor: "#000",
  duration: 0.5,
  height: "100px",
  scrollTrigger: {
    trigger: "#nav",
    scroller: "body",
    // markers: true,
    start: "top -10%",
    end: "top -11%",
    scrub: 1,
  }
})
gsap.to("#main", {
  backgroundColor: "#000",
  scrollTrigger: {
    trigger: "#main",
    scroller: "body",
    start: "top -25%",
    end: "top -70%",
    scrub: 2,

  }
})

// function toggleMenu() {
//   var navLinks = document.getElementById("nav-links");
//   if (navLinks.style.display === "flex") {
//       navLinks.style.display = "none";
//   } else {
//       navLinks.style.display = "flex";
//   }
// }
function toggleMenu() {
  var nav = document.getElementById("nav");
  nav.classList.toggle("open");
}


// Function to handle adding active class
function setActiveLink() {
  // Remove 'active' class from all nav links
  const navLinks = document.querySelectorAll('#nav a');
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Add 'active' class to the clicked link
  this.classList.add('active');
}

// Attach click event listener to all navigation links
const navLinks = document.querySelectorAll('#nav a');
navLinks.forEach(link => {
  link.addEventListener('click', setActiveLink);
});

// Optional: On page load, set the active link based on the current URL
window.onload = function () {
  const currentPath = window.location.pathname;
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active'); // Mark the current page link as active
    }
  });
};




let carouselCurrentIndex = 0;
const carouselSlides = document.querySelectorAll(".carousel-slide");
const carouselContainer = document.querySelector(".carousel-slides");
const videoPlayers = [];

function isMobileView() {
  return window.innerWidth <= 480;
}

function updateBottomSectionVisibility() {
  if (isMobileView()) {
    bottomSections.style.display = "none";
  } else {
    bottomSections.style.display = "flex";
  }
}

function showCarouselSlide(index) {
  const carouselSlideWidth = carouselSlides[0].clientWidth;
  carouselContainer.style.transform = `translateX(-${carouselSlideWidth * index}px)`;
  updateBottomSectionVisibility();
}

function nextCarouselSlide() {
  carouselCurrentIndex = (carouselCurrentIndex + 1) % carouselSlides.length;
  showCarouselSlide(carouselCurrentIndex);
}

// This function is called when the YouTube player state changes
function onPlayerStateChange(event) {
  // Check if the video has finished playing (state = 0)
  if (event.data === YT.PlayerState.ENDED) {
    nextCarouselSlide();
  }
}

// Initialize the YouTube players for each iframe
function initYouTubePlayers() {
  const iframes = document.querySelectorAll('iframe');
  iframes.forEach((iframe, index) => {
    const player = new YT.Player(iframe, {
      events: {
        'onStateChange': onPlayerStateChange
      }
    });
    videoPlayers.push(player);
  });
}

window.addEventListener("load", () => {
  showCarouselSlide(carouselCurrentIndex); // Ensure correct initial slide
  updateBottomSectionVisibility();
  initYouTubePlayers(); // Initialize YouTube players
});

window.addEventListener("resize", () => {
  showCarouselSlide(carouselCurrentIndex); // Adjust to window size changes
  updateBottomSectionVisibility();
});

setInterval(nextCarouselSlide, 5000);


// PROJECSSS

// document.getElementById("projects-link").addEventListener("click", function(event) {
//     event.preventDefault(); // Prevent default link behavior

//     const projectSec = document.querySelector(".projectsec");
//     const moreIcon = document.querySelector(".more-icon");

//     if (projectSec.style.display === "none" || projectSec.style.display === "") {
//         projectSec.style.display = "flex";
//         moreIcon.textContent = "🔼"; // Change icon to indicate "less"
//     } else {
//         projectSec.style.display = "none";
//         moreIcon.textContent = "🔽"; // Change icon to indicate "more"
//     }
// });






// document.getElementById('toggleButton').addEventListener('click', function () {
//   const newsSection = document.getElementById('newsSection');

//   // Check if the section is hidden or visible, then toggle the state
//   if (newsSection.style.display === 'none' || newsSection.style.display === 'block') {
//     newsSection.style.display = 'block';  // Show the section
//     this.textContent = 'HIDE NEWS';
//     this.style.fontSize = '18px'; // Change button text to "Show Less"
//     this.style.fontFamily = 'Montserrat';
//   } else {
//     newsSection.style.display = 'none';  // Hide the section
//     this.textContent = 'NEWS';  // Change button text back to "Show More"
//     this.style.fontSize = '18px'; // Change button text to "Show Less"
//     this.style.fontFamily = 'Montserrat';
//   }
// });


// document.getElementById('toggleButton').addEventListener('click', function () {
//   const newsSection = document.getElementById('newsSection');

//   // Toggle the "visible" class to show or hide the section
//   newsSection.classList.toggle('visible');

//   // Change the button text accordingly
//   if (newsSection.classList.contains('visible')) {
//     this.textContent = 'HIDE NEWS';  // Show "Hide News"
//   } else {
//     this.textContent = 'NEWS';  // Show "Show News"
//   }

//   this.style.fontSize = '18px';  // Set font size
//   this.style.fontFamily = 'Montserrat';  // Set font family
// });

// faqsssss
document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".toggle-btn");
  const closeButtons = document.querySelectorAll(".close-btn");

  toggleButtons.forEach(button => {
    button.addEventListener("click", function () {
      const faqCard = this.closest(".faq-card");
      faqCard.classList.toggle("active");
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const faqCard = this.closest(".faq-card");
      faqCard.classList.remove("active");
    });
  });
});