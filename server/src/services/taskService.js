import Task from '../models/Task.js';

export async function getAllTasks(filter = {}) {       // added filter parameter to get specific tasks based on criteria
  console.log(" Service: getAllTasks, Filter =", filter);
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  const now= new Date();
  return tasks.map((task)=>{
    const taskObj= task.toObject();
    // --- Remaining days logic (safe & meaningful) ---
    if (!task.completed && task.dueDate) {
      const diffMs = task.dueDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      taskObj.remainingDays = diffDays > 0 ? diffDays : 0;
    } else {
      taskObj.remainingDays = null;
    }
    // --- Overdue logic ---
    taskObj.isOverdue= !task.completed && task.dueDate && task.dueDate < now;      //means task is overdue if not completed and dueDate is in the past     
    return taskObj;
  });
}


export async function getTaskByIdService(id){
    console.log(" Service: getTaskByIdService, ID =", id);
    if(!id){
        console.log(" Service Error: ID missing");
        throw new Error("ID is required");
    }
    const task = await Task.findById(id);
    return task;
}

export async function createTaskService(title){
    console.log(" Service: createTaskService");
    if(!title){
        console.log(" Service Error: Title missing");
        throw new Error("Title is required");
    }
    const task= await Task.create({ title });
    return task;
}

export async function completeTaskService(id) {
  const task = await Task.findById(id);
  if (!task) return null;
  // already completed → no-op
  if (task.completed) return task;
  task.completed = true;
  task.completedAt = new Date();
  await task.save();
  return task;
}

/**
 * Mark task as incomplete
 */
export async function incompleteTaskService(id) {
  const task = await Task.findById(id);
  if (!task) return null;
  task.completed = false;
  task.completedAt = null;
  await task.save();
  return task;
}