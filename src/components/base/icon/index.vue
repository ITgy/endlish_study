<script>
export default {
    name: 'icon',
    props: {
        name: {
            type: String
        },
        isMultiple: {
            type: Boolean,
            default: true
        }
    }
}

</script>

<template>
    <i :class="`iconfont ${name}`" v-if="!isMultiple"></i>
    <svg class="icon" aria-hidden="true" v-else>
        <use :xlink:href="`#${name}`"></use>
    </svg>
</template>

<style scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>