import { synchronize } from "@nozbe/watermelondb/sync";

export async function syncDatabase(database: any) {
  try {
    await synchronize({
      database,

      pullChanges: async ({ lastPulledAt }) => {
        try {
          const response = await fetch(
            `http://<server-ip>:3000/sync/pull?lastPulledAt=${
              lastPulledAt ?? 0
            }`
          );

          if (!response.ok) throw new Error("Pull failed: " + response.status);

          const result: any = await response.json();
          return result;
        } catch (err) {
          console.error("❌ Pull sync failed:", err);
          throw err; // re-throw to let synchronize know this failed
        }
      },

      pushChanges: async ({ changes, lastPulledAt }) => {
        try {
          const response = await fetch(`http://<server-ip>:3000/sync/push`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ changes, lastPulledAt }),
          });

          if (!response.ok) throw new Error("Push failed: " + response.status);
        } catch (err) {
          console.error("❌ Push sync failed:", err);
          throw err;
        }
      },

      migrationsEnabledAtVersion: 1,
    });

    console.log("✅ Sync successful");
  } catch (error) {
    // This handles either pull or push failing
    console.error("🔁 Sync aborted:", error);
    // You can show a UI alert, retry, or store the failure
  }
}

const MAX_RETRIES = 3;

export async function retrySync(database: any, attempt = 1) {
  try {
    await syncDatabase(database);
  } catch (err) {
    if (attempt < MAX_RETRIES) {
      setTimeout(() => {
        retrySync(database, attempt + 1);
      }, 3000);
    } else {
      console.warn("⚠️ Failed to sync after multiple attempts.");
    }
  }
}
