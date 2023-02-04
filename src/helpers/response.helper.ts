export const response = (res, code, data) => {
  return res.status(code).json({
    status: true,
    code: code,
    data: data,
  })
}
