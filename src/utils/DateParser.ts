export class DateParser {
  static getYesterdayISOString(): string {
    const date = new Date();
    date.setTime(date.getTime() - (24 * 60 * 60 * 1000));
    return date.toISOString().split('T')[0];
  }
}