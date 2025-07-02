document.getElementById('downloadForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const url = document.getElementById('urlInput').value;
  const messageDiv = document.getElementById('message');
  
  messageDiv.textContent = 'Downloading... please wait.';

  try {
    const response = await fetch('/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    });

    const data = await response.json();
    if (data.success) {
      messageDiv.textContent = 'Download complete!';
    } else {
      messageDiv.textContent = 'Error: ' + data.error;
    }
  } catch (err) {
    messageDiv.textContent = 'Request failed. Check server.';
  }
});
