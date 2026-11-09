"""
wsgi.py — WSGI Entrypoint & Serverless Database Handler
Presensi Shobahul Lughoh & English Morning - MAN 1 Jepara
Kompatibel dengan Vercel Python Runtime, Gunicorn, dan WSGI Servers.
"""
import os
import sys
import json
import sqlite3
import mimetypes
from pathlib import Path
from urllib.parse import parse_qs

BASE_DIR = Path(__file__).resolve().parent

# 1. Konfigurasi Database Serverless
# Di Vercel Serverless, hanya /tmp yang writable.
IS_VERCEL = bool(os.environ.get("VERCEL"))
DB_DIR = Path("/tmp") if IS_VERCEL else BASE_DIR
DB_PATH = Path(os.environ.get("SQLITE_PATH", DB_DIR / "db.sqlite3"))
DATABASE_URL = os.environ.get("DATABASE_URL")
INITIAL_DATA_FILE = BASE_DIR / "initial_data.json"

# 2. Keamanan: ALLOWED_HOSTS & CSRF_TRUSTED_ORIGINS
ALLOWED_HOST_SUFFIXES = (".vercel.app", ".trycloudflare.com", "localhost", "127.0.0.1")
EXTRA_HOSTS = [h.strip() for h in os.environ.get("ALLOWED_HOSTS", "").split(",") if h.strip()]

def is_host_allowed(host):
    if not host:
        return True
    host_clean = host.split(":")[0].lower()
    if any(host_clean == h or host_clean.endswith(h) for h in ALLOWED_HOST_SUFFIXES):
        return True
    if any(host_clean == h for h in EXTRA_HOSTS):
        return True
    return False

# 3. Auto-Migration & Startup Seeding
def auto_migrate_and_seed():
    try:
        os.makedirs(DB_DIR, exist_ok=True)
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()
        
        # Buat tabel utama jika belum ada
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS master_data (
                key TEXT PRIMARY KEY,
                value TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS presensi_records (
                id TEXT PRIMARY KEY,
                student_id TEXT,
                tanggal TEXT,
                status TEXT,
                data_json TEXT
            )
        """)
        conn.commit()

        # Cek apakah seed sudah ada
        cursor.execute("SELECT COUNT(*) FROM master_data")
        count = cursor.fetchone()[0]
        if count == 0 and INITIAL_DATA_FILE.exists():
            with open(INITIAL_DATA_FILE, "r", encoding="utf-8") as f:
                seed_data = json.load(f)
            cursor.execute("INSERT OR REPLACE INTO master_data (key, value) VALUES (?, ?)", 
                           ("initial_data", json.dumps(seed_data)))
            conn.commit()
            print(f"[WSGI INIT] SQLite database seeded successfully at {DB_PATH}")
        conn.close()
    except Exception as e:
        print(f"[WSGI INIT ERROR] Auto-migration warning: {e}", file=sys.stderr)

# Jalankan inisialisasi startup saat modul di-load
auto_migrate_and_seed()

# 4. WSGI Application
def application(environ, start_response):
    http_host = environ.get("HTTP_HOST", "")
    path_info = environ.get("PATH_INFO", "/")

    # Validasi Keamanan ALLOWED_HOSTS
    if not is_host_allowed(http_host):
        start_response("403 Forbidden", [("Content-Type", "text/plain; charset=utf-8")])
        return [b"403 Forbidden: Host is not allowed by ALLOWED_HOSTS security policy."]

    # Routing API Health & Status
    if path_info in ("/api/health", "/api/status", "/api"):
        response_data = {
            "status": "online",
            "runtime": "python-wsgi",
            "environment": "vercel-serverless" if IS_VERCEL else "local-wsgi",
            "database": {
                "type": "external_postgresql" if DATABASE_URL else "serverless_sqlite",
                "path": str(DB_PATH),
                "writable": True
            },
            "allowed_hosts": list(ALLOWED_HOST_SUFFIXES) + EXTRA_HOSTS
        }
        body = json.dumps(response_data, indent=2).encode("utf-8")
        headers = [
            ("Content-Type", "application/json; charset=utf-8"),
            ("Access-Control-Allow-Origin", "*"),
            ("Content-Length", str(len(body)))
        ]
        start_response("200 OK", headers)
        return [body]

    # Penyajian File Statis
    clean_path = path_info.lstrip("/")
    if not clean_path or clean_path == "":
        clean_path = "index.html"

    file_target = (BASE_DIR / clean_path).resolve()
    
    # Mencegah Directory Traversal
    if not str(file_target).startswith(str(BASE_DIR)) or not file_target.is_file():
        start_response("404 Not Found", [("Content-Type", "text/html; charset=utf-8")])
        return [f"<h1>404 Not Found</h1><p>File {clean_path} tidak ditemukan.</p>".encode("utf-8")]

    mime_type, _ = mimetypes.guess_type(str(file_target))
    mime_type = mime_type or "application/octet-stream"
    if mime_type.startswith("text/") or mime_type in ("application/javascript", "application/json"):
        mime_type += "; charset=utf-8"

    file_size = file_target.stat().st_size
    headers = [
        ("Content-Type", mime_type),
        ("Content-Length", str(file_size)),
        ("X-Content-Type-Options", "nosniff"),
        ("X-Frame-Options", "SAMEORIGIN"),
        ("Access-Control-Allow-Origin", "*")
    ]
    start_response("200 OK", headers)
    with open(file_target, "rb") as f:
        return [f.read()]

app = application

