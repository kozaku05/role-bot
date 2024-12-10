# role-bot

Discord サーバー用のカスタムロールボット

## 概要

指定されたユーザーに対して、1 日 1 回自動的にロールを付与するボットです。
特定のメンバーに定期的にロールを付与する必要がある場合に便利です。
また前日のロールを削除する機能もあります。
コマンドなしで起動のみで実行できます。

## 依頼情報

依頼主: [https://discord.gg/aU83KCfSNZ]

## 機能

- 24 時間ごとにランダムなユーザー ID に対して自動的にロールを付与
- JSON ファイルによるユーザー管理
- ロール付与の実行ログを表示
- 専用チャンネルへの通知機能
  - 埋め込みメッセージによる当選者発表
  - メンション付きの通知メッセージ

## セットアップ

1. 必要な環境変数を`.env`ファイルに設定:

   ```
   TOKEN=Botのトークン
   GUILD_ID=サーバーID
   ROLE_ID=付与するロールのID
   CHANNEL_ID=通知を送信するチャンネルID
   HIGAWARI_ID=メンション通知用チャンネルID
   ```

2. 依存パッケージのインストール:

   ```bash
   npm install
   ```

3. ボットの起動:
   ```bash
   node index.js
   ```

## 技術スタック

- Node.js
- Discord.js
- node-schedule (定期実行)
- dotenv (環境変数管理)

## 動作要件

- Node.js 16.x 以上
- Discord.js v14

## Copyright

© 2024 kozaku05. All Rights Reserved.
