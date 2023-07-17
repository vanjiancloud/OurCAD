<script setup lang="ts">
import { ref } from 'vue'
import { Controller } from 'ourcad'

const emit = defineEmits(['showOrHiddenLayerTree'])
const props = defineProps({
    control: {
        type: Controller,
        required: true
    }
})

const { Allkeys, visibleKeys } = props.control.getLayerList()
// 当前显示的图层key
let keys = ref<string[]>(visibleKeys)

const showOrHiddenGroup = (data: string, isSelected: boolean) => {
    if (isSelected) {
        props.control.showLayerBykeys(data)
    } else {
        props.control.hiddenLayerBykeys(data)
    }
}

</script>

<template>
    <div class="model-tree">
        <div class="head-box">
            <span class="white font16">图层列表</span>
            <i @click="emit('showOrHiddenLayerTree', false)" class="iconfont icon-guanbi1"></i>
        </div>

        <el-checkbox-group v-model="keys" class="check-box-group">
            <el-checkbox
                @change="showOrHiddenGroup(item, $event)"
                v-for="item in Allkeys"
                :label="item"
                class="check-box flex-center"
            >
                <template #default>
                    <el-tooltip
                        v-if="item.length > 20"
                        effect="dark"
                        :content="item"
                        placement="top"
                        popper-class="footer-tooltip"
                    >
                        <div class="layer-linebox flex-space-between">
                            <span class="line1">{{ item }}</span>
                        </div>
                    </el-tooltip>
                    <div v-else class="layer-linebox flex-space-between">
                        <span class="line1">{{ item }}</span>
                    </div>
                </template>
            </el-checkbox>
        </el-checkbox-group>
    </div>
</template>

<style scoped lang="less">
@import url('@/assets/common.less');

.model-tree {
    position: absolute;
    width: 300px;
    top: 20px;
    left: 10px;
    background-color: rgba(16, 16, 16, 0.7);
    overflow: hidden;
}

.check-box-group {
    height: 300px;
    overflow-y: auto;
    overflow-x: hidden;
}

.check-box-group::-webkit-scrollbar {
    width: 5px;
}

/* 滑块 */
.check-box-group::-webkit-scrollbar-thumb {
    background-color: #409eff;
    border-radius: 5px;
}

/* 轨道 */
.check-box-group::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 5px;
}

.head-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 16px 0 10px;
    .icon-guanbi1 {
        cursor: pointer;
        font-size: 16px;
        color: white;
    }
}

.check-box {
    width: 100%;
    background-color: rgba(16, 16, 16, 0.7);
    padding: 0 30px 0 16px;
    box-sizing: border-box;
    &:hover {
        background-color: #3f3f3f;
        cursor: pointer;
    }
}

.layer-linebox {
    width: 100%;
}

// 去掉颜色选择器的下拉图标
/deep/ i.el-icon.el-color-picker__icon.is-icon-arrow-down {
    display: none;
}
// 去掉颜色选择器的禁用蒙层
/deep/ .el-color-picker__mask {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0);
}

/deep/ span.el-checkbox__label {
    width: 90%;
}
</style>