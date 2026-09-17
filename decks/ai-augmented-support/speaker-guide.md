# AI-Augmented ITSM Operations · speaker guide

## Run of show

| Segment | Time |
|---|---:|
| Opening question | 0:30 |
| 01 · Promise | 0:45 |
| 02 · Fragmented investigation | 1:45 |
| 03 · Operating model | 1:45 |
| 04 · Comparative journey | 2:00 |
| 05 · Deterministic self-healing | 1:45 |
| 06 · Platform responsibilities | 1:45 |
| 07 · Reference architecture | 2:15 |
| 08 · Governance | 1:50 |
| 09 · Outcome metrics | 1:30 |
| 10 · Close | 1:15 |
| Transitions and discussion buffer | 2:55 |
| **Total** | **20:00** |

## Opening question

“¿Cuánto tiempo usamos resolviendo incidentes y cuánto reconstruyendo lo que ya se sabía?”

**Pause for five seconds.** Ask the audience to think of a recent incident. Do not answer yet; return to this question on the closing slide.

## 01 · Promise

This is an AI-augmented ITSM operating model, not a chatbot proposal. Its purpose is to reduce repeated investigation, accelerate recovery when risk permits, and turn incident learning into prevention. Continuous context is an enabler. Connect manages the interaction journey, ITSM keeps the operational record, deterministic automation runs approved procedures, and AgentCore provides governed agentic capabilities.

## 02 · Fragmented investigation

First show the journey from customer to resolution. Then reveal the three sources that hold investigation knowledge: the case, technical tools, and people. On the final click, show: “La información existe. Lo que falta es una investigación continua.” The proposed pattern preserves a structured investigation rather than merely adding a better ticket summary.

## 03 · Operating model

Reveal one tier at a time. In T0, emphasize that known scenarios can use self-service, rules, and deterministic runbooks. In T1, IA and human work together. In T2 and T3, human specialists and engineering lead. The role changes with risk: automation executes approved procedures; AI assists or acts only inside its authorized boundary.

## 04 · Comparative journey

Reveal the two journeys in parallel: Contact, T0, T1, T2, T3, and resolution. On the augmented route, context grows from initial details to evidence, actions, correlations, and hypotheses. **Pause at T3.** Contrast “receives an escalated case” with “receives an investigation.” Do not claim a measured reduction in resolution time.

## 05 · Deterministic self-healing

Make the separation explicit. A known operational signal triggers a rule, which starts a pre-approved runbook. The flow validates the result, rolls back where designed, and updates the ITSM record. AI can detect, explain, or recommend; it does not replace the deterministic recovery mechanism.

## 06 · Platform responsibilities

Amazon Connect owns customer interaction, initial assistance, and support routing. ITSM is the system of record for cases, changes, CMDB, and operational traceability. Approved automation executes runbooks. Amazon Bedrock AgentCore provides specialized agentic investigation and governed access to technical tools.

## 07 · Reference architecture

Keep the explanation crisp:

- Amazon Connect owns the customer interaction and support journey.
- ITSM records the case, change, and operational history.
- Event-driven automation executes approved runbooks for known conditions.
- AgentCore powers governed investigation and tool use.

The integrations connect these responsibilities to existing enterprise tools.

## 08 · Governance

Separate reasoning, authorization, and approval. An agent can reason about a broad range of actions. Policy and IAM limit executable capabilities. The same principle applies to a runbook: it executes only with an approved trigger and permission boundary. Higher-risk actions require a person.

## 09 · Outcome metrics

These are success measures, not promises. Establish a client baseline first, then track intervention-free resolution, time to recovery, repeated investigation work, and recurrence prevention. Discovery determines the source systems, metric definitions, and MVP baseline.

## 10 · Close

Repeat the opening question. **Pause.** The operating model should spend more time resolving and preventing incidents than reconstructing old knowledge.

Ask to package the pattern as an offering with discovery, a reference architecture, and a demonstrable end-to-end MVP over a concrete support scenario.

## Confirm before presenting

- The ITSM system of record, its case/change/CMDB scope, and its integration boundaries.
- Candidate runbooks, their triggers, rollback behavior, and operational owners.
- Which cases are appropriate for deterministic automation versus AI assistance.
- AgentCore and Amazon Connect capabilities available in the target AWS region and account.
- IAM, policy, approval, audit, and human-override controls.
- Baseline definitions for recovery time, resolution without intervention, repeated investigation, and recurrence.
- Any claimed improvement in MTTR, escalation rate, or human effort; treat all as hypotheses until measured.

## Annex navigation

Press `A` to open the annexes and `M` to return to the exact main slide. Press `N` to open the native Slidev notes viewer in a separate window.
