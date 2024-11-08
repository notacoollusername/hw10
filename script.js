let editIndex = -1; 


function validateForm() {
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;

    if (name === "") {
        alert("Name cannot be empty.");
        return false;
    }

    if (number.length < 11) {
        alert("Phone number must be at least 11 digits.");
        return false;
    }

    if (number === "") {
        alert("Phone number cannot be empty.");
        return false;
    }

    return true;
}


function addData() {
    if (!validateForm()) return;

    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;

    const peopleList = localStorage.getItem("peoplelist") ? JSON.parse(localStorage.getItem("peoplelist")) : [];
    peopleList.push({ name, number });
    localStorage.setItem("peoplelist", JSON.stringify(peopleList));

    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
    showData();
}


function showData() {
    const peopleList = localStorage.getItem("peoplelist") ? JSON.parse(localStorage.getItem("peoplelist")) : [];
    const tbody = document.getElementById("peopleListBody");
    tbody.innerHTML = ""; 

    peopleList.forEach(function(element, index) {
        const row = document.createElement("tr");
        row.className = "border-b";
        row.innerHTML = `<td class='py-2 px-4'>${element.name}</td>
                         <td class='py-2 px-4'>${element.number}</td>
                         <td class='py-2 px-4'>
                             <button onclick="editData(${index})" class='bg-purple-600 text-white p-1 rounded hover:bg-purple-500'>Edit</button>
                             <button onclick="deleteData(${index})" class='bg-red-600 text-white p-1 rounded hover:bg-red-500'>Delete</button>
                         </td>`;
        tbody.appendChild(row);
    });
}


function editData(index) {
    const peopleList = JSON.parse(localStorage.getItem("peoplelist"));
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("number").value = peopleList[index].number;
    editIndex = index;
    document.getElementById("submit").classList.add("hidden");
    document.getElementById("update").classList.remove("hidden");
}


document.getElementById("update").onclick = function() {
    if (!validateForm()) return;

    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;

    const peopleList = JSON.parse(localStorage.getItem("peoplelist"));
    peopleList[editIndex] = { name, number };
    localStorage.setItem("peoplelist", JSON.stringify(peopleList));

    document.getElementById("name").value = "";
    document.getElementById("number").value = "";
    editIndex = -1;
    document.getElementById("submit").classList.remove("hidden");
    document.getElementById("update").classList.add("hidden");
    showData();
}


function deleteData(index) {
    const peopleList = JSON.parse(localStorage.getItem("peoplelist"));
    peopleList.splice(index, 1);
    localStorage.setItem("peoplelist", JSON.stringify(peopleList));
    showData();
}


function searchContacts() {
    const query = document.getElementById("search").value.toLowerCase();
    const peopleList = JSON.parse(localStorage.getItem("peoplelist")) || [];
    const filteredList = peopleList.filter(contact => contact.name.toLowerCase().includes(query) || contact.number.includes(query));
    
    const tbody = document.getElementById("peopleListBody");
    tbody.innerHTML = "";

    filteredList.forEach(function(element, index) {
        const row = document.createElement("tr");
        row.className = "border-b";
        row.innerHTML = `<td class='py-2 px-4'>${element.name}</td>
                         <td class='py-2 px-4'>${element.number}</td>
                         <td class='py-2 px-4'>
                             <button onclick="editData(${index})" class='bg-purple-600 text-white p-1 rounded hover:bg-purple-500'>Edit</button>
                             <button onclick="deleteData(${index})" class='bg-red-600 text-white p-1 rounded hover:bg-red-500'>Delete</button>
                         </td>`;
        tbody.appendChild(row);
    });
}


window.onload = function() {
    showData();
    document.getElementById("submit").addEventListener("click", function(event) {
        event.preventDefault(); 
        addData();
    });
}
