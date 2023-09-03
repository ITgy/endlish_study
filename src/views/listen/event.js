import {ref} from 'vue';
import { controlArticleShow } from './base';

// touchstart出发时的Y轴位置
const clientY = ref(0);
// 记录touchend时的内容高度
const recordTouchEndTop = ref(0);
// 记录touchmove过程中的内容高度
const recordTouchMoveTop = ref(0);

// 是否开启单行循环点击事件
export function handleLoop() {

}

// 是否显示点击事件
export function handleShow(normalizeData, time) {
    normalizeData.forEach(item => {
        if (Math.floor(item.value.start) === Math.floor(time)) {
            item.value.show = !item.value.show;
        }
    })
}

// touchStart事件
export function handleTouchStart(event, translateStyle) {
    translateStyle.transition = 'none';
    for (let touch of event.changedTouches) {
        clientY.value = touch.clientY;
    }
}

// touchMove事件
export function handleTouchMove(event, translateStyle) {
    for (let touch of event.changedTouches) {
        recordTouchMoveTop.value = recordTouchEndTop.value + touch.clientY - clientY.value;
        translateStyle.transform = `translateY(${recordTouchMoveTop.value}px)`;
    }
}

// touchEnd事件
export function handleTouchEnd(event, translateStyle) {
    translateStyle.transition = 'all 0.5s';
    recordTouchEndTop.value = recordTouchMoveTop.value;
}

// 播放时间更新事件
export function handleTimeupdate(normalizeData, translateStyle, currentTime){
    controlArticleShow(normalizeData, translateStyle, currentTime)
}

// 切换播放模式事件
export function handleMode(){

}

// 冲头播放点击事件
export function handleRePlay(normalizeData, translateStyle){
    controlArticleShow(normalizeData, translateStyle, 0)
}