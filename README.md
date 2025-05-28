# Simple Document AI boilerplate

This is a simple boilerplate for a document AI application. It uses Mistral Document AI to extract information from documents.
Built with SvelteKit and TailwindCSS.

## Getting Started

1. Clone the repository
2. Change .env.example to .env and add your Mistral API key
3. Install dependencies with `npm install`

## Customizing Document Annotation

You can customize the document annotations by editing the `src/lib/schema.ts` file.
This schema use Zod to define the structure of the annotations you want to extract from the document.

```ts
const documentSchema = z.object({
	sections: z.array(
		z.object({
			title: z.string(),
			content: z.string()
		})
	)
});
```

## Running the app

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> This app is a simple boilerplate and is not meant to be used in production.
