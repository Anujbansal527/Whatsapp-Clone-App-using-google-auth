
import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = "http://loacalhost:8080";

let gfs, gridfsBucket;

const conn = mongoose.connection;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


export const uploadImage = (req, res) => {
    if(!req.file) 
        return res.status(404).json("File not found");
    
    const imageUrl = `${url}/file/${req.file.filename}`;

    res.status(200).json(imageUrl);    
}

export const getImage = async (req, res) => {
    try {   
                                                //getting filename .....yaha error aai thi ki nhumne url me bas file fetch kiya tha 
        const file = await gfs.files.findOne({ filename: req.params.filename });
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(res);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


