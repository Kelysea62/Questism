// Private test-pack diagnostics; set false to disable bounded rejected-output logs.
const QUESTISM_DEBUG_REPORTS = true;
const QUESTISM_SETUP = {
  flags: { jo_romance_enabled: true, flora_romance_enabled: true, jo_first_conversation_complete: false, flora_first_conversation_complete: false },
  scene: { location: "bedroom", npcs: [], day: 1, time: "morning" },
  sceneRegistry: {
    actors: { jo: "Jo", flora: "Flora", mrs_l: "Mrs. L", isabelle: "Isabelle" },
    locations: ["bedroom", "home", "school", "homeroom", "courtyard", "library", "cafeteria", "west_wing", "right_wing", "gym"]
  }
};
const QUESTISM_CONFIG = { resumeAction: true, verifyProgress: true, compactReports: true, enabled: true, newQuests: "off", progression: "auto", budget: 10000, notifications: true, header: true, pauseEvents: true };
