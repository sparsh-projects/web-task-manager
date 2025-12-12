let tasks= [
    { id: 1, title: "Learn React" },
    { id: 2, title: "Master MERN" },
    { id: 3, title: "Learn Python" }
];

export function getAllTasks(){
    console.log("🟣 Service: getAllTasks");
    return tasks;
}

export function getTaskByIdService(id){
    console.log("🟣 Service: getTaskByIdService, ID =", id);
    if(!id){
        console.log("❌ Service Error: ID missing");
        throw new Error("ID is required");
    }
    const task = tasks.find((t)=> t.id ==id);
    return task;
}

export function createTaskService(title){
    console.log("🟣 Service: createTaskService");

    if(!title){
        console.log("❌ Service Error: Title missing");
        throw new Error("Title is required");
    }
    const newTask= {id: Date.now(), title};
    tasks.push(newTask);
    return newTask;
}