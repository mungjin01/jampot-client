import { useTheme } from '@emotion/react';

import {
  ButtonTextField,
  Icon,
  LoginButton,
  TextField,
  Dropdown,
} from '@repo/ui';
import { Header } from '@web/components/Header';
import { useState } from 'react';

export const TestPage = () => {
  const theme = useTheme();

  const [selectedContents, setSelectedContents] = useState<string[]>([]);
  const contents = ['보컬', '기타', '베이스', '키보드', '드럼', '그 외'];

  function handleClick(): void {
    console.log('click');
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Icon
        name="add"
        fill={theme.palette.yellow700}
        stroke={theme.palette.yellow700}
        size={24}
      />
      <Dropdown
        title={'세션 선택'}
        contents={contents}
        selectedContents={selectedContents}
        setSelectedContents={setSelectedContents}
      />
      <Dropdown
        title={'세션 선택'}
        contents={contents}
        selectedContents={selectedContents}
        setSelectedContents={setSelectedContents}
        width="400px"
      />

      <Icon
        name="add"
        fill={theme.palette.yellow700}
        stroke={theme.palette.yellow700}
        size={24}
      />
      <Header />
      <LoginButton loginTheme="google" iconName="google">
        Google로 3초만에 시작하기
      </LoginButton>

      <Icon name="arrowDown" fill={theme.palette.yellow700} size={20} />
      <Icon name="arrowLeft" fill={theme.palette.yellow700} size={32} />
      <Icon name="google" size={40} />

      <Icon name="kakao" size={40} />

      <TextField width="312px" placeholder="테스트1" />
      <TextField width="312px" warning placeholder="테스트2(warning)" />
      <TextField width="312px" disabled placeholder="테스트3(disabled)" />
      <ButtonTextField
        buttonText="Text"
        buttonClickHandler={handleClick}
        inputDisabled={false}
        buttonDisabled={false}
        warning={false}
        placeholder="테스트테스트"
      />
      <LoginButton loginTheme="kakao" iconName="kakao" iconSize={40}>
        Kakao로 3초만에 시작하기
      </LoginButton>
    </div>
  );
};
