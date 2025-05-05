import styled from '@emotion/styled';
export type TabItem = {
  label: string;
  value: string;
};

type TabProps<T extends string> = {
  items: { label: string; value: T }[];
  selected: T;
  onChange: (value: T) => void;
};

export const Tab = <T extends string>({
  items,
  selected,
  onChange,
}: TabProps<T>) => {
  return (
    <TabWrapper>
      {items.map(({ label, value }) => (
        <TabButton
          key={value}
          isActive={value === selected}
          onClick={() => onChange(value)}
        >
          {label}
        </TabButton>
      ))}
    </TabWrapper>
  );
};

const TabWrapper = styled.div`
  display: flex;
  border-bottom: 4px solid ${({ theme }) => theme.palette.gray100};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  position: relative;
  background: none;
  border: none;
  padding: 12px 16px;
  margin-bottom: -1px;
  cursor: pointer;

  ${({ theme }) => theme.typo.body1m};
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.yellow700 : theme.palette.gray400};

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${({ isActive }) => (isActive ? '100%' : '0')};
    height: 4px;
    background-color: ${({ theme }) => theme.palette.yellow500};
    transition: width 0.2s ease;
  }
`;
