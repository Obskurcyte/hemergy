import {connectToDatabase} from "../../lib/db";

async function handler (req, res, next) {

    if (req.method === 'POST') {
        const {energy, amount, title, consumption, infos, projectId, lat, lng, city} = req.body;

        const client = await connectToDatabase();
        const db = client.db();

        const createdProject = await db.collection('projects').insertOne({
                energy,
                amount,
                title,
                consumption,
                infos,
                projectId,
                lat,
                lng,
                city,
            });

        res.status(201).json({
            energy: createdProject.ops[0].energy,
            amount: createdProject.ops[0].amount,
            title: createdProject.ops[0].title,
            consumption: createdProject.ops[0].consumption,
            infos: createdProject.ops[0].infos,
            lat: createdProject.ops[0].lat,
            lng: createdProject.ops[0].lng,
        })

        client.close()
    }

}

export default handler