import { NextResponse } from 'next/server';
import {
    uploadToS3,
    downloadImageAndUploadToS3,
} from '@/lib/functions/uploadToS3'; // replace 'path-to-your-aws-utils' with the actual path
import { type NextRequest } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const formData = await request.formData();

        const files = formData.getAll('file'); // get all files

          if (!files || files.length === 0) {
              return NextResponse.json({
                  success: false,
                  error: 'No files provided',
              });
          }

       const uploadedUrls = [];

       // Iterate over the files and upload them
       for (const file of files) {
           const buffer = Buffer.from(await(file as File).arrayBuffer());
           const url = await uploadToS3(buffer, (file as File).name);
           uploadedUrls.push(url);
       }

        return NextResponse.json({ success: true, urls: uploadedUrls });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: 'erreur de téléversement des fichiers du user' });
    }
}
