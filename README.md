# Vspo Stream Schedule

[本サイト](https://vspo-stream-schedule.web.app/)では、ぶいすぽ所属Vtuberの配信情報を一覧できます。

<img width="651" alt="image" src="https://github.com/mnsinri/vspo-stream-schedule/assets/44370583/18764ca7-39dd-4e25-95f3-b9a9e246e47f">

## 対応している配信プラットフォーム
* Youtube
* Twitch
* Twit Casting

## 注意事項
* **配信中**または**配信予定**の配信のみが本サイトで一覧できます。
* 10分に1回配信情報を更新しています。

## ローカル開発 / Local Development

プロジェクトのフロントエンドをローカルで開発する場合、Firebase設定なしでモックデータを使用できます。

To develop the frontend locally without Firebase configuration:

```bash
# 依存関係のインストール / Install dependencies
npm install

# 開発サーバーの起動 / Start development server
npm run dev
```

開発モードでは自動的にモックデータが使用されます（`.env.development`で設定）。
In development mode, mock data is automatically used (configured in `.env.development`).

本番環境では、Firebase設定が必要です。
For production, Firebase configuration is required.

## バグ・要望
* [GitHub issues](https://github.com/mnsinri/vspo-stream-schedule/issues)
