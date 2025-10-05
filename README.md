## 鲁虺日历万年历

http://rili.luhui.net


鲁虺万年历，超实用精准万年历，带黄历，天气、节气，手机版

http://wannianli.luhui.net

## 演示截图：

![演示截图](http://rili.luhui.net/screenshots.jpg)


# 鲁虺日历 rili.luhui.net

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/kugeceo/rili.luhui.net)
![GitHub forks](https://img.shields.io/github/forks/kugeceo/rili.luhui.net)

鲁虺万年历，超实用精准万年历，带黄历、天气、节气，支持手机版，为用户提供便捷的日历查询和日程管理服务。

## 域名信息

- 主域名：http://rili.luhui.net
- 备用域名：http://wannianli.luhui.net

## 功能特点

- 提供精准的万年历查询，包含公历、农历信息
- 显示黄历内容，如宜、忌事项等
- 集成天气信息展示
- 包含二十四节气相关内容
- 支持日程安排、生日、纪念日、倒数日等事件管理
- 支持事件的添加、编辑、删除操作
- 响应式设计，适配手机等移动设备

## 展示截图

![鲁虺日历展示](%E6%97%A5%E5%8E%86%E6%88%AA%E5%9B%BE_20200807073105.jpg)

## 部署说明

### 一键部署

#### Netlify 部署

1. 访问 [Netlify](https://app.netlify.com/) 并登录账号
2. 点击 "New site from Git"
3. 选择 "GitHub" 并授权访问你的仓库
4. 选择本项目仓库
5. 部署设置保持默认：
   - 构建命令：无需填写（静态网站）
   - 发布目录：无需填写（根目录）
6. 点击 "Deploy site" 完成部署

#### Vercel 部署

1. 访问 [Vercel](https://vercel.com/) 并登录账号
2. 点击 "New Project"
3. 导入你的 GitHub 仓库中的本项目
4. 部署配置保持默认：
   - Framework Preset：选择 "Other"
   - 构建命令：留空
   - 输出目录：留空
5. 点击 "Deploy" 完成部署

#### GitHub Pages 部署

1. 进入项目仓库页面
2. 点击 "Settings" 选项卡
3. 在左侧菜单中选择 "Pages"
4. 在 "Source" 部分，选择分支（通常为 main 或 master）
5. 选择根目录（"/ (root)"）
6. 点击 "Save"，稍等片刻即可完成部署
7. 部署成功后可通过 `https://<username>.github.io/<repository-name>` 访问

#### Cloudflare Pages 部署

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/) 并登录账号
2. 点击 "Create a project"
3. 选择 "Connect to Git" 并授权访问你的 GitHub 仓库
4. 选择本项目仓库
5. 配置部署设置：
   - 项目名称：自定义名称
   - 生产分支：选择主分支（通常为 main 或 master）
   - 构建命令：留空
   - 构建输出目录：留空
6. 点击 "Save and Deploy" 完成部署

### 其他服务器部署

#### 前提条件

- 拥有一台服务器（如阿里云ECS、腾讯云CVM等）
- 服务器已安装Web服务器（如Nginx、Apache等）
- 已将域名解析到服务器IP

#### Nginx 部署步骤

1. 登录服务器，通过Git克隆项目到服务器：
   ```bash
   git clone https://github.com/kugeceo/rili.luhui.net.git
   ```

2. 配置Nginx虚拟主机，创建配置文件：
   ```bash
   sudo vim /etc/nginx/sites-available/rili.luhui.net
   ```

3. 配置文件内容如下：
   ```nginx
   server {
       listen 80;
       server_name rili.luhui.net wannianli.luhui.net;
       
       root /path/to/rili.luhui.net;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```
   注意将 `/path/to/rili.luhui.net` 替换为实际项目路径

4. 启用站点配置：
   ```bash
   sudo ln -s /etc/nginx/sites-available/rili.luhui.net /etc/nginx/sites-enabled/
   ```

5. 检查Nginx配置并重启：
   ```bash
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. 访问配置的域名即可使用鲁虺日历

## 联系我们

- **网站**：[http://luhui.net](http://luhui.net)
- **邮箱**：63625244@qq.com
- **微博**：[http://weibo.com/kugeceo](http://weibo.com/kugeceo)
- **问题反馈**：[http://luhui.net/#Contact](http://luhui.net/#Contact)
- **GitHub Issues**：提交 bug 或功能请求


## 捐助打赏作者

如果您觉得鲁虺日历对您有帮助，欢迎通过以下方式捐助打赏作者：

手机如何扫码：

![打赏作者](http://flash.luhui.net/images/zhifu.png)

① 保存上面二维码图片　② 打开微信、支付宝、手机qq、“扫一扫”　③ 点击右下脚图标　④ 选择刚才保存的图片

感谢每一位捐赠者，我一直在坚持不懈地努力和创新，不断精心打磨产品，并坚持完全免费，我走过的每一步、开发的每一个功能，离不开那些默默支持我的热心用户，
大家的每一份捐赠和建议，都是我做的更好、走的更远最大的支持和动力！感谢大家，感谢有你，与你相遇好幸运！

您的捐赠将会用于：

①  支付服务器、域名费用，有时候百分之九十的问题是没钱烧了。
②  软件测试更新，分享更丰富的源码数据、工具，推荐更友好的用户界面设计。
③  撰写发布更多文章，保证作者的官网一直免费为大家提供服务。


## 联系方式

如有任何问题或建议，请联系：[info@mail.luhui.net](mailto:info@mail.luhui.net)



