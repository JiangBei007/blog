# 数据库基础

数据库是按照一定的数据结构组织、存储和管理数据的仓库。

## SQL 基础

### 基础查询

```sql
-- 选择所有列
SELECT * FROM users;

-- 选择特定列
SELECT id, name, age FROM users;

-- 条件查询
SELECT * FROM users WHERE age > 18;

-- 排序
SELECT * FROM users ORDER BY age DESC;
```

### 插入、更新、删除

```sql
-- 插入数据
INSERT INTO users (name, age, email) VALUES ('John', 25, 'john@example.com');

-- 更新数据
UPDATE users SET age = 26 WHERE id = 1;

-- 删除数据
DELETE FROM users WHERE id = 1;
```

## MySQL

### 数据类型

- INT：整数
- VARCHAR：可变长度字符串
- DATE：日期
- DATETIME：日期时间
- TEXT：文本

### 常用命令

```sql
-- 创建数据库
CREATE DATABASE mydb;

-- 切换数据库
USE mydb;

-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    email VARCHAR(100) UNIQUE
);

-- 查看表结构
DESCRIBE users;
```

## 数据库设计

### 三大范式

1. 第一范式：确保每列的原子性
2. 第二范式：确保表中的非主键列完全依赖于主键
3. 第三范式：确保表中的非主键列不依赖于其他非主键列

### 实体关系图

- 一对一关系
- 一对多关系
- 多对多关系

## 索引优化

### 索引类型

- 主键索引
- 唯一索引
- 普通索引
- 复合索引

### 索引优化技巧

- 选择合适的列创建索引
- 避免在频繁更新的列上创建索引
- 使用复合索引时注意列的顺序
- 定期分析和优化索引

## 事务管理

### 事务特性

- 原子性（Atomicity）：事务是一个不可分割的工作单位
- 一致性（Consistency）：事务前后数据的完整性必须保持一致
- 隔离性（Isolation）：多个事务之间互不干扰
- 持久性（Durability）：事务一旦提交，结果就是永久性的

### 事务隔离级别

- READ UNCOMMITTED：读未提交
- READ COMMITTED：读已提交
- REPEATABLE READ：可重复读（MySQL 默认）
- SERIALIZABLE：串行化
