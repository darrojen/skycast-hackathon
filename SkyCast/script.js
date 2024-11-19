// Ensure the script targets only the rate-us page
document.addEventListener('DOMContentLoaded', function () {
  const rateUsPage = document.querySelector('#rate-us-page');
  if (!rateUsPage) return;

  const stars = document.querySelectorAll('.star');
  const feedbackInput = document.getElementById('feedback');
  const submitButton = document.getElementById('submit-rating');
  const successMessage = document.getElementById('success-message');
  let selectedRating = 0;

  // Handle star hover and selection
  stars.forEach(star => {
    star.addEventListener('mouseover', function () {
      highlightStars(this.dataset.value);
    });

    star.addEventListener('click', function () {
      selectedRating = this.dataset.value;
      setSelectedStars(selectedRating);
    });

    star.addEventListener('mouseout', function () {
      setSelectedStars(selectedRating);
    });
  });

  // Highlight stars on hover
  function highlightStars(rating) {
    stars.forEach(star => {
      if (star.dataset.value <= rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }

  // Set selected stars based on click
  function setSelectedStars(rating) {
    stars.forEach(star => {
      if (star.dataset.value <= rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }

  // Handle form submission
  submitButton.addEventListener('click', function () {
    const feedback = feedbackInput.value.trim();
    if (selectedRating > 0 && feedback.length > 0) {
      successMessage.classList.remove('hidden');
      feedbackInput.value = '';
      setSelectedStars(0);
      selectedRating = 0;
    } else {
      alert('Please select a rating and provide feedback.');
    }
  });
});

// Ensure the script targets only the menu-page.html
document.addEventListener("DOMContentLoaded", () => {
  if (document.body.id === "menuPage") {
    // Get the theme toggle switch and the body element
const themeSwitch = document.getElementById('themeSwitch');
const body = document.body;
  }
// Check the current theme in localStorage and apply it
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeSwitch.checked = true;
} else {
    body.classList.add('light-theme');
    themeSwitch.checked = false;
}

// Add event listener to toggle theme on switch change
themeSwitch.addEventListener('change', () => {
    if (themeSwitch.checked) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
  });
});