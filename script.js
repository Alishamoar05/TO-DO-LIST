
const input = document.getElementById('todo-input')
const addbtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// try to load saved todos from local storage
const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved) : [];

function saveTodos(){
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list

function createToDoNode(todo, index){
    const li = document.createElement('li');

    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", ()=>{
        todo.completed = checkbox.checked;

        // TODO: visual feedback : strike-through when completed
        textSpan.style.textDecoration = todo.completed?'line-through': "";
         saveTodos();
    })
    
    // text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if(todo.completed){
        textSpan.style.textDecoration = 'line-through';
    }
        // aadd double click 
        textSpan.addEventListener("dbclick", ()=>{
            const newText = prompt("Edit todo", todo.text);
            if(newText !== null){
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                saveTodos();
            }
        })
        
        // delete to do button
        const delBtn = document.createElement('button');
        delBtn.textContent = "Delete";
        delBtn.addEventListener('click', ()=>{
            todos.splice(index, 1);
            Render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);
        return li

        }
    


//render the whole to do list from to do arrays

function Render(){
    list.innerHTML ='';

    // recreate each item
        todos.forEach((todo, index) => {
        const node = createToDoNode(todo, index);
        list.appendChild(node)
    });
}

function  addTodo(){
    const text = input.value.trim();
    if(!text){
        return;
    }
   
    // push a new todo object

    todos.push({text, completed: false});
    input.value = '';
    Render()
    saveTodos()
    
}

addbtn.addEventListener("click", addTodo);
Render();
