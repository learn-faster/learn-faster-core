#!/usr/bin/env python3
"""
WSL Docker Connection Setup Script

This script detects the WSL IP address and optionally updates the .env file
to enable Windows-to-WSL Docker connectivity.

Usage:
    python scripts/setup_wsl_connection.py [--update-env]
"""

import os
import subprocess
import sys


def get_wsl_ip():
    """Get the WSL2 virtual IP address."""
    try:
        # Method 1: Get gateway from default route
        result = subprocess.run(
            ["ip", "route", "show", "default"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            for line in result.stdout.strip().split("\n"):
                if "default via" in line:
                    parts = line.split()
                    gateway_idx = parts.index("via") + 1
                    if gateway_idx < len(parts):
                        return parts[gateway_idx]
        
        # Method 2: Try hostname -I
        result = subprocess.run(
            ["hostname", "-I"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0 and result.stdout.strip():
            return result.stdout.strip().split()[0]
            
        return None
    except Exception as e:
        print(f"Error detecting WSL IP: {e}")
        return None


def update_env_file(wsl_ip):
    """Update .env file with WSL IP for Windows connections."""
    env_path = ".env"
    
    # Read existing .env or create from example
    if not os.path.exists(env_path):
        if os.path.exists(".env.example"):
            with open(".env.example", "r") as f:
                content = f.read()
        else:
            content = ""
    else:
        with open(env_path, "r") as f:
            content = f.read()
    
    # Update or add the Docker host override
    lines = content.split("\n")
    updated_lines = []
    found_override = False
    
    for line in lines:
        if line.startswith("DOCKER_HOST_OVERRIDE="):
            updated_lines.append(f"DOCKER_HOST_OVERRIDE={wsl_ip}")
            found_override = True
        else:
            updated_lines.append(line)
    
    if not found_override:
        updated_lines.append(f"DOCKER_HOST_OVERRIDE={wsl_ip}")
    
    with open(env_path, "w") as f:
        f.write("\n".join(updated_lines))
    
    print(f"Updated .env with DOCKER_HOST_OVERRIDE={wsl_ip}")


def main():
    print("=== WSL Docker Connection Setup ===\n")
    
    # Check if running in WSL
    wsl_distro = os.environ.get("WSL_DISTRO_NAME", "")
    is_wsl = "microsoft" in open("/proc/version").read().lower() if os.path.exists("/proc/version") else bool(wsl_distro)
    
    print(f"Running in WSL: {is_wsl}")
    
    if is_wsl:
        wsl_ip = get_wsl_ip()
        if wsl_ip:
            print(f"WSL IP Address: {wsl_ip}")
            print("\nThis script should be run from Windows to connect to WSL Docker.")
            print(f"To connect from Windows, set the WSL IP: {wsl_ip}")
            print("\nYou can also run this script from Windows with WSL:")
            print(f"  wsl -d {wsl_distro or 'Ubuntu'} -- python scripts/setup_wsl_connection.py --update-env")
        else:
            print("Could not detect WSL IP address")
    else:
        # Running on Windows - try to get WSL IP via wsl command
        print("Detecting WSL IP from Windows...")
        try:
            result = subprocess.run(
                ["wsl", "--", "hostname", "-I"],
                capture_output=True,
                text=True,
                timeout=10
            )
            if result.returncode == 0 and result.stdout.strip():
                wsl_ip = result.stdout.strip().split()[0]
                print(f"Detected WSL IP: {wsl_ip}")
                
                if "--update-env" in sys.argv:
                    update_env_file(wsl_ip)
                else:
                    print(f"\nTo connect to WSL Docker from Windows, add to .env:")
                    print(f"  DOCKER_HOST_OVERRIDE={wsl_ip}")
                    print("\nRun with --update-env to automatically update .env")
            else:
                print("Could not detect WSL IP. Make sure WSL is running.")
        except FileNotFoundError:
            print("WSL command not found. Make sure Windows Subsystem for Linux is installed.")
        except Exception as e:
            print(f"Error: {e}")


if __name__ == "__main__":
    main()
