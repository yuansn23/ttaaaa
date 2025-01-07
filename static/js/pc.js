// 懸浮球位置
const homePage = document.querySelector('#home_page')
const floatBall = document.querySelector('#floatBall')

let floatBallMarginLeft = (document.documentElement.scrollWidth - homePage.clientWidth) / 2 - 3
floatBall.style.right = floatBallMarginLeft + 'px'

window.onresize = debounce(() => {
    let floatBallMarginLeft = (document.documentElement.scrollWidth - homePage.clientWidth) / 2 - 3
    floatBall.style.right = floatBallMarginLeft + 'px'
})

function debounce(cb, wait = 50) {
    let h = 0
    let callable = (...args) => {
        clearTimeout(h)
        h = setTimeout(() => cb(...args), wait)
    }
    return callable
}
//切換QRcode pop窗
const openQrcodePop = () => {
    document.getElementById('pop_qrcode').classList.remove('d-none')
    trackEvent('下載-PC QRcode')
}

const closeQrcodePop = () => {
    document.getElementById('pop_qrcode').classList.add('d-none')
}