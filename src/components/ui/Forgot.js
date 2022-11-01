import styled from 'styled-components';

const Forgot = styled.span`
    margin-top: 0.5rem;
    font-size: 0.6rem;
    color: Olive;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    &:hover {
        text-decoration: underline;
    }
    @media (max-width: 768px) {
        margin-top: 1rem;
    }
`
export default Forgot;