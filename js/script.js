const taskList = document.querySelector('.tasks-list');
const addTaskForm = document.querySelector('.add-task-form');
const taskListKey = 'task-list-key';
const historyListKey = 'history-list-key';
let storageData = loadFromLS(taskListKey, []);

function saveToLS(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

function loadFromLS(key, defaultValue) {
  const jsonData = localStorage.getItem(key);
  try {
    const data = JSON.parse(jsonData);
    return data ?? defaultValue;
  } catch {
    return jsonData ?? defaultValue;
  }
}

function addToHistory(value) {
  const temp = loadFromLS(historyListKey, []);
  if (Array.isArray(value)) {
    temp.push(...value);
  } else {
    temp.push(value);
  }
  saveToLS(historyListKey, temp);
}

function addItem(item) {
  return `<li data-id="${item.id}">
      ${item.text}
    </li>`;
}

function addItems(items) {
  return items.map(addItem).join('');
}

taskList.insertAdjacentHTML('beforeend', addItems(storageData));

addTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  const button = e.submitter;
  const text = addTaskForm.querySelector('.add-task-input').value.trim();
  if (button.classList.contains('submit-btn-clear')) {
    addToHistory(loadFromLS(taskListKey, []));
    localStorage.removeItem(taskListKey);
    storageData = [];
    taskList.innerHTML = '';
    return;
  }
  if (text) {
    storageData.push({ id: Date.now(), text });
    saveToLS(taskListKey, storageData);
    taskList.insertAdjacentHTML('beforeend', addItem({ id: Date.now(), text }));
    addTaskForm.reset();
  }
});

taskList.addEventListener('dblclick', e => {
  const id = e.target.dataset.id;
  const index = storageData.findIndex(element => element.id === Number(id));
  if (index !== -1) {
    addToHistory(storageData[index]);
    storageData.splice(index, 1);
    saveToLS(taskListKey, storageData);
  }
  taskList.querySelectorAll('li').forEach(li => {
    if (li.dataset.id === id) {
      li.remove();
    }
  });
});
