<script setup>
import { ref } from 'vue';
import { getAudioList } from '../../base';

const emit = defineEmits(['handlePlay', 'handleRePlay', 'handleTimeupdate', 'handleSelect'])
const props = defineProps({
    normalizeData: {
        type: Array,
        default: () => []
    }
})

const percent = ref(0); // 播放进度百分比
const isPlay = ref(false); // 是否正在播放中
const isFixLine = ref(false); // 控制是否开启行循环
const mode = ref('single') // 当前播放模式
const audio = ref(null); // 播放器DOM对象
const duration = ref(0); // 音频总时长
const currentTime = ref(0); // 播放进度倒计时
const currentPlayLine = ref({}); // 当前播放的行
const nextPlayLine = ref({});// 当前播放行的下一行
const isListShow = ref(false); // 是否显示音频列表

// 播放模式列表
const PLAY_MODE = {
    single: '单曲',
    sequence: '顺序',
    loop: '循环'
}
const audioList = getAudioList();
const initialAudio = audioList[0].imported.default; // 初始音频

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
    if (isFixLine.value && (!nextPlayLine.value || audio.value.currentTime >= currentPlayLine.value.end - 1)) {
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
        audio.value.pause();
        isPlay.value = false;
    } else {
        audio.value.play();
        isPlay.value = true;
    }

    emit('handlePlay', status)
}

// 重播点击事件
function handleReplay() {
    audio.value.currentTime = 0;
    emit('handleRePlay')
}

// 播放结束触发事件
function handleEnded() {
    switch (mode.value) {
        case "single":
            audio.value.currentTime = 0;
            audio.value.play();
            break;
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

function handleShowPopup() {
    isListShow.value = true;
}

function handleClosePopup(){
    isListShow.value = false;
}

async function handleSelect(item){
    audio.value.src = item.imported.default;
    emit('handleSelect', item);
    isListShow.value = false;
    audio.value.play();
}

</script>

<template>
    <van-popup v-model:show="isListShow" position="right">
        <div class="list_wrap">
            <ul>
                <li class="list_item" v-for="item in audioList" @click="handleSelect(item)">
                    <div class="name">{{ item.name }}</div>
                </li>
            </ul>
            <div class="list_wrap_footer" @click="handleClosePopup">
                关闭
            </div>
        </div>
    </van-popup>
    <audio :src="initialAudio" ref="audio" @ended="handleEnded" @timeupdate="handleTimeupdate"
        @canplaythrough="handleCanplaythrough"></audio>
    <div class="progress">
        <span>{{ formatShowTime(currentTime) }}</span>
        <div class="progress_bar">
            <div class="progress_bar_inner" :style="`width:${percent}%`"></div>
        </div>
        <span>{{ formatShowTime(duration) }}</span>
    </div>
    <div class="control">
        <div class="playMode" @click="$emit('handleMode')">{{ PLAY_MODE[mode] }}</div>
        <div class="replayLine" :class="isFixLine ? 'light' : ''" @click="handleReplayLine">重行</div>
        <div class="play" @click="handlePlay">{{ isPlay ? '暂停' : '播放' }}</div>
        <div class="replay" @click="handleReplay">重播</div>
        <div class="list" @click="handleShowPopup">列表</div>
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

        li + li {
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

    .light {
        color: #66d9e8;
    }
}
</style>