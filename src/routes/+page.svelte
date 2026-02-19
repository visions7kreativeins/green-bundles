<script>
	import { networks } from '$lib/data/packages.js';
	import PackageCard from '$lib/components/PackageCard.svelte';
	import OrderModal from '$lib/components/OrderModal.svelte';
	import { fade, fly } from 'svelte/transition';

	let selectedPackage = $state(null);
	let isModalOpen = $state(false);

	let isLoading = $state(true);

	$effect(() => {
		const timer = setTimeout(() => {
			isLoading = false;
		}, 800);
		return () => clearTimeout(timer);
	});

	let activeNetwork = $state(networks[0].id);

	function handlePackageSelect(pkg) {
		selectedPackage = pkg;
		isModalOpen = true;
	}

	function closeModal() {
		isModalOpen = false;
	}
</script>

<svelte:head>
	<title>Green Bundles | Ghana's Fast Data Plug</title>
	<meta name="description" content="Get affordable high-speed non-expiry data bundles for MTN, Telecel, and AirtelTigo in Ghana. Fast delivery and reliable service." />
</svelte:head>

<!-- Premium Loader -->
{#if isLoading}
	<div 
		out:fade={{ duration: 400 }}
		class="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]"
	>
		<div class="flex flex-col items-center gap-4">
			<div class="h-10 w-10 animate-spin rounded-full border-2 border-[var(--apple-blue)] border-t-transparent"></div>
			<span class="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Connecting</span>
		</div>
	</div>
{/if}

<!-- Hero Section -->
<section class="relative overflow-hidden py-32 md:py-48">
	<div class="mx-auto max-w-5xl px-6">
		<div class="max-w-2xl">
			<h1 
				in:fly={{ y: 20, duration: 800, delay: 200 }}
				class="text-6xl font-extrabold tracking-tight text-[var(--text-primary)] md:text-8xl"
			>
				The data you <br>
				<span class="text-[var(--apple-blue)]">deserve.</span>
			</h1>
			<p 
				in:fly={{ y: 20, duration: 800, delay: 400 }}
				class="mt-8 text-xl font-medium text-[var(--text-secondary)] md:text-2xl leading-relaxed"
			>
				Green Bundles provides the fastest, most reliable non-expiry data in Ghana. Premium experience, affordable prices.
			</p>
			<div 
				in:fly={{ y: 20, duration: 800, delay: 600 }}
				class="mt-12 flex flex-wrap gap-5"
			>
				<button 
					onclick={() => {
						const el = document.getElementById('shop');
						el?.scrollIntoView({ behavior: 'smooth' });
					}}
					class="apple-button h-14 flex items-center justify-center px-10 text-lg shadow-lg shadow-[var(--apple-blue)]/20"
				>
					Shop Bundles
				</button>
				<button 
					onclick={() => handlePackageSelect({ size: 'DEBUG', price: 0, network: networks[0] })}
					class="rounded-full bg-[var(--bg-secondary)] h-14 flex items-center justify-center px-10 text-lg font-medium hover:bg-[var(--border-color)] transition-all"
				>
					Learn More
				</button>
			</div>
		</div>
	</div>
	
	<!-- Premium background effects -->
	<div class="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-[var(--apple-blue)] opacity-[0.03] blur-[120px]"></div>
	<div class="absolute -left-64 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500 opacity-[0.02] blur-[100px]"></div>
</section>

<!-- Network Selection Header -->
<section id="shop" class="sticky top-14 z-40 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 py-4 backdrop-blur-md transition-colors duration-300">
	<div class="mx-auto max-w-5xl px-6">
		<div class="flex items-center justify-center space-x-2 rounded-2xl bg-[var(--bg-secondary)] p-1.5 md:inline-flex">
			{#each networks as network}
				<button
					onclick={() => activeNetwork = network.id}
					class="flex items-center space-x-2 rounded-xl px-6 py-2.5 text-sm font-bold transition-all duration-300 {activeNetwork === network.id ? 'bg-[var(--card-bg)] text-[var(--apple-blue)] shadow-sm' : 'opacity-40 hover:opacity-100'}"
				>
					<div class="h-2 w-2 rounded-full" style="background-color: {network.color}"></div>
					<span>{network.name}</span>
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Active Network Section -->
{#each networks as network (network.id)}
	{#if activeNetwork === network.id}
		<section class="py-24" in:fade={{ duration: 400 }}>
			<div class="mx-auto max-w-5xl px-6">
				<div class="mb-12">
					<h2 class="text-4xl font-black tracking-tight">{network.name}</h2>
					<p class="mt-2 text-lg font-medium opacity-40">Choose your non-expiry data package</p>
				</div>

				<div class="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
					{#each network.packages as pkg}
						<PackageCard 
							{...pkg} 
							{network} 
							onSelect={handlePackageSelect} 
						/>
					{/each}
				</div>
			</div>
		</section>
	{/if}
{/each}

<!-- Why Us Section -->
<section class="bg-[var(--bg-secondary)] py-32 transition-colors duration-300">
	<div class="mx-auto max-w-5xl px-6">
		<div class="grid grid-cols-1 gap-16 md:grid-cols-3 text-center">
			<div class="space-y-6" in:fade={{ delay: 200 }}>
				<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[var(--card-bg)] text-3xl shadow-sm border border-[var(--border-color)]">🚀</div>
				<h3 class="text-2xl font-bold tracking-tight">Instant Delivery</h3>
				<p class="text-sm opacity-50 leading-loose">Data is processed and delivered to your number immediately after verification.</p>
			</div>
			<div class="space-y-6" in:fade={{ delay: 400 }}>
				<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[var(--card-bg)] text-3xl shadow-sm border border-[var(--border-color)]">💎</div>
				<h3 class="text-2xl font-bold tracking-tight">Lowest Rates</h3>
				<p class="text-sm opacity-50 leading-loose">We offer the most competitive data prices in Ghana, ensuring value for every Cedi.</p>
			</div>
			<div class="space-y-6" in:fade={{ delay: 600 }}>
				<div class="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[var(--card-bg)] text-3xl shadow-sm border border-[var(--border-color)]">🛡️</div>
				<h3 class="text-2xl font-bold tracking-tight">Secure Pay</h3>
				<p class="text-sm opacity-50 leading-loose">Pay via Mobile Money refenced to your phone number for 100% safe transactions.</p>
			</div>
		</div>
	</div>
</section>

<!-- Footer -->
<footer class="border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-24 transition-colors duration-300">
	<div class="mx-auto max-w-5xl px-6">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
			<div class="col-span-1 md:col-span-2 space-y-6">
				<div class="flex items-center gap-3">
					<div class="h-8 w-8 rounded-xl bg-[var(--apple-blue)] flex items-center justify-center text-white font-black text-xs">GB</div>
					<span class="text-xl font-black tracking-tighter">Green Bundles</span>
				</div>
				<p class="max-w-xs text-sm font-medium opacity-40 leading-relaxed">
					Ghana's premium third-party non-expiry data plug. Fast, reliable, and affordable.
				</p>
			</div>
			
			<div class="space-y-6">
				<h4 class="text-xs font-bold uppercase tracking-[0.2em] opacity-30">Platform</h4>
				<ul class="space-y-4 text-sm font-semibold">
					<li><a href="#shop" class="hover:text-[var(--apple-blue)] transition-colors">Buy Bundles</a></li>
					<li><a href="https://wa.me/233534644088" class="hover:text-[var(--apple-blue)] transition-colors">Support</a></li>
				</ul>
			</div>

			<div class="space-y-6">
				<h4 class="text-xs font-bold uppercase tracking-[0.2em] opacity-30">Legal</h4>
				<ul class="space-y-4 text-sm font-semibold">
					<li><a href="/terms" class="hover:text-[var(--apple-blue)] transition-colors">Terms of Service</a></li>
					<li><a href="/privacy" class="hover:text-[var(--apple-blue)] transition-colors">Privacy Policy</a></li>
				</ul>
			</div>
		</div>

		<div class="mt-24 pt-12 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center gap-6">
			<p class="text-xs font-medium opacity-30">
				© 2026 Green Bundles. Not affiliated with MTN, Telecel, or AirtelTigo.
			</p>
			<div class="flex gap-8">
				<span class="text-[10px] font-bold uppercase tracking-widest opacity-20">Made in Ghana 🇬🇭</span>
			</div>
		</div>
	</div>
</footer>

<OrderModal 
	isOpen={isModalOpen} 
	{selectedPackage} 
	onClose={closeModal} 
/>
