# Agent Reach — nota de instalación

Skill vendorizada desde https://github.com/Panniantong/agent-reach (v1.5.0).

La skill es solo el enrutador: los comandos que describe (`agent-reach doctor`,
`agent-reach configure ...`) necesitan el CLI instalado en la máquina.

## Instalar el CLI

```bash
pipx install https://github.com/Panniantong/agent-reach/archive/main.zip
# o, sin pipx:
python3 -m venv ~/.agent-reach-venv
~/.agent-reach-venv/bin/pip install https://github.com/Panniantong/agent-reach/archive/main.zip
export PATH="$HOME/.agent-reach-venv/bin:$PATH"
```

## Comprobar

```bash
agent-reach install --env=auto   # chequeo de solo lectura, no modifica nada
agent-reach doctor               # estado por canal
```

`agent-reach install --env=auto --system` es el que sí instala dependencias del
sistema; ejecutarlo solo con aprobación explícita.

## Canales

Sin configuración: web (Jina Reader), YouTube, RSS, GitHub, V2EX, Bilibili básico.
Con credenciales/sesión: Twitter/X, Reddit, Facebook, Instagram, 小红书, LinkedIn,
雪球, 小宇宙. Las cookies se guardan solo en `~/.agent-reach/`, nunca en el repo.
