document.addEventListener("DOMContentLoaded", function() {
  // Resume section tabs and tab contents
  const resumeTabs = document.querySelector(".resume-tabs");
  const resumePortfolioTabBtns = resumeTabs.querySelectorAll(".tab-btn");
  const resumeTabContents = document.querySelectorAll(".resume-tab-content");

  var resumeTabNav = function (resumeTabClick) {
    resumeTabContents.forEach((resumeTabContents) => {
      resumeTabContents.style.display = "none";
      resumeTabContents.classList.remove('active');
    });

    resumePortfolioTabBtns.forEach((resumePortfolioTabBtn) => {
      resumePortfolioTabBtn.classList.remove('active');
    });

    resumeTabContents[resumeTabClick].style.display = "flex";

    setTimeout(() => {
      resumeTabContents[resumeTabClick].classList.add('active');
    }, 100);

    resumePortfolioTabBtns[resumeTabClick].classList.add('active');
  };

  resumePortfolioTabBtns.forEach((resumePortfolioTabBtn, i) => {
    resumePortfolioTabBtn.addEventListener("click", () => {
      resumeTabNav(i);
    });
  });

  // Service modal open/close function
  const serviceCardWithModals = document.querySelectorAll(".service-container .card-with-modal");

  serviceCardWithModals.forEach((serviceCardWithModal) => {
    const serviceCard = serviceCardWithModal.querySelector(".service-card");
    const serviceBackDrop = serviceCardWithModal.querySelector(".service-modal-backdrop");
    const serviceModal = serviceCardWithModal.querySelector(".service-modal");
    const modalCloseBtn = serviceCardWithModal.querySelector(".modal-close-btn");

    serviceCard.addEventListener("click", () => {
      serviceBackDrop.style.display = "flex";

      setTimeout(() => {
        serviceBackDrop.classList.add('active');
      }, 100);

      setTimeout(() => {
        serviceModal.classList.add('active');
      }, 300);
    });

    modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
        serviceBackDrop.style.display = "none";
      }, 500);

      setTimeout(() => {
        serviceBackDrop.classList.remove('active');
        serviceModal.classList.remove('active');
      }, 100);
    });
  });

  // Filter portfolio cards according to portfolio tabs.
  const portfolioTabs = document.querySelector(".portfolio-tabs");
  const portfolioTabBtns = portfolioTabs.querySelectorAll(".tab-btn");
  const cardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

  portfolioTabBtns.forEach((tabBtn) => {
    tabBtn.addEventListener("click", () => {
      const filter = tabBtn.getAttribute("data-filter");

      cardsWithModals.forEach((cardsWithModal) => {
        if (filter === "all" || cardsWithModal.classList.contains(filter)) {
          cardsWithModal.classList.remove("hidden");
          setTimeout(() => {
            cardsWithModal.style.opacity = "1";
            cardsWithModal.style.transition = ".5s ease";
          }, 1);
        } else {
          cardsWithModal.classList.add("hidden");
          setTimeout(() => {
            cardsWithModal.style.opacity = "0";
            cardsWithModal.style.transition = ".5s ease";
          }, 1);
        }
      });

      // Add active class to the clicked tab button
      portfolioTabBtns.forEach((tabBtn) => tabBtn.classList.remove('active'));
      tabBtn.classList.add('active');
    });
  });

  // Open/Close Portfolio modals
  const portfolioCardsWithModals = document.querySelectorAll(".portfolio-container .card-with-modal");

  portfolioCardsWithModals.forEach((portfolioCardWithModal) => {
    const portfolioCard = portfolioCardWithModal.querySelector(".portfolio-card");
    const portfolioBackdrop = portfolioCardWithModal.querySelector(".portfolio-modal-backdrop");
    const portfolioModal = portfolioCardWithModal.querySelector(".portfolio-modal");
    const modalCloseBtn = portfolioCardWithModal.querySelector(".modal-close-btn");

    portfolioCard.addEventListener("click", () => {
      portfolioBackdrop.style.display = "flex";

      setTimeout(() => {
        portfolioBackdrop.classList.add('active');
      }, 300);

      setTimeout(() => {
        portfolioModal.classList.add('active');
      }, 300);
    });

    modalCloseBtn.addEventListener("click", () => {
      setTimeout(() => {
        portfolioBackdrop.style.display = "none";
      }, 500);

      setTimeout(() => {
        portfolioBackdrop.classList.remove('active');
        portfolioModal.classList.remove("active");
      }, 100);
    });
  });

  // Send/Receive emails from contact form = EmailJS
  document.getElementById("austin-contact-form")?.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector(".submit-btn");
    const successAlert = form.querySelector(".success-alert");
    const errorAlert = form.querySelector(".error-alert");
  
    // Disable submit button to prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
  
    // Hide any previous alerts
    successAlert.style.display = "none";
    errorAlert.style.display = "none";
  
    // Initialize EmailJS (move this outside the submit handler if possible)
    emailjs.init("service_htnlyeb"); // Replace with your actual user ID
  
    // Send the email
    emailjs.send("service_htnlyeb", "template_g4j406b", {
      from_name: form.full-name.value,
      from_email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    })
    .then(() => {
      successAlert.style.display = "flex";
      form.reset();
    }, (error) => {
      console.error("Failed to send message:", error);
      errorAlert.style.display = "flex";
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    });
  });



  // Shrink the height of the header on scroll
  window.addEventListener("scroll", () => {
    const austinHeader = document.querySelector(".austin-header");
    if (austinHeader) {
      austinHeader.classList.toggle("shrink", window.scrollY > 0);
    }
  });

  // Bottom navigation menu
  // Each bottom navigation menu items active on page scroll.
  window.addEventListener("scroll", () => {
    const navMenuSections = document.querySelectorAll(".nav-menu-section");
    const scrollY = window.pageYOffset;

    navMenuSections.forEach((navMenuSection) => {
      let sectionHeight = navMenuSection.offsetHeight;
      let sectionTop = navMenuSection.offsetTop - 50;
      let id = navMenuSection.getAttribute("id");

      const navLink = document.querySelector(`.bottom-nav .menu li a[href*="${id}"]`);
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('current');
        } else {
          navLink.classList.remove('current');
        }
      }
    });
  });

  // javascript to show bottom navigation menu on home (page load).
  const bottomNav = document.querySelector(".bottom-nav");
  if (bottomNav) {
    bottomNav.classList.toggle("active", window.scrollY < 10);
  }

  // javascript to show bottom navigation menu on home (scroll).
  const menuHideBtn = document.querySelector(".menu-hide-btn");
  const menuShowBtn = document.querySelector(".menu-show-btn");
  var navTimeout;

  window.addEventListener("scroll", () => {
    if (bottomNav) {
      bottomNav.classList.add('active');
    }
    if (menuShowBtn) {
      menuShowBtn.classList.remove('active');
    }

    if (window.scrollY < 10) {
      if (menuHideBtn) {
        menuHideBtn.classList.remove('active');
      }

      function scrollStopped() {
        if (bottomNav) {
          bottomNav.classList.add('active');
        }
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
    }

    if (window.scrollY > 10) {
      if (menuHideBtn) {
        menuHideBtn.classList.add('active');
      }

      function scrollStopped() {
        if (bottomNav) {
          bottomNav.classList.remove('active');
        }
        if (menuShowBtn) {
          menuShowBtn.classList.add('active');
        }
      }

      clearTimeout(navTimeout);
      navTimeout = setTimeout(scrollStopped, 2500);
    }
  });

  // Hide bottom navigation menu on click menu-hide-btn.
  if (menuHideBtn) {
    menuHideBtn.addEventListener("click", () => {
      if (bottomNav) {
        bottomNav.classList.toggle('active');
      }
      if (menuHideBtn) {
        menuHideBtn.classList.toggle('active');
      }
      if (menuShowBtn) {
        menuShowBtn.classList.toggle('active');
      }
    });
  }

  // Show bottom navigation menu on click menu-show-btn
  if (menuShowBtn) {
    menuShowBtn.addEventListener("click", () => {
      if (bottomNav) {
        bottomNav.classList.toggle('active');
      }
      if (menuHideBtn) {
        menuHideBtn.classList.add('active');
      }
      if (menuShowBtn) {
        menuShowBtn.classList.toggle('active');
      }
    });
  }

  // Top-top-button with scroll indicator bar
  const toTopBtn = document.querySelector(".to-top-btn");
  const scrollIndicatorBar = document.querySelector(".scroll-indicator-bar");

  window.addEventListener("scroll", () => {
    if (toTopBtn) {
      toTopBtn.classList.toggle("active", window.scrollY > 0);
    }

    // Scroll indicator bar
    if (scrollIndicatorBar) {
      const pageScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollValue = (pageScroll / height) * 100;
      scrollIndicatorBar.style.height = scrollValue + "%";
    }
  });

  // Customized cursor on mousemove
  const cursor = document.querySelector(".cursor");
  const cursorDot = cursor?.querySelector(".cursor-dot");
  const cursorCircle = cursor?.querySelector(".cursor-circle");

  if (cursor && cursorDot && cursorCircle) {
    document.addEventListener("mousemove", (e) => {
      let x = e.clientX;
      let y = e.clientY;

      cursorDot.style.top = y + "px";
      cursorDot.style.left = x + "px";
      cursorCircle.style.top = y + "px";
      cursorCircle.style.left = x + "px";
    });

    // Cursor effects on hover website elements
    const cursorHoverlinks = document.querySelectorAll(
      'body a, .theme-btn, .austin-main-btn, .portfolio-card, .swiper-button-next, .swiper-button-prev, .swiper-pagination-bullet, .service-card, .contact-social-links li, .contact-form .submit-btn, .menu-show-btn, .menu-hide-btn'
    );

    cursorHoverlinks.forEach((cursorHoverlink) => {
      cursorHoverlink.addEventListener("mouseover", () => {
        cursorDot.classList.add("large");
        cursorCircle.style.display = "none";
      });

      cursorHoverlink.addEventListener("mouseout", () => {
        cursorDot.classList.remove("large");
        cursorCircle.style.display = "block";
      });
    });
  }

  // Website dark/Light theme
  const themeBtn = document.querySelector(".theme-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      // Change theme icon and theme on click theme button.
      themeBtn.classList.toggle("active-sun-icon");
      document.body.classList.toggle("light-theme");

      // Save theme icon and theme on click theme button.
      const getCurrentIcon = () => themeBtn.classList.contains("active-sun-icon") ? "sun" : "moon";
      const getCurrentTheme = () => document.body.classList.contains("light-theme") ? "light" : "dark";
      
      localStorage.setItem("austin-saved-icon", getCurrentIcon());
      localStorage.setItem("austin-saved-theme", getCurrentTheme());
    });

    // Get saved theme icon and theme on document Loaded.
    const savedIcon = localStorage.getItem("austin-saved-icon");
    const savedTheme = localStorage.getItem("austin-saved-theme");

    if (savedIcon && savedTheme) {
      themeBtn.classList[savedIcon === "sun" ? "add" : "remove"]("active-sun-icon");
      document.body.classList[savedTheme === "light" ? "add" : "remove"]("light-theme");
    }
  }

  try {
    // ScrollReveal JS animations
    if (typeof ScrollReveal !== 'undefined') {
      ScrollReveal({ 
        reset: true, 
        distance: '60px',
        duration: 2500,
        delay: 400
      });
  
      // Your reveal targets...
    }
  } catch (e) {
    console.warn("ScrollReveal not loaded:", e);
  }

  // Target elements and specify options to create reveal animations.
  ScrollReveal().reveal('.avatar-img', { delay: 100, origin: 'top' });
  ScrollReveal().reveal('.avatar-info, .section-title', { delay: 300, origin: 'top' });
  ScrollReveal().reveal('.home-social, .home-scroll-btn, .copy-right', { delay: 600, origin: 'bottom' });
  ScrollReveal().reveal('.about-img', { delay: 600, origin: 'bottom' });
  ScrollReveal().reveal('.about-info, .austin-footer .austin-logo', { delay: 300, origin: 'bottom' });
  ScrollReveal().reveal('.pro-card, .about-buttons .austin-main-btn, .resume-tabs .tab-btn, .portfolio-tabs .tab-btn', { delay: 500, origin: 'right', interval: 200 });
  ScrollReveal().reveal('#resume .section-content', { delay: 700, origin: 'bottom'});
  ScrollReveal().reveal('.service-card, .portfolio-card, .contact-item, .contact-social-links li, .footer-menu .menu-item', { delay: 300, origin: 'bottom', interval: 300 });
  ScrollReveal().reveal('.austin-client-swiper, .contact-form-body', { delay: 700, origin: 'right' });
  ScrollReveal().reveal('.contact-info h3', { delay: 100, origin: 'bottom', interval: 300 });
});