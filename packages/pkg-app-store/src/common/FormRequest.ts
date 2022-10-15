export const postForm = <T>(target: string, data: T) => {
  // Based on https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = target

  for (const key in data) {
    if (!Object.prototype.hasOwnProperty.call(data, key)) {
      continue
    }

    const value = data[key]

    if (typeof value !== 'string') {
      continue
    }

    const hiddenField = document.createElement('input')
    hiddenField.type = 'hidden'
    hiddenField.name = key
    hiddenField.value = value

    form.appendChild(hiddenField)
  }

  document.body.appendChild(form)
  form.submit()
}
