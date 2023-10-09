export const generateUserErrorInfo = (user) => {
  return `
      Una o mas propiedades estan incompletas o invalidas!!!
      Lista de propiedades obligatgorias:
          * email: Must be a string. (${user.email})    
          * password: Must be a string. (${user.password})
      `;
};
