# PDF Editor

## Create frontend

```sh
npm create vite@latest frontend -- --template react-ts
```

```sh
cd frontend
npm install
npm run dev
```

```sh
npm install @pdfme/generator @pdfme/ui @pdfme/common
```

## Create backend

```sh
mkdir backend
cd backend
```

```sh
poetry init

Package name [backend]:  app
Version [0.1.0]:
Description []:
Author [dhythm <yuta.okada.20@gmail.com>, n to skip]:
License []:
Compatible Python versions [^3.9]:  ^3.10
Would you like to define your main dependencies interactively? (yes/no) [yes]
Package to add or search for (leave blank to skip):
Would you like to define your development dependencies interactively? (yes/no) [yes]
Package to add or search for (leave blank to skip):
Do you confirm generation? (yes/no) [yes]
```

```sh
poetry env use 3.10.9
poetry install --no-root
```
