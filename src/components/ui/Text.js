import styled from 'styled-components';

const Text = styled.p`
    font-size: 1.2rem;
    font-weight: 400;
    font-family: 'Roboto', sans-serif;
    margin: .1em;
    @media (max-width: 768px) {
        font-size: 1rem;
        font-weight: 200;
    }
`;

export default Text;