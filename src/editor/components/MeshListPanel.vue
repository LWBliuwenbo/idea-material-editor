<template>
    <div class="mesh-list-panel">
        <ul class="mesh-list">
            <li v-for="child in models" :key="child.name" @click="select(child)"
                >
                <div class="mesh-card" :class="current.id === child.id ? 'active' : ''">
                    <div class="mesh-image">
                        <img :src="child.image" alt="">
                    </div>
                    <div class="mesh-name">
                        {{ child.name }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import SphereImage from '@/assets/sphere.jpg';
import CircleImage from '@/assets/circle.jpg';
import TepoImage from '@/assets/tepo.jpg';



import { ref, defineEmits, toRef } from 'vue';

interface mesh {
    id: string,
    modelurl: string
    name: string
}
interface Props {
    modelValue: mesh
}
const props = defineProps<Props>();

const modelValue = toRef(props, 'modelValue')

const current = ref(modelValue.value)

const emit = defineEmits([
    'change',
    'update:modelValue'
])
const models = ref([
    {
        image: SphereImage,
        modelurl: '/materialeditor/model/sphere.obj',
        id: 'Sphere',
        name: '球体',
        scale:0.5
    },
    {
        image: CircleImage,
        modelurl: '/materialeditor/model/circle.obj',
        id: 'Circle',
        name: '圆环体',
        scale:0.5
    },
    {
        image: TepoImage,
        modelurl: '/materialeditor/model/teapot.obj',
        id: 'Teapot',
        name: '壶体',
        scale:0.1
    }
])

const select = (mesh: mesh) => {
    current.value = mesh;
    emit('update:modelValue', mesh)
    emit('change', mesh)
}
</script>

<style lang="scss">
.mesh-list-panel {
    width: 200px;
    text-align: center;
}

.mesh-card {
    box-shadow: 0 0 11px 3px #00000021;
    width: 180px;
    margin: 10px;
    box-sizing: border-box;
    border-radius: 5px;

    .mesh-name {
        height: 30px;
    }

    .mesh-image {
        img {

            width: 180px;
            height: 180px;
        }
    }

    &.active {
        color: #fff;
        background: #387bc1;
    }
}


ul.mesh-list {
    padding: 0;
    list-style: none;
}
</style>