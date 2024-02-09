import { replaceHashtags } from "./util";

const postTextSelector =
	'[data-testid="postText"]:not([data-bluesky-hashtag-linker="true"]), [data-testid^="postThreadItem"]:not([data-bluesky-hashtag-linker="true"]) > :last-child > :first-child > :first-child > :first-child';

const linkHashtags = (element: HTMLElement) => {
	const postTextElements =
		element.querySelectorAll<HTMLDivElement>(postTextSelector);

	for (const postTextElement of Array.from(postTextElements)) {
		postTextElement.dataset.bskyHashtagLinker = "true";

		const text = postTextElement.innerHTML;
		const replaced = replaceHashtags(text);

		postTextElement.innerHTML = replaced;

		const anchors = Array.from(postTextElement.querySelectorAll("a")); // Convert NodeListOf<HTMLAnchorElement> to an array

		for (const anchor of anchors) {
			anchor.classList.add("bsky-hashtag-linker__hashtag");
			anchor.addEventListener("click", (event) => {
				event.preventDefault();
				event.stopPropagation();
				window.open(anchor.href, anchor.target || "_self");
			});
		}
	}
};

const onPostListMutate: MutationCallback = (mutations) => {
	for (const mutation of mutations) {
		if (mutation.type === "childList") {
			for (const node of Array.from(mutation.addedNodes)) {
				if (node instanceof HTMLElement) {
					linkHashtags(node);
				}
			}
		}
	}
};

const observer = new MutationObserver(onPostListMutate);

const config: MutationObserverInit = {
	childList: true,
	subtree: true,
};

observer.observe(document.documentElement, config);
