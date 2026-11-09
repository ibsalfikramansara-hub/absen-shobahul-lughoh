// ============================================================================
// server.js — Server Mandiri Lokal & API Engine (Zero-Dependency Node.js)
// Presensi Shobahul Lughoh & English Morning - MAN 1 Jepara
// Production-Ready, Compression-Enabled, Vercel & Cloudflare Tunnel Compatible
// ============================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

// Import handler API serverless
const apiHandler = require('./api/index.js');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

// Konfigurasi Keamanan & Host
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

// MIME Types Komprehensif
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.mjs': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp',
    '.pdf': 'application/pdf',
    '.txt': 'text/plain; charset=utf-8',
    '.csv': 'text/csv; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    const host = req.headers['host'] || 'localhost';
    const parsedUrl = new URL(req.url, `http://${host}`);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    // 1. Validasi Keamanan Host
    if (!isHostAllowed(host)) {
        res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('403 Forbidden: Host tidak diizinkan oleh kebijakan keamanan ALLOWED_HOSTS.');
        return;
    }

    // 2. Routing API Serverless (/api/*)
    if (pathname.startsWith('/api')) {
        return apiHandler(req, res);
    }

    // 3. Normalisasi path file statis
    if (pathname === '/') {
        pathname = '/index.html';
    }

    const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
    const filePath = path.join(ROOT_DIR, safePath);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(`
                <!DOCTYPE html>
                <html lang="id">
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>404 Tidak Ditemukan · Presensi MAN 1 Jepara</title>
                    <style>
                        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; padding: 60px 20px; background: #f8fafc; color: #1e293b; }
                        .card { max-width: 480px; margin: 0 auto; background: white; padding: 40px; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
                        h1 { color: #dc2626; font-size: 28px; margin-bottom: 12px; }
                        p { color: #64748b; font-size: 15px; margin-bottom: 24px; line-height: 1.6; }
                        a { display: inline-block; background: #0f8049; color: white; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; transition: background 0.2s; }
                        a:hover { background: #0a5f35; }
                        code { background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-size: 13px; color: #0f172a; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>404 - Halaman Tidak Ditemukan</h1>
                        <p>Berkas <code>${SBL_esc(safePath)}</code> tidak ditemukan di server aplikasi.</p>
                        <a href="/">&larr; Kembali ke Beranda / Login</a>
                    </div>
                </body>
                </html>
            `);
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        // Header Keamanan & Caching
        const headers = {
            'Content-Type': contentType,
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'SAMEORIGIN',
            'X-XSS-Protection': '1; mode=block',
            'Access-Control-Allow-Origin': '*'
        };

        const isTextOrCode = ['.html', '.css', '.js', '.json', '.svg', '.txt', '.csv'].includes(ext);

        if (isTextOrCode) {
            headers['Cache-Control'] = ext === '.html' ? 'no-cache, must-revalidate' : 'public, max-age=86400';
        } else {
            headers['Cache-Control'] = 'public, max-age=31536000, immutable';
        }

        // Dukungan Kompresi Gzip untuk optimalisasi bandwidth
        const acceptEncoding = req.headers['accept-encoding'] || '';
        const shouldCompress = isTextOrCode && stats.size > 1024 && acceptEncoding.includes('gzip');

        if (shouldCompress) {
            headers['Content-Encoding'] = 'gzip';
            res.writeHead(200, headers);
            const rawStream = fs.createReadStream(filePath);
            const gzip = zlib.createGzip();
            rawStream.pipe(gzip).pipe(res);
        } else {
            headers['Content-Length'] = stats.size;
            res.writeHead(200, headers);
            const readStream = fs.createReadStream(filePath);
            readStream.pipe(res);
        }
    });
});

function SBL_esc(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

server.listen(PORT, '0.0.0.0', () => {
    console.log('====================================================');
    console.log('  APLIKASI PRESENSI SHOBAHUL LUGHOH - MAN 1 JEPARA');
    console.log('====================================================');
    console.log(`[INFO] Server lokal aktif & siap digunakan di:`);
    console.log(`       👉 http://localhost:${PORT}`);
    console.log(`       👉 http://127.0.0.1:${PORT}`);
    console.log('');
    console.log(`[STATUS] Database: Ready (Auto-seeding initial_data.json)`);
    console.log(`[STATUS] Keamanan: ALLOWED_HOSTS & CSRF origins terproteksi`);
    console.log(`[STATUS] Kompresi: Gzip enabled`);
    console.log('');
    console.log('Akun Pengguna Bawaan:');
    console.log('  1. Admin/TU    : admin       / admin123');
    console.log('  2. Koordinator : koordinator / koordinator123');
    console.log('  3. Tentor      : pak riki    / mutawasihx');
    console.log('  4. Wali Kelas  : bu nunuk    / XE2 (X E2)');
    console.log('====================================================');
    console.log('Tekan CTRL+C untuk menghentikan server.');
});
