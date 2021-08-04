import {connectToDatabase} from "../../../lib/db";
import mongodb from 'mongodb';

async function handler (req, res, next) {

    if (req.method === 'POST') {
        const {id, name} = req.body;
        const client = await connectToDatabase();
        const db = client.db();
        console.log(id);
        let existingProject;
        let currentUser;
        try  {
            existingProject = await db.collection('validatedProjects').findOne({
                _id: mongodb.ObjectId(id)
            });
            currentUser = await db.collection('users').findOne({
                name: name
            });
            await db.collection('users').updateOne({
                name: name
            }, {
                $push: {
                    projects: {existingProject}
                }
            })
        } catch(err) {
            console.log(err)
        }
        res.status(201).json({
            existingProject,
            currentUser
        })
        client.close()
    }

}

export default handler