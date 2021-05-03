import { NextApiRequest, NextApiResponse } from 'next';

import db from '../../lib/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const entries = await db.collection('entries').orderBy('created').get();
        const entriesData = entries.docs.map(entry => ({
            id: entry.id,
            ...entry.data()
        }));

        res.status(200).json({ entriesData });
    } catch (err) {
        res.status(400).end();
    }
}