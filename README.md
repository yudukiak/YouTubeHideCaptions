YouTube Hide Captions
=====

YouTube の字幕表示をワンクリックで切り替えられる Chrome 拡張機能です。

通常の字幕ウィンドウ（ `#ytp-caption-window-container` ）と、Immersive Translate の字幕ウィンドウ（ `#immersive-translate-caption-window` ）の表示／非表示を切り替えます。

## 使い方

1. Chrome で `chrome://extensions` を開く
2. 「デベロッパーモード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」から `YouTubeHideCaptions` フォルダを指定する
4. YouTube の動画ページ（ `/watch` ）またはライブ配信ページ（ `/live` ）を開く
5. 動画情報エリア（ `#below` ）直前にある「字幕を表示」チェックボックスで表示を切り替える

チェック状態はブラウザの `localStorage` に保存され、次回以降も維持されます。未保存の場合は字幕を表示します。

## 配置

UI は `#below` の直前にある共有スロット `#ydk-below-slot` 内に追加されます。
