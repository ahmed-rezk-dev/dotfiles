# Television Channel Map

A categorized map of all available channels from [Television](https://alexpasmantier.github.io/television/community/channels-unix) for the `tv` command.

## 📺 How to Use

Run `tv <channel-name>` to launch that channel. Example: `tv docker-containers`

---

## 🚀 DevOps & Infrastructure

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `aws-buckets` | List & preview AWS S3 Buckets | `aws` |
| `aws-instances` | List & preview AWS EC2 Instances | `aws` |
| `aws-profiles` | List & switch AWS CLI profiles | `aws`, `grep` |
| `docker-compose` | Manage Docker Compose services | `docker` |
| `docker-containers` | List & manage Docker containers | `docker`, `jq` |
| `docker-images` | Select from Docker images | `docker`, `jq` |
| `docker-networks` | List & manage Docker networks | `docker`, `jq` |
| `docker-volumes` | List & manage Docker volumes | `docker`, `jq` |
| `k8s-contexts` | List & switch kubectl contexts | `kubectl` |
| `k8s-deployments` | List & preview K8s Deployments | `kubectl` |
| `k8s-pods` | List & preview K8s Pods | `kubectl` |
| `k8s-services` | List & preview K8s Services | `kubectl` |
| `distrobox-list` | Select a distrobox container | `distrobox`, `bat` |

---

## 📦 Package Managers

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `brew-packages` | List & manage Homebrew packages | `brew` |
| `cargo-commands` | List cargo commands & extensions | `cargo` |
| `cargo-crates` | List installed cargo crates | `cargo` |
| `apt-packages` | List & manage apt packages | `dpkg`, `apt` |
| `pacman-packages` | List & manage pacman packages | `pacman` |
| `flatpak` | List & manage Flatpak apps | `flatpak` |
| `npm-packages` | List globally installed npm packages | `npm` |
| `npm-scripts` | List & run npm scripts | `jq` |
| `node-packages` | Browse node_modules | `node` |
| `pip-packages` | List installed Python packages | `pip` |
| `guix` | Search & select Guix packages | `guix` |

---

## 🐙 Git & Version Control

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `git-branch` | Select from git branches | `git` |
| `git-diff` | Select files from git diff | `git` |
| `git-files` | List tracked files in repo | `git`, `bat` |
| `git-log` | Select from git log entries | `git` |
| `git-reflog` | Select from git reflog | `git` |
| `git-remotes` | List & manage git remotes | `git` |
| `git-repos` | Select from local git repos | `fd`, `git` |
| `git-stash` | Browse & manage git stash | `git` |
| `git-submodules` | List & manage git submodules | `git` |
| `git-tags` | Browse & checkout git tags | `git` |
| `git-worktrees` | List & switch git worktrees | `git` |
| `gh-issues` | List GitHub issues (current repo) | `gh`, `jq` |
| `gh-prs` | List GitHub PRs (current repo) | `gh`, `jq` |

---

## 💻 System & Files

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `files` | Select files & directories | `fd`, `bat` |
| `dirs` | Select from directories | `fd` |
| `downloads` | Browse Downloads folder | `fd`, `bat` |
| `dotfiles` | Select from user dotfiles | `fd`, `bat` |
| `path` | Investigate PATH contents | `fd`, `bat` |
| `mounts` | List mounted filesystems | `df`, `awk` |
| `env` | Select from env variables | None |
| `fonts` | List installed system fonts | `fc-list` |
| `images` | Browse image files | `fd`, `chafa` |
| `pdf-files` | Browse PDF files | `fd`, `pdftotext` |
| `journal` | Browse systemd journal | `journalctl` |
| `man-pages` | Browse manual pages | `apropos`, `man` |

---

## 🖥️ Shell & History

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `alias` | Select from shell aliases | None |
| `bash-history` | Select from bash history | `bash` |
| `fish-history` | Select from fish history | `fish` |
| `nu-history` | Select from nu history | None |
| `crontab` | List & manage crontab | None |

---

## 🔧 Build Tools & Tasks

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `make-targets` | List & run Makefile targets | `make`, `awk` |
| `gradle-tasks` | List & run Gradle tasks | `gradle` |
| `just-recipes` | Select from Justfiles | `just` |

---

## 🌐 Network & APIs

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `curl` | Make HTTP requests | `curl` |
| `http` | HTTPie interactive | `httpie` |

---

## 🧩 Other Utilities

| Channel | Description | Requirements |
|---------|-------------|--------------|
| `channels` | Select a TV channel (meta) | `tv`, `bat` |
| `path` | Explore PATH directories | `fd`, `bat` |

---

## ⚡ Quick Reference

```bash
# DevOps
tv docker-containers
tv k8s-pods
tv aws-profiles

# Git
tv git-branch
tv gh-prs

# Packages
tv brew-packages
tv npm-scripts
tv pip-packages

# Files
tv files
tv downloads
tv dotfiles

# Shell
tv bash-history
tv alias
```