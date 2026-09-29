# FTL proof of concept

Click **Save transcript** in the React page. The page sends the text to FastAPI, which saves it in PostgreSQL and returns the saved record for the page to display.

## Run locally

1. Start PostgreSQL and create a database named `ftl_project` (for example, `createdb ftl_project`).
2. Copy `api/.env.example` to `api/.env` and set `DATABASE_URL` for your PostgreSQL user and port.
3. In `api/`, run `uv sync`, then `uv run uvicorn app.main:app --reload --port 8000`.
4. Copy `web/.env.example` to `web/.env`. In `web/`, run `npm ci`, then `npm run dev`.
5. Open <http://localhost:3000> and save the sample transcript.

The real `.env` files stay out of Git. The API creates the `transcripts` table when it starts.
