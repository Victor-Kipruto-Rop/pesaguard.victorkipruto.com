/**
 * Request and response samples shown on the developer docs and API pages.
 *
 * Every value here mirrors what the backend accepts today (POST /api/v1/transactions
 * with an API key). Identifiers are obvious placeholders, not real data.
 */

export const sampleIdempotencyKey = "6f1c2a9e-0b7d-4c55-9a1e-3d2f8b7a1c40";

export const transactionRequest = `curl -X POST "$PESAGUARD_API_URL/api/v1/transactions" \\
  -H "X-API-Key: $PESAGUARD_API_KEY" \\
  -H "Idempotency-Key: ${sampleIdempotencyKey}" \\
  -H "Content-Type: application/json" \\
  -d '{"provider_transaction_id": "SAB1C2D3E4", "provider_account_id": "174379"}'`;

export const transactionResponse = `HTTP/1.1 200 OK
Content-Type: application/json

{"status": "accepted", "duplicate": false, "idempotency_key": "${sampleIdempotencyKey}"}`;

export const duplicateResponse = `{"status": "accepted", "duplicate": true, "idempotency_key": "${sampleIdempotencyKey}"}`;

export const apiKeyHeader = "X-API-Key: $PESAGUARD_API_KEY";

export const bearerHeader = "Authorization: Bearer $PESAGUARD_ACCESS_TOKEN";
