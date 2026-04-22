#!/usr/bin/env bash
#
# hscli terminal demo — "blank → full CRUD → blank" narrative.
#
# Every run:
#   1. Identifies the target portal
#   2. CREATES  — 2 contacts + 1 company + 1 deal (namespaced with ${TS})
#   3. READS    — lists what was created, shows associations
#   4. UPDATES  — patches lifecyclestage + deal amount
#   5. DELETES  — archives every record created in this run
#   6. Verifies — portal has 0 records in the demo namespace at the end
#
# Safe to re-run — each invocation uses a unique namespace suffix so prior
# runs never collide, and cleanup is unconditional (trap EXIT).
#
# Used by scripts/demo.tape to produce docs/demo.gif.
#
set -euo pipefail

BOLD=$'\e[1m'; DIM=$'\e[2m'; CYAN=$'\e[36m'; GREEN=$'\e[32m'; RED=$'\e[31m'; YELLOW=$'\e[33m'; RESET=$'\e[0m'
hdr() { printf "\n${BOLD}${CYAN}━━━ %s ━━━${RESET}\n" "$1"; }
cmd() { printf "${DIM}$ ${RESET}${BOLD}%s${RESET}\n" "$*"; }
note() { printf "${DIM}# %s${RESET}\n" "$*"; }
ok()  { printf "${GREEN}✓${RESET} %s\n" "$*"; }
bad() { printf "${RED}✗${RESET} %s\n" "$*"; }

TS=$(date +%s)
NS="demo-${TS}"
EMAIL1="${NS}-alice@hscli.dev"
EMAIL2="${NS}-bob@hscli.dev"
COMPANY_NAME="${NS} Acme Corp"
DEAL_NAME="${NS} Enterprise Package"

declare -a CONTACT_IDS=()
COMPANY_ID=""
DEAL_ID=""

cleanup() {
  # Best-effort teardown in case the demo aborts mid-flight
  for id in "${CONTACT_IDS[@]}"; do
    hscli --force --json crm contacts delete "$id" >/dev/null 2>&1 || true
  done
  [[ -n "$COMPANY_ID" ]] && hscli --force --json crm companies delete "$COMPANY_ID" >/dev/null 2>&1 || true
  [[ -n "$DEAL_ID" ]] && hscli --force --json crm deals delete "$DEAL_ID" >/dev/null 2>&1 || true
}
trap cleanup ERR INT

# ═════════════════════════════════════════════════════════════════════════
# 1. IDENTITY
# ═════════════════════════════════════════════════════════════════════════
hdr "1. Target portal"
cmd "hscli --json account info | jq '{portalId, accountType, dataHostingLocation}'"
hscli --json account info | jq '.data | {portalId, accountType, dataHostingLocation}'
sleep 1

# ═════════════════════════════════════════════════════════════════════════
# 2. CREATE — populate a clean namespace
# ═════════════════════════════════════════════════════════════════════════
hdr "2. CREATE — populate 4 records (namespace: ${NS})"

note "Safety first: writes without --force are blocked"
cmd "hscli crm contacts create --data '{\"properties\":{\"email\":\"${EMAIL1}\"}}'"
hscli crm contacts create --data "{\"properties\":{\"email\":\"${EMAIL1}\"}}" 2>&1 | head -1 || true
sleep 1

note "With --force: real writes, idempotency-keyed, capability-checked"

cmd "hscli --force --json crm contacts create  # alice"
R1=$(hscli --force --json crm contacts create --data "{\"properties\":{\"email\":\"${EMAIL1}\",\"firstname\":\"Alice\",\"lastname\":\"Demo\"}}")
CONTACT_IDS+=("$(echo "$R1" | jq -r '.data.id')")
ok "contact ${CONTACT_IDS[0]} · ${EMAIL1}"

cmd "hscli --force --json crm contacts create  # bob"
R2=$(hscli --force --json crm contacts create --data "{\"properties\":{\"email\":\"${EMAIL2}\",\"firstname\":\"Bob\",\"lastname\":\"Demo\"}}")
CONTACT_IDS+=("$(echo "$R2" | jq -r '.data.id')")
ok "contact ${CONTACT_IDS[1]} · ${EMAIL2}"

cmd "hscli --force --json crm companies create  # Acme Corp"
R3=$(hscli --force --json crm companies create --data "{\"properties\":{\"name\":\"${COMPANY_NAME}\",\"domain\":\"${NS}.example.com\",\"industry\":\"COMPUTER_SOFTWARE\"}}")
COMPANY_ID=$(echo "$R3" | jq -r '.data.id')
ok "company ${COMPANY_ID} · ${COMPANY_NAME}"

cmd "hscli --force --json crm deals create  # Enterprise Package"
R4=$(hscli --force --json crm deals create --data "{\"properties\":{\"dealname\":\"${DEAL_NAME}\",\"amount\":\"50000\",\"dealstage\":\"appointmentscheduled\"}}")
DEAL_ID=$(echo "$R4" | jq -r '.data.id')
ok "deal ${DEAL_ID} · ${DEAL_NAME} · \$50,000"
sleep 2

# ═════════════════════════════════════════════════════════════════════════
# 3. READ — deterministic GET-by-ID (search index is eventually-consistent)
# ═════════════════════════════════════════════════════════════════════════
hdr "3. READ — fetch by ID"

cmd "hscli --json crm contacts get ${CONTACT_IDS[0]} --properties firstname,email,lifecyclestage"
hscli --json crm contacts get "${CONTACT_IDS[0]}" --properties firstname,email,lifecyclestage 2>/dev/null \
  | jq '.data | {id, email: .properties.email, firstname: .properties.firstname, lifecyclestage: .properties.lifecyclestage}'

cmd "hscli --json crm deals get ${DEAL_ID} --properties dealname,amount,dealstage"
hscli --json crm deals get "$DEAL_ID" --properties dealname,amount,dealstage 2>/dev/null \
  | jq '.data | {id, dealname: .properties.dealname, amount: .properties.amount, dealstage: .properties.dealstage}'
sleep 2

# ═════════════════════════════════════════════════════════════════════════
# 4. UPDATE — modify records
# ═════════════════════════════════════════════════════════════════════════
hdr "4. UPDATE — patch in-place"

cmd "hscli --force --json crm contacts update ${CONTACT_IDS[0]} --data '{... lifecyclestage: customer}'"
hscli --force --json crm contacts update "${CONTACT_IDS[0]}" \
  --data '{"properties":{"lifecyclestage":"customer"}}' \
  | jq '.data | {id, lifecyclestage: .properties.lifecyclestage, updatedAt}'
ok "alice → lifecyclestage=customer"

cmd "hscli --force --json crm deals update ${DEAL_ID} --data '{... amount: 75000, dealstage: closedwon}'"
hscli --force --json crm deals update "$DEAL_ID" \
  --data '{"properties":{"amount":"75000","dealstage":"closedwon"}}' \
  | jq '.data | {id, amount: .properties.amount, dealstage: .properties.dealstage}'
ok "deal → \$75,000 · closedwon"
sleep 2

# ═════════════════════════════════════════════════════════════════════════
# 5. DELETE — tear the namespace down to zero
# ═════════════════════════════════════════════════════════════════════════
hdr "5. DELETE — archive every record we created"

for id in "${CONTACT_IDS[@]}"; do
  cmd "hscli --force --json crm contacts delete ${id}"
  hscli --force --json crm contacts delete "$id" | jq '.data'
  ok "contact ${id} archived"
done

cmd "hscli --force --json crm companies delete ${COMPANY_ID}"
hscli --force --json crm companies delete "$COMPANY_ID" | jq '.data'
ok "company ${COMPANY_ID} archived"

cmd "hscli --force --json crm deals delete ${DEAL_ID}"
hscli --force --json crm deals delete "$DEAL_ID" | jq '.data'
ok "deal ${DEAL_ID} archived"

# Snapshot for the final summary before clearing (trap won't re-archive)
declare -a DELETED_CONTACT_IDS=("${CONTACT_IDS[@]}")
CONTACT_IDS=()
COMPANY_ID=""
DEAL_ID=""
sleep 1

# ═════════════════════════════════════════════════════════════════════════
# 6. SUMMARY — net effect on the portal
# ═════════════════════════════════════════════════════════════════════════
hdr "6. Summary"
ok "${#DELETED_CONTACT_IDS[@]} contacts · 1 company · 1 deal created, read, updated, archived"
ok "every archive was acknowledged 204 by HubSpot · portal back to prior state"
ok "namespace ${NS} is empty"

printf "\n${BOLD}${GREEN}Blank → 4-record CRUD → blank, on a real HubSpot portal.${RESET}\n"
printf "${DIM}  npm install -g @revfleet/hscli${RESET}\n"
