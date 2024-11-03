import Head from 'next/head';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <>
      <Head>
        <title>登录 - 博客系统</title>
        <meta name="description" content="博客系统登录页面" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </>
  );
}