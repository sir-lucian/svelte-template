<script lang="ts">
    export let loadingInitData: boolean = false;
</script>

<div class="component-box gap-5">
	<slot></slot>
	<div class="loading {loadingInitData ? 'flex' : 'hidden'}">
		<div
			class="text-surface font-[800] text-sky-500 m-5 inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			role="status"
		>
			<span
				class="!absolute !-m-px !h-px !w-px !overflow-hidden !border-0 !p-0 !whitespace-nowrap ![clip:rect(0,0,0,0)]"
				>Loading...</span
			>
		</div>
		<div class="spinner text-2xl font-[300] text-black dark:text-white">Loading</div>
	</div>
</div>

<style scoped>
	.component-box {
		position: relative;
		background-color: white;
		border-radius: 1rem;
        min-height: 10rem;
		display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
		padding: 2rem;
		width: 100%;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
		transition: all 0.3s ease-in-out;
	}

	.loading {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		backdrop-filter: grayscale();
		background-color: rgba(255, 255, 255, 0.75);
		border-radius: 1rem;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		z-index: 5;
		transition: all 0.3s ease-in-out;
	}

</style>
