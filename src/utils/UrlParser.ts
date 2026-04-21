export class UrlParser {
  static getPatientId(): string {
    const pathName = location.pathname.split('/');
    return pathName[3];
  }
}