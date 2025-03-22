import { LoginButton } from '@repo/ui';

export const LoginPage = () => {
  const handleLogin = (provider: 'google' | 'kakao') => {
    const oauthUrl = {
      google: 'https://jampot.co.kr/oauth2/authorization/google',
      kakao: 'https://jampot.co.kr/oauth2/authorization/kakao',
    };

    window.location.href = oauthUrl[provider];
  };

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
