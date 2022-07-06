import styled from 'styled-components';

const GradientText = styled.span`
background: ${({ theme }) => theme.colors.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
`

export default GradientText