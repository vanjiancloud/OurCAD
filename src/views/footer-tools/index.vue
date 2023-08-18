<script setup lang="ts">
import { ref } from 'vue'
import type { toolType } from '@/types/footerTool'
import { Controller } from 'ourcad'
// import { Controller } from '../../../esm'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['showOrHiddenMaterialTree', 'showOrHiddenLayerTree'])

const props = defineProps({
    control: {
        type: Controller,
        required: true
    }
})

let isFullScreen = ref(false)
const toolList = ref<toolType[]>([
    {
        title: '主视图',
        icon: 'icon-zhushijiao',
        status: '',
        key: 'mainView',
        click: () => {
            props.control.HomeView()
        }
    },
    {
        title: '框选放大',
        icon: 'icon-chuangkousuofang',
        status: '',
        key: 'boxSelect',
        click: (item: toolType) => {
            /**
             * SDK不进行操作的状态管理，只提供操作开始和操作结束的回调方法
             * 需要开发者自己在回调中完成状态处理
             */
            if (item.status === 'using') {
                props.control.cancelSelectBox()
                item.status = ''
            } else {
                props.control.selectBox(
                    () => {
                        /** startCallBack */
                        item.status = 'using'
                    },
                    () => {
                        /** endCallBack */
                        item.status = ''
                    }
                )
            }
        }
    },
    {
        title: '切换背景色',
        icon: 'icon-qiehuanxianshi',
        status: '',
        key: 'changeBackground',
        click: () => {
            props.control.changeBackground()
        }
    },
    {
        title: '图层管理',
        icon: 'icon-tucengguanli',
        status: '',
        key: 'layerTree',
        click: () => {
            emit('showOrHiddenLayerTree')
        }
    },
    {
        title: '批注',
        icon: 'icon-pizhu',
        status: '',
        key: 'comment',
        click: (type: string) => {
            props.control.addComment(type)
        }
    },
    {
        title: '显示/隐藏批注',
        icon: 'icon-Hide',
        status: '',
        key: 'showOrHideComment',
        click: () => {
            props.control.showOrHiddenComment()
        }
    },
    {
        title: '保存批注',
        icon: 'icon-baocun1',
        status: '',
        key: 'saveComment',
        click: () => {
            props.control.saveComment()
        }
    },
    {
        title: '全屏',
        icon: 'icon-qiehuanxianshi',
        status: '',
        key: 'fullScreen',
        click: () => {
            const container = <HTMLElement>document.getElementById('container')
            if (!isFullScreen.value) {
                props.control.fullScreen(container)
                isFullScreen.value = true
            } else {
                props.control.exitFullScreen()
                isFullScreen.value = false
            }
        }
    }
])

const changeIconStatus = (toolKey: string, status?: string) => {
    toolList.value.some((item) => {
        if (item.key === toolKey) {
            if (!status && item.status === 'using') {
                item.status = ''
            } else {
                item.status = 'using'
            }
            return true
        }
    })
}
defineExpose({
    changeIconStatus
})
</script>

<template>
    <div class="footer-tools-box">
        <template v-for="item in toolList" :key="item.key">
            <el-tooltip v-if="item.key === 'comment'" effect="dark" placement="top" popper-class="footer-tooltip">
                <template #content>
                    <div class="comment-box">
                        <span class="comment-item" @click="item.click('line')">线段</span>
                        <!-- <span class="comment-item" @click="item.click('arrow')">箭头</span> -->
                        <span class="comment-item" @click="item.click('pointerLine')">手绘线</span>
                        <span class="comment-item" @click="item.click('word')">文字</span>
                        <span class="comment-item" @click="item.click('rect')">矩形</span>
                        <span class="comment-item" @click="item.click('ellipse')">椭圆</span>
                    </div>
                </template>
                <div class="tool-box" @click="item.click">
                    <i :class="['iconfont', item.icon]"></i>
                </div>
            </el-tooltip>

            <el-tooltip v-else effect="dark" :content="item.title" placement="top" popper-class="footer-tooltip">
                <div class="tool-box" @click="item.click(item)">
                    <i
                        v-if="item.key === 'fullScreen'"
                        :class="['iconfont', isFullScreen ? 'icon-quanping' : 'icon-fullscreen-expand']"
                    ></i>
                    <i v-else :class="['iconfont', item.icon, item.status === 'using' ? 'usingIcon' : '']"></i>
                </div>
            </el-tooltip>
        </template>
    </div>
</template>
<style scoped lang="less">
@import url('@/assets/common.less');
.footer-tools-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @toolBackgroundColor;
    position: absolute;
    bottom: 26px;
    padding: 0 10px;
}

.tool-box {
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0d1628;
    cursor: pointer;
    .iconfont {
        color: white;
        font-size: 30px;
        &:hover {
            color: #11c5fc !important;
        }
    }
}

.comment-box {
    display: flex;
    flex-direction: column;
    .comment-item {
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #29334b;
        margin: 5px 0;
        padding: 0 10px;
        border-radius: 6px;
        cursor: pointer;
    }
}

.usingIcon {
    color: #11c5fc !important;
}
</style>

<style>
.footer-tooltip {
    padding: 6px 6px;
    background: #0d1628 !important;
}

.footer-tooltip .el-popper__arrow::before {
    background: #0d1628 !important;
    right: 0;
}
</style>
