---
name: sqlit-azure-sql-login-troubleshooting
description: "Use when sqlit/ODBC to Azure SQL fails with an OpenSSL load error or 'Login failed ... not configured to accept this token' on macOS Homebrew."
---

# sqlit / Azure SQL login troubleshooting (macOS, Homebrew)

Config lives in `~/.config/sqlit/` (`connections.json`, `azure_sql_token.json`). sqlit venv: `~/.local/pipx/venvs/sqlit-tui`.

## A. `SSL Provider: [OpenSSL library could not be loaded ...]`
1. `ls -l /opt/homebrew/opt/openssl` — if it points at `openssl@4`, that's the cause. `libmsodbcsql.18.dylib` hardcodes `/opt/homebrew/opt/openssl/lib/libssl` (`strings` it; `otool -L` shows nothing) and supports only OpenSSL 1.x/3.x.
2. Fix: `ln -sfn ../Cellar/openssl@3/<installed-version> /opt/homebrew/opt/openssl` (get version from `ls /opt/homebrew/Cellar/openssl@3`).
3. Verify: python `ctypes.CDLL('/opt/homebrew/opt/openssl/lib/libssl.dylib')`; `isql -v -k "DRIVER={ODBC Driver 18 for SQL Server};SERVER=127.0.0.1,1"` should give a network error, not SSL.
4. `brew upgrade`/`brew link` can reset the symlink; re-run step 2.

## B. `Login failed for user '<token-identified principal>'. ... not configured to accept this token`
Cause is usually a stale/wrong-tenant token cached by sqlit (reused until ~5 min before expiry).
1. Decode JWT payload of `~/.config/sqlit/azure_sql_token.json` (`tid`, `aud`, `upn`) and compare `tid` to `az account show --query tenantId`. Server tenant must match; `aud` must be `https://database.windows.net`.
2. Fix: `rm ~/.config/sqlit/azure_sql_token.json` (sqlit re-acquires via `DefaultAzureCredential` -> az CLI). If still wrong tenant: `az login --tenant <server tenant>`.
3. Verify: `sqlit query -c "<connection name>" -q "SELECT SUSER_SNAME(), DB_NAME()"`.
4. After any `az login`/`az account set` that changes tenant, delete the cache file again.
