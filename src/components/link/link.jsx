import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { prodUrl, devUrl } from '../urls';

const Link = () => {
	const onSuccess = useCallback((token, metadata) => {
		// send token to server
		fetch(devUrl + '/users/plaidverify', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ PUBLIC_TOKEN: token, ACCOUNT_ID: metadata.account_id })
		})
			.then((response) => {
				if (response.status === 200) {
					alert('Account successfully linked');
				} else {
					alert('Error in linking account');
				}
			})
			.catch((err) => {
				alert('Error in linking account');
				console.log(err);
			});

		console.log('Public Token: ' + token);
		console.log('Customer-selected account ID: ' + metadata.account_id);
	}, []);

	const config = {
		clientName: 'Your Link name',
		env: 'sandbox',
		product: [ 'auth' ],
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
