# JavaScript 深入

JavaScript 是前端开发的核心语言，掌握其深入特性可以帮助我们编写更高效、更可维护的代码。

## 1. ES6+ 新特性

### 箭头函数

箭头函数提供了更简洁的函数语法，并且绑定了词法作用域的 `this`。

```javascript
// 传统函数
function add(a, b) {
  return a + b;
}

// 箭头函数
const add = (a, b) => a + b;

// 带块语句的箭头函数
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
```

### 解构赋值

解构赋值允许我们从数组或对象中提取值并赋给变量。

```javascript
// 数组解构
const [a, b, ...rest] = [1, 2, 3, 4, 5];
console.log(a); // 1
console.log(b); // 2
console.log(rest); // [3, 4, 5]

// 对象解构
const { name, age, ...other } = { name: '张三', age: 20, gender: '男' };
console.log(name); // 张三
console.log(age); // 20
console.log(other); // { gender: '男' }

// 函数参数解构
function userInfo({ name, age }) {
  console.log(`姓名: ${name}, 年龄: ${age}`);
}

userInfo({ name: '李四', age: 25 });
```

### 模板字符串

模板字符串允许我们在字符串中嵌入表达式。

```javascript
const name = '王五';
const age = 30;

// 传统字符串拼接
const message = '姓名: ' + name + ', 年龄: ' + age;

// 模板字符串
const message = `姓名: ${name}, 年龄: ${age}`;

// 多行模板字符串
const html = `
  <div>
    <h1>${name}</h1>
    <p>年龄: ${age}</p>
  </div>
`;
```

### 展开运算符

展开运算符允许我们将数组或对象展开为多个元素。

```javascript
// 数组展开
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// 对象展开
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combinedObj = { ...obj1, ...obj2 };
console.log(combinedObj); // { a: 1, b: 2, c: 3, d: 4 }

// 函数参数展开
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4)); // 10
```

### 类

ES6 引入了类语法，使面向对象编程更加清晰。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }

  static create(name, age) {
    return new Person(name, age);
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is studying in grade ${this.grade}`);
  }
}

const person = new Person('赵六', 35);
person.sayHello();

const student = new Student('钱七', 15, 9);
student.sayHello();
student.study();
```

### 模块化

ES6 引入了模块化系统，允许我们将代码分割成独立的模块。

```javascript
// module.js
export const PI = 3.14159;

export function calculateArea(radius) {
  return PI * radius * radius;
}

export default class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  getArea() {
    return calculateArea(this.radius);
  }
}

// main.js
import Circle, { PI, calculateArea } from './module.js';

console.log(PI); // 3.14159
console.log(calculateArea(5)); // 78.53975

const circle = new Circle(10);
console.log(circle.getArea()); // 314.159
```

## 2. JavaScript 设计模式

### 单例模式

单例模式确保一个类只有一个实例，并提供一个全局访问点。

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.data = [];
    Singleton.instance = this;
  }

  addData(item) {
    this.data.push(item);
  }

  getData() {
    return this.data;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); // true

instance1.addData('test');
console.log(instance2.getData()); // ['test']
```

### 工厂模式

工厂模式用于创建对象，而不需要指定具体的类。

```javascript
class ProductA {
  operation() {
    return 'Product A operation';
  }
}

class ProductB {
  operation() {
    return 'Product B operation';
  }
}

class Factory {
  createProduct(type) {
    switch (type) {
      case 'A':
        return new ProductA();
      case 'B':
        return new ProductB();
      default:
        throw new Error('Invalid product type');
    }
  }
}

const factory = new Factory();
const productA = factory.createProduct('A');
const productB = factory.createProduct('B');

console.log(productA.operation()); // Product A operation
console.log(productB.operation()); // Product B operation
```

### 观察者模式

观察者模式定义了对象之间的一对多依赖关系，当一个对象状态改变时，所有依赖它的对象都会收到通知。

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  attach(observer) {
    this.observers.push(observer);
  }

  detach(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  notify() {
    this.observers.forEach(observer => observer.update());
  }

  setState(state) {
    this.state = state;
    this.notify();
  }

  getState() {
    return this.state;
  }
}

class Observer {
  constructor(name, subject) {
    this.name = name;
    this.subject = subject;
    this.subject.attach(this);
  }

  update() {
    console.log(`${this.name} received update: ${this.subject.getState()}`);
  }
}

const subject = new Subject();
const observer1 = new Observer('Observer 1', subject);
const observer2 = new Observer('Observer 2', subject);

subject.setState('New state');
```

### 装饰器模式

装饰器模式允许我们动态地为对象添加额外的责任。

```javascript
class Component {
  operation() {
    return 'Component operation';
  }
}

class Decorator {
  constructor(component) {
    this.component = component;
  }

  operation() {
    return this.component.operation();
  }
}

class ConcreteDecoratorA extends Decorator {
  operation() {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

class ConcreteDecoratorB extends Decorator {
  operation() {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

const component = new Component();
const decoratorA = new ConcreteDecoratorA(component);
const decoratorB = new ConcreteDecoratorB(decoratorA);

console.log(decoratorB.operation()); // ConcreteDecoratorB(ConcreteDecoratorA(Component operation))
```

## 3. 异步编程

### 回调函数

回调函数是最基本的异步编程方式。

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: '张三', age: 20 };
    callback(null, data);
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', data);
  }
});
```

### Promise

Promise 提供了更优雅的异步编程方式。

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: '李四', age: 25 };
      resolve(data);
    }, 1000);
  });
}

fetchData()
  .then(data => {
    console.log('Data:', data);
    return data.age;
  })
  .then(age => {
    console.log('Age:', age);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### async/await

async/await 是基于 Promise 的语法糖，使异步代码看起来更像同步代码。

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: '王五', age: 30 };
      resolve(data);
    }, 1000);
  });
}

async function getData() {
  try {
    const data = await fetchData();
    console.log('Data:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

getData();
```

### Promise.all

Promise.all 用于并行执行多个异步操作。

```javascript
function fetchUser() {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, name: '张三' }), 1000);
  });
}

function fetchPosts() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: 'Post 1' }]), 1500);
  });
}

function fetchComments() {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, content: 'Comment 1' }]), 500);
  });
}

Promise.all([fetchUser(), fetchPosts(), fetchComments()])
  .then(([user, posts, comments]) => {
    console.log('User:', user);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### Promise.race

Promise.race 用于获取第一个完成的异步操作结果。

```javascript
function fastPromise() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Fast result'), 500);
  });
}

function slowPromise() {
  return new Promise(resolve => {
    setTimeout(() => resolve('Slow result'), 1000);
  });
}

Promise.race([fastPromise(), slowPromise()])
  .then(result => {
    console.log('Result:', result); // Fast result
  });
```

## 4. JavaScript 核心概念

### 闭包

闭包是指函数能够访问其词法作用域之外的变量。

```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount()); // 1
```

### 原型链

原型链是 JavaScript 中实现继承的机制。

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function() {
  console.log(`${this.name} is studying in grade ${this.grade}`);
};

const student = new Student('赵六', 9);
student.sayHello(); // Hello, my name is 赵六
student.study(); // 赵六 is studying in grade 9
```

### 作用域

JavaScript 有全局作用域、函数作用域和块级作用域。

```javascript
// 全局作用域
const globalVar = 'Global';

function testScope() {
  // 函数作用域
  const functionVar = 'Function';
  
  if (true) {
    // 块级作用域 (ES6+)
    const blockVar = 'Block';
    console.log(globalVar); // Global
    console.log(functionVar); // Function
    console.log(blockVar); // Block
  }
  
  console.log(globalVar); // Global
  console.log(functionVar); // Function
  console.log(blockVar); // ReferenceError: blockVar is not defined
}

testScope();
```

### this 关键字

`this` 的值取决于函数的调用方式。

```javascript
const obj = {
  name: '张三',
  sayHello: function() {
    console.log(`Hello, my name is ${this.name}`);
  },
  sayHelloArrow: () => {
    console.log(`Hello, my name is ${this.name}`); // this 指向全局对象
  }
};

obj.sayHello(); // Hello, my name is 张三
obj.sayHelloArrow(); // Hello, my name is undefined

const sayHello = obj.sayHello;
sayHello(); // Hello, my name is undefined

const boundSayHello = obj.sayHello.bind(obj);
boundSayHello(); // Hello, my name is 张三
```

## 总结

JavaScript 是一门强大而灵活的语言，掌握其深入特性可以帮助我们编写更高效、更可维护的代码。通过学习 ES6+ 新特性、设计模式和异步编程，我们可以提高开发效率，解决复杂的问题。在实际开发中，我们应该根据具体需求选择合适的技术，并注意代码的可读性和可维护性。