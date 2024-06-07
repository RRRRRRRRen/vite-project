# 02 配置 git 仓库

初始化仓库

```shell
git init
```

修改项目级用户名

```shell
git config user.name "rrrrrrrren"
```

查看当前配置

```shell
git config --list
```

修改初始化的主分支名称

```shell
git branch -m master
```

添加远程仓库

```shell
git remote add origin git@github.com:RRRRRRRRen/vite-project.git
```

推送到远程仓库

```shell
git add .
git commit -m "init"
git push -u origin master
```
