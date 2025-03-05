# **Dokumentation: Docker-gestütztes Deployment von Nginx, PostgreSQL und Express-Backend mit Ansible**
## **Quick Start**
Um alle laufenden Container, Volumes und Netzwerke zu entfernen und frisch zu starten, führe folgenden Befehl aus:
``` bash
docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker volume prune -f && docker network prune -f
```
## **Ansible Vault: Handhabung von Geheimnissen**
### **1. Anlegen der Datei `ansible/vault/secrets.yml`**
Erstelle die Datei:
``` bash
ansible-vault create ansible/vault/secrets.yml
```
Füge beispielsweise folgende Secrets ein:
``` yaml
postgres_password: "testpass"
```
**Speichern:** Nach Eingabe der Secrets `STRG + X` drücken, `Y` bestätigen und mit `Enter` die Datei speichern.
### **2. Bestehende Datei verschlüsseln**
Falls Du eine bereits bestehende Datei verschlüsseln möchtest (z. B. `ansible/vault/secrets.yml`), führe folgenden Befehl aus:
``` bash
ansible-vault encrypt ansible/vault/secrets.yml
```
## **Deployment starten**
So führst Du das Deployment aus:
``` bash
ansible-playbook -i ansible/inventory ansible/playbook.yaml --ask-vault-pass --ask-become-pass
```
## **Prerequisites (Voraussetzungen)**
Stelle sicher, dass alle erforderlichen Pakete und Tools installiert sind, bevor Du das Deployment startest.
### **1. Notwendige Pakete installieren**
Führe diese Befehle aus:
``` bash
# System aktualisieren
sudo apt update && sudo apt upgrade -y

# Gnome Terminal installieren (optional)
sudo apt install gnome-terminal -y

# Docker & Docker Compose installieren
sudo apt install -y docker.io docker-compose

# Ansible & Python-Abhängigkeiten installieren
sudo apt install -y python3 python3-pip git

# Notwendige Ansible-Module installieren
pip3 install ansible docker
```
### **2. Benutzer zur Docker-Gruppe hinzufügen**
Falls Du Docker-Kommandos ohne `sudo` ausführen möchtest, füge Deinen Benutzer zur Docker-Gruppe hinzu:
``` bash
sudo usermod -aG docker $USER
newgrp docker
```
Hinweis: Melde Dich neu an oder führe `newgrp docker` aus, damit die Änderungen sofort wirksam werden.
**Zusätzliche Dokumentation:**
[Ansible Vault Offizielle Dokumentation](https://docs.ansible.com/ansible/2.8/user_guide/vault.html)
## **Einleitung**
Dieses Projekt wurde im Rahmen des Moduls **Netzwerkbetriebssysteme** unter Leitung von **Olivier Büchel** erstellt. Es handelt sich um eine vollständige, containerisierte Lösung für die Bereitstellung einer Webanwendung mittels Docker und Ansible.
Das Ziel ist, eine **sichere, skalierbare und wartbare** Infrastruktur bereitzustellen, die sich aus folgenden Komponenten zusammensetzt:
- PostgreSQL als relationale Datenbank
- Express.js als Backend-Server
- Nginx als Reverse Proxy und Webserver

Das Deployment erfolgt vollständig mit **Ansible** und automatisiert alle notwendigen Schritte, wie die Erstellung von Containern, die Datenbankinitialisierung und das Deployment der Anwendung.
## **Verwendete Technologien**
- **Docker** & **Docker Compose**: Container-Orchestrierung
- **Ansible**: Automatisierung von Deployment und Konfiguration
- **PostgreSQL**: Relationale Datenbank
- **Express.js** (Node.js): Backend-Dienst für API
- **Nginx**: HTTP-Server und Reverse Proxy

## **Projektfunktionen**
1. **Automatisiertes Setup:**
   Ansible konfiguriert und startet alle Services autonom.
2. **Datenbank-Initialisierung:**
   Das Playbook erstellt die Datenbankstruktur und fügt Testdaten ein.
3. **Reverse Proxy:**
   Nginx leitet `/api/`-Anfragen automatisch an das Backend weiter.
4. **Modularität:**
   Klare Trennung der Konfigurationen für Backend, Datenbank und Infrastruktur.

## **Ordner-/Projektstruktur**
Die gesamte Projektstruktur ist wie folgt organisiert:
``` plaintext
teko_nbs_ansible-docker-fullstack-example
├── .idea/                   # IDE-spezifische Dateien (optional)
├── ansible/                 # Ansible-Konfiguration und Rollen
│   ├── roles/
│   │   ├── backend/         # Rolle für das Backend
│   │   ├── common/          # Gemeinsame Konfigurationsrolle
│   │   ├── nginx/           # Rolle für Nginx
│   │   └── postgres/        # Rolle für PostgreSQL
│   ├── templates/           # Jinja2-Templates
│   ├── vault/               # Verschlüsselte Dateien (Secrets)
│   ├── inventory            # Hosts-Inventar
│   └── playbook.yaml        # Playbook für das Deployment
├── backend/                 # Backend-Quellcode (Node.js)
├── deployment/              # Deployment-Dateien (.env, docker-compose etc.)
├── nginx/                   # Nginx-Konfiguration und statische Dateien
├── ansible.cfg              # Ansible-Projektkonfiguration
├── LICENSE                  # Lizenzinformationen
└── README.md                # Dokumentation
```
## **Nützliche Befehle**
### **1. Ansible-Host-Check**
Teste die Verfügbarkeit der definierten Hosts:
``` bash
ansible all -i ansible/inventory -m ping -vvvv
```
Erwartete Ausgabe:
``` json
localhost | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```
### **2. Ansible Vault nutzen**
#### Verschlüsseln einer Datei
``` bash
ansible-vault encrypt secrets.yml
```
#### Entschlüsseln einer Datei
``` bash
ansible-vault decrypt secrets.yml
```
#### Datei bearbeiten
``` bash
ansible-vault edit ansible/vault/secrets.yml
```
### **3. Backend und Datenbank testen**
Sobald die Anwendung gestartet wurde, kann der API-Endpunkt getestet werden:
``` bash
curl -s http://localhost:8080/api/users
```
## **Genutzte Software-Versionen**
Folgende Versionen wurden getestet und verwendet:
``` bash
Ansible [core 2.14.18]
Docker version 27.5.1, build 9f9e405
Python 3.11.2
pip 23.0.1
```
## **Fazit und Zielerreichung**
- **Sicher & Automatisiert**: Mit Ansible Vault und Automatisierung aller Schritte ist die Lösung sicher und effizient.
- **Modulierbar & Wartbar**: Klare Trennung der Rollen und Konfigurationen.
- **Bereit für Produktion**: Problemloses Deployment in einer produktionsähnlichen Umgebung möglich.

Falls weitere Fragen oder Probleme auftreten, steht die Dokumentation als Nachschlagewerk bereit.
