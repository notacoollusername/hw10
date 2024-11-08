let root = document.getElementById("taskLists");

class TaskManager {
    constructor(place) {
        this.place = place;
        this.tasks = [];
        this.render();
    }

    render() {
        this.place.innerHTML = ''; 
        this.createTaskLists();
    }

    createTaskLists() {
        ['To Do', 'Doing', 'Done'].forEach(state => {
            const listDiv = document.createElement('div');
            const title = document.createElement('h2');
            title.textContent = state;

            const ul = document.createElement('ul');
            this.tasks.forEach(task => {
                if (task.state === state) {
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <span class="displayText">${task.description} (Due: ${task.dueDate}, Assigned to: ${task.assignee})</span>
                        <input type="text" class="editInput" value="${task.description}" />
                        <input type="text" class="editInput" value="${task.assignee}" />
                        <input type="date" class="editInput" value="${task.dueDate}" />
                        <select class="editInput">
                            <option value="To Do" ${task.state === 'To Do' ? 'selected' : ''}>To Do</option>
                            <option value="Doing" ${task.state === 'Doing' ? 'selected' : ''}>Doing</option>
                            <option value="Done" ${task.state === 'Done' ? 'selected' : ''}>Done</option>
                        </select>
                        <button onclick="taskManager.toggleEdit('${task.id}', this)">Edit</button>
                        <button onclick="taskManager.deleteTask('${task.id}')">Delete</button>
                    `;
                    ul.appendChild(li);
                }
            });

            listDiv.appendChild(title);
            listDiv.appendChild(ul);
            this.place.appendChild(listDiv);
        });
    }

    addTask(description, assignee, dueDate, state) {
        if (description && assignee && dueDate) {
            const task = {
                id: this.generateId(),
                description,
                assignee,
                dueDate,
                state,
            };
            this.tasks.push(task);
            this.render(); 
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.render();
    }

    toggleEdit(taskId, button) {
        const li = button.parentNode;
        const inputs = li.querySelectorAll('.editInput');
        const displayText = li.querySelector('.displayText');

        const task = this.tasks.find(task => task.id === taskId);

        if (button.textContent === 'Edit') {
    
            inputs.forEach(input => input.style.display = 'inline');
            displayText.style.display = 'none';
            button.textContent = 'Save';
        } else {
       
            task.description = inputs[0].value;
            task.assignee = inputs[1].value;
            task.dueDate = inputs[2].value;
            task.state = inputs[3].value;

   
            inputs.forEach(input => input.style.display = 'none');
            displayText.textContent = `${task.description} (Due: ${task.dueDate}, Assigned to: ${task.assignee})`;
            displayText.style.display = 'inline';
            button.textContent = 'Edit';
            this.render(); 
        }
    }

    generateId() {
        return '_' + Math.random().toString();
    }
}


const taskManager = new TaskManager(root);

document.getElementById("addTaskButton").onclick = () => {
    const description = document.getElementById("taskInput").value;
    const assignee = document.getElementById("assigneeInput").value;
    const dueDate = document.getElementById("dueDateInput").value;
    const state = document.getElementById("stateSelect").value;
    taskManager.addTask(description, assignee, dueDate, state);

    document.getElementById("taskInput").value = '';
    document.getElementById("assigneeInput").value = '';
    document.getElementById("dueDateInput").value = '';
    document.getElementById("stateSelect").value = 'To Do'; 
};
