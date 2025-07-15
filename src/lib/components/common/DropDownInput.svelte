<script lang="ts">
	import { REQUIRED_STAR } from '$lib/utils';
	import z from 'zod';

	export let value: string | number;
	export let dataSet: Map<string | number, any> | undefined = undefined;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let id: string | undefined = undefined;
	export let labelText: string = 'ข้อมูล';
	export let labelSize: string = 'w-24';
	export let targetableId: string =
		id && id.length > 0 ? id : 'dropdown-input-' + new Date().getTime();
	export let errorMessage: string | undefined = undefined;
	export let showLabel: boolean = true;
	export let fullWidth: boolean = false;

	export let handleInputChange: (() => Promise<any>) | undefined = undefined;

	export function validateInput(valueType: 'number' | 'text' = 'number'): boolean {
		let validatedResult: any;
		errorMessage = undefined;
		const valueIsNumberRule = z.number({
			required_error: 'ต้องการข้อมูลนี้',
			invalid_type_error: 'ต้องการข้อมูลนี้'
		});
		const valueIsTextRule = z.string({
			required_error: 'ต้องการข้อมูลนี้',
			invalid_type_error: 'ต้องการข้อมูลนี้'
		});
		switch (valueType) {
			case 'number':
				if (required) {
					validatedResult = valueIsNumberRule.safeParse(value);
				} else {
					validatedResult = valueIsNumberRule.nullish().optional().safeParse(value);
				}
				break;
			case 'text':
				if (required) {
					validatedResult = valueIsTextRule.safeParse(value);
				} else {
					validatedResult = valueIsTextRule.nullish().optional().safeParse(value);
				}
				break;
			default:
				validatedResult = valueIsTextRule.nullish().optional().safeParse(value);
		}

		if (!validatedResult.success) {
			const errors = validatedResult.error.format();
			errorMessage = errors._errors[0] ?? 'ข้อมูลไม่ถูกต้อง';
			return false;
		} else {
			errorMessage = undefined;
			return true;
		}
	}
</script>

<div class="text-input-group my-1">
	<div class="{showLabel ? (!dataSet || dataSet.size === 0 ? '' : 'mt-1') : 'hidden'} {labelSize}">
		<span class="label-text inline-flex gap-2 text-black">
			{labelText}{@html required ? REQUIRED_STAR : ''}
		</span>
	</div>
	<div class="text-input-box-container">
		{#if dataSet && dataSet.size > 0}
			<select
				class="text-input-box ps-3 {fullWidth
					? 'w-full flex-grow'
					: 'pe-10'} border-0 border-b-1 {errorMessage
					? 'border-b-red-500'
					: 'border-gray-400'} px-2 py-1 hover:border-b-sky-500 focus:border-b-sky-500 focus:ring-0 focus:outline-none {disabled
					? 'bg-gray-100 text-gray-400'
					: 'bg-white text-black'}"
				id={targetableId}
				name={targetableId}
				bind:value
				on:change={handleInputChange}
				{required}
				{disabled}
			>
				{#each Array.from(dataSet.entries()) as [key, description], index}
					{#if (index === 0 && !value) || key === value}
						<option value={key} selected>
							{description}
						</option>
					{:else}
						<option value={key}>
							{description}
						</option>
					{/if}
				{/each}
			</select>
		{/if}

		{#if !dataSet || dataSet.size === 0}
			<p class="text-gray-400">ไม่มีข้อมูล</p>
		{/if}

		{#if errorMessage}
			<div class="mt-1 text-sm text-red-500">{errorMessage}</div>
		{/if}
	</div>
</div>

<style>
	div,
	select {
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

	select:hover {
		cursor: pointer;
	}

	option:hover,
	option:focus {
		background-color: black;
	}
	option:focus {
		outline: none;
	}
</style>
