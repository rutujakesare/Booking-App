document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("appointmentForm");
    const appointmentsDiv = document.getElementById("appointments");

    
    function fetchAppointments() {
        axios.get("http://localhost:5000/api/appointments")
            .then(response => {
                console.log("Fetched Appointments:", response.data); // Debugging
                appointmentsDiv.innerHTML = "";
                if (response.data.length === 0) {
                    appointmentsDiv.innerHTML = "<p>No appointments found</p>";
                }
                response.data.forEach(appointment => {
                    const div = document.createElement("div");
                    div.innerHTML = `
                        <p><strong>${appointment.name}</strong> - ${appointment.email} - ${appointment.phone}</p>
                        <button onclick="deleteAppointment(${appointment.id})">Delete</button>
                        <button onclick="editAppointment(${appointment.id}, '${appointment.name}', '${appointment.email}', '${appointment.phone}')">Edit</button>
                        <hr>
                    `;
                    appointmentsDiv.appendChild(div);
                });
            })
            .catch(error => console.error("Fetch error:", error));
    }
    
    

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        if (!phone) {
            alert("Phone number is required!");
            return;
        }
        axios.post("http://localhost:5000/api/appointments", { name, email, phone })
            .then(() => {
                form.reset();
                fetchAppointments();
            })
            .catch(error => console.error(error));
    });

    window.deleteAppointment = function (id) {
        axios.delete(`http://localhost:5000/api/appointments/${id}`)
            .then(() => fetchAppointments())
            .catch(error => console.error(error));
    };

    window.editAppointment = function (id, name, email) {
        const newName = prompt("Edit Name:", name);
        const newEmail = prompt("Edit Email:", email);
        const newPhone = prompt("Edit Phone:", phone); // Added phone
        if (newName && newEmail && newPhone) {
            axios.put(`http://localhost:5000/api/appointments/${id}`, { name: newName, email: newEmail, phone: newPhone  })
                .then(() => fetchAppointments())
                .catch(error => console.error(error));
        }
    };

    fetchAppointments(); // Load appointments on page load
});
