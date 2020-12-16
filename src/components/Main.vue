<template>
    <div class="">
        首页
        <button @click="beforeLogin">请求随机密钥</button>
    </div>
</template>
<script>
import {getRandomKey} from '../network/login'
export default {
    name: 'Main',
    components: {},
    data() {
        return {};
    },
    mounted() {},
    methods: {
        beforeLogin(){
            getRandomKey().then((res) => {
                console.log(res);
            })
        },
    }
};
</script>

<style scoped>

</style>
