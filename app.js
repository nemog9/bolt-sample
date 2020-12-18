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

// open_modal というグローバルショートカット
app.shortcut('open_modal', async({ shortcut, ack, context }) => {
  // グローバルショートカットリクエストの確認
  ack();

  try {
    // 組み込みの WebClient を利用して views.oepn API メソッドを呼び出す
    const result = await app.client.views.open({
      // `context` オブジェクトに保持されたトークンを使用 これどこから？
      token: context.botToken,
      trigger_id: shortcut.trigger_id,
      view: {
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "My App"
        },
        "close": {
          "type": "plain_text",
          "text": "Close"
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "最も簡単なモーダルを考えました。:smile: \n\n<https://api.slack.com/reference/block-kit/interactive-components|*インタラクティブなモーダルを作る*>または<https://api.slack.com/surfaces/modals/using#modifying|*さらにモーダルについて知る*>"
            }
          },
          {
            "type": "context",
            "elements": [
              {
                "type": "mrkdwn",
                "text": "このモーダルは<https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>を使ってデザインされました"
              }
            ]
          }
          
        ]
      }
    });
    
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();