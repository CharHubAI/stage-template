import {ReactElement} from "react";
import {StageBase, StageResponse, InitialData, Message} from "@chub-ai/stages-ts";
import {LoadResponse} from "@chub-ai/stages-ts/dist/types/load";

/**
 *  * ===============================
  * Starfleet Academy Campaign Types
   * ===============================
    */

    /** Simple numeric axis type (0–100 expected range). */
    type Axis0to100 = number;

    /**
     * Multi-axis relationship model between the player and an NPC.
      * All values are 0–100 unless otherwise noted.
       */
       type Relationship = {
         trust: Axis0to100;        // belief in honesty / loyalty
           affinity: Axis0to100;     // personal liking / bond
             respect: Axis0to100;      // perception of competence or integrity
               fear: Axis0to100;         // intimidation or wariness
                 attraction: Axis0to100;   // romantic/chemistry potential
                   leverage: Axis0to100;     // power over someone (secrets, rank, favors)
                   };

                   /**
                    * Player psychological profile.
                     * Represents long-term character tendencies.
                      */
                      type PlayerPsyche = {
                        morality: Axis0to100;     // alignment with Starfleet ethics
                          resilience: Axis0to100;   // stress tolerance
                            aggression: Axis0to100;   // willingness to escalate force
                              curiosity: Axis0to100;    // desire to explore / investigate
                                discipline: Axis0to100;   // obedience to structure & authority
                                  empathy: Axis0to100;      // concern for others
                                  };

                                  /**
                                   * Per-message persistent state.
                                    * Saved after every message.
                                     */
                                     type MessageStateType = {
                                       turnNumber: number;
                                       };

                                       /**
                                        * Stage configuration.
                                         * User-adjustable options (expand later if needed).
                                          */
                                          type ConfigType = {
                                            safeMode: boolean;  // restrict explicit content
                                            };

                                            /**
                                             * One-time initialization state created when the stage
                                              * is first attached to a chat.
                                               */
                                               type InitStateType = {
                                                 campaignId: string;
                                                   createdAtIso: string;
                                                   };

                                                   /**
                                                    * Long-term persistent campaign state.
                                                     * This is your "save file."
                                                      */
                                                      type ChatStateType = {
                                                        // Core campaign meters
                                                          section31Suspicion: Axis0to100;
                                                            starfleetTrust: Axis0to100;
                                                              clearanceLevel: number; // 0–5 tier system
                                                                stress: Axis0to100;
                                                                  injury: Axis0to100;

                                                                    // Player personality profile
                                                                      psyche: PlayerPsyche;

                                                                        // NPC relationships (key = npcId string)
                                                                          relationships: Record<string, Relationship>;

                                                                            // Campaign progression
                                                                              currentObjective: string;
                                                                                activeFlags: string[];
                                                                                  missionLog: string[];
                                                                                    lastRecapIso?: string;

                                                                                      // Wiki lookup tracking (used later)
                                                                                        lastBriefingTopic?: string;
                                                                                        };

/***
 *  * A simple example class that implements the interfaces necessary for a Stage.
  * If you want to rename it, be sure to modify App.js as well.
   * @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/stage.ts
    ***/
    export class Stage extends StageBase<InitStateType, ChatStateType, MessageStateType, ConfigType> {

      /***
         * A very simple example internal state. Can be anything.
            * This is ephemeral in the sense that it isn't persisted to a database,
               * but exists as long as the instance does, i.e., the chat page is open.
                  ***/
                    myInternalState: { [key: string]: any };

                      constructor(data: InitialData<InitStateType, ChatStateType, MessageStateType, ConfigType>) {
                          /***
                               * This is the first thing called in the stage, to create an instance of it.
                                    * The definition of InitialData is at:
                                         * @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/initial.ts
                                              * Character:
                                                   * @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/character.ts
                                                        * User:
                                                             * @link https://github.com/CharHubAI/chub-stages-ts/blob/main/src/types/user.ts
                                                                  ***/
                                                                      super(data);
                                                                          const {
                                                                                characters,    // @type:  { [key: string]: Character }
                                                                                      users,         // @type:  { [key: string]: User}
                                                                                            config,        // @type:  ConfigType
                                                                                                  messageState,  // @type:  MessageStateType | null
                                                                                                        environment,   // @type: Environment (which is a string)
                                                                                                              initState,     // @type: null | InitStateType
                                                                                                                    chatState      // @type: null | ChatStateType
                                                                                                                        } = data;

                                                                                                                            // Use persisted messageState if available, otherwise start at turnNumber = 0
                                                                                                                                this.myInternalState = messageState != null ? messageState : { turnNumber: 0 };

                                                                                                                                    // Make sure turnNumber is always a number
                                                                                                                                        this.myInternalState['turnNumber'] = typeof this.myInternalState['turnNumber'] === 'number'
                                                                                                                                              ? this.myInternalState['turnNumber']
                                                                                                                                                    : 0;

                                                                                                                                                        this.myInternalState['numUsers'] = Object.keys(users).length;
                                                                                                                                                            this.myInternalState['numChars'] = Object.keys(characters).length;
                                                                                                                                                              }

                                                                                                                                                                async load(): Promise<Partial<LoadResponse<InitStateType, ChatStateType, MessageStateType>>> {
                                                                                                                                                                    /***
                                                                                                                                                                         * This is called immediately after the constructor, in case there is some asynchronous code you need to
                                                                                                                                                                              * run on instantiation.
                                                                                                                                                                                   ***/
                                                                                                                                                                                       return {
                                                                                                                                                                                             /*** @type boolean @default null
                                                                                                                                                                                                    * @description The 'success' boolean returned should be false IFF (if and only if), some condition is met that means
                                                                                                                                                                                                           * the stage shouldn't be run at all and the iFrame can be closed/removed.
                                                                                                                                                                                                                  ***/
                                                                                                                                                                                                                        success: true,
                                                                                                                                                                                                                              /*** @type null | string @description an error message to show briefly at the top of the screen, if any. ***/
                                                                                                                                                                                                                                    error: null,
                                                                                                                                                                                                                                          initState: null,
                                                                                                                                                                                                                                                chatState: null,
                                                                                                                                                                                                                                                    };
                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                        async setState(state: MessageStateType): Promise<void> {
                                                                                                                                                                                                                                                            /***
                                                                                                                                                                                                                                                                 * This can be called at any time, typically after a jump to a different place in the chat tree
                                                                                                                                                                                                                                                                      * or a swipe. Note how neither InitState nor ChatState are given here. They are not for
                                                                                                                                                                                                                                                                           * state that is affected by swiping.
                                                                                                                                                                                                                                                                                ***/
                                                                                                                                                                                                                                                                                    if (state != null) {
                                                                                                                                                                                                                                                                                          this.myInternalState = { ...this.myInternalState, ...state };
                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                  async beforePrompt(userMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
                                                                                                                                                                                                                                                                                                      /***
                                                                                                                                                                                                                                                                                                           * This is called after someone presses 'send', but before anything is sent to the LLM.
                                                                                                                                                                                                                                                                                                                ***/
                                                                                                                                                                                                                                                                                                                    const {
                                                                                                                                                                                                                                                                                                                          content,
                                                                                                                                                                                                                                                                                                                                anonymizedId,
                                                                                                                                                                                                                                                                                                                                      isBot
                                                                                                                                                                                                                                                                                                                                          } = userMessage;

                                                                                                                                                                                                                                                                                                                                              // Increment turn counter on each user send
                                                                                                                                                                                                                                                                                                                                                  this.myInternalState['turnNumber'] = (this.myInternalState['turnNumber'] ?? 0) + 1;

                                                                                                                                                                                                                                                                                                                                                      return {
                                                                                                                                                                                                                                                                                                                                                            stageDirections: null,
                                                                                                                                                                                                                                                                                                                                                                  /*** @type MessageStateType | null @description the new state after the userMessage. ***/
                                                                                                                                                                                                                                                                                                                                                                        messageState: { turnNumber: this.myInternalState['turnNumber'] ?? 0 },
                                                                                                                                                                                                                                                                                                                                                                              modifiedMessage: null,
                                                                                                                                                                                                                                                                                                                                                                                    systemMessage: null,
                                                                                                                                                                                                                                                                                                                                                                                          error: null,
                                                                                                                                                                                                                                                                                                                                                                                                chatState: null,
                                                                                                                                                                                                                                                                                                                                                                                                    };
                                                                                                                                                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                                                                                                                                                        async afterResponse(botMessage: Message): Promise<Partial<StageResponse<ChatStateType, MessageStateType>>> {
                                                                                                                                                                                                                                                                                                                                                                                                            /***
                                                                                                                                                                                                                                                                                                                                                                                                                 * This is called immediately after a response from the LLM.
                                                                                                                                                                                                                                                                                                                                                                                                                      ***/
                                                                                                                                                                                                                                                                                                                                                                                                                          const {
                                                                                                                                                                                                                                                                                                                                                                                                                                content,
                                                                                                                                                                                                                                                                                                                                                                                                                                      anonymizedId,
                                                                                                                                                                                                                                                                                                                                                                                                                                            isBot
                                                                                                                                                                                                                                                                                                                                                                                                                                                } = botMessage;

                                                                                                                                                                                                                                                                                                                                                                                                                                                    return {
                                                                                                                                                                                                                                                                                                                                                                                                                                                          stageDirections: null,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                /*** @type MessageStateType | null @description the new state after the botMessage. ***/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      messageState: { turnNumber: this.myInternalState['turnNumber'] ?? 0 },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            modifiedMessage: null,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  error: null,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        systemMessage: null,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              chatState: null
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  };
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      render(): ReactElement {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          /***
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               * There should be no "work" done here. Just returning the React element to display.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    ***/
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        return (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              <div style={{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      width: '100vw',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              height: '100vh',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      display: 'grid',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              alignItems: 'stretch'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            <div>Hello World! I'm an empty stage! Turn #{this.myInternalState['turnNumber']}.</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              There is/are/were {this.myInternalState['numChars']} character(s) and {this.myInternalState['numUsers']} human(s) here.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }