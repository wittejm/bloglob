---
title: Predictive Coding
---

I was always more interested in in "computational cognition" than AI. What are the computation models that actually look like the way the brain works?

A few examples that didn't look like canonical deep neural networks. Over the years, I gathered a few:
- Recurrent neural networks: networks that process data in sequential series and maintain an internal memory state, allowing capture of discontinuous patterns across time)
- Sparse coding: networks with a sparsity constraint, so only a few units activate in each pass.
- Autoencoders: models that compute "internal representations" that can reproduce their output: capable of generation of outputs that resemble inputs.
- Probabilistic graphical models: networks that computed and behaved probabilistically rather than deterministic continuous activations.
- And the biggest most exciting one: Predictive coding: cognitive models that compute a prediction of expected input and only propagate errors, novel signals, or "surprise".

I was pointed toward predictive coding before I even started grad school, by a guy I exchanged a single email with. He pointed me to a 60 page paper that was all theory, no math. Reading that paper became a todo item that I occasionally touched and struggled on briefly, over the next ~3-4 years. It always tantalized, but I never really understood it: how is the math actually different from conventional, feedforward models? I never figured out the answer to the question because I didn't know how to implement the model in code.

A few days ago I Finally, FINALLY dug into it for a few minutes with Claude. I asked it a few basic questions and asked how we get started. It needed a problem space, so I guessed, MNIST? That's a commonly used toy dataset of individual hand-written digits. It's a "hello world" problem, easy to get some decent results with simple solutions. I'd used it for Hopfield networks, which are a type of autoencoder. So Claude said, "want to implement it?" And I said yes and Claude wrote the whole thing for me. In 20 seconds. Ok, now we test.

And the single most surprising thing I learned about it is that the network doesn't compute in one pass. If predictions and inputs start "cold", that is, if there is zero initial expectation, then the network needs to compute in both directions (prediction, error) several times. Claude set the network to 50 passes.

Ok. Wow. Mind blown.

Two interesting things that the model did, in addition to classification (poorly) were generation—literally, predicting what "1" looked like in 28x28 pixel space, and completion: what the obscured portion of an image looked like given part of it. The generated images looked tantalizingly like the individually numerals, though heavily blurred and sometimes confused (2s and 3s blurred together). This was pretty awesome though.

Ideas immediately followed. "So, image classification isn't really what predictive coding is FOR, is it?" No. It's only possible to develop expectation over time. So for a still image you stare at it for many timesteps.

Also the performance was terrible, compared to a feedforward network of the same size. Running 50 passes was slower, obviously. And classification was much weaker. Increasing the network size made the performance even weaker. Prediction and error signals both diffuse through the network and signal is lost.

Ok. So. Expectation is built up over time. Meaning the correct problem space for a predictive network is a time series. How about language? Well, next-token prediction is the domain of LLMs. And LLMs dominate prediction, "unreasonably well". Feedforward networks can learn very effectively from large datasets, and scale from increased network size. Also for some reason they learn semantic structure and "reasoning," or something that looks like reasoning. Not really clear why.

I desired for a "computational cognitive model" to outperform one that is less "biologically plausible." That turns out to be out of the question. Nothing has approached LLMs in power. I assumed that running a predictive network on language would get nowhere.

Anyway. Still images = wrong problem space. Time series = better problem space. At Claude's suggestion, we tried simulated video of MNIST characters by moving them around in 2d space. I didn't think too hard about it. Turns out that in the version Claude built prediction of the next frame was just equal to the previous frame. A "little bit" of movement in 2d space is assumed to be close enough to "no change" as makes no difference. The model did nothing impressive with this. I asked Claude if we can actually predict the next frame and it said, "sure, let's do it"; there's a mathematical construction for that. Performance didn't improve.

The really interesting thing about predictive networks is that every unit computes inference and learning signals (both prediction and error) fully locally. Meaning you CAN parallelize the whole network. That's what the brain is doing. And that's what feedforward is not doing. But feedforward works in part because it's consistent with the hardware. It's a series of matrix operations that compute each layer once. Predictive coding, if it's actually what the brain is doing, is better fit to brain hardware, whose units (neurons) fire independently as opposed to Von Neumann architecture that compute in sequence.

Larger networks in this problem space perform worse given a constant problem space. That's how deep neural nets work too: to make train larger networks you need more data.

So, a predictive network just needs a bigger problem space, doesn't it. Yes, said Claude. It works for the brain because the brain is doing sensation and prediction at a massive scale, in embodied 3d space. So. If we had that input space, and we had the hardware to support it, then maybe we would have a working brain.


<details>
  <summary>Addenda by Claude</summary>

  me: Reread the project readme and BRIEFLY summarize the concepts and questions not touched on in the post, in bullet points. 

  Claude:


- **Precision-weighting is attention.** A learnable gain on each error signal — high precision means "trust this error," low means "probably noise." This single mechanism explains inattentional blindness (low gain on unattended channels), sensory attenuation (why you can't tickle yourself), anxiety (treating noise as signal), and one hypothesis about autism (everything treated as important, overwhelming top-down priors).
- **Width beats depth.** In our experiments, a wide-shallow PC network (784→512→256→10) beat a deeper one with more parameters. Each additional layer compounds approximation error during settling. The brain mirrors this: shallow hierarchy (~4-6 stages), enormous width (millions of neurons per layer).
- **Prediction vs reasoning.** PC wants them to be the same thing — reasoning is just prediction over abstractions, settling is constraint satisfaction. It maps onto the phenomenology ("aha" = convergence). But the seams show: reasoning is sequential, requires variable binding, and needs compositional structure that PC doesn't provide for free.
- **Reward as prediction.** Three positions: reward drives prediction (standard RL), prediction subsumes reward (Friston — reward is just low surprise relative to prior preferences), or they're complementary signals (prediction says *what* to update, reward says *whether to*). Dopamine encodes reward prediction error — which is either a special case of prediction error or a distinct signal. Unresolved.
- **The math is more similar than different.** PC, RL, free energy, and LLMs are all variations on variational inference. PC minimizes `Σ π||e||²`, RL minimizes Bellman error, free energy minimizes `KL(q||p) - log p(x)`, LLMs minimize `-Σ log p(x_t|x_{<t})`. The real differences are practical — backprop crushes Hebbian learning, one forward pass beats settling, and scale changes everything.
- **Warm-start settling: 10x speedup confirmed.** In temporal experiments, carrying forward representations from the previous frame reduced settling cost by 10x. Cost spiked at direction changes (bounces). Temporal prediction error decreased monotonically up the hierarchy — higher layers are more stable over time.
- **The hardware co-evolution feedback loop.** Von Neumann → algorithms that fit it (BP) → optimize hardware for those (GPUs) → BP gets faster → more hardware investment. PC never entered this loop. The energy argument: brains do ~10^18 ops/sec on 20 watts. If that's because of local event-driven architecture, PC on neuromorphic hardware could be radically more efficient than BP on GPUs. But neuromorphic hardware doesn't exist at scale.
- **The thesis.** Prediction is the universal operation of intelligence — it absorbs perception, attention, reasoning, motivation. But predictive *coding* (the specific architecture: settling, Hebbian learning, precision) keeps losing to LLMs, which do prediction without any of it. Either the architecture doesn't matter, or it solves problems (embodiment, continual learning, energy efficiency) that current benchmarks don't test.
- **Language fits PC better than vision.** Words arrive sequentially, prediction is natural, warm-start applies automatically. N400 (semantic surprise) and P600 (syntactic revision) are literally what a PC language model would produce at different hierarchy levels.
- **Active inference.** Friston's extension: act on the world to fulfill predictions rather than revising them. Decomposes into exploration (epistemic value) and exploitation (pragmatic value). Powerful but risks making the theory unfalsifiable by absorbing everything.

</details>
