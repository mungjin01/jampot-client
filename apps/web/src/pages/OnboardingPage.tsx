import styled from '@emotion/styled';
import { OnboardingForm } from '@web/components/OnboardingPage/OnboardingForm';

export const OnboardingPage = () => {
  return (
    <OnboardingPageContainer>
      <OnboardingForm />
    </OnboardingPageContainer>
  );
};

const OnboardingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 59px 0;
  background-color: ${({ theme }) => theme.palette.yellow50};
`;
