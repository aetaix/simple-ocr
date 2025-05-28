<script lang="ts">
	interface Result {
		markdown: string;
	}
	let { result, annotations }: { result: Result[]; annotations: string } = $props();
</script>

<div class="flex h-screen flex-col divide-y divide-neutral-200">
	<div class="h-1/2 overflow-y-scroll p-8">
		{#if result.length > 0}
			{#each result as page}
				<div class="mb-4">
					<pre class="whitespace-pre-wrap">{page.markdown}</pre>
				</div>
			{/each}
		{:else}
			<p class="opacity-30">No OCR result yet.</p>
		{/if}
	</div>
	<div class="h-1/2 overflow-y-scroll bg-neutral-100 p-8 font-mono text-sm">
		<h2 class="mb-4">Annotations</h2>
        <pre class="whitespace-pre-wrap">{annotations}</pre>
	</div>
</div>
