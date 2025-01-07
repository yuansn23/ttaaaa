
//安裝教學手機品牌選單
const phoneBrands = [
    { name: '通用', img: 'general' },
    { name: '华为鸿蒙', img: 'huawei_harmony' },
    { name: '华为', img: 'huawei' },
    { name: '小米', img: 'mi' },
    { name: 'VIVO', img: 'vivo' },
    { name: 'OPPO', img: 'oppo' },
    { name: 'OnePlus', img: 'one_plus' },
    { name: '腾讯手机管家设置', img: 'tencent' },
]
const brandSelectListDom = document.querySelector('.brand_select_list')
const brandSelectorDom = document.querySelector('.brand_selector')
const brandSelectedDom = document.querySelector('.brand_selector--selected')
// 生成安裝教學選單列表
let currentSelectedBrand = '通用'
phoneBrands.map((brand, index) => {
    let li = document.createElement('li')
    li.textContent = brand.name
    li.classList.add('brand_select_item')
    li.classList.add('btn')
    li.setAttribute('id', `brandName-${index}`)
    li.addEventListener('click', (e) => {
        currentSelectedBrand = e.target.textContent
        e.stopPropagation()
        toggleBrandList(currentSelectedBrand)
        generateInstallTutorialContent(phoneBrands[index].img)
        handleFooterMargin(phoneBrands[index].imgName)
        //   const teachDevice = phoneBrands[index].name.
        trackEvent('安裝教學頁', `Android手機-${phoneBrands[index].name}`)
    })
    brandSelectListDom.append(li)
})
// 開啟/關閉安裝教學選單
const toggleBrandList = (brandSelectorText) => {
    console.log(brandSelectorText)
    const isShowList = brandSelectListDom.style.display === 'block'

    if (isShowList) {
        brandSelectedDom.innerHTML = `<p class="brand_selector_txt brand_selector_txt--default">${brandSelectorText}</p>`
        brandSelectorDom.style.height = ''
        brandSelectListDom.style.display = 'none'
        generateImage(brandSelectedDom, './static/icon/arrow_down.svg')
    } else {
        brandSelectedDom.innerHTML = '<p class="brand_selector_txt brand_selector_txt--active">请选择您的手机品牌</p>'
        brandSelectorDom.style.height = 'auto'
        brandSelectListDom.style.display = 'block'
        generateImage(brandSelectedDom, './static/icon/arrow_up.svg')
    }

}

const generateImage = (dom, imgUrl) => {
    const img = document.createElement('img')
    img.setAttribute('src', imgUrl)
    dom.append(img)
}

const generateInstallTutorialContent = function (imgName = 'general') {
    const installTutorialContent = document.querySelector('.install_tutorial_content')
    let html = ''

    html += `<img src="./static/images/${imgName}.webp" alt="">`

    installTutorialContent.innerHTML = html
}
generateInstallTutorialContent(imgName = phoneBrands[0].imgName)
function click_tab(tab_nav_id, tab_id) {
    document.querySelectorAll('#tabs-nav div').forEach(item => {
        item.classList.remove('active')
    })
    document.querySelector('#' + tab_nav_id).classList.add('active')
    document.querySelectorAll('.tabs-panel').forEach(item => {
        item.style.display = 'none'
    })
    document.querySelector('#' + tab_id).style.display = 'block'
}

const footerDom = document.querySelector('footer')
const handleFooterMargin = (name) => {
    if (name === 'oppo' || name === 'one_plus' || name === 'vivo')
        footerDom.style.marginTop = '32vw'
    else
        footerDom.style.marginTop = ''

}

//切換安裝教學 ios /android
let ipaNavItems = []
const toggleIpaNav = index => {
    items = document.querySelectorAll('.ipa__nav .nav__item')

    if (!items.length) return

    items[index].setAttribute('aria-current', 'true')
    items[index === 0 ? 1 : 0].setAttribute('aria-current', 'false')

    document.querySelector('.ipa__content').style.transform = `translateX(${index * -100}%)`
    const ipaHelp = document.querySelector('.ipa__help')
    const ipaTeach = document.querySelector('.ipa__teach')
    ipaHelp.classList.remove('disable')
    ipaTeach.classList.remove('disable')
    index === 0 ? document.querySelector('.ipa__help').classList.add('disable') : document.querySelector('.ipa__teach').classList.add('disable')
}
// 目前為展開狀態的 index
let indexOfExpandedAnswer = null
// 切換展開的答案區塊
const toggleAnswer = (index, target) => {

    if (index === indexOfExpandedAnswer) {
        indexOfExpandedAnswer = null
        return document.querySelectorAll('.help__answer')[index].setAttribute('aria-expanded', 'false')
    }

    indexOfExpandedAnswer !== null &&
        document.querySelectorAll('.help__answer')[indexOfExpandedAnswer].setAttribute(
            'aria-expanded',
            'false'
        )
    document.querySelectorAll('.help__answer')[index].setAttribute('aria-expanded', 'true')

    indexOfExpandedAnswer = index
}

const downloadIpa = (target) => {
    if (!iosUrl.length) return toast('stop_download')

    trackEvent('下載-iOS(IPA)')
    downloadUrl(iosUrl[randomRange(0, iosUrl.length - 1)])
}
// window ready
window.onload = () => {
    click_tab(`tabs-nav_${isAndroid || isPC ? '1' : '2'}`, `tab_${isAndroid || isPC ? '1' : '2'}`)
    if (isPC) return
    trackEvent('安裝教學頁', isAndroid ? 'menu-安卓版' : 'menu-iOS 個人簽')
}
