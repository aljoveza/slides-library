// AI-augmented support — AWS architecture (T0→T3) — AWS LATAM presales proposal.
// Composed archetype: pipeline (T0→T3 journey spine) + hubspoke (AgentCore as agentic hub for its
// 3 specialized agents) + cross-cutting bands (governance/security, enterprise tooling). Built with
// the layout engine ONLY (group/frame/grid/phantom/icon/box + renderTree) — no hand-written coords.
import { writeFileSync } from "node:fs";
import { Diagram } from "/Users/alvarovera/.local/lib/node_modules/drawio-ai-kit/src/builder.mjs";
import {
  group, frame, grid, icon, box, stage, band, endpoint, ossBox, phantom, renderTree,
} from "/Users/alvarovera/.local/lib/node_modules/drawio-ai-kit/src/layout-engine.mjs";

const d = new Diagram("pipeline");

// ---------------------------------------------------------------------------
// CUSTOMER ENTRY
// ---------------------------------------------------------------------------
const customer = endpoint(
  "cust",
  "CLIENTE\n\nVoice · Chat · Digital\n(entra por Amazon Connect)"
);

// ---------------------------------------------------------------------------
// 01 · CUSTOMER SUPPORT PLANE — Amazon Connect
// ---------------------------------------------------------------------------
const connectCaps = grid(
  "connect_caps", null, "Amazon Connect — plataforma",
  { cols: 2, gap: 10 },
  [
    icon("cases", "connect", "Connect Cases\n(system of record\ndel journey)"),
    icon("profiles", "connect", "Connect Customer\nProfiles"),
    icon("tasks", "connect", "Connect Tasks"),
    icon("workspace_cap", "connect", "Agent Workspace"),
  ]
);

const connectCore = phantom(
  "support_core", "", { dir: "row", gap: 24, align: "center" },
  [icon("connect_core", "connect", "Amazon Connect\n(interaction · routing)"), connectCaps]
);

const t0 = stage("t0", 0, "T0 · Autoservicio operado por IA (R0/R1)", [
  icon("t0_ai", "chatbot", "AI Agents in\nConnect"),
  box("t0_scope", "Autonomía alta en bajo riesgo:\nintención · KB · contexto cliente ·\nsalud producto · acción reversible\nsimple · valida resuelto → escala.\nSin acciones irreversibles."),
  box("t0_art", "ARTEFACTO — T0\nIntención + Identidad/cliente\n+ Conocimiento consultado", { stroke: "#ED7100" }),
]);

const t1 = stage("t1", 1, "T1 · Soporte compartido IA + Humano", [
  phantom("t1_actors", "", { dir: "row", gap: 14, align: "center" }, [
    icon("t1_human", "agent", "Agente humano\n(Agent Workspace)"),
    icon("t1_ai", "chatbot", "AI Agents in\nConnect (asiste)"),
  ]),
  box("t1_scope", "IA resume · investiga · correlaciona ·\nejecuta acciones autorizadas ·\ndocumenta el caso. El humano toma\ncontrol, aprueba o rechaza."),
  box("t1_art", "ARTEFACTO — T1\n+ Telemetría + Acciones\n+ Resultados", { stroke: "#ED7100" }),
]);

const t2 = stage("t2", 2, "T2 · Especialista humano asistido por agentes", [
  icon("t2_human", "agent", "Especialista\n(Agent Workspace)"),
  box("t2_scope", "Recibe el artefacto de investigación\ncompleto. El Investigation Agent\n(AgentCore) construye/refina\nhipótesis + evidencia estructurada."),
  box("t2_art", "ARTEFACTO — T2\n+ Correlaciones + Hipótesis\n+ Evidencia", { stroke: "#ED7100" }),
]);

const t0t1t2Row = phantom("t012_row", "", { dir: "row", gap: 30, align: "top" }, [t0, t1, t2]);

const support = frame(
  "support",
  "01 · CUSTOMER SUPPORT PLANE — Amazon Connect\nCustomer interaction and support lifecycle.",
  { dir: "col", gap: 26, fill: "light-dark(#F0F7FF,#122232)", stroke: "#0972D3" },
  [connectCore, t0t1t2Row]
);

// T3 lives OUTSIDE Amazon Connect — the engineer is not required to work inside it.
const t3 = stage("t3", 3, "T3 · Ingeniería / SME (fuera de Connect)", [
  endpoint("t3_human", "INGENIERO / SME\n\nGit · CI/CD · Jira/ServiceNow\n(no obligado a usar Connect)"),
  box("t3_scope", "Engineering Agent (AgentCore) prepara\npropuesta de rollback, plan de\nvalidación y borrador de cambios.\nNO despliega ni tiene autoridad final."),
  box("t3_art", "ARTEFACTO — T3\n+ Historial completo + Causa raíz\nprobable + Remediación + Plan", { stroke: "#ED7100" }),
]);

const journey = phantom("journey", "", { dir: "row", gap: 40, align: "top" }, [support, t3]);

const journeyCaption = box(
  "journey_caption",
  "El contexto, no solo el caso, avanza entre los niveles de soporte — el ingeniero recibe la investigación; no empieza desde cero.",
  { w: 900, h: 34, fill: "none", stroke: "none" }
);

// ---------------------------------------------------------------------------
// Bridge between planes (exact validated label)
// ---------------------------------------------------------------------------
const bridge = box("bridge", "APIs · Events · MCP", { w: 220 });

// ---------------------------------------------------------------------------
// 02 · AGENTIC OPERATIONS PLANE — Amazon Bedrock AgentCore
// ---------------------------------------------------------------------------
const agentCoreCaps = grid(
  "ac_caps", null, "AgentCore — capacidades",
  { cols: 4, gap: 14 },
  [
    icon("ac_runtime", "bedrock_agentcore", "AgentCore\nRuntime"),
    icon("ac_gateway", "bedrock_agentcore", "AgentCore\nGateway"),
    icon("ac_identity", "bedrock_agentcore", "AgentCore\nIdentity"),
    icon("ac_memory", "bedrock_agentcore", "AgentCore\nMemory"),
    icon("ac_policy", "bedrock_agentcore", "AgentCore\nPolicy"),
    icon("ac_observ", "bedrock_agentcore", "AgentCore\nObservability"),
    icon("ac_eval", "bedrock_agentcore", "AgentCore\nEvaluations"),
  ]
);
const memNote = box(
  "mem_note",
  "AgentCore Memory = memoria de trabajo del agente — separada de Amazon Connect Cases (system of record del caso, arriba). No se fusionan.",
  { w: 760, h: 34 }
);

const invFrame = frame("inv_frame", "Investigation Agent", { dir: "col", gap: 8, stroke: "#01A88D" }, [
  icon("inv_agent", "bedrock_agentcore", "Investigation\nAgent"),
  box("inv_scope", "Acceso ACOTADO (solo lectura):\nCloudWatch Metrics/Logs/Insights ·\nX-Ray · despliegues · Connect Cases ·\nCMDB/ITSM · incidentes · KB · APIs\nproducto. NO ejecuta cambios críticos."),
]);

const remFrame = frame("rem_frame", "Remediation Agent", { dir: "col", gap: 8, stroke: "#01A88D" }, [
  icon("rem_agent", "bedrock_agentcore", "Remediation\nAgent"),
  box("rem_scope", "Acceso ACOTADO: solo herramientas\noperativas autorizadas. Ejecuta\nrunbooks reversibles R0/R1.\nR2+ requiere aprobación humana."),
]);

const engFrame = frame("eng_frame", "Engineering Agent", { dir: "col", gap: 8, stroke: "#01A88D" }, [
  icon("eng_agent", "bedrock_agentcore", "Engineering\nAgent"),
  box("eng_scope", "Acceso ACOTADO: repos · CI/CD ·\ndespliegues · IaC. Propone rollback /\nplan de validación / cambios (borrador).\nNO despliega ni autoriza producción."),
]);

const agentsRow = phantom("agents_row", "", { dir: "row", gap: 26, align: "top" }, [invFrame, remFrame, engFrame]);

const chainRow = phantom("chain_row", "", { dir: "row", gap: 8, align: "center" }, [
  box("gv1", "Agente"),
  box("gv2", "Solicitud de\nherramienta"),
  box("gv3", "AgentCore\nGateway"),
  box("gv4", "Policy +\nIdentity"),
  box("gv5", "Catálogo de\ncapacidades"),
  box("gv6", "Clasificación\nde riesgo"),
  box("gv7", "Ejecutar /\nAprobar / Denegar"),
]);

const triadNote = box(
  "triad_note",
  "RAZONAMIENTO (el modelo decide qué acción considera apropiada)  ≠  AUTORIZACIÓN (las políticas deciden si puede ejecutarla)  ≠  APROBACIÓN (una persona decide en R2+)",
  { w: 900, h: 34 }
);

const govBand = frame("gov_chain", "Modelo de gobierno de herramientas (por cada tool call)", { dir: "col", gap: 10, stroke: "#5A6B7B" }, [chainRow, triadNote]);

const agentic = frame(
  "agentic",
  "02 · AGENTIC OPERATIONS PLANE — Amazon Bedrock AgentCore\nInvestigation, operational agents, tools and governance.",
  { dir: "col", gap: 26, fill: "light-dark(#F7F4FF,#1c1730)", stroke: "#8C4FFF" },
  [agentCoreCaps, memNote, agentsRow, govBand]
);

// ---------------------------------------------------------------------------
// Cross-cutting: Security, governance & audit
// ---------------------------------------------------------------------------
const secBand = band(
  "sec_band",
  "SECURITY · GOVERNANCE · AUDIT (transversal) — mínimo privilegio · trazabilidad de decisiones y tool-calls · AgentCore Identity/Policy autorizan acciones (arriba)",
  [
    icon("iam2", "identity_and_access_management", "IAM"),
    icon("kms", "key_management_service", "AWS KMS"),
    icon("cloudtrail", "cloudtrail", "AWS\nCloudTrail"),
    icon("guardrails", "bedrock", "Bedrock Guardrails\n(seguridad de contenido/\ndatos — NO autoriza\nacciones operativas)"),
  ]
);

// ---------------------------------------------------------------------------
// Enterprise tooling layer (4 categories) — validated labels
// ---------------------------------------------------------------------------
const obsTools = grid("obs_tools", null, "OBSERVABILITY\n(CloudWatch · logs · traces)", { cols: 2, gap: 10 }, [
  icon("cw_metrics", "cloudwatch_metrics_insights", "CloudWatch\nMetrics"),
  icon("cw_logs", "cloudwatch_logs", "CloudWatch Logs /\nLogs Insights"),
  icon("xray", "xray", "AWS X-Ray /\nApp Signals"),
  icon("prod_health", "cloudwatch_2", "Señales de salud\ndel producto"),
]);

const opsTools = grid("ops_tools", null, "OPERATIONS\n(SSM · Lambda · Step Functions)", { cols: 2, gap: 10 }, [
  icon("ssm", "systems_manager", "SSM Automation\n(runbooks)"),
  icon("ops_lambda", "lambda", "Lambda\n(operativo)"),
  icon("sfn", "step_functions", "Step Functions\n(orquestación\nde aprobación)"),
]);

const entTools = grid("ent_tools", null, "ENTERPRISE\n(ITSM · CMDB · APIs)", { cols: 2, gap: 10 }, [
  ossBox("servicenow", "ServiceNow\n(ITSM)"),
  ossBox("jira", "Jira"),
  ossBox("cmdb", "CMDB"),
  ossBox("inc_hist", "Incidentes\nprevios"),
]);

const engTools = grid("eng_tools", null, "ENGINEERING\n(Git · CI/CD · deployments)", { cols: 2, gap: 10 }, [
  ossBox("git", "GitHub / GitLab\n(repo)"),
  ossBox("cicd", "CI/CD pipeline"),
  ossBox("deploy_hist", "Historial de\ndespliegues"),
  ossBox("iac", "IaC"),
]);

const toolsBand = band(
  "tools_band",
  "Herramientas empresariales — acceso vía AgentCore Gateway · MCP · APIs · eventos autenticados",
  [obsTools, opsTools, entTools, engTools]
);

// ---------------------------------------------------------------------------
// Product plane — customer workloads (illustrative)
// ---------------------------------------------------------------------------
const productPlane = grid(
  "prod_grid", null, "PLANO DEL PRODUCTO — workloads del cliente (ilustrativo)",
  { cols: 4, gap: 14 },
  [
    icon("apigw", "api_gateway", "API Gateway"),
    icon("alb", "application_load_balancer", "ALB"),
    icon("ecs", "ecs", "ECS"),
    icon("fargate", "fargate", "Fargate"),
    icon("eks", "eks", "EKS"),
    icon("prod_lambda", "lambda", "Lambda"),
    icon("rds", "rds", "RDS"),
    icon("ddb", "dynamodb", "DynamoDB"),
  ]
);

// ---------------------------------------------------------------------------
// Risk catalog + legend (compact tables)
// ---------------------------------------------------------------------------
const riskGrid = grid("risk_grid", null, "Catálogo de remediación por nivel de riesgo", { cols: 2, gap: 6 }, [
  box("r0a", "R0 · Solo lectura\n(logs, métricas, salud, casos, KB)"),
  box("r0b", "IA: autónoma"),
  box("r1a", "R1 · Acción segura reversible\n(retry, restart, relanzar tarea)"),
  box("r1b", "IA: autónoma si está\nexpresamente permitida"),
  box("r2a", "R2 · Impacto controlado\n(escalar, limpiar caché compartida)"),
  box("r2b", "IA: propone,\nrequiere aprobación humana"),
  box("r3a", "R3 · Crítico\n(despliegue, cambios de BD/red)"),
  box("r3b", "IA: NO ejecuta —\nsolo humano"),
]);

const legend = box(
  "legend",
  "LEYENDA\nIA operada = autonomía en T0\nIA asistida = copiloto en T1/T2/T3\nHumano responsable = aprueba o decide\nAcción autónoma = R0/R1\nAcción con aprobación = R2\nAcción exclusivamente humana = R3",
  { w: 260, h: 150 }
);

const footerRow = phantom("footer_row", "", { dir: "row", gap: 40, align: "top" }, [riskGrid, legend]);

// ---------------------------------------------------------------------------
// ROOT TREE
// ---------------------------------------------------------------------------
const tree = phantom("root", "", { dir: "col", gap: 40, align: "center", pad: 10 }, [
  customer,
  journey,
  journeyCaption,
  bridge,
  agentic,
  secBand,
  toolsBand,
  productPlane,
  footerRow,
]);

renderTree(d, tree, [40, 80]);
d.title("Soporte aumentado con IA — Arquitectura AWS T0→T3 (AWS LATAM · Preventa interna)");

// ---------------------------------------------------------------------------
// EDGES — only meaningful dependencies, no all-to-all mesh
// ---------------------------------------------------------------------------
d.link("cust", "support", "Voice · Chat · Digital", { flow: true });

// research artifact grows across the journey (also reads as the escalation spine)
d.link("t0_art", "t1_art", "+ telemetría\n+ acciones", { flow: true });
d.link("t1_art", "t2_art", "+ correlaciones\n+ hipótesis", { flow: true });
d.link("t2_art", "t3_art", "+ causa raíz\n+ remediación", { flow: true });

// cross-plane, targeted (not all-to-all) — Cases vs Memory separation is conveyed via
// their labels ("system of record" vs "working memory — separate from Cases"), no edge
// needed between them (avoids a long, crossing-heavy diagonal for a non-functional link).
d.link("t2", "inv_frame", "recibe artefacto\nde investigación", { dash: true });
d.link("t3", "eng_frame", "consume contexto\n+ repos", { dash: true });

// plane bridge
d.link("support", "bridge", "", { flow: true });
d.link("bridge", "agentic", "", { flow: true });

// governance chain (sequential, near the Gateway)
d.link("gv1", "gv2", "", { role: "tree" });
d.link("gv2", "gv3", "", { role: "tree" });
d.link("gv3", "gv4", "", { role: "tree" });
d.link("gv4", "gv5", "", { role: "tree" });
d.link("gv5", "gv6", "", { role: "tree" });
d.link("gv6", "gv7", "", { role: "tree" });

// agentic plane -> cross-cutting security (short, adjacent)
d.link("agentic", "sec_band", "aplica a todo\ntool call", { dash: true });

// each agent reaches ONLY its own scoped tool categories (bounded access, not unrestricted).
// Investigation Agent's ITSM/CMDB read access is already stated in its caption (inv_scope) —
// omitted as an edge here to avoid a long diagonal crossing the Operations column.
d.link("inv_frame", "obs_tools", "solo lectura");
d.link("rem_frame", "ops_tools", "runbooks\nautorizados");
d.link("eng_frame", "eng_tools", "repos · CI/CD ·\ndespliegues");

// tools <-> product
d.link("ops_tools", "prod_grid", "runbooks seguros /\nretry-restart", { flow: true });
d.link("prod_grid", "obs_tools", "métricas · logs ·\ntrazas", { dash: true });

const res = d.validate();
console.log("VALIDATE:", JSON.stringify({ ok: res.ok, errors: res.errors, warnings: res.warnings, advice: res.audit.advice }));
writeFileSync(new URL("./ai-augmented-support-architecture.drawio", import.meta.url), d.mxfile("Soporte aumentado con IA — Arquitectura AWS T0→T3"));

// Self-check tail (added by `drawio-ai scaffold`): one run = build + validate + render + issues.
import { execFileSync as __exec } from "node:child_process";
try {
  const __f = new URL("./ai-augmented-support-architecture.drawio", import.meta.url).pathname;
  console.log(__exec("drawio-ai", ["render", __f, "--check", "-o", __f + ".png"], { encoding: "utf8" }).trim());
} catch (e) { console.error("RENDER-SKIPPED:", String(e.message).split("\n")[0]); }
