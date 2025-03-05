const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.BACKEND_PORT || 3000;

// PostgreSQL-Verbindung konfigurieren
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres_testuser',
    host: process.env.POSTGRES_HOST || 'postgres_container', // Korrekt: Docker-Container auf "backend_network"
    database: process.env.POSTGRES_DB || 'postgres_test_db',
    password: process.env.POSTGRES_PASSWORD || 'testpass',
    port: process.env.POSTGRES_PORT || 5432, // Standard PostgreSQL-Port
});

// API-Route für User aus der Datenbank
app.get('/api/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users;');
        res.json(result.rows);
    } catch (error) {
        console.error('Fehler beim Abrufen der User:', error);
        res.status(500).json({ error: 'Interner Serverfehler' });
    }
});

// Verbindung zur Datenbank sicherstellen
pool.connect((err, client, release) => {
    if (err) {
        console.error('🚨 Fehler beim Verbinden mit der Datenbank:', err.stack);
    } else {
        console.log('✅ Erfolgreich mit der PostgreSQL-Datenbank verbunden');
    }
    release();
});

// Server starten
app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Backend läuft auf Port ${port}`);
});