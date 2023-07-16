const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('Form submitted');

  const username = document.querySelector('#exampleInputUsername1').value;
  const password = document.querySelector('#exampleInputPassword1').value;

  // Some basic validation
  if (username.trim() === '' || password.trim() === '') {
    alert('Invalid username or password');
    return;
  }

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    const responseData = await response.json();
    alert(responseData.message);
  }
});