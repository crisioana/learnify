export const uploadImage = async file => {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', 'qjonax7e')
  formData.append('cloud_name', 'dpef9sjqt')

  const res = await fetch('https://api.cloudinary.com/v1_1/dpef9sjqt/image/upload', {
    method: 'POST',
    body: formData
  })
  const data = await res.json()

  return({
    secure_url: data.secure_url,
    public_id: data.public_id
  })
}