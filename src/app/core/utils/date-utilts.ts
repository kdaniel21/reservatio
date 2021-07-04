export namespace DateUtils {
  export const removeTime = (date: Date): Date => new Date(date.toDateString())
}
