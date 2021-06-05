// form selectors
const form = document.querySelector('.sign-up-form')
const formControls = document.querySelectorAll('.form-control')

// form submit event listener
form.addEventListener('submit', (e) => {
  // prevent page reload on submit
  e.preventDefault()
  if (checkInput()) alert('Mantap')
})

function checkInput() {
  let isError = false

  // reset class helper function
  function reset(formControl) {
    formControl.classList.remove('empty', 'invalid')
  }

  // get each input values
  formControls.forEach((formControl) => {
    reset(formControl)
    const input = formControl.querySelector('input')

    // if input value is empty, add empty class, trim() => removes all whitespace
    if (!input.value.trim()) {
      formControl.classList.add('empty')
      isError = true
    }

    // if email input is not empty but invalid, add invalid vlass
    if (input.id === 'email' && input.value.trim() && !isEmail(input.value.trim())) {
      formControl.classList.remove('empty')
      formControl.classList.add('invalid')
      isError = true
    }
  })

  // if there is an error, return false
  if (isError) return false

  // if there is no error, reset the class and input and return true
  formControls.forEach((formControl) => {
    reset(formControl)
    const input = formControl.querySelector('input')
    input.value = ''
  })
  return true
}

// email regex - check if an email is valid or not
function isEmail(email) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  if (email.match(regexEmail)) {
    return true
  } else {
    return false
  }
}
