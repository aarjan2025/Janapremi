document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.fullscreen-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'fullscreen-overlay';
        
        const overlayContent = document.createElement('div');
        overlayContent.className = 'fullscreen-content';
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-overlay';
        closeBtn.innerHTML = '&times;';
        
        overlay.appendChild(closeBtn);
        overlay.appendChild(overlayContent);
        document.body.appendChild(overlay);
        const galleryItems = document.querySelectorAll('.Members-item');     
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img').cloneNode(true);
                let description;
                
                if (this.querySelector('.team-description')) {
                    description = this.querySelector('.team-description').cloneNode(true);
                } else {
                    description = document.createElement('div');
                    description.className = 'fullscreen-description';
                    description.innerHTML = this.querySelector('p').innerHTML;
                }
                
                overlayContent.innerHTML = '';
                
                overlayContent.appendChild(img);
                overlayContent.appendChild(description);
                
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

function toggleCompanies() {
    const moreCompanies = document.getElementById("more-companies");
    const icon = document.getElementById("toggle-icon");
    const isHidden = moreCompanies.style.display === "none";
    moreCompanies.style.display = isHidden ? "block" : "none";
    icon.classList.toggle("fa-chevron-up", isHidden);
    icon.classList.toggle("fa-chevron-down", !isHidden);
}

document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("_FmF1L3ucSa5LjJhW");
    
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";
            
            emailjs.sendForm("service_v5dpx1i", "template_4202vnh", this)
                .then(function(response) {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'alert-success';
                    successMessage.style.padding = '15px';
                    successMessage.style.backgroundColor = '#d4edda';
                    successMessage.style.color = '#155724';
                    successMessage.style.borderRadius = '5px';
                    successMessage.style.marginTop = '20px';
                    successMessage.textContent = "Message sent successfully!";
                    
                    contactForm.appendChild(successMessage);
                    contactForm.reset(); 
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, function(error) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'alert-error';
                    errorMessage.style.padding = '15px';
                    errorMessage.style.backgroundColor = '#f8d7da';
                    errorMessage.style.color = '#721c24';
                    errorMessage.style.borderRadius = '5px';
                    errorMessage.style.marginTop = '20px';
                    errorMessage.textContent = "Failed to send message. Please try again.";
                    
                    contactForm.appendChild(errorMessage);
                    console.error("EmailJS error:", error);
                    
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 5000);
                })
                .finally(function() {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    }
});

  let slides = document.querySelectorAll('.slide');
  let index = 0;

  function showNextSlide() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }

  setInterval(showNextSlide, 3500); // changes every 3.5 seconds

