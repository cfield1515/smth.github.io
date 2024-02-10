// Function to check login credentials
function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Fetch credentials from a text file (Assuming credentials.txt contains username:password pairs)
    fetch('credentials.txt')
    .then(response => response.text())
    .then(data => {
        var lines = data.split('\n');
        var found = false;
        for (var i = 0; i < lines.length; i++) {
            var pair = lines[i].split(':');
            if (pair[0].trim() === username && pair[1].trim() === password) {
                found = true;
                break;
            }
        }
        if (found) {
            document.getElementById("loginPage").style.display = "none";
            document.getElementById("bookingPage").style.display = "block";
        } else {
            document.getElementById("loginMessage").innerText = "Invalid username or password";
        }
    });
}
