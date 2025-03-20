document.addEventListener("DOMContentLoaded", function () {
  fetch("https://momentum.redberryinternship.ge/api/tasks", {
    method: "GET",
    headers: {
      Authorization: "Bearer 9e743d74-acd5-43b9-816c-4f5d713624eb",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((task) => {
        createTaskCard(task);
      });
    });
});

function createTaskCard(task) {
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  const priorityIcon = document.createElement("img");
  priorityIcon.src = task.priority.icon;
  priorityIcon.classList.add("priority-icon");

  const departmentName = document.createElement("p");
  departmentName.classList.add("department-name");
  departmentName.textContent = task.department.name;

  const dueDate = document.createElement("p");
  dueDate.classList.add("due-date");
  dueDate.textContent = new Date(task.due_date).toLocaleDateString();

  const taskName = document.createElement("h3");
  taskName.classList.add("task-name");
  taskName.textContent = task.name;

  const taskDescription = document.createElement("p");
  taskDescription.classList.add("task-description");
  let description = task.description;
  if (description.length > 100) {
    description = description.substring(0, 100) + "...";
  }
  taskDescription.textContent = description;

  const employeeAvatar = document.createElement("img");
  employeeAvatar.src = task.employee.avatar;
  employeeAvatar.alt = task.employee.name;
  employeeAvatar.classList.add("employee-avatar");

  const commentCount = document.createElement("p");
  commentCount.classList.add("comment-count");
  commentCount.textContent = `Comments: ${task.total_comments}`;

  taskCard.appendChild(priorityIcon);

  taskCard.appendChild(departmentName);
  taskCard.appendChild(dueDate);
  taskCard.appendChild(taskName);
  taskCard.appendChild(taskDescription);
  taskCard.appendChild(employeeAvatar);
  taskCard.appendChild(commentCount);

  const containerId = `tasks-${task.status.id}`;
  const container = document.getElementById(containerId);
  container.appendChild(taskCard);
}
