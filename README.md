# contribution-heatmap
A draft specification for a faster, clearer way to indicate author contributions to a scientific publication

## What

A `contribution-heatmap` is a way to represent what each author contributed to the project. Rather than writing this down in a paragraph, it is a graphical representation. An example is given below.

<example.jpg>

## Why

Graphical representations have two primary advantages

1. Parsing the information is much **quicker** than lines of text
2. Can present a **clearer** view of the information by highlighting certain relations

> That's all well and good, but why do we  **want** this for author contributions? 

This can achieve the following:

* Alleviating the obsessive focus on who gets to be the first-author of the journal by moving the focus to each authors **contributions**, as it should be.
* Present each authors strengths and skills to those interested in your work
* Build a visual history of your contributions to your field

## How

To get this to work, a shared standard must be conceived. It must not be **too flexible** so that we end up with a wild-west scenario, but also not **too restrictive** to be bogged down with too many mandatory rows that are not relevant for a particular research field.

In addition, it must also be `machine-readable` so that the information can easily be pulled from publication databases, rather than having to scroll through the paper to find it. The Appearance should allow for journal-specific styling, but retain copy-paste properties. 

Contribution tables should be vector elements (e.g. PDF, SVG), not rasterised images. This ties into the copy-paste properties above.

## Common points of critique

There are some arguments that I have seen raised in the context of using a `contribution-heatmap`. I will note them below, and note my response below.    By all means feel free to still disagree with me, or send me new points of critique; the more feedback the better.



1. Why are we so obsessed with author contributions? Ultimately what we should care about is the nature of the contents of the paper!

> While the content of  a publication is always front and centre, the only reward authors get from publishing paper is the credit of having written the paper (in contrast to a monetary reward). As such, making sure that **credit is given where credit is due** should be an essential part of publishing. 



2. A contribution-heatmap is just another administrative task in an already overpoliced workspace.

> While a `contribution-heatmap` is a little bit more work, we think the current specification has been kept simple on purpose, so it takes minutes to fill in. The available tools means you can add it to your manuscript in minutes.



3. This doesn't stop people from lying about their contribution or adding authors that did not make meaningful contributions!

> This is absolutely true, but that is also not the point of the `contribution-heatmap`. 



4. This will just turn into a mess of people overinflating their contribution to a publication in order to boost their record.

> Objectively assessing one's own and other's contribution is nearly impossible on a granular scale. It is for this reason the proposed draft for `contribution-heatmap` only has a few discrete levels (i.e. `none`, `minor`, `major`). At these discrete levels it should be much easier to reason about contributions (compared to something like a value between 0-100)


## The specification

> The dry, boring draft specification will be added at a later day



