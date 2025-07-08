<div id="top"></div>

<!-- 使用技術一覧 -->

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->

<p style="display: inline">
  <!-- バックエンドの言語一覧 -->
  <!-- バックエンドのフレームワーク一覧 -->
  <!-- ミドルウェア一覧 -->
  
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Html5-dimgray.svg?logo=html5&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Css3-1572B6.svg?logo=css3&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Javascript-F7DF1E.svg?logo=javascript&style=for-the-badge">
  <!-- その他 -->
　<img src="https://img.shields.io/badge/-Unicode-e0ffff.svg?logo=Unicode&style=for-the-badge">
  <br>
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Github-181717.svg?logo=github&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Github%20pages-dcdcdc.svg?logo=github&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Github%20actions-b0c4de.svg?logo=github&style=for-the-badge">
  <img src="https://img.shields.io/badge/%E2%96%B2-Vercel-000000.svg?logo=&style=for-the-badge">
</p>



# FFXIV Unicode Typer - ポートフォリオ版

## 概要

このプロジェクトは、ゲーム「ファイナルファンタジーXIV (FFXIV)」において、特定の記号（ユニコード文字）を簡単に入力できるように開発されたウェブアプリケーションです。HTML、CSS、JavaScriptのみで構成される静的なアプリケーションであり、ブラウザ上で直接動作します。

本リポジトリは、アプリケーションの機能だけでなく、**自動デプロイとCI/CDワークフロー構築における実践的な経験**を示すポートフォリオとして公開しています。

## デモ

実際に動作するアプリケーションはこちらからご覧いただけます。
[**FFXIV Unicode Typer デモ**](https://itp2it.github.io/)

## 技術スタック・使用ツール

* **フロントエンド**: HTML5, CSS3, JavaScript
* **バージョン管理**: Git, GitHub
* **開発環境**: Visual Studio Code (VS Code)
* **CI/CD & ホスティング**: GitHub Actions, GitHub Pages
* **最適化ツール**: html-minifier, clean-css-cli (GitHub Actions内で使用)

## プロジェクトにおけるDevOpsアプローチの実践と成果

本プロジェクトでは、アプリケーションの開発と同時に、以下に示す**継続的インテグレーション（CI）と継続的デリバリー（CD）の自動化プロセス**を構築し、DevOps的な思考と実践力を養いました。

### 1. 効率的な開発環境とバージョン管理の確立

* **Gitリポジトリの管理**: アプリケーションファイルのGitリポジトリとしての初期化、変更のステージングとコミットを通じて、基本的なバージョン管理スキルを習得。
* **複数GitHubアカウントの運用**: 複数のGitHubアカウント（メイン開発用、ポートフォリオ公開用）を一台のPC上のVS Codeで効率的に切り替えて運用する環境を構築。これにより、プロジェクトに応じた適切なアカウントでの作業を実現。

### 2. GitHub ActionsによるCI/CDパイプラインの自動化

Gitリポジトリへのプッシュをトリガーとして、以下の処理が自動実行される堅牢なCI/CDワークフローを構築しました。

* **自動ビルドプロセスの定義**:
    * **HTMLファイルの自動Minify**: `html-minifier` を活用し、HTMLファイルのコードを自動で最適化し、軽量化。
    * **CSSファイルの自動Minify**: `clean-css-cli` を使用し、CSSファイルのコードを自動で最適化し、読み込み速度を向上。
    * **画像を含むその他のアセットの自動コピー**: アプリケーション稼働に必要な画像ファイルやその他の静的アセットを、ビルド成果物として適切に配置・管理。
    * **不要ファイルの自動除外**: ビルドプロセスにおいて、一時ファイルや不必要なファイル（例: `.bak` ファイル）がデプロイされないよう自動的に除外設定。
* **GitHub Pagesへの自動デプロイ**: 上記のビルドプロセスで生成された最適化済みの最終成果物を、GitHub Actionsを通じて `itp2it.github.io` リポジトリのGitHub Pagesへ自動的にデプロイ。
* **GitHub PagesのURL最適化**: プロジェクト名のサブディレクトリをURLに含まず、ルートドメイン（`https://itp2it.github.io/`）で直接アクセスできるように設定を完了。

#### CI/CDフローを支えるファイル構成

本プロジェクトの自動デプロイメントは、以下のファイルとディレクトリによって構成されています。

```Tree
[リポジトリのルート (itp2it.github.io)]
 │
 ├── .github/                       # GitHub Actionsワークフロー定義ディレクトリ
 │   └── workflows/                 # ワークフローファイルを格納
 │       ├── deploy.yml             # ★ 自動デプロイのメインワークフロー定義ファイル（GitHub Pages用）
 │       │
 │       └── (build-and-push-docker-image.yml)
 │                                  # ◇ Dockerイメージビルド＆プッシュ用の定義ファイル (GitHub Packages用)
 │
 ├── (dist/)                        # ★ CI/CDプロセスで使われる一時ディレクトリ
 │  　　　　　　　　　　　　　　　　　　　　　(処理の開始時に生成、終了時に消去)
 │                                    　src/ から処理後、または、直接コピーされたファイル/フォルダが一時的に格納され、
 │ 　　　　　　　　　　　　　　　　　　　　　　その内容が Github pages として生成される
 │
 ├── html-minifier.json             # ★ HTML Minifyツールの設定ファイル
 ├── package.json                   # ★ プロジェクトのメタデータと依存関係を定義するファイル
 │
 ├── src/                           # アプリケーションのソースコードを格納するディレクトリ
 │   ├── index.html                 # アプリケーションのトップページ
 │   ├── en/                        # アプリケーション本体を格納
 │   └── readme/                    # ドキュメント類を格納
 │       └── pics/                  # 画像などの静的アセットを格納（例 : PNG画像など）
 │           └── ***.png            # 使用している画像ファイル群
 ├── README.md                      # このプロジェクトの概要と説明（あなたが今読んでいるファイル）
 │
 │
 └── (dockerfile)                     # ◇ /src 内のファイルをDockerイメージにするための Dockerfile
                                          (イメージはGitHub Packagesに格納される)



★印：CI/CDのコントロールに関するファイル/フォルダ

◇印：Dockerイメージ作成に関するファイル (後日追加した項目)

```


### 3. プロジェクトマネジメントと課題解決への取り組み

* **段階的な学習と実践**: 初めてのWEBアプリケーション開発から始まり、バックエンドからフロントエンド、そしてCI/CDと段階的に技術領域を広げながら実践的なスキルを習得。
* **JavaScript Minifyの課題認識**: JavaScriptファイルのMinify時に特定の文字が文字化けする技術的課題に対し、複数のホスティングサービスでのテストを通じて原因をJavaScriptの特性に関連すると特定。現時点では対応を見送るものの、将来的な技術的探求の課題として明確化。

## 今後の展望

本プロジェクトで得たDevOpsの知識とCI/CD構築の経験は、アプリケーションのライフサイクル全体を効率化する上で不可欠であると確信しています。今後は、より複雑なシステムの自動化や、チーム開発における効率的な開発ワークフローの構築に貢献するため、継続的に学習と実践を深めてまいります。

2025/07
---










<!-- ドラフト版 ver.01-->

<!--

# FFXIV Unicode Typer - ポートフォリオ版

## 概要

このプロジェクトは、ゲーム「ファイナルファンタジーXIV (FFXIV)」において、特定の記号（ユニコード文字）を簡単に入力できるように開発されたウェブアプリケーションです。HTML、CSS、JavaScriptのみで構成される静的なアプリケーションであり、ブラウザ上で直接動作します。

本リポジトリは、以下の**デプロイ・CI/CDワークフロー構築の技術デモンストレーション**を目的としたポートフォリオ版として公開しています。

## デモ

実際に動作するアプリケーションはこちらからご覧いただけます。
[**FFXIV Unicode Typer デモ**](https://itp2it.github.io/)

## 技術スタック・使用ツール

* **フロントエンド**: HTML5, CSS3, JavaScript
* **バージョン管理**: Git, GitHub
* **開発環境**: Visual Studio Code (VS Code)
* **CI/CD & ホスティング**: GitHub Actions, GitHub Pages
* **最適化ツール**: html-minifier, clean-css-cli (GitHub Actions内で使用)

## 本プロジェクトにおける学習と成果（DevOpsアプローチの体現）

このプロジェクトでは、単にアプリケーションを開発するだけでなく、以下の**継続的インテグレーション（CI）と継続的デリバリー（CD）の自動化プロセス**を構築し、DevOps的なアプローチを実践しました。

### 1. ローカル開発環境の整備とバージョン管理

* **Git初期化とコミット**: ローカル環境でのプロジェクトファイルのGitリポジトリとしての初期化と、変更のステージング・コミットを実施。
* **複数GitHubアカウントの効率的な管理**: メインアカウントとポートフォリオ用アカウントをVS Codeのマルチワークスペース機能を用いてスムーズに切り替え、アカウントごとの認証設定を確立。

### 2. GitHub ActionsによるCI/CDパイプラインの構築

プッシュをトリガーとして、以下の処理が自動実行されるワークフローを構築しました。

* **自動ビルドプロセスの定義**:
    * **HTMLファイルの自動Minify**: `html-minifier` を使用し、HTMLファイルのコードを最適化・軽量化。
    * **CSSファイルの自動Minify**: `clean-css-cli` を使用し、CSSファイルのコードを最適化・軽量化。
    * **画像を含むその他のアセットの自動コピー**: アプリケーションに必要な画像などの静的ファイルを、ビルド成果物として正しく配置。
    * **不要ファイルの自動除外**: ビルド成果物から不要なファイル（例: `.bak` ファイル）を自動的に除外。
* **GitHub Pagesへの自動デプロイ**: 上記ビルドプロセスで生成された最適化済みファイルを、`itp2it.github.io` リポジトリのGitHub Pagesへ自動的にデプロイ。
* **GitHub Pages表示設定**: GitHub Pagesが意図したルートパス（`https://itp2it.github.io/`）で正しく表示されるよう設定を完了。

### 3. 問題解決と技術的洞察

* **JavaScript Minifyの課題特定**: JavaScriptファイルのMinify時に特定の文字が文字化けする問題に対し、複数ホスティングサービスでのテストを通じて原因をJavaScript側にあると特定。現時点では対応を見送るものの、将来的な解決に向けた課題として認識。
* **GitHub Pagesパス問題の解決**: プロジェクトサイト（`/<リポジトリ名>/`）からユーザーサイト（`/`）への移行により、アプリケーション内の絶対パスリンク切れ問題を解決。専用リポジトリ名 `itp2it.github.io` の利用を実践。
* **Git操作におけるエラー対処**: リモート設定やGit内部のロックファイルに関するエラーに対し、適切なコマンド（`git remote remove`、`git remote add`）やファイル削除といったトラブルシューティングを実践し、解決。

## 今後の展望

本プロジェクトを通じて得たDevOpsの知識とCI/CD構築の経験を活かし、より複雑なシステムの自動化や、効率的な開発ワークフローの構築に貢献していきたいと考えています。特に、アプリケーションのビルド、テスト、デプロイの自動化は、開発効率と品質向上に不可欠な要素であり、今後も積極的に学習・実践を続けてまいります。

-->

<!-- test -->

