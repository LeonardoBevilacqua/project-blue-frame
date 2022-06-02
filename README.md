# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Building container

To create a new container:
```bash
docker build . --no-cache -t sveltekit-docker:latest
```

To create the volume:
```bash
docker volume create blueframe
```


To start the container:

```bash
# run container as command (stop with Ctrl-C*)
docker run -it --rm  --init --name sveltekit-docker -p 3000:3000 -v blueframe:/app/static sveltekit-docker:latest
```

```bash
# demonize container (send to background)
docker run -d --name sveltekit-docker -p 3000:3000 -v blueframe:/app/static sveltekit-docker:latest
```
