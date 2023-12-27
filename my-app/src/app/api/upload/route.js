import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req) {
    const data =  await req.formData();
    //we get data from the formData object in profile page.js
    if(data.get('file'))
    {   //upload the file
        const file = data.get('file');

        //initialise our aws s3 client
        const s3Client = new S3Client({
            region:'ap-southeast-2',
            credentials:{
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey:process.env.AWS_SECRET_KEY,
            },
        });
        
        //get the last part of the file name which is eg jpeg or jpg
        const ext = file.name.split('.').slice(-1)[0];
        //create a unique file name for each picture 
        const newFileName = uniqid() + '.' + ext;
        
        //break the image.jpg file into chunks of bytes 
        const chunks = [];
        for await (const chunk of file.stream()) {
          chunks.push(chunk);
        }
        
        //convert chunks to a buffer
        const buffer = Buffer.concat(chunks);

        //this is our bucket name
        const bucket = 'food-ordering-wh';

        s3Client.send( new PutObjectCommand({
            Bucket:'food-ordering-wh',
            Key: newFileName,
            ACL:'public-read', //public read so users can see the profile pic publicly
            ContentType: file.type,
            Body:buffer //body has to be buffered into chunks
        }));
        
        

        const link = 'https://'+bucket+'.s3.amazonaws.com/'+newFileName;
        return Response.json(link);
    }
    return Response.json(true);
}