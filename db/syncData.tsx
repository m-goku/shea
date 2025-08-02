import { AlertModal } from "@/components/AlertModal";
import { synchronize } from "@nozbe/watermelondb/sync";
import { Alert, StyleSheet } from "react-native";

export async function syncDatabase(database: any) {
  try {
    await synchronize({
      database,

      pullChanges: async ({ lastPulledAt }) => {
        // console.log("HIT PULL")
        try {
          const response = await fetch(
            `https://backend-hnp4.onrender.com/sync/pull?lastPulledAt=${
              lastPulledAt ?? 0
            }`
          );

          if (!response.ok) {
            throw new Error("Pull failed: " + response.status);
          }

          const result: any = await response.json();
          //console.log("🔁 Pull Result:\n", JSON.stringify(result, null, 2));

          return result;
        } catch (err) {
          console.error("❌ Pull sync failed:", err);

          throw err; // re-throw to let synchronize know this failed
        }
      },

      pushChanges: async ({ changes, lastPulledAt }) => {
        // console.log("HIT PUSH");
        try {
          const response = await fetch(
            `https://backend-hnp4.onrender.com/sync/push`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ changes, lastPulledAt }),
            }
          );

          if (!response.ok) {
            throw new Error("Push failed: " + response.status);
          }
        } catch (err) {
          console.error("❌ Push sync failed:", err);

          throw err;
        }
      },

      // migrationsEnabledAtVersion: 1,
    });

    console.log("✅ Sync successful");

    Alert.alert("Sync successful", "Sync has completed successfully", [
      { text: "OK" },
    ]);
  } catch (error) {
    // This handles either pull or push failing
    console.error("🔁 Sync aborted:", error);

    AlertModal({
      title: "Retry Sync",
      message: "Sync Failed, Do you want to retry?",
      onYes: () => retrySync(database),
      onNo: () => {},
    });
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
      Alert.alert(
        "Sync Failed",
        "Unable to sync your data. Please check your internet and try again later.",
        [{ text: "OK" }]
      );
    }
  }
}

const styles = StyleSheet.create({});
