export class ApiClient {
  static async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return response.json();
  }
}