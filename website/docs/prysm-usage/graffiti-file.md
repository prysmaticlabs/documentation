---
id: graffiti-file
title: Using graffiti-file flag
sidebar_label: Using graffiti-file flag
---

`--graffiti-file` flag for the validator client enables the wonderful feature where validators 
could use different graffiti for different validators running in the same running process.

Reasons may include:

* Privacy (same graffiti may link validators)
* Fun (graffiti wall, etc)

## Usages

The validator flag: `--graffiti-file=/path/to/graffitis.yaml`

It supports yaml and the following scalar and collections. We will go through each of them in detail below.
 * Specific
 * Random
 * Default

### Specific usage
Specific chooses the graffiti based on the validator ID. When validator ID is not specified, a graffiti will be chosen from the `random` list. This takes precedent over random and default. 

**Example**:
```yaml=
specific:
  163: "validator 163 was here"
  914: "validator 914 was here"
  546: "validator 536 was here"
  237: "validator 237 was here"
random:
  - "Mr A was here"
  - "Mr B was here"
  - "Mr C was here"
default: "Mr F was here"
```
Example output:
![image](/img/graffiti-specific.png)

### Random
Random chooses a random graffiti from the list. If `random` is not specified, the `default` graffiti will be used.
This takes precedent over default.

**Example**:
```yaml=
#specific:
#  163: "validator 163 was here"
#  914: "validator 914 was here"
#  546: "validator 536 was here"
#  237: "validator 237 was here"
random:
  - "Mr A was here"
  - "Mr B was here"
  - "Mr C was here"
default: "Mr F was here"
```
Example output:
![image](/img/graffiti-random.png)


### Default
Default specifies the graffiti to be used by all the keys under validator client.

**Example**:
```yaml=
#specific:
#  163: "validator 163 was here"
#  914: "validator 914 was here"
#  546: "validator 536 was here"
#  237: "validator 237 was here"
#random:
#  - "Mr A was here"
#  - "Mr B was here"
#  - "Mr C was here"
default: "Mr F was here"
```
Example output:
![image](/img/graffiti-default.png)
