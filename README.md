<div align="center">
<h1>Safe Chatbot</h1>

<p>
A simple command-line chatbot application that can pretend to converse with users while
adhering to advanced safety guidelines to prevent disallowed content from being displayed or
generated.
</p>

<sup>Built with
<img src="https://deno.land/logo.svg" height="15px" alt="the deno mascot dinosaur standing in the rain">
Deno</sup>

</div>

## Message Filtering Layers

This Chatbot application implements 3 layers of filtering. The filters applied are:

1. **Sentiment Analysis**: Analyzes the sentiment of user's input for detecting negative or inappropriate sentiments.

2. **Profanity Filter**: Scans messages for any offensive language and automatically blocks.

3. **Fuzzy Match with Restricted Words**: Matches user input against a list of custom-provided `RESTRICTED_WORDS` using fuzzy matching to identify and filter any closely related terms, ensuring that potentially harmful content is blocked even with minor variations.

<!-- ## Don't wanna setup anything?

If you use MacOS (ARM64), run the pre-compiled standalone executable file inside
[exec folder](./exec/). -->

## Development

### Runtime

Please ensure your device has
[<img src="https://deno.land/logo.svg" height="15px" alt="the deno mascot dinosaur standing in the rain">Deno](https://deno.land/)
installed. If not, follow
[the official guide](https://docs.deno.com/runtime/getting_started/installation/)
for a quick installation.

### Setting up your editor/IDE

- VSCode: Install the official
  [Deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
- Other editor/IDE: please follow the
  [setup your environment](https://docs.deno.com/runtime/getting_started/setup_your_environment/#setting-up-your-editor%2Fide)
  guide.

### Environment variables

```console
cp .env.example .env
```

### Dev server

<sup>_Note_: These commands also install all necessary packages.</sup>

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
deno run test
```

OR

```console
deno test -R --allow-env
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

## Improvement checklists

### CLI app

<details>
<summary>CLI app</summary>

<sup>Unordered list</sup>

- [x] Add Sentiment Analyzer as a message filter layer.
- [x] Allows user to turn the strict mode off.
- [ ] Rate limit.
- [ ] Store chat history/log using database.
- [ ] Integrate with AI model.

</details>

### AI powered chatbot

#### 1. Natural Language Processing model:

`@tensorflow-models/toxicity`

*Read more*: [tensorflow's hate_speech_offensive catalog](https://www.tensorflow.org/datasets/community_catalog/huggingface/hate_speech_offensive), and Huggingface datasets.

**Pros**: Can train and customize our own models. No API calls are required, reduces latency.

**Cons**: Requires ML expertise, high maintainance effort. Running, traing models can lead to slow perf., and increased server costs.

#### 2. Offensive Language Detection API

Consider between Microsoft Content Moderator (`https://api.cognitive.microsoft.com/contentmoderator/moderate/`) or [Perspective API](https://perspectiveapi.com/).

**Pros**: Easy, maximum scaleable, maintenance-free. Trained using big data, and continuously improve everyday.

**Cons**: Depend on API. Limited customization. Network latency. Privacy concerns. Usage-based pricing models, so costs can grow significantly.

### Realtime Chat website

<details>
<summary>[Web] Chat app with AI-powered assistant bot</summary>

<sup>List in order of priority</sup>

- [ ] End-to-end encryption chat history.
- [ ] Store chat history/log using database.
- [ ] User rating the content censorship.
  - [ ] Show optional small rating buttons below a filted message & collect the rating.
- [ ] Based on collected data, re-train the model periodically.

</details>
