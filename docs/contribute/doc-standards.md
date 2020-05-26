---
id: doc-standards
title: Documentation standards
sidebar_label: Documentation standards
---

# Documentation standards

This section outlines the formatting standards presented within this documentation. In order to maintain continuity and quality, all pull requests must best conform to the specifics below.

## Content types

Walkthroughs and conceptual articles explained.

### Walkthroughs

The purpose of a walkthrough is to tell the user _how_ to do something. They do not need to convince the reader of something or explain a concept. Walkthroughs are a list of steps the reader must follow to achieve a process or function.

The vast majority of documentation within the df falls under the _Walkthrough_ category. Walkthroughs are generally quite short, have a neutral tone, and teach the reader how to achieve a particular process or function. They present the reader with concrete steps on where to go, what to type, and things they should click on. There is little to no _conceptual_ information within walkthroughs.

#### Function or process

The end goal of a walkthrough is for the reader to achieve a very particular function. 

Take a Prysm installation page for example: Following this walkthrough isn't going to teach the reader much about working with the decentralized web or what Prysm is. Still, by the end, they'll have the Prysm client installed on their computer.

#### Short length

Since walkthroughs cover one particular function or process, they tend to be quite short. The estimated reading time of a walkthrough is somewhere between 2 and 10 minutes. Most of the time, the most critical content in a walkthrough is presented in a numbered list. Images and gifs can help the reader understand what they should be doing.

If a walkthrough is converted into a video, that video should be no longer than 5 minutes.

#### Walkthrough structure

Walkthroughs are split into three major sections:

1. Context to the topics covered.
2. What we're about to do.
3. The steps we need to do.
4. Summary of what we just did, and potential next steps.

### Conceptual articles

Articles are written with the intent to inform and explain something. These articles don't contain any steps or actions that the reader has to perform _right now_.

These articles are vastly different in tone when compared to walkthroughs. Some topics and concepts can be challenging to understand, so creative writing and interesting diagrams are highly sought-after for these articles. Whatever writers can do to make a subject more understandable, the better.

#### Article goals

Use the following goals when writing conceptual articles:

| Goal | Keyword | Explanation |
| ------------- | ------------------------ | -------------------------------------------------------------------------------- |
| **Audience**  | _Knowledgeable_          | Requires a certain amount of focus to understand.                                |
| **Formality** | _Neutral_                | Slang is restricted. **No you / your** -- explain informatively.                   |
| **Domain**    | _Any_                    | Usually _technical_, but depends on the article.                                 |
| **Tone**      | _Confident and friendly_ | The reader must feel confident that the writer knows what they're talking about. |
| **Intent**    | _Describe_               | Tell the reader _why_ something does the thing that it does, or why it exists.   |

#### Article structure

Articles are separated into five major sections:

1. Introduction to the thing we're about to explain.
2. What the thing is.
3. Why it's essential.
4. What other topics it relates to.
5. Summary review of what we just read.

When designing a tutorial, keep in mind the walkthroughs and articles that already exist, and note down any additional content items that would need to be completed before creating the tutorial.

# Grammar, formatting, and style

Here are some language-specific rules that the Prysm documentation follows. If you use a writing service like [Grammarly](https://www.grammarly.com/), most of these rules are turned on by default.

### British English

The Prysm documentation portal is written in British English. The basic rules for converting other styles of English into British English are:

1. Swap the `z` for a `s` in words like _categorize_ and _pluralize_.
2. Add a `u` to words like _colour_ and _honour_.
3. Swap `ter` for `tre` in words like _centre_.

### The Oxford comma

Follow each list of three or more items with a comma `,`:

| Use                           | Don't use                    |
| ----------------------------- | ---------------------------- |
| One, two, three, and four.    | One, two, three and four.    |
| Henry, Elizabeth, and George. | Henry, Elizabeth and George. |

### Acronyms

If you have to use an acronym, spell the full phrase first and include the acronym in parentheses `()` the first time it is used in each document. Exception: This generally isn't necessary for commonly-encountered acronyms like _EVM_, unless writing for a stand-alone article that may not be presented alongside project documentation.

> Virtual Machine (VM), Decentralized Web (DWeb).

## Formatting

How the Markdown syntax looks, and code formatting rules to follow.

## Style

The following rules explain how we organize and structure our writing. The rules outlined here are in addition to the [rules](https://github.com/DavidAnson/markdownlint/blob/master/doc/Rules.md) found within the [Markdownlinter extension](https://github.com/DavidAnson/vscode-markdownlint).

### Text

The following rules apply to editing and styling text.

#### Titles

1. All titles follow sentence structure. Only _names_ and _places_ are capitalized, along with the first letter of the title. All other letters are lower-case:

   ```markdown
   ## This is a title

   ### Only capitalize names and places

   #### The capital city of France is Paris
   ```

2. Every article starts with a _front-matter_ title and description:

   ```markdown
   ---
   title: Example article
   description: This is a brief description that shows up in link teasers in services like Twitter and Slack.
   ---

   ## This is a subtitle

   Example body text.
   ```

   In the above example `title:` serves as a `<h1>` or `#` tag. There is only ever one title of this level in each article.

3. Titles do not contain punctuation. If you have a question within your title, rephrase it as a statement:

   ```markdown
   <!-- This title is wrong. -->

   ## What is Prysm?

   <!-- This title is better. -->

   ## Prysm explained
   ```

#### Bold text

Double asterisks `**` are used to define **boldface** text. Use bold text when the reader must interact with something displayed as text: buttons, hyperlinks, images with text in them, window names, and icons.

```markdown
In the **Login** window, enter your email into the **Username** field and click **Sign in**.
```

#### Italics

Underscores `_` are used to define _italic_ text. Style the names of things in italics, except input fields or buttons:

```markdown
Here are some American things:

- The _Spirit of St Louis_.
- The _White House_.
- The United States _Declaration of Independence_.

```

Quotes or sections of quoted text are styled in italics and surrounded by double quotes `"`:

```markdown
In the wise words of Winnie the Pooh _"People say nothing is impossible, but I do nothing every day."_
```

#### Code blocks

Tag code blocks with the syntax of the core they are presenting:

````markdown
    ```javascript
    console.log(error);
    ```
````

#### List items

All list items follow sentence structure. Only _names_ and _places_ are capitalized, along with the first letter of the list item. All other letters are lowercase:

1. Never leave Nottingham without a sandwich.
2. Brian May played guitar for Queen.
3. Oranges.

List items end with a period `.`, or a colon `:` if the list item has a sub-list:

1. Charles Dickens novels:
   1. Oliver Twist.
   2. Nicholas Nickelby.
   3. David Copperfield.
2. J.R.R Tolkien non-fiction books:
   1. The Hobbit.
   2. Silmarillion.
   3. Letters from Father Christmas.

##### Unordered lists

Use the dash character `-` for un-numbered list items:

```markdown
- An apple.
- Three oranges.
- As many lemons as you can carry.
- Half a lime.
```

#### Special characters

Whenever possible, spell out the name of the special character, followed by an example of the character itself within a code block.

```markdown
Use the dollar sign `$` to enter debug-mode.
```

#### Keyboard shortcuts

When instructing the reader to use a keyboard shortcut, surround individual keys in code tags:

```bash
Press `ctrl` + `c` to copy the highlighted text.
```

The plus symbol `+` stays outside of the code tags.

### Images

The following rules and guidelines define how to use and store images.

#### Storage location

All images must be placed in the `/website/static/img` folder. For multiple images attributed to a single topic, a new folder within `/img/ the may be needed.

#### File names

All file names are lower-case with dashes `-` between words, including image files:

```text
concepts/
├── content-addressed-data.md
├── images
│   └── proof-of-spacetime
│       └── post-diagram.png
└── proof-of-replication.md
└── proof-of-spacetime.md
```

_The framework and some information for this was forked from the original found on the [Filecoin documentation portal](https://docs.filecoin.io)_
