import subprocess

subprocess.run(["git", "status"])
subprocess.run(["git", "add", "."])
subprocess.run(["git", "commit", "-m", "mrs:version 1"])