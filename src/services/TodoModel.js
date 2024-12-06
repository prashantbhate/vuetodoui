export const TodoModel = {
    validate(todo) {
      const errors = {};
  
      if (!todo.user || todo.user.trim() === "") {
        errors.user = "User cannot be empty";
      }
  
      if (!todo.task || todo.task.length < 10 || todo.task.length > 200) {
        errors.task = "Task must be between 10 and 200 characters";
      }
  
      const today = new Date();
      const targetDate = new Date(todo.targetDate);
  
      if (!todo.targetDate || isNaN(targetDate.getTime())) {
        errors.targetDate = "Target date is required";
      } else if (targetDate < today) {
        errors.targetDate = "Target date must be today or in the future";
      }
  
      console.log("validation errors:", errors);
  
      return errors;
    },
  };
  