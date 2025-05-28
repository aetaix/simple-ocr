import { Mistral } from '@mistralai/mistralai';
import { MISTRAL_API_KEY } from '$env/static/private';

export const mistral = new Mistral({apiKey: MISTRAL_API_KEY});