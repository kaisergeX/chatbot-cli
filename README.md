<div align="center">
<h1>Safe Chatbot</h1>

<p>
A simple command-line chatbot application that can pretend to converse with users while
adhering to advanced safety guidelines to prevent disallowed content from being displayed or
generated.
</p>

Powered by <img src="https://deno.land/logo.svg" height="20px" alt="the deno mascot dinosaur standing in the rain"> Deno

</div>

## Don't wanna setup anything?

You can just run the standalone executable file inside [exec folder](./exec/).

## Environment

Please ensure your device has Deno installed. If not, follow [the official guide](https://docs.deno.com/runtime/getting_started/installation/) for a quick installation.

## Installation

```console
deno install
```

## Local development

### Setting up your editor/IDE

- VSCode: Install the official [Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
- Other editor/IDE: please follow the [setup your environment](https://docs.deno.com/runtime/getting_started/setup_your_environment/#setting-up-your-editor%2Fide) guide.

### Dev server

```console
deno run dev
```

Start server with HMR mode:

```console
deno run --watch-hmr main.ts
```

### Lint

```console
deno lint
```

### Test

```console
deno test
```

## Compile standalone executables

```console
deno run compile
```

### Cross-compiling for Windows

If you want to share the Chatbot with Windows users, then run:

```console
deno run compile:window
```
