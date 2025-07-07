<script lang="ts">
	export let value: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let id: string | undefined = undefined;
	export let max: number = Infinity;
	export let min: number = -Infinity;
	export let step: number = 1;
	export let labelText: string = 'ข้อมูล';
	export let labelSize: string = 'w-24';
	export let targetableId: string =
		id && id.length > 0 ? id : 'number-input-' + new Date().getTime();
	export let errorMessage: string | undefined = undefined;
	export let inputElement: any;
	export let showLabel: boolean = true;
</script>

<div class="text-input-group">
	<div class="{showLabel ? 'mt-1' : 'hidden'} {labelSize}">
		<label class="label-text text-black" for={targetableId}>
			{labelText}{@html required ? '<span class="text-red-500">*</span>' : ''}
		</label>
	</div>
	<div class="text-input-box-container">
		<input
			class="text-input-box w-full rounded-md border border-gray-400 px-2 py-1 focus:ring-1 focus:ring-sky-500 focus:outline-none {disabled
				? 'bg-gray-100 text-gray-400'
				: 'bg-white text-black'}"
			{placeholder}
			id={targetableId}
			bind:this={inputElement}
			type="number"
			{min}
			{max}
			{step}
			bind:value
			{required}
			{disabled}
		/>
		{#if errorMessage}
			<div class="mt-1 text-sm text-red-500">{errorMessage}</div>
		{/if}
	</div>
</div>

<style>
	div,
	input {
		transition: 0.35s;
	}

	div.text-input-group {
		display: flex;
		flex-direction: row;
		align-items: top;
		justify-content: space-between;
		width: 100%;
	}

	div.text-input-box-container {
		flex-grow: 1;
	}

	div.text-input-box {
		width: 100%;
	}

	@layer base {
		input[type='number']::-webkit-outer-spin-button,
		input[type='number']::-webkit-inner-spin-button,
		input[type='number'] {
			-webkit-appearance: none;
			margin: 0;
			-moz-appearance: textfield !important;
		}
	}
</style>
