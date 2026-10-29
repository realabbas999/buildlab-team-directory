 

    // Mobile navigation menu
    const menuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("main-navigation");

    menuButton.addEventListener("click", function () {
      const isOpen = navigation.classList.toggle("open");

      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    // Close the mobile menu after selecting a section
    navigation.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.textContent = "☰";
      });
    });

    // Automatically display the current year
    document.getElementById("footer-year").textContent =
      new Date().getFullYear();

    // Highlight the navigation link for the section being viewed
    const pageSections = document.querySelectorAll("main section[id]");
    const navLinks = navigation.querySelectorAll('a[href^="#"]');

    function updateActiveLink() {
      let currentSection = "home";

      pageSections.forEach(function (section) {
        if (window.scrollY >= section.offsetTop - 130) {
          currentSection = section.id;
        }
      });

      navLinks.forEach(function (link) {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + currentSection
        );
      });
    }

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Prepare a message from the join form.
    // This does not send or save the information online.
    document.getElementById("join-form").addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const interest = document.getElementById("interest").value;
      const message = document.getElementById("message").value.trim();
      const status = document.getElementById("form-message");

      const introduction =
        "Hello BuildLab!\n\n" +
        "My name is " + name + ".\n" +
        "My email is " + email + ".\n" +
        "My interest is " + interest + ".\n" +
        "About me: " + (message || "Not provided") + ".";

      status.textContent =
        "Your introduction is ready. Copy it below to use it. " +
        "The form has not been sent to BuildLab.";

      const output = document.createElement("textarea");
      output.value = introduction;
      output.readOnly = true;
      output.setAttribute("aria-label", "Your prepared introduction");
      output.style.width = "100%";
      output.style.marginTop = "12px";
      output.style.padding = "12px";
      output.style.border = "1px solid #C7D7E0";
      output.style.borderRadius = "6px";

      const oldOutput = document.getElementById("prepared-introduction");

      if (oldOutput) {
        oldOutput.remove();
      }

      output.id = "prepared-introduction";
      status.insertAdjacentElement("afterend", output);
      output.focus();
      output.select();
    });
  
