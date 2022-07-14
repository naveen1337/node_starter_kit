export function msgSuccessResponse(
  statusCode: number,
  msg: string | number,
  res: any
) {
  res.status(statusCode).json({
    status: true,
    msg,
  });
}

export function dataSuccessResponse(statusCode: number, data: any, res: any) {
  res.status(statusCode).json({
    status: true,
    data,
  });
}

export function errMsgResponse(statusCode: number, msg: string, res: any) {
  res.status(statusCode).json({
    status: false,
    msg,
  });
}

export function errDataResponse(statusCode: number, data: any, res: any) {
  res.status(statusCode).json({
    status: false,
    data,
  });
}
