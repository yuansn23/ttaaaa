
// --- Copy Button --- //
function copy(s) {
    const textarea = document.createElement('textarea')
    textarea.setAttribute('id', 'clip_area')
    document.querySelector('body').append(textarea)
    var clip_area = document.getElementById('clip_area')

    clip_area.innerText = s
    clip_area.select()
    document.execCommand('copy')
    clip_area.remove()
    toast('copy_success')
}

function click_copy(id) {
    trackEvent(' 資訊區-永久地址')
    var copyText = document.getElementById(id).getAttribute('value')
    copy(copyText)
}
// --- Copy Button END --- //

// --- 取得 永久地址 --- //
fetch('versions/address.txt?' + Date.now()).then((res) =>
    res.text()
).then(result => {
    const permalink = document.getElementById('permalink')
    permalink && permalink.setAttribute('value', result)
    let domain = result.split('/')
    domain = domain[2]
    document.getElementById('permalink').innerHTML = domain
})
// --- 取得 永久地址 END--- //


//輪播圖
let currentBannerIndex = 0
const initSwiper = function () {

    let swiper = new Swiper('.swiper-container', {
        autoplay: { disableOnInteraction: false, },
        delay: 3000,
        stopOnLastSlide: false,
        pagination: {
            el: '.swiper-pagination',
            renderBullet: function () {
                return `<span class="swiper-pagination-bullet"><b id="progressBar" class="progress--active"></b></span>`
            }
        },
        loop: true,
        slidesPerView: 1,
        on: {
            slideChange: function () {
                if (this.activeIndex > 3) currentBannerIndex = 0
                else currentBannerIndex = this.activeIndex - 1
            },
        }
    });
}()

// --- 抓取 version file url --- //


// --- 取得 公告 --- //
const announcementText1 = document.querySelector('#announcementText1')
const announcementText2 = document.querySelector('#announcementText2')
function prepareAnnouncement() {
    fetch('versions/announcement.txt?' + Date.now()).then((res) =>
        res.text()
    ).then((text) => {
        document.querySelector('#announcementText1').innerText = text
        document.querySelector('#announcementText2').innerText = text
        document.querySelector('#announcementText1').classList.add('announcement_text--first')
        document.querySelector('#announcementText2').classList.add('announcement_text--second')

    })
}
if (announcementText1 && announcementText2) prepareAnnouncement()
// --- 取得 公告 END--- //
// --- 抓取 version file url END --- //