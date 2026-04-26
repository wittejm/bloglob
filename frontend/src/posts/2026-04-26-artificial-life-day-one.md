---
title: Artificial Life Day 1
---

I've been mulling over "artificial life" approaches after I played with [Typogenetics](https://github.com/wittejm/typogenetics) and [Trees/Deer/Wolves](https://github.com/wittejm/ecologysim). Looking for "systems with simple rules and complex emergent dynamics". I asked Claude the other day, "Does artificial life get anywhere?". I said that I am dissatisfied with agent-based systems or Conway's Game of Life, for example, which cap out at one layer of emergent dynamics. And Claude said that the golden prize is "unbounded novelty"; a system that has a base layer and above it a series of emergent layer, each with its own coherent dynamics, on up to life-level complexity.

I started a first foray into the project today. Turns out there are a lot of established methods to choose from. From conversation with Claude I established these stated goals, before selecting a method:

(This list is Claude talking, we workshopped it together)
- **Shows two tiers of emergence.** Most published methods cap out at two.
- **Probabilistic stability.** Just seems correct?
- **Mathematical attractor detection.** Find stable emergent units by analysis, not by eye, using various evaluation methods.
- **Open-ended parameter search.** Once a tier-score is defined, search the rule/parameter space with various heuristic methods.
- **Thermodynamics.** Energy sustains structure against entropy.
Bonus: (I thought of these later, they don't show up in Day 1)
- **Competition for resources.** Produces ecology-like patterns. 
- **Selection on heritable variation** Evolutionary dynamics. The key to "open-ended novelty"?

## First Try: Gray–Scott reaction-diffusion system

A 2D grid with two chemicals whose concentrations diffuse at different rates, plus a reaction where one chemical reproduces by consuming the other. Energy input keeps the system from settling, while continuous washout removes excess buildup. [Check out the app!](https://wittejm.github.io/alife/)  Try tweaking the energy input and washout rates and watch what patterns appear.

Variations to Gray-Scott for next time:

- Some random noise to enhance variable dynamics
- Spatially varying energy input to add local dynamics
- Parameter search using heuristics.