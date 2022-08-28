import { schedule } from "@netlify/functions";
import { buildClient } from "@datocms/cma-client-node";

export const handler = schedule("@weekly", async (event) => {
  const client = buildClient({
    apiToken: process.env.DATOCMS_FULLACCESS_TOKEN as string,
  });

  const environments = await client.environments.list();

  const mainEnvironment = environments.find(
    (environment) => environment.meta.primary
  );

  const previousUnusedDailyBackup = environments.find(
    (environment) =>
      environment.id.match("backup-plugin-weekly") && !environment.meta.primary
  );

  if (previousUnusedDailyBackup) {
    await client.environments.destroy(previousUnusedDailyBackup.id);
  }

  await client.environments.fork(mainEnvironment!.id, {
    id: `backup-plugin-weekly-${new Date().toISOString().split("T")[0]}`,
  });

  return {
    statusCode: 200,
  };
});
