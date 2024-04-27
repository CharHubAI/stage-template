import {ChubExtension} from "./ChubExtension.tsx";
import {useEffect, useState} from "react";
import {DEFAULT_INITIAL, DEFAULT_MESSAGE, Extension, ExtensionResponse, InitialData} from "chub-extensions-ts";

// Modify this JSON to include whatever character/user information you want to test.
import InitData from './assets/test-init.json';

export interface TestExtensionRunnerProps<ExtensionType extends Extension<InitStateType, ChatStateType, MessageStateType, ConfigType>, InitStateType, ChatStateType, MessageStateType, ConfigType> {
    factory: (data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) => ExtensionType;
}

/***
 This is a testing class for running an extension locally when testing,
    outside the context of an active chat. See runTests() below for the main idea.
 ***/
export const TestExtensionRunner = <ExtensionType extends Extension<InitStateType, ChatStateType, MessageStateType, ConfigType>,
    InitStateType, ChatStateType, MessageStateType, ConfigType>({ factory }: TestExtensionRunnerProps<ExtensionType, InitStateType, ChatStateType, MessageStateType, ConfigType>) => {

    // You may need to add a @ts-ignore here,
    //     as the linter doesn't always like the idea of reading types arbitrarily from files
    const [extension, _setExtension] = useState(new ChubExtension({...DEFAULT_INITIAL, ...InitData}));

    // This is what forces the extension node to re-render.
    const [node, setNode] = useState(new Date());

    function refresh() {
        setNode(new Date());
    }

    async function delayedTest(test: any, delaySeconds: number) {
        await new Promise(f => setTimeout(f, delaySeconds * 1000));
        return test();
    }

    /***
     This is the main thing you'll want to modify.
     ***/
    async function runTests() {
        await extension.setState({someKey: 'A new value, even!'});
        refresh();

        const beforePromptResponse: Partial<ExtensionResponse<ChatStateType, MessageStateType>> = await extension.beforePrompt({
            ...DEFAULT_MESSAGE, ...{
                anonymizedId: "0",
                content: "Hello, this is what happens when a human sends a message, but before it's sent to the model.",
                isBot: false
            }
        });
        console.assert(beforePromptResponse.error == null);
        refresh();

        /***
         "What is all of this nonsense with 'DEFAULT_MESSAGE'?" you may well ask.
         The purpose of this is to future-proof your test runner.
         The extension interface is designed to be forwards-compatible,
            so that an extension with a certain library version will continue to work
            even if new fields are added to any of the call/response objects.
         But when new fields are added to the input objects, the code calling an
            extension needs to be updated. Using DEFAULT_MESSAGE,
            DEFAULT_INITIAL, DEFAULT_CHARACTER, DEFAULT_USER,
            DEFAULT_LOAD_RESPONSE, and DEFAULT_RESPONSE
            where relevant in your tests prevents a version bump
            from breaking your test runner in many cases.
         ***/
        const afterPromptResponse: Partial<ExtensionResponse<ChatStateType, MessageStateType>> = await extension.afterResponse({
            ...DEFAULT_MESSAGE, ...{
            promptForId: null,
            anonymizedId: "2",
            content: "Why yes hello, and this is what happens when a bot sends a response.",
            isBot: true}});
        console.assert(afterPromptResponse.error == null);
        refresh();

        const afterDelayedThing: Partial<ExtensionResponse<ChatStateType, MessageStateType>> = await delayedTest(() => extension.beforePrompt({
            ...DEFAULT_MESSAGE, ...{
            anonymizedId: "0", content: "Hello, and now the human is prompting again.", isBot: false, promptForId: null
        }}), 5);
        console.assert(afterDelayedThing.error == null);
        refresh();
    }

    useEffect(() => {
        // Always do this first, and put any other calls inside the load response.
        extension.load().then((res) => {
            console.info(`Test Extension Runner load success result was ${res.success}`);
            if(!res.success || res.error != null) {
                console.error(`Error from extension during load, error: ${res.error}`);
            } else {
                runTests().then(() => console.info("Done running tests."));
            }
        });
    }, []);

    return <>
        <div style={{display: 'none'}}>{String(node)}{window.location.href}</div>
        {extension == null ? <div>Extension loading...</div> : extension.render()}
    </>;
}
