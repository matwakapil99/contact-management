export const isValidEmail = (email: string) => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
};

export const isDigitsOnly = (s: string) => /^\d+$/.test(s);
