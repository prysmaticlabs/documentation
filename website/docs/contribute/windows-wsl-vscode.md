---
id: windows-wsl-vscode
title: Contribute to Prysm's codebase using Windows, WSL and Visual Studio Code
sidebar_label: Easy Windows10+11 Prysm Development Environment
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

The below instructions will setup Windows 10 and 11 with WSL and Visual Studio code. This guide does not support previous windows versions. At the time of writing this article Windows 11 will not work with the standard instructions.

### Setting up Windows 10/11 environment with WSL and Visual Studio Code

Download and install [Visual Studio Code](https://code.visualstudio.com/download).

Setup WSL by opening PowerShell and running:
```text
wsl --install
```
Reboot the PC.

Open PowerShell and run:
```text
wsl --install -d Ubuntu
```
Follow the prompts to enter a new unix username and password.

At the linux/ubuntu command prompt run, you should be at the home directory, if not:
```text
$ cd
```

Clone Prysm repo
```text
$ git clone https://github.com/prysmaticlabs/prysm.git
```

Install Go
```text
$ sudo apt-get update
sudo apt install golang-go
```

Install and update bazel using apt repository
```text
$ sudo apt install apt-transport-https curl gnupg
curl -fsSL https://bazel.build/bazel-release.pub.gpg | gpg --dearmor >bazel-archive-keyring.gpg
sudo mv bazel-archive-keyring.gpg /usr/share/keyrings
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/bazel-archive-keyring.gpg] https://storage.googleapis.com/bazel-apt stable jdk1.8" | sudo tee /etc/apt/sources.list.d/bazel.list
sudo apt update && sudo apt install bazel
sudo apt update && sudo apt full-upgrade
sudo apt install bazel-5.3.0
```

Open the repo in Visual Studio Code
```text
$ cd prysm
code .
```

For future access to WSL use PowerShell  (it will default to root otherwise)
```text
wsl -u [username]
```

The windows, WSL, and Visual Studio Code environment is now complete. [Continue back to building and testing Prysm with Bazel](/docs/contribute/contribution-guidelines#building-and-testing-prysm-with-go)

import {RequestUpdateWidget} from '@site/src/components/RequestUpdateWidget.js';

<RequestUpdateWidget />