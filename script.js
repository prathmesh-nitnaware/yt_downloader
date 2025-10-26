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

    if (response.ok) {
      // Receive file directly from backend
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      
      // auto-use filename from backend or fallback to "video.mp4"
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'video.mp4';
      if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition.split('filename=')[1].replace(/"/g, '');
      }

      link.download = filename;
      link.click();
      messageDiv.textContent = 'Download complete!';
    } else {
      const data = await response.json();
      messageDiv.textContent = 'Error: ' + data.error;
    }
  } catch (err) {
    messageDiv.textContent = 'Request failed. Check server.';
  }
});
