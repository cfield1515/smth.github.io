// Define available classrooms (you can load this from a file or a database)
let availableClassrooms = ["Room 101", "Room 102", "Room 103"];

// Define booked slots
let bookedSlots = [];

// Function to handle login
function login() {
    // Your login logic here
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

// Functions to handle navigation
document.getElementById("myBookingsLink").addEventListener("click", function(event) {
    event.preventDefault();
    showPage("myBookingsPage");
});

document.getElementById("bookClassroomLink").addEventListener("click", function(event) {
    event.preventDefault();
    showPage("bookingPage");
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
}
