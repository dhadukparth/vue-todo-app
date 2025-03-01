const todoKey = 'todos';

export const getAllTodos = () => {
    return new Promise((resolve, reject) => {
        try {
            const todos = localStorage.getItem(todoKey);
            if (todos) {
                const parsedTodos = JSON.parse(todos);
                resolve(parsedTodos);
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const getSingleTodos = (todoId) => {
    return new Promise((resolve, reject) => {
        try {
            const todos = localStorage.getItem(todoKey);
            if (todos) {
                const parsedTodos = JSON.parse(todos);
                const todo = parsedTodos.find((todo) => todo.id === todoId)
                if (todo) {
                    resolve(todo);
                }
                else {
                    reject(null)
                }
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const createTodo = (newTodo) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todos = await getAllTodos()
            const newTodoList = [
                {
                    id: Math.floor(100 + Math.random() * 900),
                    ...newTodo
                },
                ...todos
            ]
            localStorage.setItem(todoKey, JSON.stringify(newTodoList))
            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

export const updateStatus = (todoId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todos = await getAllTodos();

            if (!todos || todos.length === 0) {
                return reject("No todos found");
            }

            const updatedTodos = todos.map((todo) =>
                todo.id === todoId ? { ...todo, status: !todo.status } : todo
            );

            localStorage.setItem(todoKey, JSON.stringify(updatedTodos));

            resolve(updatedTodos);
        } catch (error) {
            reject(error);
        }
    });
};

export const updateTodo = (todoId, todoData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const todos = await getAllTodos();

            if (!todos || todos.length === 0) {
                return reject("No todos found");
            }

            const updatedTodos = todos.map((todo) =>
                todo.id === todoId ? { ...todo, title: todoData.title, description: todoData.description} : todo
            );

            localStorage.setItem(todoKey, JSON.stringify(updatedTodos));

            resolve(updatedTodos);
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteTodo = (todoId)=>{
    return new Promise(async (resolve, reject)=>{
        try {
            const todos = await getAllTodos()
            const removeTodo = todos.filter((item)=>item.id !== todoId)
            if(removeTodo){
                localStorage.setItem(todoKey, JSON.stringify(removeTodo));
                resolve(true)
            }
            else{
                reject(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}