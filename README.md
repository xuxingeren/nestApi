# nestApi

yarn install
热启动 `npm run webpack` and `npm run hot`, 两个命令都要运行。

需要安装redis和mysql。

```
docker pull redis:latest
docker run -itd --name redis -p 6379:6379 redis
docker pull mysql:latest
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
```
