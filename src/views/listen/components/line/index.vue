<script setup>
const props = defineProps({
  line: {
    type: Object,
    default: () => {},
  },
});

</script>
<template>
  <div class="line" :class="line.value.light ? 'light' : ''">
    <div class="line_content" :class="line.value.show ? '' : 'mask'" @click="$emit('handleSelectLine', line.value.start)">
      {{ line.value.text }}
    </div>
    <div class="line_operate">
      <span @click="$emit('handleLoop', line.value.text)">单</span>
      <span @click="$emit('handleShow', line.value.start)">{{
        line.value.show ? "显" : "隐"
      }}</span>
      <span @click="$emit('voice', line.value.text)">读</span>
    </div>
  </div>
</template>
<style scope lang="scss">
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
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
  .mask::after {
    content: "";
    display: block;
    background-color: grey;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
  }
}
.light {
  .line_content {
    color: burlywood;
  }
}
</style>