import Link from 'next/link';
import { Blog } from '../types';

export default function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <Link href={`/blog/${blog.id}`}>
        <h2 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h2>
      </Link>
      <p className="text-gray-600 mb-4">
        {blog.content.substring(0, 150)}...
      </p>
      <div className="text-sm text-gray-500">
        <span>作者: {blog.author.username}</span>
        <span className="mx-2">•</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}