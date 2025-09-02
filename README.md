## Stepper

An Express (Node.js) TypeScript service that exposes simple endpoints to set and get a stepper value. The project is structured with DTOs, services, repositories, and validation using class-validator.

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
    stepper.routes.ts        # HTTP routes (/steps)
  services/
    stepper.service.ts       # Business logic
  repository/
    stepper.repository.ts    # Mongo-backed repository (uses Mongoose model)
    mockStepper.repository.ts # Mock repository (skeleton)
  model/
    stepper.model.ts         # Domain model
  dto/
    stepper.dto.ts           # Request DTO and validation rules
  db/
    mongoose.ts              # Mongoose connection and model registration
    schema/
      stepper.ts             # Mongoose schema and types
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
MONGO_URI=mongodb://localhost:27017/stepper
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

- POST `/steps`
  - Description: Set the number of steps.
  - Request body (JSON):
    ```json
    { "numberOfSteps": 3 }
    ```
  - Validation: `numberOfSteps` must be a number, required, and `>= 0`.
  - Responses:
    - 201: JSON of the stored object
    - 400: Validation error details
    - 500: Server error

- GET `/steps`
  - Description: Get the current number of steps.
  - Responses:
    - 200: JSON of the stored object
    - 500: Server error

Notes:
- `StepperRepository` is implemented over Mongoose. It upserts/reads a singleton document with id `"stepper"`.

### Example requests
Using the provided `request.http` (VS Code/JetBrains HTTP client):
```
### Set steps
POST http://localhost:3000/steps
Content-Type: application/json

{
  "numberOfSteps": 5
}

### Get steps
GET http://localhost:3000/steps
```

Curl examples:
```bash
curl -X POST http://localhost:3000/steps \
  -H 'Content-Type: application/json' \
  -d '{"numberOfSteps": 5}'

curl http://localhost:3000/steps
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
- DTO and model use `numberOfSteps` consistently.
- Ensure `MONGO_URI` points to a reachable MongoDB; the server will fail fast if it is missing/invalid.

### License
MIT © Tareq Ghassan Abu Saleh


