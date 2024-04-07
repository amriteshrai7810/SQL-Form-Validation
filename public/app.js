const form = document.getElementById("form"); 
const username = document.getElementById("username"); 
const email = document.getElementById("email"); 
const password = document.getElementById("password"); 
const confirmPassword = document.getElementById('confirm-password'); 
const showPassword = document.getElementById("show-password");
const failureIcon = document.getElementsByClassName('failure-icon');
const successIcon = document.getElementsByClassName('success-icon');
const toggleEye = document.querySelector('.toggle-icon')


let isRequired = value => value === '' ? false : true;

let isBetween = (length, min, max) => length < min || length > max ? false : true;

// function that show the error message
const setError = (input, message) => {
    // get the form-field element
    const inputControl = input.parentElement;
    console.log(inputControl);
    // add the error class
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
    // console.log(inputControl);
    // show the error message
    const errorDisplay = inputControl.querySelector('.error')
    errorDisplay.innerText = message;
}



// function that show the success message
const setSuccess = input => {
    const inputControl = input.parentElement;
    console.log(inputControl);

    inputControl.classList.remove('error');
    inputControl.classList.add('success');

    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
}

// Function to set opacity for success and failure icons
const setIconOpacity = (index, successOpacity, failureOpacity) => {
    if (successIcon[index]) {
        successIcon[index].style.opacity = successOpacity;
    }
    if (failureIcon[index]) {
        failureIcon[index].style.opacity = failureOpacity;
    }
}

// To check the email is valid
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// To check if a password is strong
const isPasswordSecure = password => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

// 1. check if username match the given regex
const checkUsername = () => {
    let valid = false;
    const min = 3,
     max = 25;
    const usernameValue = username.value.trim();

    if (!isRequired(usernameValue)) {
        setError(username, 'Username cannot be blank.')
        setIconOpacity(0, 0, 1);
    } else if (!isBetween(usernameValue.length, min, max)) {
        setError(username, `Username must be between ${min} and ${max} characters.`);
        setIconOpacity(0, 0, 1);
    } else {
        setSuccess(username);
        setIconOpacity(0, 1, 0);
        valid = true;
    }
    return valid;
}

// 2. Check emial validity
const checkEmail = () => {
    let valid = false;
    const emailValue = email.value.trim();

    if (!isRequired(emailValue)) {
        setError(email, 'Email cannot be blank.')
                setIconOpacity(1, 0, 1);
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Please enter a valid email');
                setIconOpacity(1, 0, 1);
    } else {
        setSuccess(email);
                setIconOpacity(1, 1, 0);
        valid = true;
    }
    return valid;
}

// 3. check if password is secure enough or not using regEx()  
const checkPassword = () => {
    let valid = false;
    const passwordValue = password.value.trim();

    if (!isRequired(passwordValue)) {
        setError(password, 'Password cannot be blank.')
                setIconOpacity(2, 0, 1);
    } else if (!isPasswordSecure(passwordValue)) {
        if (passwordValue.length < 8) {
            setError(password, 'Password must have at least 8 characters');
        } else if (!passwordValue.match(/[a-z]/)) {
            setError(password, 'Password must include at least 1 lowercase character');
        } else if (!passwordValue.match(/[A-Z]/)) {
            setError(password, 'Password must include at least 1 uppercase character');
        } else if (!passwordValue.match(/[0-9]/)) {
            setError(password, 'Password must include at least 1 number');
        } else if (!passwordValue.match(/[!@#$%^&*]/)) {
            setError(password, 'Password must include at least 1 special character from (!@#$%^&*)');
        } else {
            // Password meets all criteria
            setError(password);
        }
                setIconOpacity(2, 0, 1);
    } else {
        setSuccess(password);
                setIconOpacity(2, 1, 0);
        valid = true;
        console.log(`pass: ${passwordValue}`);
    }
    return valid;
}


// Show password confirmation
toggleEye.addEventListener('click', () => {
    const icon = toggleEye.querySelector('i');

    if (password.type === 'password') {
        password.type = 'text';
        confirmPassword.type = 'text'
        toggleEye.type = 'hide';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        toggleEye.setAttribute("aria-label", "hide password");
        toggleEye.setAttribute("aria-checked", "true");
    } else {
        password.type = 'password';
        confirmPassword.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        toggleEye.setAttribute("aria-label", "show password");
        toggleEye.setAttribute("aria-checked", "false");
    }
})

// Function to clear the error message and hide the error icon
const clearError = (element) => {
    const inputControl = element.parentElement
    inputControl.classList.remove('error', 'success'); // Remove error and success classes
    element.nextElementSibling.textContent = '' // Clear the error message
}


// 4. check confirm password matches password
const checkConfirmPassword = () => {
    let valid = false;
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();

    if (confirmPasswordValue === '') {
        setError(confirmPassword, 'Confirm password cannot be blank');
                setIconOpacity(3, 0, 1);
        clearError(confirmPassword)
    } else if (confirmPasswordValue !== passwordValue) {
        setError(confirmPassword, 'Confirm password does not match');
                setIconOpacity(3, 0, 1);
    } else {
        setSuccess(confirmPassword);
                setIconOpacity(3, 1, 0);
        valid = true;
        console.log(`confirm pass: ${confirmPasswordValue}`);
    }
    return valid;
}

// Function to check if all form fields are filled out
const isFormValid = () => {
    // Iterate over each form field
    const inputs = [username, email, password, confirmPassword];
    for (let input of inputs) {
        // Check if the value of the input field is empty
        if (input.value.trim() === '') {
            return false; // Return false if any field is empty
        }
    }
    return true; // Return true if all fields are filled out
};



// Event listeners to trigger validation on input
password.addEventListener('input', () => checkPassword());
confirmPassword.addEventListener('input', () => checkConfirmPassword());

// Reset icons on form submission
const resetIcons = () => {
    for (let i = 0; i < failureIcon.length; i++) {
        failureIcon[i].style.opacity = '0';
    }
    for (let i = 0; i < successIcon.length; i++) {
        successIcon[i].style.opacity = '0';        
    }
}

const formReset = () => {
    // Clear the value of each form field
    username.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''

    // Clear error messages and reset styling
    clearError(username)
    clearError(email)
    clearError(password)
    clearError(confirmPassword)

    // Reset Icons
    resetIcons()
}

form.addEventListener("submit", e => {

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

     
        if (typeof isFormValid === 'function' && isFormValid()) {
            // Submit the form to the server if it's valid
            submitToServer();
        } else {
            // Handle the case where the form is not valid
            const emptyFields = findEmptyFields();
            if (emptyFields.length > 0) {
                // Display error message for empty fields
                emptyFields.forEach(field => {
                    const fieldName = field.id.replace('-', ' ');
                    console.log(`Please fill out ${fieldName}.`);
                });
            }
        }

    // Reset the form after submission
    formReset();

})


// Function to submit form data to the server
const submitToServer = () => {
    // Construct data object to send to the server
    const formData = {
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        confirmPassword: confirmPassword.value.trim()
        // Add more fields if needed
    }
    };

// Add Instant feedback feature
// using Debounce function is =>
// a debounce function makes sure that your code is only triggered once per user input

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirmPassword':
            checkConfirmPassword();
            break;
    }
}));


