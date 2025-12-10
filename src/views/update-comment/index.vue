<script setup lang="ts">
import { ref, watch } from 'vue'
import { Controller } from 'ourcad'
// import { Controller } from '../../../esm'
import { ElMessageBox, ElMessage } from 'element-plus'

const props = defineProps({
    control: {
        type: Controller,
        required: true
    },
    commentMessage: {
        type: Object,
        required: true
    }
})

watch(() => props.commentMessage, (newVal, oldVal) => {
    color.value = props.commentMessage.color
    lineWidth.value = props.commentMessage.lineWidth
})

// 批注颜色
const color = ref('')
// 批注线宽
const lineWidth = ref(0)

color.value = props.commentMessage.color
lineWidth.value = props.commentMessage.lineWidth

const update = () => {

}

const updateComment = () => {
    const params = {
        id: props.commentMessage.id as string,
        type: props.commentMessage.type as string,
        linewidth: lineWidth.value,
        color: color.value
    }
    props.control.updateComment(params)
    ElMessage({
        message: '更新成功',
        type: 'success'
    })
}

const deleteComment = () => {
    ElMessageBox.confirm(`批注删除后无法恢复，确认是否删除？`, '批注删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
    })
        .then(() => {
            props.control.deleteCommentById(props.commentMessage.id)
            ElMessage({
                message: '删除成功',
                type: 'success'
            })
        })
        .catch(() => {})
}
</script>

<template>
    <div class="comment-update-box" @mouseup.stop="" @mousemove.stop="" @mousedown.stop="" @mousewheel.stop="">
        <div class="color-picker-box">
            <span class="text">颜色</span>
            <el-color-picker id="editor-color-picker" size="small" v-model="color" @change="updateComment"/>
        </div>
        <div class="line-width-box">
            <el-input v-model="lineWidth" @change="updateComment">
                <template type="number" #prepend>线宽</template>
            </el-input>
        </div>
        <i class="iconfont icon-shanchu" @click="deleteComment"></i>
    </div>
</template>
<style scoped lang="less">
@import url('@/assets/common.less');
.comment-update-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @toolBackgroundColor;
    position: absolute;
    top: 26px;
    padding: 10px 10px;
    color: white;

    .color-picker-box {
        margin: 0 10px;
        .text {
            margin-right: 5px;
        }
    }

    .line-width-box {
        width: 130px;
        margin: 0 10px;
    }

    .icon-shanchu {
        cursor: pointer;
        font-size: 30px;
    }
}

/deep/ i.el-icon.el-color-picker__icon.is-icon-arrow-down {
    display: none;
}
</style>

