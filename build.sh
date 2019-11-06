host="122.51.109.123";
echo '执行打包';
npm run build;
echo '打包完成';
echo "上传文件";
rsync  -avzP --delete ./dist/* root@$host:~/node/nestApi/dist/;
echo "部署完成";