# Portfolio – Realsanjeev 2025

> Not a front-end developer, but I keep shipping anyway.

This is my personal portfolio built with **Vite**, **React**, and **TypeScript**. It’s fast, lightweight, and deployed using **GitHub Actions** to **GitHub Pages**.

---

## 🌐 Deploying a Vite App to GitHub Pages

To deploy your Vite project to GitHub Pages, follow these steps:

### 1. Build the Production App
**NOTE:**: Create a .env file in your root directory and fill is as .env.example from EmailJS to setup working contact form which sends message directly to your mail.

Run the build command to generate the static files:

```bash
npm run build
```

This will create a `dist/` directory containing your production-ready app.

---

### 2. Configure `vite.config.js`

Update your `vite.config.js` to set the correct base path for GitHub Pages:

```ts
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/your-repo-name/', // replace with your GitHub repo name
})
```

This ensures the correct asset paths when served from GitHub Pages.

If you're using react-router, make sure to specify the basename in your router configuration:

```jsx
<BrowserRouter basename="your-repo-name">
```
Replace `your-repo-name` with your actual repository name.

---

### 3. Set Up GitHub Actions Workflow

Create a workflow file to automate the deployment:

**Path:** `.github/workflows/deploy.yml`

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

This workflow will:

* Build your app
* Deploy the `dist/` folder to GitHub Pages on every push to `main`

---

### 4. Enable GitHub Pages

Go to your repository's:

**Settings → Pages**

* Set the source to **GitHub Actions** (or to the `gh-pages` branch if created by the workflow).

---

### 5. Access Your Deployed Site

Once deployed, your site will be available at:

```
https://{your-username}.github.io/{your-repo-name}/
```

Make sure to replace `{your-username}` and `{your-repo-name}` accordingly.

---

## 🛠 Tech Stack

* [Vite](https://vitejs.dev/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [GitHub Actions](https://docs.github.com/en/actions)
* [GitHub Pages](https://pages.github.com/)
* [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)

---

## 📦 Local Development

```bash
npm install
npm run dev
```

This runs the app locally at [http://localhost:5173](http://localhost:5173) by default.

---

## 📝 Notes

* Make sure the `base` path in `vite.config.js` matches your repo name exactly.
* This setup uses **GitHub Actions** for automated deployment. No need to manually run deploy scripts.
* For custom domains, add a `CNAME` file to the `public/` directory.

