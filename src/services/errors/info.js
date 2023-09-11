export const generateUserErrorInfo = (user) => {
    return `
      Una o mas propiedades estan incompletas o invalidas!!!
      Lista de propiedades obligatgorias:
          * email: Must be a string. (${user.email})    
          * first_name: Must be a string. (${user.first_name})
          * last_name: Must be a string. (${user.last_name})
          * password: Must be a string. (${user.password})
      `;
  };