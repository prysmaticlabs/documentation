---
id: bazel
title: About Bazel
sidebar_label: About Bazel
---

import {HeaderBadgesWidget} from '@site/src/components/HeaderBadgesWidget.js';

<HeaderBadgesWidget />

This page explains why Prysm uses a special build system called [Bazel](https://bazel.build) to compile everything in our monorepository.

## Why Bazel?

Instead of using the `go` tool to build Prysm, our team relies on the [Bazel](https://bazel.build) build system used by major companies such as Google, Uber, Coinbase, and more to manage monorepositories. Bazel provides reproducible builds and a sandboxed environment that ensures everyone building Prysm has the same experience and can build our entire project from a single command. The rationale for why we chose this system comes down to three major problems we need solved as part of our software development process:

- Bugs introduced as a result of the developer's environment being different than that being shipped to users
- Messy dependency management when dealing with a monorepo with multiple programming languages
- Messy deployment and production release configurations via esoteric make files

Because Prysm is a _monorepo_, it can have many different subprojects with multiple programming languages contained within. For example, while we primarily develop in Go, we could add an Angular application, or Python tools, or more. It is important that dependency management, compilation, and builds are **reproducible and simple** for all developers in the team. Because Ethereum is consensus _critical_ software, we must ensure all developers writing code and checking in new features into our project are using the exact same development environment, so if someone runs into a bug or a failing test, everyone else developing the project will see the bug, and the bug will also be present in the end-result binary. Bazel ensures **hermeticity**, which means that builds are essentially extremely sandboxed, pinned with proper dependencies, Go versions, and will be guaranteed to behave the same despite your machine. This is the **major** reason why we use Bazel instead of the native Go tool.

Additionally, Bazel provides the following amazing features out of the box:

- Advanced local and remote caching, making it trivial to run CI and tests in a massive codebase
- Some of the most advanced dependency analysis, graph queries, and more, for the entire repository
- An extensible programming language to improve builds and write custom tooling that improves the experience for all

To better understand some of the deeper rationale of how Bazel has helped large organizations, read Coinbase's retrospective on how Bazel helped their development significantly [here](https://blog.coinbase.com/bootstrapping-the-coinbase-monorepo-575cf981c859).

### Cons of Bazel

Among a few cons of Bazel are:

- Learning curve to understand how its underlying language, Starlark, is used in BUILD files
- Large, initial download of Bazel
- Not enough, comprehensive IDE support for Bazel (although Jetbrains IDEs have good support)

Thankfully, Prysm also builds with `go` and `go` modules as well, so your code editor can use its regular Go support when developing for Prysm.

## BUILD Files

Building with Bazel requires every directory and every package to have a `BUILD.bazel` file which tells it how it should build the code in question.

### Do I have to edit BUILD files myself?

Most of the time, developers will not need to edit BUILD files themselves. Instead, they can use the following tool:

    bazel run //:gazelle -- fix

which will edit all BUILD files that need to be changed based on any dependencies that were imported or any files that were added.

## Dependency Management

A large problem in monorepos is, of course, dealing with dependency management. Versioning and building tooling to ensure code is up to date is complicated, especially when you have a monorepo with many subprojects. Bazel handles _all_ dependency management in the monorepo, ensuring there is only a single version of a dependency in the entire project. Bazel provides an incredibly sophisticated dependency query tool called [bazel query](https://docs.bazel.build/versions/master/query-how-to.html) which allows you to perform action such as the following:

- Trace the entire dependency chain between two packages
- Look at the dependencies used in test files only
- Why does X dependency require Y dependency?
- What dependency paths do I need to break to make X no longer depend on Y?

Bazel's query tool allows you to create graph visualizations of your entire dependency tree, making it a lot more robust and standardized compared to other methods of managing dependencies in a project.

All dependencies in the Prysm monorepo live in a file called `deps.bzl` at the top-level of the repository [here](https://github.com/prysmaticlabs/prysm/blob/develop/deps.bzl).

### How to add new dependencies

Adding new dependencies to Prysm requires specific changes. We have prepared a comprehensive [DEPENDENCIES.md](https://github.com/prysmaticlabs/prysm/blob/master/DEPENDENCIES.md) explaining the required process.

## Bazel and Docker

A common question we get is: "where are Prysm's Dockerfiles?". With Bazel, we get a ton of benefits in terms of optimizing our deployment and release process. In particular, we use [`bazel rules docker`](https://github.com/bazelbuild/rules_docker) which provides us the ability to specify a base, barebones image, and essentially builds our binary and creates a Docker container as a simple wrapper over our binaries. 

We do not write our own Dockerfiles, as Bazel provides us a more sandboxed, simple experience with all of its benefits. To see an example use of `bazel rules docker` for how we build a particular package, see [here](https://github.com/prysmaticlabs/prysm/blob/aa389c82a157008741450ba1e04d898924734432/tools/bootnode/BUILD.bazel#L36). 

To read comprehensive instructions on how to build Prysm's docker images for your own use, see [here](/docs/install/install-with-bazel).

## Building Production Releases

### With Bazel

Everything in Prysm can be built with Bazel using

    bazel build //...

For example, the beacon node can be built with

    bazel build /cmd/beacon-chain --config=release 
    
The `--config=release` will apply all compile-time optimizations to the code, and build everything including C dependencies and our cryptography from source. Every package in the Prysm monorepo can be build with

    bazel build

### With Go

Building Prysm with Go is possible, but it will use precompiled cryptography to build the final executable. Additionally, it will not perform the compile-time optimizations Bazel does, and can have unexpected issues as you are relinquishing reproducible, hermetic builds which Bazel provides. We always recommend Bazel as the only way to run Prysm if you are planning on running it.


