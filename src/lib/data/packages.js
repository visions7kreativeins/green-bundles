export const networks = [
	{
		id: 'mtn',
		name: 'MTN',
		color: '#FFCC00',
		textColor: '#000000',
		logo: '/logos/mtn.png',
		packages: [
			{ size: '1GB', price: 5 },
			{ size: '2GB', price: 10 },
			{ size: '3GB', price: 15 },
			{ size: '4GB', price: 20 },
			{ size: '5GB', price: 25 },
			{ size: '6GB', price: 30 },
			{ size: '7GB', price: 35 },
			{ size: '8GB', price: 40 },
			{ size: '10GB', price: 45 },
			{ size: '15GB', price: 67 },
			{ size: '20GB', price: 86 },
			{ size: '25GB', price: 110 },
			{ size: '30GB', price: 130 },
			{ size: '40GB', price: 170 },
			{ size: '50GB', price: 200 }
		],
		instructions: [
			'Dial *170#',
			'Select 1 (Transfer Money)',
			'Select 1 (MoMo User)',
			'Enter the number: 0534644088',
			'Enter the amount',
			'Confirm the name and enter your PIN'
		]
	},
	{
		id: 'airteltigo',
		name: 'AirtelTigo',
		color: '#E01E26',
		textColor: '#000000',
		logo: '/logos/airteltigo.png',
		packages: [
			{ size: '1GB', price: 5 },
			{ size: '2GB', price: 10 },
			{ size: '3GB', price: 15 },
			{ size: '4GB', price: 20 },
			{ size: '5GB', price: 25 },
			{ size: '6GB', price: 30 },
			{ size: '7GB', price: 35 },
			{ size: '8GB', price: 40 },
			{ size: '10GB', price: 45 },
			{ size: '20GB', price: 86 },
			{ size: '25GB', price: 110 },
			{ size: '30GB', price: 130 }
		],
		instructions: [
			'Dial *110#',
			'Select 1 (Send Money)',
			'Select 2 (Other Networks)',
			'Select MTN',
			'Enter the number: 0534644088',
			'Enter the amount and confirm with your PIN'
		]
	},
	{
		id: 'telecel',
		name: 'Telecel',
		color: '#A00000',
		textColor: '#FFFFFF',
		logo: '/logos/telecel.png',
		packages: [
			{ size: '5GB', price: 24 },
			{ size: '10GB', price: 43 },
			{ size: '15GB', price: 64 },
			{ size: '20GB', price: 82 },
			{ size: '25GB', price: 100 },
			{ size: '30GB', price: 112 },
			{ size: '40GB', price: 150 },
			{ size: '50GB', price: 190 }
		],
		instructions: [
			'Dial *110#',
			'Select 1 (Send Money)',
			'Select 2 (Other Networks)',
			'Select 1 (MTN)',
			'Enter the number: 0534644088',
			'Enter the amount and confirm with your PIN'
		]
	}
];
