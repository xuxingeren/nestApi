import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  uid: number;

  @Column('char')
  user: string;

  @Column('varchar')
  password: string;

  @Column('timestamp')
  'create_time': string;

  @Column('timestamp')
  'update_time': string;
}

// Entity装饰器，表示这个类是一个实例类，和数据库的表字段一致，便于修改删除等操作
// Column装饰器，表示这是一列，就是一个数据库字段
// PrimaryColumn装饰器，就是主列，相当于mysql的主键
// PrimaryGeneratedColumn: 装饰器，也就是自动生成的主键，相当于mysql的自增长主键
// Entity装饰的类相当于mongodb数据库的一个文档，Column装饰的属性等于文档里的一个字段
// Column装饰器传参:

// 1.传递一个字符串表示类型, 比如text类型，mysql
// 2.传递一个回调函数, type => Double, 表示这是一个double类型的字段
// 3.传递一个对象，对象参数有许多，介绍几个
// {
//     length: 100, // 长度设置，mysql的int类型没有长度，
//     default: '姓', // 默认值
//     charset: 'utf-8', // 编码格式
//     readonly: false, // 是否只读
//     type: 'string', // 类型，string，text，time，int，double等等等
//     unique: true, // 是否是唯一的
//     insert: true, // 是否可写
//     primary: false, // 是否是主键
//     select: true, // 是否可查询
//     name: 'name', // 对应数据库字段名
//     nullable: false, // 是否可以为空,false表示不为空
//     }
