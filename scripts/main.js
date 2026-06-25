import {
  getCharacter,
  getPartyCharacters,
  getEntityData
} from "./character.js";
import { registerSettings } from "./settings.js";
import { CharacterPanelApp } from "./apps/CharacterPanelApp.js";
import { PartyPanelApp } from "./apps/PartyPanelApp.js";

const MODULE_ID = "lights-out-shadowdark-v14-dev";
const LOG_PREFIX = "Lights Out Theme v14 Dev";
let hotbarDragCleanup = null;

Hooks.once("init", async () => {
    registerSettings();
});

Hooks.once("ready", async () => {
    // Enable high contrast mode for icons
    // This changes a CSS variable to enable/disable the filter
    let highContrastModeSetting = game.settings.get(MODULE_ID, "icon-high-contrast-mode");
    if (highContrastModeSetting) document.documentElement.classList.add("high-contrast");

    // Create and render apps
    game.lightsOutTheme = game.lightsOutTheme || {};
    game.lightsOutTheme.characterPanel = new CharacterPanelApp();
    game.lightsOutTheme.characterPanel.render(true);

    game.lightsOutTheme.partyPanel = new PartyPanelApp();
    game.lightsOutTheme.partyPanel.render(true);

    // Initial data for UI components
    await renderCharacter();
    await renderParty();

    console.log(`${LOG_PREFIX} | Ready`);
});

Hooks.on("renderSettings", function (app) {
  const modulesSection = app.element?.querySelector('section[data-tab="modules"]');
  if (!modulesSection || modulesSection.nextElementSibling?.classList.contains("lights-out-block")) return;

  const block = document.createElement("div");
  block.className = "lights-out-block";
  modulesSection.insertAdjacentElement("afterend", block);
});

// Hide UI elements if current player permissions are below the global setting
Hooks.on("renderHotbar", async (app) => {
    const hotBarSetting = game.settings.get(MODULE_ID, "hotbar_visibility");
    setAppHidden(app, hotBarSetting < userPermission());
    setupMovableHotbar(app.element);
});

const renderPlayers = async (app) => {
    const playerListSetting = game.settings.get(MODULE_ID, "players_list_visibility");
    setAppHidden(app, playerListSetting < userPermission());
};

// V14 uses the Players ApplicationV2 class. Keep the legacy hook during the
// development period in case a compatible core build or system still emits it.
Hooks.on("renderPlayers", renderPlayers);
Hooks.on("renderPlayerList", renderPlayers);

Hooks.on("renderSceneNavigation", async (app) => {
    const navBarSetting = game.settings.get(MODULE_ID, "navbar_visibility");
    setAppHidden(app, navBarSetting < userPermission());

    const hotBarSetting = game.settings.get(MODULE_ID, "hotbar_visibility");
    app.element?.classList.toggle("with-hotbar", Boolean(hotBarSetting));
});

Hooks.on("renderSceneControls", (controls) => {
    const controlsElement = controls.element ?? document.getElementById("scene-controls");
    const sidebarExpanded = ui.sidebar?.expanded ?? true;

    // The controls markup changed in V14. Only add the legacy convenience
    // button when its known host exists; the rest of the theme remains usable
    // when Foundry presents the new Placeables palette instead.
    const buttonHost = controlsElement?.querySelector("ol.control-tools.main-controls");
    if (buttonHost && !buttonHost.querySelector(".sidebar-control")) {
        const button = document.createElement("li");
        button.className = "scene-control sidebar-control";
        button.dataset.tooltip = game.i18n.localize("LIGHTSOUTSD.sidebar_tooltip");
        button.innerHTML = `<i class="fas ${sidebarExpanded ? "fa-caret-right" : "fa-caret-left"}"></i>`;
        button.addEventListener("click", () => {
            ui.sidebar?.expanded ? ui.sidebar.collapse() : ui.sidebar?.expand();
        });
        buttonHost.append(button);
    }

    controlsElement?.classList.toggle("collapsed", !sidebarExpanded);

    document.querySelector("section.effect-panel")?.classList.toggle("collapsed", !sidebarExpanded);
});

Hooks.on("collapseSidebar", (sidebar, collapsed) => {
    ui.controls?.render?.();
    game.shadowdark?.effectPanel?.updateFromRightPx?.();
});

// re-render scene controls when AV dock position changes.
Hooks.on("rtcSettingsChanged", async (settings, changes) => {
    if (changes.client) {
        if ("hideDock" in changes.client || "dockPosition" in changes.client) 
            ui.controls?.render?.();
    }
});

Hooks.on("updateActor", async function (actor) {
  if (game.user.isGM || actor.uuid === getCharacter()?.uuid) {
    await renderCharacter();
  }
  
  await renderParty();
});

Hooks.on('controlToken', async function () {
  if (!game.user.isGM || game.settings.get(MODULE_ID, "disable-gm-selected-token")) return;
  await renderCharacter(true);
});

Hooks.on('userConnected', async function () {
  await renderCharacter();
  await renderParty();
});

Hooks.on('updateUser', async function () {
  await renderCharacter();
  await renderParty();
});

async function renderCharacter(selection = false) {
  const character = getCharacter();
  if (!character) {
    game.lightsOutTheme.characterPanel.hide();
    return;
  }

  let data = await getEntityData(character);
  if (!data) return;

  const settings = {
    hide_title: game.settings.get(MODULE_ID, "hide-pc-title"),
  }
  data.settings = settings;

  // Mark if the render was triggered by a selection
  data.selected = selection;

  game.lightsOutTheme.characterPanel.updateData(data);
}

async function renderParty() {
  const partyVisibility = game.settings.get(MODULE_ID, "party_panel_visibility");
  if (partyVisibility < userPermission()) {
    game.lightsOutTheme.partyPanel.close();
    return;
  }
  
  const characters = await Promise.all(getPartyCharacters().map(getEntityData));
  game.lightsOutTheme.partyPanel.updateData(characters);
}

function userPermission() {
    return game.user.isGM ? 1 : 2; // GMs = 1, Players = 2
}

function setAppHidden(app, hidden) {
    app.element?.classList.toggle("hidden", hidden);
}

function setupMovableHotbar(hotbar) {
    if (!hotbar) return;

    hotbarDragCleanup?.();

    const controls = hotbar.querySelector("#hotbar-controls-left");
    if (!controls) return;

    let grip = controls.querySelector(".lights-out-hotbar-grip");
    if (!grip) {
        grip = document.createElement("button");
        grip.type = "button";
        grip.className = "ui-control fa-solid fa-grip icon lights-out-hotbar-grip";
        grip.dataset.tooltip = "Drag hotbar • Double-click or right-click to reset";
        grip.setAttribute("aria-label", "Move macro hotbar");
        controls.prepend(grip);
    }

    restoreHotbarPosition(hotbar);

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    const onPointerMove = (event) => {
        if (!dragging) return;
        positionHotbar(
            hotbar,
            startLeft + event.clientX - startX,
            startTop + event.clientY - startY
        );
    };

    const onPointerUp = async () => {
        if (!dragging) return;
        dragging = false;
        grip.classList.remove("dragging");
        document.body.classList.remove("lights-out-dragging-hotbar");

        const rect = hotbar.getBoundingClientRect();
        await game.settings.set(MODULE_ID, "hotbar-position", {
            left: Math.round(rect.left),
            top: Math.round(rect.top)
        });
    };

    const onPointerDown = (event) => {
        if (event.button !== 0) return;
        const rect = hotbar.getBoundingClientRect();
        dragging = true;
        startX = event.clientX;
        startY = event.clientY;
        startLeft = rect.left;
        startTop = rect.top;
        grip.classList.add("dragging");
        document.body.classList.add("lights-out-dragging-hotbar");
        grip.setPointerCapture?.(event.pointerId);
        event.preventDefault();
        event.stopPropagation();
    };

    const reset = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        await game.settings.set(MODULE_ID, "hotbar-position", {});
        clearHotbarPosition(hotbar);
    };

    const onResize = () => restoreHotbarPosition(hotbar);

    grip.addEventListener("pointerdown", onPointerDown);
    grip.addEventListener("dblclick", reset);
    grip.addEventListener("contextmenu", reset);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("resize", onResize);

    hotbarDragCleanup = () => {
        grip.removeEventListener("pointerdown", onPointerDown);
        grip.removeEventListener("dblclick", reset);
        grip.removeEventListener("contextmenu", reset);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("resize", onResize);
    };
}

function restoreHotbarPosition(hotbar) {
    const position = game.settings.get(MODULE_ID, "hotbar-position");
    if (!Number.isFinite(position?.left) || !Number.isFinite(position?.top)) {
        clearHotbarPosition(hotbar);
        return;
    }

    positionHotbar(hotbar, position.left, position.top);
}

function positionHotbar(hotbar, requestedLeft, requestedTop) {
    const rect = hotbar.getBoundingClientRect();
    const left = Math.clamp(requestedLeft, 0, Math.max(window.innerWidth - rect.width, 0));
    const top = Math.clamp(requestedTop, 0, Math.max(window.innerHeight - rect.height, 0));

    hotbar.classList.add("lights-out-hotbar-moved");
    hotbar.style.setProperty("margin", "0", "important");
    hotbar.style.setProperty("transform", "none", "important");

    // The hotbar is rendered inside Foundry's centered #ui-middle container,
    // which may also be scaled. Convert viewport coordinates into the
    // hotbar's local positioning space by correcting from its measured bounds.
    const currentLocalLeft = Number.parseFloat(hotbar.style.left) || 0;
    const currentLocalTop = Number.parseFloat(hotbar.style.top) || 0;
    const uiScale = Number.parseFloat(
        getComputedStyle(document.body).getPropertyValue("--ui-scale")
    ) || 1;

    hotbar.style.setProperty(
        "left",
        `${currentLocalLeft + ((left - rect.left) / uiScale)}px`,
        "important"
    );
    hotbar.style.setProperty(
        "top",
        `${currentLocalTop + ((top - rect.top) / uiScale)}px`,
        "important"
    );
}

function clearHotbarPosition(hotbar) {
    hotbar.classList.remove("lights-out-hotbar-moved");
    for (const property of ["left", "top", "margin", "transform"]) {
        hotbar.style.removeProperty(property);
    }
}
