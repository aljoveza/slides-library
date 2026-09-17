// AI-augmented ITSM operations — deterministic self-healing path.
// Geometry is deliberately delegated to the drawio-ai-kit layout engine.
import { writeFileSync } from "node:fs";
import { Diagram } from "/Users/alvarovera/.local/lib/node_modules/drawio-ai-kit/src/builder.mjs";
import { frame, icon, box, phantom, renderTree } from "/Users/alvarovera/.local/lib/node_modules/drawio-ai-kit/src/layout-engine.mjs";

const d = new Diagram("sequence");
const tree = phantom("root", "", { dir: "row", gap: 62, align: "center", header: 0, pad: 10 }, [
  frame("detect", "01 · DETECCIÓN", { dir: "col", gap: 18, fill: "#FFFFFF", stroke: "#5A6B7B" }, [
    icon("cw", "cloudwatch_2", "CloudWatch\nalarma o señal"),
    box("condition", "Condición conocida\ny umbral aprobado", { fill: "#FFF2CC", stroke: "#D6B656", bold: true }),
  ]),
  frame("trigger", "02 · DISPARO", { dir: "col", gap: 18, fill: "#FFFFFF", stroke: "#5A6B7B" }, [
    icon("eb", "eventbridge", "Amazon EventBridge\nregla de evento"),
    box("approval", "Trigger y permisos\npre-aprobados", { fill: "#FFF2CC", stroke: "#D6B656", bold: true }),
  ]),
  frame("recover", "03 · RECUPERACIÓN", { dir: "row", gap: 26, fill: "#FFFFFF", stroke: "#5A6B7B" }, [
    icon("ssm", "systems_manager", "SSM Automation\nrunbook"),
    icon("lambda", "lambda", "Lambda\nacción acotada"),
    icon("sfn", "step_functions", "Step Functions\nflujo / rollback"),
  ]),
  frame("record", "04 · VALIDACIÓN Y REGISTRO", { dir: "col", gap: 18, fill: "#FFFFFF", stroke: "#5A6B7B" }, [
    box("validate", "Validar salud\no revertir", { fill: "#DAE8FC", stroke: "#6C8EBF", bold: true }),
    box("itsm", "Actualizar caso ITSM\ny evidencia", { fill: "#E1D5E7", stroke: "#9673A6", bold: true }),
  ]),
]);

renderTree(d, tree, [40, 84]);
d.title("Self-healing determinístico — detección, runbook, validación y registro ITSM");
d.link("cw", "condition", "señal", { step: 1 });
d.link("condition", "eb", "evento", { step: 2 });
d.link("eb", "approval", "regla", { step: 3 });
d.link("approval", "ssm", "iniciar", { step: 4 });
d.link("ssm", "lambda", "ejecutar", { step: 5 });
d.link("lambda", "sfn", "validar", { step: 6 });
d.link("sfn", "validate", "resultado", { step: 7 });
d.link("validate", "itsm", "registrar", { step: 8 });

const res = d.validate();
console.log("VALIDATE:", JSON.stringify({ ok: res.ok, errors: res.errors, warnings: res.warnings, advice: res.audit.advice }));
writeFileSync(new URL("./it-sm-self-healing.drawio", import.meta.url), d.mxfile("ITSM self-healing"));
