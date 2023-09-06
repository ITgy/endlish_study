<script setup>
import { ref, watch } from 'vue';
import { getAudioList } from '../../base';
import Icon from '@/components/base/icon/index.vue';

const emit = defineEmits(['handlePlay', 'handleRePlay', 'handleTimeupdate', 'handleSelect'])
const props = defineProps({
    normalizeData: {
        type: Array,
        default: () => []
    },
    setCurrentTime: {
        type: Number,
        default: 0
    }
})
watch(() => props.setCurrentTime, (newValue) => {
    switchAudioTime(newValue, true);
})

const percent = ref(0); // 播放进度百分比
const isPlay = ref(false); // 是否正在播放中
const isFixLine = ref(false); // 控制是否开启行循环
const audio = ref(null); // 播放器DOM对象
const duration = ref(0); // 音频总时长
const currentTime = ref(0); // 播放进度倒计时
const currentPlayLine = ref({}); // 当前播放的行
const isListShow = ref(false); // 是否显示音频列表
const currentMode = ref(0); // 当前播放模式

// 播放模式列表
const PLAY_MODE = [{
    label: '单曲',
    icon: 'icon-danquxunhuan',
}, {
    label: '顺序',
    icon: 'icon-shunxubofang',
}, {
    label: '循环',
    icon: 'icon-liebiaoxunhuan'
}, {
    label: '随机',
    icon: 'icon-suijibofang'
}];
const audioList = getAudioList();
const initialAudio = audioList[0].imported.default; // 初始音频
const curPlayInd = ref(0);

/**
 * 切换音频的方法，对应的会更新播放状态，更新对应滚动字幕 
 * @param {Object} audio 音频对象 
 * @param {Number} index 音频对象下标 
 * @param {Boolean} isPlay 是否播放
 */
function switchAudio(index, isPlay=false){
    if(index >= audioList.length || index < 0){
        alert("无效的音频！");
        return;
    }
    let audioObj = audioList[index];
    curPlayInd.value = index;
    emit('handleSelect', audioObj);
    audio.value.src = audioObj.imported.default;
    controlPlay(isPlay);
}

/**
 * 切换目标播放时间
 * @param {Number} time 目标播放时间 
 * @param {Boolean} isPlay 是否播放 
 */
function switchAudioTime(time, isPlay=false){
    emit('handleTimeupdate', time);
    audio.value.currentTime = time;
    controlPlay(isPlay);
}

/**
 * 控制音频的播放和暂停
 * @param {Boolean} value true为播放，false为暂停 
 */
function controlPlay(value) {
    if (value) {
        audio.value.play();
        isPlay.value = true;
    } else {
        audio.value.pause();
        isPlay.value = false;
    }

}

/**
 * 当音频加载完成可以播放了出发该事件
 */
function handleCanplaythrough() {
    duration.value = audio.value.duration;
}

/**
 * 实时更新音频当前播放时间的事件
 */
function handleTimeupdate() {
    /**
     * 这里如果仅判断当前播放时间小于下一行开始时间，会出现短暂进入下一行然后再回到当前行重头播放的问题
     * 解决方案：比对下一行开始时间时减去1s
     */
    if (isFixLine.value && (audio.value.currentTime >= currentPlayLine.value.end - 1)) {
        audio.value.currentTime = currentPlayLine.value.start;
        percent.value = Math.floor(currentPlayLine.value.start) / audio.value.duration * 100;
        currentTime.value = currentPlayLine.value.start;
        emit('handleTimeupdate', currentPlayLine.value.start)
    } else {
        percent.value = Math.floor(audio.value.currentTime / audio.value.duration * 100);
        currentTime.value = audio.value.currentTime;
        emit('handleTimeupdate', audio.value.currentTime)
    }
}

// 播放/暂停 点击事件
function handlePlay() {
    if (isPlay.value) {
        controlPlay(false);
    } else {
        controlPlay(true);
    }

    emit('handlePlay', isPlay.value);
}

// 重播点击事件
function handleReplay() {
    // audio.value.currentTime = 0;
    switchAudioTime(0, true);
    emit('handleRePlay')
}

// 播放结束触发事件
function handleEnded() {
    switch (currentMode.value) {
        case 0:
            switchAudioTime(0, true);
            break;
        case 1:
            if(curPlayInd.value !== audioList.length - 1){
                switchAudio(++curPlayInd.value, true);
            } else {
                controlPlay(false);
            }
            break;
        case 2:
            if (curPlayInd.value === audioList.length - 1) {
                switchAudio(0, true);
            } else {
                switchAudio(++curPlayInd.value, true);
            }
            break;
        case 3: 
            // todo
        default:

    }
}

// 格式化显示时间
function formatShowTime(time) {
    const ing = Math.floor(time);
    const minute = Math.floor(ing / 60).toString();
    const second = Math.floor(ing % 60).toString();
    return `${minute.length < 2 ? minute.padStart(2, '0') : minute}:${second.length < 2 ? second.padStart(2, '0') : second}`
}

// 重播当前行
function handleReplayLine() {
    if (isFixLine.value) {
        isFixLine.value = false;
    } else {
        for (let i = 0; i < props.normalizeData.length; i++) {
            if (props.normalizeData[i].value.light) {
                currentPlayLine.value = props.normalizeData[i].value;
            }
        }
        isFixLine.value = true;
    }

}

/**
 * 控制音频列表是否显示
 */
function handleControlPopup(value) {
    isListShow.value = value;
}

/**
 * 从音频列表中选择一项
 * @param {*} item 选中的音频对象
 */
async function handleSelect(index) {
    switchAudio(index, true);
    isListShow.value = false;
}

/**
 * 切换模式点击事件
 */
function handleMode() {
    currentMode.value = (currentMode.value + 1) % 4;
}

/**
 * 点击进度条事件
 * @param {*} event 事件对象 
 */
function handleTouchstartProgressBar(event) {
    controlProgressBar(event);
}


/**
 * 拖动进度条事件
 * @param {*} event 事件对象 
 */
function handleTouchmoveProgressBar(event) {
    // console.log('event', event)
    // const touch = event.changeTouches[0];
    // console.log('touch', touch)
    // controlProgressBar(event);
}

/**
 * 进度条控制器
 * @param {*} event 事件对象 
 */
function controlProgressBar(event) {
    let playTime = 0;
    if (event.target.className === 'progress_bar_inner') {
        playTime = event.offsetX / event.target.parentNode.clientWidth * duration.value;
    }
    if (event.target.className === 'progress_bar') {
        playTime = event.offsetX / event.target.clientWidth * duration.value;
    }
    switchAudioTime(playTime, true);
}

</script>

<template>
    <van-popup v-model:show="isListShow" position="right">
        <div class="list_wrap">
            <ul>
                <li class="list_item" v-for="(item, index) in audioList" @click="handleSelect(index)">
                    <div class="name">{{ item.name }}</div>
                </li>
            </ul>
            <div class="list_wrap_footer" @click="handleControlPopup(false)">
                关闭
            </div>
        </div>
    </van-popup>
    <audio :src="initialAudio" ref="audio" @ended="handleEnded" @timeupdate="handleTimeupdate" @canplaythrough="handleCanplaythrough"></audio>
    <div class="progress">
        <span>{{ formatShowTime(currentTime) }}</span>
        <div class="progress_bar" @click="handleTouchstartProgressBar" @touchmove="handleTouchmoveProgressBar">
            <div class="progress_bar_inner" :style="`width:${percent}%`"></div>
        </div>
        <span>{{ formatShowTime(duration) }}</span>
    </div>
    <div class="control">
        <Icon :name="PLAY_MODE[currentMode].icon" class="playMode icon" @click="handleMode"></Icon>
        <Icon name="icon-CD" class="replayLine icon" :class="isFixLine ? 'light' : ''" @click="handleReplayLine"></Icon>
        <Icon :name="isPlay ? 'icon-bofangzhong':'icon-zanting1'" class="play icon" @click="handlePlay"></Icon>
        <Icon name="icon-kuaitui" class="replay icon" @click="handleReplay"></Icon>
        <Icon name="icon-bofangduilie" class="list icon" @click="handleControlPopup(true)"></Icon>
    </div>
</template>
<style scoped lang="scss">
.list_wrap {
    width: 50vw;
    height: 100vh;

    ul {
        height: calc(100% - 52px);
        padding: 0 16px;
        overflow: auto;

        li {
            height: 40px;
            line-height: 40px;
        }

        li+li {
            border-top: 1px solid #f1f3f5;
        }
    }

    .list_wrap_footer {
        height: 50px;
        line-height: 50px;
        padding-left: 10px;
        border-top: 1px solid #e9ecef;
        font-size: 14px;
        font-weight: 500;
        color: #333;
        text-align: center;
    }
}

.progress {
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .progress_bar {
        flex: 1;
        height: 5px;
        background-color: #b6cccd;
        border-radius: 3px;
        position: relative;
        overflow: hidden;

        .progress_bar_inner {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background-color: #00a4cd;
            border-radius: 3px 0 0 3px;
        }
    }

    span {
        display: block;
        width: 50px;
        text-align: center;
    }
}

.control {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .icon {
        font-size: 20px;
    }
    .light {
        color: #66d9e8;
    }
}
</style>