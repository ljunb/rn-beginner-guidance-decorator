## rn-beginner-guidance-decorator

[![npm](https://img.shields.io/npm/v/rn-beginner-guidance-decorator.svg)](https://www.npmjs.com/package/rn-beginner-guidance-decorator)
[![npm](https://img.shields.io/npm/dm/rn-beginner-guidance-decorator.svg)](https://www.npmjs.com/package/rn-beginner-guidance-decorator)
[![npm](https://img.shields.io/npm/dt/rn-beginner-guidance-decorator.svg)](https://www.npmjs.com/package/rn-beginner-guidance-decorator)
[![npm](https://img.shields.io/npm/l/rn-beginner-guidance-decorator.svg)](https://github.com/ljunb/rn-beginner-guidance-decorator/blob/master/LICENSE)
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
Name             | Default     | Description
---------------- | ----------- | -----------
displayName    |  | 表示当前注入后的高阶组件名称，必须唯一，必传
dismissEnabled | true | 表示是否支持点击屏幕任意位置关闭引导组件

## 引导页组件的定义
参数 `dismissEnabled` 适用于不点击屏幕任一位置隐藏引导页的情况。如引导页存在多步骤操作，需要根据时机自定义隐藏，则引导页组件应向外暴露 `onDismiss` 的 `props`。示例：

```
export default class NewerGuideDialog extends Component {
  static propTypes = {
    onDismiss: PropTypes.func, // 暴露该 props
  };

  /**
   * 按需调用 this.props.onDismiss() 来隐藏引导页
   **/
  handleDismiss = () => {
    const { onDismiss } = this.props;
    onDismiss && onDismiss();
  };

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.text} onPress={this.handleDismiss}>Dismiss</Text>
      </View>
    );
  }
}
```

同时在引用组件时，`dismissEnabled` 设置为 `false`。如：

```
import { injectGuidance } from 'rn-beginner-guidance-decorator';
import NewerGuideDialog from './components/NewerGuideDialog';

@injectGuidance(NewerGuideDialog, {displayName: 'HomePage', dismissEnabled: false})
export default class HomePage extends Component {
  ...
}

```

## 原则

* 组件支持 `Decorator` 语法调用，前提是已经配置了相应的语法支持
* 调用 `injectGuidance(GuidanceComponent, {displayName})(TargetComponent)` 注入时，`displayName` 是必传的，将用于生成高阶组件的名称和本地缓存标识位
