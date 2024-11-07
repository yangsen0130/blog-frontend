/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { getBlog, deleteBlog } from '../../services/api';
import { Blog } from '../../types';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown';

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const response = await getBlog(Number(id));
          if (response.code === 200) {
            setBlog(response.data);
          } else {
            setError(response.message);
          }
        } catch (err) {
          setError('获取博客详情失败');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!blog) return;
    if (window.confirm('确定要删除这篇博客吗？')) {
      try {
        const response = await deleteBlog(blog.id);
        if (response.code === 200) {
          router.push('/');
        }
      } catch (error) {
        setError('删除失败');
      }
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!blog) return <div>博客不存在</div>;

  const isAuthor = user && user.id === blog.authorId;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-600 mb-8">
          <span>作者: {blog.author.username}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
        </div>
        {isAuthor && (
          <div className="mb-8 space-x-4">
            <button
              onClick={() => router.push(`/upload?id=${blog.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              编辑
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              删除
            </button>
          </div>
        )}
        <div className="prose max-w-none">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </Layout>
  );
}