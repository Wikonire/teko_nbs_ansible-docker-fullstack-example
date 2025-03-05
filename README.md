
# Dokumentation für das Projekt: Docker-gestütztes Deployment von Nginx, PostgreSQL und Express-Backend mit Ansible

## Quick start

### Ansible Vault: Geheimnisse verwalten

#### Datei `ansible/vault/secrets.yml` erstellen

```bash
ansible-vault create ansible/vault/secrets.yml
```

Füge dort z. B. folgendes ein:

```yaml
postgres_password: "testpass"
```

Die Datei mit `STRG + X` speichern, dann `Y`, dann `Enter`.

#### Bestehende Datei verschlüsseln

Falls eine bestehende Datei verschlüsselt werden soll, wie das erstellte `ansible/vault/secrets.yml`:

```bash
  ansible-vault encrypt ansible/vault/secrets.yml
```
### Deployment starten
```bash
  ansible-playbook -i ansible/inventory.ini ansible/playbook.yaml --ask-vault-pass --ask-become-pass
```

## Prerequisites (Voraussetzungen)
Dies sind die Voraussetzungen und Vorarbeiten die nötig sind:
### Notwendige Pakete installieren
```bash
sudo apt update && sudo apt upgrade -y

# Gnome Terminal installieren (optional)
sudo apt install gnome-terminal -y

# Docker & Compose installieren
sudo apt install -y docker.io docker-compose

# Ansible & Python-Abhängigkeiten installieren
sudo apt install -y python3 python3-pip git

# Ansible-Module für Docker installieren
pip3 install ansible docker
```

### Aktuellen User zur Docker-Gruppe hinzufügen, um es ohne Adminrechte auszuführen
```bash
sudo usermod -aG docker $USER
newgrp docker
```

Hinweis: Damit die Änderungen wirken, muss der Benutzer sich neu anmelden oder den Befehl `newgrp docker` ausführen.

Weitere Ansible Vault Dokumentation:
[Ansible Vault Offizielle Doku](https://docs.ansible.com/ansible/2.8/user_guide/vault.html)

## Einleitung

Dieses Projekt wird im Rahmen des Faches **Netzwerkbetriebsystem** bei **Olivier Büchel** durchgeführt und dient als benotete Abgabe für das Fach.
Es bietet eine vollständige, containerisierte Lösung für den Betrieb einer Webanwendung mit folgenden Komponenten:

- PostgreSQL als Datenbank
- Express.js als Backend-Server
- Nginx als Reverse Proxy und Webserver

Das Deployment erfolgt automatisiert mit Ansible und nutzt Docker, um die Container einheitlich und reproduzierbar zu verwalten.  
Diese Struktur ermöglicht eine skalierbare, wartbare und sichere Bereitstellung der Anwendung.

## Technologien

- Docker & Docker Compose für containerisierte Dienste
- Ansible für automatisiertes Deployment
- PostgreSQL als relationale Datenbank
- Node.js mit Express.js als Backend
- Nginx als Reverse Proxy & Webserver

## Funktionen

- **Automatisiertes Setup:** Das Playbook installiert und konfiguriert alle Services.
- **Datenbankinitialisierung:** Das Playbook erstellt automatisch die Datenbank und fügt Testdaten ein.
- **Reverse Proxy mit Nginx:** `/api/`-Anfragen werden an das Backend weitergeleitet.
- **Modularer Aufbau:** Klare Trennung zwischen Code, Infrastruktur und Automatisierung.

## Ordner- und Projektstruktur

```text
teko_nbs_ansible-docker-fullstack-example
├── .idea/                   # IntelliJ IDEA-Projektdateien
├── ansible/                 # Ansible Konfiguration und Rollen
│   ├── roles/
│   │   ├── backend/         # Backend-spezifische Rolle
│   │   │   └── tasks/
│   │   │       └── main.yaml
│   │   ├── common/          # Gemeinsame Konfigurationsrolle
│   │   │   └── tasks/
│   │   │       └── main.yaml
│   │   ├── nginx/           # Nginx-spezifische Rolle
│   │   │   └── tasks/
│   │   │       └── main.yaml
│   │   └── postgres/        # Postgres-spezifische Rolle
│   │       └── tasks/
│   │           └── main.yaml
│   ├── templates/
│   │   └── env.j2           # Jinja2-Umgebungstemplate
│   ├── vault/
│   │   └── secrets.yaml     # Verschlüsselte Secrets
│   ├── ansible.log          # Log-Datei (optional)
│   ├── inventory            # Server-Inventar
│   └── playbook.yaml        # Ansible Playbook
├── backend/                 # Node.js-Backend
│   ├── node_modules/        # Abhängigkeiten automatisch von npm generiert
│   ├── Dockerfile           # Docker-Builddatei für das Backend
│   ├── package.json         # Paketdefinition und Abhängigkeiten
│   ├── package-lock.json    # Automatisch generiertes Abhängigkeitsmanagement
│   └── server.js            # Haupt-Server-Implementierung
├── deployment/              # Deployment-Konfigurationsdateien
│   ├── .env                 # Umgebungsvariablen
│   └── docker-compose.yaml  # Konfiguration für den Docker-Stack
├── nginx/                   # Nginx-Server Konfiguration
│   ├── index.html           # Statische HTML-Seite
│   └── nginx.conf           # Konfigurationsdatei für Nginx
├── ansible.cfg              # Hauptkonfigurationsdatei für Ansible
├── LICENSE                  # Lizenzinformationen
├── package-lock.json        # Projektweite Abhängigkeitsmanagementdatei
└── README.md                # Projektbeschreibung und Dokumentation

```

## Genutzte Dependencies

```bash
ansible [core 2.14.18]
  config file = None
  ansible python module location = /usr/lib/python3/dist-packages/ansible
  python version = 3.11.2
  jinja version = 3.1.2
  libyaml = True
Docker version 27.5.1, build 9f9e405
Python 3.11.2
pip 23.0.1 from /usr/lib/python3/dist-packages/pip (python 3.11)
```

## Gelerntes

### Inventory Erreichbarkeit testen

Testen, ob Ansible den Host erreichen kann:

```bash
ansible all -i inventory -m ping
```

Erwartete Ausgabe:

```
localhost | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

### Verbesserte Sicherheit durch Ansible Vault

Ansible Vault wird verwendet, um sensible Daten (Passwörter, API-Keys, private Variablen, Zertifikate) sicher zu speichern.

Datei verschlüsseln:
```bash
ansible-vault encrypt vars.yml
```

Datei entschlüsseln:
```bash
ansible-vault decrypt vars.yml
```

Geheime Datei bearbeiten:
```bash
ansible-vault edit ansible/vault/secrets.yaml
```

### User zu `sudo`-User machen

Falls ein Benutzer `sudo`-Rechte benötigt, kann dieser permanent hinzugefügt werden:

```bash
sudo usermod -aG sudo meinbenutzer
```

Anschließend die Änderungen anwenden:
```bash
newgrp sudo
```

Testen, ob `sudo` jetzt funktioniert:
```bash
sudo whoami
```

Erwartete Ausgabe:
```
root
```

### Ansible-Projekt wurde vollständig auf Linux durchgeführt

- Alle eingesetzten Tools (Ansible, Docker, PostgreSQL, Nginx) wurden auf einer Linux-Umgebung getestet.
- Keine Windows- oder MacOS-Komponenten wurden berücksichtigt.
- Alle verwendeten Befehle sind für Linux-Distributionen optimiert.
- Dateisystemrechte wurden korrekt für Linux-Systeme konfiguriert.

### Docker-Compose wird automatisch durch Ansible gestartet

- Das Playbook führt `docker-compose up -d` nach der Installation und Konfiguration automatisch aus.
- Alle Container laufen nach der Playbook-Ausführung automatisch.
- Keine manuellen Startbefehle für `docker-compose` notwendig.

## TODO (Nächste Schritte)

### `.gitignore` aktualisieren, um sensible Dateien auszuschließen:

```bash
echo "ansible/vault/secrets.yml" >> .gitignore
echo "ansible/vault-pass.txt" >> .gitignore
```

### Ansible Playbook ausführen:

```bash
ansible-playbook -i inventory.ini playbook.yml --ask-vault-pass
```

### Backend & Datenbank testen:

```bash
curl -s http://localhost:8080/api/users
```

### Syntax check
```
ansible-playbook ansible/playbook.yaml --syntax-check
```

## Fazit

- Modular, sicher & skalierbar
- Automatisiertes Deployment
- Sichere Handhabung von Passwörtern
- Bereit für Produktion & CI/CD















































