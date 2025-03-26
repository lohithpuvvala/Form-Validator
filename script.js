const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmpassword = document.getElementById('comfirmpassword');

//Show error Outline
function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Show Success Outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check email is valid
function isValidEmail(email)
{
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function checkRequired(inputArr)
{
    inputArr.forEach(input => {
        console.log("1");
        if(input.value.trim() === '')
        {
            let message;
            if(input.id === "confirmpassword"){
                message = `Enter Password Again!`;
            }else{
                message = `${input.id} is required!`;
            }

            showError(input,message);
        }else{
             showSuccess(input)
        }
    });
}

//Event Listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // if(username.value === '')
    // {
    //     showError(username,'Username is required');
    // }else{
    //     showSuccess(username);
    // }

    // if(email.value === '')
    // {
    //     showError(email,'Email ID is required!');
    // }else if(!isValidEmail(email.value)){
    //     showError(email,'Email is not Valid!')
    // }else{
    //     showSuccess(email);
    // }

    // if(password.value === '')
    // {
    //     showError(password,'Password is required');
    // }else{
    //     showSuccess(password);
    // }

    // if(confirmpassword.value === '')
    // {
    //     showError(confirmpassword,'Re-Enter the Password');
    // }else{
    //     showSuccess(confirmpassword);
    // }


    //Optmised Code
    checkRequired([username,email,password,confirmpassword])
});