const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/liweiguang/astro-blog/src/data/blog';
const targetFile = '/Users/liweiguang/devpro/src/data/blogItems.ts';

// Title translations (Chinese -> English)
const titleTranslations = {
  'Spring IOC的注解使用': 'Spring IoC Annotation Usage',
  'MySQL事务测试用例': 'MySQL Transaction Test Cases',
  'Java内存模型': 'Java Memory Model (JMM)',
  'IOC基本使用': 'IoC Container Basics',
  'Java并发编程': 'Java Concurrent Programming',
  '初识Spring': 'Introduction to Spring Framework',
  'Nginx与Tengine详解': 'Nginx and Tengine Deep Dive',
  '快速排序优化-荷兰国旗与随机快排': 'QuickSort Optimization: Dutch Flag & Randomized QuickSort',
  'MySQL索引优化案例分析': 'MySQL Index Optimization Case Study',
  'Redis的前世今生': 'Redis: Past, Present and Future',
  'MyBatis SQL映射文件详解': 'MyBatis SQL Mapping File Guide',
  'MyBatis的介绍及基本使用': 'Introduction to MyBatis',
  'MyBatis-Plus逆向工程': 'MyBatis-Plus Code Generator',
  'Maven的基本使用': 'Maven Basics',
  'GC原理及JVM调优': 'GC Principles and JVM Tuning',
  'Spring Cloud简介 Eureka和Actuator基本使用': 'Spring Cloud: Eureka and Actuator Basics',
  '分布式事务常见解决方案': 'Distributed Transaction Solutions',
  'MySQL调优': 'MySQL Performance Tuning',
  'Spring AOP的基本使用': 'Spring AOP Basics',
  'ActiveMQ详解': 'ActiveMQ Deep Dive',
  'MySQL索引数据结构分析': 'MySQL Index Data Structure Analysis',
  'SpringBoot配置数据源': 'SpringBoot DataSource Configuration',
  'Spring MVC源码解析': 'Spring MVC Source Code Analysis',
  'Spring Boot源码解析': 'Spring Boot Source Code Analysis',
  'Spring MVC的进阶使用': 'Advanced Spring MVC Usage',
  '分布式锁常见解决方案': 'Distributed Lock Solutions',
  'Feign原理及使用': 'Feign Principles and Usage',
};

// Category mapping based on tags
function getCategory(tags) {
  if (tags.includes('Spring') || tags.includes('SpringBoot') || tags.includes('SpringCloud')) return 'Spring';
  if (tags.includes('MySQL') || tags.includes('数据库')) return 'Database';
  if (tags.includes('Redis')) return 'Redis';
  if (tags.includes('JVM') || tags.includes('JMM') || tags.includes('Java')) return 'Java';
  if (tags.includes('MyBatis')) return 'MyBatis';
  if (tags.includes('分布式') || tags.includes('微服务')) return 'Distributed Systems';
  if (tags.includes('Nginx')) return 'DevOps';
  if (tags.includes('消息队列') || tags.includes('RabbitMQ') || tags.includes('ActiveMQ')) return 'Message Queue';
  return 'Backend';
}

// Read all markdown files
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

const blogItems = [];

files.forEach((file, index) => {
  const content = fs.readFileSync(path.join(sourceDir, file), 'utf8');

  // Parse frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return;

  const frontmatter = frontmatterMatch[1];
  const body = content.slice(frontmatterMatch[0].length).trim();

  // Extract metadata
  const titleMatch = frontmatter.match(/title:\s*"?([^"\n]+)"?/);
  const dateMatch = frontmatter.match(/pubDatetime:\s*(\d{4}-\d{2}-\d{2})/);
  const descMatch = frontmatter.match(/description:\s*"?([^"\n]+)"?/);
  const tagsMatch = frontmatter.match(/tags:\n([\s\S]*?)(?=\n\w|$)/);

  const originalTitle = titleMatch ? titleMatch[1].trim() : file;
  const date = dateMatch ? dateMatch[1] : '2020-01-01';
  const description = descMatch ? descMatch[1].trim() : '';

  // Parse tags
  let tags = [];
  if (tagsMatch) {
    const tagLines = tagsMatch[1].split('\n');
    tags = tagLines
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace(/^\s*-\s*/, '').trim());
  }

  // Translate title
  let englishTitle = originalTitle;
  for (const [cn, en] of Object.entries(titleTranslations)) {
    if (originalTitle.includes(cn) || originalTitle.toLowerCase().includes(cn.toLowerCase())) {
      englishTitle = en;
      break;
    }
  }

  // Create slug from date and title
  const slug = file.replace('.md', '').replace(/[\u4e00-\u9fa5]/g, '').replace(/[^a-zA-Z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  // Format date
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // Calculate read time (roughly 200 words per minute)
  const wordCount = body.length / 2; // Chinese characters
  const readTime = Math.max(3, Math.ceil(wordCount / 200));

  // Convert markdown to basic HTML (simplified)
  let htmlContent = body
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" alt="illustration" class="my-4" />')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

  // Wrap in paragraphs
  htmlContent = '<p>' + htmlContent + '</p>';

  // Truncate for excerpt
  const excerpt = description || body.slice(0, 150).replace(/[#*`\[\]!\(\)]/g, '').trim() + '...';

  const category = getCategory(tags);

  blogItems.push({
    title: englishTitle,
    excerpt: excerpt.slice(0, 200),
    image: `/img/blog${(index % 6) + 1}.jpg`,
    url: `/blog/${slug}`,
    date: formattedDate,
    category: category,
    tags: tags.slice(0, 3),
    slug: slug,
    content: htmlContent.slice(0, 5000), // Limit content size
    readTime: `${readTime} min read`,
  });
});

// Generate TypeScript file
const author = {
  name: 'Weiguang Li',
  bio: 'Java Backend Engineer specializing in Spring Boot, distributed systems, and microservices. Passionate about clean code and continuous learning.',
  image: '/img/male2.jpg',
  social: {
    github: 'https://github.com/OiPunk',
    linkedin: 'https://linkedin.com/in/',
    twitter: 'https://twitter.com/',
  },
};

const tsContent = `// src/data/blogItems.ts
export interface Author {
  name: string;
  bio: string;
  image: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface BlogItemType {
  title: string;
  excerpt: string;
  image: string;
  url: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
  content: string;
  author: Author;
  readTime: string;
  relatedPosts: string[];
}

const defaultAuthor: Author = ${JSON.stringify(author, null, 2)};

export const blogItems: BlogItemType[] = [
${blogItems.map((item, idx) => {
  const relatedPosts = blogItems
    .filter((p, i) => i !== idx && p.category === item.category)
    .slice(0, 2)
    .map(p => p.slug);

  return `  {
    title: ${JSON.stringify(item.title)},
    excerpt: ${JSON.stringify(item.excerpt)},
    image: '${item.image}',
    url: '${item.url}',
    date: '${item.date}',
    category: '${item.category}',
    tags: ${JSON.stringify(item.tags)},
    slug: '${item.slug}',
    content: \`${item.content.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
    author: defaultAuthor,
    readTime: '${item.readTime}',
    relatedPosts: ${JSON.stringify(relatedPosts)},
  }`;
}).join(',\n')}
];
`;

fs.writeFileSync(targetFile, tsContent);
console.log(`Migrated ${blogItems.length} blog posts to ${targetFile}`);
