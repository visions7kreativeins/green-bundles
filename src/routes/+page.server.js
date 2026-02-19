import { 
	EMAILJS_SERVICE_ID, 
	EMAILJS_TEMPLATE_ID, 
	EMAILJS_PUBLIC_KEY, 
	EMAILJS_PRIVATE_KEY 
} from '$env/static/private';

export const actions = {
	notifyOrder: async ({ request }) => {
		const data = await request.formData();
		const phoneNumber = data.get('phoneNumber');
		const packageSize = data.get('packageSize');
		const packagePrice = data.get('packagePrice');
		const network = data.get('network');
		const timestamp = new Date().toLocaleString();

		console.log(`--- NEW ORDER [${timestamp}] ---`);
		console.log(`Recipient: ${phoneNumber}`);
		console.log(`Package: ${packageSize} (${network})`);
		console.log(`Price: GH₵ ${packagePrice}`);
		console.log('------------------------------');

		if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY && EMAILJS_PRIVATE_KEY) {
			try {
				const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						service_id: EMAILJS_SERVICE_ID,
						template_id: EMAILJS_TEMPLATE_ID,
						user_id: EMAILJS_PUBLIC_KEY,
						accessToken: EMAILJS_PRIVATE_KEY,
						template_params: {
							subject: `New Green Bundles Order: ${packageSize} (${network})`,
							phoneNumber: phoneNumber,
							packageSize: packageSize,
							network: network,
							packagePrice: `GH₵ ${packagePrice}`,
							timestamp: timestamp
						}
					})
				});

				if (response.ok) {
					console.log('✅ Order notification sent via EmailJS');
				} else {
					const errorText = await response.text();
					console.error('❌ EmailJS Error:', errorText);
					return { success: false, error: 'Service Unavailable' };
				}
			} catch (error) {
				console.error('❌ Connection Error while notifying EmailJS:', error);
				return { success: false, error: 'Connection Error' };
			}
		} else {
			console.log('⚠️ EmailJS not fully configured. Skipping notification.');
		}

		return { success: true };
	}
};
