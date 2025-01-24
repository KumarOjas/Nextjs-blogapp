import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import React from 'react';

interface Props {
  content: string;
  title: string;
}

const Home: React.FC<Props> = ({ content, title }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
      </header>
      <main className="flex-grow p-8">
        <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: content }} />
        {/* Fallback rendering */}
        {!content && <p>No content available.</p>}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© 2025 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'src/posts/sample-post.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  console.log('Markdown Content:', content); // Debugging line

  return {
    props: {
      title: data.title,
      content: content,
    },
  };
}

export default Home;
