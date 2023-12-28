const userService = require("../services/userService");
const axios = require("axios");

const verifyRecaptcha = async (recaptchaValue) => {
  if (!recaptchaValue) {
    throw new Error("reCAPTCHA ausente");
  }

  const googleResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
  );

  if (!googleResponse.data.success) {
    throw new Error("reCAPTCHA inválido");
  }
};

const create = async (req, res, next) => {
  const { name, email, password, recaptchaValue } = req.body;

  try {
    await verifyRecaptcha(recaptchaValue);

    const message = await userService.create(name, email, password);

    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password, recaptchaValue } = req.body;

  try {
    await verifyRecaptcha(recaptchaValue);

    const data = await userService.login(email, password);

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const getProfileInfo = async (req, res, next) => {
  const { id } = req.user;

  try {
    const profileInfo = await userService.getProfileInfo(id);

    return res.status(200).json(profileInfo);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  login,
  getProfileInfo,
};
