(function () {
	Mavo.Plugins.register("share", {});

	Mavo.Actions.Functions.share = async function (text, url, title) {
		if (!("share" in navigator)) {
			// Why Mavo.all[0]? error() is an instance method, so we need an app to invoke it.
			Mavo.all[0].error("Your browser doesn't support sharing.");
			return;
		}

		[text, url, title] = [text, url, title].map(Mavo.value);

		if (!text && !url) {
			// Nothing to share
			return;
		}

		if (!text) {
			[text, url] = [url];
		}

		// What if text is a string representation of a URL?
		// If we have share(url1, url2[, title]), url1 wins
		try {
			const tempURL = new URL(text);

			if (url) {
				if (title) {
					// Case: share(url, text, title)
					text = url;
				} else {
					// Case: share(url, title)
					[title, text] = [url];
				}
			} else {
				// Case: share(url)
				text = undefined;
			}

			url = tempURL.href;
		} catch {}

		if (url) {
			try {
				url = new URL(url);

				// Case: share(text, url[, title])
				url = url.href;
			} catch {
				// Case: share(text, title)
				[title, url] = [url];
			}
		}

		const data = {
			text,
			url: url || undefined, // Exclude url === ""
			title: title || undefined // Exclude title === ""
		};

		try {
			await navigator.share(data);
		} catch (error) {
			const title = `Oops! 😳 We couldn't share your data. Something went wrong: ${error.message}`;
			const message = `Data was: ${JSON.stringify(data)}`;

			console.info(`%c${title}`, "color: #c04; font-weight: bold;", message);
		}
	};
})();
