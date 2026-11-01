const QUESTISM_CONFIG = { header: true, pauseEvents: false, newQuests: "off", progression: "auto", budget: 12000 };
const QUESTISM_SETUP = {
  scene: { location: "archive_lobby", npcs: ["clerk"], day: 1, time: "morning" },
  sceneRegistry: { actors: { clerk: "Clerk", archivist: "Archivist" }, locations: ["archive_lobby", "reading_room"] }
};
