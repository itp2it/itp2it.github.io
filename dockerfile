# Nginxの公式Dockerイメージをベースとして使用
FROM nginx:alpine

## ローカルにあるWebアプリのファイルをコンテナ内のNginxのデフォルトのWebルートにコピー
# ローカルPCの /src ディレクトリの中身だけをコンテナのWebルートにコピー
COPY src /usr/share/nginx/html

# Nginxはデフォルトで80番ポートをリッスンするので、特に指定は不要
# CMD ["nginx", "-g", "daemon off;"] # Nginxイメージにはデフォルトで設定されているため、通常は不要