export interface WordType {
  word: string,
  text: string,
}

export interface WordListType extends WordType {
  id: string,
  timetamp: number,
}