import {connectToDatabase} from "../../lib/db";

async function handler (req, res, next) {

    if (req.method === 'POST') {
        const {energies, amount, title, consumption, infos, projectId} = req.body;

        const client = await connectToDatabase();
        const db = client.db();

        const createdProject = await db.collection('validatedProjects').insertOne({
            energies,
            amount,
            title,
            consumption,
            infos,
            projectId
        });

        res.status(201).json({
            energies: createdProject.ops[0].energies,
            amount: createdProject.ops[0].energies,
            title: createdProject.ops[0].title,
            consumption: createdProject.ops[0].consumption,
            infos: createdProject.ops[0].infos
        })

        client.close()
    }

}

export default handler