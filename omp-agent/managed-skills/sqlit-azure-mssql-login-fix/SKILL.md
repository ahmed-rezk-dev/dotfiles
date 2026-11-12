---
name: sqlit-azure-mssql-login-fix
description: "Use when sqlit or MSSQL ODBC on macOS fails with 'OpenSSL library could not be loaded' or Entra 'Login failed ... not configured to accept this token'."
---

# sqlit / MSSQL connection failures (macOS, Homebrew)

## A. `[Microsoft]SSL Provider: OpenSSL library could not be loaded`
1. `ls -l /opt/homebrew/opt/openssl` — if it points to `openssl@4`, that's the cause (msodbcsql18 hardcodes `/opt/homebrew/opt/openssl/lib/libssl`; only supports OpenSSL 1.0/1.1/3.0).
2. Fix: `ln -sfn ../Cellar/openssl@3/<installed-version> /opt/homebrew/opt/openssl` (check `ls /opt/homebrew/Cellar/openssl@3`).
3. Verify: python `ctypes.CDLL('/opt/homebrew/opt/openssl/lib/libssl.dylib')`; `isql -v -k "DRIVER={ODBC Driver 18 for SQL Server};SERVER=..."` should no longer show SSL error.
4. `brew upgrade`/`brew link` can reset the symlink; re-run.

## B. `Login failed for user '<token-identified principal>'. The server is not currently configured to accept this token`
sqlit with `auth_type: ad_default` caches the Entra token in `~/.config/sqlit/azure_sql_token.json` (reused until ~5 min before expiry). A token minted for a different tenant keeps failing.
1. Decode the token payload (base64 of 2nd JWT segment): compare `tid` with `az account show --query tenantId` / server tenant (Mavis: `c51abd6f-bf94-418b-88ca-b138e824d43c`). `aud` must be `https://database.windows.net`.
2. Fix: `rm ~/.config/sqlit/azure_sql_token.json`; if fresh token still wrong tenant: `az login --tenant <tenant-id>`.
3. Verify: `sqlit query -c "Mavos QA" -q "SELECT SUSER_SNAME(), DB_NAME()"`.
4. Clear the cache after any `az login`/`az account set` that changes tenant.

Config: `~/.config/sqlit/connections.json`; venv: `~/.local/pipx/venvs/sqlit-tui`; token code: `sqlit/domains/connections/providers/mssql/adapter.py::_preflight_azure_credentials`.
