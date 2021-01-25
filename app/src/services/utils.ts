export class Utils {
  public static randint(start: number, end: number): number {
    return Math.floor(Math.random() * end + start)
  }

  public static formatElapsedTime(elapsedTime: Date): string {
    if (!elapsedTime) {
      return ''
    }

    return `${elapsedTime.getUTCHours()}h ${elapsedTime.getUTCMinutes()}m ${elapsedTime.getUTCSeconds()}s`
  }
}
