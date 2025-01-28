export const signupValidation = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (value.trim().length === 0) return "Name is required.";
        return "";
  
      case "email":
        if (value.trim().length === 0) return "Email is required.";
        // Validate email format
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          return "Email is invalid.";
        }
        return "";
  
      case "password":
        if (value.trim().length === 0) return "Password is required.";
        // Validate password complexity
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(
            value
          )
        ) {
          return "Password must be 8-15 characters long, include uppercase and lowercase letters, a number, and a special character.";
        }
        return "";
  
      default:
        return "";
    }
  };

 export const loginValidation = (name: string, value: string): string => {
    switch (name) {
      
  
      case "email":
        if (value.trim().length === 0) return "Email is required.";
        
        return "";
  
      case "password":
        if (value.trim().length === 0) return "Password is required.";
        // Validate password complexity
        return "";
  
      default:
        return "";
    }
  }