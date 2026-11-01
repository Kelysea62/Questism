const QUESTISM_CONFIG = { header: true, pauseEvents: true, resumeAction: true, newQuests: "off", progression: "auto", budget: 12000 };
const QUESTISM_SETUP = {
  scene: { location: "archive_hall", npcs: ["curator"], day: 1, time: "morning" },
  sceneRegistry: { actors: { curator: "Curator" }, locations: ["archive_hall"] }
};
