export interface WordType {
  word: string,
  text: string,
}

export interface WordListType extends WordType {
  id: string,
  userId: string,
  timetamp: number,
}

export const enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface JoinInputs {
  joinId: string,
  joinPw1: string,
  joinPw2: string
}

export interface JoinInputsFocus {
  joinIdFocus: boolean,
  joinPw1Focus: boolean,
  joinPw2Focus: boolean
}

export interface PasswordCheck {
  isPw1NoneValue: boolean,
  isPw2NoneValue: boolean,
  isPw1Error: boolean,
  isPw2Error: boolean
}