## Server‑Driven UI (Forms & Screens)

An Express (Node.js) TypeScript backend for server‑driven UI forms. It stores versioned form definitions in MongoDB and exposes endpoints to fetch forms for mobile clients. Validation is handled via DTOs.

### Tech stack
- **Runtime**: Node.js, Express 5
- **Language**: TypeScript
- **DB**: MongoDB, Mongoose
- **Env management**: dotenv
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest

### Project structure
```
src/
  api/
    form.routes.ts           # HTTP routes (/forms/:key)
    ui.routes.ts             # HTTP routes (/ui/:key)
  services/
    form.service.ts          # Business logic (fetch latest form)
    ui.service.ts            # Business logic (fetch latest UI screen)
  repository/
    form.repository.ts       # Mongo-backed repository for forms
    ui.repository.ts         # Mongo-backed repository for UI screens
  model/
    form.model.ts            # Domain models (types for forms)
    ui.model.ts              # Domain models (types for UI screens)
  dto/
    from.dto.ts              # Request DTOs (GetFormDto)
    ui.dto.ts                # Request DTOs (GetUIDto)
  db/
    mongoose.ts              # Mongoose connection and model registration
    schema/
      form.ts                # Mongoose schema and types for forms
      ui.ts                  # Mongoose schema and types for UI screens
  utils/validation/
    requestValidator.ts      # Request body validator helper
  express.app.ts             # Express app wiring
  server.ts                  # Server bootstrap
```

### Prerequisites
- Node.js 18+
- MongoDB instance (local or hosted)

### Installation
```bash
npm install
```

### Scripts
- `npm run dev`: Start in development with nodemon (TypeScript via ts-node)
- `npm run build`: Compile TypeScript to `dist/`
- `npm start`: Run the compiled server from `dist/`
- `npm test`: Run Jest test suite

### Running locally
1) Configure environment variables (create a `.env` in the project root):
```env
PORT=3000
MONGO_URI=mongodb://...
```

2) Development (auto-reload):
```bash
npm run dev
```

2) Production build and run:
```bash
npm run build
npm start
```

The server listens on `PORT` (default `3000`). MongoDB connection uses `MONGO_URI` and is required at startup.

### API
Base URL: `http://localhost:3000`

- GET `/forms/:key`
  - Description: Get the latest version of a form by `key`.
  - Params: `key` (string) — validated via `GetFormDto`.
  - Responses:
    - 200: JSON form definition
    - 400: Validation error details
    - 500: Server error

- GET `/ui/:key`
  - Description: Get the latest version of a UI screen by `key`.
  - Params: `key` (string) — validated via `GetUIDto`.
  - Responses:
    - 200: `{ version, screen }`
    - 400: Validation error details
    - 404: Screen not found
    - 500: Server error

### Example requests
Using the provided `request.http` (VS Code/JetBrains HTTP client):
```
### Get a form by key
GET http://localhost:3000/forms/loan_application

### Get a UI screen by key
GET http://localhost:3000/ui/home
```

Curl example:
```bash
curl http://localhost:3000/forms/loan_application
# UI screen example
curl http://localhost:3000/ui/home
```

### Testing
Run all tests:
```bash
npm test
```

Optionally, with coverage (if desired):
```bash
npx jest --coverage
```

Coverage reports (when enabled) will appear under `coverage/`.

### Implementation notes
- `form.repository.ts` returns the latest form version (sorted by `version: -1`).
- `ui.repository.ts` returns the latest screen version (sorted by `version: -1`).
- Ensure `MONGO_URI` points to a reachable MongoDB; the server fails fast if it is missing/invalid.

### Seeding a UI screen (optional)
Create `scripts/seed-ui.ts` then run `npx ts-node scripts/seed-ui.ts` (requires `.env` with `MONGO_URI`). The script should upsert a document with shape `{ key, version, screen }` into the `screens` collection.

### License
MIT © Tareq Ghassan Abu Saleh


