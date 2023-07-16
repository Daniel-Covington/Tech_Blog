document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Fetch form fields
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      const errorMessage = document.getElementById('error-message');
      errorMessage.textContent = 'Invalid username or password';
      errorMessage.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
  }
});