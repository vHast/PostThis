// Page through all 2021 gravel bikes, 100 bikes at a time

const pageUrl = new URL('https://api.99spokes.com/v1/bikes');
pageUrl.searchParams.set('year', 2021);
pageUrl.searchParams.set('subcategory', 'gravel');
pageUrl.searchParams.set('limit', 100);
pageUrl.searchParams.set('include', '*');

let cursor = 'start';

while (cursor) {
	pageUrl.searchParams.set('cursor', cursor);

	const response = await fetch(pageUrl.href, {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
		},
	});

	if (!response.ok) {
		throw new Error(`Error ${response.status}`);
	}

	const page = await response.json();

	// updating the paging cursor
	cursor = page.nextCursor;

	for (const bike of page.items) {
		console.log(bike.id);
	}
}
				