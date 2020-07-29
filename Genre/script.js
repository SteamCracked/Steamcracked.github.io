let youtubeURL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=' + id + '&key=' + apiKey;
console.log(youtubeURL);

const getYouTubeMedia = (data) => {
	const media = data.items;
	const fragment = document.createDocumentFragment();

	media.forEach(element => {
		const mediaClone = document.querySelector('#youtube-video').content.cloneNode(true);

		mediaClone.querySelector('.image a').href = 'https://www.youtube.com/watch?v=' + element.snippet.resourceId.videoId;
		mediaClone.querySelector('.image img').src = element.snippet.thumbnails.medium.url;
		mediaClone.querySelector('.image img').alt = element.snippet.title;
		mediaClone.querySelector('.title a').href = 'https://www.youtube.com/watch?v=' + element.snippet.resourceId.videoId;
		mediaClone.querySelector('.title a').textContent = element.snippet.title;
		mediaClone.querySelector('.channel a').href = 'https://www.youtube.com/channel/' + element.snippet.channelId;
		mediaClone.querySelector('.channel a').textContent = element.snippet.channelTitle;

		fragment.appendChild(mediaClone);
	});

	document.getElementById('youtube-media').appendChild(fragment);

	if (data.nextPageToken !== undefined) {
		youtubeURL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=' + id + '&key=' + apiKey + '&pageToken=' + data.nextPageToken;
		document.querySelector('.load-more').disabled = false;
	} else {
		document.querySelector('.load-more').parentNode.removeChild(document.querySelector('.load-more'));
	}
};

document.querySelector('.load-more').addEventListener('click', (event) => {
	event.target.disabled = true;

	getYouTubeFeed(youtubeURL);
});


const getYouTubeFeed = (youtubeURL) => {
	const validateResponse = (response) => {
		if (!response.ok) {
			throw Error(response.status, response.statusText);
		}

		return response;
	};
	const readResponseAsJSON = (response) => {
		return response.json();
	};
	const logResult = (result) => {
		console.log('And the results are in: \n', result);
	};
	const logError = (error) => {
		console.log('Looks like there was a problem: \n', error);
	};

	fetch(youtubeURL)
	.then(validateResponse)
	.then(readResponseAsJSON)
	.then(getYouTubeMedia)
	.catch(logError);
};
getYouTubeFeed(youtubeURL);







