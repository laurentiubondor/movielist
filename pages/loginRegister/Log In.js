console.log(localStorage)

const logInButton = document.querySelector('#login-button');
const logOutButton = document.querySelector('#logout-button');


logInButton.addEventListener('click', dataInput);
logInButton.addEventListener('click',hideOnLoginButon)
logOutButton.addEventListener("click",stergeToken)

async function logInPromise(data) {

    const res = await fetch('https://movies-api-siit.herokuapp.com/auth/login', { //err: 401: not authorized

        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    return res.json();

}

async function dataInput() {

    try {

        const logInData = formData();
        console.log(logInData);

        const tokenData = await logInPromise(logInData);
        console.log(tokenData);

        let getToken = JSON.stringify(tokenData);


        localStorage.setItem('token', getToken);
        console.log(localStorage.length)



    }
    catch (e) {

        console.log(e);
        alert("User not found/wrong password");
    }
}



function formData() {

    const userName = document.querySelector('#user-name').value;
    const password = document.querySelector('#login-password').value;

    return {

        username: userName,
        password: password
    }

}

function stergeToken(){

localStorage.clear()
console.log(localStorage)
   
logInButton .style.display="block" 
 logOutButton.style.display="none"

}



function hideOnLoginButon(){
    logInButton .style.display="none" 
 logOutButton.style.display="block"
}

if(localStorage.length==1){logInButton .style.display="none" }//cand se da refresh la pahina sa avem butoanele in functie de datele de pe localStorage
if(localStorage.length==0){logOutButton .style.display="none" }