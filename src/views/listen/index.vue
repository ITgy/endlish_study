<script setup>
import { handleLoop, handleShow, handleTouchStart, handleTouchMove, handleTouchEnd } from './event';
import { handleTimeupdate, handleRePlay, handleMode } from './event';
import { computeScrollInnerInitTop, initData } from './base';
import { ref, onMounted } from 'vue';
import {getAudioList} from './base';
// import { dataSource } from './source.js';

// 导入组件
import Line from './components/line/index.vue';
import Control from './components/control/index.vue';

const scrollWrap = ref(null);// 获取当前滚动容器DOM对象
const normalizeData = ref(initData(getAudioList()[0]));// 初始化数据

// 初始滚动位置的样式
const initStyle = ref({
  top: 0
})
// 实时滚动样式
const translateStyle = ref({
  transform: 'translateY(0px)',
  transition: 'all 0.5s'
})

onMounted(() => {
  // 获取滚动容器高度
  const scrollWrapHeight = scrollWrap.value.clientHeight;
  // 文章内容初始高度
  initStyle.value.top = computeScrollInnerInitTop(scrollWrapHeight);
})

function handleSelectAudio(audio){
  normalizeData.value = initData(audio);
}
</script>

<template>
  <div class="scroll_wrap" ref="scrollWrap" @touchstart="handleTouchStart($event, translateStyle)"
    @touchmove="handleTouchMove($event, translateStyle)" @touchend="handleTouchEnd($event, translateStyle)">
    <ul class="scroll_inner" :style="[initStyle, translateStyle]">
      <Line v-for="line in normalizeData" :key="line.start" :line="line" @handleLoop="handleLoop"
        @handleShow="handleShow(normalizeData, $event)">
      </Line>
    </ul>
  </div>
  <Control :normalizeData="normalizeData" @handleMode="handleMode"
    @handleRePlay="handleRePlay(normalizeData, translateStyle)"
    @handleTimeupdate="handleTimeupdate(normalizeData, translateStyle, $event)"
    @handleSelect="handleSelectAudio"></Control>
</template>

<style scoped lang="scss">
.scroll_wrap {
  height: calc(100% - 70px);
  overflow: hidden;
  position: relative;

  .scroll_inner {
    width: 100%;
    position: absolute;
    left: 0;
  }
}

.control {
  height: 50px;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>