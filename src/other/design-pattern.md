# 设计模式

设计模式是软件开发中常见问题的可重用解决方案。在前端开发中，合理使用设计模式可以提高代码的可维护性、可扩展性和可读性。

## 创建型设计模式

### 1. 单例模式 (Singleton Pattern)

确保一个类只有一个实例，并提供全局访问点。

**应用场景：** 全局状态管理、配置管理、数据库连接

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = 'Initial data';
    Singleton.instance = this;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
  }
}

// 测试单例模式
const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true
instance1.setData('Updated data');
console.log(instance2.getData()); // 'Updated data'
```

### 2. 发布订阅模式 (Publish-Subscribe Pattern)

一种消息范式，消息的发送者（发布者）不会直接发送消息给特定的接收者（订阅者），而是将消息分类为不同的主题，无需了解哪些订阅者可能存在。

**应用场景：** 事件系统、消息队列、跨组件通信

```javascript
class EventBus {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // 取消订阅
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }

  // 发布事件
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

// 测试发布订阅模式
const eventBus = new EventBus();

const subscriber1 = (data) => console.log('Subscriber 1 received:', data);
const subscriber2 = (data) => console.log('Subscriber 2 received:', data);

eventBus.subscribe('message', subscriber1);
eventBus.subscribe('message', subscriber2);
eventBus.publish('message', { text: 'Hello world!' });

eventBus.unsubscribe('message', subscriber1);
eventBus.publish('message', { text: 'Hello again!' });
```

### 3. 工厂模式 (Factory Pattern)

定义创建对象的接口，让子类决定实例化哪个类。

**应用场景：** 组件创建、API请求封装、不同类型的数据处理

```javascript
class ButtonFactory {
  static createButton(type) {
    switch (type) {
      case 'primary':
        return { type: 'primary', className: 'btn-primary' };
      case 'secondary':
        return { type: 'secondary', className: 'btn-secondary' };
      case 'danger':
        return { type: 'danger', className: 'btn-danger' };
      default:
        return { type: 'default', className: 'btn-default' };
    }
  }
}

const primaryButton = ButtonFactory.createButton('primary');
const dangerButton = ButtonFactory.createButton('danger');
```

### 4. 建造者模式 (Builder Pattern)

将复杂对象的构建与表示分离，使同样的构建过程可以创建不同的表示。

**应用场景：** 复杂表单构建、配置对象创建、DOM元素构建

```javascript
class FormBuilder {
  constructor() {
    this.form = {
      fields: [],
      config: {},
    };
  }

  addTextField(name, label) {
    this.form.fields.push({ type: 'text', name, label });
    return this;
  }

  addSelectField(name, label, options) {
    this.form.fields.push({ type: 'select', name, label, options });
    return this;
  }

  setConfig(config) {
    this.form.config = config;
    return this;
  }

  build() {
    return this.form;
  }
}

const form = new FormBuilder()
  .addTextField('username', '用户名')
  .addSelectField('role', '角色', ['admin', 'user'])
  .setConfig({ submitText: '提交' })
  .build();
```

### 5. 原型模式 (Prototype Pattern)

通过复制现有对象来创建新对象，而不是通过实例化类。

**应用场景：** 对象克隆、深拷贝、性能优化

```javascript
const componentPrototype = {
  render() {
    console.log(`Rendering ${this.type} component`);
  },
  init() {
    console.log(`Initializing ${this.type} component`);
  },
};

function createComponent(type) {
  const component = Object.create(componentPrototype);
  component.type = type;
  return component;
}

const button = createComponent('button');
const input = createComponent('input');
button.render();
input.init();
```

## 结构型设计模式

### 1. 适配器模式 (Adapter Pattern)

将一个类的接口转换成客户希望的另一个接口，使原本不兼容的类可以一起工作。

**应用场景：** API接口适配、第三方库集成、数据格式转换

```javascript
class OldApi {
  getData() {
    return { name: 'John', age: 30 };
  }
}

class NewApi {
  fetchUser() {
    return { fullName: 'John Doe', years: 30 };
  }
}

class ApiAdapter {
  constructor(api) {
    this.api = api;
  }

  getData() {
    if (this.api instanceof NewApi) {
      const data = this.api.fetchUser();
      return { name: data.fullName, age: data.years };
    }
    return this.api.getData();
  }
}

const oldApi = new OldApi();
const newApi = new NewApi();
const adapter = new ApiAdapter(newApi);
console.log(adapter.getData());
```

### 2. 装饰器模式 (Decorator Pattern)

动态地给对象添加额外的职责，比生成子类更灵活。

**应用场景：** React高阶组件、功能增强、日志记录

```javascript
class Button {
  render() {
    return '<button>Click me</button>';
  }
}

class ButtonDecorator {
  constructor(button) {
    this.button = button;
  }

  render() {
    return this.button.render();
  }
}

class PrimaryButtonDecorator extends ButtonDecorator {
  render() {
    return this.button.render().replace('button', 'button class="btn-primary"');
  }
}

class LoadingButtonDecorator extends ButtonDecorator {
  render() {
    return `<div class="loading">${this.button.render()}</div>`;
  }
}

const button = new Button();
const primaryButton = new PrimaryButtonDecorator(button);
const loadingPrimaryButton = new LoadingButtonDecorator(primaryButton);
console.log(loadingPrimaryButton.render());
```

### 3. 代理模式 (Proxy Pattern)

为其他对象提供一种代理以控制对这个对象的访问。

**应用场景：** 图片懒加载、请求缓存、权限控制

```javascript
class ImageLoader {
  constructor(url) {
    this.url = url;
    this.image = null;
  }

  loadImage() {
    if (!this.image) {
      console.log(`Loading image from ${this.url}`);
      this.image = `Image from ${this.url}`;
    }
    return this.image;
  }
}

class ImageProxy {
  constructor(url) {
    this.url = url;
    this.loader = null;
  }

  loadImage() {
    if (!this.loader) {
      this.loader = new ImageLoader(this.url);
    }
    return this.loader.loadImage();
  }
}

const proxy = new ImageProxy('https://example.com/image.jpg');
console.log(proxy.loadImage());
console.log(proxy.loadImage());
```

### 4. 组合模式 (Composite Pattern)

将对象组合成树形结构以表示"部分-整体"的层次结构，使客户端对单个对象和组合对象的使用具有一致性。

**应用场景：** DOM树、菜单系统、文件系统

```javascript
class Component {
  render() {
    throw new Error('Method must be implemented');
  }
}

class Leaf extends Component {
  constructor(name) {
    super();
    this.name = name;
  }

  render() {
    return `<li>${this.name}</li>`;
  }
}

class Composite extends Component {
  constructor(name) {
    super();
    this.name = name;
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  render() {
    const childrenHtml = this.children.map((child) => child.render()).join('');
    return `<ul>${childrenHtml}</ul>`;
  }
}

const menu = new Composite('Main Menu');
const fileMenu = new Composite('File');
const editMenu = new Composite('Edit');

fileMenu.add(new Leaf('New'));
fileMenu.add(new Leaf('Open'));
editMenu.add(new Leaf('Copy'));
editMenu.add(new Leaf('Paste'));

menu.add(fileMenu);
menu.add(editMenu);

console.log(menu.render());
```

### 5. 外观模式 (Facade Pattern)

为子系统中的一组接口提供一个一致的界面，定义一个高层接口，这个接口使得这一子系统更加容易使用。

**应用场景：** API封装、复杂系统简化、第三方库集成

```javascript
class AnimationEngine {
  animate(element, properties) {
    console.log(`Animating ${element} with ${JSON.stringify(properties)}`);
  }
}

class EventManager {
  addEventListener(element, event, handler) {
    console.log(`Adding ${event} listener to ${element}`);
  }
}

class DOMManipulator {
  createElement(tag) {
    console.log(`Creating ${tag} element`);
    return tag;
  }
}

class UIFacade {
  constructor() {
    this.animation = new AnimationEngine();
    this.events = new EventManager();
    this.dom = new DOMManipulator();
  }

  createAnimatedButton(text, onClick) {
    const button = this.dom.createElement('button');
    this.events.addEventListener(button, 'click', onClick);
    this.animation.animate(button, { opacity: 1 });
    return button;
  }
}

const ui = new UIFacade();
const button = ui.createAnimatedButton('Click me', () =>
  console.log('Clicked'),
);
```

### 6. 桥接模式 (Bridge Pattern)

将抽象部分与它的实现部分分离，使它们都可以独立地变化。

**应用场景：** 跨平台组件、主题切换、多格式渲染

```javascript
class Renderer {
  renderCircle(radius) {
    throw new Error('Method must be implemented');
  }
}

class CanvasRenderer extends Renderer {
  renderCircle(radius) {
    return `<canvas circle radius="${radius}" />`;
  }
}

class SVGRenderer extends Renderer {
  renderCircle(radius) {
    return `<svg><circle r="${radius}" /></svg>`;
  }
}

class Shape {
  constructor(renderer) {
    this.renderer = renderer;
  }
}

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer);
    this.radius = radius;
  }

  draw() {
    return this.renderer.renderCircle(this.radius);
  }
}

const canvasCircle = new Circle(new CanvasRenderer(), 50);
const svgCircle = new Circle(new SVGRenderer(), 50);

console.log(canvasCircle.draw());
console.log(svgCircle.draw());
```

### 7. 享元模式 (Flyweight Pattern)

运用共享技术有效地支持大量细粒度的对象。

**应用场景：** 大量相似对象、性能优化、内存优化

```javascript
class IconFactory {
  constructor() {
    this.icons = {};
  }

  getIcon(type) {
    if (!this.icons[type]) {
      this.icons[type] = { type, data: `Icon data for ${type}` };
    }
    return this.icons[type];
  }
}

class TreeNode {
  constructor(iconType, position) {
    this.icon = new IconFactory().getIcon(iconType);
    this.position = position;
  }

  render() {
    return `<div style="position: ${this.position}">${this.icon.data}</div>`;
  }
}

const factory = new IconFactory();
const treeNodes = [];
for (let i = 0; i < 1000; i++) {
  treeNodes.push(new TreeNode('folder', `left: ${i * 10}px`));
}
```

## 行为型设计模式

### 1. 观察者模式 (Observer Pattern)

定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

**应用场景：** 事件系统、状态管理、数据绑定

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log(`Received update: ${JSON.stringify(data)}`);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify({ message: 'Hello observers' });
```

### 2. 策略模式 (Strategy Pattern)

定义一系列算法，把它们一个个封装起来，并且使它们可相互替换。

**应用场景：** 表单验证、排序算法、支付方式

```javascript
class ValidationStrategy {
  validate(value) {
    throw new Error('Method must be implemented');
  }
}

class EmailValidation extends ValidationStrategy {
  validate(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}

class PhoneValidation extends ValidationStrategy {
  validate(value) {
    return /^\d{11}$/.test(value);
  }
}

class Validator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  validate(value) {
    return this.strategy.validate(value);
  }
}

const validator = new Validator(new EmailValidation());
console.log(validator.validate('test@example.com'));
validator.setStrategy(new PhoneValidation());
console.log(validator.validate('13800138000'));
```

### 3. 责任链模式 (Chain of Responsibility Pattern)

使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。

**应用场景：** 中间件、权限验证、日志处理

```javascript
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
    return handler;
  }

  handle(request) {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

class AuthHandler extends Handler {
  handle(request) {
    if (!request.token) {
      return 'Authentication failed';
    }
    console.log('Authentication passed');
    return super.handle(request);
  }
}

class ValidationHandler extends Handler {
  handle(request) {
    if (!request.data) {
      return 'Validation failed';
    }
    console.log('Validation passed');
    return super.handle(request);
  }
}

class LogHandler extends Handler {
  handle(request) {
    console.log(`Processing request: ${JSON.stringify(request)}`);
    return super.handle(request);
  }
}

const authHandler = new AuthHandler();
const validationHandler = new ValidationHandler();
const logHandler = new LogHandler();

authHandler.setNext(validationHandler).setNext(logHandler);
console.log(authHandler.handle({ token: 'abc123', data: 'test' }));
```

### 4. 命令模式 (Command Pattern)

将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化。

**应用场景：** 撤销操作、菜单命令、快捷键

```javascript
class Command {
  execute() {
    throw new Error('Method must be implemented');
  }

  undo() {
    throw new Error('Method must be implemented');
  }
}

class TextEditor {
  constructor() {
    this.content = '';
  }

  write(text) {
    this.content += text;
  }

  delete(length) {
    this.content = this.content.slice(0, -length);
  }

  getContent() {
    return this.content;
  }
}

class WriteCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }

  execute() {
    this.editor.write(this.text);
  }

  undo() {
    this.editor.delete(this.text.length);
  }
}

const editor = new TextEditor();
const writeCommand = new WriteCommand(editor, 'Hello ');

writeCommand.execute();
console.log(editor.getContent());
writeCommand.undo();
console.log(editor.getContent());
```

### 5. 状态模式 (State Pattern)

允许一个对象在其内部状态改变时改变它的行为。

**应用场景：** 表单状态、游戏状态、UI状态管理

```javascript
class State {
  handle(context) {
    throw new Error('Method must be implemented');
  }
}

class LoadingState extends State {
  handle(context) {
    console.log('Loading...');
    context.setState(new ReadyState());
  }
}

class ReadyState extends State {
  handle(context) {
    console.log('Ready');
    context.setState(new ProcessingState());
  }
}

class ProcessingState extends State {
  handle(context) {
    console.log('Processing');
    context.setState(new CompletedState());
  }
}

class CompletedState extends State {
  handle(context) {
    console.log('Completed');
    context.setState(new LoadingState());
  }
}

class Context {
  constructor() {
    this.state = new LoadingState();
  }

  setState(state) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

const context = new Context();
context.request();
context.request();
context.request();
context.request();
```

### 6. 迭代器模式 (Iterator Pattern)

提供一种方法顺序访问一个聚合对象中各个元素，而又不需暴露该对象的内部表示。

**应用场景：** 遍历数据结构、自定义集合、分页加载

```javascript
class Iterator {
  constructor(collection) {
    this.collection = collection;
    this.index = 0;
  }

  hasNext() {
    return this.index < this.collection.length;
  }

  next() {
    return this.collection[this.index++];
  }
}

class ArrayCollection {
  constructor(items) {
    this.items = items;
  }

  createIterator() {
    return new Iterator(this.items);
  }
}

const collection = new ArrayCollection([1, 2, 3, 4, 5]);
const iterator = collection.createIterator();

while (iterator.hasNext()) {
  console.log(iterator.next());
}
```

### 7. 模板方法模式 (Template Method Pattern)

定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。

**应用场景：** 生命周期钩子、数据处理流程、组件渲染

```javascript
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
    throw new Error('Method must be implemented');
  }

  save(data) {
    console.log('Saving data');
  }
}

class JSONProcessor extends DataProcessor {
  transform(data) {
    console.log('Transforming to JSON');
    return JSON.stringify(data);
  }
}

class XMLProcessor extends DataProcessor {
  transform(data) {
    console.log('Transforming to XML');
    return `<data>${data}</data>`;
  }
}

const jsonProcessor = new JSONProcessor();
jsonProcessor.process({ name: 'John' });

const xmlProcessor = new XMLProcessor();
xmlProcessor.process('John');
```

### 8. 中介者模式 (Mediator Pattern)

用一个中介对象来封装一系列的对象交互，中介者使各对象不需要显式地相互引用。

**应用场景：** 聊天室、表单联动、组件通信

```javascript
class Mediator {
  register(colleague) {
    throw new Error('Method must be implemented');
  }

  send(message, sender) {
    throw new Error('Method must be implemented');
  }
}

class ChatMediator extends Mediator {
  constructor() {
    super();
    this.colleagues = [];
  }

  register(colleague) {
    this.colleagues.push(colleague);
    colleague.setMediator(this);
  }

  send(message, sender) {
    this.colleagues.forEach((colleague) => {
      if (colleague !== sender) {
        colleague.receive(message);
      }
    });
  }
}

class Colleague {
  constructor(name) {
    this.name = name;
    this.mediator = null;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }

  send(message) {
    this.mediator.send(message, this);
  }

  receive(message) {
    console.log(`${this.name} received: ${message}`);
  }
}

const mediator = new ChatMediator();
const user1 = new Colleague('Alice');
const user2 = new Colleague('Bob');
const user3 = new Colleague('Charlie');

mediator.register(user1);
mediator.register(user2);
mediator.register(user3);

user1.send('Hello everyone!');
```

### 9. 备忘录模式 (Memento Pattern)

在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。

**应用场景：** 撤销操作、状态保存、快照功能

```javascript
class Memento {
  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

class Originator {
  constructor() {
    this.state = '';
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  saveToMemento() {
    return new Memento(this.state);
  }

  restoreFromMemento(memento) {
    this.state = memento.getState();
  }
}

class Caretaker {
  constructor() {
    this.mementos = [];
  }

  addMemento(memento) {
    this.mementos.push(memento);
  }

  getMemento(index) {
    return this.mementos[index];
  }
}

const originator = new Originator();
const caretaker = new Caretaker();

originator.setState('State 1');
caretaker.addMemento(originator.saveToMemento());

originator.setState('State 2');
caretaker.addMemento(originator.saveToMemento());

originator.setState('State 3');
console.log('Current state:', originator.getState());

originator.restoreFromMemento(caretaker.getMemento(0));
console.log('Restored state:', originator.getState());
```

### 10. 访问者模式 (Visitor Pattern)

表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

**应用场景：** AST处理、数据结构遍历、报表生成

```javascript
class Visitor {
  visit(element) {
    throw new Error('Method must be implemented');
  }
}

class Element {
  accept(visitor) {
    throw new Error('Method must be implemented');
  }
}

class HTMLVisitor extends Visitor {
  visit(element) {
    console.log(`Converting ${element.type} to HTML`);
  }
}

class MarkdownVisitor extends Visitor {
  visit(element) {
    console.log(`Converting ${element.type} to Markdown`);
  }
}

class Paragraph extends Element {
  constructor(text) {
    super();
    this.type = 'paragraph';
    this.text = text;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

class Heading extends Element {
  constructor(level, text) {
    super();
    this.type = 'heading';
    this.level = level;
    this.text = text;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

const elements = [new Heading(1, 'Title'), new Paragraph('Content')];

const htmlVisitor = new HTMLVisitor();
const markdownVisitor = new MarkdownVisitor();

elements.forEach((element) => element.accept(htmlVisitor));
elements.forEach((element) => element.accept(markdownVisitor));
```

### 11. 解释器模式 (Interpreter Pattern)

给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

**应用场景：** 配置解析、模板引擎、查询语言

```javascript
class Expression {
  interpret(context) {
    throw new Error('Method must be implemented');
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

class SubtractExpression extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  interpret(context) {
    return this.left.interpret(context) - this.right.interpret(context);
  }
}

const expression = new AddExpression(
  new NumberExpression(10),
  new SubtractExpression(new NumberExpression(5), new NumberExpression(3)),
);

console.log('Result:', expression.interpret({}));
```

## 总结

设计模式是解决特定问题的成熟方案，在前端开发中：

1. **创建型模式**：关注对象的创建过程，如单例、工厂、建造者模式
2. **结构型模式**：关注类和对象的组合，如适配器、装饰器、代理模式
3. **行为型模式**：关注对象之间的通信，如观察者、策略、责任链模式

合理使用设计模式可以：

- 提高代码的可维护性和可扩展性
- 促进团队协作和代码复用
- 解决常见的架构问题
- 提升代码质量和性能

但要注意：

- 不要过度使用设计模式
- 根据实际需求选择合适的模式
- 保持代码简洁和可读性
- 遵循单一职责原则
