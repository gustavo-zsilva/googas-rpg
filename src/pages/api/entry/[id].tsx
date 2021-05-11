import { NextApiRequest, NextApiResponse } from 'next';

import db from '../../../lib/admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    const { method } = req;

    try {
        switch (method) {
            case 'GET':
                const doc = await db.collection('entries').doc(id).get();
                if (!doc.exists) {
                    res.status(404).end();
                } else {
                    res.status(200).json(doc.data());
                }

                break;
            case 'PUT':
                await db.collection('entries').doc(id).update({
                    ...req.body,
                    updated: new Date().toISOString(),
                });

                break;
            case 'DELETE':
                await db.collection('entries').doc(id).delete();

                break;
        }

        res.status(200).end();
    } catch (err) {
        res.status(400).end();
    }
}