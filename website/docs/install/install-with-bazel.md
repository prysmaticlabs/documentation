---
id: install-with-bazel
title: Installing Prysm from source with Bazel
sidebar_label: Building from source
---

Prysm can be installed on GNU/Linux, MacOS, and Arm64 using our build tool, [Bazel](https://bazel.build). This page includes instructions for performing this method.

:::tip Pro-Tip
**NOTICE:** We recommend users install Bazelisk, the user-friendly launcher for Bazel. It identifies and manages the required Bazel version for any repository you want to build.
:::

**Have questions?** Stop by the [#documentation](https://discord.gg/QQZMCgU) channel on Discord and let us know.

## System requirements

### Minimum specifications

These specifications must be met in order to successfully run the Prysm client.

* Operating System: 64-bit GNU/Linux, MacOS
* Processor: Intel Core i5–760 or AMD FX-8100 or better
* Memory: 8GB RAM
* Storage: 20GB available space SSD
* Internet: Broadband connection

### Recommended specifications

These hardware specifications are recommended, but not required to run the Prysm client.

* Processor: Intel Core i7–4770 or AMD FX-8310 or better
* Memory: 16GB RAM
* Storage: 100GB available space SSD

## Dependencies

* A modern UNIX operating system
* [Bazelisk](https://docs.bazel.build/versions/main/install.html) this will automatically manage the version of ***Bazel*** required. 
* The `cmake` package installed
* The `git` package installed
* `libssl-dev` installed
* `libgmp-dev` installed
* `libtinfo5` installed
* `libprotoc` version 3.14 installed

## Why Bazel?

Instead of using the `Go` tool to build Prysm, our team relies on the [Bazel](https://bazel.build) build system used by major companies to manage monorepositories. Bazel provides reproducible builds and a sandboxed environment that ensures everyone building Prysm has the same experience and can build our entire project from a single command. For more detailed rationale on why Bazel, how it works in Prysm, and all important information about how exactly building from source works, read our rationale [here](/docs/reading/bazel).

## Install Bazel using Bazelisk

Bazelisk is a launcher for Bazel which automatically downloads and installs an appropriate version of Bazel. Use Bazelisk to automtically manage the version of Bazel required.  

You can install Bazelisk in multiple ways, including:

* npm install -g @bazel/bazelisk
* Using a binary release for Linux, macOS, or Windows [(Download binaries)](https://github.com/bazelbuild/bazelisk/releases)
* Using Homebrew on macOS
* By compiling from source using Go: go get github.com/bazelbuild/bazelisk

## Building Prysm from source

1. Open a terminal window. Ensure you are running ***Bazel*** through the ***Bazelisk*** launcher by issuing the command: 

```text
bazelisk version
``` 


2. Clone Prysm's [main repository](https://github.com/prysmaticlabs/prysm), make sure you switch to the latest version (the latest version number can be found from the [releases page](https://github.com/prysmaticlabs/prysm/releases)), and enter the directory:

```text
git clone https://github.com/prysmaticlabs/prysm
git checkout <version>
cd prysm
```

3. Build both the beacon chain node and the validator client:

```text
bazelisk build //beacon-chain:beacon-chain --config=release
bazelisk build //validator:validator --config=release
```

Bazelisk will automatically pull and install any dependencies as well, including Go and necessary compilers. Now that your installation is done, you can then read [joining eth2](/docs/mainnet/joining-eth2).

## Building Docker images

We use Bazel to build the Docker images for Prysm as well. This section outlines comprehensive instructions on how to build them by yourself, run them in Docker, and push to an image registry if desired. In particular, we use [`bazel rules docker`](https://github.com/bazelbuild/rules_docker) which provides us the ability to specify a base, barebones image, and essentially builds our binary and creates a Docker container as a simple wrapper over our binaries.

We do not write our own Dockerfiles, as Bazel provides us a more sandboxed, simple experience with all of its benefits. To see an example use of `bazel rules docker` for how we build a particular package, see [here](https://github.com/prysmaticlabs/prysm/blob/aa389c82a157008741450ba1e04d898924734432/tools/bootnode/BUILD.bazel#L36). 

### Dependencies needed

* All specified dependencies for building with Bazel [here](/docs/install/install-with-bazel#dependencies)
* Python installed and available in your computer

### Build process

#### Regular Docker images

At the moment, Prysm docker images can only be built on **Linux** operating systems. The standard images are very thin wrappers around the Prysm beacon-chain and validator binaries, and do not contain any other typical components of Docker images such as a bash shell. These are the Docker images we ship to all users, and you can build them yourself as follows:

```bash
bazelisk build //beacon-chain:image_bundle --config=release
bazelisk build //validator:image_bundle --config=release
```

The tags for the images are specified [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/beacon-chain/BUILD.bazel#L58) for the beacon-chain and [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/validator/BUILD.bazel#L59) for the validator. The default image tags for these images are:

```text
gcr.io/prysmaticlabs/prysm/beacon-chain:latest
gcr.io/prysmaticlabs/prysm/validator:latest
```

You can edit these in the links above to your liking.

#### Alpine images

Prysm also provides Alpine images built using:

```bash
bazelisk build //beacon-chain:image_bundle_alpine --config=release
bazelisk build //validator:image_bundle_alpine --config=release
```

#### Debug images

Prysm also provides debug images built using:

```bash
bazelisk build //beacon-chain:image_bundle_debug --config=release
bazelisk build //validator:image_bundle_debug --config=release
```

### Running images

You can load the images into your local Docker daemon by first building a `.tar` file as follows for your desired image bundle:

```text
bazelisk build cmd/beacon-chain:image_bundle.tar
bazelisk build cmd/validator:image_bundle.tar
```

Then, you can load it into Docker with:
```text
docker load -i bazel-bin/my/image/helloworld.tar
```

For example, you may see output such as this:

```
docker load -i bazel-bin/cmd/beacon-chain/image_bundle.tar
fd6fa224ea91: Loading layer [==================================================>]  3.031MB/3.031MB
87c9f1582ca0: Loading layer [==================================================>]  15.44MB/15.44MB
231bdbae9aea: Loading layer [==================================================>]  1.966MB/1.966MB
a6dc470c72b7: Loading layer [==================================================>]  10.24kB/10.24kB
a0de9c673ef6: Loading layer [==================================================>]  56.37MB/56.37MB
84ff92691f90: Loading layer [==================================================>]  10.24kB/10.24kB
Loaded image: gcr.io/prysmaticlabs/prysm/beacon-chain:latest
Loaded image: prysmaticlabs/prysm-beacon-chain:latest
```

### Pushing to a container registry

#### Authentication

You can use these rules to access private images using standard Docker
authentication methods.  e.g. to utilize the [Google Container Registry](
https://gcr.io). See
[here](https://cloud.google.com/container-registry/docs/advanced-authentication) for authentication methods.

See:
* [Amazon ECR Docker Credential Helper](
  https://github.com/awslabs/amazon-ecr-credential-helper)
* [Azure Docker Credential Helper](
  https://github.com/Azure/acr-docker-credential-helper)

#### Push

To push the actual images, you do not need to build the image bundle beforehand. You can do a simple:

```text
bazelisk run //beacon-chain:push_images --config=release
bazelisk run //validator:push_images --config=release
```

Which will deploy all images with the tags specified in [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/beacon-chain/BUILD.bazel#L58) for the beacon-chain and [here](https://github.com/prysmaticlabs/prysm/blob/ff329df808ad68fbe79d11c73121fa6a7a0c0f29/cmd/validator/BUILD.bazel#L59) for the validator. 

By default, this will deploy to Prysmatic Labs' Google Container Registry namespace: `gcr.io/prysmaticlabs/prysm`, which you will not have authentication access to, so make sure you edit the image tags to your appropriate registry and authenticate as needed.
