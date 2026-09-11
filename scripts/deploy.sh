#!/bin/bash
set -e
# =============================================================================
# Faz deploy do site Next.js exportado para o servidor remoto da sbc
#
# Requisitos:
#   1. Estar conectado à VPN da empresa (ex: VPN_SBC)
#   2. Ter sshpass instalado
#   3. Parâmetros a serem usados:
#       user, host e password
#
# Uso:
#   ./bin/deploy.sh -u "USER" -h "HOST" -p "PASSWORD"
#
# Observações:
#   - O script utiliza rsync para sincronizar os arquivos.
#   - Certifique-se de que o usuário tem permissão de escrita no servidor.
# =============================================================================

SSH_USER=""
SSH_HOST=""
SSH_PASSWORD=""
DIRECTORY=src
APP_PATH="/wwwsbc/cbsoft/public_html/2026/"

function help() {
    echo "options:"
    echo "u*     SSH User."
    echo "h*     SSH Host."
    echo "p*     SSH Password."
    echo
}

function check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo "Error: $1 is not installed."
        exit 1
    fi
}

args=()
for arg in "$@"; do
    case $arg in
        --user=*) 
            args+=("-u" "${arg#*=}") 
            ;;
        --host=*) 
            args+=("-h" "${arg#*=}") 
            ;;
        --password=*) 
            args+=("-p" "${arg#*=}") 
            ;;
        *) 
            args+=("$arg") 
            ;;
    esac
done
set -- "${args[@]}"

while getopts "u:h:p:" option; do
    case $option in
        u) 
            SSH_USER=$OPTARG 
            ;;
        h) 
            SSH_HOST=$OPTARG 
            ;;
        p)
            SSH_PASSWORD=$OPTARG
            ;;
        \?) 
            echo "Error: Invalid option"
            help
            exit 1 
            ;;
    esac
done

if [ -z "$SSH_USER" ] || [ -z "$SSH_HOST" ] || [ -z "$SSH_PASSWORD" ]; then
    echo "Error: Invalid options."
    help
    exit 1
fi

if [ ! -d "$DIRECTORY" ]; then
    echo "$DIRECTORY/ does not exist."
    exit 1
fi

check_command ssh
check_command scp
check_command sshpass
check_command npm
check_command tar
check_command gzip

START_TIME=$(date +%s)

echo "[1/6] Build"
NODE_ENV=production npm run build

cat <<EOF > out/.htaccess
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
ErrorDocument 404 /2026/404/

AddType application/javascript .mjs
EOF

ARCHIVE="/tmp/cbsoft-deploy.tar.gz"
REMOTE_ARCHIVE="~/tmp/cbsoft-deploy.tar.gz"
REMOTE_TMP="~/tmp/cbsoft-deploy"

echo "[2/6] Compressing..."

tar -C out -cf - . | gzip > "$ARCHIVE"

echo "      Preparing remote directory..."

sshpass -p "$SSH_PASSWORD" ssh \
    -o StrictHostKeyChecking=no \
    "$SSH_USER@$SSH_HOST" \
    "rm -rf $REMOTE_TMP && mkdir -p $REMOTE_TMP"

echo "[3/6] Uploading..."

sshpass -p "$SSH_PASSWORD" rsync \
    -e "ssh -o StrictHostKeyChecking=no -o LogLevel=ERROR" \
    --info=progress2 \
    "$ARCHIVE" \
    "$SSH_USER@$SSH_HOST:$REMOTE_ARCHIVE"

echo "[4/6] Extracting..."

sshpass -p "$SSH_PASSWORD" ssh \
    -o StrictHostKeyChecking=no \
    "$SSH_USER@$SSH_HOST" \
    "gzip -dc $REMOTE_ARCHIVE | tar -xf - -C $REMOTE_TMP"

echo "[5/6] Synchronizing..."

sshpass -p "$SSH_PASSWORD" ssh \
    -o StrictHostKeyChecking=no \
    "$SSH_USER@$SSH_HOST" \
    "rsync -rp --no-times --info=progress2 --chown=$SSH_USER:cbsoft --delete $REMOTE_TMP/ \"$APP_PATH\""

echo "[6/6] Cleaning up..."

sshpass -p "$SSH_PASSWORD" ssh \
    -o StrictHostKeyChecking=no \
    "$SSH_USER@$SSH_HOST" \
    "rm -rf $REMOTE_TMP $REMOTE_ARCHIVE"

rm -f "$ARCHIVE"

ELAPSED=$(( $(date +%s) - START_TIME ))

echo
echo "Deploy completed successfully. (${ELAPSED}s)"

exit 0