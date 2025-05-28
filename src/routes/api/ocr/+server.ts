import { MISTRAL_API_KEY } from '$env/static/private';
import { Mistral } from '@mistralai/mistralai';
import { responseFormatFromZodObject } from '@mistralai/mistralai/extra/structChat.js';
import { DocumentSchema } from '$lib/schema';
// @ts-ignore
import { Buffer } from 'node:buffer';

const mistral = new Mistral({ apiKey: MISTRAL_API_KEY });

export async function POST({ request }) {
	const data = await request.formData();
	if (!data.has('document')) {
		return new Response(JSON.stringify({ success: false }));
	}

	const file = data.get('document') as File;
	// Convert the file to a Base64-encoded string
	const buffer = await file.arrayBuffer();
	const base64File = Buffer.from(buffer).toString('base64');

	let documentAnnotationFormat = undefined;

	if (DocumentSchema) {
		documentAnnotationFormat = responseFormatFromZodObject(DocumentSchema);
	}

	try {
		console.log('Processing document...');
		let ocr;

		// Check the file extension to determine if it's a document or an image
		if (file.name.endsWith('.pdf')) {
			ocr = await mistral.ocr.process({
				model: 'mistral-ocr-latest',
				document: {
					type: 'document_url',
					documentUrl: 'data:application/pdf;base64,' + base64File
				},
				documentAnnotationFormat,
				includeImageBase64: true
			});
		} else {
			ocr = await mistral.ocr.process({
				model: 'mistral-ocr-latest',
				document: {
					type: 'image_url',
					imageUrl: 'data:image/png;base64,' + base64File
				},
				documentAnnotationFormat,
				includeImageBase64: true
			});
		}

		console.log(ocr);

		return new Response(JSON.stringify({ ocr, success: true }));
	} catch (error) {
		console.error('Error:', error);
		return new Response(JSON.stringify({ success: false, error: error }));
	}
}
