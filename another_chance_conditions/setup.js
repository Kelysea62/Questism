// Creator defaults for the v0.1.13 conditions sample.
// This block belongs BEFORE Questism initializes. The configured library.js
// includes these declarations already; do not paste them twice.
const QUESTISM_SETUP = {
  flags: {
    jo_romance_enabled: true,
    flora_romance_enabled: true,
    jo_first_conversation_complete: false,
    flora_first_conversation_complete: false
  },
  scene: {
    location: "bedroom",
    npcs: [],
    day: 1,
    time: "morning"
  },
  // These names and locations are public from the start, not current presence.
  sceneRegistry: {
    actors: {jo: "Jo", flora: "Flora", mrs_l: "Mrs. L", isabelle: "Isabelle"},
    locations: ["bedroom", "home", "school", "homeroom", "courtyard", "library", "student_lounge", "classroom_wing", "main_building"]
  }
};

const QUESTISM_CONFIG = {
  resumeAction: true,
  enabled: true,
  newQuests: "off",
  progression: "auto",
  budget: 10000,
  notifications: true,
  header: true,
  pauseEvents: true
};
