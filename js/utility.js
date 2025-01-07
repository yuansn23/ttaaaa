
// 安卓下载地址
const androidUrlAnnie = "https://xz.cbit.cc/xqq"

//使用者作業系統
const userAgent = navigator.userAgent || navigator.vendor || window.opera
const isAndroid = /android|xiaomi|arkweb/i.test(userAgent) ? true : false
const isiOS =
    /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream ? true : false
const isPC = isAndroid || isiOS ? false : true
const isI4 = window.location.href.includes('i4')
if (isPC && !isI4) {//愛思助手不載入
    const script = document.createElement('script')
    script.async = false
    script.src = 'js/pc.js'
    document.body.appendChild(script)
}
//GA4
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-420268PXPQ');

function trackEvent(event, cate, label, value) {
    gtag('event', event, {
        'event_category': cate,
        'event_label': label,
        'value': value
    });
}

// --- 吐司提示視窗 function --- //
function toast(toastID, status = '', device = '') {
    if (status && device) {
        trackEvent(status, device)
    }

    document.getElementById(toastID).classList.remove('d-none')
    setTimeout(function () {
        document.getElementById(toastID).classList.add('d-none')
    }, 3000)
}
// --- 吐司提示視窗 function END --- //

// --- 隨機 function --- //
function randomRange(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min
}
// --- 隨機 function END --- //

// --- 下載 function --- //
function downloadUrl(dwnURL) {
    ; ((i = document.createElement('a')).href = dwnURL), i.click()
}


// --- 下載 function END --- //

// --- 測試是否為 微信/QQ 瀏覽器 --- //
function is_weixin_qq() {
    var ua = navigator.userAgent.toLowerCase() //toLowerCase()转换为小写
    if (
        ua.match(/MicroMessenger/i) == 'micromessenger' ||
        ua.match(/QQ/i) == 'qq'
    ) {
        return true
    } else {
        return false
    }
}
// --- 測試是否為 微信/QQ 瀏覽器 END --- //

if (is_weixin_qq()) {
    let ua2 = navigator.userAgent.toLowerCase() //toLowerCase()转换为小写
    if (ua2.match(/MicroMessenger/i) == 'micromessenger') {
        trackEvent('瀏覽器-Wechat')
    }
    if (ua2.match(/QQ/i) == 'qq') {
        trackEvent('瀏覽器-QQ')
    }

}

// --- 懸浮球下載 --- //
function jumpInstall() {
    if (window.location.href.includes('install.html'))
        click_tab(`tabs-nav_2`, `tab_2`)
    else window.open('./install.html')
}


function androidDownload() {
    ; ((i = document.createElement('a')).href = androidUrlAnnie), i.click()
    toast('download_success')
    trackEvent('下載-安卓懸浮球')
}

// --- 懸浮球下載 --- //
function floatBallDownload() {
    //if (isPC) return openQrcodePop()
    button_android_dwl(1, '下載-安卓懸浮球')
    isAndroid ? button_android_dwl(1, '下載-安卓懸浮球') : openIpaPop('下載-iOS懸浮球')
}
// --- 懸浮球下載 --- //

// ipa 下載相關 function

const openIpaPop = (gaEvent) => {
    if (isAndroid) return toast('device_error', '無法下載吐司', 'android')

    trackEvent(gaEvent)

    if (window.location.href.includes('install.html'))
        click_tab(`tabs-nav_2`, `tab_2`)
    else window.open('./install.html')
}

//信箱

function sendMail() {
    window.location.href =
        'mailto:xq.service@protonmail.com'

    trackEvent('資訊區-官方郵箱')
}


/* Android 下載 */
function button_android_dwl(k, site) {
    // if (isPC) return openQrcodePop()

    if (!isAndroid) {
        toast('device_error', '無法下載吐司', 'ios')
        return false
    }

    if (typeof androidUrlAnnie !== 'string' || androidUrlAnnie == '') {
        toast('stop_download')
        return false
    }

    if (is_weixin_qq()) {
        //如果是微信或qq空間把圖片顯示
        document.querySelector('#jsremindPop').style.display = 'block'
        let ua2 = navigator.userAgent.toLowerCase() //toLowerCase()转换为小写
        if (ua2.match(/MicroMessenger/i) == 'micromessenger') {
            trackEvent('安卓瀏覽器阻擋POP窗', '微信下載', 'click')
        }
        if (ua2.match(/QQ/i) == 'qq') {
            trackEvent('安卓瀏覽器阻擋POP窗', 'QQ下載', 'click')
        }
        return
    }

    if (window.location.search.indexOf('channel=') != -1) {
        let urlLink = test.click()
        if (!urlLink) {  //避免mkt網址錯誤
            urlLink = androidUrlAnnie
        }
        test.install(urlLink)
            ; ((i = document.createElement('a')).href = urlLink), i.click()
        trackEvent(site)
        toast('download_success')
        return
    }

    ; ((i = document.createElement('a')).href = androidUrlAnnie), i.click()
    toast('download_success')
    trackEvent(site)
}

let androidUrl = []
let iosUrl = []

// --- 抓取 version file url --- //

fetch('versions/and.txt?' + Date.now()).then((res) =>
    res.text()
).then((url) => {

    let url_arr = url.split('\n')
    url_arr.forEach(item => {
        androidUrl.push(item.trim())
    })

    const mainQrcodeOptions = {
        text: androidUrl[0],
        crossOrigin: 'anonymous',
        colorLight: '#fff5a8',
        colorDark: '#ff5d00'
    }
    const subQrcodeOptions = {
        text: androidUrl[1],
        crossOrigin: 'anonymous',
        colorLight: '#ffe1ed',
        colorDark: '#a8005f'
    }
    console.log(mainQrcodeOptions, subQrcodeOptions)
    new QRCode(document.getElementById('mainQrcode'), mainQrcodeOptions)
    new QRCode(document.getElementById('subQrcode'), subQrcodeOptions)


}).catch(function () {
    // toast('tooltip-refresh')
})

fetch('versions/ios.txt?' + Date.now()).then((res) =>
    res.text()
).then((url) => {
    let url_arr = url.split('\n')
    url_arr.forEach(item => {
        iosUrl.push(item.trim())
    })
    iosUrl = iosUrl.filter(url => url.length)
}).catch(function () {
    // toast('tooltip-refresh')
})
// --- 抓取 version file url END --- //