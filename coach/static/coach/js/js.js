document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.getElementById("navbarCollapse");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });

  // Submit contact form to server
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      // Get form data
      const name = document.querySelector('#name').value;
      const email = document.querySelector('#email').value;
      const message = document.querySelector('#message').value;
      
      try {
        // Send to Django backend
        const response = await fetch('/submit-contact/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]')?.value || '',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })
        });
        
        const result = await response.json();
        
        if (result.success) {
          alert('Message sent successfully!');
          contactForm.reset();
        } else {
          alert('Error sending message. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again.');
      }
    });
  }
});
