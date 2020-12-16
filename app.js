const { App } = require('@slack/bolt');
require('dotenv').config();

// Initializes your app with your bot token and signing secret

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// 基本的にAppというオブジェクトのメソッドを登録（定義）していく形になる

// Listens to incoming message that contain "こんにちは"
app.message('こんにちは', async({message, say}) => {  // 引数に関数を渡している。その関数はオブジェクトを引数にしている
  // say() sends a message to the channel where the event was triggered
  await say(`こんにちは！<@${message.user}>!`);
});

app.message('ボタン', async({ message, say }) => {
  await say({
    blocks: [
      {
        // セクションブロックを定義（JSON）
        // 実際に書くときはBlock kitビルダーを利用する
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `こんにちは！<@${message.user}>!`
        },
        // アクセサリー。今回はボタンだけど、テキストや画像、日付ピッカーなどが使える
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "クリックしてね！"
          },
          // action_idが識別子となり、後にインタラクション（リアクション）を指定する
          "action_id": "button_click"
        }
      }
    ],
    text: `こんにちは！<@${message.user}>!`
  });
});

// インタラクション（リアクション）。action_idを指定する。
app.action('button_click', async({ body, ack, say }) => {
  // Acknowledge the action
  // とりあえずack()を実行する必要があるらしい
  await ack();
  // bodyはHTTPレスポンス（JSON）詳しくはhttps://api.slack.com/messaging/interactivity
  await say(`<@${body.user.id}>がボタンをクリックしたよ`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();