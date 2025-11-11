{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    };

const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
            <li class="tasks__item">
                <button class="tasks__button tasks__button--done js-done">
                    ${task.done ? "✓" : ""}
                </button>
                <span class="tasks__content ${task.done ? "tasks__content--done" : ""}">
                    ${task.content}
                </span>
                <button class="tasks__button tasks__button--remove js-remove">
                    🗑
                </button>
            </li>
        `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;
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