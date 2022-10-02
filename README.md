# Scheduled backups Netlify function

This is a collection of lambda functions and scheduled functions meant to be used with [this DatoCMS plugin](https://github.com/marcelofinamorvieira/datocms-plugin-automatic-environment-backups) to automatically backup your main environment on a daily and weekly manner.

You can also deploy this project to netlify through [this one-click-deploy](https://app.netlify.com/start/deploy?repository=https://github.com/marcelofinamorvieira/datocms-backups-scheduled-netlify-function)

It consists of two scheduled functions that fork and replace old backups with new ones (if the old backups are not being used), making it so there is always a daily backup environment, and weekly backup environment.
Additionally, it also has a "initialization" lambda function that connects the plugin with the netlify instance.

# Enabling the "Scheduled function" feature on Netlify

This project requires a experimental Netlify feature called ["Scheduled functions"](https://docs.netlify.com/netlify-labs/experimental-features/scheduled-functions/)

It has to be enabled on your Netlify account, and then activated on your deployed instance. Heres how to do so:

First, enable the feature on [your Netlify Labs page](https://app.netlify.com/user/labs):

![image](https://user-images.githubusercontent.com/44898680/193444733-32151c30-4ae2-49cf-acec-af7fa1090d25.png)

Then, in the deployed instance of this repository go to the Functions tab, and click "Enable Scheduled Functions"

![image](https://user-images.githubusercontent.com/44898680/193444888-ddc09b42-aa6e-4b84-b2b6-2822e0743cb5.png)

And thats it! Now the functions are scheduled to run once a day and once a week respectivelly for as long as your netlify instance is active.
