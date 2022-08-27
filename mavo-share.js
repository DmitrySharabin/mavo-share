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
			sharedData = Object.assign({}, ...args.map(Mavo.value));
		}

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
