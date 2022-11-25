import Head from "next/head";
import styled from "styled-components";
import Contenedor from "./ui/Contenedor"
import Text from "./ui/Text";
import Title from "./ui/Title";

export default function EventDetails({evento, judge}) {


    return (
        <Contenedor>
            <Head>
                <title>{evento?.event}</title>
            </Head>
            <Title>{evento && `${evento.event}`}</Title>
            <Text><strong>{evento && evento.date}</strong></Text>
            <Tabla>
                <Fila>
                    <Left><Text>Organizador:</Text></Left>
                    <Right><Text>{judge && `${judge.name} ${judge.notes && judge.notes != '' ? '(' + judge.notes + ')' : ''}`}</Text></Right>
                </Fila>
                <Fila>
                    <Left><Text>Fee:</Text></Left>
                    <Right><Text>{evento && evento.fee}</Text></Right>
                </Fila>
                <Fila>
                    <Left><Text>Lugar:</Text></Left>
                    <div>
                        {evento && evento.venue && evento.venue.map((venue) => {
                            return (
                                <Right><Text>{venue}</Text></Right>
                            )
                        })}
                    </div>
                </Fila>
                <Fila>
                    <Left><Text>Rondas:</Text></Left>
                    <Right><Text>{evento && `${evento.rounds} (${evento.timeLimit})`}</Text></Right>
                </Fila>
                <Center><Text><strong>{evento && evento.proxies}</strong></Text></Center>
                <Fila>
                    <Left><Text>Comentarios:</Text></Left>
                    <div>
                        {evento && evento.comments && evento.comments.map((comment) => {
                            return (
                                <Right><Text>{comment}</Text></Right>
                            )
                        })}
                    </div>
                </Fila>
            </Tabla>
        </Contenedor>
    )
}

const Tabla = styled.div`
    display: grid;
    margin: 1em;
    width: 80%;
    @media (min-width: 768px) {
        width: 70%;
    }
`;

const Fila = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 1em;
`;

const Left = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Right = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    margin: 1em 0;
`;