import { NextApiRequest, NextApiResponse } from 'next';

import db from '../../../lib/admin';

export default async (req, res: NextApiResponse) => {
    try {
        const { slug } = req.body;
        const entries = await db.collection('entries').get();
        const entriesData = entries.docs.map(entry => entry.data());

        if (entriesData.some(entry => entry.slug === slug)) {
            req.status(400).end();
        } else {
            const { id } = await db.collection('entries').add({
                ...req.body,
                created: new Date().toISOString(),
            });
            res.status(200).json({ id });
        }
    } catch (err) {
        res.status(400).end();
    }
}