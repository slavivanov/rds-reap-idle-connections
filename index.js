const start = new Date().getTime();
require("dotenv").config();
const db = require("./db");

const maxIdleConnectionTime = 5; // max number of seconds a connection can idle
const maxRunTime = 6 * 1000; // run this script for 10 minutes
const reapEvery = 1000; // reap connections every second
console.log("Reaper started");
// Collect idle connections every second or so
const timeout = setInterval(async () => {
  const currentTime = new Date().getTime();
  if (currentTime - start > maxRunTime) {
    // This Reaper closes and cron should start another one soon
    console.log("Closing reaper");
    clearInterval(timeout);
  }
  try {
    const results = await db.any(`select pg_terminate_backend(pid) from pg_stat_activity where 
      usename='encharge' 
    AND pid <> pg_backend_pid()
    
    AND state in ('idle', 'idle in transaction', 'idle in transaction (aborted)', 'disabled') 
    AND state_change < current_timestamp - INTERVAL '${maxIdleConnectionTime}' SECOND
`);
    // success
    if (results && results.length)
      console.log("Reaped ", results.length, "on", new Date());
  } catch (e) {
    // error
    console.log("Error ", e);
  }
}, reapEvery);
