import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Dropdown, Icon, LoginButton, TextField } from '@repo/ui';
import { useState } from 'react';

export const TestPage = () => {
  const theme = useTheme();
  console.log(theme);
  const [selectedContents, setSelectedContents] = useState<string[]>([]);
  const contents = ['보컬', '기타', '베이스', '키보드', '드럼', '그 외'];

  return (
    <div>
      <Button colorTheme="gray" width="376px" height="48px">
        Text
      </Button>
      <Button colorTheme="black" width="376px" height="48px">
        블랙
      </Button>
      <Button colorTheme="blue1" width="376px" height="48px">
        블루1
      </Button>
      <Button colorTheme="blue2" width="376px" height="48px">
        블루2
      </Button>
      <Button colorTheme="yellow1" width="376px" height="48px">
        옐로우1
      </Button>
      <LoginButton loginTheme="kakao" iconName="kakao">
        Kakao로 3초만에 시작하기
      </LoginButton>
      {/*<Icon name="arrowDown" fill={theme.palette.yellow700} size={20} />
      <Icon name="arrowLeft" fill={theme.palette.yellow700} size={32} />*/}
      <Icon name="google" size={40} />

      <Icon name="kakao" size={40} />

      <TextField width="312px" placeholder="테스트1" />
      <TextField width="312px" warning placeholder="테스트2(warning)" />
      <TextField width="312px" disabled placeholder="테스트3(disabled)" />
      {/*}
      <Icon
        name="add"
        fill={theme.palette.yellow700}
        stroke={theme.palette.yellow700}
        size={24}
      />*/}
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
    </div>
  );
};
