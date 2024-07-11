import express from "express";
import db from "../database.js";
import {
  ERROR_STATUS,
  HOST,
  LOGIN_FAIL,
  SUCCESS_STATUS,
  USER_NOT_FOUND,
} from "../constants.js";
import { checkUserIdExists, validateUserData } from "../middleware/index.js";
import upload from "../multer/multer-config.js";

const router = express.Router();

// 에러 처리 함수
const handleError = (res, err) => {
  console.error(err);
  return res.status(500).json({
    status: ERROR_STATUS,
    message: err.message,
  });
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userId
 *         - password
 *         - email
 *         - name
 *         - team
 *         - position
 *       properties:
 *         userId:
 *           type: string
 *           description: 사번
 *         password:
 *           type: string
 *           description: 비밀번호
 *         email:
 *           type: string
 *           description: 사원의 e-mail
 *         name:
 *           type: string
 *           description: 사원의 이름
 *         team:
 *           type: string
 *           description: 사원의 소속 팀
 *         position:
 *           type: string
 *           description: 사원의 직책
 *         imgUrl:
 *           type: string
 *           description: 사원의 프로필 이미지 주소
 *       example:
 *         userId: kimpra2989
 *         password: awesomepw
 *         email: example@example.com
 *         name: 강호연
 *         team: delibery1
 *         position: FE-lead
 *         imgUrl: http://example.com/profile.jpg
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사원 정보에 대한 API입니다.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 관리자를 제외한 모든 사원의 데이터를 가져옵니다
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 모든 사원 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: 네트워크 오류
 */
router.get("/", (req, res) => {
  const sql = `
    SELECT userId, email, name, team, position, isAdmin, imgUrl 
    FROM Users 
    WHERE isAdmin != true
  `;

  db.all(sql, [], (err, rows) => {
    if (err) return handleError(res, err);

    res.json({
      status: SUCCESS_STATUS,
      data: rows,
    });
  });
});

/**
 * @swagger
 * /api/users/{userId}:
 *   get:
 *     summary: 특정 사원의 데이터를 가져옵니다
 *     tags: [Users]
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: 사번
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 사원 정보
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: 해당 사번의 사원이 존재하지 않음
 */
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT userId, email, name, team, position, isAdmin, imgUrl 
    FROM Users 
    WHERE userId=?
  `;

  db.get(sql, [userId], (err, row) => {
    if (err) return handleError(res, err);

    if (!row)
      return res.status(404).json({
        status: ERROR_STATUS,
        error: USER_NOT_FOUND,
      });

    res.json({
      status: SUCCESS_STATUS,
      data: row,
    });
  });
});

router.post("/login", (req, res) => {
  const { userId, password } = req.body;

  const sql = `
    SELECT * FROM Users 
    WHERE userId=? and password = ? and withdraw = false
  `;

  const params = [userId, password];

  db.get(sql, params, (err, user) => {
    if (err) return handleError(res, err);

    if (!user)
      return res.status(400).json({
        status: ERROR_STATUS,
        message: LOGIN_FAIL,
      });

    const { userId, imgUrl } = user;

    const isAdmin = userId === "admin";

    res.json({
      status: SUCCESS_STATUS,
      message: "로그인 성공",
      userId,
      imgUrl,
      isAdmin,
    });
  });
});

/**
 * @swagger
 * /api/users/{userId}:
 *   post:
 *     summary: 사원을 등록합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사번
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: 사원이 생성됨
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request
 */
router.post("/", (req, res) => {
  const { userId, password, email, name, team, position, imgUrl } = req.body;
  // TODO: 중복 아이디가 있는지 먼저 확인
  const sql = `
    INSERT INTO Users( userId, password, email, name, team, position, imgUrl) 
    VALUES( ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [userId, password, email, name, team, position, imgUrl];

  db.run(sql, params, (err) => {
    if (err) return handleError(res, err);

    res.json({
      status: SUCCESS_STATUS,
      message: `${userId}가 등록되었습니다.`,
    });
  });
});

/**
 * @swagger
 * /users/{userId}/profile-image:
 *   put:
 *     summary: "프로필 이미지 수정"
 *     description: "사용자의 프로필 이미지를 수정합니다."
 *     tags: [Users]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *       - in: formData
 *         name: profile-image
 *         type: file
 *         required: true
 *         description: 프로필 이미지 파일 (jpg, jpeg, png, webp)
 *     responses:
 *       200:
 *         description: "프로필 이미지가 업데이트되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *                 message:
 *                   type: string
 *                   example: "{userId} 님의 프로필 사진이 등록되었습니다."
 *       400:
 *         description: "잘못된 요청입니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "jpg, jpeg, png, webp 파일만 프로필 이미지로 설정가능합니다."
 *       500:
 *         description: "서버 오류가 발생했습니다."
 */
router.put(
  "/:userId/profile-image",
  checkUserIdExists,
  upload.single("profile-image"),
  (req, res) => {
    if (!req.file)
      return res.status(400).json({
        status: ERROR_STATUS,
        message: "jpg, jpeg, png, webp 파일만 프로필 이미지로 설정가능합니다.",
      });

    const { userId } = req.params;
    const filename = req.file.filename;
    const path = `${HOST}/profile/${filename}`;
    // const {originalname, mimetype, destination, filename, path } = req.file

    const updateSql = `
      UPDATE Users SET
        imgUrl = ?
      WHERE userId = ?
    `;

    const params = [path, userId];

    db.run(updateSql, params, (err) => {
      if (err) return handleError(res, err);

      return res.json({
        status: SUCCESS_STATUS,
        message: `${userId} 님의 프로필 사진이 등록되었습니다.`,
      });
    });
  }
);

/**
 * @swagger
 * /api/users/{userId}:
 *   put:
 *     summary: 사원 정보를 수정합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사번
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.put("/:userId", validateUserData, (req, res) => {
  const { userId } = req.params;
  const { password, email, name, team, position } = req.body;
const updateSql = `
  UPDATE Users SET 
    password = ?,
    email = ?,
    name = ?,
    team = ?,
    position = ?
  WHERE userId = ?;
`;

  const params = [password, email, name, team, position, userId];

  db.run(updateSql, params, (err) => {
    if (err) return handleError(res, err);

    res.json({
      status: SUCCESS_STATUS,
      message: `${userId}님의 정보가 수정되었습니다.`,
    });
  });
});

/**
 * @swagger
 * /users/{userId}/profile-image:
 *   delete:
 *     summary: "프로필 이미지 삭제"
 *     description: "사용자의 프로필 이미지를 삭제합니다."
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: "프로필 이미지가 삭제되었습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "SUCCESS"
 *                 message:
 *                   type: string
 *                   example: "{userId} 님의 프로필 사진이 삭제되었습니다."
 *       404:
 *         description: "사용자를 찾을 수 없습니다."
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ERROR"
 *                 message:
 *                   type: string
 *                   example: "사용자를 찾을 수 없습니다."
 *       500:
 *         description: "서버 오류가 발생했습니다."
 */
router.delete("/:userId/profile-image", checkUserIdExists, (req, res) => {
  const { userId } = req.params;

  const deleteSql = `
          UPDATE Users SET
            imgUrl = NULL
          WHERE userId = ?
        `;

  db.run(deleteSql, [userId], (err) => {
    if (err) return handleError(res, err);

    return res.json({
      status: SUCCESS_STATUS,
      message: `${userId} 님의 프로필 사진이 삭제되었습니다.`,
    });
  });
});

/**
 * @swagger
 * /api/users/{userId}:
 *   delete:
 *     summary: 특정 사원의 사원 정보를 삭제합니다.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: 사번
 *     responses:
 *       200:
 *         description: The deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: DELETE
 *                 message:
 *                   type: string
 *                   example: 사용자 삭제됨
 */
router.delete("/:userId", (req, res) => {
  const { userId } = req.params;

  // TODO: 관리자인지 확인
  const sql = `
    DELETE FROM Users 
    WHERE userId = ? 
  `;

  db.run(sql, [userId], function (err) {
    if (err) return handleError(res, err);

    if (this.changes === 0) {
      return res.status(404).json({
        status: ERROR_STATUS,
        error: USER_NOT_FOUND,
      });
    }

    res.json({
      status: SUCCESS_STATUS,
      message: "사용자가 삭제되었습니다.",
    });
  });
});

export default router;
