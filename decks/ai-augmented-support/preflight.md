# Pre-presentation confirmation list

## Claims and terminology

- Confirm the preferred product naming for Amazon Connect in the target account and region.
- Confirm the AgentCore capabilities and regions available to the client at presentation time.
- Confirm whether “AI Agents in Connect” is the agreed client-facing term.
- Confirm that all KPI definitions match the client's reporting model.
- Confirm that Zero-Touch Resolution excludes abandoned or incorrectly closed cases.

## Architecture assumptions

- Identify the system of record for cases and whether Amazon Connect Cases, an external ITSM, or both will participate.
- Confirm access paths for logs, metrics, traces, deployment history, CMDB, runbooks, and previous cases.
- Confirm whether MCP is permitted or whether integrations must use APIs and events only.
- Confirm the identity model for human users, agents, tools, and cross-account access.
- Validate data residency, retention, audit, and redaction requirements.

## Governance promises

- Agree on the risk classification for each proposed capability.
- Name the owner of policy decisions and human approval workflows.
- Confirm which remediations may run autonomously in the MVP.
- Confirm that production configuration, code, and database changes remain outside autonomous execution unless explicitly approved.
- Define rollback, kill switch, audit trail, and incident response expectations.

## Engagement dependencies

- Confirm an executive sponsor and an architecture owner.
- Select one incident journey for the MVP.
- Confirm access to representative, sanitized case and telemetry data.
- Agree on baseline measurements before setting targets.
- Confirm permissions to demonstrate Amazon Connect and Amazon Bedrock AgentCore in the selected AWS environment.
- Avoid committing delivery dates until access, security review, and the remediation boundary are confirmed.
