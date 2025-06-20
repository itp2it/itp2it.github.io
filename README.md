<div id="top"></div>

<!-- 使用技術一覧 -->

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- バックエンドの言語一覧 -->
  <img src="https://img.shields.io/badge/-Python-3776AB.svg?logo=python&style=for-the-badge">
  <!-- バックエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Flask-000000.svg?logo=flask&style=for-the-badge">
  <!-- ミドルウェア一覧 -->
  <img src="https://img.shields.io/badge/-Gunicorn-199848.svg?logo=gunicorn&style=for-the-badge&logoColor=white">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Javascript-F7DF1E.svg?logo=javascript&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Css3-1572B6.svg?logo=css3&style=for-the-badge">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Github-181717.svg?logo=github&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Render-8a2be2.svg?logo=&style=for-the-badge">
  <img src="https://img.shields.io/badge/-VMware-4682b4.svg?logo=&style=for-the-badge">
  <!-- その他 -->
　<img src="https://img.shields.io/badge/-Unicode-e0ffff.svg?logo=Unicode&style=for-the-badge">
</p>





# [FF14] スクリーンキーボード風アプリ (Unicode特殊文字の入力用)

英語名 "FFXIV Click-to-Type Special Characters"


![image](https://github.com/user-attachments/assets/18f57f53-ab8e-4788-b5d8-baa46d8248d4)

URL : https://ff14-special-characters.onrender.com/



## アプリの概要

オンラインRPG「Final Fantasy 14」向け
ゲーム内で使えるUnicode特殊文字を、
マウスクリックのみで使えるようにしたアプリです。

※ 実際にプレイ中に使用すると便利さが伝わると思います。



## 🔹使用技術

### 開発環境
- HTML, CSS, JavaScript (フロントエンド)
- [Python](https://www.python.org/) 3.9.21 (バックエンド)
- [Flask](https://flask.palletsprojects.com/en/stable/) 3.1.0 (バックエンド) 
- [GitHub]() (バージョン管理)

### インフラ
**■ 検証環境 ■**
- [VMware Workstation](https://www.vmware.com/products/desktop-hypervisor/workstation-and-fusion)  17 PRO
- [AlmaLinux](https://almalinux.org/ja/) 9.5
- [nginx](https://www.f5.com/go/product/welcome-to-nginx) 1.20.1

**■ 本番環境 ■**
- [Render](https://render.com/) (クラウドPaaS)
- [Gunicorn](https://gunicorn.org/) 23.0.0 (バックエンド)

<!--
- DNS ※Render側にて提供 (ドメイン名＝ "任意の名前" + **.onrender.com** )
- HTTPS ※Render側にて提供
-->


## 機能一覧

- 軽量かつ直感的なWebブラウザベース
- 特殊文字を視覚的に選べるパネルUI

- アイコン画像とUnicode番号の自動対応

- 削除・リセット・スペース挿入にも対応
- クリックでクリップボードへ即時コピー

- 海外プレイヤーも利用できるよう英語/日本語の切り替え機能を実装!!
- 継続的を想定し、見た目にも飽きないよう、背景色をクリックのみで変更できる機能も追加!!



## インフラ構成図
RenderというPaaSで WEBサービス を動作させています。

![ff14_flask_architecture.jpg](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3774516/f6ce6717-bec2-4c28-8166-61ab46c410d2.jpeg)

当初は、ローカルのVMware上での検証し、有料のVPSを借りて本稼働させる計画でした。
最適なサービスを探すうちに、FreeプランのあるRenderを知る。
ロースペック／英語サポートONLYながら、Python + Flask に無料で対応。

Freeプランは、デプロイがGit経由のみでしたが、
検証環境で開発済みのものをプッシュすれば解決できるため本採用しました。

結果的に、検証／本番環境ともにフリーのツールのみで完成させることができました。


