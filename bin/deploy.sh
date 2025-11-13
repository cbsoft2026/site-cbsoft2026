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
            args+=("-h" "${arg#*=}") 
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

npm run build

sshpass -p "$SSH_PASSWORD" ssh -o StrictHostKeyChecking=no "$SSH_USER@$SSH_HOST" "mkdir -p ~/tmp/deploy_temp && rm -rf ~/tmp/deploy_temp/*"
sshpass -p "$SSH_PASSWORD" scp -o StrictHostKeyChecking=no -r ./out/* "$SSH_USER@$SSH_HOST:~/tmp/deploy_temp"
sshpass -p "$SSH_PASSWORD" ssh -o StrictHostKeyChecking=no "$SSH_USER@$SSH_HOST" "rsync -rpz --no-times --chown=$SSH_USER:cbsoft --delete ~/tmp/deploy_temp/ "$APP_PATH"; rm -rf ~/tmp/deploy_temp/*"

exit 0