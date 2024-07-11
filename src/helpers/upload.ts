export async function uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('File upload failed');
    }
  
    return await response.json();
  }
  