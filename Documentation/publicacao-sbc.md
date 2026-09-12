# Deploy — `bin/deploy.sh`

Script para fazer o deploy do site Next.js do CBSoft nas máquinas da SBC.

## Requisitos

- Estar conectado à VPN da SBC.
- Ter usuário, host e senha de acesso ao servidor.

### VPN

Caso não possua o OpenVPN ou esteja utilizando uma versão diferente, prefira a
versão mais recente da série **2.4.x**. Não é indicada a versão **2.5.x**.[^1]

[Download do OpenVPN](https://openvpn.net/community-downloads)

Arquivo de configuração da VPN-Serviços:

[VPN-Servicos.ovpn](https://softwares-download.ufrgs.br/openvpn/VPN-Servicos.ovpn)

Documentação:

- [Linux](https://www.ufrgs.br/documentacaoti/vpn-instalacao-ubuntu-modo-texto)
- [macOS](https://www.ufrgs.br/documentacaoti/vpn-instalacao-os-x-mac)
- [iOS/iPadOS](https://www.ufrgs.br/documentacaoti/vpn-instalacao-ios-ipad)
- [Ativação da VPN](https://www.ufrgs.br/documentacaoti/vpn-ativacao)

```bash
sudo openvpn --config VPN-Servicos.ovpn
```

## Deploy

Execute:

```bash
./bin/deploy.sh -u "USER" -h "HOST" -p "PASSWORD"
```

O script:

1. Faz o build de produção do Next.js.
2. Gera o `.htaccess`.
3. Compacta o diretório `out/`.
4. Envia os arquivos para o servidor.
5. Sincroniza o conteúdo com o diretório de publicação.
6. Remove os arquivos temporários.

## Diretório no servidor

O site é publicado em:

```text
/wwwsbc/cbsoft/public_html/YEAR/
```

A pasta `YEAR/` já existe e seu conteúdo pode ser substituído pelo deploy.

O script utiliza `rsync --delete`, portanto arquivos antigos que não existirem
mais no novo build serão removidos.

## Site

Após o deploy, o site estará disponível em:

```text
https://cbsoft.sbc.org.br/YEAR/
```

## Redirecionamento

Depois de validar o site em `/YEAR/`, será necessário configurar o redirecionamento:

```text
https://cbsoft.sbc.org.br/ -> https://cbsoft.sbc.org.br/YEAR/
```

```html
<html>
  <head>
    <title> </title>
  </head>
  <body OnLoad="redirect()">
    <script language="JavaScript">
      function redirect() {
        location.href = 'http://cbsoft.sbc.org.br/YEAR';
      }
    </script>
  </body>
</html>
```

[^1]:
    As informações referentes à VPN e ao acesso às máquinas da SBC foram
    fornecidas por e-mail pela equipe da UFRGS.
