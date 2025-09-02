## Stepper

An Express (Node.js) TypeScript service that exposes simple endpoints to set and get a stepper value. The project is structured with DTOs, services, repositories, and validation using class-validator.

### Tech stack
- **Runtime**: Node.js, Express 5
- **Language**: TypeScript
- **Validation**: class-validator, class-transformer
- **Testing**: Jest, Supertest

### Project structure
```
src/
  api/
    stepper.routes.ts        # HTTP routes (/steppes)
  services/
    stepper.service.ts       # Business logic
  repository/
    stepper.repository.ts    # Repository (not implemented)
    mockStepper.repository.ts # Mock repository (skeleton)
  model/
    stepper.model.ts         # Domain model
  dto/
    stepper.dto.ts           # Request DTO and validation rules
  utils/validation/
    requestValidator.ts      # Request body validator helper
  express.app.ts             # Express app wiring
  server.ts                  # Server bootstrap
```

### Prerequisites
- Node.js 18+ recommended

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
1) Development (auto-reload):
```bash
npm run dev
```

2) Production build and run:
```bash
npm run build
npm start
```

The server listens on `PORT` (default `3000`).

### API
Base URL: `http://localhost:3000`

- POST `/steppes`
  - Description: Set the number of steps.
  - Request body (JSON):
    ```json
    { "numberOfSteppes": 3 }
    ```
  - Validation: `numberOfSteppes` must be a number, required, and `>= 0`.
  - Responses:
    - 201: JSON of the stored object
    - 400: Validation error details
    - 500: Server error

- GET `/steppes`
  - Description: Get the current number of steps.
  - Responses:
    - 200: JSON of the stored object
    - 500: Server error

Notes:
- The current `StepperRepository` methods (`get`, `set`) are not implemented and will throw. Wire a concrete implementation (e.g., database or in-memory) or swap in a working mock to enable the endpoints.

### Example requests
Using the provided `request.http` (VS Code/JetBrains HTTP client):
```
### Set steps
POST http://localhost:3000/steppes
Content-Type: application/json

{
  "numberOfSteppes": 5
}

### Get steps
GET http://localhost:3000/steppes
```

Curl examples:
```bash
curl -X POST http://localhost:3000/steppes \
  -H 'Content-Type: application/json' \
  -d '{"numberOfSteppes": 5}'

curl http://localhost:3000/steppes
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
- There is a naming inconsistency between the DTO (`numberOfSteppes`) and the model (`numberOfSteps`). The API currently validates and accepts `numberOfSteppes`. Align these names if you change one or the other.
- Replace `StepperRepository` with a working implementation to avoid runtime errors (e.g., implement in-memory storage for quick start).

### License
MIT © Tareq Ghassan Abu Saleh


