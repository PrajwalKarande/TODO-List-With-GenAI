var noOftasks = 0;
function addTask() {
    var task = document.getElementById("uinput");
    if (task.value.trim() === "") return; // Prevent empty tasks

    var table = document.getElementById("task-table");
    var row = table.insertRow();  // Create new row
    row.id = "task-" + ++noOftasks;


    var taskCell = row.insertCell(0);
    taskCell.innerText = task.value;

    // Edit button
    var editCell = row.insertCell(1);
    var editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = function() {
        var editTask = prompt("Edit Task", taskCell.innerText);
        if (editTask !== null && editTask.trim() !== "") {
            taskCell.innerText = editTask;
        }
    };
    editCell.appendChild(editBtn);

    // Delete button
    var deleteCell = row.insertCell(2);
    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function() {
        row.remove();
    };
    deleteCell.appendChild(deleteBtn);

    task.value = ""; // Clear input field after adding
}

async function generate(){
    const API_KEY = "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";

    var task = document.getElementById("uinput");
    if (task.value.trim() === "") return;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions",{
                method:"post",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: "Bearer "+API_KEY,
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages:[
                        {
                            "role": "system",
                            "content": "For a provided user query give daily at least 10 tasks to do in tasks array in the json response for example\nuser query: i want to learn programming\nresponse: tasks['first start with js','learn node.js','learn express.js' ]provide only tasks in the response"
                        },
                        {
                            role:"user",
                            content:task.value
                        },
                    ],
                })
    });

    const data = await response.json();
    console.log(data);
    try{
    const tasks = JSON.parse(data.choices[0].message.content).tasks;

        tasks.forEach(element => {
            var table = document.getElementById("task-table");
            var row = table.insertRow();  // Create new row
            row.id = "task-" + ++noOftasks;

            // Task cell
            var taskCell = row.insertCell(0);
            taskCell.innerText = element;

            // Edit button
            var editCell = row.insertCell(1);
            var editBtn = document.createElement("button");
            editBtn.innerText = "Edit";
            editBtn.classList.add("edit-btn");
            editBtn.onclick = function () {
                var editTask = prompt("Edit Task", taskCell.innerText);
                if (editTask !== null && editTask.trim() !== "") {
                    taskCell.innerText = editTask;
                }
            };
            editCell.appendChild(editBtn);

            // Delete button
            var deleteCell = row.insertCell(2);
            var deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = function () {
                row.remove();
            };
            deleteCell.appendChild(deleteBtn);
        });

    } catch (error) {
        console.error("Error parsing AI response:", error);
    }


}
