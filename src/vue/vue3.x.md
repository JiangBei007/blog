---
sidebar: auto
---

# Vue 3.x

## Vue 3 对比 Vue 2 的不同与优化

### 1. 响应式系统

- **Vue 2**: 使用 Object.defineProperty 实现响应式，存在无法监听对象新增/删除属性、数组索引和长度变化的问题
- **Vue 3**: 使用 Proxy 实现响应式，解决了上述问题，同时性能更好，内存占用更低

#### 为什么用 Proxy 代替 Object.defineProperty

1. **监听范围更广**：
   - Object.defineProperty 只能监听对象的特定属性
   - Proxy 可以监听整个对象的所有操作，包括新增、删除属性，以及数组的索引和长度变化

2. **性能更好**：
   - Object.defineProperty 需要遍历对象的所有属性并为每个属性定义 getter/setter
   - Proxy 只需要代理整个对象，不需要遍历属性，初始化性能更高
   - 对于大型对象，Proxy 的内存占用更低

3. **代码更简洁**：
   - Object.defineProperty 需要为每个属性单独处理，代码冗余
   - Proxy 可以统一处理所有属性的操作，代码更简洁

4. **支持更多操作**：
   - Proxy 支持 13 种拦截操作，包括 get、set、deleteProperty、has 等
   - Object.defineProperty 只支持 get 和 set

### 2. 代码编写区别

#### 选项式 API vs 组合式 API

**Vue 2 (选项式 API)**：

```javascript
// Vue 2 组件
export default {
  data() {
    return {
      count: 0,
      message: 'Hello',
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
  computed: {
    doubleCount() {
      return this.count * 2;
    },
  },
  watch: {
    count(newValue) {
      console.log('Count changed:', newValue);
    },
  },
  mounted() {
    console.log('Component mounted');
  },
};
```

**Vue 3 (组合式 API)**：

```javascript
// Vue 3 组件
import { ref, computed, watch, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const message = ref('Hello');

    const doubleCount = computed(() => count.value * 2);

    const increment = () => {
      count.value++;
    };

    watch(count, (newValue) => {
      console.log('Count changed:', newValue);
    });

    onMounted(() => {
      console.log('Component mounted');
    });

    return {
      count,
      message,
      doubleCount,
      increment,
    };
  },
};

// 或者使用 <script setup>
// <script setup>
// import { ref, computed, watch, onMounted } from 'vue'
//
// const count = ref(0)
// const message = ref('Hello')
//
// const doubleCount = computed(() => count.value * 2)
//
// const increment = () => {
//   count.value++
// }
//
// watch(count, (newValue) => {
//   console.log('Count changed:', newValue)
// })
//
// onMounted(() => {
//   console.log('Component mounted')
// })
// </script>
```

### 3. 虚拟 DOM 更新优化

**Vue 2 虚拟 DOM 更新**：

- 采用全量对比，即使只修改了一个属性，也会对比整个组件树
- 没有静态节点标记，每次更新都需要对比所有节点
- 缺乏块级优化，无法跳过静态节点

**Vue 3 虚拟 DOM 更新优化**：

1. **静态提升**：
   - 编译时识别静态节点和静态属性，将其提升到渲染函数外部
   - 避免每次渲染都重新创建这些节点和属性

2. **补丁标记**：
   - 编译时为动态节点添加补丁标记（patch flag）
   - 运行时根据标记只更新必要的属性，跳过不需要更新的部分

3. **块级更新**：
   - 将模板划分为多个块，每个块包含动态节点
   - 只更新包含动态节点的块，跳过完全静态的块

4. **缓存事件处理函数**：
   - 编译时缓存事件处理函数，避免每次渲染都创建新的函数引用

5. **Fragment 支持**：
   - 支持多个根节点，减少不必要的包裹元素
   - 减少 DOM 节点数量，提高渲染性能

#### 虚拟 DOM 更新示例对比

**Vue 2**：

```javascript
// 编译后的渲染函数
function render() {
  return _c(
    'div',
    {
      attrs: { id: 'app' },
    },
    [
      _c('h1', [_v('Hello ' + _s(this.name))]),
      _c('p', [_v('Count: ' + _s(this.count))]),
    ],
  );
}
```

**Vue 3**：

```javascript
// 编译后的渲染函数
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', { id: 'app' }, [
      _createElementVNode(
        'h1',
        null,
        'Hello ' + _toDisplayString(_ctx.name),
        1 /* TEXT */,
      ),
      _createElementVNode(
        'p',
        null,
        'Count: ' + _toDisplayString(_ctx.count),
        1 /* TEXT */,
      ),
    ])
  );
}
```

可以看到，Vue 3 的渲染函数添加了 patch flag（如 `1 /* TEXT */`），用于标记动态内容的类型，运行时可以根据这些标记进行精准更新。

### 3. 依赖收集和更新机制对比

#### Vue 2 的依赖收集和更新

**依赖收集**：

- Vue 2 使用 `Object.defineProperty` 为每个属性定义 getter/setter
- 当组件渲染时，会触发 getter，将当前组件的 watcher 收集到依赖列表中
- 每个属性都有一个依赖列表，存储着所有依赖该属性的 watcher

**更新机制**：

- 当属性值变化时，触发 setter，通知所有依赖该属性的 watcher
- watcher 触发组件重新渲染
- 由于使用的是 Object.defineProperty，无法监听新增/删除属性，需要使用 `Vue.set` 或 `this.$set` 来手动触发更新

**问题**：

- 初始化时需要遍历对象所有属性，性能开销大
- 无法自动监听对象新增/删除属性
- 无法监听数组索引和长度变化
- 依赖收集粒度较粗，可能导致不必要的更新

#### Vue 3 的依赖收集和更新

**依赖收集**：

- Vue 3 使用 `Proxy` 代理整个对象，在 `get` 操作时进行依赖收集
- 当组件渲染时，会触发 Proxy 的 `get` 拦截，将当前组件的 effect 收集到依赖集合中
- 使用 WeakMap 存储对象到依赖集合的映射，使用 Map 存储属性到依赖集合的映射

**更新机制**：

- 当属性值变化时，触发 Proxy 的 `set` 拦截，通知所有依赖该属性的 effect
- effect 触发组件重新渲染
- 由于使用的是 Proxy，可以自动监听对象新增/删除属性，以及数组的索引和长度变化

**优化**：

- 初始化时不需要遍历对象所有属性，性能开销小
- 可以自动监听对象新增/删除属性
- 可以自动监听数组索引和长度变化
- 依赖收集粒度更细，只收集实际使用的属性
- 支持嵌套对象的响应式处理，不需要深度遍历

#### 具体实现差异

**Vue 2**：

```javascript
// 简化版依赖收集
function defineReactive(obj, key, val) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        dep.notify();
      }
    },
  });
}

// Watcher 类
class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(expOrFn);
    this.value = this.get();
  }

  get() {
    Dep.target = this;
    const value = this.getter.call(this.vm, this.vm);
    Dep.target = null;
    return value;
  }

  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}
```

**Vue 3**：

```javascript
// 简化版依赖收集
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const result = Reflect.get(target, key, receiver);
      // 依赖收集
      track(target, key);
      // 递归处理嵌套对象
      if (typeof result === 'object' && result !== null) {
        return reactive(result);
      }
      return result;
    },
    set(target, key, value, receiver) {
      const oldValue = target[key];
      const result = Reflect.set(target, key, value, receiver);
      // 触发更新
      if (oldValue !== value) {
        trigger(target, key);
      }
      return result;
    },
    deleteProperty(target, key) {
      const hadKey = hasOwn(target, key);
      const result = Reflect.deleteProperty(target, key);
      // 触发更新
      if (hadKey) {
        trigger(target, key);
      }
      return result;
    },
  });
}

// 依赖收集
function track(target, key) {
  if (activeEffect) {
    const targetMap = reactiveMap.get(target);
    if (!targetMap) {
      reactiveMap.set(target, (targetMap = new Map()));
    }
    let depsMap = targetMap.get(key);
    if (!depsMap) {
      targetMap.set(key, (depsMap = new Set()));
    }
    depsMap.add(activeEffect);
    activeEffect.deps.push(depsMap);
  }
}

// 触发更新
function trigger(target, key) {
  const targetMap = reactiveMap.get(target);
  if (!targetMap) return;
  const depsMap = targetMap.get(key);
  if (depsMap) {
    const effects = [...depsMap];
    effects.forEach((effect) => effect());
  }
}
```

### 4. 体积优化

- **Vue 3**: 引入 Tree-shaking，只打包使用的功能，减小 bundle 体积
- **Vue 2**: 无法实现真正的 Tree-shaking

### 5. 类型支持

- **Vue 3**: 使用 TypeScript 重写，类型定义更完善，支持更好的类型推导
- **Vue 2**: 类型定义相对不完善

### 6. 生命周期

- **Vue 3**: 保留大部分生命周期钩子，新增 setup()，并将 beforeUnmount 替换为 onBeforeUnmount，unmounted 替换为 onUnmounted
- **Vue 2**: 传统生命周期钩子

### 7. 其他优化

- **Vue 3**: 支持 Fragment（多个根节点）、Teleport（组件内容传送）、Suspense（异步组件加载状态管理）
- **Vue 2**: 不支持这些特性

## Vue 3 版本更新记录

### Vue 3.0.0 (2020-09-18)

- 正式发布 Vue 3.0
- 引入 Composition API
- 新的响应式系统
- 支持 Fragment、Teleport、Suspense
- 模板编译优化

### Vue 3.1.0 (2021-06-07)

- 改进 Composition API 的类型推断
- 新增 `createApp().mount()` 的返回值类型
- 修复多个 bug

### Vue 3.2.0 (2021-08-05)

- 引入 `<script setup>` 语法糖
- 引入 `<style scoped>` 的 CSS 变量注入
- 改进 TypeScript 支持
- 性能优化

### Vue 3.3.0 (2022-05-20)

- 改进 `<script setup>` 的类型推断
- 新增 `defineOptions` 宏
- 新增 `defineSlots` 宏
- 修复多个 bug

### Vue 3.4.0 (2023-01-26)

- 改进响应式系统性能
- 优化编译输出
- 修复多个 bug

### Vue 3.5.0 (2023-11-16)

- 改进 `v-for` 的性能
- 优化模板编译
- 修复多个 bug

### Vue 3.6.0 (2024-07-22)

- 改进 Composition API 的使用体验
- 优化类型推导
- 修复多个 bug

## Vue 3 开发注意事项

### 1. 响应式系统注意事项

1. **ref 和 reactive 的使用场景**：
   - `ref` 用于基本类型和对象类型，需要通过 `.value` 访问和修改
   - `reactive` 只用于对象类型，不需要 `.value`，但不能直接替换整个对象
   - 对于需要频繁替换的对象，建议使用 `ref`

2. **响应式丢失问题**：
   - 解构响应式对象会导致响应式丢失，需要使用 `toRefs` 或 `toRef` 来保持响应式
   - 示例：
     ```javascript
     // 响应式丢失
     const { count } = reactive({ count: 0 });
     // 保持响应式
     const { count } = toRefs(reactive({ count: 0 }));
     ```

3. **数组和对象的响应式**：
   - Vue 3 可以自动监听数组的索引和长度变化
   - 可以自动监听对象的新增和删除属性
   - 但对于深层嵌套对象，需要注意性能问题

### 2. Composition API 使用注意事项

1. **setup 函数**：
   - setup 函数在组件创建之前执行，此时无法访问 `this`
   - setup 函数的返回值会暴露给模板和其他选项式 API
   - 不需要显式返回，声明的变量和函数会自动暴露

2. **生命周期钩子**：
   - Composition API 中的生命周期钩子需要从 vue 中导入
   - 命名与选项式 API 不同，如 `onMounted` 对应 `mounted`
   - setup 函数中可以使用多个相同的生命周期钩子，它们会按顺序执行

3. **依赖注入**：
   - 使用 `provide` 和 `inject` 进行依赖注入
   - 注入的值是响应式的
   - 建议为注入的值提供默认值

### 3. 模板和渲染注意事项

1. **Fragment**：
   - Vue 3 支持多个根节点，不需要额外的包裹元素
   - 但在使用 v-if/v-else-if/v-else 时，多个根节点需要使用相同的标签

2. **Teleport**：
   - 使用 Teleport 可以将组件内容传送到 DOM 中的任意位置
   - 注意 Teleport 的目标元素必须存在于 DOM 中

3. **Suspense**：
   - Suspense 用于处理异步组件的加载状态
   - 目前仍处于实验阶段，使用时需要注意兼容性

### 4. 性能优化注意事项

1. **计算属性和侦听器**：
   - 计算属性会缓存结果，只在依赖变化时重新计算
   - 对于复杂的计算，建议使用计算属性
   - 侦听器用于执行副作用操作，如 API 调用

2. **虚拟 DOM 优化**：
   - 避免在模板中使用复杂的表达式
   - 使用 v-memo 指令缓存模板片段
   - 合理使用 key 属性，避免不必要的 DOM 更新

3. **组件优化**：
   - 使用 `defineAsyncComponent` 实现组件懒加载
   - 对于频繁渲染的组件，考虑使用 `v-once` 或 `v-memo`
   - 合理使用 `shallowRef` 和 `shallowReactive` 减少响应式开销

### 5. 迁移注意事项

1. **选项式 API 兼容性**：
   - Vue 3 仍然支持选项式 API，但建议使用 Composition API
   - 部分选项式 API 的行为可能有所变化，如 `data` 不再是函数时的处理

2. **全局 API 变更**：
   - Vue 3 中的全局 API 已迁移到 `createApp()` 返回的应用实例上
   - 如 `Vue.use()` 变为 `app.use()`，`Vue.component()` 变为 `app.component()`

3. **过滤器移除**：
   - Vue 3 移除了过滤器功能，建议使用计算属性或方法替代

4. **键码修饰符变更**：
   - Vue 3 移除了数字键码修饰符，建议使用按键名称

## 总结

Vue 3 通过引入 Composition API、新的响应式系统、编译优化等特性，解决了 Vue 2 中存在的问题，同时提供了更好的开发体验和性能表现。每个版本的更新都在不断改进和优化这些特性，使得 Vue 3 成为一个更加成熟和可靠的前端框架。

在开发过程中，需要注意响应式系统的使用、Composition API 的最佳实践、模板和渲染的优化，以及从 Vue 2 迁移时的兼容性问题。遵循这些注意事项，可以更好地发挥 Vue 3 的优势，开发出高性能、可维护的应用。
