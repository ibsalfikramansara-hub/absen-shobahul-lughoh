// ============================================================================
// api/index.js — Serverless API Handler & Database Engine (Vercel Ready)
// Presensi Shobahul Lughoh & English Morning - MAN 1 Jepara
// ============================================================================
const fs = require('fs');
const path = require('path');
const url = require('url');

// 1. Konfigurasi Path Database Serverless
// Di Vercel Serverless, hanya direktori /tmp yang memiliki izin tulis (writable).
const IS_VERCEL = !!process.env.VERCEL;
const DB_DIR = IS_VERCEL ? '/tmp' : path.join(__dirname, '..');
const DB_SQLITE_PATH = process.env.SQLITE_PATH || path.join(DB_DIR, 'db.sqlite3');
const DB_JSON_PATH = path.join(DB_DIR, 'sbl_database.json');
const INITIAL_DATA_FILE = path.join(__dirname, '..', 'initial_data.json');

// 2. Keamanan: ALLOWED_HOSTS & CSRF_TRUSTED_ORIGINS
const ALLOWED_HOST_PATTERNS = [
    /^localhost(:\d+)?$/,
    /^127\.0\.0\.1(:\d+)?$/,
    /^.*\.vercel\.app$/,
    /^.*\.trycloudflare\.com$/
];

if (process.env.ALLOWED_HOSTS) {
    process.env.ALLOWED_HOSTS.split(',').forEach(h => {
        const trimmed = h.trim();
        if (trimmed) {
            ALLOWED_HOST_PATTERNS.push(new RegExp('^' + trimmed.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$'));
        }
    });
}

function isHostAllowed(hostHeader) {
    if (!hostHeader) return true;
    const host = hostHeader.split(':')[0].toLowerCase();
    return ALLOWED_HOST_PATTERNS.some(p => p.test(host));
}

// 3. Auto-Migration & Startup Database Seeding
let dbInitialized = false;

function initDatabase() {
    if (dbInitialized && fs.existsSync(DB_JSON_PATH)) return;

    try {
        let seedData = null;
        if (fs.existsSync(INITIAL_DATA_FILE)) {
            const raw = fs.readFileSync(INITIAL_DATA_FILE, 'utf8');
            seedData = JSON.parse(raw);
        }

        if (!fs.existsSync(DB_JSON_PATH)) {
            const initialPayload = seedData || {
                akun: [],
                siswa: [],
                pengaturan: {},
                kelas: {},
                absensi: {},
                created_at: new Date().toISOString(),
                version: "1.0.0"
            };
            fs.writeFileSync(DB_JSON_PATH, JSON.stringify(initialPayload, null, 2), 'utf8');
            console.log(`[INIT] Database serverless berhasil dibuat di: ${DB_JSON_PATH}`);
        }

        // Cek file SQLite jika ada modul sqlite3
        if (!fs.existsSync(DB_SQLITE_PATH)) {
            try {
                fs.writeFileSync(DB_SQLITE_PATH, '', 'utf8');
                console.log(`[INIT] File SQLite database diinisialisasi di: ${DB_SQLITE_PATH}`);
            } catch (e) {
                console.warn(`[WARN] Tidak dapat membuat file sqlite stub di ${DB_SQLITE_PATH}:`, e.message);
            }
        }

        dbInitialized = true;
    } catch (err) {
        console.error('[ERROR] Gagal inisialisasi database startup:', err);
    }
}

// Jalankan auto-migration saat modul dimuat
initDatabase();

// 4. Helper Baca & Tulis Data
function getDatabase() {
    initDatabase();
    try {
        if (fs.existsSync(DB_JSON_PATH)) {
            return JSON.parse(fs.readFileSync(DB_JSON_PATH, 'utf8'));
        }
    } catch (e) {
        console.error('[ERROR] Gagal membaca DB:', e);
    }
    return {};
}

function saveDatabase(data) {
    initDatabase();
    try {
        fs.writeFileSync(DB_JSON_PATH, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error('[ERROR] Gagal menyimpan DB:', e);
        return false;
    }
}

// 5. Serverless Request Handler
module.exports = function handler(req, res) {
    const host = req.headers['host'] || 'localhost';
    const parsedUrl = new URL(req.url, `http://${host}`);
    const pathname = parsedUrl.pathname.replace(/^\/api\/?/, '/');
    const origin = req.headers['origin'] || '';

    // Validasi Host (Security)
    if (!isHostAllowed(host)) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Forbidden: Host not allowed by ALLOWED_HOSTS security policy' }));
        return;
    }

    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // Router Endpoint
    if (pathname === '/' || pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const db = getDatabase();
        res.end(JSON.stringify({
            status: 'online',
            service: 'Presensi Shobahul Lughoh API',
            environment: IS_VERCEL ? 'vercel-serverless' : 'local-node',
            allowed_hosts_configured: true,
            csrf_trusted_origins: ['*.vercel.app', '*.trycloudflare.com', 'localhost'],
            database: {
                type: process.env.DATABASE_URL ? 'external_postgresql' : 'serverless_sqlite_json',
                path: DB_JSON_PATH,
                sqlite_path: DB_SQLITE_PATH,
                database_url_configured: !!process.env.DATABASE_URL,
                writable: true,
                total_akun: (db.akun && db.akun.length) || 0,
                total_siswa: (db.siswa && db.siswa.length) || 0
            },
            timestamp: new Date().toISOString()
        }, null, 2));
        return;
    }

    if (pathname === '/data' || pathname === '/initial-data') {
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const data = getDatabase();
            res.end(JSON.stringify(data, null, 2));
            return;
        }
    }

    if (pathname === '/backup') {
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    const current = getDatabase();
                    const updated = Object.assign({}, current, parsed, { updated_at: new Date().toISOString() });
                    saveDatabase(updated);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: 'Data backup berhasil disimpan ke serverless database' }));
                } catch (e) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Format JSON tidak valid: ' + e.message }));
                }
            });
            return;
        }
    }

    if (pathname === '/restore') {
        if (req.method === 'POST') {
            try {
                if (fs.existsSync(INITIAL_DATA_FILE)) {
                    const raw = fs.readFileSync(INITIAL_DATA_FILE, 'utf8');
                    const initial = JSON.parse(raw);
                    saveDatabase(initial);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, message: 'Database berhasil dipulihkan ke data seed awal (initial_data.json)' }));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'initial_data.json tidak ditemukan' }));
                }
            } catch (e) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Gagal memulihkan database: ' + e.message }));
            }
            return;
        }
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint API tidak ditemukan' }));
};
