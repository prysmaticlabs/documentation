---
id: tests
title: Running Tests
sidebar_label: Running Tests
---
## Testing the Prysm Codebase

Prysm uses the [Bazel](https://build.bazel) build system created by Google to do all Prysm development. We do not use the Go tool, Go modules, or any other Go dependency management system, so you will need to use Bazel. You can install Bazel [here](https://docs.bazel.build/versions/master/install.html) and it is all you need to fully run our test suite locally. To run all beacon chain tests, run:

```text
bazel test //beacon-chain/...
```

To test the validator client, run:
```text
bazel test //validator/...
```

To run our end-to-end tests for eth2, run:
```text
bazel test //endtoend:go_default_test --define ssz=minimal --test_timeout=1000
```

If you want to run a specific test target in development, you can run:
```text
bazel test //beacon-chain/blockchain:go_default_test
```

You can read more in-depth about bazel queries and commands [here](https://docs.bazel.build/versions/master/command-line-reference.html#test).