export interface PolicyData {
  id: string;
  title: string;
  content: {
    [key: string]: string | undefined;
    "1"?: string;
  };
}
