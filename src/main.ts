import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";

createApp(App).mount("#app");

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */

// Placing it here or any other `.ts` file works
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $goto: any;
  }
}
