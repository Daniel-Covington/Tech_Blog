document.querySelector('#logout-link').addEventListener('click', event => {
    event.preventDefault();
  
    fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(() => {
      document.location.replace('/');
    })
    .catch((err) => console.error(err));
});