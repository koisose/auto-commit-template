import { type RequestHandler } from '@builder.io/qwik-city';
import fs from 'fs';
import path from 'path';
import {generateOgImage} from '~/utils/create-image'

export const onGet: RequestHandler = async ({params, send }) => {
    const fileName = path.resolve('./src/media/'+params.id);

    if (fs.existsSync(fileName)) {
        const imageBuffer = fs.readFileSync(fileName);
        send(new Response(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
            },
        }));

    } else {
        const imageBuffer = fs.readFileSync(path.resolve('./src/media/thunder.png'));
        send(new Response(imageBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
            },
        }));
    }

};






