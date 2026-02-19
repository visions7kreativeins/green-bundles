<script>
	import { fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Privacy Policy | Green Bundles</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-32" in:fade={{ duration: 400 }}>
	<a href="/" class="text-sm font-bold uppercase tracking-widest text-[var(--apple-blue)] hover:opacity-70 transition-opacity">← Back to Shop</a>
	
	<h1 class="mt-8 text-5xl font-black tracking-tight text-[var(--text-primary)]">Privacy Policy</h1>
	<p class="mt-4 text-lg font-medium opacity-40">Last Updated: February 19, 2026</p>

	<div class="mt-16 space-y-12 text-[var(--text-secondary)] leading-loose">
		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">1. Information We Collect</h2>
			<p>
				When you place an order, we collect your phone number and order details (package size, network). This information is used solely to process your request and provide support.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">2. How We Use Your Data</h2>
			<div class="space-y-4">
				<p>Your data is used to:</p>
				<ul class="list-disc pl-6 space-y-2 mt-4">
					<li>Fulfill your data bundle order.</li>
					<li>Notify our operations team of your payment.</li>
					<li>Provide customer support if an issue arises.</li>
				</ul>
			</div>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">3. Data Security</h2>
			<p>
				We do not share your phone number with third parties for marketing purposes. Your information is only shared with the telecommunications provider (MTN, Telecel, or AirtelTigo) as necessary to process the data transfer.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">4. Third-Party Services</h2>
			<p>
				We use <strong>EmailJS</strong> for order notifications. When you submit an order, the details are sent securely to our team via EmailJS. You can review their privacy policy at emailjs.com.
			</p>
		</section>
	</div>
</div>
