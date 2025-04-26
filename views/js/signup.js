
function checkPassword() {
  let password = document.getElementById('password').value
  let confirmPassword = document.getElementById('password-confirm').value
  if (password === confirmPassword) {
    return true
  }
  else {
    document.getElementById('error').innerText = 'Vui lòng kiểm tra lại password!'
    return false;
  }
}