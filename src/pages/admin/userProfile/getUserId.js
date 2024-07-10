const getUserId = () => {
  const path = window.location.pathname;
  return path.split("/").pop();
};

export default getUserId