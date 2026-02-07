MAIN GOAL: Make an app which helps user learn faster and more effectively using proven best learning practices and achieve his goals(short(which he currently wants to main focus)), near term(he wants to achieve after he nearly completes his short term ones. eg could be less then 2 or 3 months), and long term(he wants to achieve in a year or more)). Below are some practices i came across : 

# Evidence-Based Learning Practices and Cognitive Optimization

## I. Core Cognitive Learning Strategies

The transformation of transient information into durable long-term memory relies on specific cognitive mechanisms that can be actively leveraged. Recent research from 2020-2026 has moved beyond simple behavioral observations to uncover the neural and algorithmic foundations of how the brain encodes, stores, and retrieves complex concepts. This section details the three pillars of cognitive learning: Retrieval Practice, Spaced Repetition, and Interleaving.

### 1. Retrieval Practice (Active Recall)

**Algorithmic Mechanisms and Neural Foundations**
Retrieval practice, often called active recall, is the process of actively stimulating memory during the learning phase. Unlike passive review (re-reading, highlighting), which often creates a "fluency illusion," retrieval practice forces the brain to reconstruct neural pathways. The core mechanism involves the "testing effect," where the act of retrieval itself modifies the memory trace. Neurobiologically, this process strengthens synaptic connections through Long-Term Potentiation (LTP).

Recent studies confirm that the effort required to recall information is the critical variable. This is known as "Desirable Difficulty." If a task is too easy, the neural strengthening is minimal; if too hard, it leads to frustration and failure. The optimal difficulty triggers error-correction mechanisms in the brain, which are essential for deep learning [^p8]. Research indicates that retrieval practice yields an effect size of $d \approx 0.5–0.7$, significantly outperforming traditional study methods [^u24].

**System Engineering Implementation**
Implementing retrieval practice requires a shift from "input-based" to "output-based" learning systems.
*   **Protocol Design**: Instead of reviewing notes, learners should engage in "free recall"—writing down everything they know about a topic without cues.
*   **Tool Integration**: Digital tools can facilitate this by using flashcards (e.g., Anki) that demand an answer before revealing it.
*   **Adaptive Testing**: Advanced implementations involve adaptive testing algorithms that adjust the complexity of questions based on previous performance, ensuring the learner remains in the zone of proximal development [^p1].

**Research Frontiers**
The latest research (2025) explores the intersection of AI and retrieval. The "LECTOR" model, for instance, uses Large Language Models (LLMs) to generate concept-based tests that adapt to semantic interference—where similar concepts confuse the learner. This addresses a major limitation of traditional flashcards by testing understanding of nuances rather than just rote definitions [^p1].

### 2. Spaced Repetition (The Spacing Effect)

**The Principle and Mathematical Models**
Spaced repetition is the practice of reviewing material at increasing intervals. It is based on the "Forgetting Curve," originally described by Ebbinghaus, which shows that memory decay is exponential. Spacing reviews "resets" the forgetting curve, flattening the decay rate with each successful retrieval.

![Figure 1: Chart visualizing the forgetting curve and the effect of spaced repetition](https://storage.googleapis.com/novix-prod-storage/nova_agent_v1/user_data/session_b2c94cfb1be2c99fc184c167f1f47ef2/task_41555/images/mm_report_image_20260127_132210_740778.png)

Modern algorithmic approaches have refined this. The "Adaptive Forgetting Curve" models (2020) and newer AI-driven schedulers like FSRS (Free Spaced Repetition Scheduler) predict personal decay rates with high precision [^p5][^p1]. These models use historical performance data to calculate the optimal "stability" of a memory trace—defined as the time required for the probability of recall to drop to a specific threshold (e.g., 90%).

**Stability Gap and Implementation**
A critical finding in 2025 is the "Stability Gap" (arXiv:2507.14056), which describes a transient drop in performance on previously mastered tasks when new tasks are introduced. This suggests that the neural network undergoes a reorganization phase where old connections are temporarily suppressed to accommodate new plasticity [^p30].

**Table 1: Comparative Analysis of Review Scheduling Algorithms**

| Algorithm Model | Basis Mechanism | Key Feature | Strengths | Limitations |
| :--- | :--- | :--- | :--- | :--- |
| **Standard SM-2** | Fixed Multipliers | Geometric expansion of intervals (e.g., 2.5x) | Simple, widely used (Anki default) | Rigid; ignores semantic difficulty |
| **FSRS (2024-25)** | Differential Decay | Parameterizes "Stability" and "Retrievability" | Adapts to user's retention rate; handles "hard" items better | Requires data to optimize parameters |
| **LECTOR (2025)** | LLM + Concept Graph | Semantic similarity analysis | Prevents interference between similar concepts | Computationally intensive |
| **Neural Decay** | Bio-mimetic | Simulates synaptic weight decay | High theoretical accuracy | Complex to implement for end-users |

**Practical Synergy**
The most potent intervention is "Spaced Retrieval"—combining spacing with active recall. This synergy maximizes the benefits of both: spacing ensures the brain works hard to retrieve the memory (Desirable Difficulty), while retrieval strengthens the trace against future decay [^p9][^p12].

### 3. Interleaving (The Mixing Effect)

**Mechanism: Discrimination Learning**
Interleaving involves mixing different topics or problem types within a single study session, as opposed to "blocking" (studying one topic thoroughly before moving to the next). The cognitive mechanism here is "discrimination learning." When topics are blocked, the learner knows exactly what strategy to apply (e.g., "this is a multiplication chapter, so I will multiply"). Interleaving forces the brain to constantly identify *which* strategy is required for *which* problem type [^p7][^p14].

**Evidence and Effectiveness**
Recent trials (2025) in science education demonstrated that students using interleaved quizzes scored significantly higher (63%) than those using blocked quizzes (54%) [^p14]. The effect is robust across domains, from mathematics to medical imaging diagnosis [^p6]. The key is that interleaving creates higher "contextual interference," which feels harder during learning but results in superior transfer and retention.

---

## II. The Science of Sleep and Memory Consolidation

Sleep is not merely a passive recovery state but an active, sophisticated period of data processing. It is the biological server maintenance window where temporary files (hippocampal memories) are compressed, sorted, and transferred to long-term storage (neocortex).

### 1. Memory Replay and Consolidation (NREM & REM)

**NREM Sleep: The Download Phase**
Non-Rapid Eye Movement (NREM) sleep, particularly Slow Wave Sleep (SWS), is critical for **Declarative Memory** (facts, vocabulary, explicit knowledge). During SWS, the hippocampus generates high-frequency bursts known as "Sharp-Wave Ripples" (SWRs). These ripples are essentially high-speed replays of the neural patterns activated during the day's learning. They coordinate with "Sleep Spindles" (thalamocortical bursts) to transfer information to the neocortex, integrating new facts into existing knowledge schemas [^p15][^p20].

*   **Targeted Memory Reactivation (TMR)**: A groundbreaking 2025 study demonstrated that playing auditory cues associated with learning material during SWS can artificially trigger these replays. This "Personalized TMR" significantly reduced memory decay, particularly for challenging material, by synchronizing slow waves and spindles [^p15].

**REM Sleep: The Integration Phase**
Rapid Eye Movement (REM) sleep is associated with **Procedural Memory** (skills, "how-to") and emotional processing. Recent theories (2023-2024) propose that REM "reorganizes" memory representations. While NREM strengthens individual facts, REM helps the brain abstract generalized rules and schemas from those facts. It moves knowledge from "specific details" to "conceptual understanding" [^p18].

![Figure 2: Diagram showing the sleep-wake consolidated learning cycle](https://storage.googleapis.com/novix-prod-storage/nova_agent_v1/user_data/session_b2c94cfb1be2c99fc184c167f1f47ef2/task_41555/images/mm_report_image_20260127_132125_996410.png)

### 2. Optimal Sleep Architecture

**The Disentangling-Entangling Cycle**
A 2024 computational model describes the sleep-wake cycle as a "Disentangling-Entangling" process. During wakefulness (entangling), the hippocampus rapidly encodes information bound to specific contexts (time, place). During sleep (disentangling), the brain strips away these specific contexts to form generalized, context-independent knowledge in the neocortex [^p16]. This explains why "sleeping on a problem" often leads to creative insights—the brain has extracted the underlying rule from the specific examples.

**Table 2: Sleep Stages and Learning Functions**

| Sleep Stage | Primary Function | Neural Characteristic | Optimization Strategy |
| :--- | :--- | :--- | :--- |
| **Wakefulness** | Encoding / Acquisition | High Beta/Gamma waves | Active focus, high repetition |
| **NREM Stage 2** | Motor Memory / Preparation | Sleep Spindles (11-16Hz) | Naps of 20 mins can boost this |
| **NREM Stage 3 (SWS)** | Declarative Consolidation | Delta Waves (<4Hz), SWRs | Avoid alcohol/blue light before bed; core sleep (first 4h) |
| **REM** | Abstraction / Creativity | Theta Waves, Desynchronized | Extended sleep duration (last 2-3h of sleep) |

**Strategic Napping**
Naps can serve as "micro-consolidation" windows. Research from 2023 shows that naps (20-90 minutes) significantly improve working memory performance. Specifically, increased delta power during NREM Stage 3 in naps correlates with better accuracy on post-nap tasks [^p32]. This supports the practice of "learning naps"—studying intensely and then immediately sleeping for a short duration to protect the memory trace from interference.

---

## III. Scheduling, Cycles, and Gaps

Optimizing the temporal structure of learning sessions—aligning them with the brain's biological rhythms—is as important as the content itself.

### 1. The "Gap Effect" (Micro-Breaks)

**Mechanism: Wakeful Replay**
The "Gap Effect" refers to the counter-intuitive finding that the brain consolidates information *during* short pauses in learning. Neuroscientific evidence, popularized by Dr. Andrew Huberman and confirmed by 2025 studies, shows that during brief (10-20 second) periods of wakeful rest, the hippocampus spontaneously "replays" the learned neural sequence at 20x speed [^p60][^u1].

**Micro-Offline Consolidation**
This phenomenon is termed "micro-offline consolidation." It occurs when the brain is idle and not receiving new sensory input.
*   **The Protocol**: Every few minutes of intense focus (e.g., every 5-10 minutes), stop and do *nothing* for 10-30 seconds. Close eyes or stare at a blank wall.
*   **Why it works**: This pause allows the metabolic demand of neurons to recover and triggers the rapid replay mechanism that begins the transfer to long-term storage [^p33][^p60].
*   **Avoid**: Do not check a phone or email during these gaps. Any new sensory input disrupts the replay process.

### 2. Ultradian Rhythms (90-Minute Cycles)

**The Basic Rest-Activity Cycle (BRAC)**
Human alertness follows an "Ultradian Rhythm" of approximately 90 minutes. This cycle governs the oscillation between high-frequency beta brain waves (alertness) and lower-frequency waves (fatigue).
*   **The Cycle**:
    1.  **Ramp-up (0-20 mins)**: Focus deepens, getting into "flow."
    2.  **Peak (20-70 mins)**: Maximum cognitive capacity and processing speed.
    3.  **Trough (70-90 mins)**: Alertness begins to fade, cognitive fatigue sets in.
    4.  **Recovery (20 mins)**: The brain requires a "reset" phase.

![Figure 3: Infographic of the 90-minute ultradian rhythm cycle](https://storage.googleapis.com/novix-prod-storage/nova_agent_v1/user_data/session_b2c94cfb1be2c99fc184c167f1f47ef2/task_41555/images/mm_report_image_20260127_132257_057614.png)

**Evidence from Wearable Data**
A 2025 study using multimodal wearable sensors confirmed these rhythms as "intermittently forced linear systems." The data showed that pushing past the 90-minute limit leads to diminishing returns and a significant drop in encoding efficiency [^p65].

**Implementation: The Macro-Pomodoro**
While the classic Pomodoro is 25/5, an Ultradian-aligned schedule is more robust for deep work:
*   **Block**: 90 minutes of focused work (with micro-gaps).
*   **Break**: 20-30 minutes of *true* rest (walk, meditate, nap).
*   **Limit**: Most humans can only sustain 3-4 such high-intensity cycles per day [^u12][^u19].

---

## IV. Balance and Cognitive Load Management

Sustainable learning requires managing the "load" placed on the cognitive system to prevent burnout and maximize "Germane Load"—the effort that contributes to learning.

### 1. Cognitive Load Theory (CLT)

**The Three Loads**
1.  **Intrinsic Load**: The inherent difficulty of the material (e.g., calculus is harder than addition). This is irreducible but can be managed by breaking topics down.
2.  **Extraneous Load**: The mental effort wasted on poor instruction, distractions, or confusing formats. This must be minimized.
3.  **Germane Load**: The effort dedicated to processing, construction, and automation of schemas. This should be maximized.

**Adaptive Training and Germane Load**
A 2025 study on adaptive instructions found that dynamically adjusting difficulty based on performance (Adaptive Training) optimizes Germane Load. When learners are consistently challenged just enough (but not too much), they build schemas more efficiently. The study showed that "adaptive" groups performed better on retention tests than "fixed" difficulty groups [^p42].

### 2. Balance and "Stability Gap" Management

**The Plasticity-Stability Dilemma**
The brain faces a trade-off: it must be plastic enough to learn new things (plasticity) but stable enough not to overwrite old things (stability). The "Stability Gap" is the vulnerability period where new learning can interfere with old memory [^p30].
*   **Management Strategy**: To mitigate this, one must intersperse "maintenance reviews" of old material even while aggressively learning new material.
*   **Stress Regulation**: High cortisol (stress) inhibits the hippocampus and impairs memory retrieval. A state of "relaxed alertness"—high focus but low anxiety—is optimal. Techniques like physiological sighs (double inhale, long exhale) can rapidly lower autonomic arousal to this optimal zone.

**Table 3: Cognitive Load Optimization Checklist**

| Component | Strategy | Actionable Tactic |
| :--- | :--- | :--- |
| **Intrinsic** | Segmentation | Break complex concepts into "chunks" before integrating. |
| **Extraneous** | Elimination | Remove phones, clutter, and irrelevant music. Use simple, clear study materials. |
| **Germane** | Maximization | Use retrieval practice, self-explanation, and varying problem types. |
| **Recovery** | Restoration | Respect 90m cycles; prioritize sleep; use Non-Sleep Deep Rest (NSDR). |

---

## V. Summary Checklist for Optimal Learning

To operationalize these findings, use the following daily protocol for high-performance cognitive work:

1.  **Retrieve (The Engine)**: Stop passively reading. Quiz yourself every 10–20 minutes. Use "free recall" (write down what you know).
2.  **Space (The Schedule)**: Do not cram. Review material at expanding intervals: 1 day, 3 days, 1 week, 1 month. Use an app like Anki or FSRS.
3.  **Mix (The Texture)**: Interleave distinct but related topics (e.g., Math A, Math B, Physics A) in one session to boost discrimination skills.
4.  **Gap (The Pause)**: Every 5-10 minutes of intense focus, take a 10-30 second "do nothing" break. Eyes closed, no phone. Let the brain replay.
5.  **Cycle (The Rhythm)**: Work in 90-minute ultradian blocks. Follow each block with a 20-minute meaningful rest (walk/nap).
6.  **Sleep (The Save Button)**: Prioritize 7.5–9 hours. The first 4 hours (NREM) save facts; the last 3 hours (REM) build understanding. Do not cut sleep short.
7.  **Adapt (The Calibration)**: If it feels too easy, it's not working. Increase difficulty until you are making occasional errors, then correct them.

---

## VI. Key Resources & References

**Foundational Papers**
*   *The science of effective learning with spacing and retrieval practice* (2022) [^p8]
*   *Wake-Sleep Consolidated Learning* (2024) [^p17]
*   *Optimal Learning Rate Schedule for Balancing Effort and Performance* (2026) [^p41]
*   *Interleaving Retrieval Practice Promotes Science Learning* (2025) [^p14]
*   *Personalized Targeted Memory Reactivation for Memory Consolidation* (2025) [^p15]

**Key Concepts from Literature**
*   **Desirable Difficulty**: The sweet spot of effort required for neuroplasticity.
*   **Micro-Offline Consolidation**: The rapid replay of memory traces during wakeful rest (Gap Effect).
*   **Stability Gap**: The transient vulnerability of memory during new learning.
*   **Ultradian Rhythms**: The 90-minute biological cycle of alertness and fatigue.

## References

### Papers

[^p1]: LECTOR: LLM-Enhanced Concept-based Test-Oriented Repetition for Adaptive Spaced Learning | Jiahao Zhao | 2025 | https://arxiv.org/abs/2508.03275v1 | arXiv:2508.03275v1 | source:ArXiv
[^p2]: Integrating Attentional Factors and Spacing in Logistic Knowledge Tracing Models to Explore the Impact of Training Sequences on Category Learning | 2024 | https://arxiv.org/abs/2407.15020 | arXiv:2407.15020 | source:ArXiv
[^p3]: Watch Your Step: Optimal Retrieval for Continual Learning at Scale | 2024 | https://arxiv.org/abs/2404.10758 | arXiv:2404.10758 | source:ArXiv
[^p4]: Integrating Curricula with Replays: Its Effects on Continual Learning | 2023 | https://arxiv.org/abs/2307.05747 | arXiv:2307.05747 | source:ArXiv
[^p5]: Adaptive Forgetting Curves for Spaced Repetition Language Learning | 2020 | https://arxiv.org/abs/2004.11327 | arXiv:2004.11327 | source:ArXiv
[^p6]: The effectiveness of spaced learning, interleaving, and retrieval practice in radiology education: a systematic review | CP Thompson, MA Hughes | 2023 | https://www.sciencedirect.com/science/article/pii/S1546144023006464 | source:Google Scholar
[^p7]: A spaced, interleaved retrieval practice tool that is motivating and effective | I YeckehZaare, P Resnick, B Ericson | 2019 | https://dl.acm.org/doi/abs/10.1145/3291279.3339411 | source:Google Scholar
[^p8]: The science of effective learning with spacing and retrieval practice | SK Carpenter, SC Pan, AC Butler | 2022 | https://www.nature.com/articles/s44159-022-00089-1 | source:Google Scholar
[^p9]: Spaced repetition promotes efficient and effective learning: Policy implications for instruction | SHK Kang | 2016 | https://journals.sagepub.com/doi/abs/10.1177/2372732215624708 | source:Google Scholar
[^p10]: Unveiling the Art of Effective Learning through Spaced Repetition and Evidence-Based Techniques | K Narkhede, R Patil, A Kasat… | 2024 | https://ieeexplore.ieee.org/abstract/document/10649261/ | source:Google Scholar
[^p11]: Repetition, Retrieval, and Spaced Practice | John Rogers | 2025 | https://doi.org/10.1002/9781405198431.wbeal20349 | DOI:10.1002/9781405198431.wbeal20349 | source:Crossref
[^p12]: Spaced Repetition and Retrieval Practice: Efficient Learning Mechanisms from a Cognitive Psychology Perspective and Their Empowerment by AI | Mengqi Huang | 2025 | https://doi.org/10.70267/ijassr.250206.3137 | DOI:10.70267/ijassr.250206.3137 | source:Crossref
[^p13]: Optimizing Retrieval-Augmented Generation of Medical Content for Spaced Repetition Learning | Jeremi Kaczmarek, Jakub Pokrywka, Krzysztof Biedalak, Grzegorz Kurzyp, Łukasz Grzybowski | 2025 | https://doi.org/10.5220/0013477700003932 | DOI:10.5220/0013477700003932 | source:Crossref
[^p14]: Interleaving Retrieval Practice Promotes Science Learning | Faria Sana, Veronica X. Yan | https://doi.org/10.31234/osf.io/cejqy | DOI:10.31234/osf.io/cejqy | source:Crossref
[^p15]: Personalized targeted memory reactivation enhances consolidation of challenging memories via slow wave and spindle dynamics | 2025 | https://arxiv.org/abs/2511.15013v1 | arXiv:2511.15013v1 | source:ArXiv
[^p16]: On Computational Modeling of Sleep-Wake Cycle | 2024 | https://arxiv.org/abs/2404.05484 | arXiv:2404.05484 | source:ArXiv
[^p17]: Wake-Sleep Consolidated Learning | 2024 | https://arxiv.org/abs/2401.08623 | arXiv:2401.08623 | source:ArXiv
[^p18]: Computational role of sleep in memory reorganization | Kensuke Yoshida,Taro Toyoizumi | 2023 | https://arxiv.org/abs/2304.02873 | arXiv:2304.02873 | source:ArXiv
[^p19]: A Study on Efficiency in Continual Learning Inspired by Human Learning | 2020 | https://arxiv.org/abs/2010.15187 | arXiv:2010.15187 | source:ArXiv
[^p20]: Sleep-dependent learning and memory consolidation | MP Walker, R Stickgold | 2004 | https://www.cell.com/neuron/fulltext/S0896-6273(04)00540-9?cc=y%3D&_returnURL=http://linkinghub.elsevier.com%2Fretrieve%2Fpii%2FS0896627304005409%3Fshowall%3Dtrue | source:Google Scholar
[^p21]: Memory consolidation during sleep: a neurophysiological perspective | GÖ BuzsÁk | 1998 | https://onlinelibrary.wiley.com/doi/abs/10.1046/j.1365-2869.7.s1.3.x | source:Google Scholar
[^p22]: Memory consolidation and reconsolidation: what is the role of sleep? | R Stickgold, MP Walker | 2005 | https://www.cell.com/trends/neurosciences/fulltext/S0166-2236(05)00159-1?large_figure=true | source:Google Scholar
[^p23]: Memory consolidation in sleep disorders | N Cellini | 2017 | https://www.sciencedirect.com/science/article/pii/S1087079216300958 | source:Google Scholar
[^p24]: Memory consolidation during sleep: interactive effects of sleep stages and HPA regulation | U Wagner, J Born | 2008 | https://www.tandfonline.com/doi/abs/10.1080/10253890701408822 | source:Google Scholar
[^p25]: Reactivation of memory-encoding dentate gyrus neurons during memory consolidation is associated with subregion-specific, learning- and sleep-mediated biosynthetic changes | L. Wang, S. Aton | 2024 | https://doi.org/10.1016/j.sleep.2023.11.554 | DOI:10.1016/j.sleep.2023.11.554 | source:Crossref
[^p26]: Post-learning sleep and over day reactivation through practice do not modulate motor memory consolidation | W. Stee, P. Peigneux | 2022 | https://doi.org/10.1016/j.sleep.2022.05.401 | DOI:10.1016/j.sleep.2022.05.401 | source:Crossref
[^p27]: Slow Wave Sleep and REM Sleep Awakenings Do Not Affect Sleep Dependent Memory Consolidation | 2009 | https://doi.org/10.5665/sleep/32.3.302 | DOI:10.5665/sleep/32.3.302 | source:Crossref
[^p28]: Dissecting Sleep-Dependent Learning and Memory Consolidation | Robert Stickgold | 2004 | https://doi.org/10.1093/sleep/27.8.1443 | DOI:10.1093/sleep/27.8.1443 | source:Crossref
[^p29]: Reactivation and Consolidation of Memory During Sleep | https://doi.org/10.1007/springerreference_302140 | DOI:10.1007/springerreference_302140 | source:Crossref
[^p30]: Noradrenergic-inspired gain modulation attenuates the stability gap in joint training | Alejandro Rodriguez-Garcia, Anindya Ghosh, Srikanth Ramaswamy | 2025 | https://arxiv.org/abs/2507.14056v1 | arXiv:2507.14056v1 | source:ArXiv
[^p31]: Memorization-Compression Cycles Improve Generalization | Fangyuan Yu | 2025 | https://arxiv.org/abs/2505.08727v1 | arXiv:2505.08727v1 | source:ArXiv
[^p32]: Impact of Nap on Performance in Different Working Memory Tasks Using EEG | 2023 | https://arxiv.org/abs/2311.08703 | arXiv:2311.08703 | source:ArXiv
[^p33]: Effects of wakeful rest on memory consolidation: A systematic review and meta-analysis | L Weng, J Yu, Z Lv, S Yang, ST Jülich, X Lei | 2025 | https://link.springer.com/article/10.3758/s13423-025-02665-x | source:Google Scholar
[^p34]: Comparing the effects of sleep and rest on memory consolidation | MA Tucker, GB Humiston, T Summer… | 2020 | https://www.tandfonline.com/doi/abs/10.2147/NSS.S223917 | source:Google Scholar
[^p35]: Offline memory consolidation during waking rest | EJ Wamsley | 2022 | https://www.nature.com/articles/s44159-022-00072-w | source:Google Scholar
[^p36]: The effects of wakeful rest on memory consolidation in an online memory study | O King, J Nicosia | 2022 | https://www.frontiersin.org/articles/10.3389/fpsyg.2022.932592/full | source:Google Scholar
[^p37]: Memory consolidation during wakeful rest: Evidence from EEG and fMRI | Xu LEI, Linman WENG, Jing YU | 2025 | https://doi.org/10.3724/sp.j.1042.2025.0729 | DOI:10.3724/sp.j.1042.2025.0729 | source:Crossref
[^p38]: Wakeful rest during storage and consolidation enhances priming effects for those with acquired memory impairment | Gerard A. Riley, Arthur Pearce | 2021 | https://doi.org/10.1080/09658211.2021.1907414 | DOI:10.1080/09658211.2021.1907414 | source:Crossref
[^p39]: Boosting Long-Term Memory via Wakeful Rest: Intentional Rehearsal Is Not Necessary, Consolidation Is Sufficient | Michaela Dewar, Jessica Alber, Nelson Cowan, Sergio Della Sala | 2014 | https://doi.org/10.1371/journal.pone.0109542 | DOI:10.1371/journal.pone.0109542 | source:Crossref
[^p40]: Neural substrates related to memory consolidation of learning multiple motor sequences during wakeful rest | Sungshin Kim, Seojin Yoon, Antoine Caraballo | https://doi.org/10.21203/rs.3.rs-7048121/v1 | DOI:10.21203/rs.3.rs-7048121/v1 | source:Crossref
[^p41]: Optimal Learning Rate Schedule for Balancing Effort and Performance | 2026 | https://arxiv.org/abs/2601.07830v1 | arXiv:2601.07830v1 | source:ArXiv
[^p42]: The Impact of Simple, Brief, and Adaptive Instructions within Virtual Reality Training: Components of Cognitive Load Theory in an Assembly Task | Rebecca L. Pharmer, Christopher D. Wickens, Lucas Plabst, Benjamin A. Clegg, Leanne M. Hirshfield, Joanna E. Lewis, Jalynn B. Nicoly, Cara A. Spencer, Francisco R. Ortega | 2025 | https://arxiv.org/abs/2507.20943v1 | arXiv:2507.20943v1 | source:ArXiv
[^p43]: Exploring the Optimal Time Window for Predicting Cognitive Load Using Physiological Sensor Data | 2024 | https://arxiv.org/abs/2406.13793 | arXiv:2406.13793 | source:ArXiv
[^p44]: Towards Cognitive Load Assessment Using Electrooculography Measures | 2023 | https://arxiv.org/abs/2312.11418 | arXiv:2312.11418 | source:ArXiv
[^p45]: A temporally quantized distribution of pupil diameters as a new feature for cognitive load classification | 2023 | https://arxiv.org/abs/2303.12757 | arXiv:2303.12757 | source:ArXiv
[^p46]: Last Update | WYW Learn, K Takeaways | https://goalsandprogress.com/8-patterns-of-highly-productive-people/ | source:Google Scholar
[^p47]: Sustaining Student Motivation Through Holistic Digital Design: A Case Study | H Malik | 2025 | https://search.proquest.com/openview/f7eb26abd6ae0adb4f290b307e4d3fbc/1?pq-origsite=gscholar&cbl=18750&diss=y | source:Google Scholar
[^p48]: The roadmap for academic success: Essential student strategies for time management, focus, beating procrastination, learning, and memory | RGCAD Sangeetha | 2024 | https://books.google.com/books?hl=en&lr=&id=iogFEQAAQBAJ&oi=fnd&pg=PT8&dq=optimal+learning+schedule+ultradian+rhythms+pomodoro+cognitive+load&ots=SaBSYjCppG&sig=6Jol0UrhOC3tmC00oLOSNgFlFv8 | source:Google Scholar
[^p49]: Feedback on Study Time and Distraction-Free Learning Environment | M Schmitz, J Rettstatt, M Suren, D Brand… | 2024 | https://library.oapen.org/bitstream/handle/20.500.12657/95973/9783839475713.pdf?sequence=1#page=260 | source:Google Scholar
[^p50]: Habits of the Highly Successful: Your Guide to Winning Every Day | B Bora | 2024 | https://books.google.com/books?hl=en&lr=&id=9DAPEQAAQBAJ&oi=fnd&pg=PT6&dq=optimal+learning+schedule+ultradian+rhythms+pomodoro+cognitive+load&ots=Pc6uj2EXVz&sig=7BZ_r5ZAsPg8PwETUiXUAOEc2BU | source:Google Scholar
[^p51]: Ultradian Cognitive Performance Rhythms During Sleep Deprivation | C. M. LaJambe, F. M. Brown | 2008 | https://doi.org/10.1007/978-1-4020-8352-5_13 | DOI:10.1007/978-1-4020-8352-5_13 | source:Crossref
[^p52]: Ultradian Lovesong Rhythms in Drosophila | C. P. Kyriacou | 2008 | https://doi.org/10.1007/978-1-4020-8352-5_7 | DOI:10.1007/978-1-4020-8352-5_7 | source:Crossref
[^p53]: Ontogenesis of Human Ultradian Rhythms | Toke Hoppenbrouwers | 1992 | https://doi.org/10.1007/978-1-4471-1969-2_9 | DOI:10.1007/978-1-4471-1969-2_9 | source:Crossref
[^p54]: Endocrine Ultradian Rhythms During Sleep and Wakefulness | G. Brandenberger | 1992 | https://doi.org/10.1007/978-1-4471-1969-2_7 | DOI:10.1007/978-1-4471-1969-2_7 | source:Crossref
[^p55]: The Sleep-Wake Threshold in Human Circadian Rhythms as a Determinant of Ultradian Rhythms | R. A. Wever | 1992 | https://doi.org/10.1007/978-1-4471-1969-2_15 | DOI:10.1007/978-1-4471-1969-2_15 | source:Crossref
[^p56]: Compensatory Mechanisms in Non-principal Multimedia Learning: The Interplay of Local and Global Information Processing | 2024 | https://arxiv.org/abs/2409.12593 | arXiv:2409.12593 | source:ArXiv
[^p57]: A Coupled Neural Field Model for the Standard Consolidation Theory | 2024 | https://arxiv.org/abs/2404.02938 | arXiv:2404.02938 | source:ArXiv
[^p58]: A learning gap between neuroscience and reinforcement learning | 2021 | https://arxiv.org/abs/2104.10995 | arXiv:2104.10995 | source:ArXiv
[^p59]: Short breaks and micro vacations: scale development and validation of micro vacation motivation | Huawen Shen, Yi Hu | 2025 | https://doi.org/10.1108/tr-02-2024-0131 | DOI:10.1108/tr-02-2024-0131 | source:Crossref
[^p60]: Level of M1 GABAB predicts micro offline consolidation of motor learning during wakefulness | Pasquale Cardellicchio, Sara Borgomaneri | 2025 | https://doi.org/10.1038/s41539-025-00299-1 | DOI:10.1038/s41539-025-00299-1 | source:Crossref
[^p61]: Micro-consolidation occurs when learning an implicit motor sequence, but is not influenced by HIIT exercise | Emily Brooks, Sarah Wallis, Joshua Hendrikse, James Coxon | 2024 | https://doi.org/10.1038/s41539-024-00238-6 | DOI:10.1038/s41539-024-00238-6 | source:Crossref
[^p62]: Active and Passive Offline Breaks Differentially Impact the Consolidation of Procedural MotorMemories in Children and Adults | Dimitri Voisin, Philippe Peigneux, Charline Urbain | https://doi.org/10.31219/osf.io/se45v | DOI:10.31219/osf.io/se45v | source:Crossref
[^p63]: Learning, sleep replay and consolidation of contextual fear memories: A neural network model | Lars Werne, Angus Chadwick, Peggy Seriès | https://doi.org/10.1101/2025.06.20.660661 | DOI:10.1101/2025.06.20.660661 | source:Crossref
[^p64]: Brain rhythms in cognition -- controversies and future directions | Anne Keitel, Christian Keitel, Mohsen Alavash, Karin Bakardjian, Christopher S.Y. Benwell, Sophie Bouton, Niko A. Busch, Antonio Criscuolo, Keith B. Doelling, Laura Dugue, Laetitia Grabot, Joachim Gross, Simon Hanslmayr, Laura-Isabelle Klatt, Daniel S. Kluger, Gemma Learmonth, Raquel E. London, Christina Lubinus, Andrea E. Martin, Jonas Obleser, Johanna M. Rimmele, Vincenzo Romei, Manuela Ruzzoli, Felix Siebenhuhner, Sophie Slaats, Eelke Spaak, Luca Tarasi, Gregor Thut, Jelena Trajkovic, Danying Wang, Malte Wostmann, Benedikt Zoefel, Satu Palva, Paul Sauseng, Sonja A. Kotz | 2025 | https://arxiv.org/abs/2507.15639v1 | arXiv:2507.15639v1 | source:ArXiv
[^p65]: Multimodal Modeling of Ultradian Rhythms Using the Hankel Alternative View of Koopman (HAVOK) Analysis | Emmanuel Molefi, Billy C. Smith, Christopher Thornton, Peter N. Taylor, Yujiang Wang | 2025 | https://arxiv.org/abs/2505.08953v1 | arXiv:2505.08953v1 | source:ArXiv
[^p66]: Evidence of Cognitive Deficits andDevelopmental Advances in Generative AI: A Clock Drawing Test Analysis | 2024 | https://arxiv.org/abs/2410.11756 | arXiv:2410.11756 | source:ArXiv
[^p67]: A Dynamic Systems Approach to Modelling Human-Machine Rhythm Interaction | 2024 | https://arxiv.org/abs/2407.09538 | arXiv:2407.09538 | source:ArXiv
[^p68]: The circadian brain and cognition | C Cajochen, C Schmidt | 2025 | https://www.annualreviews.org/content/journals/10.1146/annurev-psych-022824-043825 | source:Google Scholar
[^p69]: Prioritizing Employee Health and Well-Being for Organizational Success | UK Ghosh | https://www.academia.edu/download/124438516/HARNESSIG_CHRONOBIOLOGY.pdf | source:Google Scholar
[^p70]: How Sleep Deprivation and Optimization May Impact Health and Performance | B Williams, P Oneid | 2025 | https://journalofcomprehensivehealth.co.in/how-sleep-deprivation-and-optimization-may-impact-health-and-performance/ | source:Google Scholar
[^p71]: Harnessing Chronobiology for a Healthier and More Productive Workforce: Chronobiology at Work | Y Kalra, P Kour | 2025 | https://www.igi-global.com/chapter/harnessing-chronobiology-for-a-healthier-and-more-productive-workforce/377944 | source:Google Scholar
[^p72]: The Restoration Factor: How Different Recovery Strategies Support Sustainable High Performance in Business | R Reid, CEO Confidant, I Zone | https://richard-reid.com/the-restoration-factor-how-different-recovery-strategies-support-sustainable-high-performance-in-business/ | source:Google Scholar
[^p73]: Symposium: Ultradian and circadian rhythms: A world apart? | R. Hardeland, I. Balzer | 1992 | https://doi.org/10.1080/09291019209360164 | DOI:10.1080/09291019209360164 | source:Crossref
[^p74]: Ultradian Rhythms During Sustained Performance | D. F. Kripke, D. J. Mullaney, P. A. Fleck | 1985 | https://doi.org/10.1007/978-3-642-70483-3_14 | DOI:10.1007/978-3-642-70483-3_14 | source:Crossref
[^p75]: Sex differences in sensorimotor, cognitive and affective ultradian psychological rhythms a preliminary report | C. Tragakis, A. Morton | 1973 | https://doi.org/10.1080/09291017309359397 | DOI:10.1080/09291017309359397 | source:Crossref
[^p76]: Ultradian rhythms in EEG and performance; an assessment of individual differences in the basic rest-activity cycle. | Roseanne Armitage | https://doi.org/10.22215/etd/1986-01156 | DOI:10.22215/etd/1986-01156 | source:Crossref
[^p77]: Do Your Best and Get Enough Rest for Continual Learning | Hankyul Kang, Gregor Seifer, Donghyun Lee, Jongbin Ryu | 2025 | https://arxiv.org/abs/2503.18371v1 | arXiv:2503.18371v1 | source:ArXiv
[^p78]: TRACING COGNITIVE SHIFTS: SHORT-TERM MEMORY LOSS TRENDS IN PHYSICAL EDUCATION STUDENTS ACROSS A DECADE (2010–2025) | M Saba, F Chohan, R Aisha… | 2025 | http://www.pjssrjournal.com/index.php/Journal/article/view/458 | source:Google Scholar
[^p79]: Sleep and Cognitive Performance: Learning, Memory, and Mental Clarity | A Juginović | 2025 | https://link.springer.com/chapter/10.1007/978-3-031-92060-8_8 | source:Google Scholar
[^p80]: The Relationship of Sleep Quality to English Cognitive Performance of Tertiary Level Students | QIU CHEN, LI JIEYING, WU QIONG… | 2025 | https://al-kindipublishers.org/index.php/jweep/article/view/10723 | source:Google Scholar
[^p81]: Systems memory consolidation during sleep: oscillations, neuromodulators, and synaptic remodeling | J Kim, M Park | 2025 | https://pmc.ncbi.nlm.nih.gov/articles/PMC12576410/ | source:Google Scholar
[^p82]: A Review of Short-Term, Long-Term, and Memory Consolidation Mechanisms in the Hippocampus and Cerebral Cortex | Z Yang, ASBM Khairuddin, CJ Huang, WW Ru… | 2025 | https://ieeexplore.ieee.org/abstract/document/10942600/ | source:Google Scholar
[^p83]: Sleep and Hippocampal Memory Consolidation | Emily Nicole Walsh, Ted Abel | 2025 | https://doi.org/10.1093/oxfordhb/9780190069162.013.12 | DOI:10.1093/oxfordhb/9780190069162.013.12 | source:Crossref
[^p84]: Faculty Opinions recommendation of Mutant neuropeptide S receptor reduces sleep duration with preserved memory consolidation. | Paul Franken | 2020 | https://doi.org/10.3410/f.736761181.793572524 | DOI:10.3410/f.736761181.793572524 | source:Crossref
[^p85]: Sleep-Dependent System Consolidation of Memory | 2012 | https://doi.org/10.1007/978-1-4419-1428-6_5738 | DOI:10.1007/978-1-4419-1428-6_5738 | source:Crossref
[^p86]: Both Duration and Timing of Sleep are Important to Memory Consolidation | Gina R. Poe, Christine M. Walsh, Theresa E. Bjorness | 2010 | https://doi.org/10.1093/sleep/33.10.1277 | DOI:10.1093/sleep/33.10.1277 | source:Crossref

### URLs

[^u1]: Boost Your Focus with Brown Noise and 'Gap-Effects' | https://www.youtube.com/watch?v=UP4Y0KZdg9Q | source:organic | pos:1
[^u2]: How to Study Andrew Huberman | https://www.tiktok.com/discover/how-to-study-andrew-huberman | source:organic | pos:2
[^u3]: Dr. Patrick's Brain Health Tips | https://www.instagram.com/popular/Dr.-Patrick's-Brain-Health-Tips/ | source:organic | pos:3
[^u4]: Focus and Learning Dr Huberman | https://www.tiktok.com/discover/focus-and-learning-dr-huberman | source:organic | pos:4
[^u5]: Mind The Gap Mental Health Retrieval | https://www.instagram.com/popular/mind-the-gap-mental-health-retrieval/ | source:organic | pos:5
[^u6]: visual field paradigm | https://www.science.gov/topicpages/v/visual+field+paradigm | source:organic | pos:6
[^u7]: Optimal Protocols for Studying & Learning | https://scripod.com/episode/nsz96d4efh2iywz6wokk1932/chapters | source:organic | pos:7
[^u8]: How to Train Your Brain to Learn Faster and Remember ... | https://www.tiktok.com/discover/how-to-train-your-brain-to-learn-faster-and-remember-more | source:organic | pos:8
[^u9]: Social Media and Export Innovation: The Role of Digital ... | https://www.ln.edu.hk/oge/f/page/113738/AIB-AP-2024_All-Extended-Abstract_20241126_compressed.pdf | source:organic | pos:9
[^u10]: Dr Fab Brain Health Tips | https://www.instagram.com/popular/dr-fab-brain-health-tips/ | source:organic | pos:10
[^u11]: Tapping Into Your Ultradian Rhythms For Max Productivity | https://www.asianefficiency.com/productivity/ultradian-rhythms/ | source:organic | pos:1
[^u12]: The 90-Minute Ultradian Rhythm: A Simple Explanation | https://www.somratri.com/resources/ultradian-rhythm-90min-explained | source:organic | pos:2
[^u13]: The Science of Time Blocks: Why 90-Minute Focus ... | https://ahead-app.com/blog/procrastination/the-science-of-time-blocks-why-90-minute-focus-sessions-transform-your-productivity-20241227-203316 | source:organic | pos:3
[^u14]: Ultradian Rhythms: Enhancing Productivity and Well-being | https://www.larksuite.com/en_us/topics/productivity-glossary/ultradian-rhythms | source:organic | pos:4
[^u15]: When is the Best Time to Study for the ASWB? | https://agentsofchangeprep.com/blog/study-times-aswb-exam/ | source:organic | pos:5
[^u16]: Ultradian Rhythms and Shift Design: 90-Minute Productivity ... | https://www.myshyft.com/blog/ultradian-rhythm-shift-design/ | source:organic | pos:6
[^u17]: 90 Min Hours - www .ec -undp | https://www.ec-undp-electoralassistance.org/default.aspx/textbooks/b9NL6A/90-Min-Hours.pdf | source:organic | pos:7
[^u18]: Ultradian cycles | https://ai.hubermanlab.com/s/KA70SBrh | source:organic | pos:8
[^u19]: Ultradian Cycles: The 90-Minute Secret to Sustained Deep Work | https://locu.app/blog/ultradian-cycles-deep-work | source:organic | pos:9
[^u20]: A neurobiologist's guide to a healthy and productive day | https://ahappyphd.org/posts/chronobiology-addendum/ | source:organic | pos:10
[^u21]: Comparative efficacy of cognitive training modalities in ... | https://pmc.ncbi.nlm.nih.gov/articles/PMC12321626/ | source:organic | pos:1
[^u22]: Measuring spelling skills: A meta-analysis of the ... | https://www.sciencedirect.com/science/article/pii/S1747938X25000430 | source:organic | pos:2
[^u23]: The effects of note-taking methods on lasting learning | https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2025.1697151/full | source:organic | pos:3
[^u24]: Active Recall vs. Passive Reading Outcomes | https://elicit.com/review/d09bacbb-ad66-4ff3-b2e6-147d1f6b8fe8 | source:organic | pos:4
[^u25]: Spaced repetition and active recall improves academic ... | https://pubmed.ncbi.nlm.nih.gov/41135423/ | source:organic | pos:5
[^u26]: Meta-analysis of randomized controlled trials examining ... | https://www.nature.com/articles/s41562-025-02209-2 | source:organic | pos:6
[^u27]: Meta-Analysis of Mobile VR and Cognitive Learning ... | https://www.tandfonline.com/doi/full/10.1080/15366367.2025.2535096?src= | source:organic | pos:7
[^u28]: Self-Testing and Follow-Through of Learning Strategies ... | https://www.lifescied.org/doi/10.1187/cbe.24-04-0128 | source:organic | pos:8
[^u29]: The Influence of Active and Passive Procrastination on ... | https://www.researchgate.net/publication/379062139_The_Influence_of_Active_and_Passive_Procrastination_on_Academic_Performance_A_Meta-Analysis | source:organic | pos:9
[^u30]: The Use of Retrieval Practice in the Health Professions | https://scholarworks.indianapolis.iu.edu/bitstreams/463b3a50-efbe-4219-ac1c-da6a844e9866/download | source:organic | pos:10


# Generalized Framework for Effective Learning and Long-Term Memory Retention

## I. The Cognitive Architecture of Learning

Effective learning strategies are rooted in understanding the biological and psychological limits of the human brain. By respecting these architectural constraints, learners can optimize how they process, store, and retrieve information.

### 1. Working Memory and Cognitive Load

**The Working Memory Bottleneck**
Working memory serves as the brain's "scratchpad," a temporary workspace where information is processed before being encoded into long-term memory. Research consistently shows that this system has a severe capacity limit, typically capable of holding only 4–5 discrete "chunks" of information at a time [^p113]. In the context of complex subjects like mathematics and physics, this bottleneck explains why students often fail to solve problems even when they understand the individual components: their working memory is overwhelmed by trying to hold too many variables simultaneously.

Expert performance helps bypass this biological limit through "chunking"—the process of binding individual pieces of information into larger, meaningful units. For instance, a novice physicist sees a complex equation as a string of unrelated symbols ($F$, $=$, $m$, $a$), consuming four units of working memory. An expert sees Newton's Second Law as a single conceptual chunk, freeing up capacity for higher-order reasoning.

**Cognitive Load Theory (CLT)**
Cognitive Load Theory provides a framework for managing the mental effort required for learning. It categorizes load into three distinct types:

*   **Intrinsic Load**: This corresponds to the inherent difficulty of the material itself. In physics, calculating a tensor product has a naturally high intrinsic load due to the complexity of the interacting elements. This load is fixed by the curriculum but can be managed by breaking complex tasks into smaller, isolated sub-tasks [^p122] [^p124].
*   **Extraneous Load**: This refers to mental effort wasted on irrelevant activities or poor instructional design. For example, searching for a formula in a disorganized textbook or deciphering unclear variables in a diagram consumes working memory without aiding learning. Minimizing extraneous load is crucial; effective learning environments eliminate distractions and present information clearly to preserve resources for actual processing [^p76] [^p118].
*   **Germane Load**: This is the "good" cognitive load—the mental effort dedicated to constructing schemas and moving information into long-term memory. It involves deep processing, such as connecting a new mathematical proof to a previously learned theorem. The goal of effective study is to maximize germane load while keeping the total load (Intrinsic + Extraneous + Germane) within the limits of working memory [^p126] [^p129].

### 2. The Locus of Effort (The "Cognitive Shift")

**Active Synthesis vs. Self-Awareness**
The rise of advanced tools like Large Language Models (LLMs) is fundamentally shifting where learners should place their cognitive effort. Historically, the "heavy lifting" of learning involved searching for information and synthesizing disparate sources. Today, the "Interaction-Outcome Paradox" suggests that while AI can simulate rich interactions, it does not automatically guarantee better learning outcomes unless the user actively regulates the process [^p51].

The new locus of effort must shift from *acquisition* to *articulation of gaps*. Instead of spending hours finding a derivation, a physics student should use tools to generate the derivation and then spend their energy identifying exactly which step they do not understand. This "cognitive shift" requires high metacognitive awareness—the ability to monitor one's own understanding. Success now depends on the learner's ability to scaffold their own productive cognitive work, moving from passive consumption of synthesized answers to active interrogation of their own knowledge structures [^p142] [^p148].

## II. Optimal Timing and Duration of Offline Intervals (Breaks)

Learning is not a continuous uptake of information; it is a rhythmic process where "offline" periods are as critical as "online" study. Neural replay, the rapid reactivation of neural patterns established during learning, occurs during these rest periods and is essential for stabilization.

### 1. Conceptual Learning (Theory, Semantic Knowledge)

**The "Wakeful Rest" Protocol**
For semantic learning—such as understanding the theoretical underpinnings of Quantum Mechanics or historical dates—immediate post-learning rest is transformative. Research indicates that a period of **10–15 minutes of quiet rest** immediately following a learning session can improve retention by **10–30%** [^p43] [^p44].

*   **Protocol Details**: This rest must be "preservative," meaning minimal sensory input. The learner should sit quietly with eyes closed or stare at a blank wall. Crucially, this means **no phone, no music, no reading, and no social interactions**.
*   **Mechanism**: During this wakeful rest, the hippocampus engages in "neural replay," firing the same sequence of neurons used during the study session but at a compressed speed (20x faster). This replay transfers the fragile hippocampal memory trace to the more stable neocortex. Incoming sensory data (like checking an email) creates "sensory interference" that disrupts this delicate replay process [^p47] [^p48].

### 2. Procedural Learning (Mathematics, Logic, Skills)

**Interleaved Rest and Procedural Fatigue**
Procedural skills, such as solving differential equations or writing code, rely on different neural pathways (often involving the striatum and motor cortex). For these tasks, "procedural fatigue" sets in quickly.
*   **Micro-Breaks**: Short breaks of **2–5 minutes** between practice sets are effective. These are not deep consolidation breaks but "reset" breaks to replenish neurotransmitters and attention [^p59] [^p261].
*   **The Pomodoro Technique Variant**: While the standard 25-minute work / 5-minute break is popular, complex math problems may require longer "flow" states. A modified flow-time approach (working until focus breaks, then resting for 15-20% of the work time) is often superior for STEM subjects [^p258] [^p260].

**Consolidation Window**
A critical distinction for procedural memory is its reliance on "between-session" improvement. Unlike semantic facts which degrade over time without review, procedural skills often show spontaneous improvement *after* a delay, specifically overnight. This "offline gain" means a student might struggle with a calculus problem in the evening but solve it easily the next morning without additional practice, provided they slept well. The most significant consolidation for these skills happens during sleep rather than during short wakeful breaks [^p6] [^p8].

## III. Biological and Cognitive Roles of Sleep

Sleep is the primary engine of long-term memory consolidation. It is not merely a passive state of rest but an active neurological state where different stages of sleep perform distinct "save operations" for different types of data.

### Comprehensive Sleep-Memory Matrix

| Memory Type | Target Subject Area | Primary Sleep Stage | Biological Mechanism | Actionable Strategy |
| :--- | :--- | :--- | :--- | :--- |
| **Semantic** | Theory, Definitions, Facts (e.g., Biology terms, History) | **SWS (Slow Wave Sleep)** <br> *(Deep Sleep, NREM 3)* | **System Consolidation**: Hippocampal sharp-wave ripples coordinate with cortical slow oscillations to "harden" facts into the neocortex [^p21] [^p23]. | Prioritize core sleep (first 4 hours). Avoid alcohol/caffeine which suppress SWS. Review hard facts just before bed. |
| **Episodic** | Context, Specific Events (e.g., Case studies, Lab experiments) | **NREM 2 & SWS** | **Contextual Binding**: Protects memories from interference. Sleep "strips" the context to extract generalized rules from specific episodes [^p26] [^p27]. | Ensure a consistent sleep environment. "Replay" the day's key events mentally before sleep to tag them for processing. |
| **Procedural** | Mathematics, Coding, Motor Skills, Instruments | **REM (Rapid Eye Movement)** & **NREM 2 Spindles** | **Synaptic Refinement**: NREM 2 sleep spindles facilitate motor/skill refinement. REM supports "insight" and reorganization of complex logical patterns [^p13] [^p20]. | Do not cut sleep short in the morning; the longest REM cycles occur in the final 2 hours of an 8-hour sleep. |

**Sleep Reorganization and Insight**
While NREM sleep stabilizes memories (prevents forgetting), REM sleep reorganizes them (facilitates understanding). This is why "sleeping on a problem" works. During REM, the brain tests random associations between loosely related neural networks, often leading to "insight"—the sudden realization of a solution to a complex math or physics problem that was unsolvable the day before [^p20] [^p25].

## IV. Best Practices for Scheduling Study Sessions

Strategic scheduling aligns study sessions with biological circadian rhythms to maximize retention. This approach, known as "chronolearning," respects the fluctuation of hormones and cognitive resources throughout the day.

### 1. Morning: "Semantic Exploration"
*   **Optimal Tasks**: Learning new theories, broad reading, conceptual exploration (e.g., reading a textbook chapter on General Relativity, learning new vocabulary).
*   **Rationale**: Research on circadian rhythms suggests that "local semantic entropy"—a measure of the brain's willingness to explore broad, novel connections—peaks in the morning hours. The brain is chemically primed for acquiring new, unstructured information. It is the best time for "searching" and "broadening" the knowledge base before cognitive fatigue sets in [^p61].

### 2. Evening: "Procedural Practice & Consolidation"
*   **Optimal Tasks**: Mathematical problem-solving, debugging code, practicing derivation steps, rehearsing flashcards.
*   **Rationale**: Procedural memory consolidation is promoted by scheduling practice closer to evening hours and sleep. Late-day activity often involves "accumulating" and "refining" established topics. Furthermore, doing rote procedural practice (like solving 10 integrals) in the evening leverages the proximity to sleep, minimizing the interference that might occur if one went back to a busy day of work immediately after [^p6] [^p12].

### 3. Chronotype Synchronization
*   **Midpoint Management**: A "one size fits all" schedule fails because biological clocks differ. Many young adults (college age) have a late chronotype, with a median sleep midpoint around 5:00 AM (e.g., sleeping 1:00 AM to 9:00 AM) [^p62].
*   **The "Feeling Best" Rule**: Forcing an "owl" (evening person) to do high-load calculus at 8:00 AM can lead to performance deficits equivalent to legal intoxication. Learners should identify their peak alertness window—often measuring this by tracking when they naturally wake up without an alarm—and schedule their highest "Intrinsic Load" tasks (the hardest math problems) during that window [^p68] [^p305].

## V. Adapting Strategies Across Diverse Subjects

The "how" of studying must change depending on the "what." Mathematics (highly structured, hierarchical) requires different strategies than theoretical philosophy (abstract, semantic).

### 1. Interleaving: The Discrimination Strategy
Interleaving involves mixing different types of problems within a single study session, rather than doing them in blocks (e.g., doing A, B, C, A, C, B instead of A, A, A, B, B, B).

*   **For Mathematics & Physics**: This is non-negotiable for mastery.
    *   *Blocked Practice*: A student solves 10 problems on "The Chain Rule." They stop thinking about *which* rule to apply and just apply the chain rule mechanically.
    *   *Interleaved Practice*: A student solves a derivative, then an integral, then a limit. They must first identify the *type* of problem (discrimination) before solving it. This forces the brain to focus on differences between concepts, which builds robust, flexible long-term memory [^p33] [^p179].
*   **For Theory**: Interleaving helps distinguish between easily confused concepts (e.g., "Constructivism" vs. "Constructionism").

### 2. Subject-Switching and Interference
*   **Restoring Capacity**: When cognitive resources for one domain are depleted, switching to a vastly different domain can restore capacity. Transitioning from **Math to History** allows the "math circuits" (spatial-numerical) to recover while the "history circuits" (verbal-narrative) engage. This is more effective than switching from Math to Physics, which causes "procedural interference" because both rely on similar neural resources [^p34] [^p58].
*   **The "Mixed Mode" Advantage**: In deductive domains like physics, mixing strategies improves transfer.
    *   *Forward-Chaining*: Starting from givens and working toward the solution.
    *   *Backward-Chaining*: Starting from the goal and working backward to the givens.
    *   *Synthesis*: Learners should practice both. For example, prove a theorem forward, then erase it and try to derive the premises from the conclusion. This builds a bidirectional neural pathway [^p32].

## VI. Implementation Guidelines for Long-Term Retention

To convert this research into a daily routine, learners should follow these structured guidelines.

### 1. The Expanding Schedule (Spaced Repetition)
Do not cram. Use an expanding schedule of repetitions to optimize the "spacing effect." The ideal intervals for reviewing a concept after the initial learning session are:
*   **First Review**: 1 day later
*   **Second Review**: 3 days later
*   **Third Review**: 1 week later
*   **Fourth Review**: 1 month later
*   **Mechanism**: Retrieving information just as it is about to be forgotten triggers a powerful "reconsolidation" process that strengthens the memory trace significantly more than reviewing it when it is fresh [^p5] [^p183].

### 2. Targeted Reactivation (Retrieval Practice)
*   **Self-Testing**: Passive re-reading is the least effective study method. Active retrieval (testing yourself without looking at notes) is the most effective.
*   **Sleep-Leverage**: Identify the 3-5 most difficult "chunks" of information (e.g., a confusing formula, a hard-to-remember constant). Review these specifically in the 20 minutes before sleep. This "priming" increases the probability that the brain will select these specific memories for replay and consolidation during SWS and REM sleep [^p1].

### 3. The "No-Interference" Break (Sacred Rest)
Treat the 15 minutes after an intense study session as "sacred."
*   **The Rule**: After 50-90 minutes of high-intensity learning (especially heavy conceptual loads), do absolutely nothing for 15 minutes.
*   **The Ban**: Avoid social media, news, podcasts, or fast-paced music.
*   **The Goal**: Protect the fragile initial memory trace from "catastrophic interference" by incoming data. Let the dust settle before walking back into the storm [^p43] [^p46].

### Summary Checklist for the Learner

| Phase | Actionable Tactic | Why? |
| :--- | :--- | :--- |
| **Planning** | Schedule "heavy" math for your peak energy time (PM for owls, AM for larks). | Align with circadian peaks in working memory. |
| **During Study** | Interleave problems (A, C, B) rather than block them (A, A, A). | Forces "discrimination" learning; prevents robotic solving. |
| **Breaks** | Take 2-min "micro-breaks" during math; 15-min "wakeful rest" after theory. | Resets attention for skills; consolidates neural traces for facts. |
| **Transition** | Switch between dissimilar subjects (Math $\to$ Literature) to refresh. | Reduces cognitive interference and resource depletion. |
| **Pre-Sleep** | Review the "hardest items" briefly. | Primes the brain for targeted consolidation during sleep. |
| **Next Day** | Test yourself (retrieve) before re-reading. | Strengthening neural pathways requires active retrieval effort. |

![Figure: Learning Process Workflow](https://generated_image_url) *Note: Since image generation is not available in this text-only response, imagine a flowchart here visualizing the cycle: Study (Interleaved) -> Wakeful Rest (No phone) -> Subject Switch -> Evening Practice -> Sleep Consolidation.*

## References

### Papers

[^p1]: Personalized targeted memory reactivation enhances consolidation of challenging memories via slow wave and spindle dynamics | 2025 | https://arxiv.org/abs/2511.15013v1 | arXiv:2511.15013v1 | source:ArXiv
[^p2]: When Can Large Reasoning Models Save Thinking? Mechanistic Analysis of Behavioral Divergence in Reasoning | Rongzhi Zhu, Yi Liu, Zequn Sun, Yiwei Wang, Wei Hu | 2025 | https://arxiv.org/abs/2505.15276v1 | arXiv:2505.15276v1 | source:ArXiv
[^p3]: Integrating Attentional Factors and Spacing in Logistic Knowledge Tracing Models to Explore the Impact of Training Sequences on Category Learning | 2024 | https://arxiv.org/abs/2407.15020 | arXiv:2407.15020 | source:ArXiv
[^p4]: One system for learning and remembering episodes and rules | 2024 | https://arxiv.org/abs/2407.05884 | arXiv:2407.05884 | source:ArXiv
[^p5]: Adaptive Forgetting Curves for Spaced Repetition Language Learning | 2020 | https://arxiv.org/abs/2004.11327 | arXiv:2004.11327 | source:ArXiv
[^p6]: Procedural memory consolidation in attention-deficit/hyperactivity disorder is promoted by scheduling of practice to evening hours | M Korman, I Levy, A Karni | 2017 | https://www.frontiersin.org/articles/10.3389/fpsyt.2017.00140/full | source:Google Scholar
[^p7]: Deconstructing procedural memory: Different learning trajectories and consolidation of sequence and statistical learning | P Simor, Z Zavecz, K Horváth, N Éltető, C Török… | 2019 | https://www.frontiersin.org/articles/10.3389/fpsyg.2018.02708/full | source:Google Scholar
[^p8]: Atypical within-session motor procedural learning after traumatic brain injury but well-preserved between-session procedural memory consolidation | M Korman, S Shaklai, K Cisamariu, C Gal… | 2018 | https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2018.00010/full | source:Google Scholar
[^p9]: Memory consolidation for duration | R Cocenas | 2014 | https://journals.sagepub.com/doi/abs/10.1080/17470218.2013.863375 | source:Google Scholar
[^p10]: 'Sleep-dependent'memory consolidation? Brief periods of post-training rest and sleep provide an equivalent benefit for both declarative and procedural memory | SY Wang, KC Baker, JL Culbreth, O Tracy… | 2021 | https://learnmem.cshlp.org/content/28/6/195.short | source:Google Scholar
[^p11]: 0139 Optimizing Closed-Loop Auditory Stimulation Timing to Maximize Procedural Memory Consolidation | Jing Zhang, Bryan Baxter, Katherine Ostrow, Dara Manoach | 2025 | https://doi.org/10.1093/sleep/zsaf090.0139 | DOI:10.1093/sleep/zsaf090.0139 | source:Crossref
[^p12]: The Timing of Learning before Night-Time Sleep Differentially Affects Declarative and Procedural Long-Term Memory Consolidation in Adolescents | Johannes Holz, Hannah Piosczyk, Nina Landmann, Bernd Feige, Kai Spiegelhalder, Dieter Riemann et al. | 2012 | https://doi.org/10.1371/journal.pone.0040963 | DOI:10.1371/journal.pone.0040963 | source:Crossref
[^p13]: Procedural Memory Consolidation | 2012 | https://doi.org/10.1007/978-1-4419-1428-6_5344 | DOI:10.1007/978-1-4419-1428-6_5344 | source:Crossref
[^p14]: Representations in a recurrent network model of motor sequence learning reveal unified view of procedural memory consolidation and structure learning | Triesch Jochen | 2012 | https://doi.org/10.3389/conf.fncom.2012.55.00069 | DOI:10.3389/conf.fncom.2012.55.00069 | source:Crossref
[^p15]: Both Duration and Timing of Sleep are Important to Memory Consolidation | Gina R. Poe, Christine M. Walsh, Theresa E. Bjorness | 2010 | https://doi.org/10.1093/sleep/33.10.1277 | DOI:10.1093/sleep/33.10.1277 | source:Crossref
[^p16]: SI-SD: Sleep Interpreter through awake-guided cross-subject Semantic Decoding | 2024 | https://arxiv.org/abs/2309.16457 | arXiv:2309.16457 | source:ArXiv
[^p17]: Wake-Sleep Consolidated Learning | 2024 | https://arxiv.org/abs/2401.08623 | arXiv:2401.08623 | source:ArXiv
[^p18]: Domain Invariant Representation Learning and Sleep Dynamics Modeling for Automatic Sleep Staging | 2023 | https://arxiv.org/abs/2312.03196 | arXiv:2312.03196 | source:ArXiv
[^p19]: Impact of Nap on Performance in Different Working Memory Tasks Using EEG | 2023 | https://arxiv.org/abs/2311.08703 | arXiv:2311.08703 | source:ArXiv
[^p20]: Computational role of sleep in memory reorganization | Kensuke Yoshida,Taro Toyoizumi | 2023 | https://arxiv.org/abs/2304.02873 | arXiv:2304.02873 | source:ArXiv
[^p21]: Sleep benefits prose memory consolidation in university students | F Conte, S Malloggi, O De Rosa, G Ficca, S Righi… | 2025 | https://www.mdpi.com/2076-3425/15/3/265 | source:Google Scholar
[^p22]: THE CONNECTION BETWEEN SLEEP PATTERNS AND MEMORY CONSOLIDATION: COUNSELING STRATEGIES FOR ENHANCING MEMORY BEFORE … | PI Tibi | https://unidel.edu.ng/cms/uploads/publications/unidel_pub_1696886613.pdf | source:Google Scholar
[^p23]: The effects of slow wave sleep characteristics on semantic, episodic, and procedural memory in people with epilepsy | Y Höller, S Eyjólfsdóttir, FJ Van Schalkwijk… | 2024 | https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2024.1374760/full | source:Google Scholar
[^p24]: The relationships between memory systems and sleep stages | G Rauchs, B Desgranges, J Foret… | 2005 | https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1365-2869.2005.00450.x | source:Google Scholar
[^p25]: The influence of sleep on memory | MA Mograss | 2007 | https://umontreal.scholaris.ca/items/ee4a5a49-5bf9-4407-bff4-0c524fc7b1bb | source:Google Scholar
[^p26]: Sleep-dependent memory consolidation in infants protects new episodic memories from existing semantic memories | Manuela Friedrich, Matthias Mölle, Angela D. Friederici, Jan Born | 2020 | https://doi.org/10.1038/s41467-020-14850-8 | DOI:10.1038/s41467-020-14850-8 | source:Crossref
[^p27]: Consolidation of Episodic Memory: An Epiphenomenon of Semantic Learning | Sen Cheng | 2017 | https://doi.org/10.1007/978-3-319-45066-7_4 | DOI:10.1007/978-3-319-45066-7_4 | source:Crossref
[^p28]: Semantic Representations in Episodic Memory Enhance Recall and Compositional Consolidation | Albert Albesa Gonzalez, Claudia Clopath | https://doi.org/10.2139/ssrn.5649199 | DOI:10.2139/ssrn.5649199 | source:Crossref
[^p29]: The Transition Matrix -- A classification of navigational patterns between LMS course sections | Tobias Hildebrandt, Lars Mehnen | 2025 | https://arxiv.org/abs/2506.13275v1 | arXiv:2506.13275v1 | source:ArXiv
[^p30]: Kwai-STaR: Transform LLMs into State-Transition Reasoners | 2024 | https://arxiv.org/abs/2411.04799 | arXiv:2411.04799 | source:ArXiv
[^p31]: Traditional lectures versus active learning -- a false dichotomy? | 2024 | https://arxiv.org/abs/2206.12144 | arXiv:2206.12144 | source:ArXiv
[^p32]: Mixing Backward- with Forward-Chaining for Metacognitive Skill Acquisition and Transfer | 2023 | https://arxiv.org/abs/2303.12223 | arXiv:2303.12223 | source:ArXiv
[^p33]: Interleaved learning in elementary school mathematics: Effects on the flexible and adaptive use of subtraction strategies | L Nemeth, K Werker, J Arend, S Vogel… | 2019 | https://www.frontiersin.org/articles/10.3389/fpsyg.2019.00086/full | source:Google Scholar
[^p34]: Applying interleaving strategy of learning materials and perceptual modality to address secondary students' need to restore cognitive capacity | W Chen, C Chen, B Li, J Zhang | 2022 | https://www.mdpi.com/1660-4601/19/12/7505 | source:Google Scholar
[^p35]: Interleaving strategies | B Heeren, J Jeuring | 2011 | https://link.springer.com/chapter/10.1007/978-3-642-22673-1_14 | source:Google Scholar
[^p36]: Long-lasting effects of an instructional intervention on interleaving preference in inductive learning and transfer | Y Sun, A Shi, W Zhao, Y Yang, B Li, X Hu… | 2022 | https://link.springer.com/article/10.1007/s10648-022-09666-5 | source:Google Scholar
[^p37]: Why do learners (under) utilize interleaving in learning confusable categories? The role of metastrategic knowledge and utility value of distinguishing | R Abel, A de Bruin, E Onan, J Roelle | 2024 | https://link.springer.com/article/10.1007/s10648-024-09902-0 | source:Google Scholar
[^p38]: Qualitative vs Quantitative Data | 2017 | https://doi.org/10.4135/9781071809310 | DOI:10.4135/9781071809310 | source:Crossref
[^p39]: Qualitative vs. Quantitative | https://doi.org/10.4135/9781412985529.n1.3 | DOI:10.4135/9781412985529.n1.3 | source:Crossref
[^p40]: Figure 5: Qualitative vs. quantitative baselines. | https://doi.org/10.7717/peerj.4308/fig-5 | DOI:10.7717/peerj.4308/fig-5 | source:Crossref
[^p41]: A Qualitative &amp; Quantitative Analysis: Qualcomm, Incorporated VS VisaSat, Incorporated | Daina Migdel | https://doi.org/10.54014/vdqy-s3nr | DOI:10.54014/vdqy-s3nr | source:Crossref
[^p42]: Exploration of LLMs, EEG, and behavioral data to measure and support attention and sleep | 2024 | https://arxiv.org/abs/2408.07822 | arXiv:2408.07822 | source:ArXiv
[^p43]: Effects of wakeful rest on memory consolidation: A systematic review and meta-analysis | L Weng, J Yu, Z Lv, S Yang, ST Jülich, X Lei | 2025 | https://link.springer.com/article/10.3758/s13423-025-02665-x | source:Google Scholar
[^p44]: Comparing the effects of sleep and rest on memory consolidation | MA Tucker, GB Humiston, T Summer… | 2020 | https://www.tandfonline.com/doi/abs/10.2147/NSS.S223917 | source:Google Scholar
[^p45]: Offline memory consolidation during waking rest | EJ Wamsley | 2022 | https://www.nature.com/articles/s44159-022-00072-w | source:Google Scholar
[^p46]: The effects of wakeful rest on memory consolidation in an online memory study | O King, J Nicosia | 2022 | https://www.frontiersin.org/articles/10.3389/fpsyg.2022.932592/full | source:Google Scholar
[^p47]: Memory consolidation during wakeful rest: Evidence from EEG and fMRI | Xu LEI, Linman WENG, Jing YU | 2025 | https://doi.org/10.3724/sp.j.1042.2025.0729 | DOI:10.3724/sp.j.1042.2025.0729 | source:Crossref
[^p48]: Wakeful rest during storage and consolidation enhances priming effects for those with acquired memory impairment | Gerard A. Riley, Arthur Pearce | 2021 | https://doi.org/10.1080/09658211.2021.1907414 | DOI:10.1080/09658211.2021.1907414 | source:Crossref
[^p49]: Neural substrates related to memory consolidation of learning multiple motor sequences during wakeful rest | Sungshin Kim, Seojin Yoon, Antoine Caraballo | https://doi.org/10.21203/rs.3.rs-7048121/v1 | DOI:10.21203/rs.3.rs-7048121/v1 | source:Crossref
[^p50]: Failure to reproduce the effect of procedural memory interference on wakeful consolidation of episodic memory in younger and older adults | Lara Kamal, Busra Celik, Griffin Alpert, Samantha Gonzalez, Vian Nguyen, Michael Freedberg | https://doi.org/10.1101/2024.10.17.618844 | DOI:10.1101/2024.10.17.618844 | source:Crossref
[^p51]: Exploring The Interaction-Outcome Paradox: Seemingly Richer and More Self-Aware Interactions with LLMs May Not Yet Lead to Better Learning | 2025 | https://arxiv.org/abs/2511.09458v1 | arXiv:2511.09458v1 | source:ArXiv
[^p52]: Machine Psychophysics: Cognitive Control in Vision-Language Models | Dezhi Luo, Maijunxian Wang, Bingyang Wang, Tianwei Zhao, Yijiang Li, Hokin Deng | 2025 | https://arxiv.org/abs/2505.18969v1 | arXiv:2505.18969v1 | source:ArXiv
[^p53]: Testing Capacity-Constrained Learning | 2025 | https://arxiv.org/abs/2502.00195 | arXiv:2502.00195 | source:ArXiv
[^p54]: Hierarchical Reinforcement Learning as a Model of Human Task Interleaving | 2020 | https://arxiv.org/abs/2001.02122 | arXiv:2001.02122 | source:ArXiv
[^p55]: Knowledge work interrupted: a quantitative study on the relationship between interruptions and cognitive flexibility costs–a knowledge work perspective | I Sten | 2020 | https://aaltodoc.aalto.fi/items/b9f18eb9-5f4c-4fff-9f54-a518513b954c | source:Google Scholar
[^p56]: Control and interference in task switching—A review. | A Kiesel, M Steinhauser, M Wendt… | 2010 | https://psycnet.apa.org/record/2010-17510-006 | source:Google Scholar
[^p57]: A new diagnostic mechanism of instruction: A dynamic, real-time and non-interference quantitative measurement technique for adaptive e-learning | PS Hsu, TJ Chang, MH Wu | 2009 | https://www.igi-global.com/article/new-diagnostic-mechanism-instruction/3921 | source:Google Scholar
[^p58]: Interference between cognitive skills. | B Rehder | 2001 | https://psycnet.apa.org/fulltext/2001-16746-010.html | source:Google Scholar
[^p59]: Cognitive motor interference in multiple sclerosis: insights from a systematic quantitative review | YC Learmonth, I Ensari, RW Motl | 2017 | https://www.sciencedirect.com/science/article/pii/S0003999316304178 | source:Google Scholar
[^p60]: Quantitative and Qualitative Differences between Implicit and Explicit Sequence Learning | Arnaud Destrebecqz | 2010 | https://doi.org/10.4135/9788132107910.n4 | DOI:10.4135/9788132107910.n4 | source:Crossref
[^p61]: Circadian Modulation of Semantic Exploration in Social Media Language | 2026 | https://arxiv.org/abs/2601.15091v1 | arXiv:2601.15091v1 | source:ArXiv
[^p62]: Collective sleep and activity patterns of college students from wearable devices | 2024 | https://arxiv.org/abs/2412.17969 | arXiv:2412.17969 | source:ArXiv
[^p63]: On Weighted Trigonometric Regression for Suboptimal Designs in Circadian Biology Studies | 2024 | https://arxiv.org/abs/2403.14452 | arXiv:2403.14452 | source:ArXiv
[^p64]: Analysis of the 24-Hour Activity Cycle: An illustration examining the association with cognitive function in the Adult Changes in Thought (ACT) Study | 2024 | https://arxiv.org/abs/2301.08280 | arXiv:2301.08280 | source:ArXiv
[^p65]: Analyzing Brain Activity During Learning Tasks with EEG and Machine Learning | 2024 | https://arxiv.org/abs/2401.10285 | arXiv:2401.10285 | source:ArXiv
[^p66]: It's about time: Circadian rhythms, memory, and aging | L Hasher, D Goldstein, CP May | 2014 | https://www.taylorfrancis.com/chapters/edit/10.4324/9781410612717-9/time-lynn-hasher-david-goldstein-cynthia-may | source:Google Scholar
[^p67]: Time of Day and Academic Achievement: A Quantitative Comparative Study | GW Cannon | 2016 | https://search.proquest.com/openview/1974fbf1a1ffe539a6db764562679695/1?pq-origsite=gscholar&cbl=18750 | source:Google Scholar
[^p68]: Identifying the best times for cognitive functioning using new methods: matching university times to undergraduate chronotypes | MDR Evans, P Kelley, J Kelley | 2017 | https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2017.00188/full?platform=hootsuite | source:Google Scholar
[^p69]: Circadian effects on attention and working memory in college students with attention deficit and hyperactivity symptoms | L Gabay, P Miller, N Alia | 2022 | https://www.frontiersin.org/articles/10.3389/fpsyg.2022.851502/full | source:Google Scholar
[^p70]: Making memories: why time matters | P Kelley, MDR Evans, J Kelley | 2018 | https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2018.00400/full | source:Google Scholar
[^p71]: Creating an optimal sleep and circadian rhythm environment | Wilfred R. Pigeon | 2023 | https://doi.org/10.1016/b978-0-12-822963-7.00318-2 | DOI:10.1016/b978-0-12-822963-7.00318-2 | source:Crossref
[^p72]: Optimal sleep and circadian rhythm habits in older adults | Miranda V. McPhillips, Junxin Li, Nalaka S. Gooneratne | 2023 | https://doi.org/10.1016/b978-0-12-822963-7.00266-8 | DOI:10.1016/b978-0-12-822963-7.00266-8 | source:Crossref
[^p73]: The effect of CA1 α2 adrenergic receptors on memory retention deficit induced by total sleep deprivation and the reversal of circadian rhythm in a rat model | Yaser Norozpour, Mohammad Nasehi, Vahid Sabouri-Khanghah, Mohammad Torabi-Nami, Mohammad-Reza Zarrindast | 2016 | https://doi.org/10.1016/j.nlm.2016.06.004 | DOI:10.1016/j.nlm.2016.06.004 | source:Crossref
[^p74]: Optimising retention through multiple study opportunities over days: The benefit of an expanding schedule of repetitions | Emilie Gerbier, Thomas C. Toppino, Olivier Koenig | 2015 | https://doi.org/10.1080/09658211.2014.944916 | DOI:10.1080/09658211.2014.944916 | source:Crossref
[^p75]: Circadian Rhythm (circadian clock) | https://doi.org/10.1007/springerreference_93486 | DOI:10.1007/springerreference_93486 | source:Crossref
[^p76]: The Impact of Simple, Brief, and Adaptive Instructions within Virtual Reality Training: Components of Cognitive Load Theory in an Assembly Task | Rebecca L. Pharmer, Christopher D. Wickens, Lucas Plabst, Benjamin A. Clegg, Leanne M. Hirshfield, Joanna E. Lewis, Jalynn B. Nicoly, Cara A. Spencer, Francisco R. Ortega | 2025 | https://arxiv.org/abs/2507.20943v1 | arXiv:2507.20943v1 | source:ArXiv
[^p77]: Reconciling Different Theories of Learning with an Agent-based Model of Procedural Learning | 2024 | https://arxiv.org/abs/2408.13364 | arXiv:2408.13364 | source:ArXiv
[^p78]: Artificial Intelligence Software Structured to Simulate Human Working Memory, Mental Imagery, and Mental Continuity | 2022 | https://arxiv.org/abs/2204.05138 | arXiv:2204.05138 | source:ArXiv
[^p79]: Consolidation and restoration of memory traces in working memory | S De Schrijver, P Barrouillet | 2017 | https://link.springer.com/article/10.3758/s13423-017-1226-7 | source:Google Scholar
[^p80]: Analyzing Teacher-Designed Tasks Through the Lens of Procedural and Conceptual Knowledge Framework | Mourat Tchoshanov | 2023 | https://doi.org/10.3102/2011163 | DOI:10.3102/2011163 | source:Crossref
[^p81]: Hippocampus, striatum, and sleep-dependent procedural memory consolidation in humans | Genevieve Albouy | 2014 | https://doi.org/10.1037/e569092014-001 | DOI:10.1037/e569092014-001 | source:Crossref
[^p82]: Fact Retrieval and Memory Consolidation for a Movement Sequence: Bidirectional Effects of 'Unrelated' Cognitive Tasks on Procedural Memory | Rachel Tibi, Zohar Eviatar, Avi Karni | 2013 | https://doi.org/10.1371/journal.pone.0080270 | DOI:10.1371/journal.pone.0080270 | source:Crossref
[^p83]: Conceptual and Procedural Demands Embedded in Modelling Tasks | Peter Galbraith, Christopher Haines | 2001 | https://doi.org/10.1533/9780857099655.5.342 | DOI:10.1533/9780857099655.5.342 | source:Crossref
[^p84]: Personalized Multimodal Feedback Using Multiple External Representations: Strategy Profiles and Learning in High School Physics | 2026 | https://arxiv.org/abs/2601.09470v1 | arXiv:2601.09470v1 | source:ArXiv
[^p85]: MemoryKT: An Integrative Memory-and-Forgetting Method for Knowledge Tracing | 2025 | https://arxiv.org/abs/2508.08122v1 | arXiv:2508.08122v1 | source:ArXiv
[^p86]: Atomic Learning Objectives Labeling: A High-Resolution Approach for Physics Education | 2025 | https://arxiv.org/abs/2412.09914 | arXiv:2412.09914 | source:ArXiv
[^p87]: Applying Cognitive Diagnostic Models to Mechanics Concept Inventories | 2025 | https://arxiv.org/abs/2404.00009 | arXiv:2404.00009 | source:ArXiv
[^p88]: LSEBMCL: A Latent Space Energy-Based Model for Continual Learning | 2025 | https://arxiv.org/abs/2501.05495 | arXiv:2501.05495 | source:ArXiv
[^p89]: Teaching materials aligned or unaligned with the principles of the Cognitive Theory of Multimedia Learning: the choices made by Physics teachers and students | 2024 | https://arxiv.org/abs/2412.19768 | arXiv:2412.19768 | source:ArXiv
[^p90]: KoroT-3E: A Personalized Musical Mnemonics Tool for Enhancing Memory Retention of Complex Computer Science Concepts | 2024 | https://arxiv.org/abs/2409.10446 | arXiv:2409.10446 | source:ArXiv
[^p91]: A Personalised Learning Tool for Physics Undergraduate Students Built On a Large Language Model for Symbolic Regression | 2024 | https://arxiv.org/abs/2407.00065 | arXiv:2407.00065 | source:ArXiv
[^p92]: A computational model for the evolution of learning physical micro-contents in peer instruction methodology | 2024 | https://arxiv.org/abs/2405.07055 | arXiv:2405.07055 | source:ArXiv
[^p93]: Learning Fast, Learning Slow: A General Continual Learning Method based on Complementary Learning System | 2022 | https://arxiv.org/abs/2201.12604 | arXiv:2201.12604 | source:ArXiv
[^p94]: Planning education for long-term retention: the cognitive science and implementation of retrieval practice | DP Larsen | 2018 | https://www.thieme-connect.com/products/ejournals/html/10.1055/s-0038-1666983 | source:Google Scholar
[^p95]: The cognitive science of learning: concepts and strategies for the educator and learner | J Weidman, K Baker | 2015 | https://journals.lww.com/anesthesia-analgesia/fulltext/2015/12000/The_Cognitive_Science_of_Learning__Concepts_and.31.aspx | source:Google Scholar
[^p96]: How can cognitive-science research help improve education? The case of comparing multiple strategies to improve mathematics learning and teaching | B Rittle | 2020 | https://journals.sagepub.com/doi/abs/10.1177/0963721420969365 | source:Google Scholar
[^p97]: Integrating cognitive science and technology improves learning in a STEM classroom | AC Butler, EJ Marsh, JP Slavinsky… | 2014 | https://link.springer.com/article/10.1007/s10648-014-9256-4 | source:Google Scholar
[^p98]: Applying cognitive psychology to education: Translational educational science | HL Roediger III | 2013 | https://journals.sagepub.com/doi/abs/10.1177/1529100612454415 | source:Google Scholar
[^p99]: Science Of Learning Physics, The: Cognitive Strategies For Improving Instruction | J Mestre, J Docktor | 2020 | https://books.google.com/books?hl=en&lr=&id=UkcREAAAQBAJ&oi=fnd&pg=PR5&dq=best+practices+for+effective+learning+long+term+memory+mathematics+physics+education+cognitive+science&ots=pzHGC6OIrM&sig=JkLVu09_lmRxTHcLtxT8hh5naz8 | source:Google Scholar
[^p100]: Cognitive science and the common core mathematics standards | EA Nelson | 2017 | https://www.nonpartisaneducation.org/Review/Articles/v13n3.pdf | source:Google Scholar
[^p101]: Working memory, long-term memory, and instructional design | J Sweller | 2016 | https://www.sciencedirect.com/science/article/pii/S2211368115000935 | source:Google Scholar
[^p102]: Applications of cognitive science to education | HL Roediger, B Finn, Y Weinstein | 2012 | https://books.google.com/books?hl=en&lr=&id=U_wkgyzU21MC&oi=fnd&pg=PA128&dq=best+practices+for+effective+learning+long+term+memory+mathematics+physics+education+cognitive+science&ots=t1vJGeo9kW&sig=V7W04Z-p_iiQ_wfdlJt135l_LLY | source:Google Scholar
[^p103]: No simple solutions to complex problems: Cognitive science principles can guide but not prescribe educational decisions | VX Yan, F Sana, PF Carvalho | 2024 | https://journals.sagepub.com/doi/abs/10.1177/23727322231218906 | source:Google Scholar
[^p104]: Perception of Learners and Facilitators on the Best Practices for Effective Teaching and Learning of Science Courses in Open and Distance Education | Professor Chibuogwu V. Nnaka | 2024 | https://doi.org/10.47191/ijsshr/v7-i01-106 | DOI:10.47191/ijsshr/v7-i01-106 | source:Crossref
[^p105]: Learning and Long‐Term Memory | 2023 | https://doi.org/10.1002/9781394260676.ch8 | DOI:10.1002/9781394260676.ch8 | source:Crossref
[^p106]: Assurance of Learning and Knowledge Retention: Do AOL Practices Measure Long-Term Knowledge Retention or Short-term Memory Recall? | 2018 | https://doi.org/10.33423/jhetp.v18i6.146 | DOI:10.33423/jhetp.v18i6.146 | source:Crossref
[^p107]: Long-Term Memory in Animals | 2017 | https://doi.org/10.1017/9781316026687.011 | DOI:10.1017/9781316026687.011 | source:Crossref
[^p108]: Learning Leadership Roles | 2017 | https://doi.org/10.5040/9798400677694.ch-006 | DOI:10.5040/9798400677694.ch-006 | source:Crossref
[^p109]: Best Practices In Physics Teacher Education In Selected ASEAN Countries | Ida Kaniawati | 2017 | https://doi.org/10.2991/icmsed-16.2017.39 | DOI:10.2991/icmsed-16.2017.39 | source:Crossref
[^p110]: Teaching for Long-Term Memory | 2011 | https://doi.org/10.4135/9781483387277.n4 | DOI:10.4135/9781483387277.n4 | source:Crossref
[^p111]: Online Mathematics and Physical Science (Mathematics, Astronomy, Chemistry and Physics) | Kevin F. Downing, Jennifer K. Holtz | https://doi.org/10.4018/9781599049861.ch010 | DOI:10.4018/9781599049861.ch010 | source:Crossref
[^p112]: Difficulty as a Proxy for Measuring Intrinsic Cognitive Load Item | Minghao Cai, Guher Gorgun, Carrie Demmans Epp | 2025 | https://arxiv.org/abs/2507.13235v1 | arXiv:2507.13235v1 | source:ArXiv
[^p113]: Hierarchical Working Memory and a New Magic Number | 2024 | https://arxiv.org/abs/2408.07637 | arXiv:2408.07637 | source:ArXiv
[^p114]: Memory, Consciousness and Large Language Model | 2024 | https://arxiv.org/abs/2401.02509 | arXiv:2401.02509 | source:ArXiv
[^p115]: Empowering Working Memory for Large Language Model Agents | 2024 | https://arxiv.org/abs/2312.17259 | arXiv:2312.17259 | source:ArXiv
[^p116]: Predicting Cognitive Load Using Sensor Data in a Literacy Game | 2024 | https://arxiv.org/abs/2405.05543 | arXiv:2405.05543 | source:ArXiv
[^p117]: Working Memory Capacity of ChatGPT: An Empirical Study | 2024 | https://arxiv.org/abs/2305.03731 | arXiv:2305.03731 | source:ArXiv
[^p118]: The Power of Attention: Bridging Cognitive Load, Multimedia Learning, and AI | 2023 | https://arxiv.org/abs/2311.06586 | arXiv:2311.06586 | source:ArXiv
[^p119]: Decoding the Enigma: Benchmarking Humans and AIs on the Many Facets of Working Memory | 2023 | https://arxiv.org/abs/2307.10768 | arXiv:2307.10768 | source:ArXiv
[^p120]: Memory and attention in deep learning | 2021 | https://arxiv.org/abs/2107.01390 | arXiv:2107.01390 | source:ArXiv
[^p121]: Improving critical thinking through the cognitive loading control of working memory in introductory physics classes | V Shekoyan, T Cheung | 2018 | https://peer.asee.org/improving-critical-thinking-through-the-cognitive-loading-control-of-working-memory-in-introductory-physics-classes | source:Google Scholar
[^p122]: The roles of working memory and cognitive load in geoscience learning | AJ Jaeger, TF Shipley, SJ Reynolds | 2017 | https://www.tandfonline.com/doi/abs/10.5408/16-209.1 | source:Google Scholar
[^p123]: Extending cognitive load theory to incorporate working memory resource depletion: Evidence from the spacing effect | O Chen, JC Castro | 2018 | https://link.springer.com/article/10.1007/s10648-017-9426-2 | source:Google Scholar
[^p124]: Cognitive load theory and educational technology | J Sweller | 2020 | https://link.springer.com/article/10.1007/s11423-019-09701-3 | source:Google Scholar
[^p125]: Cognitive load and working memory in multimedia learning: Conceptual and measurement issues | Ø Anmarkrud, A Andresen, I Bråten | 2019 | https://www.tandfonline.com/doi/abs/10.1080/00461520.2018.1554484 | source:Google Scholar
[^p126]: Cognitive load theory: A broader view on the role of memory in learning and education | F Paas, P Ayres | 2014 | https://link.springer.com/article/10.1007/s10648-014-9263-5 | source:Google Scholar
[^p127]: Working memory is limited: improving knowledge transfer by optimising simulation through cognitive load theory | M Meguerdichian, K Walker… | 2016 | https://pmc.ncbi.nlm.nih.gov/articles/PMC8936700/ | source:Google Scholar
[^p128]: Cognitive load theory and its measurement: a study of secondary tasks in relation to working memory | K Greenberg, R Zheng | 2022 | https://www.tandfonline.com/doi/abs/10.1080/20445911.2022.2026052 | source:Google Scholar
[^p129]: Cognitive load theory and human movement: Towards an integrated model of working memory | S Sepp, SJ Howard, S Tindall | 2019 | https://link.springer.com/article/10.1007/s10648-019-09461-9 | source:Google Scholar
[^p130]: Sensory Memory, Working Memory, and Long-Term Memory | Dayu Jiang | 2024 | https://doi.org/10.1007/978-981-97-2317-1_3 | DOI:10.1007/978-981-97-2317-1_3 | source:Crossref
[^p131]: Working Memory, Cognitive Load, and Learning | Robert Z. Zheng, Michael K. Gardner | 2019 | https://doi.org/10.4324/9780429019142-4 | DOI:10.4324/9780429019142-4 | source:Crossref
[^p132]: Cognitive load theory and working memory models | Sébastien Puma, André Tricot | 2019 | https://doi.org/10.4324/9780429283895-4 | DOI:10.4324/9780429283895-4 | source:Crossref
[^p133]: Interrelationships between working memory and long-term memory | Charan Ranganath | 2009 | https://doi.org/10.1093/acprof:oso/9780199217298.003.0013 | DOI:10.1093/acprof:oso/9780199217298.003.0013 | source:Crossref
[^p134]: Activated long-term memory? | Bradley R. Postle | 2007 | https://doi.org/10.1093/acprof:oso/9780198570394.003.0019 | DOI:10.1093/acprof:oso/9780198570394.003.0019 | source:Crossref
[^p135]: Visual Long Term Memory and the Effects of Working Memory Capacity | Kristin Sitton | 2006 | https://doi.org/10.1037/e582662007-001 | DOI:10.1037/e582662007-001 | source:Crossref
[^p136]: Faculty Opinions recommendation of Memory processes of flight situation awareness: interactive roles of working memory capacity, long-term working memory, and expertise. | Yadin Dudai | 2004 | https://doi.org/10.3410/f.1022819.262671 | DOI:10.3410/f.1022819.262671 | source:Crossref
[^p137]: Effects of working memory load on long‐term word priming | Josep Baqués, Dolors Sáiz, Jeffrey Bowers | 2004 | https://doi.org/10.1080/09658210244000469 | DOI:10.1080/09658210244000469 | source:Crossref
[^p138]: Roles of working memory capacity and long-term working memory skill in complex task performance | Young Woo Sohn, Stephanie M. Doane | 2003 | https://doi.org/10.3758/bf03194403 | DOI:10.3758/bf03194403 | source:Crossref
[^p139]: Does limited working-memory capacity underlie age differences in associative long-term memory? | Lea M. Bartsch, Vanessa M. Loaiza, Klaus Oberauer | https://doi.org/10.31234/osf.io/3xtma | DOI:10.31234/osf.io/3xtma | source:Crossref
[^p140]: A Proposal to Extend the Common Model of Cognition with Metacognition | John Laird, Christian Lebiere, Paul Rosenbloom, Andrea Stocco, Robert Wray | 2025 | https://arxiv.org/abs/2506.07807v1 | arXiv:2506.07807v1 | source:ArXiv
[^p141]: Metacognitive particles, mental action and the sense of agency | 2024 | https://arxiv.org/abs/2405.12941 | arXiv:2405.12941 | source:ArXiv
[^p142]: Metacognitive Capabilities of LLMs: An Exploration in Mathematical Problem Solving | 2024 | https://arxiv.org/abs/2405.12205 | arXiv:2405.12205 | source:ArXiv
[^p143]: Towards a Bayesian mechanics of metacognitive particles: A commentary on "Path integrals, particular kinds, and strange things" by Friston, Da Costa, Sakthivadivel, Heins, Pavliotis, Ramstead, and Parr | 2024 | https://arxiv.org/abs/2403.06981 | arXiv:2403.06981 | source:ArXiv
[^p144]: Leveraging Deep Reinforcement Learning for Metacognitive Interventions across Intelligent Tutoring Systems | 2023 | https://arxiv.org/abs/2304.09821 | arXiv:2304.09821 | source:ArXiv
[^p145]: Meta-Learned Models of Cognition | Marcel Binz, Ishita Dasgupta, Akshay Jagadish, Matthew Botvinick, Jane X. Wang, Eric Schulz | 2023 | https://arxiv.org/abs/2304.06729 | arXiv:2304.06729 | source:ArXiv
[^p146]: From internal models toward metacognitive AI | 2021 | https://arxiv.org/abs/2109.12798 | arXiv:2109.12798 | source:ArXiv
[^p147]: The patterns of physics problem-solving from the perspective of metacognition | FAP binti Abdullah | 2009 | https://www.academia.edu/download/3243947/Phang_2009_PhD_Thesis_Meatcogntion_Physics.pdf | source:Google Scholar
[^p148]: The roles of motivation and metacognition in producing self-regulated learners of college physical science: a review of empirical studies | LD McDowell | 2019 | https://www.tandfonline.com/doi/abs/10.1080/09500693.2019.1689584 | source:Google Scholar
[^p149]: Metacognitive function in young adults is impacted by physical activity, diet, and sleep patterns | GK Gooderham, TC Handy | 2025 | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0317253 | source:Google Scholar
[^p150]: Decreasing sedentary behavior: Effects on academic performance, meta-cognition, and sleep | JJ Pilcher, DM Morris, SA Bryant, PA Merritt… | 2017 | https://www.frontiersin.org/articles/10.3389/fnins.2017.00219/full | source:Google Scholar
[^p151]: The effects of sleep deprivation on visual perception and metacognition | M Bigica | 2022 | https://orca.cardiff.ac.uk/id/eprint/161005/ | source:Google Scholar
[^p152]: Learning to think mathematically: Problem solving, metacognition, and sense making in mathematics (Reprint) | AH Schoenfeld | 2016 | https://journals.sagepub.com/doi/abs/10.1177/002205741619600202 | source:Google Scholar
[^p153]: Learning Environment to Promote Student Metacognition: Self-Regulated Learning System for Electrical Class Use Case | P BUCHAPUTARA | https://muroran-it.repo.nii.ac.jp/records/2000414 | source:Google Scholar
[^p154]: Metacognition–The Neuroscience of Learning | K Graham, R Grossman, E Handte, C Marks… | 2022 | https://pressbooks.cuny.edu/lagccfys/chapter/metacognition-the-neuroscience-of-learning/ | source:Google Scholar
[^p155]: … SKILLS THROUGH SIMULATION CARDS, EXPERIMENTS OF ASSESSMENT, AND STEM IMPLEMENTATION IN CHEMISTRY AND PHYSICS EDUCATION | I Anwari | 2014 | https://shizuoka.repo.nii.ac.jp/record/7069/files/K0823.pdf | source:Google Scholar
[^p156]: The impact of a metacognition-based course on school students' metacognitive skills and biology comprehension | A Sadykova, M Iskakova, G Ismailova… | 2024 | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1460496/full | source:Google Scholar
[^p157]: Reviewer #3 (Public Review): Episodic long-term memory formation during slow-wave sleep | 2024 | https://doi.org/10.7554/elife.89601.2.sa0 | DOI:10.7554/elife.89601.2.sa0 | source:Crossref
[^p158]: Reviewer #1 (Public Review): Episodic long-term memory formation during slow-wave sleep | 2024 | https://doi.org/10.7554/elife.89601.2.sa1 | DOI:10.7554/elife.89601.2.sa1 | source:Crossref
[^p159]: Reviewer #2 (Public Review): Episodic long-term memory formation during slow-wave sleep | 2023 | https://doi.org/10.7554/elife.89601.1.sa1 | DOI:10.7554/elife.89601.1.sa1 | source:Crossref
[^p160]: Psychostimulants may block long-term memory formation via degraded sleep in healthy adults | Lauren N. Whitehurst, Sara C. Mednick | 2021 | https://doi.org/10.1016/j.nlm.2020.107342 | DOI:10.1016/j.nlm.2020.107342 | source:Crossref
[^p161]: Decision letter: Neuronal reactivation during post-learning sleep consolidates long-term memory in Drosophila | Mani Ramaswami, Craig Montell | 2018 | https://doi.org/10.7554/elife.42786.021 | DOI:10.7554/elife.42786.021 | source:Crossref
[^p162]: Sleep and long-term memory storage | Jennifer H.K. Choi, Ted Abel | 2013 | https://doi.org/10.1017/cbo9781139649469.022 | DOI:10.1017/cbo9781139649469.022 | source:Crossref
[^p163]: Long-term memory | 2011 | https://doi.org/10.1017/cbo9781139046978.013 | DOI:10.1017/cbo9781139046978.013 | source:Crossref
[^p164]: Distribution of Practice and Metacognition in Learning and Long-Term Retention of a Discrete Motor Task | Teresa K. Dail, Robert W. Christina | 2004 | https://doi.org/10.1080/02701367.2004.10609146 | DOI:10.1080/02701367.2004.10609146 | source:Crossref
[^p165]: Enhancing Memory Recall in LLMs with Gauss-Tin: A Hybrid Instructional and Gaussian Replay Approach | Iing Muttakhiroh, Thomas Fevens | 2025 | https://arxiv.org/abs/2508.09510v1 | arXiv:2508.09510v1 | source:ArXiv
[^p166]: LECTOR: LLM-Enhanced Concept-based Test-Oriented Repetition for Adaptive Spaced Learning | Jiahao Zhao | 2025 | https://arxiv.org/abs/2508.03275v1 | arXiv:2508.03275v1 | source:ArXiv
[^p167]: Memorization: A Close Look at Books | Iris Ma, Ian Domingo, Alberto Krone-Martins, Pierre Baldi, Cristina V. Lopes | 2025 | https://arxiv.org/abs/2504.12549v1 | arXiv:2504.12549v1 | source:ArXiv
[^p168]: Watch Your Step: Optimal Retrieval for Continual Learning at Scale | 2024 | https://arxiv.org/abs/2404.10758 | arXiv:2404.10758 | source:ArXiv
[^p169]: How Relevant is Selective Memory Population in Lifelong Language Learning? | 2022 | https://arxiv.org/abs/2210.00940 | arXiv:2210.00940 | source:ArXiv
[^p170]: Recall and Learn: A Memory-augmented Solver for Math Word Problems | 2021 | https://arxiv.org/abs/2109.13112 | arXiv:2109.13112 | source:ArXiv
[^p171]: The Effectiveness of Memory Replay in Large Scale Continual Learning | 2020 | https://arxiv.org/abs/2010.02418 | arXiv:2010.02418 | source:ArXiv
[^p172]: A meta-analytic review of the effectiveness of spacing and retrieval practice for mathematics learning | E Murray, AJ Horner, SM Göbel | 2025 | https://link.springer.com/article/10.1007/s10648-025-10035-1 | source:Google Scholar
[^p173]: Evidence of the spacing effect and influences on perceptions of learning and science curricula | X Yuan | 2022 | https://www.cureus.com/articles/81442-evidence-of-the-spacing-effect-and-influences-on-perceptions-of-learning-and-science-curricula.pdf | source:Google Scholar
[^p174]: Spaced retrieval practice increases college students' short-and long-term retention of mathematics knowledge | RF Hopkins, KB Lyle, JL Hieb, PAS Ralston | 2016 | https://link.springer.com/article/10.1007/s10648-015-9349-8 | source:Google Scholar
[^p175]: How the amount and spacing of retrieval practice affect the short-and long-term retention of mathematics knowledge | KB Lyle, CR Bego, RF Hopkins, JL Hieb… | 2020 | https://link.springer.com/article/10.1007/s10648-019-09489-x | source:Google Scholar
[^p176]: The effectiveness of spaced learning, interleaving, and retrieval practice in radiology education: a systematic review | CP Thompson, MA Hughes | 2023 | https://www.sciencedirect.com/science/article/pii/S1546144023006464 | source:Google Scholar
[^p177]: The science of effective learning with spacing and retrieval practice | SK Carpenter, SC Pan, AC Butler | 2022 | https://www.nature.com/articles/s44159-022-00089-1 | source:Google Scholar
[^p178]: Single-paper meta-analyses of the effects of spaced retrieval practice in nine introductory STEM courses: is the glass half full or half empty? | CR Bego, KB Lyle, PAS Ralston, JC Immekus… | 2024 | https://link.springer.com/article/10.1186/s40594-024-00468-5 | source:Google Scholar
[^p179]: Interleaved practice enhances memory and problem-solving ability in undergraduate physics | J Samani, SC Pan | 2021 | https://www.nature.com/articles/s41539-021-00110-x | source:Google Scholar
[^p180]: Memory and metacognition in classroom learning: the role of item order in learning with particular reference to the interleaving effect | J Firth | 2021 | https://stax.strath.ac.uk/concern/theses/pz50gw483 | source:Google Scholar
[^p181]: A meta-analysis of ten learning techniques | GM Donoghue, JAC Hattie | 2021 | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.581216/full?trk=public_post_comment-text | source:Google Scholar
[^p182]: Spaced repetition and active recall improves academic performance among pharmacy students | Saravanan Jayaram | 2026 | https://doi.org/10.1016/j.cptl.2025.102510 | DOI:10.1016/j.cptl.2025.102510 | source:Crossref
[^p183]: Anapolo: A Web-Based Spaced Repetition E-Learning Platform for Enhanced Long-Term Memory Retention | Mary Jane Samonte, Yeshua Miguel Abrenica, Juan Miguel Caparas, Denise Nicole Marcelo | 2024 | https://doi.org/10.1145/3719487.3719520 | DOI:10.1145/3719487.3719520 | source:Crossref
[^p184]: Active recall y spaced repetition: herramientas para estudiantes de Medicina | Elvira G. Zamora-Huaringa | 2024 | https://doi.org/10.1016/j.edumed.2024.100919 | DOI:10.1016/j.edumed.2024.100919 | source:Crossref
[^p185]: Vocabulary learning through viewing dual-subtitled videos: Immediate repetition versus spaced repetition as an enhancement strategy | Siowai Lo | 2024 | https://doi.org/10.1017/s0958344024000053 | DOI:10.1017/s0958344024000053 | source:Crossref
[^p186]: Harnessing the power of spaced repetition learning and active recall for trainee education in otolaryngology | John P. Marinelli, Tiffany P. Hwa, Christine M. Lohse, Matthew L. Carlson | 2022 | https://doi.org/10.1016/j.amjoto.2022.103495 | DOI:10.1016/j.amjoto.2022.103495 | source:Crossref
[^p187]: Spaced repetition tool for improving long-term memory retention and recall of collected personal experiences | Norbert Győrbíró, Henry Larkin, Michael Cohen | 2010 | https://doi.org/10.1145/1971630.1971673 | DOI:10.1145/1971630.1971673 | source:Crossref
[^p188]: Effects of Spaced Repetition on Long-Term Map Knowledge Recall | David M. Zirkle, Arthur K. Ellis | 2010 | https://doi.org/10.1080/00221341.2010.504780 | DOI:10.1080/00221341.2010.504780 | source:Crossref
[^p189]: Age, Intentionality, and Spaced-Repetition Effects in Free Recall | Thomas C. Toppino, Melodie Fearnow | 1992 | https://doi.org/10.1037/e665412011-288 | DOI:10.1037/e665412011-288 | source:Crossref
[^p190]: BOARD #101: Work In Progress: Enhancing Active Recall and Spaced Repetition with LLM-Augmented Review Systems | Muhammed Yakubu, Jasnoor Guliani, Nipun Shukla, Dylan O'Toole, Hamid Timorabadi | https://doi.org/10.18260/1-2--55918 | DOI:10.18260/1-2--55918 | source:Crossref
[^p191]: Targeted Memory Reactivation Increases Memory Recall: A Meta-analysis | Thomas Lieber | https://doi.org/10.1101/796458 | DOI:10.1101/796458 | source:Crossref
[^p192]: "I forgot the formula:" How students can use coherence to reconstruct a (partially) forgotten equation | Katherine Gifford, Gabriel S. Ehrlich, Engin Bumbacher, Eric Kuo | 2025 | https://arxiv.org/abs/2506.19641v1 | arXiv:2506.19641v1 | source:ArXiv
[^p193]: The Role of Conceptual Problem Solving in Learning Physics: A Study in a General Relativity University Course | Matteo Tuveri, Andrea Pierfrancesco Sanna, Mariano Cadoni | 2025 | https://arxiv.org/abs/2502.08564v1 | arXiv:2502.08564v1 | source:ArXiv
[^p194]: Physics Teachers' Perceptions about Diagnostic Assessment of Students' Physics Misconceptions: A Phenomenological Study | 2025 | https://arxiv.org/abs/2501.10422 | arXiv:2501.10422 | source:ArXiv
[^p195]: Expert covariational reasoning resources in physics graphing tasks | 2024 | https://arxiv.org/abs/2306.00921 | arXiv:2306.00921 | source:ArXiv
[^p196]: Analyzing students collaboratively solving spherical unit vector problems in upper level E and M through a lens of shared resources | 2024 | https://arxiv.org/abs/2401.01959 | arXiv:2401.01959 | source:ArXiv
[^p197]: Using the Energy and Momentum Conceptual Survey to investigate progression in student understanding from introductory to advanced levels | 2023 | https://arxiv.org/abs/2311.17054 | arXiv:2311.17054 | source:ArXiv
[^p198]: Visual representations in science education: The influence of prior knowledge and cognitive load theory on instructional design principles | MP Cook | 2006 | https://onlinelibrary.wiley.com/doi/abs/10.1002/sce.20164 | source:Google Scholar
[^p199]: Cognitive load theory and the use of worked examples as an instructional strategy in physics for distance learners: A preliminary study | KG Saw | 2017 | https://dergipark.org.tr/en/doi/10.17718/tojde.340405 | source:Google Scholar
[^p200]: Example-based learning in heuristic domains: A cognitive load theory account | A Renkl, T Hilbert, S Schworm | 2009 | https://link.springer.com/article/10.1007/s10648-008-9093-4 | source:Google Scholar
[^p201]: Investigating the use of integrated instructions to reduce the cognitive load associated with doing practical work in secondary school science | CY Haslam, RJ Hamilton | 2010 | https://www.tandfonline.com/doi/abs/10.1080/09500690903183741 | source:Google Scholar
[^p202]: Cognitive and Psychological Aspects of Physics Learning | AK Sharma | 2025 | https://physics.cfu.ac.ir/article_4109.html | source:Google Scholar
[^p203]: Supporting mathematical discussions: The roles of comparison and cognitive load | LE Richland, KN Begolli, N Simms, RR Frausel… | 2017 | https://link.springer.com/article/10.1007/s10648-016-9382-2 | source:Google Scholar
[^p204]: Optimizing Cognitive Load in Digital Mathematics Textbooks: A Mixed-Methods Study on Content Organization and Application Models | X Mao, Y Dai, Y Liu, Y Jiang… | 2025 | https://media.sciltp.com/articles/2510001717/2510001717.pdf | source:Google Scholar
[^p205]: Near and far transfer of learning in mathematics lesson designed based on cognitive load theory principles: A case study | BG Tüker | 2013 | https://search.proquest.com/openview/1a32a37a2ebecbdb580ab4ae5a232b2b/1?pq-origsite=gscholar&cbl=2026366&diss=y | source:Google Scholar
[^p206]: Next Generation Science Standards Visual Literacy: Cognitive Load Theory Based Approach for Middle-Level Students | CJ Huhn | 2024 | https://wyoscholar.uwyo.edu/server/api/core/bitstreams/66ef5812-6379-43cb-b67f-7aa5d20acacd/content | source:Google Scholar
[^p207]: Assessing Student Course Evaluation Comments Using Cognitive Load Theory: Insights for Best Teaching Practices | Mohammed Islam, Suhui Yang, Rose Bagheri | 2025 | https://doi.org/10.1016/j.ajpe.2025.101737 | DOI:10.1016/j.ajpe.2025.101737 | source:Crossref
[^p208]: Conceptual semantics | 2024 | https://doi.org/10.5040/9781350355491.ch-002 | DOI:10.5040/9781350355491.ch-002 | source:Crossref
[^p209]: Design thinking in higher education: best practices and lessons learnt | 2023 | https://doi.org/10.1049/pbme024e_ch12 | DOI:10.1049/pbme024e_ch12 | source:Crossref
[^p210]: Enhancing classroom discourse about measure to foster a conceptual understanding of geometrical practices | Aurélie Chesnais | 2021 | https://doi.org/10.1007/s11858-021-01255-0 | DOI:10.1007/s11858-021-01255-0 | source:Crossref
[^p211]: English Language Learners’ Cognitive Load and Conceptual Understanding of Probability Distributions after Using an Animated Simulation Program | Jase Moussa-Inaty, Mark Causapin | 2019 | https://doi.org/10.1564/tme_v26.4.02 | DOI:10.1564/tme_v26.4.02 | source:Crossref
[^p212]: Graph in Physics Education: From Representation to Conceptual Understanding | Alberto Stefanel | 2019 | https://doi.org/10.1007/978-3-030-04627-9_9 | DOI:10.1007/978-3-030-04627-9_9 | source:Crossref
[^p213]: Understanding Educational Theory | Bruce M. Mackh | 2018 | https://doi.org/10.4324/9781351133715-2 | DOI:10.4324/9781351133715-2 | source:Crossref
[^p214]: How Cognitive Science Can Promote Conceptual Understanding in Physics Classrooms | Jose P. Mestre, Brian H. Ross, David T. Brookes, Adam D. Smith, Timothy J. Nokes | 2009 | https://doi.org/10.1163/9789087909239_009 | DOI:10.1163/9789087909239_009 | source:Crossref
[^p215]: Making sense of quantum teleportation: An intervention study on students' conceptions using a diagrammatic approach | 2025 | https://arxiv.org/abs/2511.21443v1 | arXiv:2511.21443v1 | source:ArXiv
[^p216]: Evaluation of a deliberate-practice informed supplemental intervention in graduate Quantum Mechanics | 2025 | https://arxiv.org/abs/2508.09917v1 | arXiv:2508.09917v1 | source:ArXiv
[^p217]: Investigation of student and faculty problem solving: An example from quantum mechanics | Alexandru Maries, Ryan Sayer, Chandralekha Singh | 2025 | https://arxiv.org/abs/2504.17487v1 | arXiv:2504.17487v1 | source:ArXiv
[^p218]: Using machine learning to measure evidence of students' sensemaking in physics courses | Kaitlin Gili, Kyle Heuton, Astha Shah, Michael C. Hughes | 2025 | https://arxiv.org/abs/2503.15638v1 | arXiv:2503.15638v1 | source:ArXiv
[^p219]: The Role of Conceptual Problem Solving in Learning Physics: A Study in a General Relativity University Course | 2025 | https://arxiv.org/abs/2502.08564 | arXiv:2502.08564 | source:ArXiv
[^p220]: Promoting the transition to quantum thinking: development of a secondary school course for addressing knowledge revision, organization, and epistemological challenges | 2024 | https://arxiv.org/abs/2301.00239 | arXiv:2301.00239 | source:ArXiv
[^p221]: Sensemaking throughout the physics curriculum: Understanding expert and student ideas about sensemaking in a physics context | MK Lenz | 2020 | https://ir.library.oregonstate.edu/concern/graduate_thesis_or_dissertations/kp78gp46z | source:Google Scholar
[^p222]: Students' Perceptions of Feynman Technique in Mathematics Learning: A Case of a State University in Claveria, Misamis Oriental | AS Travero, CM Castrodes, PJB Panganiban | 2025 | https://www.researchgate.net/profile/Charlito-Castrodes-2/publication/392514831_Students'_Perceptions_of_Feynman_Technique_in_Mathematics_Learning_A_Case_of_a_State_University_in_Claveria_Misamis_Oriental/links/68465376df0e3f544f5dad06/Students-Perceptions-of-Feynman-Technique-in-Mathematics-Learning-A-Case-of-a-State-University-in-Claveria-Misamis-Oriental.pdf | source:Google Scholar
[^p223]: Categorical framework for mathematical sense making in physics | JD Gifford, ND Finkelstein | 2020 | https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.16.020121 | source:Google Scholar
[^p224]: Modeling as sensemaking: towards a theory of modelling in physics education | D Sands | 2021 | https://iopscience.iop.org/article/10.1088/1361-6404/abcc80/meta | source:Google Scholar
[^p225]: Assessing mathematical sensemaking in physics through calculation-concept crossover | E Kuo, MM Hull, A Elby, A Gupta | 2020 | https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.16.020109 | source:Google Scholar
[^p226]: The Use of Feynman Diagrams in Physics Education: Opportunities, Challenges, Practices | MN Dahlkemper | 2024 | https://ediss.uni-goettingen.de/handle/11858/15334 | source:Google Scholar
[^p227]: Mathematical sensemaking via epistemic games | M Eichenlaub | 2018 | https://search.proquest.com/openview/7473cc7f614092576425ed2ebaa56dac/1?pq-origsite=gscholar&cbl=18750&diss=y | source:Google Scholar
[^p228]: Storytelling and Sensemaking Physics from Newspapers | EJ Bahng, JM Hauptman | 2022 | https://pubs.aip.org/aapt/pte/article/60/8/632/2848360 | source:Google Scholar
[^p229]: Sensemaking of wave–particle duality in a scientific outreach minicourse: a study based in self-regulation | MHT Becker, LA Heidemann… | 2024 | https://iopscience.iop.org/article/10.1088/1361-6404/ad8a29/meta | source:Google Scholar
[^p230]: Pathway to Sense-Making, Using Epistemic Affect, and Epistemic Empathy in STEM with In-Service Primary Teachers | A Gilbert, J Suh | 2025 | https://books.google.com/books?hl=en&lr=&id=JAuhEQAAQBAJ&oi=fnd&pg=PA299&dq=feynman+technique+mathematical+sensemaking+physics+education+conceptual+understanding+learning+strategies+community+use&ots=ghvzwmcLY5&sig=9_joSIB-7h3MbpKqqtWDMrnMwMQ | source:Google Scholar
[^p231]: Enhancing Mathematical Conceptual Understanding and Computation Skills of Grade Nine Learners through Team- Based Learning Strategies | 2025 | https://doi.org/10.71002/iecs.v5n4p1 | DOI:10.71002/iecs.v5n4p1 | source:Crossref
[^p232]: Learning through the arts: cultural strategies for decolonisation | Marjorie Mayo | 2024 | https://doi.org/10.1332/policypress/9781447367567.003.0008 | DOI:10.1332/policypress/9781447367567.003.0008 | source:Crossref
[^p233]: Communities, social movements and municipal strategies for equalities and solidarity | Marjorie Mayo | 2024 | https://doi.org/10.1332/policypress/9781447367567.003.0007 | DOI:10.1332/policypress/9781447367567.003.0007 | source:Crossref
[^p234]: Learning through the arts: | 2024 | https://doi.org/10.2307/jj.12348170.12 | DOI:10.2307/jj.12348170.12 | source:Crossref
[^p235]: The Enhancement of Students’ Mathematical Conceptual Understanding Through RADEC Learning Model | Trisna Nugraha, Sufyani Prabawanto | 2021 | https://doi.org/10.24235/eduma.v10i2.9073 | DOI:10.24235/eduma.v10i2.9073 | source:Crossref
[^p236]: Active Learning Methods and Strategies to Improve Student Conceptual Understanding: Some Considerations from Physics Education Research | Claudio Fazio | 2020 | https://doi.org/10.1007/978-3-030-51182-1_2 | DOI:10.1007/978-3-030-51182-1_2 | source:Crossref
[^p237]: Nurturing sensemaking of, through, and with a mathematical model | Shulamit Kapon, Maayan Schvartzer | 2019 | https://doi.org/10.1119/perc.2018.pr.kapon | DOI:10.1119/perc.2018.pr.kapon | source:Crossref
[^p238]: Conceptual Framework: | 2013 | https://doi.org/10.2307/j.ctv2t5xgxx.8 | DOI:10.2307/j.ctv2t5xgxx.8 | source:Crossref
[^p239]: Learning to Read through Machine Teaching | 2020 | https://arxiv.org/abs/2006.16470 | arXiv:2006.16470 | source:ArXiv
[^p240]: Spaced repetition promotes efficient and effective learning: Policy implications for instruction | SHK Kang | 2016 | https://journals.sagepub.com/doi/abs/10.1177/2372732215624708 | source:Google Scholar
[^p241]: Enhancing human learning via spaced repetition optimization | B Tabibian, U Upadhyay, A De, A Zarezade… | 2019 | https://www.pnas.org/doi/abs/10.1073/pnas.1815156116 | source:Google Scholar
[^p242]: Spaced Repetition: Towards More Effective Learning in STEM. | A Voice, A Stirton | 2020 | https://eric.ed.gov/?id=EJ1241511 | source:Google Scholar
[^p243]: The effect of spaced repetition on learning and knowledge transfer in a large cohort of practicing physicians | DW Price, T Wang, TR O'Neill, ZJ Morgan… | 2025 | https://academic.oup.com/academicmedicine/article-abstract/100/1/94/8326145 | source:Google Scholar
[^p244]: Designing for motivation: design-considerations for spaced-repetition-based learning games on mobile devices | F Schimanke, R Mertens… | 2017 | https://www.learntechlib.org/primary/d/149909/ | source:Google Scholar
[^p245]: Optimizing Retrieval-Augmented Generation of Medical Content for Spaced Repetition Learning | Jeremi Kaczmarek, Jakub Pokrywka, Krzysztof Biedalak, Grzegorz Kurzyp, Łukasz Grzybowski | 2025 | https://doi.org/10.5220/0013477700003932 | DOI:10.5220/0013477700003932 | source:Crossref
[^p246]: The indirect spaced repetition concept | Louis Lafleur | 2020 | https://doi.org/10.7820/vli.v09.2.lafleur | DOI:10.7820/vli.v09.2.lafleur | source:Crossref
[^p247]: IMPROVING LISTENING SKILLS IN LANGUAGE LEARNING WITH SPACED REPETITION TECHNIQUE | Iaroslav Viktorovich Baranov | 2018 | https://doi.org/10.20861/2410-2873-2018-40-002 | DOI:10.20861/2410-2873-2018-40-002 | source:Crossref
[^p248]: Unbounded Human Learning | Siddharth Reddy, Igor Labutov, Siddhartha Banerjee, Thorsten Joachims | 2016 | https://doi.org/10.1145/2939672.2939850 | DOI:10.1145/2939672.2939850 | source:Crossref
[^p249]: The Effect of using Spaced Repetition in Mobile Learning Games on the Learning Success | Florian Schimanke | https://doi.org/10.20378/irb-55317 | DOI:10.20378/irb-55317 | source:Crossref
[^p250]: Do Your Best and Get Enough Rest for Continual Learning | Hankyul Kang, Gregor Seifer, Donghyun Lee, Jongbin Ryu | 2025 | https://arxiv.org/abs/2503.18371v1 | arXiv:2503.18371v1 | source:ArXiv
[^p251]: Wakeful resting and memory retention: a study with healthy older and younger adults | M Martini, L Zamarian, P Sachse, C Martini… | 2019 | https://link.springer.com/article/10.1007/s10339-018-0891-4 | source:Google Scholar
[^p252]: 0077 TITLE: Test Format Influences the Effectiveness of Wakeful Rest for Memory Consolidation | Daniel Gonsalez, Yordanos Knife, Omalys Biggs-Rodriguez, Favour Kowe, Carmen Westerberg | 2024 | https://doi.org/10.1093/sleep/zsae067.0077 | DOI:10.1093/sleep/zsae067.0077 | source:Crossref
[^p253]: The effects of wakeful rest on memory consolidation in an online memory study | Olivia King, Jessica Nicosia | 2022 | https://doi.org/10.3389/fpsyg.2022.932592 | DOI:10.3389/fpsyg.2022.932592 | source:Crossref
[^p254]: Cognitive Load-Driven VR Memory Palaces: Personalizing Focus and Recall Enhancement | Zhengyang Li, Hailin Deng | 2025 | https://arxiv.org/abs/2506.02700v1 | arXiv:2506.02700v1 | source:ArXiv
[^p255]: Evidence for five types of fixation during a random saccade eye tracking task: Implications for the study of oculomotor fatigue | 2024 | https://arxiv.org/abs/2406.01496 | arXiv:2406.01496 | source:ArXiv
[^p256]: Which Experimental Design is Better Suited for VQA Tasks? Eye Tracking Study on Cognitive Load, Performance, and Gaze Allocations | 2024 | https://arxiv.org/abs/2404.04036 | arXiv:2404.04036 | source:ArXiv
[^p257]: Towards Cognitive Load Assessment Using Electrooculography Measures | 2023 | https://arxiv.org/abs/2312.11418 | arXiv:2312.11418 | source:ArXiv
[^p258]: Assessing the efficacy of the Pomodoro technique in enhancing anatomy lesson retention during study sessions: a scoping review | E Ogut | 2025 | https://link.springer.com/article/10.1186/s12909-025-08001-0 | source:Google Scholar
[^p259]: Investigating the Effectiveness of Self-Regulated, Pomodoro, and Flowtime Break-Taking Techniques Among Students | EJC Smits, N Wenzel, A de Bruin | 2025 | https://www.mdpi.com/2076-328X/15/7/861 | source:Google Scholar
[^p260]: Investigating the Effectiveness of Pomodoro, Flowtime, and Self-regulated Break-Taking Techniques among Students | EJC Smits, N Wenzel, A de Bruin | 2025 | https://www.preprints.org/manuscript/202503.0845 | source:Google Scholar
[^p261]: Understanding effort regulation: Comparing 'Pomodoro'breaks and self‐regulated breaks | F Biwer, W Wiradhany… | 2023 | https://bpspsychub.onlinelibrary.wiley.com/doi/abs/10.1111/bjep.12593 | source:Google Scholar
[^p262]: The Science of Personalized Productivity: Matching Personality Profiles to Evidence-Based Productivity Systems | A Awowale | https://prolificpersonalities.com/prolific-personalities-research-paper.pdf | source:Google Scholar
[^p263]: IMPROVE FOCUS AND INCREASE PRODUCTIVITY USING ENHANCED POMODORO TECHNIQUE AND CAPTURE, ORGANIZE DAILY TASKS USING TASK MANAGER | 2024 | https://doi.org/10.56726/irjmets48399 | DOI:10.56726/irjmets48399 | source:Crossref
[^p264]: Müzik Öğrencilerinin Çalgı Çalışma Süreçlerinde Pomodoro Tekniği Kullanımına Yönelik Görüşleri | Yusuf ESEN, Ajda ŞENOL SAKİN | 2021 | https://doi.org/10.46372/arts.969224 | DOI:10.46372/arts.969224 | source:Crossref
[^p265]: WebCat: GTD &amp; Pomodoro Technique | 2013 | https://doi.org/10.7238/m.n109.1328 | DOI:10.7238/m.n109.1328 | source:Crossref
[^p266]: Pomodoro, Giò | 2011 | https://doi.org/10.1093/benz/9780199773787.article.b00144169 | DOI:10.1093/benz/9780199773787.article.b00144169 | source:Crossref
[^p267]: Optimal Accentuation vs Focus Accentuation | Hans-Christian Schmitz | 2008 | https://doi.org/10.1057/9780230592568_5 | DOI:10.1057/9780230592568_5 | source:Crossref
[^p268]: External light schedules can induce nighttime sleep disruptions in a Homeostat-Circadian-Light Model for sleep in young children | Tianyong Yao, Victoria Booth | 2025 | https://arxiv.org/abs/2507.19772v1 | arXiv:2507.19772v1 | source:ArXiv
[^p269]: Balancing Sleep and Study: Cultural Contexts in Family Informatics for Taiwanese Parents and Children | 2025 | https://arxiv.org/abs/2501.05674 | arXiv:2501.05674 | source:ArXiv
[^p270]: … in class… but physics is fascinating”: The use of large-scale longitudinal data to explore the educational experiences of aspiring girls in mathematics and physics | T Mujtaba, MJ Reiss | 2016 | https://link.springer.com/article/10.1080/14926156.2016.1235743 | source:Google Scholar
[^p271]: Effects of start times on academic performance: Will metacognitive learning strategy or flipped classroom approaches help sleepy young university students? | M Wang, B Luo | 2023 | https://www.sciencedirect.com/science/article/pii/S1472811723000447 | source:Google Scholar
[^p272]: Objective assessment of nap as a method to improve cognitive performance using a bio-mathematical model | SS Mohapatra, D Ghosh, R Sarkar… | 2021 | https://indjaerospacemed.com/objective-assessment-of-nap-as-a-method-to-improve-cognitive-performance-using-a-bio-mathematical-model/ | source:Google Scholar
[^p273]: Mathematics of the Nap | CD Behn | https://www.siam.org/publications/siam-news/articles/mathematics-of-the-nap/ | source:Google Scholar
[^p274]: Effects of block scheduling on grade 12 STEM students' academic performance in general physics 1 | MA Nariz, LS Roleda | 2019 | https://www.dlsu.edu.ph/wp-content/uploads/pdf/conferences/research-congress-proceedings/2019/lli-I-007.pdf | source:Google Scholar
[^p275]: The impact of exercise on sleep and sleep disorders | Abdulmenaf Korkutata, Mustafa Korkutata, Michael Lazarus | 2025 | https://doi.org/10.1038/s44323-024-00018-w | DOI:10.1038/s44323-024-00018-w | source:Crossref
[^p276]: Bidirectional associations between the duration and timing of nocturnal sleep and naps in adolescents differ from weekdays to weekends | R. Leong, T. Liang, N. Yu, T.B. Teo, J. Ong, M. Chee | 2024 | https://doi.org/10.1016/j.sleep.2023.11.285 | DOI:10.1016/j.sleep.2023.11.285 | source:Crossref
[^p277]: Stable inter-individual differences in slow-wave sleep during nocturnal sleep and naps | Philippa GANDER, Leigh SIGNAL, Hans PA VAN DONGEN, Diane MULLER, Margo VAN DEN BERG | 2010 | https://doi.org/10.1111/j.1479-8425.2010.00454.x | DOI:10.1111/j.1479-8425.2010.00454.x | source:Crossref
[^p278]: Take afternoon naps to improve perceptual learning | Richard P. Allen | 2003 | https://doi.org/10.1016/j.sleep.2003.09.002 | DOI:10.1016/j.sleep.2003.09.002 | source:Crossref
[^p279]: Regulation of Sleep and Naps on an Irregular Schedule | 1993 | https://doi.org/10.1093/sleep/16.8.736 | DOI:10.1093/sleep/16.8.736 | source:Crossref
[^p280]: Efficacy of a hybrid take home and in class summative assessment for the postsecondary physics classroom | 2024 | https://arxiv.org/abs/2409.18058 | arXiv:2409.18058 | source:ArXiv
[^p281]: Sleep-Like Unsupervised Replay Improves Performance when Data are Limited or Unbalanced | 2024 | https://arxiv.org/abs/2402.10956 | arXiv:2402.10956 | source:ArXiv
[^p282]: Irregular sleep/wake patterns are associated with poorer academic performance and delayed circadian and sleep/wake timing | AJK Phillips, WM Clerx, CS O'Brien, A Sano… | 2017 | https://www.nature.com/articles/s41598-017-03171-4 | source:Google Scholar
[^p283]: The association between school start time and sleep duration, sustained attention, and academic performance | V Alfonsi, R Palmizio, A Rubino… | 2020 | https://www.tandfonline.com/doi/abs/10.2147/NSS.S273875 | source:Google Scholar
[^p284]: Sleep duration is associated with academic achievement of adolescent girls in mathematics | L Lin, G Somerville, J Boursier… | 2020 | https://www.tandfonline.com/doi/abs/10.2147/NSS.S237267 | source:Google Scholar
[^p285]: Sleep deprivation and sustained attention performance: Integrating mathematical and cognitive modeling | G Gunzelmann, JB Gross, KA Gluck… | 2009 | https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1551-6709.2009.01032.x | source:Google Scholar
[^p286]: Regional Cerebral Blood Flow during Wakeful Rest in Older Subjects with Mild to Severe Obstructive Sleep Apnea | Andrée-Ann Baril, Katia Gagnon, Caroline Arbour, Jean-Paul Soucy, Jacques Montplaisir, Jean-François Gagnon et al. | 2015 | https://doi.org/10.5665/sleep.4986 | DOI:10.5665/sleep.4986 | source:Crossref
[^p287]: Associative Memory Performance Following Periods of Wakeful Rest and Technological Distraction | Chalise Carlson | https://doi.org/10.31979/etd.28cp-n8p9 | DOI:10.31979/etd.28cp-n8p9 | source:Crossref
[^p288]: Wakeful targeted memory reactivation during short rest periods modulates motor learning via the lateral orbitofrontal cortex network | Ryushin Kawasoe, Kana Matsumura, Taiga Shinohara, Koki Arima, Yuhi Takeo, Takashi Ikeda et al. | https://doi.org/10.1101/2025.07.02.662893 | DOI:10.1101/2025.07.02.662893 | source:Crossref
[^p289]: Starting Seatwork Earlier as a Valid Measure of Student Engagement | Ashish Gurung, Jionghao Lin, Zhongtian Huang, Conrad Borchers, Ryan S. Baker, Vincent Aleven, Kenneth R. Koedinger | 2025 | https://arxiv.org/abs/2505.13341v1 | arXiv:2505.13341v1 | source:ArXiv
[^p290]: Active Learning Through Flexible Collaborative Exams: Improving STEM Assessments | 2025 | https://arxiv.org/abs/2502.01994 | arXiv:2502.01994 | source:ArXiv
[^p291]: Digital interventions and habit formation in educational technology | 2024 | https://arxiv.org/abs/2310.10850 | arXiv:2310.10850 | source:ArXiv
[^p292]: Memory Retrieval Strategies to Help Retain STEM Content Knowledge | O Yasar, P Veronesi, J Maliekal, LJ Little… | 2019 | https://peer.asee.org/memory-retrieval-strategies-to-help-retain-stem-content-knowledge.pdf | source:Google Scholar
[^p293]: A professional development program on memory retrieval strategies for STEM teachers | O Yasar, P Veronesi, J Maliekal… | 2021 | https://www.learntechlib.org/p/217729/ | source:Google Scholar
[^p294]: Examining study habits in undergraduate STEM courses from a situative perspective | MT Hora, AK Oleson | 2017 | https://link.springer.com/article/10.1186/s40594-017-0055-6 | source:Google Scholar
[^p295]: Embedding Study Strategies in STEM Courses to Increase Retention and Success: A Quantitative Study | I Abramyan, M Oehler, L Noble, C Lee… | 2024 | https://www.tandfonline.com/doi/abs/10.1080/0047231X.2023.2292402 | source:Google Scholar
[^p296]: Effective instruction for STEM disciplines: From learning theory to college teaching | EJ Mastascusa, WJ Snyder, BS Hoyt | 2011 | https://books.google.com/books?hl=en&lr=&id=kzzxhXi9-_kC&oi=fnd&pg=PR1&dq=optimal+study+break+activities+for+memory+retention+STEM&ots=iDbENf6_A6&sig=6-W35afojHzYdmDHUjdKS55_EKs | source:Google Scholar
[^p297]: Optimal Foreign Language Learning and Retention: Theoretical and Applied Investigations on the Effects of Presentation Repetition Programs | 2014 | https://doi.org/10.4324/9781410612717-10 | DOI:10.4324/9781410612717-10 | source:Crossref
[^p298]: Memory Wars Break Out | Karl Sabbagh | 2011 | https://doi.org/10.1093/acprof:osobl/9780199218417.003.0005 | DOI:10.1093/acprof:osobl/9780199218417.003.0005 | source:Crossref
[^p299]: Rat auditory neuronal activities related to the retention process of auditory working memory | Yoshio Sakurai | 1990 | https://doi.org/10.1016/0921-8696(90)90210-t | DOI:10.1016/0921-8696(90)90210-t | source:Crossref
[^p300]: Memory for actions in scripted activities as a function of typicality, retention interval, and retrieval task | Donald A. Smith, Arthur C. Graesser | 1981 | https://doi.org/10.3758/bf03202349 | DOI:10.3758/bf03202349 | source:Crossref
[^p301]: Tracking behavioural differences across chronotypes: A case study in Finland using Oura rings | 2025 | https://arxiv.org/abs/2501.01350 | arXiv:2501.01350 | source:ArXiv
[^p302]: Evidence for strong modality-dependence of chronotype assessment from real world calendar app data | 2025 | https://arxiv.org/abs/2502.20602 | arXiv:2502.20602 | source:ArXiv
[^p303]: Automated Chronotyping from a Daily Calendar using Machine Learning | 2024 | https://arxiv.org/abs/2407.06478 | arXiv:2407.06478 | source:ArXiv
[^p304]: Effect of chronotype and student learning time on mathematical ability based on self-regulated learning | N Ratnaningsih, RR El Akbar… | 2018 | https://iopscience.iop.org/article/10.1088/1742-6596/1013/1/012141/meta | source:Google Scholar
[^p305]: Interplay of chronotype and school timing predicts school performance | AP Goldin, M Sigman, G Braier, DA Golombek… | 2020 | https://www.nature.com/articles/s41562-020-0820-2 | source:Google Scholar
[^p306]: Time to learn: h ow chronotype impacts education | G Zerbini, M Merrow | 2017 | https://onlinelibrary.wiley.com/doi/abs/10.1002/pchj.178 | source:Google Scholar
[^p307]: The interaction of chronotype and time of day in a science course: Adolescent evening types learn more and are more motivated in the afternoon | H Itzek | 2016 | https://www.sciencedirect.com/science/article/pii/S1041608016302138 | source:Google Scholar
[^p308]: Review for "The association between chronotype profile and temporomandibular disorders among college students" | 2023 | https://doi.org/10.1111/odi.14859/v1/review2 | DOI:10.1111/odi.14859/v1/review2 | source:Crossref
[^p309]: Association Between the Individual Chronotype and Body Composition in German Students - The ChroNu Study | 2020 | https://doi.org/10.31525/ct1-nct04302922 | DOI:10.31525/ct1-nct04302922 | source:Crossref
[^p310]: Sleep, sleep timing and chronotype in animal behaviour | Christoph Randler | 2014 | https://doi.org/10.1016/j.anbehav.2014.05.001 | DOI:10.1016/j.anbehav.2014.05.001 | source:Crossref
[^p311]: Does Chronotype explain Daily Timing of Music Behaviors? | Shannon Wright, Caroline Palmer | https://doi.org/10.31234/osf.io/h7235 | DOI:10.31234/osf.io/h7235 | source:Crossref
[^p312]: As Time Goes By: Effects of Basal Chronotype and School Timing on Chronotype Development During Adolescence | Guadalupe Rodriguez Ferrante, Andrea Goldin, Mariano Sigman, Maria Leone | https://doi.org/10.21203/rs.3.rs-1118245/v1 | DOI:10.21203/rs.3.rs-1118245/v1 | source:Crossref
[^p313]: Relative benefits of different active learning methods to conceptual physics learning | Meagan Sundstrom, Justin Gambrell, Colin Green, Adrienne L. Traxle, Eric Brewe | 2025 | https://arxiv.org/abs/2505.04577v1 | arXiv:2505.04577v1 | source:ArXiv
[^p314]: Student performance analysis of virtual introductory calculus-based physics class | 2025 | https://arxiv.org/abs/2201.01809 | arXiv:2201.01809 | source:ArXiv
[^p315]: A stochastic approach in physics exercises of mathematics education | 2024 | https://arxiv.org/abs/2410.04076 | arXiv:2410.04076 | source:ArXiv
[^p316]: Comparing student performance on a multi-attempt asynchronous assessment to a single-attempt synchronous assessment in introductory level physics | 2024 | https://arxiv.org/abs/2407.15257 | arXiv:2407.15257 | source:ArXiv
[^p317]: Distributed versus massed practice in high school physics | MG Grote | 1995 | https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1949-8594.1995.tb15736.x | source:Google Scholar
[^p318]: A comparative analysis of massed vs. distributed practice on basic math fact fluency growth rates | GM Schutte, GJ Duhon, BG Solomon, BC Poncy… | 2015 | https://www.sciencedirect.com/science/article/pii/S0022440514001034 | source:Google Scholar
[^p319]: Distributed practice or spacing effect | SK Carpenter | 2020 | https://oxfordre.com/education/display/10.1093/acrefore/9780190264093.001.0001/acrefore-9780190264093-e-859 | source:Google Scholar
[^p320]: Distributed practice: Rarely realized in self-regulated mathematical learning | K Barzagar Nazari, M Ebersbach | 2018 | https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.02170/full | source:Google Scholar
[^p321]: Distributed practice in math facts fluency: A comparative analysis of varied intersession intervals | SL Powell, G Duhon, BC Poncy, M Mwavita… | 2022 | https://www.tandfonline.com/doi/abs/10.1080/2372966X.2020.1802207 | source:Google Scholar
[^p322]: Differences in the Effect of Learning Methods Massed Practice Throwing and Distributed Practice on Learning Outcomes Skills for the Accuracy of Top Softball | Fuad MUSTOFA, Mansur MANSUR, Erick BURHAEİN | 2019 | https://doi.org/10.25307/jssr.571793 | DOI:10.25307/jssr.571793 | source:Crossref
[^p323]: HUBUNGAN PENDEKATAN LATIHAN MASSED PRACTICE DAN DISTRIBUTED PRACTICE TERHADAP KETEPATAN PUKULAN LOB PEMAIN BULUTANGKIS | Arie Asnaldi | 2016 | https://doi.org/10.24036/jm.v1i2.51 | DOI:10.24036/jm.v1i2.51 | source:Crossref
[^p324]: Improving Achievement: Massed Versus Distributed Reading and Practice | James M. Furukawa | 2006 | https://doi.org/10.1037/e529432007-001 | DOI:10.1037/e529432007-001 | source:Crossref
[^p325]: Massed vs. distributed practice in learning dental psycho‐motor skills | NS Logan, RA Hatch, HL Logan | 1975 | https://doi.org/10.1002/j.0022-0337.1975.39.2.tb00858.x | DOI:10.1002/j.0022-0337.1975.39.2.tb00858.x | source:Crossref
[^p326]: Short-term cognitive fatigue of spatial selective attention after face-to-face conversations in virtual noisy environments | 2025 | https://arxiv.org/abs/2509.09479v1 | arXiv:2509.09479v1 | source:ArXiv
[^p327]: Exploring the Optimal Time Window for Predicting Cognitive Load Using Physiological Sensor Data | 2024 | https://arxiv.org/abs/2406.13793 | arXiv:2406.13793 | source:ArXiv
[^p328]: Cognitive Engagement for STEM+C Education: Investigating Serious Game Impact on Graph Structure Learning with fNIRS | 2024 | https://arxiv.org/abs/2307.13637 | arXiv:2307.13637 | source:ArXiv
[^p329]: Self-organized clustering, prediction, and superposition of long-term cognitive decline from short-term individual cognitive test scores in Alzheimer's disease | 2024 | https://arxiv.org/abs/2402.12205 | arXiv:2402.12205 | source:ArXiv
[^p330]: Studying at university in later life slows cognitive decline: A long‐term prospective study | AD Bindoff, MJ Summers, E Hill, J Alty… | 2021 | https://alz-journals.onlinelibrary.wiley.com/doi/abs/10.1002/trc2.12207 | source:Google Scholar
[^p331]: Long-term effects of cognitive training on everyday functional outcomes in older adults | …, AM Stoddard, E Wright, for the ACTIVE Study Group | 2006 | https://jamanetwork.com/journals/jama/article-abstract/204643 | source:Google Scholar
[^p332]: Timing of onset of cognitive decline: results from Whitehall II prospective cohort study | A Singh | 2012 | https://www.bmj.com/content/344/bmj.d7622.short | source:Google Scholar
[^p333]: Does cognitive training prevent cognitive decline? A systematic review | M Butler, E McCreedy, VA Nelson, P Desai… | 2018 | https://www.acpjournals.org/doi/abs/10.7326/m17-1531 | source:Google Scholar
[^p334]: Antioxidants and prevention of cognitive decline: does duration of use matter? | K Yaffe | 2007 | https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/413371 | source:Google Scholar
[^p335]: Prolonged Smartphone Usage Duration With/without Physical Inactivity Is Not Associated With Cognitive Decline In University Students | Hayato Tsukamoto, Kento Dora, Yuki Kusagawa, Ryuunosuke Ogusu, Masafumi Terada, Tadashi Suga | 2024 | https://doi.org/10.1249/01.mss.0001058040.29689.c9 | DOI:10.1249/01.mss.0001058040.29689.c9 | source:Crossref
[^p336]: Prolonged sleep duration as a predictor of cognitive decline: A meta-analysis encompassing 49 cohort studies | Qing Yang, Suya Li, Yang Yang, Xuechun Lin, Mengshu Yang, Chong Tian et al. | 2024 | https://doi.org/10.1016/j.neubiorev.2024.105817 | DOI:10.1016/j.neubiorev.2024.105817 | source:Crossref
[^p337]: Session 9: Booster Session | Colette M. Smart | 2021 | https://doi.org/10.1093/med-psych/9780197510001.003.0010 | DOI:10.1093/med-psych/9780197510001.003.0010 | source:Crossref
[^p338]: Session 8: Final Session: Taking the Practice Forward | Colette M. Smart | 2021 | https://doi.org/10.1093/med-psych/9780197510001.003.0009 | DOI:10.1093/med-psych/9780197510001.003.0009 | source:Crossref
[^p339]: Coarse-to-Fine Process Reward Modeling for Enhanced Mathematical Reasoning | 2025 | https://arxiv.org/abs/2501.13622v1 | arXiv:2501.13622v1 | source:ArXiv
[^p340]: SBI-RAG: Enhancing Math Word Problem Solving for Students through Schema-Based Instruction and Retrieval-Augmented Generation | 2024 | https://arxiv.org/abs/2410.13293 | arXiv:2410.13293 | source:ArXiv
[^p341]: The effect of distributed practice: Neuroscience, cognition, and education | E Gerbier, TC Toppino | 2015 | https://www.sciencedirect.com/science/article/pii/S2211949315000022 | source:Google Scholar
[^p342]: Exploring Contract Law using digital flashcards | S Colbran, A Gilding, A Marinac… | 2015 | https://www.researchgate.net/profile/Stephen-Colbran/publication/294089112_EXPLORING_CONTRACT_LAW_USING_DIGITAL_FLASHCARDS/links/56be047d08ae44da37f88832/EXPLORING-CONTRACT-LAW-USING-DIGITAL-FLASHCARDS.pdf | source:Google Scholar
[^p343]: The masked repetition priming effect dissipates when increasing the inter-stimulus interval: Evidence from word naming | Ludovic Ferrand | 1996 | https://doi.org/10.1016/0001-6918(95)00010-0 | DOI:10.1016/0001-6918(95)00010-0 | source:Crossref
[^p344]: The effect of inter-ocular delay and repetition interval on depth perception | Eugene R. Wist, Walter C. Gogel | 1966 | https://doi.org/10.1016/0042-6989(66)90066-6 | DOI:10.1016/0042-6989(66)90066-6 | source:Crossref
[^p345]: Supplemental Information 4: Factors affecting the inter-visit interval | https://doi.org/10.7717/peerj.17189/supp-4 | DOI:10.7717/peerj.17189/supp-4 | source:Crossref
[^p346]: Implicit sequence learning: Inter-stimulus interval and subjective experience | Gáspár Lukács, Katalin Huszár, Emese Hallgató | https://doi.org/10.31219/osf.io/u7a8g | DOI:10.31219/osf.io/u7a8g | source:Crossref
[^p347]: The inter-session recovery interval in heavy resistance training | Peter A. Logan | https://doi.org/10.14264/2b5ddad | DOI:10.14264/2b5ddad | source:Crossref
[^p348]: Cognitive Performance Measurements and the Impact of Sleep Quality Using Wearable and Mobile Sensors | 2025 | https://arxiv.org/abs/2501.15583 | arXiv:2501.15583 | source:ArXiv
[^p349]: Aircrew rostering workload patterns and associated fatigue and sleepiness scores in short/medium haul flights under RBAC 117 rules in Brazil | 2024 | https://arxiv.org/abs/2408.08889 | arXiv:2408.08889 | source:ArXiv
[^p350]: Associations Between Sleep Efficiency Variability and Cognition Among Older Adults: Cross-Sectional Accelerometer Study | 2023 | https://arxiv.org/abs/2309.08809 | arXiv:2309.08809 | source:ArXiv
[^p351]: Effects of post short nap sleep inertia on cognitive and psychomotor task performance | DR Bhatt, NK Tripathy, BM Sekhar… | 2021 | https://indjaerospacemed.com/effects-of-post-short-nap-sleep-inertia-on-cognitive-and-psychomotor-task-performance/ | source:Google Scholar
[^p352]: Sleep Inertia in Aviation | F Sauvet, V Beauchamps… | 2024 | https://asma.kglmeridian.com/view/journals/amhp/95/4/article-p206.xml | source:Google Scholar
[^p353]: Awakening from a nighttime nap: physiological and cognitive effects of sleep inertia and behavioral countermeasures | Q Zhang, L Ding, Y Wen, W Chen, F Zhang, F Yao… | 2025 | https://www.tandfonline.com/doi/abs/10.1080/00140139.2025.2588169 | source:Google Scholar
[^p354]: Fatigue on the flight deck: the consequences of sleep loss and the benefits of napping | BM Hartzler | 2014 | https://www.sciencedirect.com/science/article/pii/S0001457513004077 | source:Google Scholar
[^p355]: Fatigue in aviation sustained operations, the utility of napping, and the problem of sleep inertia | JA Caldwell, BF Frazinko, BS Caldwell | 2002 | https://apps.dtic.mil/sti/html/tr/ADP013766/ | source:Google Scholar
[^p356]: Performance monitoring during sleep inertia after a 1-h daytime nap | SHOICHI ASAOKA, HIROAKI MASAKI, KEIKO OGAWA, TIMOTHY I. MURPHY, KAZUHIKO FUKUDA, KATUO YAMAZAKI | 2010 | https://doi.org/10.1111/j.1365-2869.2009.00811.x | DOI:10.1111/j.1365-2869.2009.00811.x | source:Crossref
[^p357]: Sleep inertia and cognitive performance | Corrado Cavallero, Francesco Versace | 1997 | https://doi.org/10.1037/e536982012-317 | DOI:10.1037/e536982012-317 | source:Crossref
[^p358]: Effects of sleep inertia on cognitive performance following a 1-hour nap | Pierre Salamé, Hélène Otzenberger, Jean Ehrhart, Gérard Dewasmes, Alain Nicolas, Patricia Tassi et al. | 1995 | https://doi.org/10.1080/02678379508256898 | DOI:10.1080/02678379508256898 | source:Crossref
[^p359]: Sleep effects on brain, cognition, and mental health during adolescence are mediated by the glymphatic system | 2025 | https://arxiv.org/abs/2512.08704v1 | arXiv:2512.08704v1 | source:ArXiv
[^p360]: Surf or sleep? Understanding the influence of bedtime patterns on campus | 2022 | https://arxiv.org/abs/2202.09283 | arXiv:2202.09283 | source:ArXiv
[^p361]: Naps and sleep deprivation: Why academic libraries should consider adding nap stations to their services for students | MJ Wise | 2018 | https://www.tandfonline.com/doi/abs/10.1080/13614533.2018.1431948 | source:Google Scholar
[^p362]: Short naps improve subsequent learning in a high school setting | V Vidal, MR Pretel, L Capurro, LM Tassone… | 2025 | https://www.nature.com/articles/s41539-025-00307-4 | source:Google Scholar
[^p363]: Napping in college students and its relationship with nighttime sleep | L Ye, S Hutton Johnson, K Keane… | 2015 | https://www.tandfonline.com/doi/abs/10.1080/07448481.2014.983926 | source:Google Scholar
[^p364]: The long-term memory benefits of a daytime nap compared with cramming | JN Cousins, KF Wong, BL Raghunath, C Look… | 2019 | https://academic.oup.com/sleep/article-abstract/42/1/zsy207/5146032 | source:Google Scholar
[^p365]: The Experience and Persistence of College Students in STEM Majors | Yonghong Jade Xu | 2018 | https://doi.org/10.1177/1521025116638344 | DOI:10.1177/1521025116638344 | source:Crossref
[^p366]: Using wiki-based discussion forums in calculus: E-pathway toward improving students' retention and learning in STEM gateway courses (Minority serving two-year college settings) | Natalia Mosina | 2014 | https://doi.org/10.1109/isecon.2014.6891038 | DOI:10.1109/isecon.2014.6891038 | source:Crossref
[^p367]: Napping on the Afternoon of My Thirty-ninth Birthday | 2005 | https://doi.org/10.2307/jj.11374749.8 | DOI:10.2307/jj.11374749.8 | source:Crossref
[^p368]: A Retention Model for Community College STEM Students | Jennifer Snyder, Elizabeth Cudney | https://doi.org/10.18260/1-2--29719 | DOI:10.18260/1-2--29719 | source:Crossref
[^p369]: Napping in the afternoon can improve memory and alertness – here’s why | John Axelsson, Tina Sundelin | https://doi.org/10.64628/ab.7ngsjhsu6 | DOI:10.64628/ab.7ngsjhsu6 | source:Crossref
[^p370]: A novel method to separate circadian from non-circadian masking effects in order to enhance daily circadian timing and amplitude estimation from core body temperature | 2024 | https://arxiv.org/abs/2408.15295 | arXiv:2408.15295 | source:ArXiv
[^p371]: Effects of Daily Exercise Time on the Academic Performance of Students: An Empirical Analysis Based on CEPS Data | 2024 | https://arxiv.org/abs/2312.11484 | arXiv:2312.11484 | source:ArXiv
[^p372]: THE ASSOCIATION OF CIRCADIAN RHYTHMS WITH ACADEMIC, PHYSICAL, AND COGNITIVE PERFORMANCE: A SYSTEMATIC REVIEW | I Sabaoui, S Lotfi, M Talbi | 2024 | https://cyberleninka.ru/article/n/the-association-of-circadian-rhythms-with-academic-physical-and-cognitive-performance-a-systematic-review | source:Google Scholar
[^p373]: Morning or evening? an examination of circadian rhythms of CS1 students | A Zavgorodniaia, R Shrestha… | 2021 | https://ieeexplore.ieee.org/abstract/document/9402200/ | source:Google Scholar
[^p374]: Circadian preference and thinking styles: implications for school achievement | JF Diaz | 2013 | https://www.tandfonline.com/doi/abs/10.3109/07420528.2013.813854 | source:Google Scholar
[^p375]: Circadian preference and academic achievement in school-aged students: A systematic review and a longitudinal investigation of reciprocal relations | V Scherrer, F Preckel | 2021 | https://www.tandfonline.com/doi/abs/10.1080/07420528.2021.1921788 | source:Google Scholar
[^p376]: Chronotype, Light Exposure, Sleep, and Daytime Functioning in High School Students Attending Morning or Afternoon School Shifts | Jeanne Sophie Martin, Michael M. Gaudreault, Michel Perron, Luc Laberge | 2016 | https://doi.org/10.1177/0748730415625510 | DOI:10.1177/0748730415625510 | source:Crossref
[^p377]: Cerebrovascular responses during rowing: Do circadian rhythms explain morning and afternoon performance differences? | O. K. Faull, J. D. Cotter, S. J. E. Lucas | 2015 | https://doi.org/10.1111/sms.12273 | DOI:10.1111/sms.12273 | source:Crossref
[^p378]: Phase advancing human circadian rhythms with morning bright light, afternoon melatonin, and gradually shifted sleep: can we reduce morning bright-light duration? | Stephanie J. Crowley, Charmane I. Eastman | 2015 | https://doi.org/10.1016/j.sleep.2014.12.004 | DOI:10.1016/j.sleep.2014.12.004 | source:Crossref
[^p379]: Afternoon | Andy Hinds | 2013 | https://doi.org/10.5040/9781350366503.00000010 | DOI:10.5040/9781350366503.00000010 | source:Crossref
[^p380]: Morning sunlight can phase advance the circadian rhythm of young adults | Simon SMITH, John TRINDER | 2005 | https://doi.org/10.1111/j.1479-8425.2005.00153.x | DOI:10.1111/j.1479-8425.2005.00153.x | source:Crossref
[^p381]: Does Learning Mathematical Problem-Solving Generalize to Broader Reasoning? | Ruochen Zhou, Minrui Xu, Shiqi Chen, Junteng Liu, Yunqi Li, Xinxin Lin, Zhengyu Chen, Junxian He | 2025 | https://arxiv.org/abs/2507.04391v1 | arXiv:2507.04391v1 | source:ArXiv
[^p382]: MATH-Perturb: Benchmarking LLMs' Math Reasoning Abilities against Hard Perturbations | 2025 | https://arxiv.org/abs/2502.06453 | arXiv:2502.06453 | source:ArXiv
[^p383]: Ill-defined problem solving does not benefit from daytime napping | M Hołda, A Głodek, M Dankiewicz | 2020 | https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.00559/full | source:Google Scholar
[^p384]: Nap timing makes a difference: sleeping sooner rather than later after learning improves infants' locomotor problem solving | A DeMasi, MN Horger, AM Allia, A Scher… | 2021 | https://www.sciencedirect.com/science/article/pii/S0163638321001260 | source:Google Scholar
[^p385]: Time of day effects on problem solving: When the non-optimal is optimal | MB Wieth, RT Zacks | 2011 | https://www.tandfonline.com/doi/abs/10.1080/13546783.2011.625663 | source:Google Scholar
[^p386]: Impact of nap length, nap timing and sleep quality on sustaining early morning performance | T Kubo, H Takeyama, S Matsumoto, T Ebara… | 2007 | https://www.jstage.jst.go.jp/article/indhealth/45/4/45_4_552/_article/-char/ja/ | source:Google Scholar
[^p387]: Modelling Blood and Pulmonary Pressure for Solving a Performance Optimal Problem for Sportsmen | Jean Marie Ntaganda | 2012 | https://doi.org/10.5402/2012/470143 | DOI:10.5402/2012/470143 | source:Crossref
[^p388]: Writing About the Problem Solving Process to Improve Problem Solving Performance | Kenneth M. Williams | 2003 | https://doi.org/10.5951/mt.96.3.0185 | DOI:10.5951/mt.96.3.0185 | source:Crossref
[^p389]: Measures of Problem-Solving Performance and of Problem-Solving Instruction | Alan H. Schoenfeld | 1982 | https://doi.org/10.2307/748435 | DOI:10.2307/748435 | source:Crossref
[^p390]: Adaptive Synthesized Control for Solving The Optimal Control Problem | Askhat Diveev, Elizaveta Shmalko | https://doi.org/10.20944/preprints202309.0302.v1 | DOI:10.20944/preprints202309.0302.v1 | source:Crossref
[^p391]: Figure V.4.5. Gender differences in collaborative problem-solving, science, reading and mathematics performance | https://doi.org/10.1787/888933616009 | DOI:10.1787/888933616009 | source:Crossref
[^p392]: Symbolic or Numerical? Understanding Physics Problem Solving in Reasoning LLMs | Nifu Dan, Yujun Cai, Yiwei Wang | 2025 | https://arxiv.org/abs/2507.01334v1 | arXiv:2507.01334v1 | source:ArXiv
[^p393]: Accelerate Parallelizable Reasoning via Parallel Decoding within One Sequence | Yijiong Yu | 2025 | https://arxiv.org/abs/2503.20533v1 | arXiv:2503.20533v1 | source:ArXiv
[^p394]: Interleaving Effects in Mathematics: Comparing interleaving, blocking and exposition strategies for teaching secondary school pupils how to classify … | P Rowlandson | 2023 | http://etheses.dur.ac.uk/14943/1/Paul_Rowlandson_-_Thesis_-_Interleaving_Effects_in_Mathematics_-_2023.pdf?DDD29+ | source:Google Scholar
[^p395]: Interleaving helps students distinguish among similar concepts | D Rohrer | 2012 | https://link.springer.com/article/10.1007/s10648-012-9201-3 | source:Google Scholar
[^p396]: INTERLEAVE PRACTICE TO PROMOTE STUDENTS'PROBLEM SOLVING FLUENCY IN MATHEMATICS | EP Bab𝒂𝟏, LS Lomibao | https://www.researchgate.net/profile/Edsel-Monterola-2/publication/380788093_INTERLEAVE_PRACTICE_TO_PROMOTE_STUDENTS'_PROBLEM_SOLVING_FLUENCY_IN_MATHEMATICS/links/664ea32b22a7f16b4f4383fd/INTERLEAVE-PRACTICE-TO-PROMOTE-STUDENTS-PROBLEM-SOLVING-FLUENCY-IN-MATHEMATICS.pdf | source:Google Scholar
[^p397]: The role of executive function abilities in interleaved vs. blocked learning of science concepts | J Park, K Varma, S Varma | 2023 | https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1199682/full | source:Google Scholar
[^p398]: Problem-creating vs problem-solving | 2013 | https://doi.org/10.4324/9780203758311-8 | DOI:10.4324/9780203758311-8 | source:Crossref
[^p399]: Problem solving vs. conceptual understanding | Marcelo Alonso | 1992 | https://doi.org/10.1119/1.17056 | DOI:10.1119/1.17056 | source:Crossref
[^p400]: Enthusiasm vs Effectiveness in Group and Individual Problem-Solving | G. A. Milton | 1965 | https://doi.org/10.2466/pr0.1965.16.3c.1197 | DOI:10.2466/pr0.1965.16.3c.1197 | source:Crossref
[^p401]: Samani and Pan (2021) Interleaving enhances memory and problem-solving skills in physics | JOSHUA SAMANI, Steven C. Pan | https://doi.org/10.31234/osf.io/uwn3k | DOI:10.31234/osf.io/uwn3k | source:Crossref
[^p402]: Student Explanation Strategies in Postsecondary Mathematics and Statistics Education: A Scoping Review | Huixin Gao, Tanya Evans, Anna Fergusson | 2025 | https://arxiv.org/abs/2503.19237v1 | arXiv:2503.19237v1 | source:ArXiv
[^p403]: Uncovering Hidden Variables: A Physics Classroom Activity on Correlation and Causation | 2025 | https://arxiv.org/abs/2412.04150 | arXiv:2412.04150 | source:ArXiv
[^p404]: Learning mathematics from worked-out examples: Analyzing and fostering self-explanations | A Renkl | 1999 | https://link.springer.com/article/10.1007/BF03172974 | source:Google Scholar
[^p405]: How do students learn to apply their mathematical knowledge to interpret graphs in physics? | J Woolnough | 2000 | https://link.springer.com/article/10.1007/BF02461633 | source:Google Scholar
[^p406]: The content of physics self-explanations | MTH Chi, KA VanLehn | 1991 | https://www.tandfonline.com/doi/abs/10.1207/s15327809jls0101_4 | source:Google Scholar
[^p407]: The role of mathematics for physics teaching and understanding | G Pospiech, BS Eylon, E Bagno, Y Lehavi… | 2015 | https://papers.sif.it/?pid=ncc10995 | source:Google Scholar
[^p408]: Students' understanding of two-variable calculus concepts in mathematics and physics contexts. II. The gradient and the Laplacian | M Al Dehaybes, J Deprez, P van Kampen… | 2025 | https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.21.010132 | source:Google Scholar
[^p409]: On Explaining, Explanations and Second Graders | Rina Hershkowitz, Abraham Arcavi | 2022 | https://doi.org/10.1163/9789004510685_010 | DOI:10.1163/9789004510685_010 | source:Crossref
[^p410]: Discriminative Learning and the Lexicon: NDL and LDL | Yu-Ying Chuang, R. Harald Baayen | 2021 | https://doi.org/10.1093/acrefore/9780199384655.013.375 | DOI:10.1093/acrefore/9780199384655.013.375 | source:Crossref
[^p411]: Classroom Interaction and Mathematics Learning: The Role of Explaining and Engaging With Others' Ideas | Noreen Webb | 2020 | https://doi.org/10.3102/1571399 | DOI:10.3102/1571399 | source:Crossref
[^p412]: Learning With and From Others: A Review of The International Handbook of Collaborative Learning | Alan H. Schoenfeld | 2014 | https://doi.org/10.5951/jresematheduc.45.5.0675 | DOI:10.5951/jresematheduc.45.5.0675 | source:Crossref
[^p413]: Convincing Yourself and Others | John Healey Mason | 1988 | https://doi.org/10.1007/978-1-349-09782-1_4 | DOI:10.1007/978-1-349-09782-1_4 | source:Crossref
[^p414]: Semiparametric Models for Practice Effects in Longitudinal Cognitive Trajectories: Application to an Aging Cohort Study | 2025 | https://arxiv.org/abs/2511.21001v1 | arXiv:2511.21001v1 | source:ArXiv
[^p415]: Integrated STEM education: the effects of a long-term intervention on students' cognitive performance | H De Loof, B Pauw… | 2022 | https://repository.uantwerpen.be/link/irua/192670 | source:Google Scholar
[^p416]: Course of cognitive decline in hematopoietic stem cell transplantation: a within-subjects design | MA Friedman, M Fernandez, JS Wefel… | 2009 | https://academic.oup.com/acn/article-abstract/24/7/689/3158 | source:Google Scholar
[^p417]: Which cognitive abilities make the difference? Predicting academic achievements in advanced STEM studies | M Berkowitz, E Stern | 2018 | https://www.mdpi.com/2079-3200/6/4/48 | source:Google Scholar
[^p418]: Undergraduate STEM achievement and retention: Cognitive, motivational, and institutional factors and solutions | JG Cromley, T Perez, A Kaplan | 2016 | https://journals.sagepub.com/doi/abs/10.1177/2372732215622648 | source:Google Scholar
[^p419]: The enhanced flipped classroom: Increasing academic performance with student-recorded lectures and practice testing in a" flipped" STEM course | CP Talley, S Scherer | 2013 | https://muse.jhu.edu/pub/417/article/803083/summary | source:Google Scholar
[^p420]: Session 2: Noticing Slip-Ups | Colette M. Smart | 2021 | https://doi.org/10.1093/med-psych/9780197510124.003.0002 | DOI:10.1093/med-psych/9780197510124.003.0002 | source:Crossref
[^p421]: Straight to Zero: Why Linearly Decaying the Learning Rate to Zero Works Best for LLMs | 2025 | https://arxiv.org/abs/2502.15938 | arXiv:2502.15938 | source:ArXiv
[^p422]: The Surprising Agreement Between Convex Optimization Theory and Learning-Rate Scheduling for Large Model Training | Fabian Schaipp, Alexander Hägele, Adrien Taylor, Umut Simsekli, Francis Bach | 2025 | https://arxiv.org/abs/2501.18965v1 | arXiv:2501.18965v1 | source:ArXiv
[^p423]: The effects of different protocols of physical exercise and rest on long-term memory | W Pyke, F Ifram, L Coventry, Y Sung, I Champion… | 2020 | https://www.sciencedirect.com/science/article/pii/S1074742719301959 | source:Google Scholar
[^p424]: Making long-term memories in minutes: a spaced learning pattern from memory research in education | P Kelley, T Whatson | 2013 | https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2013.00589/full | source:Google Scholar
[^p425]: Boosting long-term memory via wakeful rest: intentional rehearsal is not necessary, consolidation is sufficient | M Dewar, J Alber, N Cowan, S Della Sala | 2014 | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0109542&source=post_page-----af4466ba83ba---------------------- | source:Google Scholar
[^p426]: Effects of post-encoding wakeful rest and study time on long-term memory performance | M Martini, C Martini, T Maran… | 2018 | https://www.tandfonline.com/doi/abs/10.1080/20445911.2018.1506457 | source:Google Scholar
[^p427]: Brief wakeful resting boosts new memories over the long term | M Dewar, J Alber, C Butler, N Cowan… | 2012 | https://journals.sagepub.com/doi/abs/10.1177/0956797612441220 | source:Google Scholar
[^p428]: Influence of rest interval between plyometric training sessions on functional performance tests | Abbas Asadi | 2015 | https://doi.org/10.16926/par.2015.01.01 | DOI:10.16926/par.2015.01.01 | source:Crossref
[^p429]: Contracting, equal, and expanding learning schedules: The optimal distribution of learning sessions depends on retention interval | Carolina E. Küpper-Tetzel, Irina V. Kapler, Melody Wiseheart | 2014 | https://doi.org/10.3758/s13421-014-0394-1 | DOI:10.3758/s13421-014-0394-1 | source:Crossref
[^p430]: The link between language learning and long-term memory | Kavya Kadia | https://doi.org/10.21203/rs.3.rs-1842265/v2 | DOI:10.21203/rs.3.rs-1842265/v2 | source:Crossref
[^p431]: Should I rest or should I go now? A comparison between fixed and self-selected rest durations in high-intensity interval training cycling sessions | Eyal Colorni, Evyatar Ohayon, Julie Côté, Uri Obolski, Israel Halperin | https://doi.org/10.51224/srxiv.248 | DOI:10.51224/srxiv.248 | source:Crossref
[^p432]: Optimal Protocols for Continual Learning via Statistical Physics and Control Theory | 2025 | https://arxiv.org/abs/2409.18061 | arXiv:2409.18061 | source:ArXiv
[^p433]: Personalized Forgetting Mechanism with Concept-Driven Knowledge Tracing | 2024 | https://arxiv.org/abs/2404.12127 | arXiv:2404.12127 | source:ArXiv
[^p434]: The power of forgetting in statistical hypothesis testing | 2024 | https://arxiv.org/abs/2402.06920 | arXiv:2402.06920 | source:ArXiv
[^p435]: Review Learning: Alleviating Catastrophic Forgetting with Generative Replay without Generator | 2022 | https://arxiv.org/abs/2210.09394 | arXiv:2210.09394 | source:ArXiv
[^p436]: Power laws from individual differences in learning and forgetting: mathematical analyses | JMJ Murre, AG Chessa | 2011 | https://link.springer.com/article/10.3758/s13423-011-0076-y | source:Google Scholar
[^p437]: The form of the forgetting curve and the fate of memories | L Averell, A Heathcote | 2011 | https://www.sciencedirect.com/science/article/pii/S0022249610001100 | source:Google Scholar
[^p438]: One hundred years of forgetting: A quantitative description of retention. | DC Rubin, AE Wenzel | 1996 | https://psycnet.apa.org/record/1996-06397-006 | source:Google Scholar
[^p439]: Forgetting and the learning curve: A laboratory study | CD Bailey | 1989 | https://pubsonline.informs.org/doi/abs/10.1287/mnsc.35.3.340 | source:Google Scholar
[^p440]: On the form of forgetting | JT Wixted, EB Ebbesen | 1991 | https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.1991.tb00175.x | source:Google Scholar
[^p441]: Algebraic curve interpolation for intervals via symbolic-numeric computation | Dehbi Lydia, Yang Zhengfeng, Peng Chao, Xu Yaochen, Zeng Zhenbing | 2023 | https://doi.org/10.1360/scm-2023-0092 | DOI:10.1360/scm-2023-0092 | source:Crossref
[^p442]: Forgetting Curve on Basic Cardiopulmonary Resuscitation Competence in Simulation Models | 2016 | https://doi.org/10.23880/oajprs-16000105 | DOI:10.23880/oajprs-16000105 | source:Crossref
[^p443]: Forgetting Curve | 2009 | https://doi.org/10.4135/9781412972024.n1046 | DOI:10.4135/9781412972024.n1046 | source:Crossref
[^p444]: Chance and the curve of forgetting. | Matthew N. Chappell | 1931 | https://doi.org/10.1037/h0075176 | DOI:10.1037/h0075176 | source:Crossref
[^p445]: The Curve of Forgetting For Substance Material | Leslie Briggs | https://doi.org/10.58809/vwwh3695 | DOI:10.58809/vwwh3695 | source:Crossref

# Research Report: Comprehensive Practices for Effective Learning, Memory Retention, and Rest Cycles in STEM

## I. Introduction and Cognitive Foundations
Learning complex subjects like Mathematics and Physics requires more than just exposure to information; it demands a strategic alignment with human cognitive architecture. This report synthesizes findings from cognitive science, educational psychology, and neurobiology to provide a proven framework for encoding knowledge into long-term memory. The central thesis is that effective learning is a rhythmic process involving intense cognitive load balanced by strategic "offline" consolidation periods.

The framework rests on three pillars:
1.  **Cognitive Load Management**: Optimizing the limited capacity of working memory.
2.  **Consolidation Dynamics**: Leveraging rest and sleep to stabilize neural traces.
3.  **Active Reconstruction**: Using testing and retrieval to strengthen neural pathways.

## II. Strategic Rest and Interval Management

Effective learning occurs not just during the "wake" phase of active study but crucially during the "offline" states where neural replay and consolidation occur.

### 1. Within-Session Intervals (Micro-Cycles)
The brain's ability to maintain high-quality focus is finite. Managing energy within a single study session is critical for avoiding cognitive fatigue.

*   **Cognitive Focus Limits**: Research indicates that focus quality typically declines after **20–30 minutes** of intense cognitive load [^p3][^p6]. For high-complexity tasks like solving differential equations or conceptualizing quantum mechanics, the "time-on-task" must be balanced against the onset of decision fatigue.
*   **The Pomodoro vs. Flowtime**: 
    *   *Pomodoro Technique*: The traditional 25-minute work / 5-minute break cycle is excellent for initiating work and combating procrastination [^p35][^p40].
    *   *Flowtime Method*: For deep STEM work, rigid timers can interrupt a "flow state." The Flowtime approach involves working until a natural break in concentration occurs (e.g., finishing a proof) and then taking a break proportional to the work time (e.g., 5-minute break for 25 minutes of work; 15-minute break for 90 minutes) [^p7][^p9][^p36].
*   **Wakeful Rest (The "Do Nothing" Technique)**:
    *   *Mechanism*: Immediately following a learning session, the brain engages in "offline replay," firing the same neuronal patterns used during learning at high speeds.
    *   *Protocol*: Take a 10–15 minute break of "quiet rest." Crucially, this means **eyes closed, no phone, no music, and no social interaction**.
    *   *Impact*: Studies show this specific type of rest can improve memory retention by **10–30%** compared to jumping immediately into a distractor task (like checking email), as it minimizes "retroactive interference" [^p6][^p8][^p13][^p213].

### 2. Spaced Repetition (The Macro-Cycle)
The "Spacing Effect" is one of the most robust findings in cognitive science. It dictates that the gap *between* study sessions is more influential than the duration of the sessions themselves [^p99][^p100].

**Table 1: Optimal Spacing Intervals for Retention Goals**

| Goal Retention Period | Recommended First Interval | Subsequent Interval Multiplier | Scientific Rationale |
| :--- | :--- | :--- | :--- |
| **1 Week** (Exam Prep) | 1–2 Days | 1.5x | Rapid reinforcement prevents early decay [^p6]. |
| **1 Month** | 1 Week | 2.0x | Expanding intervals challenges retrieval [^p97]. |
| **6 Months** | 3 Weeks | 2.5x | Long gaps force "reconstructive" effort [^p216]. |
| **Lifetime** (Mastery) | 3–6 Months | 3.0x | Transitions knowledge to semantic memory [^p8]. |

*   **The "Forgetting" Benefit**: Paradoxically, learning is most effective when you are on the verge of forgetting. Re-learning a concept at this moment of "high retrieval effort" triggers a stronger neurochemical signal for plasticity than reviewing something you already know perfectly [^p11][^p173].

## III. The Critical Role of Sleep in STEM Learning

Sleep is not merely a passive state of rest but the primary biological mechanism for moving information from the temporary, limited storage of the hippocampus to the permanent, stable storage of the neocortex.

### 1. Post-Learning Sleep (The Consolidation Phase)
*   **Timing Matters**: Sleeping sooner rather than later after learning a new concept (especially complex logic or motor skills) significantly stabilizes the memory trace [^p6][^p82]. "Sleep-dependent" memory consolidation is particularly sensitive to interference; staying awake for long periods after studying exposes the fragile memory trace to competing stimuli [^p141].
*   **NREM 3 (Slow-Wave Sleep)**: This deep sleep stage is critical for consolidating "declarative" knowledge—facts, formulas, and explicit definitions. Insufficient deep sleep leads to "catastrophic forgetting," where new neural patterns are overwritten before they can be stabilized [^p31][^p77].
*   **REM Sleep (Integration)**: Rapid Eye Movement sleep is associated with "connecting the dots" and insight problem-solving. It helps learners integrate new concepts into their existing "schema," which is vital for creative physics applications where one must apply a known law to a novel scenario [^p65][^p177].

### 2. Strategic Napping Protocols
Napping is a potent tool for "mid-day consolidation," essentially allowing for two distinct learning days in one chronological day.

*   **The "NASA Nap" (Power Nap)**:
    *   *Duration*: 10–20 minutes.
    *   *Benefit*: Restores alertness and attention without inducing sleep inertia. Ideal before a study session to prime the brain for focus [^p14][^p17].
*   **The Full Cycle Nap**:
    *   *Duration*: ~90 minutes.
    *   *Benefit*: Allows for a full cycle of NREM and REM sleep. Research suggests this length improves "associative memory" (linking concepts) and creative problem-solving significantly better than shorter naps [^p4][^p13].
*   **Sleep Inertia Warning**: Avoid waking up during deep sleep (typically occurs between 30 and 60 minutes). Waking from this stage causes severe grogginess and temporary cognitive decline (sleep inertia) [^p5][^p9][^p133].

## IV. Subject-Specific Optimization: Mathematics and Physics

STEM subjects are hierarchical; understanding $C$ requires a mastery of $B$, which requires $A$. This dependency structure demands specific cognitive strategies.

### 1. Interleaving vs. Blocking
Most textbooks use "blocking": a chapter on Kinematics followed by 20 Kinematics problems. Research shows this creates a false sense of mastery.

*   **The Strategy**: **Interleaving**. Mix different types of problems in a single session (e.g., 5 Kinematics, 5 Dynamics, 5 Energy problems).
*   **The Mechanism**: This forces the brain to perform **discrimination learning**—identifying *which* tool to use—rather than just executing the tool. It mimics real-world problem solving and exams [^p98][^p101].
*   **Result**: While blocking feels easier during practice, interleaving leads to significantly higher "procedural flexibility" and better performance on "surprise" tests with novel problems [^p13][^p102][^p177].

### 2. Mathematical Sensemaking and Re-derivation
*   **Against Rote Memorization**: Memorizing equations is fragile. If a variable is forgotten, the student is stuck.
*   **Reconstructive Memory**: Practice "sensemaking" by re-deriving formulas from first principles (e.g., deriving the Range formula from Newton's Laws). If you forget the formula, you can "reconstruct" it through qualitative logic. This builds a robust "knowledge graph" rather than isolated nodes of data [^p114][^p145].
*   **Dimensional Analysis as a Cue**: Use units (e.g., meters/second) as a "syntax check" during study. This acts as a low-load retrieval cue that reinforces the physical meaning of the math [^p8][^p190].

### 3. The Feynman Technique
*   **Process**: Attempt to explain a complex concept (e.g., Entropy or Eigenvectors) to a fictitious non-expert or child in simple language.
*   **Gap Identification**: The moment you use jargon ("...and then the wavefunction collapses...") to bridge a gap in your explanation, you have identified a blind spot.
*   **Resolution**: Return to the source material to simplify that specific link. This "directed retrieval" creates deep conceptual understanding [^p144][^p2].

## V. Community Implementation Guide

For educators, study groups, or platform developers, these individual practices can be scaled into community norms.

**Table 2: Actionable Implementation Matrix**

| Category | Practical Recommendation | Scientific Basis | Implementation Example |
| :--- | :--- | :--- | :--- |
| **Session Structure** | **50/10 Protocol**: 50m work / 10m "Wakeful Rest" | Cognitive Load Theory & Micro-consolidation [^p29][^p6] | A library designating a "Quiet Zone" with no-tech rules for breaks. |
| **Rest Protocol** | **Sensory Deprivation**: Eyes closed, no phone during breaks | Interference protection for new memories [^p13] | Study apps that lock the screen *during the break* to prevent scrolling. |
| **Curriculum Design** | **Spiral Syllabus**: Revisit topics at expanding intervals | Spaced Repetition/Ebbinghaus Curve [^p93][^p105] | Homework sets that include 30% "old" material from previous months. |
| **Problem Sets** | **Shuffled Decks**: Mix problem types (Interleaving) | Discrimination Learning [^p101][^p177] | Digital platforms providing "Daily Mix" quizzes rather than topic-specific ones. |
| **Sleep Culture** | **No-Cramming Norms**: Discourage all-nighters | Glymphatic clearance & SWS/REM cycles [^p1][^p62] | Universities setting assignment deadlines at 5:00 PM, not 11:59 PM. |

## VI. Visualizing the Optimal Learning Workflow

To better understand how these components fit together into a cohesive daily routine, the following visualization outlines an optimized timeline for a learner engaging in complex STEM study.

![Figure: Optimal Learning Workflow Timeline](https://generated_image_url_placeholder)

*Figure 1: This timeline illustrates the integration of focused study blocks (Flowtime), Wakeful Rest, Interleaved Practice, and Sleep Cycles. Note the placement of high-cognitive load tasks during peak alertness and the use of strategic naps.*

### Key Takeaway for Implementation
The most critical error in current educational habits is the **elimination of rest** to increase "productivity." The science is clear: **Rest is when learning happens.** By respecting biological limits and spacing out retrieval, learners can achieve higher retention with potentially fewer total hours of study.

## References

### Papers

[^p1]: LECTOR: LLM-Enhanced Concept-based Test-Oriented Repetition for Adaptive Spaced Learning | Jiahao Zhao | 2025 | https://arxiv.org/abs/2508.03275v1 | arXiv:2508.03275v1 | source:ArXiv
[^p2]: Integrating Attentional Factors and Spacing in Logistic Knowledge Tracing Models to Explore the Impact of Training Sequences on Category Learning | 2024 | https://arxiv.org/abs/2407.15020 | arXiv:2407.15020 | source:ArXiv
[^p3]: Watch Your Step: Optimal Retrieval for Continual Learning at Scale | 2024 | https://arxiv.org/abs/2404.10758 | arXiv:2404.10758 | source:ArXiv
[^p4]: Learning to Read through Machine Teaching | 2020 | https://arxiv.org/abs/2006.16470 | arXiv:2006.16470 | source:ArXiv
[^p5]: Adaptive Forgetting Curves for Spaced Repetition Language Learning | 2020 | https://arxiv.org/abs/2004.11327 | arXiv:2004.11327 | source:ArXiv
[^p6]: Spaced repetition promotes efficient and effective learning: Policy implications for instruction | SHK Kang | 2016 | https://journals.sagepub.com/doi/abs/10.1177/2372732215624708 | source:Google Scholar
[^p7]: Enhancing human learning via spaced repetition optimization | B Tabibian, U Upadhyay, A De, A Zarezade… | 2019 | https://www.pnas.org/doi/abs/10.1073/pnas.1815156116 | source:Google Scholar
[^p8]: Spaced Repetition: Towards More Effective Learning in STEM. | A Voice, A Stirton | 2020 | https://eric.ed.gov/?id=EJ1241511 | source:Google Scholar
[^p9]: The effect of spaced repetition on learning and knowledge transfer in a large cohort of practicing physicians | DW Price, T Wang, TR O'Neill, ZJ Morgan… | 2025 | https://academic.oup.com/academicmedicine/article-abstract/100/1/94/8326145 | source:Google Scholar
[^p10]: Designing for motivation: design-considerations for spaced-repetition-based learning games on mobile devices | F Schimanke, R Mertens… | 2017 | https://www.learntechlib.org/primary/d/149909/ | source:Google Scholar
[^p11]: Optimizing Retrieval-Augmented Generation of Medical Content for Spaced Repetition Learning | Jeremi Kaczmarek, Jakub Pokrywka, Krzysztof Biedalak, Grzegorz Kurzyp, Łukasz Grzybowski | 2025 | https://doi.org/10.5220/0013477700003932 | DOI:10.5220/0013477700003932 | source:Crossref
[^p12]: The indirect spaced repetition concept | Louis Lafleur | 2020 | https://doi.org/10.7820/vli.v09.2.lafleur | DOI:10.7820/vli.v09.2.lafleur | source:Crossref
[^p13]: IMPROVING LISTENING SKILLS IN LANGUAGE LEARNING WITH SPACED REPETITION TECHNIQUE | Iaroslav Viktorovich Baranov | 2018 | https://doi.org/10.20861/2410-2873-2018-40-002 | DOI:10.20861/2410-2873-2018-40-002 | source:Crossref
[^p14]: Unbounded Human Learning | Siddharth Reddy, Igor Labutov, Siddhartha Banerjee, Thorsten Joachims | 2016 | https://doi.org/10.1145/2939672.2939850 | DOI:10.1145/2939672.2939850 | source:Crossref
[^p15]: The Effect of using Spaced Repetition in Mobile Learning Games on the Learning Success | Florian Schimanke | https://doi.org/10.20378/irb-55317 | DOI:10.20378/irb-55317 | source:Crossref
[^p16]: Personalized targeted memory reactivation enhances consolidation of challenging memories via slow wave and spindle dynamics | 2025 | https://arxiv.org/abs/2511.15013v1 | arXiv:2511.15013v1 | source:ArXiv
[^p17]: Do Your Best and Get Enough Rest for Continual Learning | Hankyul Kang, Gregor Seifer, Donghyun Lee, Jongbin Ryu | 2025 | https://arxiv.org/abs/2503.18371v1 | arXiv:2503.18371v1 | source:ArXiv
[^p18]: Wake-Sleep Consolidated Learning | 2024 | https://arxiv.org/abs/2401.08623 | arXiv:2401.08623 | source:ArXiv
[^p19]: Impact of Nap on Performance in Different Working Memory Tasks Using EEG | 2023 | https://arxiv.org/abs/2311.08703 | arXiv:2311.08703 | source:ArXiv
[^p20]: Computational role of sleep in memory reorganization | Kensuke Yoshida,Taro Toyoizumi | 2023 | https://arxiv.org/abs/2304.02873 | arXiv:2304.02873 | source:ArXiv
[^p21]: Comparing the effects of sleep and rest on memory consolidation | MA Tucker, GB Humiston, T Summer… | 2020 | https://www.tandfonline.com/doi/abs/10.2147/NSS.S223917 | source:Google Scholar
[^p22]: Effects of wakeful rest on memory consolidation: A systematic review and meta-analysis | L Weng, J Yu, Z Lv, S Yang, ST Jülich, X Lei | 2025 | https://link.springer.com/article/10.3758/s13423-025-02665-x | source:Google Scholar
[^p23]: 'Sleep-dependent'memory consolidation? Brief periods of post-training rest and sleep provide an equivalent benefit for both declarative and procedural memory | SY Wang, KC Baker, JL Culbreth, O Tracy… | 2021 | https://learnmem.cshlp.org/content/28/6/195.short | source:Google Scholar
[^p24]: Offline memory consolidation during waking rest | EJ Wamsley | 2022 | https://www.nature.com/articles/s44159-022-00072-w | source:Google Scholar
[^p25]: Wakeful resting and memory retention: a study with healthy older and younger adults | M Martini, L Zamarian, P Sachse, C Martini… | 2019 | https://link.springer.com/article/10.1007/s10339-018-0891-4 | source:Google Scholar
[^p26]: Memory consolidation during wakeful rest: Evidence from EEG and fMRI | Xu LEI, Linman WENG, Jing YU | 2025 | https://doi.org/10.3724/sp.j.1042.2025.0729 | DOI:10.3724/sp.j.1042.2025.0729 | source:Crossref
[^p27]: 0077 TITLE: Test Format Influences the Effectiveness of Wakeful Rest for Memory Consolidation | Daniel Gonsalez, Yordanos Knife, Omalys Biggs-Rodriguez, Favour Kowe, Carmen Westerberg | 2024 | https://doi.org/10.1093/sleep/zsae067.0077 | DOI:10.1093/sleep/zsae067.0077 | source:Crossref
[^p28]: The effects of wakeful rest on memory consolidation in an online memory study | Olivia King, Jessica Nicosia | 2022 | https://doi.org/10.3389/fpsyg.2022.932592 | DOI:10.3389/fpsyg.2022.932592 | source:Crossref
[^p29]: Wakeful rest during storage and consolidation enhances priming effects for those with acquired memory impairment | Gerard A. Riley, Arthur Pearce | 2021 | https://doi.org/10.1080/09658211.2021.1907414 | DOI:10.1080/09658211.2021.1907414 | source:Crossref
[^p30]: Neural substrates related to memory consolidation of learning multiple motor sequences during wakeful rest | Sungshin Kim, Seojin Yoon, Antoine Caraballo | https://doi.org/10.21203/rs.3.rs-7048121/v1 | DOI:10.21203/rs.3.rs-7048121/v1 | source:Crossref
[^p31]: Cognitive Load-Driven VR Memory Palaces: Personalizing Focus and Recall Enhancement | Zhengyang Li, Hailin Deng | 2025 | https://arxiv.org/abs/2506.02700v1 | arXiv:2506.02700v1 | source:ArXiv
[^p32]: Evidence for five types of fixation during a random saccade eye tracking task: Implications for the study of oculomotor fatigue | 2024 | https://arxiv.org/abs/2406.01496 | arXiv:2406.01496 | source:ArXiv
[^p33]: Which Experimental Design is Better Suited for VQA Tasks? Eye Tracking Study on Cognitive Load, Performance, and Gaze Allocations | 2024 | https://arxiv.org/abs/2404.04036 | arXiv:2404.04036 | source:ArXiv
[^p34]: Towards Cognitive Load Assessment Using Electrooculography Measures | 2023 | https://arxiv.org/abs/2312.11418 | arXiv:2312.11418 | source:ArXiv
[^p35]: Assessing the efficacy of the Pomodoro technique in enhancing anatomy lesson retention during study sessions: a scoping review | E Ogut | 2025 | https://link.springer.com/article/10.1186/s12909-025-08001-0 | source:Google Scholar
[^p36]: Investigating the Effectiveness of Self-Regulated, Pomodoro, and Flowtime Break-Taking Techniques Among Students | EJC Smits, N Wenzel, A de Bruin | 2025 | https://www.mdpi.com/2076-328X/15/7/861 | source:Google Scholar
[^p37]: Investigating the Effectiveness of Pomodoro, Flowtime, and Self-regulated Break-Taking Techniques among Students | EJC Smits, N Wenzel, A de Bruin | 2025 | https://www.preprints.org/manuscript/202503.0845 | source:Google Scholar
[^p38]: Understanding effort regulation: Comparing 'Pomodoro'breaks and self‐regulated breaks | F Biwer, W Wiradhany… | 2023 | https://bpspsychub.onlinelibrary.wiley.com/doi/abs/10.1111/bjep.12593 | source:Google Scholar
[^p39]: The Science of Personalized Productivity: Matching Personality Profiles to Evidence-Based Productivity Systems | A Awowale | https://prolificpersonalities.com/prolific-personalities-research-paper.pdf | source:Google Scholar
[^p40]: IMPROVE FOCUS AND INCREASE PRODUCTIVITY USING ENHANCED POMODORO TECHNIQUE AND CAPTURE, ORGANIZE DAILY TASKS USING TASK MANAGER | 2024 | https://doi.org/10.56726/irjmets48399 | DOI:10.56726/irjmets48399 | source:Crossref
[^p41]: Müzik Öğrencilerinin Çalgı Çalışma Süreçlerinde Pomodoro Tekniği Kullanımına Yönelik Görüşleri | Yusuf ESEN, Ajda ŞENOL SAKİN | 2021 | https://doi.org/10.46372/arts.969224 | DOI:10.46372/arts.969224 | source:Crossref
[^p42]: WebCat: GTD &amp; Pomodoro Technique | 2013 | https://doi.org/10.7238/m.n109.1328 | DOI:10.7238/m.n109.1328 | source:Crossref
[^p43]: Pomodoro, Giò | 2011 | https://doi.org/10.1093/benz/9780199773787.article.b00144169 | DOI:10.1093/benz/9780199773787.article.b00144169 | source:Crossref
[^p44]: Optimal Accentuation vs Focus Accentuation | Hans-Christian Schmitz | 2008 | https://doi.org/10.1057/9780230592568_5 | DOI:10.1057/9780230592568_5 | source:Crossref
[^p45]: External light schedules can induce nighttime sleep disruptions in a Homeostat-Circadian-Light Model for sleep in young children | Tianyong Yao, Victoria Booth | 2025 | https://arxiv.org/abs/2507.19772v1 | arXiv:2507.19772v1 | source:ArXiv
[^p46]: Balancing Sleep and Study: Cultural Contexts in Family Informatics for Taiwanese Parents and Children | 2025 | https://arxiv.org/abs/2501.05674 | arXiv:2501.05674 | source:ArXiv
[^p47]: Collective sleep and activity patterns of college students from wearable devices | 2024 | https://arxiv.org/abs/2412.17969 | arXiv:2412.17969 | source:ArXiv
[^p48]: … in class… but physics is fascinating”: The use of large-scale longitudinal data to explore the educational experiences of aspiring girls in mathematics and physics | T Mujtaba, MJ Reiss | 2016 | https://link.springer.com/article/10.1080/14926156.2016.1235743 | source:Google Scholar
[^p49]: Effects of start times on academic performance: Will metacognitive learning strategy or flipped classroom approaches help sleepy young university students? | M Wang, B Luo | 2023 | https://www.sciencedirect.com/science/article/pii/S1472811723000447 | source:Google Scholar
[^p50]: Objective assessment of nap as a method to improve cognitive performance using a bio-mathematical model | SS Mohapatra, D Ghosh, R Sarkar… | 2021 | https://indjaerospacemed.com/objective-assessment-of-nap-as-a-method-to-improve-cognitive-performance-using-a-bio-mathematical-model/ | source:Google Scholar
[^p51]: Mathematics of the Nap | CD Behn | https://www.siam.org/publications/siam-news/articles/mathematics-of-the-nap/ | source:Google Scholar
[^p52]: Effects of block scheduling on grade 12 STEM students' academic performance in general physics 1 | MA Nariz, LS Roleda | 2019 | https://www.dlsu.edu.ph/wp-content/uploads/pdf/conferences/research-congress-proceedings/2019/lli-I-007.pdf | source:Google Scholar
[^p53]: The impact of exercise on sleep and sleep disorders | Abdulmenaf Korkutata, Mustafa Korkutata, Michael Lazarus | 2025 | https://doi.org/10.1038/s44323-024-00018-w | DOI:10.1038/s44323-024-00018-w | source:Crossref
[^p54]: Bidirectional associations between the duration and timing of nocturnal sleep and naps in adolescents differ from weekdays to weekends | R. Leong, T. Liang, N. Yu, T.B. Teo, J. Ong, M. Chee | 2024 | https://doi.org/10.1016/j.sleep.2023.11.285 | DOI:10.1016/j.sleep.2023.11.285 | source:Crossref
[^p55]: Stable inter-individual differences in slow-wave sleep during nocturnal sleep and naps | Philippa GANDER, Leigh SIGNAL, Hans PA VAN DONGEN, Diane MULLER, Margo VAN DEN BERG | 2010 | https://doi.org/10.1111/j.1479-8425.2010.00454.x | DOI:10.1111/j.1479-8425.2010.00454.x | source:Crossref
[^p56]: Take afternoon naps to improve perceptual learning | Richard P. Allen | 2003 | https://doi.org/10.1016/j.sleep.2003.09.002 | DOI:10.1016/j.sleep.2003.09.002 | source:Crossref
[^p57]: Regulation of Sleep and Naps on an Irregular Schedule | 1993 | https://doi.org/10.1093/sleep/16.8.736 | DOI:10.1093/sleep/16.8.736 | source:Crossref
[^p58]: Efficacy of a hybrid take home and in class summative assessment for the postsecondary physics classroom | 2024 | https://arxiv.org/abs/2409.18058 | arXiv:2409.18058 | source:ArXiv
[^p59]: Sleep-Like Unsupervised Replay Improves Performance when Data are Limited or Unbalanced | 2024 | https://arxiv.org/abs/2402.10956 | arXiv:2402.10956 | source:ArXiv
[^p60]: Irregular sleep/wake patterns are associated with poorer academic performance and delayed circadian and sleep/wake timing | AJK Phillips, WM Clerx, CS O'Brien, A Sano… | 2017 | https://www.nature.com/articles/s41598-017-03171-4 | source:Google Scholar
[^p61]: The association between school start time and sleep duration, sustained attention, and academic performance | V Alfonsi, R Palmizio, A Rubino… | 2020 | https://www.tandfonline.com/doi/abs/10.2147/NSS.S273875 | source:Google Scholar
[^p62]: Sleep duration is associated with academic achievement of adolescent girls in mathematics | L Lin, G Somerville, J Boursier… | 2020 | https://www.tandfonline.com/doi/abs/10.2147/NSS.S237267 | source:Google Scholar
[^p63]: Sleep deprivation and sustained attention performance: Integrating mathematical and cognitive modeling | G Gunzelmann, JB Gross, KA Gluck… | 2009 | https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1551-6709.2009.01032.x | source:Google Scholar
[^p64]: Regional Cerebral Blood Flow during Wakeful Rest in Older Subjects with Mild to Severe Obstructive Sleep Apnea | Andrée-Ann Baril, Katia Gagnon, Caroline Arbour, Jean-Paul Soucy, Jacques Montplaisir, Jean-François Gagnon et al. | 2015 | https://doi.org/10.5665/sleep.4986 | DOI:10.5665/sleep.4986 | source:Crossref
[^p65]: Associative Memory Performance Following Periods of Wakeful Rest and Technological Distraction | Chalise Carlson | https://doi.org/10.31979/etd.28cp-n8p9 | DOI:10.31979/etd.28cp-n8p9 | source:Crossref
[^p66]: Wakeful targeted memory reactivation during short rest periods modulates motor learning via the lateral orbitofrontal cortex network | Ryushin Kawasoe, Kana Matsumura, Taiga Shinohara, Koki Arima, Yuhi Takeo, Takashi Ikeda et al. | https://doi.org/10.1101/2025.07.02.662893 | DOI:10.1101/2025.07.02.662893 | source:Crossref
[^p67]: Starting Seatwork Earlier as a Valid Measure of Student Engagement | Ashish Gurung, Jionghao Lin, Zhongtian Huang, Conrad Borchers, Ryan S. Baker, Vincent Aleven, Kenneth R. Koedinger | 2025 | https://arxiv.org/abs/2505.13341v1 | arXiv:2505.13341v1 | source:ArXiv
[^p68]: Active Learning Through Flexible Collaborative Exams: Improving STEM Assessments | 2025 | https://arxiv.org/abs/2502.01994 | arXiv:2502.01994 | source:ArXiv
[^p69]: Analyzing Brain Activity During Learning Tasks with EEG and Machine Learning | 2024 | https://arxiv.org/abs/2401.10285 | arXiv:2401.10285 | source:ArXiv
[^p70]: Digital interventions and habit formation in educational technology | 2024 | https://arxiv.org/abs/2310.10850 | arXiv:2310.10850 | source:ArXiv
[^p71]: Memory Retrieval Strategies to Help Retain STEM Content Knowledge | O Yasar, P Veronesi, J Maliekal, LJ Little… | 2019 | https://peer.asee.org/memory-retrieval-strategies-to-help-retain-stem-content-knowledge.pdf | source:Google Scholar
[^p72]: A professional development program on memory retrieval strategies for STEM teachers | O Yasar, P Veronesi, J Maliekal… | 2021 | https://www.learntechlib.org/p/217729/ | source:Google Scholar
[^p73]: Examining study habits in undergraduate STEM courses from a situative perspective | MT Hora, AK Oleson | 2017 | https://link.springer.com/article/10.1186/s40594-017-0055-6 | source:Google Scholar
[^p74]: Embedding Study Strategies in STEM Courses to Increase Retention and Success: A Quantitative Study | I Abramyan, M Oehler, L Noble, C Lee… | 2024 | https://www.tandfonline.com/doi/abs/10.1080/0047231X.2023.2292402 | source:Google Scholar
[^p75]: Effective instruction for STEM disciplines: From learning theory to college teaching | EJ Mastascusa, WJ Snyder, BS Hoyt | 2011 | https://books.google.com/books?hl=en&lr=&id=kzzxhXi9-_kC&oi=fnd&pg=PR1&dq=optimal+study+break+activities+for+memory+retention+STEM&ots=iDbENf6_A6&sig=6-W35afojHzYdmDHUjdKS55_EKs | source:Google Scholar
[^p76]: Optimal Foreign Language Learning and Retention: Theoretical and Applied Investigations on the Effects of Presentation Repetition Programs | 2014 | https://doi.org/10.4324/9781410612717-10 | DOI:10.4324/9781410612717-10 | source:Crossref
[^p77]: Memory Wars Break Out | Karl Sabbagh | 2011 | https://doi.org/10.1093/acprof:osobl/9780199218417.003.0005 | DOI:10.1093/acprof:osobl/9780199218417.003.0005 | source:Crossref
[^p78]: Rat auditory neuronal activities related to the retention process of auditory working memory | Yoshio Sakurai | 1990 | https://doi.org/10.1016/0921-8696(90)90210-t | DOI:10.1016/0921-8696(90)90210-t | source:Crossref
[^p79]: Memory for actions in scripted activities as a function of typicality, retention interval, and retrieval task | Donald A. Smith, Arthur C. Graesser | 1981 | https://doi.org/10.3758/bf03202349 | DOI:10.3758/bf03202349 | source:Crossref
[^p80]: Tracking behavioural differences across chronotypes: A case study in Finland using Oura rings | 2025 | https://arxiv.org/abs/2501.01350 | arXiv:2501.01350 | source:ArXiv
[^p81]: Evidence for strong modality-dependence of chronotype assessment from real world calendar app data | 2025 | https://arxiv.org/abs/2502.20602 | arXiv:2502.20602 | source:ArXiv
[^p82]: Automated Chronotyping from a Daily Calendar using Machine Learning | 2024 | https://arxiv.org/abs/2407.06478 | arXiv:2407.06478 | source:ArXiv
[^p83]: Identifying the best times for cognitive functioning using new methods: matching university times to undergraduate chronotypes | MDR Evans, P Kelley, J Kelley | 2017 | https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2017.00188/full?platform=hootsuite | source:Google Scholar
[^p84]: Effect of chronotype and student learning time on mathematical ability based on self-regulated learning | N Ratnaningsih, RR El Akbar… | 2018 | https://iopscience.iop.org/article/10.1088/1742-6596/1013/1/012141/meta | source:Google Scholar
[^p85]: Interplay of chronotype and school timing predicts school performance | AP Goldin, M Sigman, G Braier, DA Golombek… | 2020 | https://www.nature.com/articles/s41562-020-0820-2 | source:Google Scholar
[^p86]: Time to learn: h ow chronotype impacts education | G Zerbini, M Merrow | 2017 | https://onlinelibrary.wiley.com/doi/abs/10.1002/pchj.178 | source:Google Scholar
[^p87]: The interaction of chronotype and time of day in a science course: Adolescent evening types learn more and are more motivated in the afternoon | H Itzek | 2016 | https://www.sciencedirect.com/science/article/pii/S1041608016302138 | source:Google Scholar
[^p88]: Review for "The association between chronotype profile and temporomandibular disorders among college students" | 2023 | https://doi.org/10.1111/odi.14859/v1/review2 | DOI:10.1111/odi.14859/v1/review2 | source:Crossref
[^p89]: Association Between the Individual Chronotype and Body Composition in German Students - The ChroNu Study | 2020 | https://doi.org/10.31525/ct1-nct04302922 | DOI:10.31525/ct1-nct04302922 | source:Crossref
[^p90]: Sleep, sleep timing and chronotype in animal behaviour | Christoph Randler | 2014 | https://doi.org/10.1016/j.anbehav.2014.05.001 | DOI:10.1016/j.anbehav.2014.05.001 | source:Crossref
[^p91]: Does Chronotype explain Daily Timing of Music Behaviors? | Shannon Wright, Caroline Palmer | https://doi.org/10.31234/osf.io/h7235 | DOI:10.31234/osf.io/h7235 | source:Crossref
[^p92]: As Time Goes By: Effects of Basal Chronotype and School Timing on Chronotype Development During Adolescence | Guadalupe Rodriguez Ferrante, Andrea Goldin, Mariano Sigman, Maria Leone | https://doi.org/10.21203/rs.3.rs-1118245/v1 | DOI:10.21203/rs.3.rs-1118245/v1 | source:Crossref
[^p93]: Relative benefits of different active learning methods to conceptual physics learning | Meagan Sundstrom, Justin Gambrell, Colin Green, Adrienne L. Traxle, Eric Brewe | 2025 | https://arxiv.org/abs/2505.04577v1 | arXiv:2505.04577v1 | source:ArXiv
[^p94]: Student performance analysis of virtual introductory calculus-based physics class | 2025 | https://arxiv.org/abs/2201.01809 | arXiv:2201.01809 | source:ArXiv
[^p95]: A stochastic approach in physics exercises of mathematics education | 2024 | https://arxiv.org/abs/2410.04076 | arXiv:2410.04076 | source:ArXiv
[^p96]: Comparing student performance on a multi-attempt asynchronous assessment to a single-attempt synchronous assessment in introductory level physics | 2024 | https://arxiv.org/abs/2407.15257 | arXiv:2407.15257 | source:ArXiv
[^p97]: Analyzing students collaboratively solving spherical unit vector problems in upper level E and M through a lens of shared resources | 2024 | https://arxiv.org/abs/2401.01959 | arXiv:2401.01959 | source:ArXiv
[^p98]: Distributed versus massed practice in high school physics | MG Grote | 1995 | https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1949-8594.1995.tb15736.x | source:Google Scholar
[^p99]: A comparative analysis of massed vs. distributed practice on basic math fact fluency growth rates | GM Schutte, GJ Duhon, BG Solomon, BC Poncy… | 2015 | https://www.sciencedirect.com/science/article/pii/S0022440514001034 | source:Google Scholar
[^p100]: Distributed practice or spacing effect | SK Carpenter | 2020 | https://oxfordre.com/education/display/10.1093/acrefore/9780190264093.001.0001/acrefore-9780190264093-e-859 | source:Google Scholar
[^p101]: Distributed practice: Rarely realized in self-regulated mathematical learning | K Barzagar Nazari, M Ebersbach | 2018 | https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.02170/full | source:Google Scholar
[^p102]: Distributed practice in math facts fluency: A comparative analysis of varied intersession intervals | SL Powell, G Duhon, BC Poncy, M Mwavita… | 2022 | https://www.tandfonline.com/doi/abs/10.1080/2372966X.2020.1802207 | source:Google Scholar
[^p103]: Differences in the Effect of Learning Methods Massed Practice Throwing and Distributed Practice on Learning Outcomes Skills for the Accuracy of Top Softball | Fuad MUSTOFA, Mansur MANSUR, Erick BURHAEİN | 2019 | https://doi.org/10.25307/jssr.571793 | DOI:10.25307/jssr.571793 | source:Crossref
[^p104]: HUBUNGAN PENDEKATAN LATIHAN MASSED PRACTICE DAN DISTRIBUTED PRACTICE TERHADAP KETEPATAN PUKULAN LOB PEMAIN BULUTANGKIS | Arie Asnaldi | 2016 | https://doi.org/10.24036/jm.v1i2.51 | DOI:10.24036/jm.v1i2.51 | source:Crossref
[^p105]: Improving Achievement: Massed Versus Distributed Reading and Practice | James M. Furukawa | 2006 | https://doi.org/10.1037/e529432007-001 | DOI:10.1037/e529432007-001 | source:Crossref
[^p106]: Massed vs. distributed practice in learning dental psycho‐motor skills | NS Logan, RA Hatch, HL Logan | 1975 | https://doi.org/10.1002/j.0022-0337.1975.39.2.tb00858.x | DOI:10.1002/j.0022-0337.1975.39.2.tb00858.x | source:Crossref
[^p107]: Short-term cognitive fatigue of spatial selective attention after face-to-face conversations in virtual noisy environments | 2025 | https://arxiv.org/abs/2509.09479v1 | arXiv:2509.09479v1 | source:ArXiv
[^p108]: Exploring the Optimal Time Window for Predicting Cognitive Load Using Physiological Sensor Data | 2024 | https://arxiv.org/abs/2406.13793 | arXiv:2406.13793 | source:ArXiv
[^p109]: Cognitive Engagement for STEM+C Education: Investigating Serious Game Impact on Graph Structure Learning with fNIRS | 2024 | https://arxiv.org/abs/2307.13637 | arXiv:2307.13637 | source:ArXiv
[^p110]: Self-organized clustering, prediction, and superposition of long-term cognitive decline from short-term individual cognitive test scores in Alzheimer's disease | 2024 | https://arxiv.org/abs/2402.12205 | arXiv:2402.12205 | source:ArXiv
[^p111]: Studying at university in later life slows cognitive decline: A long‐term prospective study | AD Bindoff, MJ Summers, E Hill, J Alty… | 2021 | https://alz-journals.onlinelibrary.wiley.com/doi/abs/10.1002/trc2.12207 | source:Google Scholar
[^p112]: Long-term effects of cognitive training on everyday functional outcomes in older adults | …, AM Stoddard, E Wright, for the ACTIVE Study Group | 2006 | https://jamanetwork.com/journals/jama/article-abstract/204643 | source:Google Scholar
[^p113]: Timing of onset of cognitive decline: results from Whitehall II prospective cohort study | A Singh | 2012 | https://www.bmj.com/content/344/bmj.d7622.short | source:Google Scholar
[^p114]: Does cognitive training prevent cognitive decline? A systematic review | M Butler, E McCreedy, VA Nelson, P Desai… | 2018 | https://www.acpjournals.org/doi/abs/10.7326/m17-1531 | source:Google Scholar
[^p115]: Antioxidants and prevention of cognitive decline: does duration of use matter? | K Yaffe | 2007 | https://jamanetwork.com/journals/jamainternalmedicine/article-abstract/413371 | source:Google Scholar
[^p116]: Prolonged Smartphone Usage Duration With/without Physical Inactivity Is Not Associated With Cognitive Decline In University Students | Hayato Tsukamoto, Kento Dora, Yuki Kusagawa, Ryuunosuke Ogusu, Masafumi Terada, Tadashi Suga | 2024 | https://doi.org/10.1249/01.mss.0001058040.29689.c9 | DOI:10.1249/01.mss.0001058040.29689.c9 | source:Crossref
[^p117]: Prolonged sleep duration as a predictor of cognitive decline: A meta-analysis encompassing 49 cohort studies | Qing Yang, Suya Li, Yang Yang, Xuechun Lin, Mengshu Yang, Chong Tian et al. | 2024 | https://doi.org/10.1016/j.neubiorev.2024.105817 | DOI:10.1016/j.neubiorev.2024.105817 | source:Crossref
[^p118]: Session 9: Booster Session | Colette M. Smart | 2021 | https://doi.org/10.1093/med-psych/9780197510001.003.0010 | DOI:10.1093/med-psych/9780197510001.003.0010 | source:Crossref
[^p119]: Session 8: Final Session: Taking the Practice Forward | Colette M. Smart | 2021 | https://doi.org/10.1093/med-psych/9780197510001.003.0009 | DOI:10.1093/med-psych/9780197510001.003.0009 | source:Crossref
[^p120]: Coarse-to-Fine Process Reward Modeling for Enhanced Mathematical Reasoning | 2025 | https://arxiv.org/abs/2501.13622v1 | arXiv:2501.13622v1 | source:ArXiv
[^p121]: SBI-RAG: Enhancing Math Word Problem Solving for Students through Schema-Based Instruction and Retrieval-Augmented Generation | 2024 | https://arxiv.org/abs/2410.13293 | arXiv:2410.13293 | source:ArXiv
[^p122]: Recall and Learn: A Memory-augmented Solver for Math Word Problems | 2021 | https://arxiv.org/abs/2109.13112 | arXiv:2109.13112 | source:ArXiv
[^p123]: The effect of distributed practice: Neuroscience, cognition, and education | E Gerbier, TC Toppino | 2015 | https://www.sciencedirect.com/science/article/pii/S2211949315000022 | source:Google Scholar
[^p124]: Exploring Contract Law using digital flashcards | S Colbran, A Gilding, A Marinac… | 2015 | https://www.researchgate.net/profile/Stephen-Colbran/publication/294089112_EXPLORING_CONTRACT_LAW_USING_DIGITAL_FLASHCARDS/links/56be047d08ae44da37f88832/EXPLORING-CONTRACT-LAW-USING-DIGITAL-FLASHCARDS.pdf | source:Google Scholar
[^p125]: The masked repetition priming effect dissipates when increasing the inter-stimulus interval: Evidence from word naming | Ludovic Ferrand | 1996 | https://doi.org/10.1016/0001-6918(95)00010-0 | DOI:10.1016/0001-6918(95)00010-0 | source:Crossref
[^p126]: The effect of inter-ocular delay and repetition interval on depth perception | Eugene R. Wist, Walter C. Gogel | 1966 | https://doi.org/10.1016/0042-6989(66)90066-6 | DOI:10.1016/0042-6989(66)90066-6 | source:Crossref
[^p127]: Supplemental Information 4: Factors affecting the inter-visit interval | https://doi.org/10.7717/peerj.17189/supp-4 | DOI:10.7717/peerj.17189/supp-4 | source:Crossref
[^p128]: Implicit sequence learning: Inter-stimulus interval and subjective experience | Gáspár Lukács, Katalin Huszár, Emese Hallgató | https://doi.org/10.31219/osf.io/u7a8g | DOI:10.31219/osf.io/u7a8g | source:Crossref
[^p129]: The inter-session recovery interval in heavy resistance training | Peter A. Logan | https://doi.org/10.14264/2b5ddad | DOI:10.14264/2b5ddad | source:Crossref
[^p130]: Cognitive Performance Measurements and the Impact of Sleep Quality Using Wearable and Mobile Sensors | 2025 | https://arxiv.org/abs/2501.15583 | arXiv:2501.15583 | source:ArXiv
[^p131]: Aircrew rostering workload patterns and associated fatigue and sleepiness scores in short/medium haul flights under RBAC 117 rules in Brazil | 2024 | https://arxiv.org/abs/2408.08889 | arXiv:2408.08889 | source:ArXiv
[^p132]: Associations Between Sleep Efficiency Variability and Cognition Among Older Adults: Cross-Sectional Accelerometer Study | 2023 | https://arxiv.org/abs/2309.08809 | arXiv:2309.08809 | source:ArXiv
[^p133]: Effects of post short nap sleep inertia on cognitive and psychomotor task performance | DR Bhatt, NK Tripathy, BM Sekhar… | 2021 | https://indjaerospacemed.com/effects-of-post-short-nap-sleep-inertia-on-cognitive-and-psychomotor-task-performance/ | source:Google Scholar
[^p134]: Sleep Inertia in Aviation | F Sauvet, V Beauchamps… | 2024 | https://asma.kglmeridian.com/view/journals/amhp/95/4/article-p206.xml | source:Google Scholar
[^p135]: Awakening from a nighttime nap: physiological and cognitive effects of sleep inertia and behavioral countermeasures | Q Zhang, L Ding, Y Wen, W Chen, F Zhang, F Yao… | 2025 | https://www.tandfonline.com/doi/abs/10.1080/00140139.2025.2588169 | source:Google Scholar
[^p136]: Fatigue on the flight deck: the consequences of sleep loss and the benefits of napping | BM Hartzler | 2014 | https://www.sciencedirect.com/science/article/pii/S0001457513004077 | source:Google Scholar
[^p137]: Fatigue in aviation sustained operations, the utility of napping, and the problem of sleep inertia | JA Caldwell, BF Frazinko, BS Caldwell | 2002 | https://apps.dtic.mil/sti/html/tr/ADP013766/ | source:Google Scholar
[^p138]: Performance monitoring during sleep inertia after a 1-h daytime nap | SHOICHI ASAOKA, HIROAKI MASAKI, KEIKO OGAWA, TIMOTHY I. MURPHY, KAZUHIKO FUKUDA, KATUO YAMAZAKI | 2010 | https://doi.org/10.1111/j.1365-2869.2009.00811.x | DOI:10.1111/j.1365-2869.2009.00811.x | source:Crossref
[^p139]: Sleep inertia and cognitive performance | Corrado Cavallero, Francesco Versace | 1997 | https://doi.org/10.1037/e536982012-317 | DOI:10.1037/e536982012-317 | source:Crossref
[^p140]: Effects of sleep inertia on cognitive performance following a 1-hour nap | Pierre Salamé, Hélène Otzenberger, Jean Ehrhart, Gérard Dewasmes, Alain Nicolas, Patricia Tassi et al. | 1995 | https://doi.org/10.1080/02678379508256898 | DOI:10.1080/02678379508256898 | source:Crossref
[^p141]: Sleep effects on brain, cognition, and mental health during adolescence are mediated by the glymphatic system | 2025 | https://arxiv.org/abs/2512.08704v1 | arXiv:2512.08704v1 | source:ArXiv
[^p142]: Surf or sleep? Understanding the influence of bedtime patterns on campus | 2022 | https://arxiv.org/abs/2202.09283 | arXiv:2202.09283 | source:ArXiv
[^p143]: Naps and sleep deprivation: Why academic libraries should consider adding nap stations to their services for students | MJ Wise | 2018 | https://www.tandfonline.com/doi/abs/10.1080/13614533.2018.1431948 | source:Google Scholar
[^p144]: Short naps improve subsequent learning in a high school setting | V Vidal, MR Pretel, L Capurro, LM Tassone… | 2025 | https://www.nature.com/articles/s41539-025-00307-4 | source:Google Scholar
[^p145]: Napping in college students and its relationship with nighttime sleep | L Ye, S Hutton Johnson, K Keane… | 2015 | https://www.tandfonline.com/doi/abs/10.1080/07448481.2014.983926 | source:Google Scholar
[^p146]: The long-term memory benefits of a daytime nap compared with cramming | JN Cousins, KF Wong, BL Raghunath, C Look… | 2019 | https://academic.oup.com/sleep/article-abstract/42/1/zsy207/5146032 | source:Google Scholar
[^p147]: The Experience and Persistence of College Students in STEM Majors | Yonghong Jade Xu | 2018 | https://doi.org/10.1177/1521025116638344 | DOI:10.1177/1521025116638344 | source:Crossref
[^p148]: Using wiki-based discussion forums in calculus: E-pathway toward improving students' retention and learning in STEM gateway courses (Minority serving two-year college settings) | Natalia Mosina | 2014 | https://doi.org/10.1109/isecon.2014.6891038 | DOI:10.1109/isecon.2014.6891038 | source:Crossref
[^p149]: Napping on the Afternoon of My Thirty-ninth Birthday | 2005 | https://doi.org/10.2307/jj.11374749.8 | DOI:10.2307/jj.11374749.8 | source:Crossref
[^p150]: A Retention Model for Community College STEM Students | Jennifer Snyder, Elizabeth Cudney | https://doi.org/10.18260/1-2--29719 | DOI:10.18260/1-2--29719 | source:Crossref
[^p151]: Napping in the afternoon can improve memory and alertness – here’s why | John Axelsson, Tina Sundelin | https://doi.org/10.64628/ab.7ngsjhsu6 | DOI:10.64628/ab.7ngsjhsu6 | source:Crossref
[^p152]: A novel method to separate circadian from non-circadian masking effects in order to enhance daily circadian timing and amplitude estimation from core body temperature | 2024 | https://arxiv.org/abs/2408.15295 | arXiv:2408.15295 | source:ArXiv
[^p153]: Effects of Daily Exercise Time on the Academic Performance of Students: An Empirical Analysis Based on CEPS Data | 2024 | https://arxiv.org/abs/2312.11484 | arXiv:2312.11484 | source:ArXiv
[^p154]: THE ASSOCIATION OF CIRCADIAN RHYTHMS WITH ACADEMIC, PHYSICAL, AND COGNITIVE PERFORMANCE: A SYSTEMATIC REVIEW | I Sabaoui, S Lotfi, M Talbi | 2024 | https://cyberleninka.ru/article/n/the-association-of-circadian-rhythms-with-academic-physical-and-cognitive-performance-a-systematic-review | source:Google Scholar
[^p155]: Time of Day and Academic Achievement: A Quantitative Comparative Study | GW Cannon | 2016 | https://search.proquest.com/openview/1974fbf1a1ffe539a6db764562679695/1?pq-origsite=gscholar&cbl=18750 | source:Google Scholar
[^p156]: Morning or evening? an examination of circadian rhythms of CS1 students | A Zavgorodniaia, R Shrestha… | 2021 | https://ieeexplore.ieee.org/abstract/document/9402200/ | source:Google Scholar
[^p157]: Circadian preference and thinking styles: implications for school achievement | JF Diaz | 2013 | https://www.tandfonline.com/doi/abs/10.3109/07420528.2013.813854 | source:Google Scholar
[^p158]: Circadian preference and academic achievement in school-aged students: A systematic review and a longitudinal investigation of reciprocal relations | V Scherrer, F Preckel | 2021 | https://www.tandfonline.com/doi/abs/10.1080/07420528.2021.1921788 | source:Google Scholar
[^p159]: Chronotype, Light Exposure, Sleep, and Daytime Functioning in High School Students Attending Morning or Afternoon School Shifts | Jeanne Sophie Martin, Michael M. Gaudreault, Michel Perron, Luc Laberge | 2016 | https://doi.org/10.1177/0748730415625510 | DOI:10.1177/0748730415625510 | source:Crossref
[^p160]: Cerebrovascular responses during rowing: Do circadian rhythms explain morning and afternoon performance differences? | O. K. Faull, J. D. Cotter, S. J. E. Lucas | 2015 | https://doi.org/10.1111/sms.12273 | DOI:10.1111/sms.12273 | source:Crossref
[^p161]: Phase advancing human circadian rhythms with morning bright light, afternoon melatonin, and gradually shifted sleep: can we reduce morning bright-light duration? | Stephanie J. Crowley, Charmane I. Eastman | 2015 | https://doi.org/10.1016/j.sleep.2014.12.004 | DOI:10.1016/j.sleep.2014.12.004 | source:Crossref
[^p162]: Afternoon | Andy Hinds | 2013 | https://doi.org/10.5040/9781350366503.00000010 | DOI:10.5040/9781350366503.00000010 | source:Crossref
[^p163]: Morning sunlight can phase advance the circadian rhythm of young adults | Simon SMITH, John TRINDER | 2005 | https://doi.org/10.1111/j.1479-8425.2005.00153.x | DOI:10.1111/j.1479-8425.2005.00153.x | source:Crossref
[^p164]: Does Learning Mathematical Problem-Solving Generalize to Broader Reasoning? | Ruochen Zhou, Minrui Xu, Shiqi Chen, Junteng Liu, Yunqi Li, Xinxin Lin, Zhengyu Chen, Junxian He | 2025 | https://arxiv.org/abs/2507.04391v1 | arXiv:2507.04391v1 | source:ArXiv
[^p165]: MATH-Perturb: Benchmarking LLMs' Math Reasoning Abilities against Hard Perturbations | 2025 | https://arxiv.org/abs/2502.06453 | arXiv:2502.06453 | source:ArXiv
[^p166]: Ill-defined problem solving does not benefit from daytime napping | M Hołda, A Głodek, M Dankiewicz | 2020 | https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.00559/full | source:Google Scholar
[^p167]: Nap timing makes a difference: sleeping sooner rather than later after learning improves infants' locomotor problem solving | A DeMasi, MN Horger, AM Allia, A Scher… | 2021 | https://www.sciencedirect.com/science/article/pii/S0163638321001260 | source:Google Scholar
[^p168]: Time of day effects on problem solving: When the non-optimal is optimal | MB Wieth, RT Zacks | 2011 | https://www.tandfonline.com/doi/abs/10.1080/13546783.2011.625663 | source:Google Scholar
[^p169]: Impact of nap length, nap timing and sleep quality on sustaining early morning performance | T Kubo, H Takeyama, S Matsumoto, T Ebara… | 2007 | https://www.jstage.jst.go.jp/article/indhealth/45/4/45_4_552/_article/-char/ja/ | source:Google Scholar
[^p170]: Modelling Blood and Pulmonary Pressure for Solving a Performance Optimal Problem for Sportsmen | Jean Marie Ntaganda | 2012 | https://doi.org/10.5402/2012/470143 | DOI:10.5402/2012/470143 | source:Crossref
[^p171]: Writing About the Problem Solving Process to Improve Problem Solving Performance | Kenneth M. Williams | 2003 | https://doi.org/10.5951/mt.96.3.0185 | DOI:10.5951/mt.96.3.0185 | source:Crossref
[^p172]: Measures of Problem-Solving Performance and of Problem-Solving Instruction | Alan H. Schoenfeld | 1982 | https://doi.org/10.2307/748435 | DOI:10.2307/748435 | source:Crossref
[^p173]: Adaptive Synthesized Control for Solving The Optimal Control Problem | Askhat Diveev, Elizaveta Shmalko | https://doi.org/10.20944/preprints202309.0302.v1 | DOI:10.20944/preprints202309.0302.v1 | source:Crossref
[^p174]: Figure V.4.5. Gender differences in collaborative problem-solving, science, reading and mathematics performance | https://doi.org/10.1787/888933616009 | DOI:10.1787/888933616009 | source:Crossref
[^p175]: Symbolic or Numerical? Understanding Physics Problem Solving in Reasoning LLMs | Nifu Dan, Yujun Cai, Yiwei Wang | 2025 | https://arxiv.org/abs/2507.01334v1 | arXiv:2507.01334v1 | source:ArXiv
[^p176]: Accelerate Parallelizable Reasoning via Parallel Decoding within One Sequence | Yijiong Yu | 2025 | https://arxiv.org/abs/2503.20533v1 | arXiv:2503.20533v1 | source:ArXiv
[^p177]: Interleaved practice enhances memory and problem-solving ability in undergraduate physics | J Samani, SC Pan | 2021 | https://www.nature.com/articles/s41539-021-00110-x | source:Google Scholar
[^p178]: Interleaving Effects in Mathematics: Comparing interleaving, blocking and exposition strategies for teaching secondary school pupils how to classify … | P Rowlandson | 2023 | http://etheses.dur.ac.uk/14943/1/Paul_Rowlandson_-_Thesis_-_Interleaving_Effects_in_Mathematics_-_2023.pdf?DDD29+ | source:Google Scholar
[^p179]: Interleaving helps students distinguish among similar concepts | D Rohrer | 2012 | https://link.springer.com/article/10.1007/s10648-012-9201-3 | source:Google Scholar
[^p180]: INTERLEAVE PRACTICE TO PROMOTE STUDENTS'PROBLEM SOLVING FLUENCY IN MATHEMATICS | EP Bab𝒂𝟏, LS Lomibao | https://www.researchgate.net/profile/Edsel-Monterola-2/publication/380788093_INTERLEAVE_PRACTICE_TO_PROMOTE_STUDENTS'_PROBLEM_SOLVING_FLUENCY_IN_MATHEMATICS/links/664ea32b22a7f16b4f4383fd/INTERLEAVE-PRACTICE-TO-PROMOTE-STUDENTS-PROBLEM-SOLVING-FLUENCY-IN-MATHEMATICS.pdf | source:Google Scholar
[^p181]: The role of executive function abilities in interleaved vs. blocked learning of science concepts | J Park, K Varma, S Varma | 2023 | https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2023.1199682/full | source:Google Scholar
[^p182]: Problem-creating vs problem-solving | 2013 | https://doi.org/10.4324/9780203758311-8 | DOI:10.4324/9780203758311-8 | source:Crossref
[^p183]: Problem solving vs. conceptual understanding | Marcelo Alonso | 1992 | https://doi.org/10.1119/1.17056 | DOI:10.1119/1.17056 | source:Crossref
[^p184]: Enthusiasm vs Effectiveness in Group and Individual Problem-Solving | G. A. Milton | 1965 | https://doi.org/10.2466/pr0.1965.16.3c.1197 | DOI:10.2466/pr0.1965.16.3c.1197 | source:Crossref
[^p185]: Samani and Pan (2021) Interleaving enhances memory and problem-solving skills in physics | JOSHUA SAMANI, Steven C. Pan | https://doi.org/10.31234/osf.io/uwn3k | DOI:10.31234/osf.io/uwn3k | source:Crossref
[^p186]: "I forgot the formula:" How students can use coherence to reconstruct a (partially) forgotten equation | Katherine Gifford, Gabriel S. Ehrlich, Engin Bumbacher, Eric Kuo | 2025 | https://arxiv.org/abs/2506.19641v1 | arXiv:2506.19641v1 | source:ArXiv
[^p187]: Student Explanation Strategies in Postsecondary Mathematics and Statistics Education: A Scoping Review | Huixin Gao, Tanya Evans, Anna Fergusson | 2025 | https://arxiv.org/abs/2503.19237v1 | arXiv:2503.19237v1 | source:ArXiv
[^p188]: The Role of Conceptual Problem Solving in Learning Physics: A Study in a General Relativity University Course | 2025 | https://arxiv.org/abs/2502.08564 | arXiv:2502.08564 | source:ArXiv
[^p189]: Uncovering Hidden Variables: A Physics Classroom Activity on Correlation and Causation | 2025 | https://arxiv.org/abs/2412.04150 | arXiv:2412.04150 | source:ArXiv
[^p190]: A Personalised Learning Tool for Physics Undergraduate Students Built On a Large Language Model for Symbolic Regression | 2024 | https://arxiv.org/abs/2407.00065 | arXiv:2407.00065 | source:ArXiv
[^p191]: Learning mathematics from worked-out examples: Analyzing and fostering self-explanations | A Renkl | 1999 | https://link.springer.com/article/10.1007/BF03172974 | source:Google Scholar
[^p192]: How do students learn to apply their mathematical knowledge to interpret graphs in physics? | J Woolnough | 2000 | https://link.springer.com/article/10.1007/BF02461633 | source:Google Scholar
[^p193]: The content of physics self-explanations | MTH Chi, KA VanLehn | 1991 | https://www.tandfonline.com/doi/abs/10.1207/s15327809jls0101_4 | source:Google Scholar
[^p194]: The role of mathematics for physics teaching and understanding | G Pospiech, BS Eylon, E Bagno, Y Lehavi… | 2015 | https://papers.sif.it/?pid=ncc10995 | source:Google Scholar
[^p195]: Students' understanding of two-variable calculus concepts in mathematics and physics contexts. II. The gradient and the Laplacian | M Al Dehaybes, J Deprez, P van Kampen… | 2025 | https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.21.010132 | source:Google Scholar
[^p196]: On Explaining, Explanations and Second Graders | Rina Hershkowitz, Abraham Arcavi | 2022 | https://doi.org/10.1163/9789004510685_010 | DOI:10.1163/9789004510685_010 | source:Crossref
[^p197]: Discriminative Learning and the Lexicon: NDL and LDL | Yu-Ying Chuang, R. Harald Baayen | 2021 | https://doi.org/10.1093/acrefore/9780199384655.013.375 | DOI:10.1093/acrefore/9780199384655.013.375 | source:Crossref
[^p198]: Classroom Interaction and Mathematics Learning: The Role of Explaining and Engaging With Others' Ideas | Noreen Webb | 2020 | https://doi.org/10.3102/1571399 | DOI:10.3102/1571399 | source:Crossref
[^p199]: Learning With and From Others: A Review of The International Handbook of Collaborative Learning | Alan H. Schoenfeld | 2014 | https://doi.org/10.5951/jresematheduc.45.5.0675 | DOI:10.5951/jresematheduc.45.5.0675 | source:Crossref
[^p200]: Convincing Yourself and Others | John Healey Mason | 1988 | https://doi.org/10.1007/978-1-349-09782-1_4 | DOI:10.1007/978-1-349-09782-1_4 | source:Crossref
[^p201]: Semiparametric Models for Practice Effects in Longitudinal Cognitive Trajectories: Application to an Aging Cohort Study | 2025 | https://arxiv.org/abs/2511.21001v1 | arXiv:2511.21001v1 | source:ArXiv
[^p202]: Integrated STEM education: the effects of a long-term intervention on students' cognitive performance | H De Loof, B Pauw… | 2022 | https://repository.uantwerpen.be/link/irua/192670 | source:Google Scholar
[^p203]: Course of cognitive decline in hematopoietic stem cell transplantation: a within-subjects design | MA Friedman, M Fernandez, JS Wefel… | 2009 | https://academic.oup.com/acn/article-abstract/24/7/689/3158 | source:Google Scholar
[^p204]: Which cognitive abilities make the difference? Predicting academic achievements in advanced STEM studies | M Berkowitz, E Stern | 2018 | https://www.mdpi.com/2079-3200/6/4/48 | source:Google Scholar
[^p205]: Undergraduate STEM achievement and retention: Cognitive, motivational, and institutional factors and solutions | JG Cromley, T Perez, A Kaplan | 2016 | https://journals.sagepub.com/doi/abs/10.1177/2372732215622648 | source:Google Scholar
[^p206]: The enhanced flipped classroom: Increasing academic performance with student-recorded lectures and practice testing in a" flipped" STEM course | CP Talley, S Scherer | 2013 | https://muse.jhu.edu/pub/417/article/803083/summary | source:Google Scholar
[^p207]: Session 2: Noticing Slip-Ups | Colette M. Smart | 2021 | https://doi.org/10.1093/med-psych/9780197510124.003.0002 | DOI:10.1093/med-psych/9780197510124.003.0002 | source:Crossref
[^p208]: Straight to Zero: Why Linearly Decaying the Learning Rate to Zero Works Best for LLMs | 2025 | https://arxiv.org/abs/2502.15938 | arXiv:2502.15938 | source:ArXiv
[^p209]: The Surprising Agreement Between Convex Optimization Theory and Learning-Rate Scheduling for Large Model Training | Fabian Schaipp, Alexander Hägele, Adrien Taylor, Umut Simsekli, Francis Bach | 2025 | https://arxiv.org/abs/2501.18965v1 | arXiv:2501.18965v1 | source:ArXiv
[^p210]: The effects of different protocols of physical exercise and rest on long-term memory | W Pyke, F Ifram, L Coventry, Y Sung, I Champion… | 2020 | https://www.sciencedirect.com/science/article/pii/S1074742719301959 | source:Google Scholar
[^p211]: Making long-term memories in minutes: a spaced learning pattern from memory research in education | P Kelley, T Whatson | 2013 | https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2013.00589/full | source:Google Scholar
[^p212]: Boosting long-term memory via wakeful rest: intentional rehearsal is not necessary, consolidation is sufficient | M Dewar, J Alber, N Cowan, S Della Sala | 2014 | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0109542&source=post_page-----af4466ba83ba---------------------- | source:Google Scholar
[^p213]: Effects of post-encoding wakeful rest and study time on long-term memory performance | M Martini, C Martini, T Maran… | 2018 | https://www.tandfonline.com/doi/abs/10.1080/20445911.2018.1506457 | source:Google Scholar
[^p214]: Brief wakeful resting boosts new memories over the long term | M Dewar, J Alber, C Butler, N Cowan… | 2012 | https://journals.sagepub.com/doi/abs/10.1177/0956797612441220 | source:Google Scholar
[^p215]: Influence of rest interval between plyometric training sessions on functional performance tests | Abbas Asadi | 2015 | https://doi.org/10.16926/par.2015.01.01 | DOI:10.16926/par.2015.01.01 | source:Crossref
[^p216]: Contracting, equal, and expanding learning schedules: The optimal distribution of learning sessions depends on retention interval | Carolina E. Küpper-Tetzel, Irina V. Kapler, Melody Wiseheart | 2014 | https://doi.org/10.3758/s13421-014-0394-1 | DOI:10.3758/s13421-014-0394-1 | source:Crossref
[^p217]: The link between language learning and long-term memory | Kavya Kadia | https://doi.org/10.21203/rs.3.rs-1842265/v2 | DOI:10.21203/rs.3.rs-1842265/v2 | source:Crossref
[^p218]: Should I rest or should I go now? A comparison between fixed and self-selected rest durations in high-intensity interval training cycling sessions | Eyal Colorni, Evyatar Ohayon, Julie Côté, Uri Obolski, Israel Halperin | https://doi.org/10.51224/srxiv.248 | DOI:10.51224/srxiv.248 | source:Crossref
[^p219]: Optimal Protocols for Continual Learning via Statistical Physics and Control Theory | 2025 | https://arxiv.org/abs/2409.18061 | arXiv:2409.18061 | source:ArXiv
[^p220]: Personalized Forgetting Mechanism with Concept-Driven Knowledge Tracing | 2024 | https://arxiv.org/abs/2404.12127 | arXiv:2404.12127 | source:ArXiv
[^p221]: The power of forgetting in statistical hypothesis testing | 2024 | https://arxiv.org/abs/2402.06920 | arXiv:2402.06920 | source:ArXiv
[^p222]: Review Learning: Alleviating Catastrophic Forgetting with Generative Replay without Generator | 2022 | https://arxiv.org/abs/2210.09394 | arXiv:2210.09394 | source:ArXiv
[^p223]: Power laws from individual differences in learning and forgetting: mathematical analyses | JMJ Murre, AG Chessa | 2011 | https://link.springer.com/article/10.3758/s13423-011-0076-y | source:Google Scholar
[^p224]: The form of the forgetting curve and the fate of memories | L Averell, A Heathcote | 2011 | https://www.sciencedirect.com/science/article/pii/S0022249610001100 | source:Google Scholar
[^p225]: One hundred years of forgetting: A quantitative description of retention. | DC Rubin, AE Wenzel | 1996 | https://psycnet.apa.org/record/1996-06397-006 | source:Google Scholar
[^p226]: Forgetting and the learning curve: A laboratory study | CD Bailey | 1989 | https://pubsonline.informs.org/doi/abs/10.1287/mnsc.35.3.340 | source:Google Scholar
[^p227]: On the form of forgetting | JT Wixted, EB Ebbesen | 1991 | https://journals.sagepub.com/doi/abs/10.1111/j.1467-9280.1991.tb00175.x | source:Google Scholar
[^p228]: Algebraic curve interpolation for intervals via symbolic-numeric computation | Dehbi Lydia, Yang Zhengfeng, Peng Chao, Xu Yaochen, Zeng Zhenbing | 2023 | https://doi.org/10.1360/scm-2023-0092 | DOI:10.1360/scm-2023-0092 | source:Crossref
[^p229]: Forgetting Curve on Basic Cardiopulmonary Resuscitation Competence in Simulation Models | 2016 | https://doi.org/10.23880/oajprs-16000105 | DOI:10.23880/oajprs-16000105 | source:Crossref
[^p230]: Forgetting Curve | 2009 | https://doi.org/10.4135/9781412972024.n1046 | DOI:10.4135/9781412972024.n1046 | source:Crossref
[^p231]: Chance and the curve of forgetting. | Matthew N. Chappell | 1931 | https://doi.org/10.1037/h0075176 | DOI:10.1037/h0075176 | source:Crossref
[^p232]: The Curve of Forgetting For Substance Material | Leslie Briggs | https://doi.org/10.58809/vwwh3695 | DOI:10.58809/vwwh3695 | source:Crossref
[^p233]: Personalized Multimodal Feedback Using Multiple External Representations: Strategy Profiles and Learning in High School Physics | 2026 | https://arxiv.org/abs/2601.09470v1 | arXiv:2601.09470v1 | source:ArXiv
[^p234]: MemoryKT: An Integrative Memory-and-Forgetting Method for Knowledge Tracing | 2025 | https://arxiv.org/abs/2508.08122v1 | arXiv:2508.08122v1 | source:ArXiv
[^p235]: Atomic Learning Objectives Labeling: A High-Resolution Approach for Physics Education | 2025 | https://arxiv.org/abs/2412.09914 | arXiv:2412.09914 | source:ArXiv
[^p236]: Applying Cognitive Diagnostic Models to Mechanics Concept Inventories | 2025 | https://arxiv.org/abs/2404.00009 | arXiv:2404.00009 | source:ArXiv
[^p237]: LSEBMCL: A Latent Space Energy-Based Model for Continual Learning | 2025 | https://arxiv.org/abs/2501.05495 | arXiv:2501.05495 | source:ArXiv
[^p238]: Teaching materials aligned or unaligned with the principles of the Cognitive Theory of Multimedia Learning: the choices made by Physics teachers and students | 2024 | https://arxiv.org/abs/2412.19768 | arXiv:2412.19768 | source:ArXiv
[^p239]: KoroT-3E: A Personalized Musical Mnemonics Tool for Enhancing Memory Retention of Complex Computer Science Concepts | 2024 | https://arxiv.org/abs/2409.10446 | arXiv:2409.10446 | source:ArXiv
[^p240]: A computational model for the evolution of learning physical micro-contents in peer instruction methodology | 2024 | https://arxiv.org/abs/2405.07055 | arXiv:2405.07055 | source:ArXiv
[^p241]: Learning Fast, Learning Slow: A General Continual Learning Method based on Complementary Learning System | 2022 | https://arxiv.org/abs/2201.12604 | arXiv:2201.12604 | source:ArXiv
[^p242]: Planning education for long-term retention: the cognitive science and implementation of retrieval practice | DP Larsen | 2018 | https://www.thieme-connect.com/products/ejournals/html/10.1055/s-0038-1666983 | source:Google Scholar
[^p243]: The cognitive science of learning: concepts and strategies for the educator and learner | J Weidman, K Baker | 2015 | https://journals.lww.com/anesthesia-analgesia/fulltext/2015/12000/The_Cognitive_Science_of_Learning__Concepts_and.31.aspx | source:Google Scholar
[^p244]: How can cognitive-science research help improve education? The case of comparing multiple strategies to improve mathematics learning and teaching | B Rittle | 2020 | https://journals.sagepub.com/doi/abs/10.1177/0963721420969365 | source:Google Scholar
[^p245]: Integrating cognitive science and technology improves learning in a STEM classroom | AC Butler, EJ Marsh, JP Slavinsky… | 2014 | https://link.springer.com/article/10.1007/s10648-014-9256-4 | source:Google Scholar
[^p246]: Applying cognitive psychology to education: Translational educational science | HL Roediger III | 2013 | https://journals.sagepub.com/doi/abs/10.1177/1529100612454415 | source:Google Scholar
[^p247]: Science Of Learning Physics, The: Cognitive Strategies For Improving Instruction | J Mestre, J Docktor | 2020 | https://books.google.com/books?hl=en&lr=&id=UkcREAAAQBAJ&oi=fnd&pg=PR5&dq=best+practices+for+effective+learning+long+term+memory+mathematics+physics+education+cognitive+science&ots=pzHGC6OIrM&sig=JkLVu09_lmRxTHcLtxT8hh5naz8 | source:Google Scholar
[^p248]: Cognitive science and the common core mathematics standards | EA Nelson | 2017 | https://www.nonpartisaneducation.org/Review/Articles/v13n3.pdf | source:Google Scholar
[^p249]: Working memory, long-term memory, and instructional design | J Sweller | 2016 | https://www.sciencedirect.com/science/article/pii/S2211368115000935 | source:Google Scholar
[^p250]: Applications of cognitive science to education | HL Roediger, B Finn, Y Weinstein | 2012 | https://books.google.com/books?hl=en&lr=&id=U_wkgyzU21MC&oi=fnd&pg=PA128&dq=best+practices+for+effective+learning+long+term+memory+mathematics+physics+education+cognitive+science&ots=t1vJGeo9kW&sig=V7W04Z-p_iiQ_wfdlJt135l_LLY | source:Google Scholar
[^p251]: No simple solutions to complex problems: Cognitive science principles can guide but not prescribe educational decisions | VX Yan, F Sana, PF Carvalho | 2024 | https://journals.sagepub.com/doi/abs/10.1177/23727322231218906 | source:Google Scholar
[^p252]: Perception of Learners and Facilitators on the Best Practices for Effective Teaching and Learning of Science Courses in Open and Distance Education | Professor Chibuogwu V. Nnaka | 2024 | https://doi.org/10.47191/ijsshr/v7-i01-106 | DOI:10.47191/ijsshr/v7-i01-106 | source:Crossref
[^p253]: Learning and Long‐Term Memory | 2023 | https://doi.org/10.1002/9781394260676.ch8 | DOI:10.1002/9781394260676.ch8 | source:Crossref
[^p254]: Assurance of Learning and Knowledge Retention: Do AOL Practices Measure Long-Term Knowledge Retention or Short-term Memory Recall? | 2018 | https://doi.org/10.33423/jhetp.v18i6.146 | DOI:10.33423/jhetp.v18i6.146 | source:Crossref
[^p255]: Long-Term Memory in Animals | 2017 | https://doi.org/10.1017/9781316026687.011 | DOI:10.1017/9781316026687.011 | source:Crossref
[^p256]: Learning Leadership Roles | 2017 | https://doi.org/10.5040/9798400677694.ch-006 | DOI:10.5040/9798400677694.ch-006 | source:Crossref
[^p257]: Best Practices In Physics Teacher Education In Selected ASEAN Countries | Ida Kaniawati | 2017 | https://doi.org/10.2991/icmsed-16.2017.39 | DOI:10.2991/icmsed-16.2017.39 | source:Crossref
[^p258]: Teaching for Long-Term Memory | 2011 | https://doi.org/10.4135/9781483387277.n4 | DOI:10.4135/9781483387277.n4 | source:Crossref
[^p259]: Online Mathematics and Physical Science (Mathematics, Astronomy, Chemistry and Physics) | Kevin F. Downing, Jennifer K. Holtz | https://doi.org/10.4018/9781599049861.ch010 | DOI:10.4018/9781599049861.ch010 | source:Crossref
[^p260]: The Impact of Simple, Brief, and Adaptive Instructions within Virtual Reality Training: Components of Cognitive Load Theory in an Assembly Task | Rebecca L. Pharmer, Christopher D. Wickens, Lucas Plabst, Benjamin A. Clegg, Leanne M. Hirshfield, Joanna E. Lewis, Jalynn B. Nicoly, Cara A. Spencer, Francisco R. Ortega | 2025 | https://arxiv.org/abs/2507.20943v1 | arXiv:2507.20943v1 | source:ArXiv
[^p261]: Difficulty as a Proxy for Measuring Intrinsic Cognitive Load Item | Minghao Cai, Guher Gorgun, Carrie Demmans Epp | 2025 | https://arxiv.org/abs/2507.13235v1 | arXiv:2507.13235v1 | source:ArXiv
[^p262]: Hierarchical Working Memory and a New Magic Number | 2024 | https://arxiv.org/abs/2408.07637 | arXiv:2408.07637 | source:ArXiv
[^p263]: Memory, Consciousness and Large Language Model | 2024 | https://arxiv.org/abs/2401.02509 | arXiv:2401.02509 | source:ArXiv
[^p264]: Empowering Working Memory for Large Language Model Agents | 2024 | https://arxiv.org/abs/2312.17259 | arXiv:2312.17259 | source:ArXiv
[^p265]: Predicting Cognitive Load Using Sensor Data in a Literacy Game | 2024 | https://arxiv.org/abs/2405.05543 | arXiv:2405.05543 | source:ArXiv
[^p266]: Working Memory Capacity of ChatGPT: An Empirical Study | 2024 | https://arxiv.org/abs/2305.03731 | arXiv:2305.03731 | source:ArXiv
[^p267]: The Power of Attention: Bridging Cognitive Load, Multimedia Learning, and AI | 2023 | https://arxiv.org/abs/2311.06586 | arXiv:2311.06586 | source:ArXiv
[^p268]: Decoding the Enigma: Benchmarking Humans and AIs on the Many Facets of Working Memory | 2023 | https://arxiv.org/abs/2307.10768 | arXiv:2307.10768 | source:ArXiv
[^p269]: Memory and attention in deep learning | 2021 | https://arxiv.org/abs/2107.01390 | arXiv:2107.01390 | source:ArXiv
[^p270]: Improving critical thinking through the cognitive loading control of working memory in introductory physics classes | V Shekoyan, T Cheung | 2018 | https://peer.asee.org/improving-critical-thinking-through-the-cognitive-loading-control-of-working-memory-in-introductory-physics-classes | source:Google Scholar
[^p271]: The roles of working memory and cognitive load in geoscience learning | AJ Jaeger, TF Shipley, SJ Reynolds | 2017 | https://www.tandfonline.com/doi/abs/10.5408/16-209.1 | source:Google Scholar
[^p272]: Extending cognitive load theory to incorporate working memory resource depletion: Evidence from the spacing effect | O Chen, JC Castro | 2018 | https://link.springer.com/article/10.1007/s10648-017-9426-2 | source:Google Scholar
[^p273]: Cognitive load theory and educational technology | J Sweller | 2020 | https://link.springer.com/article/10.1007/s11423-019-09701-3 | source:Google Scholar
[^p274]: Cognitive load and working memory in multimedia learning: Conceptual and measurement issues | Ø Anmarkrud, A Andresen, I Bråten | 2019 | https://www.tandfonline.com/doi/abs/10.1080/00461520.2018.1554484 | source:Google Scholar
[^p275]: Cognitive load theory: A broader view on the role of memory in learning and education | F Paas, P Ayres | 2014 | https://link.springer.com/article/10.1007/s10648-014-9263-5 | source:Google Scholar
[^p276]: Working memory is limited: improving knowledge transfer by optimising simulation through cognitive load theory | M Meguerdichian, K Walker… | 2016 | https://pmc.ncbi.nlm.nih.gov/articles/PMC8936700/ | source:Google Scholar
[^p277]: Cognitive load theory and its measurement: a study of secondary tasks in relation to working memory | K Greenberg, R Zheng | 2022 | https://www.tandfonline.com/doi/abs/10.1080/20445911.2022.2026052 | source:Google Scholar
[^p278]: Cognitive load theory and human movement: Towards an integrated model of working memory | S Sepp, SJ Howard, S Tindall | 2019 | https://link.springer.com/article/10.1007/s10648-019-09461-9 | source:Google Scholar
[^p279]: Sensory Memory, Working Memory, and Long-Term Memory | Dayu Jiang | 2024 | https://doi.org/10.1007/978-981-97-2317-1_3 | DOI:10.1007/978-981-97-2317-1_3 | source:Crossref
[^p280]: Working Memory, Cognitive Load, and Learning | Robert Z. Zheng, Michael K. Gardner | 2019 | https://doi.org/10.4324/9780429019142-4 | DOI:10.4324/9780429019142-4 | source:Crossref
[^p281]: Cognitive load theory and working memory models | Sébastien Puma, André Tricot | 2019 | https://doi.org/10.4324/9780429283895-4 | DOI:10.4324/9780429283895-4 | source:Crossref
[^p282]: Interrelationships between working memory and long-term memory | Charan Ranganath | 2009 | https://doi.org/10.1093/acprof:oso/9780199217298.003.0013 | DOI:10.1093/acprof:oso/9780199217298.003.0013 | source:Crossref
[^p283]: Activated long-term memory? | Bradley R. Postle | 2007 | https://doi.org/10.1093/acprof:oso/9780198570394.003.0019 | DOI:10.1093/acprof:oso/9780198570394.003.0019 | source:Crossref
[^p284]: Visual Long Term Memory and the Effects of Working Memory Capacity | Kristin Sitton | 2006 | https://doi.org/10.1037/e582662007-001 | DOI:10.1037/e582662007-001 | source:Crossref
[^p285]: Faculty Opinions recommendation of Memory processes of flight situation awareness: interactive roles of working memory capacity, long-term working memory, and expertise. | Yadin Dudai | 2004 | https://doi.org/10.3410/f.1022819.262671 | DOI:10.3410/f.1022819.262671 | source:Crossref
[^p286]: Effects of working memory load on long‐term word priming | Josep Baqués, Dolors Sáiz, Jeffrey Bowers | 2004 | https://doi.org/10.1080/09658210244000469 | DOI:10.1080/09658210244000469 | source:Crossref
[^p287]: Roles of working memory capacity and long-term working memory skill in complex task performance | Young Woo Sohn, Stephanie M. Doane | 2003 | https://doi.org/10.3758/bf03194403 | DOI:10.3758/bf03194403 | source:Crossref
[^p288]: Does limited working-memory capacity underlie age differences in associative long-term memory? | Lea M. Bartsch, Vanessa M. Loaiza, Klaus Oberauer | https://doi.org/10.31234/osf.io/3xtma | DOI:10.31234/osf.io/3xtma | source:Crossref
[^p289]: A Proposal to Extend the Common Model of Cognition with Metacognition | John Laird, Christian Lebiere, Paul Rosenbloom, Andrea Stocco, Robert Wray | 2025 | https://arxiv.org/abs/2506.07807v1 | arXiv:2506.07807v1 | source:ArXiv
[^p290]: Metacognitive particles, mental action and the sense of agency | 2024 | https://arxiv.org/abs/2405.12941 | arXiv:2405.12941 | source:ArXiv
[^p291]: Metacognitive Capabilities of LLMs: An Exploration in Mathematical Problem Solving | 2024 | https://arxiv.org/abs/2405.12205 | arXiv:2405.12205 | source:ArXiv
[^p292]: Towards a Bayesian mechanics of metacognitive particles: A commentary on "Path integrals, particular kinds, and strange things" by Friston, Da Costa, Sakthivadivel, Heins, Pavliotis, Ramstead, and Parr | 2024 | https://arxiv.org/abs/2403.06981 | arXiv:2403.06981 | source:ArXiv
[^p293]: Leveraging Deep Reinforcement Learning for Metacognitive Interventions across Intelligent Tutoring Systems | 2023 | https://arxiv.org/abs/2304.09821 | arXiv:2304.09821 | source:ArXiv
[^p294]: Meta-Learned Models of Cognition | Marcel Binz, Ishita Dasgupta, Akshay Jagadish, Matthew Botvinick, Jane X. Wang, Eric Schulz | 2023 | https://arxiv.org/abs/2304.06729 | arXiv:2304.06729 | source:ArXiv
[^p295]: From internal models toward metacognitive AI | 2021 | https://arxiv.org/abs/2109.12798 | arXiv:2109.12798 | source:ArXiv
[^p296]: The patterns of physics problem-solving from the perspective of metacognition | FAP binti Abdullah | 2009 | https://www.academia.edu/download/3243947/Phang_2009_PhD_Thesis_Meatcogntion_Physics.pdf | source:Google Scholar
[^p297]: The roles of motivation and metacognition in producing self-regulated learners of college physical science: a review of empirical studies | LD McDowell | 2019 | https://www.tandfonline.com/doi/abs/10.1080/09500693.2019.1689584 | source:Google Scholar
[^p298]: Metacognitive function in young adults is impacted by physical activity, diet, and sleep patterns | GK Gooderham, TC Handy | 2025 | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0317253 | source:Google Scholar
[^p299]: Decreasing sedentary behavior: Effects on academic performance, meta-cognition, and sleep | JJ Pilcher, DM Morris, SA Bryant, PA Merritt… | 2017 | https://www.frontiersin.org/articles/10.3389/fnins.2017.00219/full | source:Google Scholar
[^p300]: The effects of sleep deprivation on visual perception and metacognition | M Bigica | 2022 | https://orca.cardiff.ac.uk/id/eprint/161005/ | source:Google Scholar
[^p301]: Learning to think mathematically: Problem solving, metacognition, and sense making in mathematics (Reprint) | AH Schoenfeld | 2016 | https://journals.sagepub.com/doi/abs/10.1177/002205741619600202 | source:Google Scholar
[^p302]: Learning Environment to Promote Student Metacognition: Self-Regulated Learning System for Electrical Class Use Case | P BUCHAPUTARA | https://muroran-it.repo.nii.ac.jp/records/2000414 | source:Google Scholar
[^p303]: Metacognition–The Neuroscience of Learning | K Graham, R Grossman, E Handte, C Marks… | 2022 | https://pressbooks.cuny.edu/lagccfys/chapter/metacognition-the-neuroscience-of-learning/ | source:Google Scholar
[^p304]: … SKILLS THROUGH SIMULATION CARDS, EXPERIMENTS OF ASSESSMENT, AND STEM IMPLEMENTATION IN CHEMISTRY AND PHYSICS EDUCATION | I Anwari | 2014 | https://shizuoka.repo.nii.ac.jp/record/7069/files/K0823.pdf | source:Google Scholar
[^p305]: The impact of a metacognition-based course on school students' metacognitive skills and biology comprehension | A Sadykova, M Iskakova, G Ismailova… | 2024 | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1460496/full | source:Google Scholar
[^p306]: Reviewer #3 (Public Review): Episodic long-term memory formation during slow-wave sleep | 2024 | https://doi.org/10.7554/elife.89601.2.sa0 | DOI:10.7554/elife.89601.2.sa0 | source:Crossref
[^p307]: Reviewer #1 (Public Review): Episodic long-term memory formation during slow-wave sleep | 2024 | https://doi.org/10.7554/elife.89601.2.sa1 | DOI:10.7554/elife.89601.2.sa1 | source:Crossref
[^p308]: Reviewer #2 (Public Review): Episodic long-term memory formation during slow-wave sleep | 2023 | https://doi.org/10.7554/elife.89601.1.sa1 | DOI:10.7554/elife.89601.1.sa1 | source:Crossref
[^p309]: Psychostimulants may block long-term memory formation via degraded sleep in healthy adults | Lauren N. Whitehurst, Sara C. Mednick | 2021 | https://doi.org/10.1016/j.nlm.2020.107342 | DOI:10.1016/j.nlm.2020.107342 | source:Crossref
[^p310]: Decision letter: Neuronal reactivation during post-learning sleep consolidates long-term memory in Drosophila | Mani Ramaswami, Craig Montell | 2018 | https://doi.org/10.7554/elife.42786.021 | DOI:10.7554/elife.42786.021 | source:Crossref
[^p311]: Sleep and long-term memory storage | Jennifer H.K. Choi, Ted Abel | 2013 | https://doi.org/10.1017/cbo9781139649469.022 | DOI:10.1017/cbo9781139649469.022 | source:Crossref
[^p312]: Long-term memory | 2011 | https://doi.org/10.1017/cbo9781139046978.013 | DOI:10.1017/cbo9781139046978.013 | source:Crossref
[^p313]: Distribution of Practice and Metacognition in Learning and Long-Term Retention of a Discrete Motor Task | Teresa K. Dail, Robert W. Christina | 2004 | https://doi.org/10.1080/02701367.2004.10609146 | DOI:10.1080/02701367.2004.10609146 | source:Crossref
[^p314]: Enhancing Memory Recall in LLMs with Gauss-Tin: A Hybrid Instructional and Gaussian Replay Approach | Iing Muttakhiroh, Thomas Fevens | 2025 | https://arxiv.org/abs/2508.09510v1 | arXiv:2508.09510v1 | source:ArXiv
[^p315]: Memorization: A Close Look at Books | Iris Ma, Ian Domingo, Alberto Krone-Martins, Pierre Baldi, Cristina V. Lopes | 2025 | https://arxiv.org/abs/2504.12549v1 | arXiv:2504.12549v1 | source:ArXiv
[^p316]: How Relevant is Selective Memory Population in Lifelong Language Learning? | 2022 | https://arxiv.org/abs/2210.00940 | arXiv:2210.00940 | source:ArXiv
[^p317]: The Effectiveness of Memory Replay in Large Scale Continual Learning | 2020 | https://arxiv.org/abs/2010.02418 | arXiv:2010.02418 | source:ArXiv
[^p318]: A meta-analytic review of the effectiveness of spacing and retrieval practice for mathematics learning | E Murray, AJ Horner, SM Göbel | 2025 | https://link.springer.com/article/10.1007/s10648-025-10035-1 | source:Google Scholar
[^p319]: Evidence of the spacing effect and influences on perceptions of learning and science curricula | X Yuan | 2022 | https://www.cureus.com/articles/81442-evidence-of-the-spacing-effect-and-influences-on-perceptions-of-learning-and-science-curricula.pdf | source:Google Scholar
[^p320]: Spaced retrieval practice increases college students' short-and long-term retention of mathematics knowledge | RF Hopkins, KB Lyle, JL Hieb, PAS Ralston | 2016 | https://link.springer.com/article/10.1007/s10648-015-9349-8 | source:Google Scholar
[^p321]: How the amount and spacing of retrieval practice affect the short-and long-term retention of mathematics knowledge | KB Lyle, CR Bego, RF Hopkins, JL Hieb… | 2020 | https://link.springer.com/article/10.1007/s10648-019-09489-x | source:Google Scholar
[^p322]: The effectiveness of spaced learning, interleaving, and retrieval practice in radiology education: a systematic review | CP Thompson, MA Hughes | 2023 | https://www.sciencedirect.com/science/article/pii/S1546144023006464 | source:Google Scholar
[^p323]: The science of effective learning with spacing and retrieval practice | SK Carpenter, SC Pan, AC Butler | 2022 | https://www.nature.com/articles/s44159-022-00089-1 | source:Google Scholar
[^p324]: Single-paper meta-analyses of the effects of spaced retrieval practice in nine introductory STEM courses: is the glass half full or half empty? | CR Bego, KB Lyle, PAS Ralston, JC Immekus… | 2024 | https://link.springer.com/article/10.1186/s40594-024-00468-5 | source:Google Scholar
[^p325]: Memory and metacognition in classroom learning: the role of item order in learning with particular reference to the interleaving effect | J Firth | 2021 | https://stax.strath.ac.uk/concern/theses/pz50gw483 | source:Google Scholar
[^p326]: A meta-analysis of ten learning techniques | GM Donoghue, JAC Hattie | 2021 | https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2021.581216/full?trk=public_post_comment-text | source:Google Scholar
[^p327]: Spaced repetition and active recall improves academic performance among pharmacy students | Saravanan Jayaram | 2026 | https://doi.org/10.1016/j.cptl.2025.102510 | DOI:10.1016/j.cptl.2025.102510 | source:Crossref
[^p328]: Anapolo: A Web-Based Spaced Repetition E-Learning Platform for Enhanced Long-Term Memory Retention | Mary Jane Samonte, Yeshua Miguel Abrenica, Juan Miguel Caparas, Denise Nicole Marcelo | 2024 | https://doi.org/10.1145/3719487.3719520 | DOI:10.1145/3719487.3719520 | source:Crossref
[^p329]: Active recall y spaced repetition: herramientas para estudiantes de Medicina | Elvira G. Zamora-Huaringa | 2024 | https://doi.org/10.1016/j.edumed.2024.100919 | DOI:10.1016/j.edumed.2024.100919 | source:Crossref
[^p330]: Vocabulary learning through viewing dual-subtitled videos: Immediate repetition versus spaced repetition as an enhancement strategy | Siowai Lo | 2024 | https://doi.org/10.1017/s0958344024000053 | DOI:10.1017/s0958344024000053 | source:Crossref
[^p331]: Harnessing the power of spaced repetition learning and active recall for trainee education in otolaryngology | John P. Marinelli, Tiffany P. Hwa, Christine M. Lohse, Matthew L. Carlson | 2022 | https://doi.org/10.1016/j.amjoto.2022.103495 | DOI:10.1016/j.amjoto.2022.103495 | source:Crossref
[^p332]: Spaced repetition tool for improving long-term memory retention and recall of collected personal experiences | Norbert Győrbíró, Henry Larkin, Michael Cohen | 2010 | https://doi.org/10.1145/1971630.1971673 | DOI:10.1145/1971630.1971673 | source:Crossref
[^p333]: Effects of Spaced Repetition on Long-Term Map Knowledge Recall | David M. Zirkle, Arthur K. Ellis | 2010 | https://doi.org/10.1080/00221341.2010.504780 | DOI:10.1080/00221341.2010.504780 | source:Crossref
[^p334]: Age, Intentionality, and Spaced-Repetition Effects in Free Recall | Thomas C. Toppino, Melodie Fearnow | 1992 | https://doi.org/10.1037/e665412011-288 | DOI:10.1037/e665412011-288 | source:Crossref
[^p335]: BOARD #101: Work In Progress: Enhancing Active Recall and Spaced Repetition with LLM-Augmented Review Systems | Muhammed Yakubu, Jasnoor Guliani, Nipun Shukla, Dylan O'Toole, Hamid Timorabadi | https://doi.org/10.18260/1-2--55918 | DOI:10.18260/1-2--55918 | source:Crossref
[^p336]: Targeted Memory Reactivation Increases Memory Recall: A Meta-analysis | Thomas Lieber | https://doi.org/10.1101/796458 | DOI:10.1101/796458 | source:Crossref
[^p337]: The Role of Conceptual Problem Solving in Learning Physics: A Study in a General Relativity University Course | Matteo Tuveri, Andrea Pierfrancesco Sanna, Mariano Cadoni | 2025 | https://arxiv.org/abs/2502.08564v1 | arXiv:2502.08564v1 | source:ArXiv
[^p338]: Physics Teachers' Perceptions about Diagnostic Assessment of Students' Physics Misconceptions: A Phenomenological Study | 2025 | https://arxiv.org/abs/2501.10422 | arXiv:2501.10422 | source:ArXiv
[^p339]: Expert covariational reasoning resources in physics graphing tasks | 2024 | https://arxiv.org/abs/2306.00921 | arXiv:2306.00921 | source:ArXiv
[^p340]: Using the Energy and Momentum Conceptual Survey to investigate progression in student understanding from introductory to advanced levels | 2023 | https://arxiv.org/abs/2311.17054 | arXiv:2311.17054 | source:ArXiv
[^p341]: Visual representations in science education: The influence of prior knowledge and cognitive load theory on instructional design principles | MP Cook | 2006 | https://onlinelibrary.wiley.com/doi/abs/10.1002/sce.20164 | source:Google Scholar
[^p342]: Cognitive load theory and the use of worked examples as an instructional strategy in physics for distance learners: A preliminary study | KG Saw | 2017 | https://dergipark.org.tr/en/doi/10.17718/tojde.340405 | source:Google Scholar
[^p343]: Example-based learning in heuristic domains: A cognitive load theory account | A Renkl, T Hilbert, S Schworm | 2009 | https://link.springer.com/article/10.1007/s10648-008-9093-4 | source:Google Scholar
[^p344]: Investigating the use of integrated instructions to reduce the cognitive load associated with doing practical work in secondary school science | CY Haslam, RJ Hamilton | 2010 | https://www.tandfonline.com/doi/abs/10.1080/09500690903183741 | source:Google Scholar
[^p345]: Cognitive and Psychological Aspects of Physics Learning | AK Sharma | 2025 | https://physics.cfu.ac.ir/article_4109.html | source:Google Scholar
[^p346]: Supporting mathematical discussions: The roles of comparison and cognitive load | LE Richland, KN Begolli, N Simms, RR Frausel… | 2017 | https://link.springer.com/article/10.1007/s10648-016-9382-2 | source:Google Scholar
[^p347]: Optimizing Cognitive Load in Digital Mathematics Textbooks: A Mixed-Methods Study on Content Organization and Application Models | X Mao, Y Dai, Y Liu, Y Jiang… | 2025 | https://media.sciltp.com/articles/2510001717/2510001717.pdf | source:Google Scholar
[^p348]: Near and far transfer of learning in mathematics lesson designed based on cognitive load theory principles: A case study | BG Tüker | 2013 | https://search.proquest.com/openview/1a32a37a2ebecbdb580ab4ae5a232b2b/1?pq-origsite=gscholar&cbl=2026366&diss=y | source:Google Scholar
[^p349]: Next Generation Science Standards Visual Literacy: Cognitive Load Theory Based Approach for Middle-Level Students | CJ Huhn | 2024 | https://wyoscholar.uwyo.edu/server/api/core/bitstreams/66ef5812-6379-43cb-b67f-7aa5d20acacd/content | source:Google Scholar
[^p350]: Assessing Student Course Evaluation Comments Using Cognitive Load Theory: Insights for Best Teaching Practices | Mohammed Islam, Suhui Yang, Rose Bagheri | 2025 | https://doi.org/10.1016/j.ajpe.2025.101737 | DOI:10.1016/j.ajpe.2025.101737 | source:Crossref
[^p351]: Conceptual semantics | 2024 | https://doi.org/10.5040/9781350355491.ch-002 | DOI:10.5040/9781350355491.ch-002 | source:Crossref
[^p352]: Design thinking in higher education: best practices and lessons learnt | 2023 | https://doi.org/10.1049/pbme024e_ch12 | DOI:10.1049/pbme024e_ch12 | source:Crossref
[^p353]: Enhancing classroom discourse about measure to foster a conceptual understanding of geometrical practices | Aurélie Chesnais | 2021 | https://doi.org/10.1007/s11858-021-01255-0 | DOI:10.1007/s11858-021-01255-0 | source:Crossref
[^p354]: English Language Learners’ Cognitive Load and Conceptual Understanding of Probability Distributions after Using an Animated Simulation Program | Jase Moussa-Inaty, Mark Causapin | 2019 | https://doi.org/10.1564/tme_v26.4.02 | DOI:10.1564/tme_v26.4.02 | source:Crossref
[^p355]: Graph in Physics Education: From Representation to Conceptual Understanding | Alberto Stefanel | 2019 | https://doi.org/10.1007/978-3-030-04627-9_9 | DOI:10.1007/978-3-030-04627-9_9 | source:Crossref
[^p356]: Understanding Educational Theory | Bruce M. Mackh | 2018 | https://doi.org/10.4324/9781351133715-2 | DOI:10.4324/9781351133715-2 | source:Crossref
[^p357]: How Cognitive Science Can Promote Conceptual Understanding in Physics Classrooms | Jose P. Mestre, Brian H. Ross, David T. Brookes, Adam D. Smith, Timothy J. Nokes | 2009 | https://doi.org/10.1163/9789087909239_009 | DOI:10.1163/9789087909239_009 | source:Crossref
[^p358]: Making sense of quantum teleportation: An intervention study on students' conceptions using a diagrammatic approach | 2025 | https://arxiv.org/abs/2511.21443v1 | arXiv:2511.21443v1 | source:ArXiv
[^p359]: Evaluation of a deliberate-practice informed supplemental intervention in graduate Quantum Mechanics | 2025 | https://arxiv.org/abs/2508.09917v1 | arXiv:2508.09917v1 | source:ArXiv
[^p360]: Investigation of student and faculty problem solving: An example from quantum mechanics | Alexandru Maries, Ryan Sayer, Chandralekha Singh | 2025 | https://arxiv.org/abs/2504.17487v1 | arXiv:2504.17487v1 | source:ArXiv
[^p361]: Using machine learning to measure evidence of students' sensemaking in physics courses | Kaitlin Gili, Kyle Heuton, Astha Shah, Michael C. Hughes | 2025 | https://arxiv.org/abs/2503.15638v1 | arXiv:2503.15638v1 | source:ArXiv
[^p362]: Promoting the transition to quantum thinking: development of a secondary school course for addressing knowledge revision, organization, and epistemological challenges | 2024 | https://arxiv.org/abs/2301.00239 | arXiv:2301.00239 | source:ArXiv
[^p363]: Sensemaking throughout the physics curriculum: Understanding expert and student ideas about sensemaking in a physics context | MK Lenz | 2020 | https://ir.library.oregonstate.edu/concern/graduate_thesis_or_dissertations/kp78gp46z | source:Google Scholar
[^p364]: Students' Perceptions of Feynman Technique in Mathematics Learning: A Case of a State University in Claveria, Misamis Oriental | AS Travero, CM Castrodes, PJB Panganiban | 2025 | https://www.researchgate.net/profile/Charlito-Castrodes-2/publication/392514831_Students'_Perceptions_of_Feynman_Technique_in_Mathematics_Learning_A_Case_of_a_State_University_in_Claveria_Misamis_Oriental/links/68465376df0e3f544f5dad06/Students-Perceptions-of-Feynman-Technique-in-Mathematics-Learning-A-Case-of-a-State-University-in-Claveria-Misamis-Oriental.pdf | source:Google Scholar
[^p365]: Categorical framework for mathematical sense making in physics | JD Gifford, ND Finkelstein | 2020 | https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.16.020121 | source:Google Scholar
[^p366]: Modeling as sensemaking: towards a theory of modelling in physics education | D Sands | 2021 | https://iopscience.iop.org/article/10.1088/1361-6404/abcc80/meta | source:Google Scholar
[^p367]: Assessing mathematical sensemaking in physics through calculation-concept crossover | E Kuo, MM Hull, A Elby, A Gupta | 2020 | https://journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.16.020109 | source:Google Scholar
[^p368]: The Use of Feynman Diagrams in Physics Education: Opportunities, Challenges, Practices | MN Dahlkemper | 2024 | https://ediss.uni-goettingen.de/handle/11858/15334 | source:Google Scholar
[^p369]: Mathematical sensemaking via epistemic games | M Eichenlaub | 2018 | https://search.proquest.com/openview/7473cc7f614092576425ed2ebaa56dac/1?pq-origsite=gscholar&cbl=18750&diss=y | source:Google Scholar
[^p370]: Storytelling and Sensemaking Physics from Newspapers | EJ Bahng, JM Hauptman | 2022 | https://pubs.aip.org/aapt/pte/article/60/8/632/2848360 | source:Google Scholar
[^p371]: Sensemaking of wave–particle duality in a scientific outreach minicourse: a study based in self-regulation | MHT Becker, LA Heidemann… | 2024 | https://iopscience.iop.org/article/10.1088/1361-6404/ad8a29/meta | source:Google Scholar
[^p372]: Pathway to Sense-Making, Using Epistemic Affect, and Epistemic Empathy in STEM with In-Service Primary Teachers | A Gilbert, J Suh | 2025 | https://books.google.com/books?hl=en&lr=&id=JAuhEQAAQBAJ&oi=fnd&pg=PA299&dq=feynman+technique+mathematical+sensemaking+physics+education+conceptual+understanding+learning+strategies+community+use&ots=ghvzwmcLY5&sig=9_joSIB-7h3MbpKqqtWDMrnMwMQ | source:Google Scholar
[^p373]: Enhancing Mathematical Conceptual Understanding and Computation Skills of Grade Nine Learners through Team- Based Learning Strategies | 2025 | https://doi.org/10.71002/iecs.v5n4p1 | DOI:10.71002/iecs.v5n4p1 | source:Crossref
[^p374]: Learning through the arts: cultural strategies for decolonisation | Marjorie Mayo | 2024 | https://doi.org/10.1332/policypress/9781447367567.003.0008 | DOI:10.1332/policypress/9781447367567.003.0008 | source:Crossref
[^p375]: Communities, social movements and municipal strategies for equalities and solidarity | Marjorie Mayo | 2024 | https://doi.org/10.1332/policypress/9781447367567.003.0007 | DOI:10.1332/policypress/9781447367567.003.0007 | source:Crossref
[^p376]: Learning through the arts: | 2024 | https://doi.org/10.2307/jj.12348170.12 | DOI:10.2307/jj.12348170.12 | source:Crossref
[^p377]: The Enhancement of Students’ Mathematical Conceptual Understanding Through RADEC Learning Model | Trisna Nugraha, Sufyani Prabawanto | 2021 | https://doi.org/10.24235/eduma.v10i2.9073 | DOI:10.24235/eduma.v10i2.9073 | source:Crossref
[^p378]: Active Learning Methods and Strategies to Improve Student Conceptual Understanding: Some Considerations from Physics Education Research | Claudio Fazio | 2020 | https://doi.org/10.1007/978-3-030-51182-1_2 | DOI:10.1007/978-3-030-51182-1_2 | source:Crossref
[^p379]: Nurturing sensemaking of, through, and with a mathematical model | Shulamit Kapon, Maayan Schvartzer | 2019 | https://doi.org/10.1119/perc.2018.pr.kapon | DOI:10.1119/perc.2018.pr.kapon | source:Crossref
[^p380]: Conceptual Framework: | 2013 | https://doi.org/10.2307/j.ctv2t5xgxx.8 | DOI:10.2307/j.ctv2t5xgxx.8 | source:Crossref


now our virtual environment is made using uv and we have to use it for our project. for running scripts you use uv run script_name.py   , for installing new libraries use , uv add name . 

the goal we want to keep in mind and aim at too is :
Judging Criteria:
1. Functionality: Does the app actually work as intended? Are the core features implemented, stable, and responsive?
2. Real-world relevance: How practical and applicable is this solution to real users’ lives and real-world New Year’s goals?
3. Use of LLMs/Agents: How effectively does the project use LLMs or agentic systems (e.g. reasoning chains, autonomy, retrieval, tool use)?
4. Evaluation and observability: Has the team implemented ways to evaluate or monitor their system’s behavior (e.g. metrics, human-in-the-loop validation, Opik integration)? How robustly?
5. Goal Alignment: How well is Opik integrated into the development workflow (e.g. tracking experiments, model versions, evaluation runs)? Does the team use Opik to produce meaningful insights or improve model quality systematically? Are Opik dashboards, metrics, or visualizations clearly presented for judging?

like if we absolutley need 1 and 2 points for everything, and for rest 3,4,5 we try to use them wherever suitable. Like for sure you can search for research papers, search internet and etc things and provide more ideas where project could be improved. 