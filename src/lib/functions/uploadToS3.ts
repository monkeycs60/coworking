import { S3 } from 'aws-sdk';
import axios from 'axios';

const s3 = new S3({
    accessKeyId: process.env.ACCESS_KEY_ID_AWS,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
    region: process.env.REGION_AWS,
});

export async function uploadToS3(
    data: Buffer,
    filename: string,
): Promise<string> {
    const bucketName = 'coworking-malin-bucket';
    const params = {
        Bucket: bucketName,
        Key: filename,
        Body: data,
        ACL: 'public-read', // pour que l'image soit publiquement accessible
    };

    await s3.putObject(params).promise();

    // Retournez l'URL de l'image stockée sur S3
    return `https://${bucketName}.s3.amazonaws.com/${filename}`;
}

export async function downloadImageAndUploadToS3(
    url: string,
    filename: string,
): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    return uploadToS3(imageBuffer, filename);
}
