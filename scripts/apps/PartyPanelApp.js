import { openSheet, selectToken } from "../actions.js";
import { setupHealthPointsTracker } from "../helpers.js";

const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api
const MODULE_ID = "lights-out-shadowdark-v14-dev";

export class PartyPanelApp extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
        id: "party",
        tag: "div",
        position: {
            width: "auto",
            height: "auto",
        },
        window: {
            frame: false,
            positioned: false,
        },
    }

    static PARTS = {
        main: {
            template: "modules/lights-out-shadowdark-v14-dev/templates/party.hbs"
        }
    }

    constructor(data = {}, options = {}) {
        super(options);
        this.partyData = data;
    }

    updateData(data) {
        this.partyData = data;
        this.render();
    }

    _prepareContext(options) {
        const hidePartyHealth = game.settings.get(MODULE_ID, "hide_party_health");
        const isGM = game.user.isGM;
        const userCharacterUuid = game.user.character?.uuid;

        return {
            hidePartyHealth: isGM ? false : hidePartyHealth, // GMs always sees health
            userCharacterUuid: userCharacterUuid,
            characters: this.partyData
        };
    }

    _insertElement(element) {
        const existing = document.getElementById(element.id);

        const container = document.querySelector("#ui-left");
        
        if (!container) {
            console.warn("Target container #ui-left not found");
            return;
        }
        
        if (existing) {
            if (existing.parentElement !== container) {
                existing.remove();
                container.appendChild(element);
            } else {
                existing.replaceWith(element);
            }
        } else {
            container.appendChild(element);
        }

        this._positionBelowSceneControls(element);
    }

    _onRender(context, options) {
        this._positionBelowSceneControls(this.element);

        // Event listener for opening the character sheet
        const character = document.querySelectorAll("#party .character-picture");
        if (character.length > 0) {
            character.forEach(el => {
                el.addEventListener("click", selectToken);
                el.addEventListener("dblclick", openSheet);
            });
        }

        // Register HP input handlers
        const healthInputs = this.element.querySelectorAll('.current-health');
        for (const input of healthInputs) {
            setupHealthPointsTracker(input);
        }
    }

    _positionBelowSceneControls(element) {
        const container = document.querySelector("#ui-left");
        const sceneControls = document.querySelector("#scene-controls");
        if (!element || !container || !sceneControls) return;

        const visibleControls = Array.from(sceneControls.querySelectorAll("button"))
            .filter(button => button.getClientRects().length > 0);
        const lastControlBottom = visibleControls.reduce(
            (bottom, button) => Math.max(bottom, button.getBoundingClientRect().bottom),
            sceneControls.getBoundingClientRect().top
        );
        const containerTop = container.getBoundingClientRect().top;
        const uiScale = Number.parseFloat(
            getComputedStyle(document.body).getPropertyValue("--ui-scale")
        ) || 1;

        element.style.top = `${((lastControlBottom - containerTop) / uiScale) + 12}px`;
        element.style.left = "0";
    }
}
