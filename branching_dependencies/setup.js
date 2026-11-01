const QUESTISM_CONFIG = { header: true, pauseEvents: false, newQuests: "off", progression: "auto", budget: 12000 };
const QUESTISM_SETUP = {
  scene: { location: "guild_lobby", npcs: ["coordinator"], day: 1, time: "morning" },
  sceneRegistry: { actors: { coordinator: "Coordinator" }, locations: ["guild_lobby"] }
};
