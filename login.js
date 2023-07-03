// Function to handle the login process
function login() {
  var email = document.getElementById("email").value; // Get the value of the email input field
  var password = document.getElementById("password").value; // Get the value of the password input field

  if (email === "todo@gmail.com" && password === "student") {
    // Check if the email and password match the expected values
    window.location.href = "./dashboard.html"; // Redirect the user to the dashboard.html page
  } else {
    // If the email or password is incorrect
    alert("Invalid email or password. Please try again."); // Display an alert message to the user
  }
}

// Event listener to handle the sign-in button click event
document.addEventListener("DOMContentLoaded", function () {
  var signInButton = document.getElementById("signIn"); // Get the sign-in button element
  signInButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    login(); // Call the login function to handle the login process
  });
});
