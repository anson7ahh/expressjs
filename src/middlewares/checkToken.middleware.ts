import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  // Lấy token từ header
  const token = req.headers["authorization"]?.split(" ")[1]; 
  // Thường sẽ gửi dưới dạng "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Bạn chưa đăng nhập",
    });
  }

  try {
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error: PRIVATE_KEY is not set",
      });
    }
    const decoded = jwt.verify(token, privateKey);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Token không hợp lệ hoặc đã hết hạn",
    });
  }
};
