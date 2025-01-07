// --- MKT --- //
var OpenInstall = function (product_key, api_url, platform, channel_code) {
  this.product_key = product_key;
  this.api_url = api_url;
  this.platform = platform;
  this.channel_code = channel_code;
  this.exposuere_api_url = this.api_url + "exposure_logs/" + this.product_key + "/" + this.channel_code;
  this.click_api_url = this.api_url + "click_logs/" + this.product_key + "/" + this.channel_code;
  this.get_download_api_url = this.api_url + "get_download_url";
  this.count = 0;
  this.maxtrise = 3;
}

OpenInstall.prototype.exposuere = function () {
  var formData = new FormData();
  formData.append("platform", this.platform);
  return this.do_post(formData, this.exposuere_api_url);
};

OpenInstall.prototype.click = function () {
  try {
    var formData = new FormData();
    formData.append("platform", this.platform);
    $message = this.do_post(formData, this.click_api_url);
    formData = new FormData();
    formData.append("product_key", this.product_key);
    formData.append("channel_code", this.channel_code);
    $message = this.do_post(formData, this.get_download_api_url);
    if (JSON.parse($message).success_code != 200) {
      throw "error"
    }
    return JSON.parse($message).message;
  } catch {
    return null;
  }
};

OpenInstall.prototype.install = function (url) {
  document.location.href = url;
};

OpenInstall.prototype.do_post = function (formData, url) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("post", url, false);
    xhr.send(formData);
    if (xhr.status == '200') {
      return xhr.responseText;
    } else {
      if (this.count === this.maxtrise) {
        return 'error_code : ' + xhr.status;
      } else {
        this.count++;
        return this.do_post(formData, url);
      }
    }
  } catch {
    console.log('openInstall request failed :', url)
    return null;
  }
};


var product_key = 'planet';
var api_url = 'https://service-4mfkkhye-1304244842.gz.apigw.tencentcs.com/api/';
var platform = ''
if (navigator.userAgent.indexOf('Android') != -1) {
  platform = 'android'
} else if (navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPad') != -1) {
  platform = 'ios'
} else if (navigator.userAgent.indexOf('Macintosh') != -1) {
  platform = 'macintosh'
} else if (navigator.userAgent.indexOf('Windows') != -1) {
  platform = 'windows'
}
if (window.location.search.indexOf('channel=') != -1) {
  var channel_code = window.location.search.slice(window.location.search.indexOf('channel=') + 8);
  if (channel_code.indexOf('&') != -1) {
    channel_code = channel_code.slice(0, channel_code.indexOf('&'));
  }
  var test = new OpenInstall(product_key, api_url, platform, channel_code);
  test.exposuere();
}
// --- MKT end --- //