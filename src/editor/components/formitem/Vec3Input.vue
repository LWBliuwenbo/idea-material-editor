<template>
    <div class="vec3-input">
        <div>
            <span>X</span>
            <el-slider :max="1" :min="-1" :step="0.01" v-model="vec3value.x" @change="vec3Change" />
        </div>
        <div>

            <span>Y</span>
            <el-slider :max="1" :min="-1" :step="0.01" v-model="vec3value.y" @change="vec3Change" />
        </div>
        <div>

            <span>Z</span>
            <el-slider :max="1" :min="-1" :step="0.01" v-model="vec3value.z" @change="vec3Change" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { Vec3 } from 'ideagraphics';
import { ref, toRef } from 'vue'
interface Props {
    modelValue: Vec3
}

const props = defineProps<Props>()

const modelValue = toRef(props, 'modelValue')

const emit = defineEmits(["update:modelValue", "change"])

const vec3value = ref(modelValue.value)

const vec3Change = () => {
    emit('update:modelValue', vec3value.value)
    emit('change', vec3value.value)
}

</script>

<style>
.vec3-input {
    width: 100%;
}
</style>