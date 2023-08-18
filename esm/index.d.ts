import * as THREE from 'three';

declare class Vector2 {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    distanceTo(v: Vector2): number;
    distanceToSquared(v: Vector2): number;
    sub(v: Vector2): this;
    normalize(): this;
    divideScalar(scalar: number): this;
    multiplyScalar(scalar: number): this;
    length(): number;
}
declare class Vector3 extends Vector2 {
    z: number;
    constructor(x?: number, y?: number, z?: number);
    distanceTo(v: Vector3): number;
    distanceToSquared(v: Vector3): number;
    sub(v: Vector3): this;
    normalize(): this;
    divideScalar(scalar: number): this;
    multiplyScalar(scalar: number): this;
    length(): number;
}

interface textObj {
    text: string;
    position: Vector3;
}
declare class Viewer {
    private font;
    cadUrl: string;
    container: HTMLElement;
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera | null;
    controls: any;
    addMoveEvent: Function;
    deleteMoveEvent: Function;
    modelGroupByLayer: object;
    textData: textObj[];
    finishCallBack: Function;
    progressCallBack: Function;
    progress: number;
    isLoadingLocal: boolean;
    isLoadingFinish: boolean;
    constructor(container: HTMLElement, cadUrl: string);
    private initViewer;
    private loadOurBimCADFile;
    private getJsonFile;
    private loadLocalFile;
    private draw;
    private changeProgress;
    registFinishCallBack(callback: Function): void;
    registProgressCallBack(callback: Function): void;
    update(): void;
}

interface searchItem {
    index: number;
    text: string;
}
declare class Controller {
    private Viewer;
    private comment;
    constructor(Viewer: Viewer);
    private reShowComment;
    /**
     * 主视图
     */
    HomeView(): void;
    /**
     * 框选放大
     */
    selectBox(startCallBack?: Function, endCallBack?: Function): void;
    /**
     * 取消框选放大
     */
    cancelSelectBox(): void;
    /**
     * 切换图纸背景颜色
     */
    changeBackground(): void;
    /**
     * 全屏
     * @param container 图纸容器
     */
    fullScreen(container: HTMLElement): void;
    /**
     * 退出全屏
     */
    exitFullScreen(): void;
    /**
     * 获取所有图层数据
     * @returns 所有图层数据
     */
    getLayerList(): {
        Allkeys: string[];
        visibleKeys: string[];
    };
    /**
     * 通过keys显示图层
     * @param keys 需要显示的图层key,可传单个的key,也可传keys数组
     */
    showLayerBykeys(keys: string[] | string): void;
    /**
     * 通过keys隐藏图层
     * @param keys 需要隐藏的图层key,可传单个的key,也可传keys数组
     */
    hiddenLayerBykeys(keys: string[] | string): void;
    /**
     * 显示所有图层
     */
    showAllLayer(): void;
    /**
     * 隐藏所有图层
     */
    hiddenAllLayer(): void;
    /**
     * 获取搜索结果
     */
    getSearchList(text: string): searchItem[];
    /**
     * 文字定位
     */
    positionByText(searchIndex: number): void;
    /**
     * 添加标注：该方法只在使用ourbim上传并管理图纸时才有效
     */
    addComment(type: string): void;
    /**
     * 显示隐藏批注：该方法只在使用ourbim上传并管理图纸时才有效
     */
    showOrHiddenComment(): void;
    /**
     * 保存批注数据：该方法只在使用ourbim上传并管理图纸时才有效
     */
    saveComment(): void;
}

export { Controller, Viewer };
