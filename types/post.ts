export type Post = {
  slug: string;
  title: string;
  published: string;  // 替换原来的 date
  summary: string;    // 替换原来的 excerpt
  cover?: {
    image: string;    // 替换原来的 coverImage
  };
  tags?: string[];
  categories?: string; // 改为单个分类
  draft?: boolean;    // 新增草稿标记
  lang?: string;      // 新增语言标记
  content: string;
}
