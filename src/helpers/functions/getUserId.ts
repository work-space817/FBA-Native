const getUserId = () => {
  const userId = localStorage.getItem("uid");
  return userId;
};

export default getUserId;
