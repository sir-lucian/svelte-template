<script lang="ts">
	import { REQUIRED_STAR } from "$lib/utils";
	import z from "zod";

	export let value: string[] | number[] = [];
	export let dataSet: Map<string | number, any> | undefined = undefined;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let direction: 'horizontal' | 'vertical' = 'horizontal';
	export let itemsWidth: string = 'md:w-1/4 w-full'; // Default width for items in horizontal direction
	export let id: string | undefined = undefined;
	export let labelText: string = 'ข้อมูล';
	export let labelSize: string = 'w-24';
	export let targetableId: string = id && id.length > 0 ? id : 'checklist-input-' + new Date().getTime();
	export let errorMessage: string | undefined = undefined;
	export let showLabel: boolean = true;

	export let handleInputChange: (() => Promise<any>) | undefined = undefined;

	export function validateInput(valueType: 'number' | 'text' = 'number'): boolean {
        let validatedResult: any;
        errorMessage = undefined;
        const valueIsNumberRule = z.array(z
            .number({
                required_error: 'ต้องการข้อมูลนี้',
                invalid_type_error: 'ต้องการข้อมูลนี้'
            }));
		const valueIsTextRule = z.array(z
			.string({
				required_error: 'ต้องการข้อมูลนี้',
				invalid_type_error: 'ต้องการข้อมูลนี้'
			}));
        switch (valueType) {
			case 'number':
				if (required) {
					validatedResult = valueIsNumberRule.min(1, {
						message: 'ต้องการข้อมูลนี้'
					}).safeParse(value);
				} else {
					validatedResult = valueIsNumberRule.optional().safeParse(value);
				}
				break;
			case 'text':
				if (required) {
					validatedResult = valueIsTextRule.min(1, {
						message: 'ต้องการข้อมูลนี้'
					}).safeParse(value);
				} else {
					validatedResult = valueIsTextRule.optional().safeParse(value);
				}
				break;
			default:
				validatedResult = valueIsTextRule.optional().safeParse(value);
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

<div class="text-input-group mt-1">
	<div class="{showLabel ? '' : 'hidden'} {labelSize}">
		<span class="label-text text-black inline-flex gap-2">
			{labelText}{@html required ? REQUIRED_STAR : ''}
		</span>
	</div>
	<div class="text-input-box-container flex {direction === 'vertical' ? 'flex-col gap-2' : 'flex-col md:flex-row md:gap-0 gap-2'} flex-wrap justify-start">
		{#if dataSet && dataSet.size > 0}
			{#each Array.from(dataSet.entries()) as [key, description]}
				<div class={`inline-flex items-start ${itemsWidth} pe-3`}>
					<input
						type="checkbox"
						id={targetableId + '-' + key}
						style="margin-top: 0.1rem; width: 1.2rem; height: 1.2rem;"
						class="{!disabled ? 'labelOfList' : ''} text-sky-500 {errorMessage ? 'border-red-500' : 'border-gray-400'} focus:ring-sky-500"
						name={targetableId}
						value={key}
                        bind:group={value}
						on:change={handleInputChange}
						{required}
						{disabled}
					/>
					<label class="ml-2 {disabled ? 'text-gray-400' : 'labelOfList'}" for={targetableId + '-' + key}>{description}</label>
				</div>
			{/each}
		{:else}
			<p class="font-italic text-gray-400">ไม่มีข้อมูล</p>
		{/if}
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

	.labelOfList:hover {
		cursor: pointer;
	}
</style>
