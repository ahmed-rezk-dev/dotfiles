---
name: test-zsh-completion-interactively
description: "Use when debugging zsh TAB completion, fzf-tab, or any interactive ZLE/prompt behaviour that static config reading cannot settle. Drives a real shell via tmux instead of zpty/expect."
---

# Debugging zsh TAB completion / ZLE / interactive prompt behaviour

Trigger: "TAB does nothing", "completion stopped working", fzf-tab popup problems,
or any zsh behaviour that only appears in a real interactive shell.

Static reading of `.zshrc` settles *which widget is bound*, but NOT whether
completion actually produces matches. Always reproduce before theorising.

## Do NOT use zpty or expect for this

Both were tried and repeatedly failed on this machine:

- `zmodload zsh/zpty` silently drops output. Even a bare `echo` never came back.
- `expect` starts the shell too slowly: keystrokes sent during p10k/antigen
  startup are discarded, so the probe never fires. Polling a readiness marker
  file does not fix it. Every run died with "shell never became ready".
- Parsing `capture-pane` / terminal escape output for completion results is
  unreliable — the redraw sequences do not survive the pipe cleanly.

Do not spend turns on these. Go straight to tmux.

## Working method: native tmux control

```bash
tmux kill-window -t probe 2>/dev/null          # clean slate
tmux new-window -d -n probe -c /path/to/repo 'zsh -i'
sleep 12                                          # let p10k + antigen finish

tmux send-keys -t probe 'git commit -a -'        # type the command
sleep 4
tmux send-keys -t probe Tab                      # real Tab keystroke
sleep 6

tmux capture-pane -p -t probe | grep -v '^$' | tail -20
```

Working options seen so far:
- `send-keys -t <win> Enter` — include `Enter` in a separate send; sending
  command + `Enter` together is fine, but `Tab` must be its own send.
- Clear leftover input with `C-c` then `C-u` before typing the next command.
- `C-c` aborts a fzf popup.

## Confirming fzf actually launched

The `▌ --option   -- description` lines in `capture-pane` ARE the fzf popup
rendering inline. To confirm the process exists:

```bash
ps -Ao args= | grep -c '[f]zf --ansi'
```

If `FZF_DEFAULT_OPTS` contains `--tmux`, fzf opens a tmux *window* instead:

```bash
tmux list-windows -a -F '#{window_name}' | grep fzf
```

## Testing the non-tmux case

This sandbox runs INSIDE tmux. `env -u TMUX zsh -i` still runs in a tmux pane,
so it is NOT a true non-tmux test — state this limit rather than claiming it
verified the non-tmux path.

## Verify before proposing a fix

Reproduce the failure FIRST. Then A/B the candidate change by stashing it:

```bash
cd ~/dotfiles && git stash push .zshrc
tmux kill-window -t probe; tmux new-window -d -n probe -c <dir> 'zsh -i'
# ... retest ...
git stash pop
```

If behaviour is identical before and after, the hypothesis is wrong. Revert and
discard it — do not leave a speculative change in a dotfiles repo.

## Useful diagnostics

```bash
bindkey "^I"                              # which widget owns TAB
zsh -i -c 'print ${+functions[compdef]}'  # completion system initialised?
zsh -i -c 'print ${_comps[git]}'          # is a command's completion registered?
zsh -i -c 'print ${functions_source[fzf-completion]}'   # /dev/fd/N => eval'd
```

Known-bogus: `git ls-files src/_git` in zsh-completions returns nothing —
upstream does not ship `_git`. Git completion comes from macOS
`/usr/share/zsh/5.9/functions/_git`, so a missing `_git` there is expected,
not a bug.

`ls -la ~/.zcompdump` and note the missing `.zwc`: without it `compinit`
rebuilds on every shell start.
