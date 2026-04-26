---
title: Artificial Life Day 1
---

I've been mulling over "artificial life" approaches after I played with [Typogenetics](https://github.com/wittejm/typogenetics) and [Trees/Deer/Wolves](https://github.com/wittejm/ecologysim). Looking for "systems with simple rules and complex emergent dynamics". I asked Claude the other day, "Does artificial life get anywhere interesting?". I said that I am dissatisfied with agent-based systems and Conway's Game of Life, for example, which cap out at one layer of emergent dynamics. And Claude said that the golden prize is "unbounded novelty"; a system that has a base layer and above it a series of emergent layers, each with its own coherent dynamics, stacking on up to life-level complexity.

I started a first foray into the project today. Turns out there are a lot of established methods to choose from. From conversation with Claude I established these stated goals, before selecting a method:

- **Shows two tiers of emergence.** Just to get started simply. Most published methods cap out at two.
- **Probabilistic stability.** Just seems correct?
- **Thermodynamics.** Energy sustains structure against entropy.
- **Mathematical pattern detection.** Find stable emergent units by analysis, not by eye, using various evaluation methods. This lets Claude iterate autonomously, when we get to that.
- **Open-ended parameter search.** Once a measurement of system "interestingness" is defined, search the rule/parameter space with various heuristic methods. Using Claude.
- **Competition for resources and Selection on heritable variation** Evolutionary dynamics. The key to "open-ended novelty"?

## First try: Gray–Scott reaction-diffusion

A 2D grid with two chemicals whose concentrations diffuse at different rates, plus a reaction where one chemical reproduces by consuming the other. Energy input keeps the system from settling, while continuous washout removes excess buildup. [Check out the app!](https://wittejm.github.io/alife/)  Try tweaking the energy input and washout rates and watch what patterns appear.

Of the six bullet points above, the work I've done so far only hits two: Shows two tiers of emergence, and Thermodynamics.

Variations to Gray-Scott for next time:

- Some random noise to enhance variable dynamics
- Spatially varying energy input to add local dynamics
- An "interestingness" heuristic.
- Claude-autonomous parameter search to find juicy patterns.
- More tiers and evolution are beyond the bounds of the model, I believe. We'll see more models in the future, then.