import {ReactElement} from "react";
import {Extension, ExtensionResponse, InitialData, Message} from "chub-extensions-ts";
import {LoadResponse} from "chub-extensions-ts/dist/types/load";

/***
 The type that this extension persists message-level state in.
 This is primarily for readability, and not enforced.

 @description This type is saved in the database after each message,
  which makes it ideal for storing things like positions and statuses,
  but not for things like history, which is best managed ephemerally
  in the internal state of the ChubExtension class itself.
 ***/
type StateType = any;

/***
 The type of the extension-specific configuration of this extension.

 @description This is for things you want people to be able to configure,
  like background color.
 ***/
type ConfigType = any;

/***
 A simple example class that implements the interfaces necessary for an Extension.
 If you want to rename it, be sure to modify App.js as well.
 @link https://github.com/CharHubAI/chub-extensions-ts/blob/main/src/types/extension.ts
 ***/
export class ChubExtension implements Extension<StateType, ConfigType> {

    /***
     A very simple example internal state. Can be anything.
     This is ephemeral in the sense that it isn't persisted to a database,
     but exists as long as the instance does, i.e., the chat page is open.
     ***/
    myInternalState: {[key: string]: any};

    constructor(data: InitialData<StateType, ConfigType>) {
        /***
         This is the first thing called in the extension,
         to create an instance of it.
         The definition of InitialData is at @link https://github.com/CharHubAI/chub-extensions-ts/blob/main/src/types/initial.ts
         Character at @link https://github.com/CharHubAI/chub-extensions-ts/blob/main/src/types/character.ts
         User at @link https://github.com/CharHubAI/chub-extensions-ts/blob/main/src/types/user.ts
         ***/
        const {
            characters,     // @type:  { [key: string]: Character }
            users,              // @type:  { [key: string]: User}
            config,                             //  @type:  ConfigType
            lastState                           //  @type:  StateType
        } = data;
        this.myInternalState = lastState != null ? lastState : {'someKey': 'someValue'};
        this.myInternalState['numUsers'] = Object.keys(users).length;
        this.myInternalState['numChars'] = Object.keys(characters).length;
    }

    async load(): Promise<Partial<LoadResponse>> {
        /***
         This is called immediately after the constructor, in case there is some asynchronous code you need to
         run on instantiation.
         ***/
        return {
            /*** @type boolean @default null
             @description The 'success' boolean returned should be false IFF (if and only if), some condition is met that means
              the extension shouldn't be run at all and the iFrame can be closed/removed.
              For example, if an extension displays expressions and no characters have an expression pack,
              there is no reason to run the extension, so it would return false here. ***/
            success: true,
            /*** @type string | null @description an error message to show
             briefly at the top of the screen, if any. ***/
            error: null
        };
    }

    async setState(state: StateType): Promise<void> {
        /***
         This can be called at any time, typically after a jump to a different place in the chat tree
         or a swipe.
         ***/
        if (state != null) {
            this.myInternalState = {...this.myInternalState, ...state};
        }
    }

    async beforePrompt(userMessage: Message): Promise<Partial<ExtensionResponse<StateType>>> {
        /***
         This is called after someone presses 'send', but before anything is sent to the LLM.
         ***/
        const {
            content,            /*** @type: string
             @description Just the last message about to be sent. ***/
            anonymizedId,       /*** @type: string
             @description An anonymized ID that is unique to this individual
              in this chat, but NOT their Chub ID. ***/
            isBot             /*** @type: boolean
             @description Whether this is itself from another bot, ex. in a group chat. ***/
        } = userMessage;
        return {
            /*** @type string | null @description A string to add to the
             end of the final prompt sent to the LLM,
             but that isn't persisted. ***/
            extensionMessage: null,
            /*** @type StateType | null @description the new state after the userMessage. ***/
            state: {'someKey': this.myInternalState['someKey']},
            /*** @type string | null @description If not null, the user's message itself is replaced
             with this value, both in what's sent to the LLM and in the database. ***/
            modifiedMessage: null,
            /*** @type string | null @description an error message to show
             briefly at the top of the screen, if any. ***/
            error: null
        };
    }

    async afterResponse(botMessage: Message): Promise<Partial<ExtensionResponse<StateType>>> {
        /***
         This is called immediately after a response from the LLM.
         ***/
        const {
            content,            /*** @type: string
             @description The LLM's response. ***/
            anonymizedId,       /*** @type: string
             @description An anonymized ID that is unique to this individual
              in this chat, but NOT their Chub ID. ***/
            isBot             /*** @type: boolean
             @description Whether this is from a bot, conceivably always true. ***/
        } = botMessage;
        return {
            /*** @type string | null @description A string to add to the
             end of the final prompt sent to the LLM,
             but that isn't persisted. ***/
            extensionMessage: null,
            /*** @type StateType | null @description the new state after the botMessage. ***/
            state: {'someKey': this.myInternalState['someKey']},
            /*** @type string | null @description If not null, the bot's response itself is replaced
             with this value, both in what's sent to the LLM subsequently and in the database. ***/
            modifiedMessage: null,
            /*** @type string | null @description an error message to show
             briefly at the top of the screen, if any. ***/
            error: null
        };
    }


    render(): ReactElement {
        /***
         There should be no "work" done here. Just returning the React element to display.
         If you're unfamiliar with React, I've heard good things about
         @https://scrimba.com/learn/learnreact but haven't personally watched/used it.
         ***/
        return <div style={{
            width: '100vw',
            height: '100vh',
            display: 'grid',
            alignItems: 'stretch'
        }}>
            <div>Hello World! I'm an empty extension! With {this.myInternalState['someKey']}!</div>
            <div>There is/are/were {this.myInternalState['numChars']} character(s)
                and {this.myInternalState['numUsers']} human(s) here.
            </div>
        </div>;
    }

}
