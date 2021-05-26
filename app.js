///selectors
var todoInput = document.querySelector('.todo-input');
var todoButton = document.querySelector('.todo-button');
var todoList = document.querySelector('.todo-list');
var filterOption = document.querySelector('.filter-todo');

///Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);
///Functions
function addTodo(event){
    ///prevent form from submitting
    event.preventDefault();
    //Todo DIV
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    var newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    ///add todo to local base
    saveLocalTodos(todoInput.value);


    //CHECK mark button
    var completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>'; 
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    //TRASH button
    var trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'; 
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    


    ///APPEND to list
    todoList.appendChild(todoDiv);

    // Clear Todo input value
    todoInput.value = "";
}

function deleteCheck(event){
    var item = event.target;
    //delete todo
    if(item.classList[0] === 'trash-btn'){
        var todo = item.parentElement;
        //animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        // 'transitionend' works only if there is attribute transition: all .5s ease
        // or something similar
        // if it's instant, it wont work!
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] === 'complete-btn'){
        var todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    var todos = todoList.childNodes;
    todos.forEach(function(todo) {
        
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display = "none";
                }else{
                    todo.style.display = 'flex';
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    // is base empty?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos; 
    // is base empty?
    
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        //Todo DIV
        var todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        var newTodo = document.createElement('li');
        newTodo.innerText = todo;
        
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //CHECK mark button
        var completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>'; 
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        
        //TRASH button
        var trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'; 
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        


        ///APPEND to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    // is base empty?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else {
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}