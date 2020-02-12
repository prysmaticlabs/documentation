---
id: contribution-guidelines
title: Contribution Guide
sidebar_label: Contribution Guide
---

New to the Prysm project, the Ethereum protocol or the concepts behind blockchain entirely? The [external reading](required-reading.md) page includes a large selection of comprehensive information for both part-time and core contributors alike.

#### Ready to begin?

If you have read the below guidelines and are prepared to get to work, head over and explore Prysm's [open issues on Github](https://github.com/prysmaticlabs/prysm/issues). Once you have found something that you are interested in working on, feel free to assign yourself to the issue, fork the repository and begin submitting pull requests.

**Need assistance?** We are always chatting with the community on [Discord](https://discord.gg/che9auJ) and [Gitter](https://gitter.im/prysmaticlabs/geth-sharding). You can stop by any time if you would like to learn more or get involved!

## Contributor responsibilities

Prysmatic Labs recognises two different types of contributors to repositories: part-time and core. They are categorised as outlined below.

### Part-Time Contributors

Anyone can become a part-time contributor and begin to assist with the current implementation of sharding. The responsibilities of a part-time contributor include:

* Engaging in Gitter conversations with other contributors
* Searching out and opening issue tickets on Github for Prysm code
* Creating PRs for open issue tickets in the repository, which should include:
  * Detailed context of what would be required for merge
  * An implementation-consistent testing process
* Ensuring proper labeling and milestones on projects
* Following up on open pull requests

Note that, while not expected to be experts on sharding, part-time contributors _are_ expected to be at least familiarised with the information found within the [External Reading](required-reading.md) page.

### Core Contributors

Core contributors are remote contractors of Prysmatic Labs and are considered  critical team members of our organization. Core developers have all of the responsibilities of part-time contributors, as well as the following:

* Staying up-to-date on the latest changes to the beacon chain specification
* Monitor Github issues and pull requests to ensure accuracy and consistency
* Formulate independent ideas, suggest new work to do, point out improvements
* Participate in code review, quality control and ensuring high code coverage
* Help with our social media presence, write bi-weekly development updates
* Represent Prysmatic Labs at events to help spread the word

The team loves to work with people that are autonomous, have new and excting ideas and enthusiasm about the work they are doing. The project takes a merit-based approach to becoming a core contributor, and any part-time contributor that puts the time, work and commitment in can become a core member of the team.

## Initialising a contribution repository

Before starting this guide, set up Prysm following the instructions in [README.md](https://github.com/prysmaticlabs/prysm). Sign in to your Github account, then navigate to [the official Prysm repository](https://github.com/prysmaticlabs/prysm/). In the upper right hand corner of the page, click the 'Fork' button. This will create a copy of the Prysm repository on your account that can be edited for pull requests.

### Setting up your environment

First, create a local clone of Prsym.

```text
$ mkdir -p $GOPATH/src/github.com/prysmaticlabs
$ cd $GOPATH/src/github.com/prysmaticlabs
$ git clone https://github.com/prysmaticlabs/prysm.git
$ cd $GOPATH/src/github.com/prysmaticlabs/prysm
```

Then link your local repository to your newly created fork.

```text
$ git remote add myprysmrepo https://github.com/<your_github_user_name>/prysm.git
```

Lastly, link your local clone to the Prysm repository to easily fetch future changes.

```text
$ git remote add prysm https://github.com/prysmaticlabs/prysm.git
$ git remote -v (you should see myrepo and prysm in the list of remotes)
```

Congratulations, you are now ready to begin contributing!

### **Making your first contribution**

Check out Prysm's [open issues on Github](https://github.com/prysmaticlabs/prysm/issues) and select one that you would like to work on, and then leave a comment to let the development team know. Alternatively, you can examine the code for areas that can be improved on and reach out to the development team to ask if they would like you to focus on it.

Each time you begin a set of changes, ensure that you are working on a new branch that you have created as opposed to the `master` of your local repository. By keeping your changes segregated in this branch, merging your changes into the main repository later will be much simpler for the team.

To create a local branch for git to checkout, issue the command:

```text
$ git checkout -b feature-in-progress-branch
```

To checkout a branch you have already created:

```text
$ git checkout feature-in-progress-branch
```

#### **Testing changes**

Changes that only affect a single file can be tested with:

```text
$ go test <file_you_are_working_on>
```

Changes that affect multiple files can be tested with:

```text
$ golangci-lint run && bazel test //...
```

**Preparing your commit**

To fetch changes to the Prysm repository since your last session:

```text
$ git fetch prysm
```

Then syncronise your master branch:

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

#### **Making a pull request**

Navigate to your fork of the repository on Github. In the upper left where the current branch is listed, change the branch to your newly created one. Open the files that you have worked on and ensure they include your changes.

Navigate to [https://github.com/prysmaticlabs/prysm](https://github.com/prysmaticlabs/prysm) and click on the new pull request button. In the “base” box on the left, leave the default selection “base master”, the branch that you want your changes to be applied to. In the “compare” box on the right, select the branch containing the changes you want to apply. You will then be asked to answer a few questions about your pull request.

After you complete the questionnaire, the pull request will appear in the list of pull requests at [https://github.com/prysmaticlabs/prysm/pulls](https://github.com/prysmaticlabs/prysm/pulls).

#### Following up

Core Contributors may ask questions and request that you make edits. If you set notifications at the top of the page to “not watching,” you will still be notified by email whenever someone comments on the page of a pull request you have created. If you are asked to modify your pull request, repeat steps 8 through 15, then leave a comment to notify the Core Contributors that the pull request is ready for further review.

###

###
