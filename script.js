document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Here you would typically validate the username and password
    // For simplicity, let's assume any username and password combination is valid
    showMainPage();
});

document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const classroom = document.getElementById('classroom').value;

    const bookedList = document.getElementById('booked-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${name}</strong> booked <strong>${classroom}</strong> on <strong>${date}</strong> at <strong>${time}</strong>`;
    bookedList.appendChild(listItem);

    document.getElementById('booking-form').reset();
});

document.getElementById('classroom-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newClassroom = document.getElementById('new-classroom').value;
    const classroomList = document.getElementById('classroom-list');
    const listItem = document.createElement('li');
    listItem.textContent = newClassroom;
    classroomList.appendChild(listItem);
    
    // Add the new classroom option to the booking form
    const classroomSelect = document.getElementById('classroom');
    const newOption = document.createElement('option');
    newOption.value = newClassroom;
    newOption.textContent = newClassroom;
    classroomSelect.appendChild(newOption);
    
    document.getElementById('classroom-form').reset();
});

function showMainPage() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';
}
