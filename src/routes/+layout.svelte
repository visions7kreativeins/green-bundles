<script>
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
	<nav class="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/70 backdrop-blur-md">
		<div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
			<a href="/" class="text-lg sm:text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">Green Bundles</a>
			<div class="hidden space-x-10 text-sm font-medium opacity-60 md:flex">
				<a href="#mtn" class="hover:opacity-100 transition-opacity">MTN</a>
				<a href="#airteltigo" class="hover:opacity-100 transition-opacity">AirtelTigo</a>
				<a href="#telecel" class="hover:opacity-100 transition-opacity">Telecel</a>
			</div>
			<div class="flex items-center space-x-2 sm:space-x-4">
				<div class="hidden md:block">
					<span class="text-xs font-semibold uppercase tracking-wider opacity-40">Support: 0544488152</span>
				</div>
				<a href="https://wa.me/233544488152" class="apple-button !px-3 !py-1.5 text-[10px] sm:!px-4 sm:text-xs">Order Now</a>
			</div>
		</div>
	</nav>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] py-10 md:py-16">
		<div class="mx-auto max-w-5xl px-6">
			<div class="grid grid-cols-1 gap-8 md:gap-12 md:grid-cols-3">
				<div class="space-y-4">
					<h3 class="text-sm font-bold uppercase tracking-widest opacity-30">Green Bundles</h3>
					<p class="text-sm leading-relaxed opacity-60">Your non-expiry data plug in Ghana. Affordable, fast, and reliable bundle top-ups for all major networks.</p>
				</div>
				<div class="space-y-4">
					<h3 class="text-sm font-bold uppercase tracking-widest opacity-30">Networks</h3>
					<ul class="space-y-2 text-sm opacity-60">
						<li><a href="#mtn" class="hover:text-[var(--apple-blue)] transition-colors">MTN Ghana</a></li>
						<li><a href="#airteltigo" class="hover:text-[var(--apple-blue)] transition-colors">AirtelTigo (AT)</a></li>
						<li><a href="#telecel" class="hover:text-[var(--apple-blue)] transition-colors">Telecel Ghana</a></li>
					</ul>
				</div>
				<div class="space-y-4">
					<h3 class="text-sm font-bold uppercase tracking-widest opacity-30">Contact</h3>
					<div class="space-y-1 text-sm opacity-60">
						<p>WhatsApp: <span class="font-medium text-[var(--text-primary)]">0544488152</span></p>
						<p>Email: <span class="font-medium text-[var(--text-primary)]">orders@greenbundles.com</span></p>
					</div>
				</div>
			</div>
			<div class="mt-16 border-t border-[var(--border-color)] pt-8 text-center">
				<p class="text-[11px] font-medium uppercase tracking-[0.2em] opacity-30">
					&copy; 2026 Green Bundles. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
</div>
