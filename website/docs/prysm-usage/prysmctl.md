---
id: prysmctl
title: Use prysmctl
sidebar_label: Use prysmctl
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget commaDelimitedContributors="James" lastVerifiedDateString="February 3rd, 2023" lastVerifiedVersionString="v3.2.0"/>

prysmctl is a command line utility tool for common and one-off Ethereum pos tasks. Examples include assisting users with validator exits or withdrawals. Most commands will require access to a fully synced beacon node.

**Install prysmctl (Binary/ Source/ Bazel / Docker )**

**Binaries**

Binaries for the latest prysmctl tool can be found on the [latest prysm release page](https://github.com/prysmaticlabs/prysm/releases). Each binary is unique to its version and features, new releases may release new features for prysmctl that will need to be downloaded separately.

**Source**

Dependencies:

- [Bazelisk](https://bazel.build/install/bazelisk) this will automatically manage the version of **Bazel** required.
- [golang](https://go.dev/) installed
- The `cmake` package installed
- The `git` package installed
- `libssl-dev` installed
- `libgmp-dev` installed
- `libtinfo5` installed
- `libprotoc` version 3.14 installed

**Install Bazel through Bazelisk**

Bazelisk is a launcher for Bazel which automatically downloads and installs an appropriate version of Bazel. Use Bazelisk to automatically manage the version of Bazel required.

You can install Bazelisk in multiple ways, including:

- Using [a binary release](https://github.com/bazelbuild/bazelisk/releases) for Linux, macOS, or Windows
- Using npm: `npm install -g @bazel/bazelisk`
- Using Homebrew on macOS: `brew install bazelisk`
- By compiling from source using Go: `go install github.com/bazelbuild/bazelisk@latest`

**Clone the Prysm project locally**

Clone Prysm's [main repository](https://github.com/prysmaticlabs/prysm). Make sure you switch to the latest version (the latest version number can be found from the [releases page](https://github.com/prysmaticlabs/prysm/releases)). Once cloned, enter the directory:

`git clone https://github.com/prysmaticlabs/prysm && cd prysm`

**Build Prysm ctl**

`bazel build //cmd/prysmctl --config=release`

Bazel will automatically pull and install any dependencies as well, including Go and necessary compilers.

## List Commands

```
./prysmctl --help
```

the `—help` flag will provide a list of commands, subcommands, and flags to use.

commands can also be found on [prysm docs](https://docs.prylabs.network/docs/prysm-usage/parameters)

# Frequently asked questions

**Q: One of the prysm guides asks to use a prysmctl command that is not available to me, what do I do?**

A: You may be using an older version of prysmctl and are required to download a newer version. 

**Q: Is this tool accessible from prysm.sh, prysm.s1, or prysm.bat?**

A: This utility tool will only be accessible by building from source or downloading binaries for the specific version as we try to migrate away from using script files for upgrades. Prysm validator client and Prysm beacon nodes will still be accessible through the scripts until we find an appropriate migration path.

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />