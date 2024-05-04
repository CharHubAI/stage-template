![](demo.GIF)

# Generative Extension Template for Chub

This is a template extension that does nothing, to be used as a base
when developing extensions. Please clone it [from GitHub](https://github.com/CharHubAI/extension-template) to use as a template.

# Overview

A Generative Extension is a software component written by other people that can be used within a chat with a language model. They are meant to add functionality like expression packs (showing a character's emotional state with a set of images), UIs for mini-games, special prompt handling, or even interacting with third-party APIs. If you're familiar with React and/or TypeScript, you can write an extension yourself.

### Extension Use Cases
- Creating a UI for a world, character, or setting
- Making RPGs and other multimedia experiences
- Custom stat blocks that can do math and handle state correctly
- Specific input/output handling in code to deal with quirks of a particular model

### Why develop an extension instead of making something from scratch?
- **Intuitive Development:** The extensions framework and platform were created with developers in mind from the ground up, resulting in as straightforward an interface as possible with a negligible learning curve. 
- **Cross-Platform:** Extensions are write once, run everywhere. When you commit, your extension is immediately built and available on the web, iOS and Android mobile devices, and the Vision Pro, with support for more platforms incoming. 
- **Multimedia:** Language, imagery, audio, and everything else can add up to a half-dozen or more APIs and interfaces that need to be set up, tested, monitored. With an extension, a unified interface for all of it is built in.
- **Audience Reach:** Many gaming and multimedia platforms ban GenAI content outright, or have userbases hostile to it. Chub has millions of people specifically here for generative AI.
- **Peace of Mind:** It has become a trope for passion projects using OpenAI and other APIs to get destroyed by hostiles reverse engineering it into a free proxy. If developed as an extension, it's not your problem, and you can focus on what matters.
- **Actively Developed Platform:** This is just the beginning. Scheduling, full VR/AR support, non-React implementations, and more are incoming.


# Latest Documentation

The latest documentation is at [https://docs.chub.ai/docs/extensions](https://docs.chub.ai/docs/extensions).

# Quickstart

You'll need node@21.7.1 and yarn installed.
Then, to get started:

``` 
git clone https://github.com/CharHubAI/extension-template
cd extension-template
yarn install
yarn dev
```

The class you'll need to fill out and implement is in src/ChubExtension.tsx.

When running locally, as there is no chat UI/running chat, src/TestRunner.tsx is run. This only runs in development.
Please modify it to test whatever you need.

This project uses GitHub actions to update the extension in Chub on 
commits to the main branch. For your project to do this,
you'll need to get an extension auth token from [the api](https://api.chub.ai/openapi/swagger#/User%20Account/create_projects_token_account_tokens_projects_post).

Then in the GitHub project, go to Settings -> Secrets and Variables -> Actions ->
Repository secrets -> New Repository Secret. Add the token with the name "CHUB_AUTH_TOKEN".

The use of an IDE like Intellij is very strongly recommended.
