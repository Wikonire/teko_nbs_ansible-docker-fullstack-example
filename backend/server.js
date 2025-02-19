const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.BACKEND_PORT || 3000;

// PostgreSQL-Verbindung konfigurieren
const pool = new Pool({
    user: process.env.POSTGRES_USER || 'postgres_testuser',
    host: 'postgres_container', // Container-Name des PostgreSQL-Servers (Docker-Network)
    database: process.env.POSTGRES_DB || 'postgres_test_db',
    password: process.env.POSTGRES_PASSWORD || 'testpass',
    port: process.env.POSTGRES_PORT || 5432,
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

// Server starten
app.listen(port, () => {
    console.log(`🚀 Backend läuft auf Port ${port}`);
});

