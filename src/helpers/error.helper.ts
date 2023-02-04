export const errors = (res, code, errors) => {
  return res.status(code).json({
    status: false,
    code: code,
    errors: errors,
  })
}
