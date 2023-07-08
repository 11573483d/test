'use strict'

var toDoList = []


exports.post = (route, body) => {
    switch (route) {
        case "add":
            return add(body);

        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}

function add(body) {
    var newItem = (JSON.parse(body))
    if (typeof newItem === "object") {
        toDoList.push(newItem);

        return { 'code': 201, 'body': 'add successful' };
    } else {
        return { 'code': 400, 'body': 'failed to add' }
    }

}



exports.get = (route) => {
    switch (route) {
        case "list":
            return { 'code': 200, 'body': getAll() };

        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}

function getAll() {
    if (toDoList.length === 0) {
        return { code: 400, body: "No items in the list" };
    } else {
        return toDoList.map((task, index) => ({ id: index, task: toDoList[index].task }));
    }
}


 exports.delete = (route, body) => {
    switch (route) {
      case "remove":
        let taskName = JSON.parse(body).name;
        let index = toDoList.findIndex(task => task.name === taskName);
        return remove(index);
      default:
        return { code: 400, body: "Invalid Request" };
    }
  };
  
  function remove(index) {
    if (toDoList.length > 0 && index >= 0 && index < toDoList.length) {
      toDoList.splice(index, 1);
      return { code: 200, body: "remove successfully" };
    }
    return { code: 400, body: "remove failed" };
  }