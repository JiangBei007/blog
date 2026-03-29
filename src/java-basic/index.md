# Java 基础

Java 是一种广泛使用的计算机编程语言，拥有"一次编写，到处运行"的特性。

## 基础语法

### 变量和数据类型

```java
// 基本数据类型
int age = 18;
double salary = 5000.0;
boolean isStudent = true;
char grade = 'A';

// 引用数据类型
String name = "John";
```

### 控制语句

```java
// if-else
if (age >= 18) {
    System.out.println("成年人");
} else {
    System.out.println("未成年人");
}

// for 循环
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}
```

## 面向对象

### 类和对象

```java
class Person {
    String name;
    int age;

    void sayHello() {
        System.out.println("Hello, my name is " + name);
    }
}

// 创建对象
Person person = new Person();
person.name = "John";
person.age = 20;
person.sayHello();
```

## 集合框架

```java
// ArrayList
List<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
list.add("C++");

// HashMap
Map<String, Integer> map = new HashMap<>();
map.put("Java", 1);
map.put("Python", 2);
map.put("C++", 3);
```

## 并发编程

```java
// 线程创建
Thread thread = new Thread(() -> {
    System.out.println("Thread running");
});
thread.start();

// 线程池
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> {
    System.out.println("Task executed");
});
executor.shutdown();
```

## JVM 相关

### JVM 内存结构

- 堆内存：存储对象实例
- 方法区：存储类信息、常量、静态变量
- 虚拟机栈：存储局部变量表、操作数栈
- 本地方法栈：存储本地方法调用
- 程序计数器：记录当前执行的字节码指令地址
