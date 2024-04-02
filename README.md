# Extension Template for Chub

This is a template extension that does nothing, to be used as a base
when developing extensions. Please clone it [from GitHub](https://github.com/CharHubAI/extension-template) to use as a template.

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
