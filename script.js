// Define available classrooms (you can load this from a file or a database)
let availableClassrooms = ["Room 101", "Room 102", "Room 103"];

// Define booked slots
let bookedSlots = [];

// Function to handle login
function login() {
    let username = document.getElementById("username").value.trim(); // Trim whitespace
    let password = document.getElementById("password").value.trim(); // Trim whitespace

    // Fetch credentials from a text file (Assuming credentials.txt contains username:password pairs)
    fetch('credentials.txt')
    .then(response => response.text())
    .then(data => {
        var lines = data.split('\n');
        var found = false;
        for (var i = 0; i < lines.length; i++) {
            var pair = lines[i].split(':');
            if (pair[0].trim() === username && pair[1].trim() === password) { // Trim whitespace
                found = true;
                break;
            }
        }
        if (found) {
            showPage("bookingPage");
        } else {
            document.getElementById("loginMessage").innerText = "Invalid username or password";
        }
    });
}

// Function to handle form submission
document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let classroom = document.getElementById("classroom").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;

    // Check if the slot is available
    if (!isSlotAvailable(classroom, date, time)) {
        document.getElementById("bookingMessage").innerText = "Sorry, this slot is already booked.";
        return;
    }

    // Add the booking
    bookedSlots.push({name: name, classroom: classroom, date: date, time: time});
    document.getElementById("bookingMessage").innerText = "Booking successful!";
    updateMyBookings();
});

// Function to check if a slot is available
function isSlotAvailable(classroom, date, time) {
    for (let i = 0; i < bookedSlots.length; i++) {
        if (bookedSlots[i].classroom === classroom && bookedSlots[i].date === date && bookedSlots[i].time === time) {
            return false;
        }
    }
    return true;
}

// Function to update "My Bookings" page
function updateMyBookings() {
    let myBookingsList = document.getElementById("myBookingsList");
    myBookingsList.innerHTML = "";
    bookedSlots.forEach(function(booking) {
        if (booking.name === "admin") { // Assuming "admin" is the user's username after login
            let listItem = document.createElement("li");
            listItem.innerText = `${booking.date} at ${booking.time}: ${booking.classroom}`;
            myBookingsList.appendChild(listItem);
        }
    });
}

// Functions to handle navigation
document.getElementById("myBookingsLink").addEventListener("click", function(event) {
    event.preventDefault();
    showPage("myBookingsPage");
});

document.getElementById("bookClassroomLink").addEventListener("click", function(event) {
    event.preventDefault();
    showPage("bookingPage");
});

document.getElementById("addRoomButton").addEventListener("click", function(event) {
    event.preventDefault();
    addClassroom();
});

document.getElementById("allBookedClassroomsLink").addEventListener("click", function(event) {
    event.preventDefault();
    showPage("allBookedClassroomsPage");
});

// Function to show a specific page and hide others
function showPage(pageId) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("bookingPage").style.display = "none";
    document.getElementById("myBookingsPage").style.display = "none";
    document.getElementById("allBookedClassroomsPage").style.display = "none";

    document.getElementById(pageId).style.display = "block";

    if (pageId === "myBookingsPage") {
        updateMyBookings();
    } else if (pageId === "allBookedClassroomsPage") {
        updateAllBookedClassrooms();
    }
}

// Function to update "All Booked Classrooms" page
function updateAllBookedClassrooms() {
    let allBookedClassroomsList = document.getElementById("allBookedClassroomsList");
    allBookedClassroomsList.innerHTML = "";
    let bookedClassrooms = {};
    bookedSlots.forEach(function(booking) {
        if (!bookedClassrooms[booking.classroom]) {
            bookedClassrooms[booking.classroom] = [];
        }
        bookedClassrooms[booking.classroom].push(`${booking.date} at ${booking.time}`);
    });
    for (let classroom in bookedClassrooms) {
        let listItem = document.createElement("li");
        listItem.innerText = `${classroom}: ${bookedClassrooms[classroom].join(", ")}`;
        allBookedClassroomsList.appendChild(listItem);
    }
}

// Function to add classroom
function addClassroom() {
    let classroom = prompt("Enter the name of the classroom:");
    if (classroom) {
        availableClassrooms.push(classroom);
        updateClassroomDropdown();
    }
}

// Function to update classroom dropdown
function updateClassroomDropdown() {
    let classroomDropdown = document.getElementById("classroom");
    classroomDropdown.innerHTML = "";
    availableClassrooms.forEach(function(classroom) {
        let option = document.createElement("option");
        option.text = classroom;
        classroomDropdown.add(option);
    });
}

// Initialize the classroom dropdown
updateClassroomDropdown();
