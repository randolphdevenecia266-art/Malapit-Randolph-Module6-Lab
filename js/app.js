// Pure validation function for student number
function isValidStudentNumber(value) {
    const trimmedValue = String(value).trim();
    const studentNumberPattern = /^\d{2}-\d{4}-\d{3}$/;

    return studentNumberPattern.test(trimmedValue);
}


// Pure validation function for password
function isValidPassword(value) {
    const password = String(value);

    if (password.length < 8) {
        return false;
    }

    if (/\s/.test(password)) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if (!/\d/.test(password)) {
        return false;
    }

    if (!/[@$!]/.test(password)) {
        return false;
    }

    return true;
}


// CommonJS export for the autograder
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        isValidStudentNumber,
        isValidPassword
    };
}


// Browser code
if (typeof document !== "undefined") {

    const form = document.getElementById("registrationForm");

    const fullName = document.getElementById("fullName");
    const studentNumber = document.getElementById("studentNumber");
    const email = document.getElementById("email");
    const mobileNumber = document.getElementById("mobileNumber");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const course = document.getElementById("course");
    const terms = document.getElementById("terms");

    const fullNameError = document.getElementById("fullNameError");
    const studentNumberError = document.getElementById("studentNumberError");
    const emailError = document.getElementById("emailError");
    const mobileNumberError = document.getElementById("mobileNumberError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const courseError = document.getElementById("courseError");
    const termsError = document.getElementById("termsError");

    const passwordFeedback = document.getElementById("passwordFeedback");
    const successMessage = document.getElementById("successMessage");
    const registrationSummary = document.getElementById("registrationSummary");

    const summaryName = document.getElementById("summaryName");
    const summaryStudentNumber = document.getElementById("summaryStudentNumber");
    const summaryEmail = document.getElementById("summaryEmail");
    const summaryMobileNumber = document.getElementById("summaryMobileNumber");
    const summaryCourse = document.getElementById("summaryCourse");


    function setError(field, errorElement, message) {
        errorElement.textContent = message;

        if (message) {
            field.setAttribute("aria-invalid", "true");
        } else {
            field.setAttribute("aria-invalid", "false");
        }
    }


    function validateFullName() {
        const value = fullName.value.trim();

        if (value.length < 2) {
            setError(
                fullName,
                fullNameError,
                "Enter a valid full name with at least two characters."
            );
            return false;
        }

        setError(fullName, fullNameError, "");
        return true;
    }


    function validateStudentNumber() {
        const value = studentNumber.value.trim();

        if (!isValidStudentNumber(value)) {
            setError(
                studentNumber,
                studentNumberError,
                "Enter a student number in the format 24-1234-123."
            );
            return false;
        }

        setError(studentNumber, studentNumberError, "");
        return true;
    }


    function validateEmail() {
        const value = email.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value === "" || !emailPattern.test(value)) {
            setError(
                email,
                emailError,
                "Enter a valid email address."
            );
            return false;
        }

        setError(email, emailError, "");
        return true;
    }


    function validateMobileNumber() {
        const value = mobileNumber.value.trim();

        const mobilePattern = /^(09\d{9}|\+639\d{9})$/;

        if (!mobilePattern.test(value)) {
            setError(
                mobileNumber,
                mobileNumberError,
                "Enter 09 followed by nine digits or +639 followed by nine digits."
            );
            return false;
        }

        setError(mobileNumber, mobileNumberError, "");
        return true;
    }


    function validatePassword() {
        const value = password.value;

        if (!isValidPassword(value)) {
            setError(
                password,
                passwordError,
                "Password must have at least 8 characters, one uppercase letter, one digit, and one of @, $, or !, with no spaces."
            );
            return false;
        }

        setError(password, passwordError, "");
        return true;
    }


    function updatePasswordFeedback() {
        const value = password.value;

        if (value === "") {
            passwordFeedback.textContent = "";
            return;
        }

        if (isValidPassword(value)) {
            passwordFeedback.textContent =
                "Password meets all requirements.";
            passwordFeedback.className = "feedback valid";
        } else {
            passwordFeedback.textContent =
                "Password needs 8+ characters, one uppercase letter, one digit, one of @, $, or !, and no spaces.";
            passwordFeedback.className = "feedback";
        }
    }


    function validateConfirmPassword() {
        const value = confirmPassword.value;

        if (value === "") {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Please confirm your password."
            );
            return false;
        }

        if (value !== password.value) {
            setError(
                confirmPassword,
                confirmPasswordError,
                "Passwords do not match."
            );
            return false;
        }

        setError(confirmPassword, confirmPasswordError, "");
        return true;
    }


    function validateCourse() {
        if (course.value !== "BSIT" && course.value !== "BSCS") {
            setError(
                course,
                courseError,
                "Please select BSIT or BSCS."
            );
            return false;
        }

        setError(course, courseError, "");
        return true;
    }


    function validateTerms() {
        if (!terms.checked) {
            setError(
                terms,
                termsError,
                "You must agree to the terms and conditions."
            );
            return false;
        }

        setError(terms, termsError, "");
        return true;
    }


    // Submit event
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const validFullName = validateFullName();
        const validStudentNumber = validateStudentNumber();
        const validEmail = validateEmail();
        const validMobileNumber = validateMobileNumber();
        const validPassword = validatePassword();
        const validConfirmPassword = validateConfirmPassword();
        const validCourse = validateCourse();
        const validTerms = validateTerms();

        if (
            validFullName &&
            validStudentNumber &&
            validEmail &&
            validMobileNumber &&
            validPassword &&
            validConfirmPassword &&
            validCourse &&
            validTerms
        ) {
            successMessage.textContent =
                "Registration details validated successfully!";

            registrationSummary.hidden = false;

            // Use textContent for user-entered values
            summaryName.textContent = fullName.value.trim();
            summaryStudentNumber.textContent = studentNumber.value.trim();
            summaryEmail.textContent = email.value.trim();
            summaryMobileNumber.textContent = mobileNumber.value.trim();
            summaryCourse.textContent = course.value;
        } else {
            successMessage.textContent = "";
            registrationSummary.hidden = true;
        }
    });


    // Password input event
    password.addEventListener("input", function () {
        updatePasswordFeedback();
        validatePassword();

        if (confirmPassword.value !== "") {
            validateConfirmPassword();
        }
    });


    // Full name blur event
    fullName.addEventListener("blur", function () {
        validateFullName();
    });


    // Course change event
    course.addEventListener("change", function () {
        validateCourse();
    });


    // Terms change event
    terms.addEventListener("change", function () {
        validateTerms();
    });


    // Other fields can also be rechecked while corrected
    studentNumber.addEventListener("blur", function () {
        validateStudentNumber();
    });

    email.addEventListener("blur", function () {
        validateEmail();
    });

    mobileNumber.addEventListener("blur", function () {
        validateMobileNumber();
    });

    confirmPassword.addEventListener("blur", function () {
        validateConfirmPassword();
    });


    // Reset event
    form.addEventListener("reset", function () {

        setTimeout(function () {

            fullName.setAttribute("aria-invalid", "false");
            studentNumber.setAttribute("aria-invalid", "false");
            email.setAttribute("aria-invalid", "false");
            mobileNumber.setAttribute("aria-invalid", "false");
            password.setAttribute("aria-invalid", "false");
            confirmPassword.setAttribute("aria-invalid", "false");
            course.setAttribute("aria-invalid", "false");
            terms.setAttribute("aria-invalid", "false");

            fullNameError.textContent = "";
            studentNumberError.textContent = "";
            emailError.textContent = "";
            mobileNumberError.textContent = "";
            passwordError.textContent = "";
            confirmPasswordError.textContent = "";
            courseError.textContent = "";
            termsError.textContent = "";

            passwordFeedback.textContent = "";
            successMessage.textContent = "";

            registrationSummary.hidden = true;

            summaryName.textContent = "";
            summaryStudentNumber.textContent = "";
            summaryEmail.textContent = "";
            summaryMobileNumber.textContent = "";
            summaryCourse.textContent = "";

        }, 0);
    });

}