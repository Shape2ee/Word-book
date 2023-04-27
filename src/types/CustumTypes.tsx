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