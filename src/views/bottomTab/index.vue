<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const current = ref(2);
const tabList = ref([{
    id: 1,
    label: '背单词',
    router: '/word'
},{
    id: 2,
    label: '练听力',
    router: '/listen'
},{
    id: 3,
    label: '做练习',
    router: '/exaim'
}]);

function handleSelecct(item){
    current.value = item.id;
    router.push(item.router)
}

</script>

<template>
    <ul class="tab">
        <li :class="current === item.id ? 'select':''" v-for="item in tabList" :key="item.id" @click="handleSelecct(item)">{{item.label}}</li>
    </ul>
</template>

<style scoped lang="scss">
.tab {
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    li.select {
        background-color: gainsboro;
    }
}
</style>