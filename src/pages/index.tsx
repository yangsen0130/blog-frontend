import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../services/api';
import { Blog } from '../types';

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        if (response.code === 200) {
          setBlogs(response.data.content);
        } else {
          setError(response.message);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('获取博客列表失败');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <Layout>
      <div className="space-y-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </Layout>
  );
}