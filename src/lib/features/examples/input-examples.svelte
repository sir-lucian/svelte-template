<script lang="ts">
	import { getCatFact, postTest } from '$lib/example-apis/test';
	import ComponentBox from '$lib/components/background/component-box.svelte';
	import CheckListInput from '$lib/components/common/CheckListInput.svelte';
	import ConsentInput from '$lib/components/common/ConsentInput.svelte';
	import DropDownInput from '$lib/components/common/DropDownInput.svelte';
	import HeaderForm from '$lib/components/common/HeaderForm.svelte';
	import NumberInput from '$lib/components/common/NumberInput.svelte';
	import RadioInput from '$lib/components/common/RadioInput.svelte';
	import TextInput from '$lib/components/common/TextInput.svelte';
	import FormMain from '$lib/components/forms/main/form-main.svelte';
	import { onMount } from 'svelte';

	let textValue: string = '';
	let numberValue: number;
	let radioValue: number;
	let dropdownValue: number;
	let checkListValue: number[] = [];
	let consentValue: boolean = false;
	let disabled: boolean = true;

	let components: any[] = [];
	let catFacts: string[] = [];
	let loadingInitData: boolean = true;

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
		const response = await postTest();
		if (response) {
			textValue = response;
			disabled = false;
			loadingInitData = false;
		} else {
			console.error('Failed to post test');
		}
	});

</script>

<FormMain>
	<ComponentBox bind:loadingInitData={loadingInitData}>
		<HeaderForm textAlign="start" title="Input Components Example" subtitle="นี่คือตัวอย่างของ Input Components" />
		<TextInput
			id="default-input"
			bind:value={textValue}
			labelSize="w-48"
			placeholder="Enter text here"
			required={true}
			disabled={disabled}
			type="text"
			bind:this={components[0]}
			labelText="Default Input"
		/>
		<NumberInput
			id="number-input"
			bind:value={numberValue}
			labelSize="w-48"
			placeholder="Enter number here"
			required={true}
			disabled={disabled}
			bind:this={components[1]}
			labelText="Number Input"
		></NumberInput>
		<RadioInput
			id="radio-input"
			bind:value={radioValue}
			labelSize="w-48"
			required={true}
			disabled={disabled}
			labelText="Radio Input"
			itemsWidth="md:w-1/5 w-full"
			direction="horizontal"
			bind:this={components[2]}
			dataSet={new Map([
				[1, 'Option 1'],
				[2, 'Option 2'],
				[3, 'Option 3'],
				[4, 'Option 4']
			])}
		></RadioInput>
		<DropDownInput
			id="dropdown-input"
			bind:value={dropdownValue}
			labelSize="w-48"
			required={true}
			disabled={disabled}
			labelText="Dropdown Input"
			bind:this={components[3]}
			dataSet={new Map([
				[1, 'Option 1'],
				[2, 'Option 2'],
				[3, 'Option 3'],
				[4, 'Option 4']
			])}
		></DropDownInput>
		<CheckListInput
			id="checklist-input"
			bind:value={checkListValue}
			labelSize="w-48"
			required={true}
			disabled={disabled}
			itemsWidth="md:w-1/5 w-full"
			direction="horizontal"
			labelText="Checklist Input"
			bind:this={components[4]}
			dataSet={new Map([
				[1, 'Option 1'],
				[2, 'Option 2'],
				[3, 'Option 3'],
				[4, 'Option 4']
			])}
		></CheckListInput>
		<ConsentInput
			id="consent-input"
			required={true}
			disabled={disabled}
			consentText="By checking this box, you agree to the terms and conditions."
			bind:this={components[5]}
			bind:value={consentValue}
		/>
		<button class="mx-auto btn bg-amber-400 rounded-md px-3 py-2" on:click={() => {
			components[0].validateInput();
			components[1].validateInput();
			components[2].validateInput();
			components[3].validateInput();
			components[4].validateInput();
			components[5].validateInput();
			console.log(radioValue);
		}}>Submit</button>
	</ComponentBox>
	<ComponentBox bind:loadingInitData={loadingInitData}>
		<HeaderForm textAlign="start" title="Cat Facts" subtitle="Here are some interesting cat facts!" />
		{#if catFacts.length > 0}
			{#each catFacts as fact}
				<p class="text-start">{fact}</p>
			{/each}
		{:else}
			<p>No cat facts available</p>
		{/if}
	</ComponentBox>
</FormMain>

<style scoped>
	button:hover {
		transition: all 0.3s ease-in-out;
		cursor: pointer;
	}
</style>
