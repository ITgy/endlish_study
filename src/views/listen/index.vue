<script setup>
import Line from './components/line.vue';
import { ref, onMounted } from 'vue';

const dataSource = [
  {
    text: "Lesson 1",
    time: 0.61
  },
  {
    text: "Excuse me!",
    time: 0.61
  },
  {
    text: "Listen to the tape then answer this question.",
    time: 5.61
  },
  {
    text: "Whose handbag is it?",
    time: 10.8
  },
  {
    text: "Excuse me!",
    time: 15.11
  },
  {
    text: "Yes?",
    time: 16.66
  },
  {
    text: "Is this your handbag?",
    time: 18.26
  },
  {
    text: "Pardon?",
    time: 21.44
  },
  {
    text: "Is this your handbag?",
    time: 23.17
  },
  {
    text: "Yes it is.",
    time: 26.73
  },
  {
    text: "Thank you very much.",
    time: 29.49
  },
];

// 获取当前滚动容器DOM对象
const scrollWrap = ref(null);

onMounted(() => {
    console.log('scrollWrap', scrollWrap.value.clientHeight)
    const scrollWrapHeight = scrollWrap.value.clientHeight;
    
})



/**** start 单行控制相关事件方法 ****/
// 是否开启单行循环
function handleLoop(){

}

// 是否显示
function handleShow(){

}
/**** end 单行控制相关事件方法 ****/
/**** start 逻辑方法 ****/
// 字幕滚动模式一：自动计算当前高亮行是否超出显示区域，如果超出了移动字幕保证高亮在字幕内
function processScrollEnd(){

}
// 字幕滚动模式二：自动计算当前高亮行是否超过显示区域的中点(“中”心的“中”)，如果超出了移动字幕保证高亮在字幕内
function processScrollMiddle(){
    // 计算当前滚动容器的高度

}
/**** end 逻辑方法 ****/

</script>
<template>
    <div class="scroll_wrap">
        <ul class="scroll_inner" ref="scrollWrap">
            <Line v-for="line in dataSource" :key="line.time" :line="line" @handleLoop="handleLoop" @handleShow="handleShow"></Line>
        </ul>
    </div>
</template>
<style scoped lang="scss">
.scroll_wrap {
    height: 200px;
    border: 1px solid #b12600;
    overflow: auto;
}
</style>