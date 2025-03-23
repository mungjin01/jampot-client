import { OnboardingForm } from '@web/components/Onboarding/OnboardingForm';
import styled from '@emotion/styled';

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
