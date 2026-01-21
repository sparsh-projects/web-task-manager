
import Task from "../models/Task.js";

/**
 * Get dashboard analytics for a given time range
 */
export async function getDashboardStats(range="month"){
    console.log("🟣 Service: getDashboardStats, Range =", range);

    // get current date
    const now= new Date();
    // calculate start date based on range
    let windowStart;

    if(range==="week"){
        windowStart= new Date(now);
        windowStart.setDate(now.getDate() - now.getDay()); 
        windowStart.setHours(0,0,0,0);
    } else if(range==="year"){
        windowStart= new Date(now.getFullYear(), 0, 1);
    } else { // default to month
        windowStart= new Date(now.getFullYear(), now.getMonth(), 1);
    }
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    // Fetch tasks created inside the window
    const tasks = await Task.find({ createdAt: { $gte: windowStart } });

    //  Initialize counters
    let total=0;
    let active=0;
    let completed=0;
    let overdue=0;

    let successful=0;
    let failed=0;
    
    let completedToday=0;
    let completedThisWeek=0;
    let completedThisMonth=0;

    let totalCompletionTime=0; 
    let completionCount=0;

    // loop through task once
    for(const t of tasks){
        total++;

        // ACTIVE vs COMPLETED
        if(t.completed){
            completed++;
        } else {
            active++;
        }

        //OVERDUE
        if(t.dueDate && !t.completed && t.dueDate < now){
            overdue++;
        }

        // SUCCESS / FAILURE (only tasks with dueDate)
        if(t.dueDate){
            // success if completed on or before due date
            if(t.completed && t.completedAt && t.completedAt <= t.dueDate){
                successful++;
            }
            // failure if not completed by due date or completed after due date
            if(
                (!t.completed && now > t.dueDate)
                ||
                (t.completed && t.completedAt && t.completedAt > t.dueDate  )
            ){
                failed++;
            }
        }
        // MOMENTUM: Completed Today / This Week
        if(t.completed && t.completedAt){
            const completedAtDate= new Date(t.completedAt);
            // completed today
            if(
                completedAtDate.getDate() === now.getDate() &&
                completedAtDate.getMonth() === now.getMonth() &&
                completedAtDate.getFullYear() === now.getFullYear()
            ){
                completedToday++;
            }

            // completed this week
            const weekStart = new Date(now);
            weekStart.setDate(now.getDate() - now.getDay());
            weekStart.setHours(0, 0, 0, 0);

            if(completedAtDate >= weekStart){
                completedThisWeek++;
            }

            //completed this month
            if(completedAtDate >= monthStart){
                completedThisMonth++;
            }

            // COMPLETION VELOCITY
            const completionTime = completedAtDate.getTime() - new Date(t.createdAt).getTime();
            totalCompletionTime += completionTime;
            completionCount++;
        }
    }

    const successPercentage= successful + failed > 0 ? Math.round((successful / (successful + failed)) * 100) : 0;
    const avgCompletionTime= completionCount > 0 ? Math.round(totalCompletionTime / completionCount) : null;
    return {
        range,

    counts: {
      total,
      active,
      completed,
      overdue,
    },

    success: {
      successful,
      failed,
      successPercentage,
    },

    momentum: {
      completedToday,
      completedThisWeek,
      completedThisMonth: completedThisMonth,
    },

    velocity: {
      avgCompletionTime,
    },
  };
}