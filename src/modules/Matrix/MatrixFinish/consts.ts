export const FINISH_DELAY = 200;
export const FINISH_HEADER_DUR = 600;
export const FINISH_BODY_DUR = 500;
export const FINISH_CONTENT_DUR = 200;

export const FINISH_CODE_DUR =
  FINISH_DELAY + FINISH_HEADER_DUR + FINISH_BODY_DUR + FINISH_CONTENT_DUR;

export const SUCCESS_CODE = `//ROOT
//ACCESS_REQUEST
//ACCESS_REQUEST_SUCCESS 
//COLLECTING PACKET_1 . . . . . . . . . . . . . COMPLETE
//COLLECTING PACKET_2 . . . . . . . . . . . . . COMPLETE
//COLLECTING PACKET_3 . . . . . . . . . . . . . COMPLETE
//COLLECTING PACKET_4 . . . . . . . . . . . . . COMPLETE
//LOGIN
//LOGIN_SUCCESS
//
//UPLOAD_IN_PROGRESS 
//UPLOAD_COMPLETE!`;

export const FAILURE_CODE = `//ROOT_ATTEMPT_1
//ROOT_ATTEMPT_2
//ROOT_ATTEMPT_3
//ROOT_FAILED
//ROOT_REBOOT
//ACCESSING . . . . . . . . . . . . . . . . . . . . . . FAILED
//ACCESSING . . . . . . . . . . . . . . . . . . . . . . FAILED
//ACCESSING . . . . . . . . . . . . . . . . . . . . . . FAILED
//ACCESSING . . . . . . . . . . . . . . . . . . . . . . FAILED
//ACCESSING . . . . . . . . . . . . . . . . . . . . . . FAILED`;

export const CARET_CHARS = "|<>/[]{}* #";
