<script>
import Icon from '../icon/index.vue';

export default {
    props: {
        title: {
            type: String,
            default:'标题'
        },
        leftText: {
            type: String,
            default: ''
        },
        rightText: {
            type: String,
            default: ''
        }
    }
}
</script>
<template>
<div class="navBar">
    <div class="leftText" @click="$emit('leftClick')">
        <Icon name="icon-zuojiantou" v-if="leftText" class="arrow"></Icon>
        <slot name="left">{{leftText}}</slot>
    </div>
    <div class="title">
        <slot name="title">{{title}}</slot>
    </div>
    <div class="rightText" @click="$emit('rightClick')">
        <slot name="right">{{rightText}}</slot>
    </div>
</div>
</template>
<style scoped lang="scss">
.navBar {
    height: 46px;
    padding: 0 10px;
    border-bottom: 1px solid #c1c1ca;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .leftText {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: centen;
        font-size: 16px;
        .arrow {
            margin-right: 5px;
        }
    }
    .title {
        font-size: 18px;
        color: #333;
        font-weight: 700;
        width: 108px;
        text-align: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .rightText {
        width: 60px;
        font-size: 16px;
        text-align: right;
    }
}
</style>