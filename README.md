# 整骨院集客LP - 初月100人集客メソッド

## 概要
整骨院の集客コンサルティングサービス用のセクションスクロール型ランディングページです。

## 特徴
- **セクションスクロール**: 1スクロールで1セクション完全移動
- **レスポンシブ対応**: PC・タブレット・スマホ完全対応
- **スムーズアニメーション**: CSS3 + JavaScript
- **進捗バー**: 上部にスクロール進捗表示
- **ナビゲーションドット**: 右側に縦配置
- **タッチ対応**: スマホのスワイプ操作対応

## ファイル構成
```
orthopedic-clinic-lp/
├── index.html          # メインHTML
├── styles.css          # スタイルシート
├── script.js           # JavaScript
├── README.md           # プロジェクト説明
└── assets/
    ├── images/         # 画像ファイル
    └── icons/          # アイコンファイル
```

## セクション構成
1. **ヒーロー** - メインキャッチコピー
2. **問題提起** - 整骨院の集客問題
3. **共感** - 同じ悩みを持つストーリー
4. **転機** - 変化のきっかけ
5. **メソッド** - 3つの集客秘密
6. **実績** - 具体的な成果
7. **お客様の声** - 社会証明
8. **CTA** - LINE登録・無料相談

## 技術仕様
- **HTML5**: セマンティックタグ使用
- **CSS3**: Grid・Flexbox・アニメーション
- **JavaScript**: Vanilla JS（ライブラリ不使用）
- **フォント**: Google Fonts（Noto Sans JP）

## 機能
- セクション間のスムーズスクロール
- マウスホイール・タッチ・キーボード操作
- 進捗バーとナビゲーションドット
- 数値カウントアップアニメーション
- タイピング効果
- 要素の段階的フェードイン

## デプロイ方法

### Vercel
1. GitHubリポジトリにプッシュ
2. Vercelでプロジェクトを接続
3. 自動デプロイ開始

### GitHub Pages
1. GitHubリポジトリ作成
2. Settings > Pages > Source: main branch
3. カスタムドメイン設定（必要に応じて）

## カスタマイズ

### 色変更
`styles.css`の変数部分を編集：
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #f39c12;
    --accent-color: #e74c3c;
}
```

### LINE ID変更
`index.html`のLINEボタンURL：
```html
<button onclick="window.open('https://line.me/R/ti/p/@your-line-id', '_blank')">
```

### セクション追加
1. HTMLに新しいセクション追加
2. ナビゲーションドット追加
3. JavaScriptの`totalSections`変数を更新

## パフォーマンス最適化
- CSS/JSファイルの圧縮
- 画像の最適化（WebP形式推奨）
- フォントの最適化
- 不要なCSSの削除

## ブラウザ対応
- Chrome: 最新版
- Firefox: 最新版
- Safari: 最新版
- Edge: 最新版
- スマホブラウザ: iOS Safari, Android Chrome

## 注意事項
- LINEのURL設定が必要
- 実際の画像ファイルを追加する必要があります
- SSL証明書の設定を推奨

## ライセンス
このプロジェクトは個人・商用利用可能です。