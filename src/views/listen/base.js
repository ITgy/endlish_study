import { ref } from 'vue';

const LINE_HEIGHT = 40; //文章每一行的高度

// 字幕滚动模式一：自动计算当前高亮行是否超出显示区域，如果超出了移动字幕保证高亮在字幕内
export function processScrollEnd() {

}
// 字幕滚动模式二：自动计算当前高亮行是否超过显示区域的中点(“中”心的“中”)，如果超出了移动字幕保证高亮在字幕内
/**
 * 通过滚动容器的高度，计算滚动容器内部滚动列表距离滚动容器顶部的初始距离
 * @param {Number} wrapHeight 滚动容器的高度
 */
export function computeScrollInnerInitTop(wrapHeight) {
    let result = (wrapHeight - LINE_HEIGHT) / 2;
    return `${result}px`
}
/**
 * 初始化数据
 * @param {Object} data 原始数据对象 
 */
export function initData(data) {
    const article = data.article.dataSource

    let obj = article.map((item, index) => {
        const temp = {
            ...item,
            light: false,
            loop: false,
            show: false,
            voice: false
        }
        if (index === 0) {
            temp.light = true;
        }
        return ref(temp);
    })
    return obj;
}

/**
 * 根据当前时间计算文章滚动位置
 * @param {*} time 
 */
export function locationArticle(normalizeData = [], time = 0) {
    const curInd = normalizeData.findIndex(item => {
        return time >= item.value.start && time < item.value.end
    })

    if (curInd !== -1) {
        updateLightStatus(normalizeData, curInd)
        return LINE_HEIGHT * curInd;
    } else {
        return curInd;
    }
}

/**
 * 更新当前高亮行
 * @param {Number} curInx 当前行下标 
 */
function updateLightStatus(normalizeData = [], curInd = 0) {
    normalizeData.forEach((item, index) => {
        if (index === curInd) {
            item.value.light = true;
        } else {
            item.value.light = false;
        }
    })
}

/**
 * 控制页面文章显示效果
 */
export function controlArticleShow(normalizeData, translateStyle, time = 0, recordTouchEndTop) {
    const transY = locationArticle(normalizeData, time)
    if (transY !== -1) {
        recordTouchEndTop.value = -transY;
        translateStyle.transform = `translateY(${-transY}px)`;
    }
}

/**
 * 获取目录音频列表数据
 */
export function getAudioList() {
    const importAudios = import.meta.glob('../../static/**/*.mp3', {
        eager: true
    });
    const importLrc = import.meta.glob('../../static/**/*.js', {
        eager: true
    });

    const audioList = Object.keys(importAudios).map(key => {
        let temp = key.split('/');
        return {
            name: temp[temp.length - 1].split('.')[0],
            imported: importAudios[key]
        }
    })
    const lrcList = Object.keys(importLrc).map(key => {
        let temp = key.split('/');
        return {
            name: temp[temp.length - 1].split('.')[0],
            imported: importLrc[key]
        }
    })

    for (let audio of audioList) {
        for (let lrc of lrcList) {
            if (audio.name === lrc.name) {
                audio.article = lrc.imported;
            }
        }
    }

    return audioList
}