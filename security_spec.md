# Security Specification: The CUPnCAKE Factory

## 1. Data Invariants

- **Enquiry Integrity**: Any enquiry created must have a valid non-empty `name`, `phone`, `requirement`, and `createdAt` timestamp. Payload string sizes must be bounded (`name` <= 100, `phone` <= 25, `requirement` <= 1000, `message` <= 2000).
- **Custom Cake Request Integrity**: Custom cake requests must specify `occasion`, `size`, `flavor`, and a valid creation timestamp. String sizes must be bounded.
- **Privacy & PII Protection**: Customer phone numbers and enquiries contain personal contact information. Public visitors cannot list or read other customers' enquiries. Reading enquiries is restricted to authenticated bakery administrators.
- **Immortal Timestamps**: Once created, `createdAt` and identity fields cannot be maliciously modified.
- **No Document ID Poisoning**: Document IDs must satisfy `isValidId(id)` (`id is string && id.size() <= 128 && id.matches('^[a-zA-Z0-9_-]+$')`).

## 2. The "Dirty Dozen" Payloads

1. **Payload 1 (Massive PII Poisoning)**: Document with 50KB name string to cause resource exhaustion -> REJECTED (`name.size() <= 100`).
2. **Payload 2 (Shadow Fields Injection)**: Injecting `{ isAdmin: true, bypassRules: true }` into Enquiry document -> REJECTED (`hasOnly()`).
3. **Payload 3 (Empty Name Create)**: Submitting enquiry with `name: ""` -> REJECTED (`name.size() >= 1`).
4. **Payload 4 (Missing Required Phone)**: Submitting enquiry without `phone` -> REJECTED (`hasAll(['name', 'phone', 'requirement', 'createdAt'])`).
5. **Payload 5 (Unauthenticated Bulk Reading)**: Unauthenticated visitor attempting to read `/enquiries` collection -> REJECTED (`allow list: if false / admin only`).
6. **Payload 6 (Other Customer Enquiry Snooping)**: Random user querying `/enquiries/{otherId}` -> REJECTED (`allow get: if isAdmin()`).
7. **Payload 7 (Invalid Enum Injection)**: Setting `status: 'super_admin_approved'` -> REJECTED (`status in ['pending', 'contacted', 'confirmed', 'completed']`).
8. **Payload 8 (Illegal Document Deletion)**: Anonymous visitor issuing delete on enquiry -> REJECTED (`allow delete: if isAdmin()`).
9. **Payload 9 (ID Traversal Attack)**: Using ID `../../sensitive` -> REJECTED (`id.matches('^[a-zA-Z0-9_-]+$')`).
10. **Payload 10 (Type Poisoning on Requirement)**: Sending `requirement: 12345` (integer instead of string) -> REJECTED (`data.requirement is string`).
11. **Payload 11 (Oversized Custom Theme)**: Sending 100KB string in `customTheme` -> REJECTED (`customTheme.size() <= 1000`).
12. **Payload 12 (Unauthorized Status Tampering)**: Public visitor altering `status` on existing record -> REJECTED (`allow update: if isAdmin()`).
