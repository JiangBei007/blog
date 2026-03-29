# 设计模式实际应用例子

## 创建型设计模式

### 1. 单例模式 (Singleton Pattern)

**实际工作应用：**
- 全局状态管理（如 Redux store）
- 配置管理（应用配置、环境变量）
- 数据库连接池
- 日志系统

**框架例子：**
- Vuex 的 store
- React 的 Context API（全局状态）
- Node.js 的 `global` 对象

**代码示例：**
```javascript
// Vuex store 单例
const store = createStore({
  state: { count: 0 },
  mutations: { increment(state) { state.count++ } }
});

// 全局使用同一个 store 实例
app.use(store);
```

### 2. 发布订阅模式 (Publish-Subscribe Pattern)

**实际工作应用：**
- 事件总线
- 消息队列系统
- 跨组件通信
- 状态管理

**框架例子：**
- Node.js 的 `EventEmitter`
- Vue 的事件系统
- React 的 `EventEmitter` 实现
- 第三方库如 `eventemitter3`

**代码示例：**
```javascript
// Node.js EventEmitter
const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

// 订阅事件
eventEmitter.on('data', (data) => {
  console.log('Received data:', data);
});

// 发布事件
eventEmitter.emit('data', { message: 'Hello' });
```

### 3. 工厂模式 (Factory Pattern)

**实际工作应用：**
- 组件创建
- API 客户端创建
- 数据库连接创建
- 服务实例创建

**框架例子：**
- React 的 `createElement`
- Vue 的组件工厂
- Angular 的依赖注入系统

**代码示例：**
```javascript
// React 组件工厂
function createButton(type, text) {
  switch(type) {
    case 'primary':
      return <button className="btn-primary">{text}</button>;
    case 'secondary':
      return <button className="btn-secondary">{text}</button>;
    default:
      return <button>{text}</button>;
  }
}
```

### 4. 建造者模式 (Builder Pattern)

**实际工作应用：**
- 复杂表单构建
- 配置对象创建
- DOM 元素构建
- 测试数据生成

**框架例子：**
- jQuery 的链式调用
- Vue 的选项 API
- Builder 设计模式库

**代码示例：**
```javascript
// jQuery 链式调用
$('#element')
  .addClass('active')
  .css('color', 'red')
  .on('click', function() {
    console.log('Clicked');
  });
```

### 5. 原型模式 (Prototype Pattern)

**实际工作应用：**
- 对象克隆
- 深拷贝实现
- 性能优化（避免重复创建相似对象）

**框架例子：**
- JavaScript 的 `Object.create()`
- lodash 的 `cloneDeep()`
- React 的组件克隆

**代码示例：**
```javascript
// 使用 Object.create 实现原型模式
const personPrototype = {
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

function createPerson(name) {
  const person = Object.create(personPrototype);
  person.name = name;
  return person;
}

const john = createPerson('John');
john.greet(); // Hello, my name is John
```

## 结构型设计模式

### 1. 适配器模式 (Adapter Pattern)

**实际工作应用：**
- API 接口适配
- 第三方库集成
- 数据格式转换
- 旧系统与新系统集成

**框架例子：**
- axios 的适配器模式（支持不同环境）
- Redux 的中间件
- 各种库的兼容性层

**代码示例：**
```javascript
// API 适配器
class OldAPIClient {
  getUsers() {
    return fetch('/api/v1/users');
  }
}

class NewAPIClient {
  fetchUsers() {
    return fetch('/api/v2/users');
  }
}

class APIClientAdapter {
  constructor(client) {
    this.client = client;
  }

  getUsers() {
    if (this.client instanceof NewAPIClient) {
      return this.client.fetchUsers();
    }
    return this.client.getUsers();
  }
}
```

### 2. 装饰器模式 (Decorator Pattern)

**实际工作应用：**
- 功能增强
- 日志记录
- 权限控制
- 性能监控

**框架例子：**
- React 的高阶组件 (HOC)
- Vue 的 mixins
- TypeScript/JavaScript 的装饰器

**代码示例：**
```javascript
// React 高阶组件
function withAuthentication(WrappedComponent) {
  return function AuthComponent(props) {
    const isAuthenticated = checkAuth();
    if (!isAuthenticated) {
      return <LoginPage />;
    }
    return <WrappedComponent {...props} />;
  };
}

const ProtectedComponent = withAuthentication(MyComponent);
```

### 3. 代理模式 (Proxy Pattern)

**实际工作应用：**
- 图片懒加载
- 请求缓存
- 权限控制
- 远程代理

**框架例子：**
- JavaScript 的 `Proxy` 对象
- Vue 的响应式系统
- 各种缓存库

**代码示例：**
```javascript
// 使用 Proxy 实现缓存
const cache = new Map();
const apiProxy = new Proxy({}, {
  get(target, prop) {
    if (!cache.has(prop)) {
      cache.set(prop, fetchData(prop));
    }
    return cache.get(prop);
  }
});
```

### 4. 组合模式 (Composite Pattern)

**实际工作应用：**
- DOM 树操作
- 菜单系统
- 文件系统
- 组件树

**框架例子：**
- React 的组件树
- Vue 的组件树
- DOM API

**代码示例：**
```javascript
// React 组件树
function MenuItem({ title }) {
  return <li>{title}</li>;
}

function Menu({ children }) {
  return <ul>{children}</ul>;
}

// 使用
<Menu>
  <MenuItem title="Home" />
  <Menu title="Products">
    <MenuItem title="Item 1" />
    <MenuItem title="Item 2" />
  </Menu>
</Menu>
```

### 5. 外观模式 (Facade Pattern)

**实际工作应用：**
- API 封装
- 复杂系统简化
- 第三方库集成
- 服务层抽象

**框架例子：**
- jQuery 的 API
- Axios 的请求 API
- 各种 SDK 封装

**代码示例：**
```javascript
// API 外观
class APIFacade {
  constructor() {
    this.authAPI = new AuthAPI();
    this.userAPI = new UserAPI();
    this.productAPI = new ProductAPI();
  }

  async login(credentials) {
    return this.authAPI.login(credentials);
  }

  async getUserProfile() {
    return this.userAPI.getProfile();
  }

  async getProducts() {
    return this.productAPI.list();
  }
}

// 使用
const api = new APIFacade();
const user = await api.login({ username: 'admin', password: '123' });
```

### 6. 桥接模式 (Bridge Pattern)

**实际工作应用：**
- 跨平台组件
- 主题切换
- 多格式渲染
- 设备适配

**框架例子：**
- React Native 的桥接
- 各种跨平台 UI 库
- 主题系统

**代码示例：**
```javascript
// 主题系统
class Theme {
  getColor() { throw new Error('Method not implemented'); }
  getFont() { throw new Error('Method not implemented'); }
}

class LightTheme extends Theme {
  getColor() { return '#ffffff'; }
  getFont() { return '#000000'; }
}

class DarkTheme extends Theme {
  getColor() { return '#000000'; }
  getFont() { return '#ffffff'; }
}

class UIComponent {
  constructor(theme) {
    this.theme = theme;
  }
  render() { throw new Error('Method not implemented'); }
}

class Button extends UIComponent {
  render() {
    return `<button style="background: ${this.theme.getColor()}; color: ${this.theme.getFont()}">Click</button>`;
  }
}

// 使用
const lightButton = new Button(new LightTheme());
const darkButton = new Button(new DarkTheme());
```

### 7. 享元模式 (Flyweight Pattern)

**实际工作应用：**
- 大量相似对象
- 性能优化
- 内存优化
- 图标库

**框架例子：**
- React 的虚拟 DOM
- 各种图标库（如 Font Awesome）
- 游戏开发中的对象池

**代码示例：**
```javascript
// 图标享元工厂
class IconFactory {
  constructor() {
    this.icons = {};
  }

  getIcon(name) {
    if (!this.icons[name]) {
      this.icons[name] = new Icon(name);
    }
    return this.icons[name];
  }
}

// 使用
const factory = new IconFactory();
const icon1 = factory.getIcon('user');
const icon2 = factory.getIcon('user'); // 复用同一个实例
console.log(icon1 === icon2); // true
```

## 行为型设计模式

### 1. 观察者模式 (Observer Pattern)

**实际工作应用：**
- 事件系统
- 状态管理
- 数据绑定
- 发布订阅

**框架例子：**
- Vue 的响应式系统
- React 的 useState/useEffect
- RxJS

**代码示例：**
```javascript
// Vue 响应式系统（简化版）
class Observer {
  constructor(value) {
    this.value = value;
    this.dep = new Dep();
    this.walk(value);
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

// 当数据变化时，通知所有观察者
function defineReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      val = newVal;
      dep.notify();
    }
  });
}
```

### 2. 策略模式 (Strategy Pattern)

**实际工作应用：**
- 表单验证
- 排序算法
- 支付方式
- 日志策略

**框架例子：**
- 各种验证库
- 排序函数
- 支付网关集成

**代码示例：**
```javascript
// 支付策略
const paymentStrategies = {
  paypal(amount) {
    console.log(`Paying ${amount} via PayPal`);
  },
  creditCard(amount) {
    console.log(`Paying ${amount} via Credit Card`);
  },
  bitcoin(amount) {
    console.log(`Paying ${amount} via Bitcoin`);
  }
};

class PaymentProcessor {
  constructor(strategy) {
    this.strategy = paymentStrategies[strategy];
  }

  pay(amount) {
    this.strategy(amount);
  }
}

// 使用
const payment = new PaymentProcessor('paypal');
payment.pay(100);
```

### 3. 责任链模式 (Chain of Responsibility Pattern)

**实际工作应用：**
- 中间件
- 权限验证
- 日志处理
- 异常处理

**框架例子：**
- Express/Koa 中间件
- Redux 中间件
- 各种管道处理

**代码示例：**
```javascript
// Express 中间件（简化版）
function createMiddlewareChain(middlewares) {
  return (req, res, next) => {
    let index = 0;

    function runNext() {
      if (index < middlewares.length) {
        const middleware = middlewares[index++];
        middleware(req, res, runNext);
      } else {
        next();
      }
    }

    runNext();
  };
}

// 使用
const middleware1 = (req, res, next) => {
  console.log('Middleware 1');
  next();
};

const middleware2 = (req, res, next) => {
  console.log('Middleware 2');
  next();
};

const chain = createMiddlewareChain([middleware1, middleware2]);
chain(req, res, () => console.log('Final handler'));
```

### 4. 命令模式 (Command Pattern)

**实际工作应用：**
- 撤销操作
- 菜单命令
- 快捷键
- 事务处理

**框架例子：**
- 各种编辑器的撤销/重做
- 状态管理中的 action
- 命令行工具

**代码示例：**
```javascript
// 编辑器命令
class Command {
  execute() { throw new Error('Method not implemented'); }
  undo() { throw new Error('Method not implemented'); }
}

class InsertCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.insertText(this.text);
  }

  undo() {
    this.editor.deleteText(this.text.length);
  }
}

// 使用
const editor = new TextEditor();
const command = new InsertCommand(editor, 'Hello');
command.execute();
command.undo();
```

### 5. 状态模式 (State Pattern)

**实际工作应用：**
- 表单状态
- 游戏状态
- UI 状态管理
- 工作流状态

**框架例子：**
- 各种状态管理库
- 游戏引擎状态
- 表单库

**代码示例：**
```javascript
// 订单状态
class OrderState {
  process(order) { throw new Error('Method not implemented'); }
}

class PendingState extends OrderState {
  process(order) {
    console.log('Processing pending order');
    order.setState(new ShippedState());
  }
}

class ShippedState extends OrderState {
  process(order) {
    console.log('Processing shipped order');
    order.setState(new DeliveredState());
  }
}

class DeliveredState extends OrderState {
  process(order) {
    console.log('Order already delivered');
  }
}

class Order {
  constructor() {
    this.state = new PendingState();
  }

  setState(state) {
    this.state = state;
  }

  process() {
    this.state.process(this);
  }
}

// 使用
const order = new Order();
order.process(); // Processing pending order
order.process(); // Processing shipped order
order.process(); // Order already delivered
```

### 6. 迭代器模式 (Iterator Pattern)

**实际工作应用：**
- 遍历数据结构
- 自定义集合
- 分页加载
- 数据流处理

**框架例子：**
- JavaScript 的 `for...of` 循环
- 各种集合库
- RxJS  observables

**代码示例：**
```javascript
// 自定义迭代器
class RangeIterator {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;
    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
}

// 使用
for (const num of new RangeIterator(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}
```

### 7. 模板方法模式 (Template Method Pattern)

**实际工作应用：**
- 生命周期钩子
- 数据处理流程
- 组件渲染
- 算法框架

**框架例子：**
- React 的生命周期方法
- Vue 的生命周期钩子
- 各种框架的基类

**代码示例：**
```javascript
// 数据处理模板
class DataProcessor {
  process(data) {
    this.validate(data);
    const transformed = this.transform(data);
    return this.save(transformed);
  }

  validate(data) {
    console.log('Validating data');
  }

  transform(data) {
    throw new Error('Subclass must implement transform');
  }

  save(data) {
    console.log('Saving data');
    return data;
  }
}

class JSONProcessor extends DataProcessor {
  transform(data) {
    return JSON.stringify(data);
  }
}

// 使用
const processor = new JSONProcessor();
const result = processor.process({ name: 'John' });
```

### 8. 中介者模式 (Mediator Pattern)

**实际工作应用：**
- 聊天室
- 表单联动
- 组件通信
- 微服务协调

**框架例子：**
- Redux 的 store
- Vuex 的 store
- 各种消息总线

**代码示例：**
```javascript
// 聊天室中介者
class ChatMediator {
  constructor() {
    this.users = [];
  }

  register(user) {
    this.users.push(user);
    user.setMediator(this);
  }

  send(message, sender) {
    this.users.forEach(user => {
      if (user !== sender) {
        user.receive(message);
      }
    });
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  send(message) {
    console.log(`${this.name} sends: ${message}`);
    this.mediator.send(message, this);
  }

  receive(message) {
    console.log(`${this.name} receives: ${message}`);
  }
}

// 使用
const mediator = new ChatMediator();
const alice = new User('Alice');
const bob = new User('Bob');

mediator.register(alice);
mediator.register(bob);

alice.send('Hello everyone!');
```

### 9. 备忘录模式 (Memento Pattern)

**实际工作应用：**
- 撤销操作
- 状态保存
- 快照功能
- 历史记录

**框架例子：**
- 编辑器的撤销/重做
- 状态管理的历史
- 游戏存档

**代码示例：**
```javascript
// 编辑器备忘录
class EditorMemento {
  constructor(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }
}

class Editor {
  constructor() {
    this.content = '';
  }

  setContent(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  save() {
    return new EditorMemento(this.content);
  }

  restore(memento) {
    this.content = memento.getContent();
  }
}

// 使用
const editor = new Editor();
const history = [];

editor.setContent('Version 1');
history.push(editor.save());

editor.setContent('Version 2');
history.push(editor.save());

editor.setContent('Version 3');
console.log(editor.getContent()); // Version 3

// 恢复到之前的版本
editor.restore(history[0]);
console.log(editor.getContent()); // Version 1
```

### 10. 访问者模式 (Visitor Pattern)

**实际工作应用：**
- AST 处理
- 数据结构遍历
- 报表生成
- 复杂对象操作

**框架例子：**
- 编译器的 AST 访问
- 各种数据处理库
- 测试框架

**代码示例：**
```javascript
// AST 访问者
class Visitor {
  visitNode(node) {
    throw new Error('Method not implemented');
  }
  visitExpression(node) {
    throw new Error('Method not implemented');
  }
}

class PrintVisitor extends Visitor {
  visitNode(node) {
    console.log(`Node: ${node.type}`);
    node.children.forEach(child => child.accept(this));
  }
  visitExpression(node) {
    console.log(`Expression: ${node.value}`);
  }
}

class ASTNode {
  accept(visitor) {
    throw new Error('Method not implemented');
  }
}

class Node extends ASTNode {
  constructor(type, children) {
    super();
    this.type = type;
    this.children = children;
  }
  accept(visitor) {
    visitor.visitNode(this);
  }
}

class Expression extends ASTNode {
  constructor(value) {
    super();
    this.value = value;
  }
  accept(visitor) {
    visitor.visitExpression(this);
  }
}

// 使用
const ast = new Node('Program', [
  new Expression('1 + 2'),
  new Expression('3 * 4')
]);

const visitor = new PrintVisitor();
ast.accept(visitor);
```

### 11. 解释器模式 (Interpreter Pattern)

**实际工作应用：**
- 配置解析
- 模板引擎
- 查询语言
- 表达式解析

**框架例子：**
- 正则表达式引擎
- 模板引擎（如 Handlebars）
- SQL 解析器

**代码示例：**
```javascript
// 简单表达式解析器
class Expression {
  interpret(context) {
    throw new Error('Method not implemented');
  }
}

class NumberExpression extends Expression {
  constructor(number) {
    super();
    this.number = number;
  }
  interpret(context) {
    return this.number;
  }
}

class AddExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
  interpret(context) {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

// 使用
const expression = new AddExpression(
  new NumberExpression(5),
  new AddExpression(
    new NumberExpression(3),
    new NumberExpression(2)
  )
);

console.log(expression.interpret({})); // 10
```

## 总结

设计模式在实际工作和框架中有着广泛的应用：

1. **创建型模式**：解决对象创建问题，如单例模式在状态管理中的应用
2. **结构型模式**：处理类和对象的组合，如适配器模式在 API 集成中的应用
3. **行为型模式**：关注对象间的通信，如观察者模式在响应式系统中的应用

通过了解这些模式的实际应用，你可以更好地理解框架的设计原理，并且在自己的项目中做出更合理的设计决策。