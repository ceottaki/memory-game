export class Utils {
  public static randint(start: number, end: number): number {
    return Math.floor(Math.random() * end + start)
  }
}
