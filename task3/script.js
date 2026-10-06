document.addEventListener('DOMContentLoaded', function () {
  var input = document.getElementById('todo-input');
  var addButton = document.getElementById('add-button');
  var list = document.getElementById('todo-list');
  var counter = document.getElementById('counter');
  var message = document.getElementById('message');
  var empty = document.getElementById('empty');
  var filterButtons = document.querySelectorAll('.filter');

  var tasks = [];
  var nextId = 1;
  var currentFilter = 'all';

  function addTask() {
    var text = input.value.trim();

    if (text === '') {
      message.textContent = 'Введите текст задачи.';
      input.focus();
      return;
    }

    tasks.push({
      id: nextId,
      text: text,
      completed: false
    });

    nextId += 1;
    input.value = '';
    message.textContent = '';
    render();
    input.focus();
  }

  function toggleTask(id) {
    tasks = tasks.map(function (task) {
      if (task.id === id) {
        return {
          id: task.id,
          text: task.text,
          completed: !task.completed
        };
      }
      return task;
    });

    render();
  }

  function deleteTask(id) {
    tasks = tasks.filter(function (task) {
      return task.id !== id;
    });

    render();
  }

  function getVisibleTasks() {
    return tasks.filter(function (task) {
      if (currentFilter === 'active') {
        return task.completed === false;
      }

      if (currentFilter === 'completed') {
        return task.completed === true;
      }

      return true;
    });
  }

  function render() {
    var visibleTasks = getVisibleTasks();

    list.innerHTML = '';

    visibleTasks.forEach(function (task) {
      var item = document.createElement('li');
      item.className = 'todo-item';

      if (task.completed) {
        item.classList.add('completed');
      }

      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;

      var text = document.createElement('span');
      text.className = 'todo-text';
      text.textContent = task.text;

      var deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'Удалить';

      checkbox.addEventListener('change', function () {
        toggleTask(task.id);
      });

      deleteButton.addEventListener('click', function () {
        deleteTask(task.id);
      });

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(deleteButton);
      list.appendChild(item);
    });

    var completedCount = tasks.filter(function (task) {
      return task.completed;
    }).length;

    var activeCount = tasks.length - completedCount;
    counter.textContent = 'Осталось: ' + activeCount + ', Выполнено: ' + completedCount;
    empty.style.display = visibleTasks.length === 0 ? 'block' : 'none';
  }

  addButton.addEventListener('click', addTask);

  input.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTask();
    }
  });

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      currentFilter = button.getAttribute('data-filter');

      filterButtons.forEach(function (item) {
        item.classList.remove('active');
      });

      button.classList.add('active');
      render();
    });
  });

  render();
});
