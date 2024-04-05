async function uploadFile(file, dirName) {
  const url = `https://onclick-cf.omak.workers.dev/${dirName}`

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Custom-Auth-Key': 'd;fjdfo-dfkndkljni-kfndsljkds-kdjvif'
      }
    })

    if (response.ok) {
      const result = await response.json()
      console.log('File uploaded successfully:', result)
      return result
    } else {
      console.error('Upload failed', response.status, await response.text())
    }
  } catch (error) {
    console.error('Error during file upload:', error)
  }
}

export default uploadFile
