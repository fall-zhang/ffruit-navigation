## docker compose 如何使用

docker compose up -d 一键根据 docker-compose.yml 创建容器，且后台运行

docker compose down 一键移除创建的容器


## nginx 如何使用

查找当前配置文件是否正确

sudo nginx -t

重新加载 nginx

nginx -s reload


## 数据库使用

系统运行日志之类的东西，都放置在 mongo 数据库
用户信息放置在 postgres 数据库