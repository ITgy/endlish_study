<script setup>
import { handleShow, handleTouchStart, handleTouchMove, handleTouchEnd } from './event';
import { handleTimeupdate } from './event';
import { computeScrollInnerInitTop, initData } from './base';
import { reactive, ref, onMounted } from 'vue';
import { getAudioList } from './base';

// 导入组件
import Navbar from '@/components/base/navBar/index.vue';
import Icon from '@/components/base/icon/index.vue';
import Line from './components/line/index.vue';
import Control from './components/control/index.vue';

const scrollWrap = ref(null);// 获取当前滚动容器DOM对象
let normalizeData = reactive(initData(getAudioList()[0]));// 初始化数据
const setCurrentTime = ref(0);
const showSet = ref(false);

//设置区域
const isListenMask = ref(true);

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

function handleSelectAudio(audio) {
  normalizeData = initData(audio);
}

function handleSelectLine(time) {
  setCurrentTime.value = time;
}

function handleRightClick() {
  showSet.value = true;
}
function handleSwitch(type, value){
  switch(type){
    case 'listenMask':
      normalizeData.forEach(item => {
        item.value.show = !value;
      })
      break;
  }
}

</script>

<template>
  <Navbar @rightClick="handleRightClick" title="练听力">
    <template #right>
      <Icon name="icon-shezhi"></Icon>
    </template>
  </Navbar>
  <van-popup v-model:show="showSet" position="bottom" :style="{ height: '30%' }">
    <div class="panel_title">设置</div>
    <div class="panel">
      <div class="panel_item">
        <span style="margin-right: 10px;">听力遮罩</span>
        <van-switch v-model="isListenMask" @change="handleSwitch('listenMask', $event)" active-color="#99e9f2" size="18px" inactive-color="#dcdee0" />
      </div>
      <div class="panel_item">
        <span style="margin-right: 10px;">待定</span>
        <van-switch v-model="checked" active-color="#ee0a24" size="18px" inactive-color="#dcdee0" />
      </div>
      <div class="panel_item">
        <span style="margin-right: 10px;">待定</span>
        <van-switch v-model="checked" active-color="#ee0a24" size="18px" inactive-color="#dcdee0" />
      </div>
      <div class="panel_item">
        <span style="margin-right: 10px;">待定</span>
        <van-switch v-model="checked" active-color="#ee0a24" size="18px" inactive-color="#dcdee0" />
      </div>
      <div class="panel_item">
        <span style="margin-right: 10px;">待定</span>
        <van-switch v-model="checked" active-color="#ee0a24" size="18px" inactive-color="#dcdee0" />
      </div>
      <div class="panel_item">
        <span style="margin-right: 10px;">待定</span>
        <van-switch v-model="checked" active-color="#ee0a24" size="18px" inactive-color="#dcdee0" />
      </div>
    </div>
  </van-popup>
  <!-- <van-nav-bar title="练听力" right-text="设置" /> -->
  <div class="scroll_wrap" ref="scrollWrap" @touchstart="handleTouchStart($event, translateStyle)"
    @touchmove="handleTouchMove($event, translateStyle)" @touchend="handleTouchEnd($event, translateStyle)">
    <ul class="scroll_inner" :style="[initStyle, translateStyle]">
      <Line v-for="line in normalizeData" :key="line.start" :line="line" @handleSelectLine="handleSelectLine"
        @handleShow="handleShow(normalizeData, $event)">
      </Line>
    </ul>
  </div>
  <Control :setCurrentTime="setCurrentTime" :normalizeData="normalizeData"
    @handleTimeupdate="handleTimeupdate(normalizeData, translateStyle, $event)" @handleSelect="handleSelectAudio">
  </Control>
</template>

<style scoped lang="scss">
.scroll_wrap {
  height: calc(100% - 116px);
  overflow: hidden;
  position: relative;

  .scroll_inner {
    width: 100%;
    position: absolute;
    left: 0;
  }
}

.panel_title {
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
}
.panel {
  width: 100%;
  height: calc(100% - 46px);
  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(3, 50px);
  overflow: auto;
  .panel_item {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: inline-block;
      width: 70px;
      text-align: center;
    }
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