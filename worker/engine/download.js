/** Multi downloader
 
 *Support*
 
 * - 4Anime Video Download
 * - 9gag Video Downloader 
 * - Akillitv Video Download
 * - BandCamp Music Downloader
 * - Douyin Video Downloader
 * - Espn Video Downloader
 * - Bitchute Video Downloader
 * - Blogger Video Downloader
 * - Break Video Downloader
 * - Facebook Video Downloader
 * - Febspot Video Downloader
 * - Flickr Video Downloader
 * - Gaana video Downloader
 * - Imdb Video Downloader
 * - Imgur Video Downloader
 * - Instagram Downloader
 * - Izlesene Video Downloader
 * - Kwai Video Downloader
 * - Likee Video Downloader
 * - Linkedin Video Downloader
 * - Liveleak Video Downloader
 * - Odnoklassniki Video Downloader
 * - Periscope Video Downloader
 * - Phutv Video Downloader
 * - Pinterest Video Downloader
 * - Reddit Video Downloader
 * - SoundCloud Music Downloader
 * - Tiktok Video Downloader
 * - Twich Clip Downloader
 * - Twitter Downloader
 * - Vimeo Video Downloader
 * - Vk Downloader
 * - Youtube Downloader
 * - YouTube Short Downloader
*/
const axios = require('axios');
const cheerio = require('cheerio');

const author = '@rifza.p.p';

async function Download(url) {
	try {
		const response = await axios.get(Buffer.from('aHR0cHM6Ly9kb3dudmlkZW8xLnF1b3JhLXdpa2kuY29tLyN1cmw9', "base64").toString("ascii") + url);// <-------reference url from hikki-me-------> (thnks)
		const $ = cheerio.load(response.data);
		const token = $('#token').attr('value');

		const params = new URLSearchParams();
		params.append('url', url);
		params.append('token', token);

		const { data } = await axios.post('https://downvideo1.quora-wiki.com/system/action.php', params, {
			headers: {
				'cookie': '__gads=ID=9a603a5ef9e5c31c-222500abbdd80019:T=1670050702:RT=1670050702:S=ALNI_Mbjg_1APyqqZ2duBpl-HWl050fWaA; fpestid=zZyW6-AOWN7D_0MPMLqRvrnw4HyQeagQh-V1ySQDnE2AZrbxjN6ZN1-xgrD7AbZFIoi0bA; __gpi=UID=00000b88a8a005bc:T=1670050702:RT=1670325544:S=ALNI_MbnD0KpRAaInl_NnnJynw1dOR2GKw; PHPSESSID=6kjuehav3415bifdol9anrke6g',
				'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'user-agent': 'Mozilla/5.0 (Linux; Android 7.1.1; CPH1801) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36',
				'referer': 'https://downvideo.quora-wiki.com/',
			},
		});

		const output = {
			status: 200,
			author: author,
			title: data.title,
			thumbnail: 'https:' + data.thumbnail,
			duration: data.duration,
			mp4: [],
			_3gp: [],
			webm: [],
			m4a: [],
			mp3: [],
			jpg: [],
			jpeg: [],
			png: [],
			webp: [],
		};

		for (const media of data.medias) {
			switch (media.extension) {
				case 'mp4':
					output.mp4.push(media);
					break;
				case '3gp':
					output._3gp.push(media);
					break;
				case 'webm':
					output.webm.push(media);
					break;
				case 'm4a':
					output.m4a.push(media);
					break;
				case 'mp3':
					output.mp3.push(media);
					break;
				case 'jpg':
					output.jpg.push(media);
					break;
				case 'jpeg':
					output.jpeg.push(media);
					break;
				case 'png':
					output.png.push(media);
					break;
				case 'webp':
					output.webp.push(media);
					break;
			}
		}

		output.mp4.sort((a, b) => {
			const qualityA = parseInt(a.quality);
			const qualityB = parseInt(b.quality);
			return qualityB - qualityA;
		});

		output.mp4.sort((a, b) => {
			if (a.audioAvailable && !b.audioAvailable) {
				return -1;
			} else if (!a.audioAvailable && b.audioAvailable) {
				return 1;
			}
			return 0;
		});

		return output;
	} catch (error) {
		return error;
	}
}

module.exports = { Download };