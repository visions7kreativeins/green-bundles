<script>
	import { fade, fly } from 'svelte/transition';
</script>

<svelte:head>
	<title>Terms of Service | Green Bundles</title>
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-32" in:fade={{ duration: 400 }}>
	<a href="/" class="text-sm font-bold uppercase tracking-widest text-[var(--apple-blue)] hover:opacity-70 transition-opacity">← Back to Shop</a>
	
	<h1 class="mt-8 text-5xl font-black tracking-tight text-[var(--text-primary)]">Terms of Service</h1>
	<p class="mt-4 text-lg font-medium opacity-40">Last Updated: February 19, 2026</p>

	<div class="mt-16 space-y-12 text-[var(--text-secondary)] leading-loose">
		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">1. Service Overview</h2>
			<p>
				Green Bundles is a third-party data provisioning service in Ghana. We facilitate the purchase of non-expiry data for MTN, Telecel, and AirtelTigo networks. We are not an official representative of these telecommunications companies.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">2. Order Processing & Delivery</h2>
			<p>
				Orders are processed only after a successful Mobile Money transfer is verified. We aim for instant delivery (under 5 minutes), but technical delays from the network provider may occasionally occur. If you do not receive your data within 30 minutes, please contact support via WhatsApp.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">3. Accuracy of Information</h2>
			<p>
				Users are responsible for providing the correct recipient phone number. Green Bundles is not liable for data sent to the wrong number due to user error. Please double-check the recipient number before confirming payment.
			</p>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold text-[var(--text-primary)]">4. Refund Policy</h2>
			<p>
				Refunds are only issued if we are unable to fulfill your order due to a system failure on our part. Refunds will not be granted for data successfully delivered to the number provided, or if the user provides an incorrect number.
			</p>
		</section>

		<section class="space-y-4 text-center py-12 border-t border-[var(--border-color)]">
			<p class="text-sm font-bold uppercase tracking-widest opacity-40">Questions?</p>
			<a href="https://wa.me/233534644088" class="mt-4 inline-block text-[var(--apple-blue)] font-bold text-xl hover:underline">Contact Support on WhatsApp</a>
		</section>
	</div>
</div>
