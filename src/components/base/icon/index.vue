<script>
export default {
    name: 'icon',
    props: {
        name: {
            type: String
        }
    }
}

</script>

<template>
    <svg class="icon" aria-hidden="true">
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