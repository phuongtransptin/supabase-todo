import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";

import { createClient } from "@supabase/supabase-js";

createApp(App).mount("#app");

/**
 * Keeps track of if the user is logged in or out and will update userSession state accordingly.
 */
const _supabase = createClient(
  "https://xxxlxrtxsdclcbujdxcq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eGx4cnR4c2RjbGNidWpkeGNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYwODY4MzMsImV4cCI6MjAyMTY2MjgzM30.lNfwkThtnyZUmmPGD2lQAdx5mpX4ZkuFns7239WqsFA"
);

const connectSupabase = async () => {
  console.log("👉 Start get all table 10k record...");

  const getAllTable = await _supabase.from("my_table").select("*");

  console.log("✅ Finish get all table 10k record!!", getAllTable);
};

connectSupabase();
