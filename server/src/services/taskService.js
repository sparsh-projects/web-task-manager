import Task from "../models/Task.js";

/**
 * Fetch all tasks
 * - Computes derived fields (remainingDays, isOverdue)
 * - Keeps DB schema clean (no virtual junk saved)
 */
export async function getAllTasks(filter = {}) {
  console.log("🟣 Service: getAllTasks, Filter =", filter);

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  const now = new Date();

  return tasks.map((task) => {
    const taskObj = task.toObject(); // convert Mongoose doc → plain JS object

    // ---- DEFAULT SAFE VALUES (important for frontend) ----
    taskObj.remainingDays = null;
    taskObj.isOverdue = false;

    // ---- TIME-BASED LOGIC (ONLY FOR ACTIVE TASKS) ----
    if (!task.completed && task.dueDate) {
      const diffMs = task.dueDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      taskObj.remainingDays = diffDays > 0 ? diffDays : 0;
      taskObj.isOverdue = task.dueDate < now;
    }

    return taskObj;
  });
}

/**
 * Fetch single task by ID
 */
export async function getTaskByIdService(id) {
  console.log("🟣 Service: getTaskByIdService, ID =", id);

  if (!id) {
    throw new Error("ID is required");
  }

  const task = await Task.findById(id);
  if (!task) return null;

  const taskObj = task.toObject();
  const now = new Date();

  // Default safe values
  taskObj.remainingDays = null;
  taskObj.isOverdue = false;

  // Compute time-based fields
  if (!task.completed && task.dueDate) {
    const diffMs = task.dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    taskObj.remainingDays = diffDays > 0 ? diffDays : 0;
    taskObj.isOverdue = task.dueDate < now;
  }
  return taskObj;
}


/**
 * Create task
 * ✅ Accepts OBJECT (not string)
 * ✅ Validates dueDate
 * ✅ Converts dueDate to Date
*/
export async function createTaskService({ title, dueDate = null }) {
  console.log("🟣 Service: createTaskService");
  if (!title) {
    throw new Error("Title is required");
  }
  // 🔒 Backend validation (frontend can be bypassed)
  if (dueDate && isNaN(new Date(dueDate).getTime())) {
    throw new Error("Invalid due date");
  }
  return Task.create({
    title,
    dueDate: dueDate ? new Date(dueDate) : null,
  });
}

/** Update task
 * ✅ Validates fields
 * ✅ Accepts partial updates
 */
export async function updateTaskService(id, updateData){
  if (!id) {
    throw new Error("ID is required");
  }
  if (!updateData || Object.keys(updateData).length === 0) {
    throw new Error("Update data is required");
  }
  const task = await Task.findById(id);
  if (!task) return null;
  const allowedFields = ['title', 'dueDate', "notes"];

  let hasValidUpdate= false;

  for(const field of allowedFields){
    if (field in updateData) {
      if(field === "title" && !updateData.title.trim()){
        throw new Error("Title cannot be empty");
      }
      if (field === "dueDate") {
        if (updateData.dueDate !== null && isNaN(new Date(updateData.dueDate).getTime())) {
          throw new Error("Invalid due date");
        }
        task.dueDate = updateData.dueDate ? new Date(updateData.dueDate): null;
      } else { task[field] = updateData[field];}
      hasValidUpdate = true;
    }
  }

  if(!hasValidUpdate){
    throw new Error("No valid fields to update");
  }

  await task.save();
  return task;
}

/**
 * Mark task as completed
 */
export async function completeTaskService(id) {
  const task = await Task.findById(id);
  if (!task) return null;
  if (task.completed) return task; // idempotent
  task.completed = true;
  task.completedAt = new Date();
  await task.save();
  return task;
}

/*
 Mark task as incomplete
 */
export async function incompleteTaskService(id) {
  const task = await Task.findById(id);
  if (!task) return null;
  task.completed = false;
  task.completedAt = null;
  await task.save();
  return task;
}


/* delete task */

export async function deleteTaskService(id){
  if(!id) throw new Error("Id is required");
  let task= await Task.findByIdAndDelete(id);
  return task;
}
