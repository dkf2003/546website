const form = document.getElementById('accountHandling');
const username = document.getElementById('loginUser');
const password = document.getElementById('loginPassword');
const confirmPassword = document.getElementById('confirmPassword');
const email = document.getElementById('loginEmail');
const error = document.getElementById('error');
let signup = false;

if (form) {
    form.addEventListener('submit', async (e) => {

        try {
            //console.log(username.value);
            username.value = validateString(username.value, 'Username');
            password.value = validatePassword(password.value, 'Password');
            
            if (email) {
                email.value = validateEmailAddress(email.value, 'Email');
                signup = true;
            };
            if (confirmPassword) {
                confirmPassword.value = validatePassword(confirmPassword.value, 'Confirm Password');
                if(confirmPassword.value !== password.value){
                    throw 'Passwords do not match';
                }
            }

        } catch (err) {
            e.preventDefault();
            error.textContent = err;
        }
    });
}