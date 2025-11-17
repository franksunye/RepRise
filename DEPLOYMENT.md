# RepRise 部署指南

## ✅ 部署前检查清单

### 代码质量
- [x] 所有页面正常渲染
- [x] 无 TypeScript 错误
- [x] 无 ESLint 警告
- [x] 生产构建成功 (`npm run build`)
- [x] 所有路由可访问

### 功能测试
- [x] 管家仪表盘显示正常
- [x] 模拟练习功能正常
- [x] 练习历史记录正常
- [x] 内容库搜索和过滤正常
- [x] 任务管理功能正常
- [x] 通知中心功能正常
- [x] 教练端所有功能正常
- [x] 导航系统正常

### 性能优化
- [x] 静态页面预渲染
- [x] 图片优化（使用 Next.js Image）
- [x] 代码分割
- [x] CSS 优化

---

## 🚀 Vercel 部署步骤

### 1. 准备工作

确保你的 GitHub 仓库已经推送了最新代码：

```bash
git status
git push origin main
```

### 2. 导入项目到 Vercel

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击 "Add New..." → "Project"
3. 选择 GitHub 仓库 `franksunye/RepRise`
4. 点击 "Import"

### 3. 配置项目

**Framework Preset**: Next.js  
**Root Directory**: `frontend`  
**Build Command**: `npm run build`  
**Output Directory**: `.next`  
**Install Command**: `npm install`

### 4. 环境变量（可选）

目前项目使用模拟数据，无需配置环境变量。

未来如果需要连接后端 API，可以添加：

```
NEXT_PUBLIC_API_URL=https://api.reprise.com
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. 部署

点击 "Deploy" 按钮，Vercel 会自动：

1. 克隆仓库
2. 安装依赖
3. 运行构建
4. 部署到全球 CDN

部署通常需要 2-3 分钟。

### 6. 验证部署

部署完成后，Vercel 会提供一个 URL，例如：

```
https://rep-rise-frontend.vercel.app
```

访问这个 URL，确认：

- [x] 首页加载正常
- [x] 所有路由可访问
- [x] 样式显示正确
- [x] 交互功能正常

---

## 🔄 自动部署

Vercel 已配置自动部署：

- **主分支推送** → 自动部署到生产环境
- **PR 创建** → 自动创建预览部署
- **提交推送** → 自动更新预览部署

### 查看部署状态

1. 访问 Vercel Dashboard
2. 选择项目 "rep-rise-frontend"
3. 查看 "Deployments" 标签

---

## 🌐 自定义域名（可选）

### 添加域名

1. 在 Vercel Dashboard 中选择项目
2. 进入 "Settings" → "Domains"
3. 添加你的域名（例如：`reprise.com`）
4. 按照提示配置 DNS 记录

### DNS 配置

在你的域名提供商处添加以下记录：

**A 记录**:
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME 记录**:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📊 性能监控

### Vercel Analytics

1. 在项目设置中启用 Analytics
2. 查看页面性能指标：
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   - First Input Delay (FID)

### 性能优化建议

- ✅ 使用 Next.js Image 组件
- ✅ 启用静态生成 (SSG)
- ✅ 代码分割和懒加载
- ⏳ 添加 Service Worker（PWA）
- ⏳ 优化字体加载

---

## 🐛 故障排查

### 构建失败

1. 检查构建日志
2. 本地运行 `npm run build` 复现问题
3. 检查依赖版本
4. 清除缓存重新部署

### 页面 404

1. 检查路由配置
2. 确认文件路径正确
3. 检查 `next.config.js` 配置

### 样式问题

1. 检查 Tailwind CSS 配置
2. 确认 PostCSS 配置正确
3. 清除浏览器缓存

---

## 📱 移动端优化

### 响应式测试

在以下设备上测试：

- [x] iPhone (375px)
- [x] iPad (768px)
- [x] Desktop (1024px+)

### PWA 支持（未来）

添加 `manifest.json` 和 Service Worker 支持移动端安装。

---

## 🔒 安全配置

### 环境变量

- 永远不要在代码中硬编码敏感信息
- 使用 Vercel 环境变量管理
- 区分开发和生产环境变量

### CORS 配置

如果需要连接后端 API，在 `next.config.js` 中配置：

```javascript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ];
}
```

---

## 📈 后续优化

### 短期
- [ ] 添加 Google Analytics
- [ ] 配置自定义域名
- [ ] 启用 Vercel Analytics
- [ ] 添加 SEO 优化

### 中期
- [ ] 集成真实后端 API
- [ ] 添加用户认证
- [ ] 实现数据持久化
- [ ] 添加错误监控（Sentry）

### 长期
- [ ] PWA 支持
- [ ] 国际化 (i18n)
- [ ] A/B 测试
- [ ] 性能优化

---

## 📞 支持

如有问题，请联系：

- **GitHub Issues**: https://github.com/franksunye/RepRise/issues
- **Email**: franksunye@hotmail.com

---

**最后更新**: 2024-11-17  
**部署状态**: ✅ 就绪
