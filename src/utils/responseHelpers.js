

 const responses = (message, res, status, errors, data) => {
  const minStatusCode = 400;
  const maxStatusCode = 559;
  const statusCodes = [];
  const failingStatusCodeRanges = Array.from(
    { length: maxStatusCode - minStatusCode + 1 },
    (_, i) => minStatusCode + i,
  );

  if (failingStatusCodeRanges.includes(status))
    return res.status(status).json({ success: false, message: message, errors});
  return res.status(status).json({ success: true, message: message, data : data?? undefined });
};

export default responses;
