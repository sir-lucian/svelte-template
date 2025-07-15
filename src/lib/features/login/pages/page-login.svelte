<script lang="ts">
    import BackgroundGradient from '$lib/components/background/background-gradient.svelte';
	import LoginBox from '$lib/components/login/login-box.svelte';

	let showLoginBox: boolean = false;
</script>

<BackgroundGradient />
<div class="login-container px-4">
	<div class="login-box-container sm:w-2/3 w-full">
		<div class="mx-auto my-5 text-center text-3xl font-bold">ระบบงาน XYZ</div>
		<p class="text-center mb-5 {showLoginBox ? 'hidden' : 'block'}">เข้าสู่ระบบ<button class="inline-block text-sky-500 hover:underline hover:cursor-pointer" on:click={() => showLoginBox = true}>ที่นี่</button></p>
		<LoginBox {showLoginBox} />
	</div>
</div>

<style scoped>
	div.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: transparent; /* Light background for contrast */
	}

    .login-box-container {
        min-width: 1/3;
        max-width: 600px; /* Limit the width of the login box */
        background-color: white; /* White background for the login box */
        border-radius: 1.25rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
        box-shadow: 2 2px 5px rgba(0, 0, 0, 0.25); /* Subtle shadow for depth */
    }
</style>
