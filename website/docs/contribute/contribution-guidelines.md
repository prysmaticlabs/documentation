---
id: contribution-guidelines
title: Contribution guide
sidebar_label: Contribution guide
---

New to the Prysm project and eth2? We first recommend checking out this awesome reading list here: [https://eth2.info](https://eth2.info). There's a number of ways to help out the project for people of all skillsets and experience levels. If you are unsure where you may be best suited, stop by either our [**Discord**](https://discord.gg/KSA7rPr) or [**Gitter**](https://gitter.im/prysmaticlabs/geth-sharding?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge) and a member of the team or community will be happy to answer questions and offer some direction.

## Getting Started

Once you are a bit more familiar with the concepts behind eth2 and are ready to write some code, head over and explore Prysm's [open issues on Github](https://github.com/prysmaticlabs/prysm/issues). We recommend looking for issues tagged with the "Good First Issue" label if it is your first contribution. If you are still unsure about how to tackle a bug or a feature, our team is always available on [Discord](https://discord.gg/KSA7rPr). Sign in to your Github account, then navigate to [the official Prysm repository](https://github.com/prysmaticlabs/prysm/). In the upper right hand corner of the page, click the 'Fork' button. This will create a copy of the Prysm repository on your account that can be edited for pull requests.

### Setting up your environment

To develop Prysm, you'll need the following:

- A modern windows, osx, or linux operating system
- Go 1.14.x version installed, download and install [here](https://golang.org/dl/)
- The `git` package installed
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/download) or Jetbrains' [Goland IDE](https://www.jetbrains.com/go/) or your preferred one

First, create a local clone of Prysm.

```text
$ git clone https://github.com/prysmaticlabs/prysm.git && cd prysm
```

Then link your local repository to your newly created fork.

```text
$ git remote add myprysmrepo https://github.com/<your_github_user_name>/prysm.git
```

Finally, ensure Go is installed and working on your machine:

```text
$ go version
```

Example output:
```text
go version go1.14.4 darwin/amd64
```

### Building and testing Prysm with Go

The Prysm project is a large monorepo containing all sorts of tools and services that implement the eth2 protocol. We use the Go for everything we do in development, helping everyone have reproducible builds. If you want to build the whole project, you can run the following command:

```text
$ go build -v ./...
```

This will build the project by downloading dependencies as Go modules.

#### Running Go tests

All code we check into our repo needs to have sufficient tests to ensure it is maintainable and works as expected. You can use Go run tests in Prysm. 

```text
$ go test -v ./...
```

If there is a particular subfolder you want to test, such as `beacon-chain/rpc/node`, you can run the command:

```text
$ go test ./beacon-chain/rpc/node/...
```

#### Adding dependencies

If you want to add a new dependency to Prysm, please adhere to the guidelines found in our [DEPENDENCIES.md](https://github.com/prysmaticlabs/prysm/blob/master/DEPENDENCIES.md) document.

### Building and testing Prysm with Bazel

The Prysm project is a large monorepo containing all sorts of tools and services that implement the eth2 protocol. We use the [Bazel](https://bazel.build) build system created by Google for everything we do, helping everyone have reproducible builds. If you want to build the beacon chain or validator using Bazel, you can run the commands:

```text
$ bazel build //beacon-chain:beacon-chain
$ bazel build //validator:validator
```

Other binaries in our codebase use a similar command to build. If you want to run a particular built binary, you can use the command:

```
$ bazel run //beacon-chain:beacon-chain -- --help
```

Where you can specify any amount of command line arguments you need based on the available flags of the item you're running.

In order to write code for the Prysm codebase comfortably with Bazel, we recommend using either [Visual Studio Code](https://code.visualstudio.com/download) with its [Bazel plugin](https://marketplace.visualstudio.com/items?itemName=BazelBuild.vscode-bazel), or any [Jetbrains IDE](https://www.jetbrains.com/) with the [Bazel plugin](https://plugins.jetbrains.com/plugin/8609-bazel) ([Goland](https://www.jetbrains.com/go/) is a great choice, used by most of the Prysmatic Labs team). 

You can also find various other types of IDE support for Bazel in the official Bazel documentation [here](https://docs.bazel.build/versions/master/ide.html). Once you have your coding environment set-up, you'll be well-equipped to contribute to eth2!

#### Running Bazel tests

All code we check into our repo needs to have sufficient tests to ensure it is maintainable and works as expected. We use bazel to run all of our test suites in Prysm. If there is a particular subfolder you want to test, such as `beacon-chain/rpc/node`, you can run the command:

```text
$ bazel test //beacon-chain/rpc/node:go_default_test
```

For running a specific test, for example, a test called `TestNode_GetPeers` inside of `beacon-chain/node/node_test.go`, you can use Bazel to filter it out:

```text
$ bazel test //beacon-chain/rpc/node:go_default_test --test_output=streamed --test_filter=TestNode_GetPeers
```

For the list of all available flags to the `bazel test` command, you can see the reference documentation [here](https://docs.bazel.build/versions/master/command-line-reference.html#test).

You can also run our full, end-to-end test suite with:

```text
$ bazel test //endtoend:go_default_test --define=ssz=minimal
```

### Contributing to the Eth2 API

The eth2 API implemented by Prysm is maintained as a separate repository than Prysm. You can read more about how to contribute specifically to the API [here](/docs/how-prysm-works/ethereum-2-public-api#contributing).

### Making your first contribution

Each time you begin a set of changes, ensure that you are working on a new branch that you have created as opposed to the `master` of your local repository. By keeping your changes segregated in this branch, merging your changes into the main repository later will be much simpler for the team.

To create a local branch for `git` to checkout, issue the command:

```text
$ git checkout -b feature-in-progress-branch
```

To checkout a branch you have already created:

```text
$ git checkout feature-in-progress-branch
```

**Preparing your commit**

To fetch changes to the Prysm repository since your last session:

```text
$ git fetch origin
```

Then synchronize your master branch:

```text
$ git pull origin master
```

To stage the changed files that are be committed, issue the command:

```text
$ git add --all
```

Once you are ready to make a commit, you can do so with:

```text
$ git commit  -m “Message to explain what the commit covers”
```

The `–amend` flag can be used as well to include previous commits that have not yet been pushed to an upstream repository.

If there are conflicts between your edits and those made by others since you started work Git will ask you to resolve them. To find out which files have conflicts, run:

```text
$ git status
```

Open those files, and you will see lines inserted by Git that identify the conflicts:

```text
<<<<<< HEAD
Other developers’ version of the conflicting code
======
Your version of the conflicting code
'>>>>> Your Commit
```

The code from the Prysm repository is inserted between `<<<` and `===` while the change you have made is inserted between `===` and `>>>>`. Remove everything between `<<<<` and `>>>` and replace it with code that resolves the conflict. Repeat the process for all files listed by Git status to have conflicts.

When you are ready, use git push to move your local copy of the changes to your fork of the repository on Github.

```text
$ git push myrepo feature-in-progress-branch
```

#### Opening a pull request

Navigate to your fork of the repository on Github. In the upper left where the current branch is listed, change the branch to your newly created one. Open the files that you have worked on and ensure they include your changes.

Navigate to [https://github.com/prysmaticlabs/prysm](https://github.com/prysmaticlabs/prysm) and click on the new pull request button. In the “base” box on the left, leave the default selection “base master”, the branch that you want your changes to be applied to. In the “compare” box on the right, select the branch containing the changes you want to apply. You will then be asked to answer a few questions about your pull request. Pull requests should have enough context about what you are working on, how you are solving a problem, and reference all necessary information for your reviewers to help.

After you complete the questionnaire, the pull request will appear in the list of pull requests at [https://github.com/prysmaticlabs/prysm/pulls](https://github.com/prysmaticlabs/prysm/pulls).

#### Following up

Core developers may ask questions and request that you make edits. If you set notifications at the top of the page to “not watching,” you will still be notified by email whenever someone comments on the page of a pull request you have created. If you are asked to modify your pull request, edit your local branch, push up your fixes, then leave a comment to notify the original reviewer that the pull request is ready for further review.