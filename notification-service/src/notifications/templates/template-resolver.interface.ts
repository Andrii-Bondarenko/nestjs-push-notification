export interface TemplateStrategy {
  supports(event: string): boolean;
  resolve(data: any): { title: string; body: string };
}
