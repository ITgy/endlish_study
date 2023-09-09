<script setup>
import Icon from '@/components/base/icon/index.vue';

const emit = defineEmits(['handleSelectLine', 'handleShow']);
const props = defineProps({
  line: {
    type: Object,
    default: () => {},
  },
});

function handleSelectLine(line, event){
  if(event.target.className.includes('mask')){
    emit('handleShow', line.value.start);
  } else {
    emit('handleSelectLine', line.value.start)
  }
}

</script>
<template>
  <div class="line" :class="line.value.light ? 'light' : ''">
    <div class="line_content" :class="line.value.show ? '' : 'mask'" @click="handleSelectLine(line, $event)">
      {{ line.value.text }}
    </div>
    <div class="line_operate">
      <span @click="$emit('handleShow', line.value.start)">
        <Icon name="icon-yanjing-zhengyan" :isMultiple="false" class="icon" v-if="line.value.show"></Icon>
        <Icon name="icon-yanjing_yincang" :isMultiple="false" class="icon" v-else></Icon>
      </span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.line {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 0 0 20px;
  .line_content {
    flex: 3;
    line-height: 20px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
  .line_operate {
    // flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 15px;
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      .icon {
        font-size: 20px;
        color: #b4cccc;
      }
    }
  }
  .mask::after {
    content: "";
    display: block;
    height: 20px;
    background-color: #b4cccc;
    position: absolute;
    left: 0;
    right: 0;
    border-radius: 6px;
  }
}
.light {
  .line_content {
    color: burlywood;
  }
}
</style>