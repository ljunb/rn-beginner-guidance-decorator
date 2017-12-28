## rn-beginner-guidance-decorator
这是一个可以更快速、简便地为 React Naitve App 添加新手引导的轻便 `Decorator` 。App 中可能有多个页面需要添加新手引导，且实现逻辑大同小异，如果每个页面都实现一遍，代码冗余，耦合度也高。使用该组件，只要在目标页面，按需注入需要的新手引导组件即可。

## 安装

使用 `npm`：
```
npm install rn-beginner-guidance-decorator --save
```
用 `yarn`：
```
yarn add rn-beginner-guidance-decorator
```

## 使用示例

```
import { injectGuidance } from 'rn-beginner-guidance-decorator';
import BeginnerGuidanceView from './components/BeginnerGuidanceView';

// 1 Decorator 方式
@injectGuidance(BeginnerGuidanceView, {displayName: 'HomePage', dismissEnabled: false})
export default class HomePage extends Component {
  ...
}

// 2 function 方式
class HomePage extends Component {}
or
const HomePage = () => {}
export default injectGuidance(BeginnerGuidanceView, {displayName: 'HomePage'})(HomePage)

```

## 涉及参数说明
Name             | Default     | Description
---------------- | ----------- | -----------
displayName    |  | 表示当前注入后的高阶组件名称，必须唯一，必传
dismissEnabled | true | 表示是否支持点击屏幕任意位置关闭引导组件


## 原则
> * 组件支持 `Decorator` 语法调用，前提是已经配置了相应的语法支持
> * 调用 `injectGuidance(GuidanceComponent, {displayName})(TargetComponent)` 注入时，`displayName` 是必传的，将用于生成高阶组件的名称和本地缓存标识位
> * 在封装新手引导组件时，按需暴露 `onDismiss` ，具体的规则是：如果 `dismissEnabled` 设置为 `true` ，则可以不用添加该回调函数；否则必须添加
