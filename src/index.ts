import { Bot, webhookCallback, InlineQueryResultBuilder } from "grammy";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const bot = new Bot(env.BOT_TOKEN, { botInfo: env.BOT_INFO });

		bot.command('start', async ctx => await ctx.reply('Hi!'));

		bot.on('inline_query', async ctx => {
			const voices = env.VOICE.map(({ title, file }, i) => {
				const url = new URL(file, env.URL);
				return InlineQueryResultBuilder.voice(i.toString(), title, url, { caption: title });
			});
			await ctx.answerInlineQuery(voices);
		});

		return webhookCallback(bot, 'cloudflare-mod')(request);
	},
} satisfies ExportedHandler<Env>;
