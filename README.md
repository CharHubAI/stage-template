![](demo.GIF)

# Stage Template for Chub

This is a template stage that does nothing, to be used as a base
when developing stages. Please clone it [from GitHub](https://github.com/CharHubAI/stage-template) to use as a template.

# Overview

A Stage is a software component written by other people that can be used within a chat with a language model. They are meant to add functionality like expression packs (showing a character's emotional state with a set of images), UIs for mini-games, special prompt handling, or even interacting with third-party APIs. If you're familiar with React and/or TypeScript, you can write a stage yourself.

### Stage Use Cases
- Creating a UI for a world, character, or setting
- Making RPGs and other multimedia experiences
- Custom stat blocks that can do math and handle state correctly
- Specific input/output handling in code to deal with quirks of a particular model

### Why develop a stage instead of making something from scratch?
- **Intuitive Development:** The stages framework and platform were created with developers in mind from the ground up, resulting in as straightforward an interface as possible with a negligible learning curve. 
- **Cross-Platform:** Stages are write once, run everywhere. When you commit, your stage is immediately built and available on the web, iOS and Android mobile devices, and the Vision Pro, with support for more platforms incoming. 
- **Multimedia:** Language, imagery, audio, and everything else can add up to a half-dozen or more APIs and interfaces that need to be set up, tested, monitored. With a stage, a unified interface for all of it is built in.
- **Audience Reach:** Many gaming and multimedia platforms ban GenAI content outright, or have userbases hostile to it. Chub has millions of people specifically here for generative AI.
- **Peace of Mind:** It has become a trope for passion projects using OpenAI and other APIs to get destroyed by hostiles reverse engineering it into a free proxy. If developed as a stage, it's not your problem, and you can focus on what matters.
- **Actively Developed Platform:** This is just the beginning. Scheduling, full VR/AR support, non-React implementations, and more are incoming.


# Meta -- But Why?

As far as why this has been created, I’m trying to go where the puck is going instead of where it is, and I think there’s a need for something like itch.io for generative AI where (1) developers don’t have to worry about integrations and devops and (2) there’s an audience of people that are already explicitly on the AI side of the pro/anti discussion.

This is basically in the early stages of “do developers want this?” with a fraction of what I want to do with it if the answer is yes. The current license is to prevent competing platforms, and if it turns out to be something there is strong interest in it would be going the way of itch where it’s not just commercial use allowed but explicitly a platform for indies to monetize through.

# Latest Documentation

The latest documentation is at [https://docs.chub.ai/docs/stages](https://docs.chub.ai/docs/stages).

# Quickstart

You'll need node@21.7.1 and yarn installed.
Then, to get started:

``` 
git clone https://github.com/CharHubAI/stage-template
cd stage-template
yarn install
yarn dev
```

The class you'll need to fill out and implement is in src/Stage.tsx.

When running locally, as there is no chat UI/running chat, src/TestRunner.tsx is run. This only runs in development.
Please modify it to test whatever you need.

This project uses GitHub actions to update the stage in Chub on 
commits to the main branch. For your project to do this,
you'll need to get a stage auth token from [the api](https://api.chub.ai/openapi/swagger#/User%20Account/create_projects_token_account_tokens_projects_post).

Then in the GitHub project, go to Settings -> Secrets and Variables -> Actions ->
Repository secrets -> New Repository Secret. Add the token with the name "CHUB_AUTH_TOKEN".

The use of an IDE like Intellij is very strongly recommended.
