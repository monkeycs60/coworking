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
    try {
        await s3.putObject(params).promise();

        // Retournez l'URL de l'image stockée sur S3
        return `https://${bucketName}.s3.amazonaws.com/${filename}`;
    } catch (error) {
        console.error(error);
        throw new Error('Error uploading to S3');
    }
}

export async function downloadImageAndUploadToS3(
    url: string,
    filename: string,
): Promise<string> {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    return uploadToS3(imageBuffer, filename);
}

export function getPresignedUrl(
    fileName: string,
    fileType: string,
): Promise<string> {
    const params = {
        Bucket: 'coworking-malin-bucket',
        Key: fileName,
        Expires: 60, // Duration until the URL expires, in seconds
        ContentType: fileType,
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (error, url) => {
            if (error) reject(error);
            else resolve(url);
        });
    });
}
