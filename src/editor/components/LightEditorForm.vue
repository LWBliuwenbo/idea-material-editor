<template>
    <div class="material-editor-form">
        <el-form :model="lightProps" label-width="120px">
            <template v-for="(child, key) in lightSchemaJson.properties">
                <el-form-item :label="child.description" >
                    <template v-if="key=='type' " >
                        <ElSelect v-model="lightProps[key]" @change="valueChange" >
                            <el-option v-for="item in child?.items" :label="item.label" :value="item.value"></el-option>
                        </ElSelect>
                    </template>
                    <template v-else >
                        <el-slider :max="3" :step="0.01" v-model="lightProps[key]" @change="() => valueChange()" />
                    </template>
                </el-form-item>
            </template>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, toRef, Ref } from 'vue'
import { Light } from "ideagraphics";
interface Props {
    modelValue: Light
}
const props = defineProps<Props>()

const modelValue = toRef(props, 'modelValue')

const emit = defineEmits(['update:modelValue', 'change'])

const lightProps: Ref<Light> = ref(modelValue.value)

const valueChange = () => {
    emit('update:modelValue', lightProps)
    emit('change', lightProps)
}

const lightSchemaJson = {
    type: 'object',
    properties: {
        'type':{
            type: 'number',
            description: '光照类型',
            remark: '光照类型',
            kind: 'select',
            items:[{
                label:'直接光照：平行光',
                value: 0
            },{
                label:'直接光照：点光源',
                value: 1
            }]
        },
        'brightness': {
            type: 'number',
            description: '光照强度',
            remark: `光照位置`,
            items:[]
        },
        'gamma': {
            type: 'number',
            description: '伽马校正',
            remark: `伽马校正`,
            items:[]
        },
        'exposure': {
            type: 'number',
            description: '曝光度',
            remark: `曝光度`,
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