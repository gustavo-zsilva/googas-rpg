import Head from "next/head";

import { AiFillLock } from 'react-icons/ai';

export default function Shop() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh]">
            <Head>
                <title>Shop | Googas RPG</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AiFillLock size={80} color="#fff" />
            <h1 className="text-3xl font-bold">Coming soon</h1>
        </div>
    )
}