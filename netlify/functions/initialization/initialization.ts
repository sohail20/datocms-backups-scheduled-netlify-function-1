import { buildClient } from "@datocms/cma-client-node";
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  const client = buildClient({
    apiToken: process.env.DATOCMS_FULLACCESS_TOKEN as string,
  });

  const environments = await client.environments.list();

  const mainEnvironment = environments.find(
    (environment) => environment.meta.primary
  );

  const previousUnusedDailyBackup = environments.find(
    (environment) =>
      environment.id.match("backup-plugin-daily") && !environment.meta.primary
  );

  if (previousUnusedDailyBackup) {
    await client.environments.destroy(previousUnusedDailyBackup.id);
  }

  await client.environments.fork(mainEnvironment!.id, {
    id: `backup-plugin-daily-${new Date().toISOString().split("T")[0]}`,
  });

  const previousUnusedWeeklyBackup = environments.find(
    (environment) =>
      environment.id.match("backup-plugin-weekly") && !environment.meta.primary
  );

  if (previousUnusedWeeklyBackup) {
    await client.environments.destroy(previousUnusedWeeklyBackup.id);
  }

  await client.environments.fork(mainEnvironment!.id, {
    id: `backup-plugin-weekly-${new Date().toISOString().split("T")[0]}`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Initialization completed successfully!`,
    }),
    headers: { "Access-Control-Allow-Origin": "*" },
  };
};
