import {ChubExtension} from "./ChubExtension.tsx";
import {useEffect, useState} from "react";
import {Extension, ExtensionResponse, InitialData} from "chub-extensions-ts";

// Modify this JSON to include whatever character/user information you want to test.
import InitData from './assets/test-init.json';

export interface TestExtensionRunnerProps<ExtensionType extends Extension<StateType, ConfigType>, StateType, ConfigType> {
    factory: (data: InitialData<StateType, ConfigType>) => ExtensionType;
}

/***
 This is a testing class for running an extension locally when testing,
    outside the context of an active chat. See runTests() below for the main idea.
 ***/
export const TestExtensionRunner = <ExtensionType extends Extension<StateType, ConfigType>,
    StateType, ConfigType>({ factory }: TestExtensionRunnerProps<ExtensionType, StateType, ConfigType>) => {

    // @ts-ignore the linter doesn't always like the idea of reading types arbitrarily from strings
    const [extension, _setExtension] = useState(new ChubExtension(InitData));

    // This is what forces the extension node to re-render.
    const [node, setNode] = useState(new Date());

    function refresh() {
        setNode(new Date());
    }

    async function delayedTest(test, delaySeconds) {
        await new Promise(f => setTimeout(f, delaySeconds * 1000));
        return test();
    }

    /***
     This is the main thing you'll want to modify.
     ***/
    async function runTests() {
        await extension.setState({someKey: 'A new value, even!'});
        refresh();

        const beforePromptResponse: Partial<ExtensionResponse<StateType>> = await extension.beforePrompt({
            anonymizedId: "0", content: "Hello, this is what happens when a human sends a message, but before it's sent to the model.", isBot: false
        });
        console.assert(beforePromptResponse.error == null);
        refresh();

        const afterPromptResponse: Partial<ExtensionResponse<StateType>> = await extension.afterResponse({
            anonymizedId: "2",
            content: "Why yes hello, and this is what happens when a bot sends a response.",
            isBot: true});
        console.assert(afterPromptResponse.error == null);
        refresh();

        const afterDelayedThing: Partial<ExtensionResponse<StateType>> = await delayedTest(() => extension.beforePrompt({
            anonymizedId: "0", content: "Hello, and now the human is prompting again.", isBot: false
        }), 5);
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
