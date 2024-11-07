import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/api';
import { useRouter } from 'next/router';

export default function Header() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            博客系统
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/upload" className="text-gray-600 hover:text-gray-900">
                发布文章
              </Link>
              <span className="text-gray-600">{user.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                退出
              </button>
            </>
          ) : (
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              登录
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}