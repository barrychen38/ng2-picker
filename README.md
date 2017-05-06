## Ng2Picker

这个项目是使用[Angular CLI](https://github.com/angular/angular-cli)生成的，主要是*webpack*的一大堆配置嫌烦，所以就借着巨人的肩旁来快速开发。

### 简介

最近在用[Angular4](https://angular.io/)做一个项目，需要按照设计稿来实现一个类似 `iOS` 原生的 `select` 效果，所以在网上找了很久都没有找到可以匹配**Angular2**的插件，翻阅了**GitHub**很长时间都没有找到，于是找到了[这个](https://github.com/ustbhuangyi/picker)，而且没有任何依赖，打包后的版本只有 `32Kb` 左右，当然是经过了自己的一番改造。

> 在此非常🙏原作者对开源的贡献。

### 效果图

![picker](assets/picker.png)

需要看效果的可以把项目下载下来，安装好依赖的包，运行即可。可参考 `Angular CLI` 的开始步骤。

### 使用

在自己的模版文件里引入：

```html
<better-picker [inputWheelsData]="parentData" [show]="showPicker" (hide)="hidePicker($event)" (sendSelected)="receiveSelected($event)"></better-picker>
```

### 组件参数：

#### inputWheelsData: any[]

传入组件的需要显示的数据，是一个二维数组。

如果需要第一个选项显示为空，也就是出现一个横杠的显示，可以在数组里面加入一个空字符串。

```typescript
private parentData: any[] = [
  [
    '',
    'Apple',
    'Microsoft',
    'Google',
    'Facebook',
    'Airbnb'
  ]
];
```

#### show: boolean

激活和隐藏

#### hide: EventEmitter<any>

组件触发 `hide` 事件之后并向父组件传递隐藏事件参数。

新版本的 `Angular` 参数传递采用的是一种流的形式，所以只有一种方向的传递，因为我们选择了从父组件向子组件的传递方式，所以无法在子组件里改变传入的值并同时改变父组件的值，所以只能通过 `event emit` 的形式来改变父组件的值再传递给子组件，这么做确实比较复杂，目前我是没有想到什么好办法，主要也是刚起步，以后如有其他方法会改进。

#### sendSelected: EventEmitter<any>

用户选择滚动时触发的事件，并向父组件传递 `wheel` 和 `index`。

### To Do List

- [ ] 类似城市的三级联动，项目中已经写好了，这边会重新整理一下之后放上去