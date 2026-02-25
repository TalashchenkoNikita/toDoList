const historyList = document.querySelector('.tasks-list');
const historyListKey = 'history-list-key';
const deleteBtn = document.querySelector('.delete-btn');
let historyStorageData = loadFromLS(historyListKey, []);

function saveToLS(key, value)  {
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

function addItem(item) {
  return `<li data-id="${item.id}">
      ${item.text}
    </li>`;
}

function addItems(items) {
  return items.reverse().map(addItem).join('');
}

historyList.insertAdjacentHTML('afterbegin', addItems(historyStorageData));

deleteBtn.addEventListener("click", (e) => {
    localStorage.removeItem(historyListKey);
    historyStorageData = [];
    historyList.innerHTML = '';
    return;
})

historyList.addEventListener("dblclick", (e) => {
  const id = e.target.dataset.id;
  const index = historyStorageData.findIndex(element => element.id === Number(id));
  if (index !== -1) {
    historyStorageData.splice(index, 1);
    saveToLS(historyListKey, historyStorageData);
  }
  historyList.querySelectorAll('li').forEach(li => {
    if (li.dataset.id === id) {
      li.remove();
    }
  });
})
