document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");
    const progressBar = document.getElementById("progress");
    const progressNumbers = document.getElementById("numbers");


    function updateProgress() {

        const totalTasks = taskList.children.length;

        const completedTasks =
            taskList.querySelectorAll(".checkbox:checked").length;


        progressNumbers.textContent =
            `${completedTasks} / ${totalTasks}`;


        progressBar.style.width =
            totalTasks > 0
                ? `${(completedTasks / totalTasks) * 100}%`
                : "0%";
    }



    function addTask(text = "") {

        const taskText =
            text || taskInput.value.trim();

        if (!taskText) return;


        const li = document.createElement("li");


        li.innerHTML = `

            <input type="checkbox" class="checkbox">

            <span>${taskText}</span>


            <div class="task-buttons">

                <button class="edit-btn">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button class="delete-btn">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        `;



        const checkbox =
            li.querySelector(".checkbox");


        const editBtn =
            li.querySelector(".edit-btn");


        const deleteBtn =
            li.querySelector(".delete-btn");



        checkbox.addEventListener("change", () => {

            li.classList.toggle(
                "completed",
                checkbox.checked
            );

            updateProgress();

        });



        editBtn.addEventListener("click", () => {

            if (checkbox.checked) return;

            taskInput.value =
                li.querySelector("span").textContent;

            li.remove();

            updateProgress();

        });



        deleteBtn.addEventListener("click", () => {

            li.remove();

            updateProgress();

        });



        taskList.appendChild(li);


        taskInput.value = "";


        updateProgress();

    }




    addTaskBtn.addEventListener("click", (e) => {

        e.preventDefault();

        addTask();

    });



    taskInput.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            e.preventDefault();

            addTask();

        }

    });



    updateProgress();

});