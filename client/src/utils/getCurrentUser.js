export const getCurrentUser = () => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
};
