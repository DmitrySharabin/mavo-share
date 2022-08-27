(function () {
	Mavo.Plugins.register("share", {});

	Mavo.Actions.Functions.share = async function (...args) {
		if (!("share" in navigator)) {
			const element = Mavo.Functions.$evt.target;
			const node = Mavo.Node.getClosest(element);
			const mavo = node.mavo;

			mavo.error("Your browser doesn't support sharing.");

			return;
		}

		let sharedData = {};
		if (args.length === 0) {
			// share() — share the current page URL and its title
			sharedData.url = Mavo.base.href;
			sharedData.title = document.title;
		}
		else {
			if (args.length === 1 && $.type(args[0]) === "string") {
				// share("text") --> share(url: "text")
				args[0] = { url: args[0] };
			}

			args = args.map(Mavo.clone); // Drop proxies
			sharedData = Object.assign({}, ...args);

			const nothingToShare = ["url", "text", "title"].every(prop => !Boolean(sharedData[prop]));
			if (nothingToShare) {
				return;
			}

			if (sharedData.url) {
				const url = new URL(sharedData.url, Mavo.base);
				sharedData.url = url.href;
			}
		}

		// Drop empty strings
		sharedData = {
			url: sharedData.url || undefined,
			text: sharedData.text || undefined,
			title: sharedData.title || undefined
		};

		try {
			await navigator.share(sharedData);
		}
		catch (error) {
			const title = `Oops! 😳 We couldn't share your data. Something went wrong: ${error.message}`;
			const message = `Data was: ${JSON.stringify(sharedData)}`;

			console.info(`%c${title}`, "color: #c04; font-weight: bold;", message);
		}
	};
})();
