import { useEffect } from 'react';
import { LoginButton } from '@repo/ui';

export const LoginPage = () => {
  const handleLogin = (provider: 'google' | 'kakao') => {
    const oauthUrl = {
      google: 'https://jampot.co.kr/oauth2/authorization/google',
      kakao: 'https://jampot.co.kr/oauth2/authorization/kakao',
    };

    window.location.href = oauthUrl[provider];
  };

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('https://jampot.co.kr/api/login', {
        method: 'POST',
        credentials: 'include', 
      });

      if (response.ok) {
        console.log('로그인 성공');
        const data = await response.json();
        console.log('User Info:', data);
      } else {
        console.log('로그인 필요');
      }
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus(); 
  }, []);

  return (
    <div>
      <LoginButton
        loginTheme="google"
        iconName="google"
        onClick={() => handleLogin('google')}
      >
        Google로 3초만에 시작하기
      </LoginButton>

      <LoginButton
        loginTheme="kakao"
        iconName="kakao"
        iconSize={40}
        onClick={() => handleLogin('kakao')}
      >
        Kakao로 3초만에 시작하기
      </LoginButton>
    </div>
  );
};
