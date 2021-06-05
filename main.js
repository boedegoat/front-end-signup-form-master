// form selectors
const form = document.querySelector('.sign-up-form')
const formControls = document.querySelectorAll('.form-control')
const submitBtn = document.querySelector('.submit-btn')

// form submit event listener
form.addEventListener('submit', (e) => {
  // prevent page reload on submit
  e.preventDefault()
  checkInput((user) => {
    const firstName = user['first-name']
    alert(`Thank you ${firstName}, your free trial has been send to your email address.`)
  })
})

async function checkInput(callback) {
  let isError = false
  const inputObject = {}

  // reset class helper function
  function reset(formControl) {
    formControl.classList.remove('empty', 'invalid')
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

  // wait function - just for fun
  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  // get each input values
  formControls.forEach((formControl) => {
    reset(formControl)
    const input = formControl.querySelector('input')

    // if input value is empty, add empty class, trim() => removes all whitespace
    if (!input.value.trim()) {
      formControl.classList.add('empty')
      isError = true
      return
    }

    // if email input is not empty but invalid, add invalid vlass
    if (input.id === 'email' && !isEmail(input.value.trim())) {
      formControl.classList.remove('empty')
      formControl.classList.add('invalid')
      isError = true
      return
    }

    // if there is no error, put the value to the object
    // for security purpose :v
    if (input.id !== 'password') {
      inputObject[input.id] = input.value.trim()
    }
  })

  // if there is an error, add nope class
  if (isError) {
    form.classList.add('nope')
    return
  }

  // if there is no error, run the callback and reset
  submitBtn.classList.add('loading')
  await wait(1000)
  submitBtn.classList.remove('loading')
  callback(inputObject)
  formControls.forEach((formControl) => {
    reset(formControl)
    const input = formControl.querySelector('input')
    input.value = ''
  })
}

form.addEventListener('animationend', () => {
  form.classList.remove('nope')
})

const passwordToggler = document.querySelector('.toggle-visibility')
const password = document.getElementById('password')
passwordToggler.addEventListener('click', (e) => {
  e.target.classList.toggle('hide')
  if (!e.target.className.includes('hide')) {
    password.setAttribute('type', 'text')
  } else {
    password.setAttribute('type', 'password')
  }
})
