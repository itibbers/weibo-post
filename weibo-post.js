/**
 * weibo-post <https://github.com/itibbers/weibo-post/>
 * Released under MIT license <https://github.com/itibbers/weibo-post/LICENSE.md>
 * Copyright Ryan Ji
 */
var querystring = require('querystring');
var https = require('https');

let weiboPost = {
	cookie: '',

	/**
	 * cook: weibo login cookie.
	 * How to get your cookie,
	 * please see <https://github.com/itibbers/weibo-post/README.md>.
	 */
	setCookie(cook) {
		this.cookie = cook;
	},

	/**
	 * str: post text.
	 * Now only support *String*.
	 */
	post(str) {

		if (this.cookie === '') {
			console.log('Error: Cookie not set!');
			return;
		}

		// Build the post string from an object
		var post_data = querystring.stringify({
			'location': 'v6_content_home',
			'text': str,
			'appkey': '',
			'style_type': '1',
			'pic_id': '',
			'tid': '',
			'pdetail': '',
			'mid': '',
			'isReEdit': 'false',
			'rank': '0',
			'rankid': '',
			'module': 'stissue',
			'pub_source': 'main_',
			'pub_type': 'dialog',
			'isPri': '0',
			'_t': '0'
		});

		// An object of options to indicate where to post to
		var post_options = {
			host: 'weibo.com',
			port: '443',
			path: '/aj/mblog/add?ajwvr=6&__rnd=' + new Date().getTime(),
			method: 'POST',
			headers: {
				'Accept': '*/*',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
				'Connection': 'keep-alive',
				'Content-Length': Buffer.byteLength(post_data),
				'Content-Type': 'application/x-www-form-urlencoded',
				'Cookie': this.cookie,
				'Host': 'weibo.com',
				'Origin': 'https://weibo.com',
				'Referer': 'https://weibo.com',
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
				'X-Requested-With': 'XMLHttpRequest'
			}
		};

		// Set up the request
		var post_req = https.request(post_options, res => {
			res.setEncoding('utf8');

			console.log('Status: ' + res.statusCode);
			console.log('headers: ' + JSON.stringify(res.headers));

			switch (res.statusCode) {
				case 200:
					console.log('\nSent!');
					break;
				default:
					console.log('\nError!');
			}

			res.on('data', chunk => {
				// console.log(Buffer.isBuffer(chunk));
				// console.log(typeof chunk);
				// console.log(chunk);
			});

			res.on('end', () => {
				// console.log('\nSent!');
			});
		});

		post_req.on('error', e => {
			console.log(`Error: ${e.message}`);
		});

		// post the data
		post_req.write(post_data);
		post_req.end();

	}
};

module.exports = weiboPost;