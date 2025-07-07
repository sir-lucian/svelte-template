<script>
    import BackgroundGradient from '$lib/components/background/background-gradient.svelte';
	import LoginBox from '$lib/components/login/login-box.svelte';
</script>

<BackgroundGradient />
<div class="login-container">
	<div class="login-box-container w-2/3">
		<LoginBox />
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
        box-shadow: 2 2px 5px rgba(0, 0, 0, 0.25); /* Subtle shadow for depth */
    }
</style>
