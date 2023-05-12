export interface WordType {
  word: string,
  text: string,
}

export interface WordListType extends WordType {
  id: string,
  userId: string,
  timetamp: number,
}
export interface User {
  userId: string,
  userPw: string
}

export const enum METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export interface JoinInputs {
  joinId: string,
  joinIdFocus: boolean,
  joinPw1: string,
  joinPw1Focus: boolean,
  joinPw2: string,
  joinPw2Focus: boolean
}

export interface PasswordCheck {
  isPw1NoneValue: boolean,
  isPw2NoneValue: boolean,
  isPw1Error: boolean,
  isPw2Error: boolean
}