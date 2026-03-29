---
sidebar: auto
---


# react


## 自定义hook

**说明**
我们只实现一个简单的功能，首先请求数据，并且在数据请求过程中展示loading，数据请求结束关闭loading，并展示数据

### class写法

```js
import React from 'react';
import axios from "axios"
import { Spin  } from 'antd';

class App entends React.Component{
	state = {
		visibility:false,
		msg:null
	}
	componentDidMount(){
		this.init()
	}
	async init(){
		this.setState({
			visibility:true
		})
		let msg = ""
		try{
			msg = await axios.get('http://127.0.0.1:3000/signin')
		}catch(){
			msg = "请求失败"
		}
		finally {
			this.setState({
				visibility:false,
				msg
			})
		}
		
	}
	render(){
		const { msg,visibility } = this.state
		return <div className="App">
			<Spin spinning={visibility}>
				我是好大一段文字啊
				{ msg }
			</Spin>
		</div>
	}
}


```


### hook写法


```js
import React,{ useState, useEffect } from "react"

function App(){
	const [visibility,setVisibility] = useState(true);
	const [msg,setMsg] = useState("");
	const init = async ()=>{
		setVisibility(true);
		let resMsg = ''
		try{
			resMsg = await axios.get('http://127.0.0.1:3000/signin')
		}catch(){
			resMsg = "请求失败"
		}
		finally {
			setVisibility(false);
			setMsg(resMsg);
		}
	}
	useEffect(()=>{
		init()
	},[])
	
	return <div className="App">
		<Spin spinning={visibility}>
			我是好大一段文字啊
			{ msg }
		</Spin>
	</div>
	
}


```

### 自定义hook写法

```js

function useGetMsg(){
	const [visibility,setVisibility] = useState(true);
	const [msg,setMsg] = useState([]);
	useEffect(()=>{
		axios.get('http://127.0.0.1:3000/signin').then(res=>{
			setMsg(res);
			setVisibility(false);
		})
	},[])
	return [visibility,msg]
}
function App() {
	const [visibility,msg] = useGetMsg()
	
  return (
    <div className="App">
		<Spin spinning={visibility}>
			我是好大一段文字啊
			{ msg }
		</Spin>
    </div>
  );
}


```

## React 事件委托机制

### 事件委托的基本原理

React 实现了一套合成事件系统，通过事件委托的方式来处理DOM事件。其核心原理是：

1. **事件委托**：React 不在每个DOM元素上直接绑定事件监听器，而是将所有事件都委托到根节点（React 17之前是document，React 17之后是React根节点）
2. **合成事件**：React 会创建一个合成事件对象（SyntheticEvent），它模拟了原生DOM事件的接口，但提供了跨浏览器的一致性
3. **事件冒泡**：事件会按照React组件树的层次结构冒泡，而不是DOM树的层次结构

### React 17 之前的事件委托

在React 17之前，所有事件都委托到document对象上：

```js
// React 16及之前的事件委托机制
document.addEventListener('click', function(e) {
  // 处理事件冒泡和分发
});
```

**优点**：
- 减少事件监听器数量，提高性能
- 统一的事件处理机制

**缺点**：
- 可能与其他库的事件处理产生冲突
- 在iframe等场景下可能出现问题
- 事件处理顺序可能与预期不符

### React 17 的事件委托变更

React 17 对事件委托机制进行了重大变更，将事件委托的目标从document改为React根节点：

```js
// React 17的事件委托机制
const rootNode = document.getElementById('root');
rootNode.addEventListener('click', function(e) {
  // 处理事件冒泡和分发
});
```

**变更原因**：
1. **减少全局冲突**：避免与其他库在document上的事件处理冲突
2. **更好的iframe支持**：在iframe中，事件不会冒泡到主文档的document
3. **更可预测的事件处理**：事件处理顺序更加符合直觉
4. **渐进式升级**：为后续版本的改进做准备

### React 事件系统的内部工作原理

1. **事件注册**：React在组件挂载时，会在根节点注册必要的事件监听器
2. **事件触发**：当用户与DOM交互时，事件会冒泡到根节点
3. **事件分发**：React会根据事件类型和目标元素，找到对应的组件和事件处理函数
4. **合成事件创建**：React会创建一个合成事件对象，包含与原生事件相同的属性和方法
5. **事件处理**：调用组件的事件处理函数，传入合成事件对象
6. **事件池**：React会重用合成事件对象，提高性能（在React 17中已移除事件池）

### 事件委托的性能优势

1. **减少内存占用**：只需要在根节点维护少量事件监听器
2. **提高事件处理速度**：避免在每个元素上绑定和解绑事件
3. **动态元素支持**：新添加的元素不需要重新绑定事件
4. **跨浏览器兼容性**：React处理了不同浏览器的事件差异

### 注意事项

1. **事件冒泡**：在React中，事件冒泡是基于组件树的，而不是DOM树
2. **事件默认行为**：需要使用`e.preventDefault()`来阻止默认行为
3. **事件停止传播**：需要使用`e.stopPropagation()`来阻止事件冒泡
4. **原生事件**：可以通过`e.nativeEvent`访问原生DOM事件
5. **ref引用**：对于需要直接操作DOM的场景，可以使用ref

### 实际应用示例

```js
// 传统DOM事件绑定
const button = document.getElementById('btn');
button.addEventListener('click', handleClick);

// React事件处理
function Button() {
  const handleClick = (e) => {
    console.log('Button clicked', e);
  };
  
  return <button onClick={handleClick}>Click me</button>;
}
```

### 事件委托的实现原理与设计考量

#### 核心实现步骤

1. **事件监听器注册**
   - React在组件挂载时，会在根节点（React 17之前是document，之后是React根节点）注册必要的事件监听器
   - 只注册常用事件类型（如click、input、change等），而不是所有可能的事件

2. **事件捕获与冒泡**
   - 当用户与DOM元素交互时，事件会从根节点开始捕获，然后冒泡回根节点
   - React利用这一机制，在事件冒泡到根节点时进行处理

3. **事件分发机制**
   - React维护了一个事件分发系统，根据事件目标（target）和事件类型，找到对应的组件
   - 使用组件树结构来确定事件处理的顺序，模拟事件在组件间的冒泡

4. **合成事件创建**
   - React创建SyntheticEvent对象，封装原生事件，提供统一的API
   - 合成事件包含与原生事件相同的属性和方法（如target、preventDefault、stopPropagation等）

5. **事件处理函数调用**
   - 根据组件树的层次结构，从事件目标组件开始，依次调用父组件的事件处理函数
   - 遵循React的事件冒泡机制，而不是DOM的冒泡机制

#### 设计考量

1. **性能优化**
   - **减少事件监听器数量**：传统DOM事件绑定会在每个元素上创建监听器，而事件委托只需要在根节点维护少量监听器
   - **内存占用降低**：减少了监听器的数量，从而减少了内存使用
   - **事件处理效率**：避免了在每个元素上绑定和解绑事件的开销

2. **跨浏览器兼容性**
   - **统一事件API**：不同浏览器的事件实现存在差异，React通过合成事件提供了一致的API
   - **事件处理标准化**：处理了浏览器间的事件差异，如IE的attachEvent与标准的addEventListener

3. **开发体验**
   - **声明式事件处理**：使用JSX语法直接在组件上声明事件处理函数，代码更简洁
   - **组件化思考**：事件处理与组件逻辑紧密结合，符合组件化开发思路
   - **自动绑定**：在类组件中，事件处理函数会自动绑定this（箭头函数）或需要手动绑定

4. **架构灵活性**
   - **事件系统可扩展**：React的事件系统是可扩展的，可以添加自定义事件类型
   - **与React协调器集成**：事件处理与React的协调算法（Fiber）紧密集成，支持异步渲染

5. **安全性**
   - **事件池**：React 16及之前使用事件池重用合成事件对象，减少内存分配（React 17移除了事件池）
   - **防止事件冲突**：通过事件委托到根节点，减少了与其他库的事件处理冲突

#### 为什么选择事件委托

1. **性能优势**：事件委托比直接绑定更高效，特别是在大型应用中
2. **动态元素支持**：新添加的元素不需要重新绑定事件，自动继承事件处理
3. **代码简洁**：事件处理逻辑集中管理，代码更易于维护
4. **跨浏览器兼容**：统一的事件处理机制，避免了浏览器差异
5. **与React架构匹配**：事件委托与React的组件化架构和协调算法相得益彰

#### 技术挑战与解决方案

1. **事件目标确定**：React需要准确识别事件的目标组件，尤其是在复杂的组件树中
   - 解决方案：使用DOM元素与组件实例的映射关系

2. **事件冒泡控制**：需要实现与DOM事件冒泡类似但又独立的组件树冒泡机制
   - 解决方案：维护组件树结构，模拟事件冒泡路径

3. **合成事件性能**：创建和处理合成事件需要考虑性能
   - 解决方案：事件池（React 16）、对象池复用（React 17+）

4. **与原生事件的交互**：需要处理合成事件与原生事件的关系
   - 解决方案：通过e.nativeEvent提供原生事件访问

### 总结

React的事件委托机制是其核心设计之一，通过巧妙地利用浏览器的事件冒泡原理，结合自身的组件树结构，实现了高效、跨浏览器兼容的事件处理系统。这种设计不仅提高了应用性能，也改善了开发体验，是React成为主流前端框架的重要因素之一。

## React 版本更新历史与演进分析

### React 15 (2016)

#### 主要更新
- **引入 PropTypes 类型检查**：用于运行时类型验证
- **改进服务器端渲染**：支持组件返回数组
- **ReactDOM.render() 方法**：标准化渲染API
- **废弃旧的生命周期方法**：为后续版本做准备

#### 更新原因
- 提高代码质量和可维护性
- 解决服务器端渲染的限制
- 统一API接口，简化使用
- 为后续的架构升级做铺垫

### React 16 (2017)

#### 主要更新
- **Fiber 架构**：全新的协调算法，支持异步渲染
- **错误边界**：防止组件错误导致整个应用崩溃
- **Portal**：允许组件渲染到DOM树的任意位置
- **片段 (Fragments)**：支持返回多个元素而不需要包裹div
- **Context API**：简化组件间数据传递

#### 更新原因
- **性能优化**：Fiber架构支持时间切片，提高大型应用的响应速度
- **稳定性提升**：错误边界机制增强应用可靠性
- **开发体验**：简化组件结构，减少不必要的DOM节点
- **状态管理**：提供更简洁的跨组件通信方案

## Fiber 架构详解

### Fiber 架构概述

Fiber 是 React 16 中引入的一种全新的协调算法和架构，它彻底改变了 React 的渲染机制。Fiber 的核心目标是解决 React 在大型应用中的性能问题，特别是主线程阻塞导致的用户交互卡顿。

### 为什么需要 Fiber 架构

#### 1. 解决同步渲染的性能问题

在 React 15 及之前的版本中，React 使用的是同步递归的渲染方式：

```js
// React 15 的同步渲染
function render(vdom) {
  if (typeof vdom.type === 'string') {
    const dom = document.createElement(vdom.type);
    vdom.props.children.forEach(child => render(child));
    return dom;
  } else {
    const component = new vdom.type(vdom.props);
    const renderedVdom = component.render();
    return render(renderedVdom);
  }
}
```

**问题**：
- 递归调用一旦开始就无法中断
- 大型组件树的渲染会阻塞主线程
- 用户交互无法得到及时响应
- 动画和滚动等高优先级任务会被延迟

#### 2. 支持优先级调度

现代 Web 应用的需求越来越复杂，不同类型的任务有不同的优先级：
- 用户交互（点击、输入）：高优先级
- 数据获取：中优先级
- 页面渲染：低优先级

Fiber 架构引入了优先级调度机制，可以优先处理高优先级任务。

#### 3. 实现时间切片

Fiber 架构将渲染工作分解为多个小的工作单元，可以在多个帧中执行：
- 每个工作单元执行时间很短（通常 < 16ms）
- 在每个工作单元完成后检查是否需要让出控制权
- 如果有更高优先级的任务，可以中断当前任务

### Fiber 节点结构

Fiber 节点是 React 组件树中每个节点的内部表示，它包含了组件的所有信息以及渲染过程中需要的状态。

#### Fiber 节点的核心属性

```js
const fiberNode = {
  // 组件类型信息
  type: null,           // 组件类型（函数、类、字符串等）
  key: null,            // React key
  elementType: null,    // 元素类型
  
  // 树结构信息
  return: null,         // 父节点
  child: null,          // 第一个子节点
  sibling: null,        // 下一个兄弟节点
  index: 0,             // 在兄弟节点中的索引
  
  // 状态信息
  memoizedProps: null,  // 上次渲染的 props
  memoizedState: null,  // 上次渲染的 state
  updateQueue: null,    // 更新队列
  
  // 副作用信息
  effectTag: 0,         // 副作用标记
  nextEffect: null,     // 下一个有副作用的节点
  firstEffect: null,    // 第一个有副作用的子节点
  lastEffect: null,     // 最后一个有副作用的子节点
  
  // 调度信息
  expirationTime: 0,     // 过期时间
  lanes: 0,             // 优先级车道
  
  // 其他信息
  ref: null,            // ref 引用
  alternate: null,      // 对应的 alternate fiber（用于双缓冲）
  mode: 0,              // 模式标记
};
```

#### Fiber 树结构图

```
Root Fiber
├── child → App Fiber
│   ├── child → Header Fiber
│   │   ├── child → Logo Fiber
│   │   └── sibling → Nav Fiber
│   ├── sibling → Main Fiber
│   │   ├── child → ArticleList Fiber
│   │   │   ├── child → ArticleItem Fiber (index: 0)
│   │   │   ├── sibling → ArticleItem Fiber (index: 1)
│   │   │   └── sibling → ArticleItem Fiber (index: 2)
│   │   └── sibling → Sidebar Fiber
│   │       └── child → AdComponent Fiber
│   └── sibling → Footer Fiber
│       └── child → Copyright Fiber
```

#### Fiber 遍历顺序

Fiber 使用深度优先遍历算法，但可以中断和恢复：

```
遍历顺序：Root → App → Header → Logo → Nav → Main → ArticleList → 
         ArticleItem[0] → ArticleItem[1] → ArticleItem[2] → Sidebar → 
         AdComponent → Footer → Copyright
```

### Fiber 架构的实现原理

#### 1. 双缓冲机制

Fiber 使用双缓冲技术来维护两棵 Fiber 树：
- **current 树**：当前显示在屏幕上的 Fiber 树
- **workInProgress 树**：正在构建中的 Fiber 树

```js
// 双缓冲示例
function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  
  if (workInProgress === null) {
    // 首次渲染，创建新的 workInProgress
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    );
    workInProgress.elementType = current.elementType;
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // 复用已有的 workInProgress
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;
  }
  
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.memoizedProps = current.memoizedProps;
  
  return workInProgress;
}
```

#### 2. 工作循环

Fiber 的核心是工作循环，它负责执行渲染工作：

```js
function workLoopSync() {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

function workLoopConcurrent() {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
}

function shouldYield() {
  // 检查是否需要让出控制权
  return (
    getCurrentTime() >= deadline ||
    hasHigherPriorityWork()
  );
}
```

#### 3. 工作单元处理

每个 Fiber 节点都是一个工作单元，处理过程分为两个阶段：

```js
function performUnitOfWork(workInProgress) {
  // 阶段1：beginWork - 处理当前节点
  const next = beginWork(workInProgress);
  
  if (next === null) {
    // 没有子节点，进入阶段2
    completeUnitOfWork(workInProgress);
  } else {
    // 有子节点，继续处理子节点
    workInProgress = next;
  }
}

function completeUnitOfWork(workInProgress) {
  // 阶段2：completeWork - 完成当前节点
  const returnFiber = workInProgress.return;
  
  // 处理副作用
  if (workInProgress.effectTag !== NoEffect) {
    if (returnFiber.lastEffect !== null) {
      returnFiber.lastEffect.nextEffect = workInProgress;
    } else {
      returnFiber.firstEffect = workInProgress;
    }
    returnFiber.lastEffect = workInProgress;
  }
  
  // 继续处理兄弟节点或返回父节点
  if (workInProgress.sibling !== null) {
    workInProgress = workInProgress.sibling;
  } else {
    workInProgress = returnFiber;
  }
}
```

#### 4. 调度器

Fiber 使用调度器来管理任务的优先级和执行：

```js
// 调度器示例
function scheduleCallback(priorityLevel, callback) {
  const currentTime = getCurrentTime();
  
  const newTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime: currentTime,
    expirationTime: currentTime + timeoutForPriorityLevel(priorityLevel),
    sortIndex: -1,
  };
  
  // 根据优先级插入任务队列
  push(taskQueue, newTask);
  
  // 请求调度
  requestHostCallback(flushWork);
}

function flushWork(hasTimeRemaining, initialTime) {
  // 执行任务队列中的任务
  const currentTime = initialTime;
  
  while (taskQueue.length > 0) {
    const currentTask = peek(taskQueue);
    
    if (currentTask.expirationTime > currentTime) {
      // 任务还未过期，可以延迟执行
      break;
    }
    
    const callback = currentTask.callback;
    const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
    
    const continuationCallback = callback(didUserCallbackTimeout);
    
    if (typeof continuationCallback === 'function') {
      // 任务未完成，继续执行
      currentTask.callback = continuationCallback;
    } else {
      // 任务完成，从队列中移除
      pop(taskQueue);
    }
  }
}
```

### Fiber 的渲染阶段

Fiber 将渲染过程分为两个阶段：

#### 阶段1：Render Phase（可中断）

```js
function renderRoot(root) {
  // 创建 workInProgress 树
  const workInProgress = createWorkInProgress(root.current, null);
  
  // 执行工作循环
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress);
  }
  
  // 检查是否完成
  if (workInProgress !== null) {
    // 任务被中断，等待下次调度
    return RootIncomplete;
  }
  
  // 完成渲染，进入提交阶段
  return RootCompleted;
}
```

#### 阶段2：Commit Phase（不可中断）

```js
function commitRoot(root) {
  const finishedWork = root.finishedWork;
  
  // 提交阶段分为三个子阶段：
  
  // 1. before mutation：执行 DOM 操作前的副作用
  commitBeforeMutationEffects(finishedWork);
  
  // 2. mutation：执行 DOM 操作
  commitMutationEffects(finishedWork);
  
  // 3. layout：执行 DOM 操作后的副作用
  commitLayoutEffects(finishedWork);
  
  // 切换 current 树
  root.current = finishedWork;
}
```

### Fiber 与 Vue 的对比

#### Vue 的响应式系统

Vue 使用的是响应式系统，而不是 Fiber 架构：

```js
// Vue 3 的响应式系统
const state = reactive({
  count: 0,
  name: 'Vue'
});

// 自动追踪依赖
watchEffect(() => {
  console.log(state.count); // 自动追踪 state.count 的依赖
});

// 精确更新
state.count++; // 只更新依赖 state.count 的组件
```

#### 为什么 Vue 不需要 Fiber

1. **精确的依赖追踪**
   - Vue 的响应式系统可以精确追踪每个组件的依赖
   - 只有当依赖的数据发生变化时，对应的组件才会重新渲染
   - 避免了不必要的组件更新

2. **细粒度的更新**
   - Vue 可以精确到 DOM 节点级别的更新
   - 不需要重新渲染整个组件树
   - 性能开销相对较小

3. **编译时优化**
   - Vue 3 的编译器会进行静态提升和静态分析
   - 静态内容会被提升，避免重复创建
   - 动态部分会被标记，只更新动态部分

4. **不同的设计理念**
   - Vue：响应式 + 模板编译，注重精确更新
   - React：不可变数据 + 虚拟 DOM，注重可预测性

#### 对比总结

| 特性 | React Fiber | Vue 响应式 |
|------|-------------|------------|
| 更新机制 | 虚拟 DOM Diff | 响应式依赖追踪 |
| 更新粒度 | 组件级别 | 组件 + DOM 节点级别 |
| 性能优化 | 时间切片 + 优先级调度 | 精确依赖 + 编译优化 |
| 复杂度 | 较高 | 相对较低 |
| 可预测性 | 高 | 中等 |
| 学习曲线 | 陡峭 | 平缓 |

### Fiber 的优势与挑战

#### 优势

1. **更好的用户体验**
   - 避免主线程阻塞
   - 保证动画和交互的流畅性
   - 支持大型应用的复杂场景

2. **灵活的调度**
   - 支持优先级调度
   - 可以中断和恢复渲染
   - 更好的资源利用

3. **可扩展性**
   - 支持并发模式
   - 为未来的特性（如 Suspense）提供基础
   - 更好的错误处理

#### 挑战

1. **实现复杂度**
   - 双缓冲机制增加了复杂度
   - 需要维护两棵 Fiber 树
   - 调度和优先级管理复杂

2. **性能开销**
   - Fiber 节点比虚拟 DOM 节点更重
   - 双缓冲增加了内存使用
   - 调度器本身也有开销

3. **学习成本**
   - 开发者需要理解 Fiber 的工作原理
   - 调试和优化变得更复杂
   - 需要适应新的开发模式

### 总结

Fiber 架构是 React 为了解决大型应用性能问题而引入的重大创新。它通过时间切片、优先级调度和双缓冲机制，实现了可中断的渲染过程，大大提升了应用的响应性和用户体验。

与 Vue 的响应式系统相比，Fiber 架构更复杂但提供了更强的可预测性和扩展性。两种方案各有优势，选择哪种取决于具体的应用场景和团队偏好。

Fiber 架构不仅解决了当前的性能问题，也为 React 的未来发展（如并发模式、服务端组件等）奠定了基础，是 React 成为现代前端开发主流框架的重要技术支撑。

### React 16.8 (2019)

#### 主要更新
- **Hooks**：引入useState、useEffect等钩子函数
- **函数组件**：功能与类组件对等，支持状态和副作用
- **自定义Hooks**：代码复用的新方式

#### 更新原因
- **简化状态管理**：摆脱类组件的复杂性
- **提高代码复用**：自定义Hooks比高阶组件和渲染属性更简洁
- **改善开发体验**：函数式编程更符合现代JavaScript风格
- **减少Bundle大小**：Hooks比类组件更轻量

### React 17 (2020)

#### 主要更新
- **事件委托机制变更**：事件不再挂载到document，而是挂载到React根节点
- **JSX转换更新**：新的JSX转换不依赖React导入
- **渐进式升级**：作为"破坏性变更的垫脚石"

#### 更新原因
- **提高安全性**：事件委托到根节点减少全局冲突
- **简化代码**：新JSX转换减少样板代码
- **平滑升级路径**：为后续大版本更新做准备
- **更好的兼容性**：与其他框架更好地共存

### React 18 (2022)

#### 主要更新
- **并发特性**：自动批处理、Suspense改进
- **新的根API**：ReactDOM.createRoot()
- **Transitions**：区分紧急和非紧急更新
- **Suspense for Data Fetching**：正式支持数据获取
- **自动批处理**：跨事件和异步操作的批处理

#### 更新原因
- **性能提升**：并发特性使应用更响应
- **用户体验**：优先级调度改善交互流畅度
- **开发体验**：简化数据获取逻辑
- **未来扩展性**：为后续并发功能做准备

### React 19 (2024-2025)

#### 主要更新
- **Actions**：简化表单处理和数据提交
- **use** Hook：直接在组件中使用Promise和Context
- **Document Metadata**：支持SEO相关的元数据管理
- **Improved Server Components**：增强服务端组件功能
- **Enhanced Error Handling**：更强大的错误处理机制
- **useFormStatus** 和 **useFormState**：简化表单状态管理

#### 更新原因
- **开发体验**：简化常见场景的代码复杂度
- **性能优化**：更好的服务端渲染和客户端 hydration
- **SEO友好**：直接支持元数据管理
- **类型安全**：增强TypeScript支持
- **生态系统整合**：与现代前端工具更好地集成

### 技术演进趋势分析

1. **从命令式到声明式**：React的核心理念始终是声明式UI
2. **从类组件到函数组件**：Hooks的引入彻底改变了组件编写方式
3. **从同步到异步**：Fiber架构和并发特性实现更流畅的用户体验
4. **从客户端到服务端**：服务端组件的发展模糊了前后端界限
5. **从单一到生态**：React生态系统的完善和工具链的丰富

### 总结

React的版本演进始终围绕着以下核心目标：
- **性能优化**：从Fiber到并发特性，持续提升渲染性能
- **开发体验**：从Hooks到Actions，不断简化开发流程
- **用户体验**：通过优先级调度和批量更新，提供更流畅的交互
- **生态系统**：构建完整的工具链和最佳实践

每个版本的更新都有明确的技术目标和解决的问题，反映了前端开发领域的演进方向。


