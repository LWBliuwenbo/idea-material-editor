<template>
    <div class="camera-editor-form">
        <el-form :model="cameraProps" label-width="120px">
            <template v-for="(child, key) in CameraSchemaJson.properties">
                <el-form-item :label="child.description" >
                    <RoateInput v-model="cameraProps[key]" @change="() => valueChange()"/>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, toRef, Ref } from 'vue'
import {  Vec3 } from "ideagraphics";
import RoateInput from './formitem/RoateInput.vue';
interface Props {
    modelValue: CameraProps
}

interface CameraProps {
    roateVec: Vec3
}
const props = defineProps<Props>()

const modelValue = toRef(props, 'modelValue')

const emit = defineEmits(['update:modelValue', 'change'])

const cameraProps: Ref<CameraProps> = ref(modelValue.value)

const valueChange = () => {
    emit('update:modelValue', cameraProps.value)
    emit('change', cameraProps.value)
}

const CameraSchemaJson = {
    type: 'object',
    properties: {
        roateVec:{
            type: 'object',
            description: '相机位置',
            remark: '',
            items:[]
        }
    }
}


</script>

<style>
.material-editor-form {
    padding: 10px;
}
</style>