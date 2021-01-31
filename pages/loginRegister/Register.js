const signUpButton = document.querySelector('#signup-button');


signUpButton.addEventListener('click', sendInput);


async function promiseReturn(data) {

  const res = await fetch('https://movies-api-siit.herokuapp.com/auth/register', {

    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  return res.json();

}
async function sendInput() {

  try {

    const dataInput = inputData();
    console.log(dataInput);
    await promiseReturn(dataInput);

  } catch (err) {

    console.log(err);
    alert('Username already exists!')
  }
}

function inputData() {
  const userName = document.querySelector('#user-name').value;
  const newPassword = document.querySelector('#password-1').value;
  const secondPassword = document.querySelector('#password-2').value;


  if (newPassword !== secondPassword) {
    alert('Passwords do not match!');
  }
  return {
    userName,
    newPassword
  }
}


