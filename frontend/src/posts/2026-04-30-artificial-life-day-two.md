---
title: Artificial Life Day 2
---


Did a little bit of playing with Gray-Scott. added an identical second chemical W that mirrors V, but the two repel each other. That did what I hoped for: blobs of each color are self-similar and coexist. But that seemed like a hacky way to introduce "species". I also noticed that every emergent system I've played with so far has a ceiling of "complex structure" that the system reaches almost instantly. Whereas life builds up complexity mind-bogglingly slowly. so I asked Claude for more on what it takes to get those two things: a consistent  substrate between self-similar bodies that diverge from one another; and a larger search space of emergent structure.

It's time to build a new model from scratch!

Some new goals:

* In order to find multi-layered emergence, Claude and I are going to build the oracle together.
* I want the simulation to have "species" whose differentiation are quantitative differences in a "chemical" makeup rather than a distinct "essence"; we don't want distinction by a discretely labeled quality (no V/W binary).
* I want "chemicals" built up from "atoms". The qualitative/behavioral differences between chemicals are emergent from differences in their atomic makeup. Chemicals are fairly robust but have various reactive/conversion behaviors.
* Claude proposes Hutton 2002, Squirm3. Ok. Like. Whatever that is. I didn't think much further about it, I asked CLaude to implement it and add a detailed mechanical explanation, here: [the Squirm3 tab in the alife app](https://wittejm.github.io/alife/).
* On the Squirm3 tab you'll see a seeded chain of atoms surrounded by a soup of free atoms; if it works the chain replicates from the soup over a few thousand steps.
* Upcoming: more careful questions about why this model does what it does, and what it's still missing.