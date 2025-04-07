function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

function showSection(sectionId) {
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => section.classList.add('hidden'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        const yOffset = -80; // Offset om ruimte te maken voor de navbar
        const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Sluit het menu automatisch na het klikken op mobiel
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('.nav-toggle');
    toggle.addEventListener('click', toggleMenu);

    // Home-knop en logo zorgen ervoor dat je terug naar boven scrolt
    const homeBtn = document.querySelector('.nav-menu li:first-child');
    const logoBtn = document.querySelector('.nav-brand');
    homeBtn.addEventListener('click', () => showSection('home'));
    logoBtn.addEventListener('click', () => showSection('home'));
});
function toggleOptions(header) {
    const category = header.parentElement;
    category.classList.toggle("open");
    const list = category.querySelector('.option-list');
    if (list) {
        list.classList.toggle("hidden");
    }
}

function revealOnScroll() {
    const boxes = document.querySelectorAll('.option-box');
    const triggerBottom = window.innerHeight * 0.9;

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            box.classList.add('visible');
        } else {
            box.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) {
        toggle.addEventListener('click', toggleMenu);
    }

    // HOME BUTTON & LOGO FIX
    const homeBtn = document.querySelector('.nav-menu li:first-child');
    const logoBtn = document.querySelector('.nav-brand');
    
    if (homeBtn) {
        homeBtn.addEventListener('click', () => showSection('home'));
    }

    if (logoBtn) {
        logoBtn.addEventListener('click', () => showSection('home'));
    }
});
// Fade-in animatie voor diagnose blokken
function revealDiagnosis() {
    const diagBoxes = document.querySelectorAll('.diag-box');
    const trigger = window.innerHeight * 0.9;
  
    diagBoxes.forEach(box => {
      const top = box.getBoundingClientRect().top;
      if (top < trigger) {
        box.classList.add('visible');
      }
    });
  }
  
  window.addEventListener("scroll", revealDiagnosis);
  document.addEventListener("DOMContentLoaded", revealDiagnosis);

  // 🟡 Contact Popup Draggen
  function makePopupDraggableSnap() {
    const popup = document.getElementById("contact-popup");
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    popup.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.getBoundingClientRect().left;
        offsetY = e.clientY - popup.getBoundingClientRect().top;
        popup.style.transition = "none";
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            snapPopupToSide(popup);
        }
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        popup.style.left = `${e.clientX - offsetX}px`;
        popup.style.top = `${e.clientY - offsetY}px`;
        popup.style.right = "auto";
        popup.style.bottom = "auto";
    });

    // Touch support
    popup.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        isDragging = true;
        offsetX = touch.clientX - popup.getBoundingClientRect().left;
        offsetY = touch.clientY - popup.getBoundingClientRect().top;
        popup.style.transition = "none";
    });

    document.addEventListener("touchend", () => {
        if (isDragging) {
            isDragging = false;
            snapPopupToSide(popup);
        }
    });

    document.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        popup.style.left = `${touch.clientX - offsetX}px`;
        popup.style.top = `${touch.clientY - offsetY}px`;
        popup.style.right = "auto";
        popup.style.bottom = "auto";
    });

    function snapPopupToSide(el) {
        const centerX = window.innerWidth / 2;
        const currentLeft = el.getBoundingClientRect().left;

        el.style.transition = "all 0.3s ease";

        // Always snap to bottom
        el.style.top = "auto";
        el.style.bottom = "20px";

        if (currentLeft < centerX) {
            // Snap to left
            el.style.left = "20px";
            el.style.right = "auto";
        } else {
            // Snap to right
            el.style.left = "auto";
            el.style.right = "20px";
        }
    }
}

function resetPopupToStart() {
    const popup = document.getElementById("contact-popup");
    popup.style.transition = "all 0.3s ease";
    popup.style.top = "auto";
    popup.style.left = "20px";
    popup.style.right = "auto";
    popup.style.bottom = "20px";
}

document.addEventListener("DOMContentLoaded", () => {
    makePopupDraggableSnap();

    const homeBtn = document.querySelector('.nav-menu li:first-child');
    const logoBtn = document.querySelector('.nav-brand');

    homeBtn?.addEventListener("click", resetPopupToStart);
    logoBtn?.addEventListener("click", resetPopupToStart);
});


  document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector('.contact-form');

  // Popup aanmaken
  const thankYouPopup = document.createElement('div');
  thankYouPopup.className = "thank-you-popup";
  thankYouPopup.style.display = "none";

  const message = document.createElement('p');
  message.textContent = "✅ Je bericht is succesvol verzonden!";
  thankYouPopup.appendChild(message);

  // 🎥 GIF toevoegen
  const gif = document.createElement('img');
  gif.src = "resources/spongebob-dancing.gif";
  gif.alt = "Verzonden";
  gif.className = "popup-gif";
  thankYouPopup.appendChild(gif);

  // ❌ Sluitknop
  const closeButton = document.createElement('button');
  closeButton.textContent = "Sluiten";
  closeButton.className = "close-popup";
  closeButton.addEventListener('click', () => {
    thankYouPopup.classList.remove('fade-in');
    thankYouPopup.classList.add('fade-out');
    setTimeout(() => {
      thankYouPopup.style.display = "none";
    }, 500);
  });

  thankYouPopup.appendChild(closeButton);
  document.body.appendChild(thankYouPopup);

  // Form afhandeling
  contactForm.addEventListener('submit', function (e) {
    contactForm.reset();

    thankYouPopup.style.display = "block";
    thankYouPopup.classList.remove('fade-out');
    thankYouPopup.classList.add('fade-in');

    // Automatisch sluiten na 5 seconden
    setTimeout(() => {
      thankYouPopup.classList.remove('fade-in');
      thankYouPopup.classList.add('fade-out');
      setTimeout(() => {
        thankYouPopup.style.display = "none";
      }, 500);
    }, 5000);
  });
});
window.addEventListener("load", () => {
    const form = document.getElementById("contact-form");
    const iframe = document.getElementById("hidden_iframe");
  
    if (form && iframe) {
      // Zorg ervoor dat we pas resetten ná het verzenden
      iframe.onload = () => {
        // Form resetten
        form.reset();
  
        // Popup tonen (optioneel, pas aan indien je een eigen animatie gebruikt)
        const popup = document.querySelector(".thank-you-popup");
        if (popup) {
          popup.style.display = "block";
          popup.classList.add("fade-in");
          setTimeout(() => {
            popup.classList.remove("fade-in");
            popup.classList.add("fade-out");
            setTimeout(() => {
              popup.style.display = "none";
              popup.classList.remove("fade-out");
            }, 500);
          }, 5000);
        }
      };
    }
  });
  