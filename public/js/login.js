document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Fetch form fields
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = "/dashboard";
        } else {
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = data.message;
            errorMessage.style.display = 'block'; 
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});