import { ERROR_STATUS } from "../constants.js";
import db from "../database.js";

// 해당 사번의 사원이 존재하는지 확인
const checkUserIdExists = (req, res, next) => {
  const { userId } = req.params;
  const checkSql = `SELECT COUNT(*) as count FROM Users WHERE userId = ?`;
  
  db.get(checkSql, [userId], (err, row) => {
    if (err) return handleError(res, err);
    
    if (row.count === 0) {
      return res.status(404).json({
        status: ERROR_STATUS,
        message: `사번이 ${userId}인 사원이 존재하지 않습니다.`,
      });
    }
    
    next();
  });
};

export default checkUserIdExists