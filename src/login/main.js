const LOGIN_API_URL = 'http://localhost:8080/api/users/login';
const BUTTON_ACTIVE_COLOR = '#6d40c8';
const BUTTON_INACTIVE_COLOR = '#999';

const idInput = document.getElementById('id');
const pwInput = document.getElementById('pw');
const loginButton = document.querySelector('.btn-area button');
const loginForm = document.querySelector('form'); // Ensure the form selector is correct

function updateButtonState() {
  const isInputValid = idInput.value && pwInput.value;
  loginButton.disabled = !isInputValid;
  loginButton.style.backgroundColor = isInputValid ? BUTTON_ACTIVE_COLOR : BUTTON_INACTIVE_COLOR;
  loginButton.style.cursor = isInputValid ? 'pointer' : 'default';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const userId = idInput.value;
  const password = pwInput.value;

  try {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({userId, password})
    });

    if (!response.ok) throw new Error('Network response was not ok');

    const data = await response.json();
    if (data.status === "OK") {
      window.location.href = data.data[0].isAdmin ? '/admin.html' : '/user.html';
    } else {
      alert('Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('An error occurred while logging in');
  }
}


idInput.addEventListener('input', updateButtonState);
pwInput.addEventListener('input', updateButtonState);
loginForm.addEventListener('submit', handleFormSubmit);


updateButtonState();