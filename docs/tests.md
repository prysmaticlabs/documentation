---
id: tests
title: Performing Tests
sidebar_label: Performing tests
---
[]
## Testing Prysm

To run the unit tests of our system, issue the command:

```text
bazel test //...
```

To run our linter, make sure you have [golangci-lint](https://github.com/golangci/golangci-lint) installed and then issue the command:

```text
golangci-lint run
```
