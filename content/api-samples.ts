/**
 * Request and response samples for the developer docs and API pages.
 *
 * Every field, header and status shown here was checked against the backend
 * source. Identifiers are obvious placeholders, not real data.
 */

export const sampleIdempotencyKey = "6f1c2a9e-0b7d-4c55-9a1e-3d2f8b7a1c40";

export const apiBaseUrl = "https://api.pesaguard.victorkipruto.com";

export const transactionBody = "{\n  \"provider_transaction_id\": \"SAB1C2D3E4\",\n  \"provider_account_id\": \"174379\",\n  \"TransAmount\": 2845.00,\n  \"Currency\": \"KES\",\n  \"BillRefNumber\": \"INV-20418\",\n  \"MSISDN\": \"254712345678\",\n  \"TransTime\": \"20260919101500\"\n}";

export const transactionRequest = "curl -X POST \"$PESAGUARD_API_URL/api/v1/transactions\" \\\n  -H \"X-API-Key: $PESAGUARD_API_KEY\" \\\n  -H \"Idempotency-Key: 6f1c2a9e-0b7d-4c55-9a1e-3d2f8b7a1c40\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"provider_transaction_id\": \"SAB1C2D3E4\",\n    \"provider_account_id\": \"174379\",\n    \"TransAmount\": 2845.00,\n    \"Currency\": \"KES\",\n    \"BillRefNumber\": \"INV-20418\"\n  }'";

export const transactionResponse = "HTTP/1.1 200 OK\nContent-Type: application/json\nX-Correlation-ID: 0c5e0a3e-4f0b-4b63-93f2-6a1d7e3a9b11\n\n{\"status\": \"accepted\", \"duplicate\": false, \"idempotency_key\": \"6f1c2a9e-0b7d-4c55-9a1e-3d2f8b7a1c40\"}";

export const duplicateResponse = "{\"status\": \"accepted\", \"duplicate\": true, \"idempotency_key\": \"6f1c2a9e-0b7d-4c55-9a1e-3d2f8b7a1c40\"}";

export const apiKeyHeader = "X-API-Key: $PESAGUARD_API_KEY";

export const bearerHeader = "Authorization: Bearer $PESAGUARD_ACCESS_TOKEN";

export const pythonSend = "import os\nimport uuid\n\nimport requests\n\nBASE_URL = os.environ[\"PESAGUARD_API_URL\"]\n\n\ndef send_transaction(transaction: dict, idempotency_key: str) -> dict:\n    response = requests.post(\n        f\"{BASE_URL}/api/v1/transactions\",\n        headers={\n            \"X-API-Key\": os.environ[\"PESAGUARD_API_KEY\"],\n            \"Idempotency-Key\": idempotency_key,\n        },\n        json=transaction,\n        timeout=10,\n    )\n    response.raise_for_status()\n    return response.json()\n\n\nresult = send_transaction(\n    {\n        \"provider_transaction_id\": \"SAB1C2D3E4\",\n        \"provider_account_id\": \"174379\",\n        \"TransAmount\": 2845.00,\n        \"Currency\": \"KES\",\n    },\n    idempotency_key=str(uuid.uuid4()),\n)\nprint(result[\"duplicate\"])";

export const nodeSend = "const baseUrl = process.env.PESAGUARD_API_URL;\n\nasync function sendTransaction(transaction, idempotencyKey) {\n  const response = await fetch(`${baseUrl}/api/v1/transactions`, {\n    method: \"POST\",\n    headers: {\n      \"X-API-Key\": process.env.PESAGUARD_API_KEY,\n      \"Idempotency-Key\": idempotencyKey,\n      \"Content-Type\": \"application/json\",\n    },\n    body: JSON.stringify(transaction),\n    signal: AbortSignal.timeout(10_000),\n  });\n  if (!response.ok) throw new Error(`PesaGuard returned ${response.status}`);\n  return response.json();\n}\n\nconst result = await sendTransaction(\n  {\n    provider_transaction_id: \"SAB1C2D3E4\",\n    provider_account_id: \"174379\",\n    TransAmount: 2845.0,\n    Currency: \"KES\",\n  },\n  crypto.randomUUID(),\n);\nconsole.log(result.duplicate);";

export const retryPython = "import time\n\nimport requests\n\n\ndef send_with_retry(transaction: dict, idempotency_key: str, attempts: int = 5) -> dict:\n    \"\"\"Retry network errors and 5xx responses with the SAME Idempotency-Key.\"\"\"\n    for attempt in range(attempts):\n        try:\n            return send_transaction(transaction, idempotency_key)\n        except (requests.ConnectionError, requests.Timeout):\n            pass\n        except requests.HTTPError as error:\n            status = error.response.status_code\n            if status < 500 and status != 429:\n                raise  # 4xx will not succeed on retry\n        time.sleep(min(2 ** attempt, 30))\n    raise RuntimeError(\"PesaGuard did not accept the transaction\")";

export const discrepancyListRequest = "curl \"$PESAGUARD_API_URL/discrepancies?severity=critical&resolved=open&per_page=25\" \\\n  -H \"Authorization: Bearer $PESAGUARD_ACCESS_TOKEN\"";

export const discrepancyListResponse = "{\n  \"page\": 1,\n  \"per_page\": 25,\n  \"total\": 1,\n  \"items\": [\n    {\n      \"id\": \"dsc_7c1d9a\",\n      \"trans_id\": \"SAB1C2D3E4\",\n      \"anomaly_type\": \"amount_mismatch\",\n      \"status\": \"needs_review\",\n      \"severity\": \"critical\",\n      \"resolved\": false,\n      \"tenant_id\": \"acme-ke\",\n      \"details\": {},\n      \"assignee\": null,\n      \"notes\": null,\n      \"timeline\": [],\n      \"detected_at\": \"2026-09-19T10:15:42+00:00\",\n      \"sla_status\": \"warning\",\n      \"sla_remaining_minutes\": 18\n    }\n  ]\n}";

export const discrepancyResolveRequest = "curl -X POST \"$PESAGUARD_API_URL/discrepancies/dsc_7c1d9a/resolve\" \\\n  -H \"Authorization: Bearer $PESAGUARD_ACCESS_TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"note\": \"Customer topped up the short amount; confirmed on the till.\"}'";

export const discrepancyBulkRequest = "curl -X POST \"$PESAGUARD_API_URL/discrepancies/bulk-resolve\" \\\n  -H \"Authorization: Bearer $PESAGUARD_ACCESS_TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"ids\": [\"dsc_7c1d9a\", \"dsc_7c1d9b\"], \"note\": \"Cleared in end-of-day review.\"}'";

export const discrepancyBulkResponse = "{\"status\": \"resolved\", \"updated\": 1, \"skipped_ids\": [\"dsc_7c1d9b\"]}";

export const errorAuth = "{\"error\": \"invalid_api_key\", \"message\": \"API key is invalid, expired, or revoked.\"}";

export const errorIngest = "{\"error\": \"Idempotency-Key header is required\"}";

export const errorDaraja = "{\"ResultCode\": 1, \"ResultDesc\": \"Temporary processing error, please retry\"}";

export const rateLimited = "HTTP/1.1 429 Too Many Requests\nRetry-After: 12\nX-RateLimit-Limit: 5\nX-RateLimit-Remaining: 0\nX-RateLimit-Reset: 12\n\n{\"error\": \"rate_limit_exceeded\"}";

export const darajaAccepted = "{\"ResultCode\": 0, \"ResultDesc\": \"Accepted\"}";

export const webhookRegisterRequest = "curl -X POST \"$PESAGUARD_API_URL/webhooks\" \\\n  -H \"Authorization: Bearer $PESAGUARD_ACCESS_TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"tenant_id\": \"acme-ke\",\n    \"url\": \"https://hooks.example.co.ke/pesaguard\",\n    \"event_types\": [\"escalation\"],\n    \"retry_attempts\": 3,\n    \"timeout_seconds\": 10\n  }'";

export const webhookRegisterResponse = "{\n  \"id\": \"webhook_3f9a1c07d2b4\",\n  \"tenant_id\": \"acme-ke\",\n  \"url\": \"https://hooks.example.co.ke/pesaguard\",\n  \"event_types\": [\"escalation\"],\n  \"active\": true,\n  \"signing_secret\": \"whsec_9d1f...\"\n}";

export const webhookDeliveryHeaders = "POST /pesaguard HTTP/1.1\nContent-Type: application/json\nUser-Agent: PesaGuard-Webhook-Dispatcher/2.0\nX-Webhook-Event: escalation\nX-Webhook-Timestamp: 1789812942\nX-Webhook-Signature: t=1789812942,v1=5b0c...e91a";

export const webhookVerify = "import hashlib\nimport hmac\nimport json\nimport time\n\n\ndef verify_webhook(body: bytes, signature_header: str, secret: str, tolerance: int = 300) -> bool:\n    parts = dict(item.split(\"=\", 1) for item in signature_header.split(\",\"))\n    timestamp, received = parts[\"t\"], parts[\"v1\"]\n\n    # PesaGuard signs a canonical form of the JSON: sorted keys, no whitespace.\n    canonical = json.dumps(json.loads(body), sort_keys=True, separators=(\",\", \":\"))\n    expected = hmac.new(\n        secret.encode(), f\"{timestamp}.{canonical}\".encode(), hashlib.sha256\n    ).hexdigest()\n\n    fresh = abs(time.time() - int(timestamp)) <= tolerance\n    return fresh and hmac.compare_digest(expected, received)";

export const webhookListResponse = "{\n  \"tenant_id\": \"acme-ke\",\n  \"webhooks\": [\n    {\n      \"id\": \"webhook_3f9a1c07d2b4\",\n      \"url\": \"https://hooks.example.co.ke/pesaguard\",\n      \"event_types\": [\"escalation\"],\n      \"active\": true,\n      \"created_at\": \"2026-09-19T08:02:11+00:00\"\n    }\n  ]\n}";

export const publicReconciliationsRequest = "curl \"$PESAGUARD_API_URL/public/customers/acme-ke/reconciliations?limit=50&offset=0\" \\\n  -H \"Authorization: Bearer $PESAGUARD_ACCESS_TOKEN\"";

export const escalationPayload = "{\n  \"anomaly_type\": \"amount_mismatch\",\n  \"assigned_to\": \"amina.w\",\n  \"event_type\": \"escalation\",\n  \"incident_id\": \"dsc_7c1d9a\",\n  \"rule_applied\": \"Critical mismatch over 30 minutes\",\n  \"severity\": \"critical\",\n  \"timestamp\": \"2026-09-19T10:48:12.402118+00:00\",\n  \"trans_id\": \"SAB1C2D3E4\"\n}";

export const escalationHeaders = "POST /pesaguard HTTP/1.1\nContent-Type: application/json\nUser-Agent: PesaGuard-EscalationEngine/2.0\nX-PesaGuard-Signature: sha256=3a7c...e5f0";

export const escalationVerify = "import hashlib\nimport hmac\nimport json\n\n\ndef verify_escalation(body: bytes, signature_header: str, secret: str) -> bool:\n    # Signed text: the payload with keys sorted and Python's default separators\n    # (\", \" between items, \": \" between key and value).\n    canonical = json.dumps(json.loads(body), sort_keys=True)\n    expected = \"sha256=\" + hmac.new(secret.encode(), canonical.encode(), hashlib.sha256).hexdigest()\n    return hmac.compare_digest(expected, signature_header)";

export const escalationRuleRequest = "curl -X POST \"$PESAGUARD_API_URL/escalation-rules\" \\\n  -H \"Authorization: Bearer $PESAGUARD_ACCESS_TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"tenant_id\": \"acme-ke\",\n    \"name\": \"Critical mismatch over 30 minutes\",\n    \"condition_field\": \"severity\",\n    \"condition_operator\": \"equals\",\n    \"condition_value\": \"critical\",\n    \"action\": \"webhook\",\n    \"webhook_url\": \"https://hooks.example.co.ke/pesaguard\",\n    \"priority\": 10\n  }'";
