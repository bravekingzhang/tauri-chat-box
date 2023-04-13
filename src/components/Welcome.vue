<template>
    <v-container class="welcome-container">
        <v-alert class="welcome-container-v-alert" type="success" variant="outlined">
            这是一个免费的ChatGPT客户端，使用tauri开发，rust上做数据持久化，因此性能极佳，稳定保障你的聊天记录，如果你觉得好用，扫码打赏我一杯咖啡
        </v-alert>
        <v-img :width="300" aspect-ratio="4:3" cover src="../../src/assets/shoukuanma.png"></v-img>
    </v-container>
</template>

<script setup lang="ts">



</script>

<style>
.welcome-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.welcome-container-v-alert {
    height: 150px;
    margin-bottom: 20px;
}
</style>
