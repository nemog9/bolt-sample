# Boltの個人的サンプルコードです

## 使い方

[slack公式チュートリアル](https://slack.dev/bolt-js/ja-jp/tutorial/getting-started)

の通りに設定する。

環境変数を利用するのは[dotenv](https://www.npmjs.com/package/dotenv)を使うと環境を汚さない。

## 【注意】ngrokで開発する場合

起動するたびにURLが変わるので、毎回Slack apiに行って、URLを変更すること。

- Event Subscriptions
- Interactivity & Shortcuts

の2箇所変更があるので気をつけてね。（２個め忘れがち）

## ショートカットとスラッシュコマンド

**別物です。**

スラッシュコマンドの進化系がショートカットと書かれているので、ショートカットを使うのが無難かもしれません。

スラッシュコマンドを追加するにはSlackAPIのページに行って、登録する必要があります。詳細はドキュメントへ。[Creating and handling shortcuts](https://api.slack.com/interactivity/shortcuts/using)