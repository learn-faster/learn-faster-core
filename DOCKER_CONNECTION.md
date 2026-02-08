# Robust Docker Connection Guide

This document explains how the automatic Docker connection detection works and how to use it.

## Problem

When running Docker in WSL2 from Windows, the WSL2 IP address can change after:
- Windows restarts
- WSL2 shutdown/restart (`wsl --shutdown`)
- Network changes

Previously, this required manually updating the `.env` file with the new IP address.

## Solution

The system now includes **automatic connection detection** that:
1. Tries multiple connection methods in order of likelihood
2. Caches the working connection for subsequent requests
3. Automatically re-detects if the cached connection fails

## How It Works

### Connection Priority Order

For **Neo4j** (port 7688):
1. `NEO4J_URI` environment variable (if set)
2. `neo4j://localhost:7688` (fastest when WSL port forwarding works)
3. `neo4j://127.0.0.1:7688` (explicit loopback)
4. WSL IP (detected via `wsl hostname -I`)
5. WSL IP (detected via `ip route`)
6. Docker Desktop internal IP
7. `neo4j://host.docker.internal:7688`

For **PostgreSQL** (port 5433):
1. `POSTGRES_HOST` environment variable (if set)
2. `localhost`
3. `127.0.0.1`
4. WSL IP (detected via `wsl hostname -I`)
5. WSL IP (detected via `ip route`)
6. Docker Desktop internal IP

### Auto-Detection

The system tests each endpoint by:
1. Opening a TCP connection (quick check)
2. Running a test query (full verification)
3. Caching the first working endpoint

### Connection Caching

Once a working connection is found:
- It's cached in memory for subsequent connections
- The cache is verified before each use
- If the cached connection fails, auto-detection runs again

## Configuration

### Recommended Setup (Auto-Detection)

Leave connection settings empty in `.env`:

```env
# Leave empty for auto-detection
NEO4J_URI=
POSTGRES_HOST=
DOCKER_HOST_OVERRIDE=
```

### Explicit Override (If Needed)

If auto-detection fails, you can still set explicit values:

```env
NEO4J_URI=neo4j://192.168.1.100:7688
POSTGRES_HOST=192.168.1.100
DOCKER_HOST_OVERRIDE=192.168.1.100
```

## Usage

### Starting the Application

1. Ensure Docker containers are running:
   ```bash
   wsl docker-compose up -d
   ```

2. Start the backend - it will auto-detect connections:
   ```bash
   uv run python main.py
   ```

### Logs

When auto-detection is working, you'll see:
```
Found working Neo4j connection: localhost (neo4j://localhost:7688)
Found working PostgreSQL connection: localhost (localhost:5433)
```

Or if using WSL IP:
```
Found working Neo4j connection: wsl_windows (neo4j://172.17.75.175:7688)
Found working PostgreSQL connection: wsl_windows (172.17.75.175:5433)
```

## Troubleshooting

### Connection Still Fails

1. **Verify containers are running**:
   ```bash
   wsl docker ps
   ```

2. **Check container logs**:
   ```bash
   wsl docker logs learnfast-neo4j
   wsl docker logs learnfast-postgres
   ```

3. **Test manual connection**:
   ```bash
   # Test Neo4j
   wsl docker exec -it learnfast-neo4j cypher-shell -u neo4j -p password "RETURN 1"

   # Test PostgreSQL
   wsl docker exec -it learnfast-postgres psql -U learnfast -c "SELECT 1"
   ```

4. **Check Windows firewall** - Ensure ports 7688 and 5433 are allowed

5. **Restart WSL** (last resort):
   ```bash
   wsl --shutdown
   wsl docker-compose up -d
   ```

### Debugging Auto-Detection

Set logging level to DEBUG to see all connection attempts:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

You'll see output like:
```
Trying Neo4j connection: localhost (neo4j://localhost:7688)
Trying Neo4j connection: wsl_windows (neo4j://172.17.75.175:7688)
Found working Neo4j connection: wsl_windows (neo4j://172.17.75.175:7688)
```

## Technical Details

The auto-detection logic is in `src/database/connections.py`:

- `ConnectionCache` - Caches working connections
- `find_working_neo4j_uri()` - Tests Neo4j endpoints
- `find_working_postgres_host()` - Tests PostgreSQL endpoints
- `Neo4jConnection` / `PostgreSQLConnection` - Connection classes with auto-detection

The code handles:
- WSL IP detection from both Windows and Linux sides
- Docker Desktop internal network detection
- Retry logic with exponential backoff
- Connection pool management for PostgreSQL
- Automatic re-detection on connection failure
