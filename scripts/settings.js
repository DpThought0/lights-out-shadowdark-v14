const MODULE_ID = "lights-out-shadowdark-v14-dev";

export function registerSettings() {

    game.settings.register(MODULE_ID, 'party_panel_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_party_panel_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_party_panel_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number,
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 2
    });

    game.settings.register(MODULE_ID, 'hotbar_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_hotbar_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_hotbar_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number,
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 2
      });

    game.settings.register(MODULE_ID, "hotbar-position", {
        scope: "client",
        config: false,
        type: Object,
        default: {}
    });

    game.settings.register(MODULE_ID, 'navbar_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_navbar_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_navbar_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number, 
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 0
    });

    
    game.settings.register(MODULE_ID, 'players_list_visibility', {
        name: game.i18n.localize("LIGHTSOUTSD.config_player_list_visibility"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_player_list_visibility_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Number,
        choices: {
            0: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_0"),
            1: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_1"),
            2: game.i18n.localize("LIGHTSOUTSD.config_visibility_option_2")
        },
        default: 2
    });

    game.settings.register(MODULE_ID, "party-only-active", {
        name: game.i18n.localize("LIGHTSOUTSD.config_party_only_active"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_party_only_active_help"),
        scope: "world",
        config: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "hide_party_health", {
        name: game.i18n.localize("LIGHTSOUTSD.config_hide_party_health"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_hide_party_health_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "hide-pc-title", {
        name: game.i18n.localize("LIGHTSOUTSD.config_hide_pc_title"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_hide_pc_title_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "disable-gm-selected-token", {
        name: game.i18n.localize("LIGHTSOUTSD.config_disable_gm_selected_token"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_disable_gm_selected_token_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });

    game.settings.register(MODULE_ID, "icon-high-contrast-mode", {
        name: game.i18n.localize("LIGHTSOUTSD.config_icon_high_contrast_mode"),
        hint: game.i18n.localize("LIGHTSOUTSD.config_icon_high_contrast_mode_help"),
        scope: "world",
        config: true,
        requiresReload: true,
        type: Boolean,
        default: false
    });
}
