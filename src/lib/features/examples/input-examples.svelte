<script lang="ts">
	import { getCatFact } from '$lib/api/test';
	import ComponentBox from '$lib/components/background/component-box.svelte';
	import HeaderForm from '$lib/components/common/HeaderForm.svelte';
	import NumberInput from '$lib/components/common/NumberInput.svelte';
	import TextInput from '$lib/components/common/TextInput.svelte';
	import FormMain from '$lib/components/forms/main/form-main.svelte';
	import { onMount } from 'svelte';

	let value: any;
	let numberValue: any;

	let catFacts: string[] = [];

	async function fetchCatFacts() {
		const fact = await getCatFact(5);
		if (Array.isArray(fact) && fact.length > 0) {
			return fact;
		} else if (typeof fact === 'string') {
			return [fact];
		} else {
			return [];
		}
	}

	onMount(async () => {
		catFacts = ['Fetching cat facts...'];
		catFacts = await fetchCatFacts();
	});

</script>

<FormMain>
	<ComponentBox>
		<HeaderForm textAlign="start" title="First Component" subtitle="This is the first component" />
		<TextInput
			id="default-input"
			bind:value
			labelSize="w-48"
			placeholder="Enter text here"
			required={false}
			type="text"
			labelText="Default Input"
			inputElement={null}
		/>
		<NumberInput
			id="number-input"
			bind:value={numberValue}
			labelSize="w-48"
			placeholder="Enter number here"
			required={false}
			labelText="Number Input"
			inputElement={null}
		></NumberInput>
	</ComponentBox>
	<ComponentBox>
		<HeaderForm textAlign="start" title="Second Component" />
		{#if catFacts.length > 0}
			{#each catFacts as fact}
				<p>{fact}</p>
			{/each}
		{:else}
			<p>No cat facts available</p>
		{/if}
	</ComponentBox>
</FormMain>

<style scoped>
</style>
