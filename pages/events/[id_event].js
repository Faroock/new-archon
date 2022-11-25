import Evento from "@components/screens/Evento";
import Head from "next/head";
import { useRouter } from "next/router";
import { desencriptar } from "utils/utils";

export default function Event() {
    const router = useRouter();
    const { id_event } = router.query;
    const id = desencriptar(id_event) || id_event;

    return (
        <>
            <Head>
                <title>Evento {id}</title>
            </Head>
            <Evento id_event={id} />
        </>
    )
}

