// AI-augmented support — AWS architecture (T0→T3) — condensed SINGLE 16:9 SLIDE (technical/executive map).
// Same terminology as the detailed diagram (ai-augmented-support-architecture.drawio) but compressed:
// journey strip (thin) -> Support Plane | bridge | Agentic Plane (center of gravity) -> governance rail
// (thin) -> tools row (icon+label only) -> product plane (thin) -> corner risk/actor legend.
// Layout engine ONLY (group/frame/grid/phantom/icon/box + renderTree) — no hand-written coordinates.
import { writeFileSync } from "node:fs";
import { Diagram } from "/Users/alvarovera/.local/lib/node_modules/drawio-ai-kit/src/builder.mjs";
import {
  group, frame, grid, icon, box, stage, band, endpoint, ossBox, phantom, renderTree,
} from "/Users/alvarovera/.local/lib/node_modules/drawio-ai-kit/src/layout-engine.mjs";

const d = new Diagram("pipeline", { iconSize: 34, page: [2200, 1300] });

// ---------------------------------------------------------------------------
// TOP — thin journey strip T0→T3 (research artifact = growing labels on the arrows)
// ---------------------------------------------------------------------------
const journeyRow = phantom("journey_row", "", { dir: "row", gap: 20, align: "center" }, [
  box("j_cust", "CLIENTE\nVoice·Chat·Digital", { w: 150 }),
  box("j_t0", "T0 — IA autónoma\n(R0/R1)", { w: 150 }),
  box("j_t1", "T1 — IA + Humano", { w: 150 }),
  box("j_t2", "T2 — Especialista\n+ Investigation Agent", { w: 190 }),
  box("j_t3", "T3 — Ingeniería\n+ Engineering Agent", { w: 190 }),
]);

const journeyCaption = box(
  "journey_caption",
  "El contexto (research artifact) crece en cada escalón: intención → telemetría/acciones → hipótesis/evidencia → causa raíz + plan.",
  { w: 900, h: 26, fill: "none", stroke: "none" }
);

const journey = frame(
  "journey",
  "JOURNEY T0→T3",
  { dir: "col", gap: 6, fill: "light-dark(#FBF8F0,#241f12)", stroke: "#ED7100" },
  [journeyRow, journeyCaption]
);

// ---------------------------------------------------------------------------
// CENTER — Support Plane | bridge | Agentic Plane (main visual weight)
// ---------------------------------------------------------------------------
const supportCaps = grid("support_caps", null, "", { cols: 2, gap: 8 }, [
  icon("connect_core", "connect", "Amazon Connect"),
  icon("cases", "connect", "Connect Cases\n(system of record)"),
  icon("ai_agents", "chatbot", "AI Agents in\nConnect (T0/T1)"),
  icon("workspace", "agent", "Agent Workspace\n(humano)"),
]);

const support = frame(
  "support",
  "01 · CUSTOMER SUPPORT PLANE — Amazon Connect\nInteracción con cliente y ciclo de soporte",
  { dir: "col", gap: 10, fill: "light-dark(#F0F7FF,#122232)", stroke: "#0972D3" },
  [supportCaps]
);

const bridge = box("bridge", "APIs · Events\n· MCP", { w: 130 });

const agentsRow = grid("agents_row", null, "Agentes especializados — acceso ACOTADO (no irrestricto)", { cols: 3, gap: 8 }, [
  icon("inv_agent", "bedrock_agentcore", "Investigation\nAgent"),
  icon("rem_agent", "bedrock_agentcore", "Remediation\nAgent"),
  icon("eng_agent", "bedrock_agentcore", "Engineering\nAgent"),
]);

const acCore = phantom("ac_core", "", { dir: "row", gap: 50, align: "center" }, [
  icon("ac_icon", "bedrock_agentcore", "Bedrock\nAgentCore"),
  icon("ac_memory", "bedrock_agentcore", "AgentCore Memory\n(memoria de trabajo,\nseparada de Cases)"),
]);

const govChain = box(
  "gov_chain",
  "Gateway → Policy/Identity → Catálogo → Riesgo → Ejecutar/Aprobar/Denegar",
  { w: 420, h: 30 }
);

const obsAgentNote = box(
  "obs_agent_note",
  "AgentCore Observability + Evaluations — ¿qué hizo el agente? sesiones · tool calls · decisiones · approvals (≠ observabilidad del producto, abajo)",
  { w: 420, h: 36 }
);

const agentic = frame(
  "agentic",
  "02 · AGENTIC OPERATIONS PLANE — Amazon Bedrock AgentCore\nInvestigación, agentes operativos, herramientas y gobierno",
  { dir: "col", gap: 10, fill: "light-dark(#F7F4FF,#1c1730)", stroke: "#8C4FFF" },
  [acCore, agentsRow, govChain, obsAgentNote]
);

const centerRow = phantom("center_row", "", { dir: "row", gap: 20, align: "center" }, [support, bridge, agentic]);

// ---------------------------------------------------------------------------
// Governance / security rail — thin VERTICAL side column (cross-cutting)
// ---------------------------------------------------------------------------
const govRail = frame(
  "gov_rail",
  "SEGURIDAD · GOBIERNO (transversal)",
  { dir: "col", gap: 12, fill: "light-dark(#F5F5F5,#20242b)", stroke: "#5A6B7B" },
  [
    icon("iam", "identity_and_access_management", "IAM"),
    icon("kms", "key_management_service", "AWS KMS"),
    icon("cloudtrail", "cloudtrail", "CloudTrail"),
    icon("guardrails", "bedrock", "Bedrock Guardrails\n(solo contenido/datos)"),
    box("gov_note", "Autorización =\nIdentity/IAM/Gateway/\nPolicy (NO Guardrails)", { w: 200, h: 60 }),
  ]
);

// ---------------------------------------------------------------------------
// Tools + Product — ONE compact row, icon+label only
// ---------------------------------------------------------------------------
const obsTools = grid("obs_tools", null, "OBSERVABILIDAD", { cols: 3, gap: 6 }, [
  icon("cw_metrics", "cloudwatch_metrics_insights", "CW\nMetrics"),
  icon("cw_logs", "cloudwatch_logs", "CW\nLogs"),
  icon("xray", "xray", "X-Ray"),
]);

const opsTools = grid("ops_tools", null, "OPERACIONES", { cols: 3, gap: 6 }, [
  icon("ssm", "systems_manager", "SSM\nAutomation"),
  icon("ops_lambda", "lambda", "Lambda"),
  icon("sfn", "step_functions", "Step\nFunctions"),
]);

const entTools = grid("ent_tools", null, "ITSM / ENTERPRISE", { cols: 3, gap: 6 }, [
  ossBox("servicenow", "ServiceNow"),
  ossBox("jira", "Jira"),
  ossBox("cmdb", "CMDB"),
]);

const engTools = grid("eng_tools", null, "INGENIERÍA / SDLC", { cols: 3, gap: 6 }, [
  ossBox("git", "GitHub/GitLab"),
  ossBox("cicd", "CI/CD"),
  ossBox("iac", "IaC"),
]);

const productPlane = grid(
  "prod_grid", null, "PLANO DEL PRODUCTO (ilustrativo)",
  { cols: 2, gap: 6 },
  [
    icon("ecs", "ecs", "ECS/\nFargate"),
    icon("eks", "eks", "EKS"),
    icon("prod_lambda", "lambda", "Lambda"),
    icon("rds", "rds", "RDS"),
  ]
);

const toolsBand = grid(
  "tools_band", null,
  "Herramientas empresariales — vía AgentCore Gateway · MCP · APIs · eventos — y plano del producto",
  { cols: 3, gap: 16 },
  [obsTools, opsTools, entTools, engTools, productPlane]
);

// ---------------------------------------------------------------------------
// Corner — compact risk catalog + actor/action legend
// ---------------------------------------------------------------------------
const riskLegend = box(
  "risk_legend",
  "RIESGO → AUTORIDAD IA\nR0 lectura → autónoma\nR1 reversible → autónoma si permitida\nR2 impacto controlado → propone, aprueba humano\nR3 crítico → solo humano",
  { w: 320, h: 110 }
);

const actorLegend = box(
  "actor_legend",
  "IA operada (T0) · IA asistida (T1-T3) · Humano responsable\nAcción autónoma (R0/R1) · con aprobación (R2) · solo humana (R3)",
  { w: 480, h: 60 }
);

const legendRow = phantom("legend_row", "", { dir: "row", gap: 24, align: "center" }, [riskLegend, actorLegend]);

// ---------------------------------------------------------------------------
// ROOT TREE — main column (journey / center / tools+product / legend) + a
// thin governance rail as a side column spanning the full height.
// ---------------------------------------------------------------------------
const mainCol = phantom("main_col", "", { dir: "col", gap: 20, align: "center" }, [
  journey,
  centerRow,
  toolsBand,
  legendRow,
]);

const tree = phantom("root", "", { dir: "row", gap: 22, align: "top", pad: 10 }, [
  mainCol,
  govRail,
]);

renderTree(d, tree, [30, 60]);
d.title("Soporte aumentado con IA — Arquitectura AWS (mapa técnico, 1 slide) — AWS LATAM · Preventa interna");

// ---------------------------------------------------------------------------
// EDGES — only meaningful dependencies
// ---------------------------------------------------------------------------
d.link("j_cust", "j_t0", "", { flow: true, role: "tree" });
d.link("j_t0", "j_t1", "", { flow: true, role: "tree" });
d.link("j_t1", "j_t2", "", { flow: true, role: "tree" });
d.link("j_t2", "j_t3", "", { flow: true, role: "tree" });

d.link("support", "bridge", "", { flow: true });
d.link("bridge", "agentic", "", { flow: true });

d.link("agentic", "gov_rail", "aplica a todo\ntool call", { dash: true });
d.link("agentic", "tools_band", "Gateway · MCP ·\nAPIs · eventos", { flow: true });

const res = d.validate();
console.log("VALIDATE:", JSON.stringify({ ok: res.ok, errors: res.errors, warnings: res.warnings, advice: res.audit.advice }));
writeFileSync(new URL("./ai-augmented-support-architecture-single-slide.drawio", import.meta.url), d.mxfile("Soporte aumentado con IA — Arquitectura (mapa técnico, 1 slide)"));

// Self-check tail: one run = build + validate + render + issues.
import { execFileSync as __exec } from "node:child_process";
try {
  const __f = new URL("./ai-augmented-support-architecture-single-slide.drawio", import.meta.url).pathname;
  console.log(__exec("drawio-ai", ["render", __f, "--check", "-o", __f + ".png"], { encoding: "utf8" }).trim());
} catch (e) { console.error("RENDER-SKIPPED:", String(e.message).split("\n")[0]); }
