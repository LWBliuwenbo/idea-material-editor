<template>
    <div class="props-edit-panel">
        <div class="props-edit-panel-title">渲染设置</div>
        <div> <span>是否显示天空盒</span> <span>

            <ElCheckbox v-model="showEnv" @change="changeShowEnv"></ElCheckbox>
        </span> </div>
        <div class="props-edit-panel-body">
            <el-collapse v-model="collpase_active" >
                <el-collapse-item title="材质" name="material">
                    <MaterialEditorForm  v-model="material" @change="propsChange"/>
                </el-collapse-item>
            </el-collapse>

            <el-collapse v-model="collpase_active" >
                <el-collapse-item title="灯光" name="light">
                    <LightEditorForm  v-model="light" @change="propsChange"/>
                </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="collpase_active" >
                <el-collapse-item title="相机" name="camera">
                    <CameraEditor  v-model="camera" @change="cameraChange"/>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Camera, Light, Vec3 } from 'ideagraphics';
import { PBRMaterial } from 'ideagraphics';
import {ref} from 'vue'
import CameraEditor from './CameraEditor.vue';
import LightEditorForm from './LightEditorForm.vue';
import MaterialEditorForm from './MaterialEditorForm.vue';

const emit = defineEmits(['propsSet', 'cameraChange', 'envSet'])

const collpase_active = ref('material')
const showEnv = ref(false)
const material = new PBRMaterial();
const light = new Light();
const camera = ref({
    roateVec: new Vec3(0,0,0)
});

const changeShowEnv = () => {
    emit('envSet', showEnv.value)
}
const propsChange = () => {
    emit('propsSet', { material, light, camera})
}

const cameraChange = (camera: Camera) => {
    emit('cameraChange',  camera)
}


</script>

<style>
.props-edit-panel-title {
    padding: 10px 0;
}
.props-edit-panel {
    width: 350px;
    padding: 20px 40px;
}
</style>