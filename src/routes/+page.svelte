<script lang="ts">
	import Result from '$lib/components/Result.svelte';

	interface OCRResult {
		index: number;
		markdown: string;
		images: string[];
	}

	let loading = $state(false);
	let result = $state<OCRResult[]>([]);
	let annotations = $state('');

	async function handleSubmit(event: Event) {
		loading = true;
		event.preventDefault();
		const res = await fetch('api/ocr', {
			method: 'POST',
			body: new FormData(event.target as HTMLFormElement)
		});

		if (res.ok) {
			const data = await res.json();
			console.log('OCR Result:', data);
			result = data.ocr.pages;
			annotations = data.ocr.documentAnnotation;
			loading = false;
		} else {
			console.error('Error:', res.statusText);
			loading = false;
		}
	}
</script>

<main class="grid h-screen grid-cols-2 divide-x divide-neutral-200">
	<form
		onsubmit={handleSubmit}
		method="POST"
		enctype="multipart/form-data"
		class="flex h-screen flex-col items-center justify-center p-4
		{loading ? 'pointer-events-none opacity-50' : ''}"
	>
		<div class="flex max-w-xl flex-col gap-2">
			<div class="w-full rounded-xl border border-neutral-200 bg-white p-4 shadow-lg">
				{#if loading}
					<div
						class="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-neutral-600 border-t-transparent"
					></div>
				{:else}
					<input type="file" name="document" 
					accept="image/png, image/jpeg, application/pdf"
					class="mb-4 rounded bg-neutral-100 p-4" />

					<button type="submit" class="block rounded bg-black p-2 text-white">Submit</button>
				{/if}
			</div>
		</div>
	</form>
	<Result {result} {annotations} />
</main>
