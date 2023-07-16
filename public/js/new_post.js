document.getElementById('new-post-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Fetch form fields
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // If the post was created successfully, reload the page to show the new post
            location.reload();
        } else {
            // If there was an error, log it to the console
            console.error('Error:', data.message);
        }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});