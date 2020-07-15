import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

const Link = () => {
	const onSuccess = useCallback((token, metadata) => {
		// send token to server
		console.log(token);
	}, []);

	const config = {
		clientName: 'Your Link name',
		env: 'sandbox',
		product: [ 'auth', 'transactions' ],
		publicKey: 'c920232687f1eaf83b9790d1f0fdc5',
		onSuccess
		// ...
	};

	const { open, ready, error } = usePlaidLink(config);

	return (
		<button type="button" className="btn btn-primary" onClick={() => open()} disabled={!ready}>
			Connect a bank account
		</button>
	);
};
export default Link;
