import { ERROR_STATUS } from "../constants.js";

// 유효성 검사 미들웨어
const validateUserData = (req, res, next) => {
  console.log("validate");
  const { userId } = req.params;
  const { password, email, name, team, position } = req.body;
  //imgUrl은 필수 아닌 것 같아서 뺌
  if (!userId || !password || !email || !name || !team || !position) {
    return res.status(400).json({
      status: ERROR_STATUS,
      error: "All fields are required",
    });
  }

  next();
};

export default validateUserData