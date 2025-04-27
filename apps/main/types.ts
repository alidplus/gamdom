export interface ServerPageParams<K extends string = "slug", V = string> {
  params: Promise<{ [k in K]: V }>;
}
