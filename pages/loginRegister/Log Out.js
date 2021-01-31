/*const logOutButton = document.querySelector('#logout-button');
let tokenId = JSON.parse(localStorage.getItem('token'));
let token = tokenId.accessToken;
console.log(tokenId.accessToken);
console.log(tokenId);


logOutButton.addEventListener('click', getToken);

async function logOutPromise() {

    const res = await fetch('https://movies-api-siit.herokuapp.com/auth/logout', {

        method: 'GET',
        headers: { "X-Auth-Token": `${token}`,
             "Content-Type": "application/json" },
        
    })

    return res.json();

}

async function getToken() {

    try {

        await logOutPromise();

    } catch (e) {
        
        console.log(e);
        alert("You have to be logged-in in order to log out");
    }
}

function myFunction() {
    var logOutBtn = document.getElementById("btn");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
*/