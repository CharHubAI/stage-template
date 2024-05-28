import { InitialData } from '@chub-ai/stages-ts';
import { LoadResponse } from '@chub-ai/stages-ts/dist/types/load';
import { Message } from '@chub-ai/stages-ts';
import { ReactElement } from 'react';
import { StageBase } from '@chub-ai/stages-ts';
import { StageResponse } from '@chub-ai/stages-ts';

/***
 The type that this stage persists dynamic chat-level state in.
 This is for any state information unique to a chat,
 that applies to ALL branches and paths such as clearing fog-of-war.
 It is usually unlikely you will need this, and if it is used for message-level
 data like player health then it will enter an inconsistent state whenever
 they change branches or jump nodes. Use MessageStateType for that.
 ***/
declare type ChatStateType = any;

/***
 The type of the stage-specific configuration of this stage.

 @description This is for things you want people to be able to configure,
 like background color.
 ***/
declare type ConfigType = any;

/***
 The type that this stage persists chat initialization state in.
 If there is any 'constant once initialized' static state unique to a chat,
 like procedurally generated terrain that is only created ONCE and ONLY ONCE per chat,
 it belongs here.
 ***/
declare type InitStateType = any;

/***
 The type that this stage persists message-level state in.
 This is primarily for readability, and not enforced.

 @description This type is saved in the database after each message,
 which makes it ideal for storing things like positions and statuses,
 but not for things like history, which is best managed ephemerally
 in the internal state of the Stage class itself.
 ***/
declare type MessageStateType = any;

/***
 A simple example class that implements the interfaces necessary for a Stage.
 If you want to rename it, be sure to modify App.js as well.
 @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/stage.ts
 ***/
export declare class Stage extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {
    /***
     A very simple example internal state. Can be anything.
     This is ephemeral in the sense that it isn't persisted to a database,
     but exists as long as the instance does, i.e., the chat page is open.
     ***/
    myInternalState: {
        [key: string]: any;
    };
    constructor(data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>);
    load(): Promise<Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>>;
    setState(state: MessageStateType): Promise<void>;
    beforePrompt(userMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>>;
    afterResponse(botMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>>;
    render(): ReactElement;
}

export { }
