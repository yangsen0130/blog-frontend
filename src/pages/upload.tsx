/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import DropZone from '../components/DropZone';
import { useAuth } from '../context/AuthContext';
import { createBlog, updateBlog, getBlog } from '../services/api';

export default function Upload() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }

    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await getBlog(Number(id));
          if (response.code === 200) {
            setTitle(response.data.title);
            setContent(response.data.content);
          }
        } catch (err) {
          setError('获取博客失败');
        }
      };
      fetchBlog();
    }
  }, [id, user, router]);

  const handleFileAccepted = async (file: File) => {
    const text = await file.text();
    setContent(text);
    // 从文件名中提取标题
    setTitle(file.name.replace('.md', ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);

    try {
      const response = id
        ? await updateBlog(Number(id), formData)
        : await createBlog(formData);

      if (response.code === 200) {
        router.push(`/blog/${response.data.id}`);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('上传失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">
          {id ? '编辑博客' : '发布新博客'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              标题
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              内容
            </label>
            <DropZone onFileAccepted={handleFileAccepted} />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-4 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-64"
              required
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading ? '提交中...' : '提交'}
          </button>
        </form>
      </div>
    </Layout>
  );
}