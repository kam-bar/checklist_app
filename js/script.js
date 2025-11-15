{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
                done: false,
            },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = tasks.filter((task, index) => index !== taskIndex);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) =>
            index === taskIndex ? { ...task, done: !task.done } : task
        );
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map((task) => ({ ...task, done: true }));
        render();
    };

    const areAllTasksDone = () => {
        return tasks.length > 0 && tasks.every((task) => task.done);
    };
    const renderButtons = () => {
        const buttonsContainer = document.querySelector(".js-buttons");

        if (tasks.length === 0) {
            buttonsContainer.innerHTML = "";
            return;
        }

        const toggleButtonText = hideDoneTasks ? "Pokaż" : "Ukryj";
        const allTasksDone = areAllTasksDone();

        buttonsContainer.innerHTML = `
        <button class="section__button" id="toggleHide">
            ${toggleButtonText} ukończone
        </button>
        <button 
            class="section__button" 
            id="completeAll"
            ${allTasksDone ? "disabled" : ""}
        >
            Ukończ wszystkie
        </button>
    `;
    };

const bindButtonEvents = () => {
    const toggleButton = document.getElementById("toggleHide");
    const completeAllButton = document.getElementById("completeAll");

    if (toggleButton) {
        toggleButton.addEventListener("click", toggleHideDoneTasks);
    }

    if (completeAllButton) {
        completeAllButton.addEventListener("click", completeAllTasks);
    }
};

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            const hiddenClass =
                task.done && hideDoneTasks ? "tasks__item--hidden" : "";

            htmlString += `
            <li class="tasks__item ${hiddenClass}" >
                <button class="tasks__button tasks__button--done js-done">
                    ${task.done ? "✓" : ""}
                </button>
                <span class="tasks__content ${
                    task.done ? "tasks__content--done" : ""
                }">
                    ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                    🗑
                </button>
            </li>
        `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;

        renderButtons();
        bindRemoveButtons();
        bindToggleDoneButtons();
        bindButtonEvents();
    };

    const bindRemoveButtons = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneButtons = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);

        newTaskElement.value = "";
        newTaskElement.focus();
    };

    const init = () => {
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
